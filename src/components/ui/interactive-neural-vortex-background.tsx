import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const InteractiveNeuralVortex = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const animationRef = useRef(null);
  const location = useLocation();
  const currentColorScheme = useRef('default');

  // Color schemes for different pages
  const colorSchemes = {
    default: {
      color1: 'vec3(0.5, 0.15, 0.65)',
      color2: 'vec3(0.02, 0.7, 0.9)',
      mixColor: 'vec3(0.15, 0.0, 0.6)'
    },
    fundamental: {
      color1: 'vec3(0.1, 0.3, 0.8)',
      color2: 'vec3(0.2, 0.5, 0.9)',
      mixColor: 'vec3(0.05, 0.2, 0.7)'
    },
    premium: {
      color1: 'vec3(0.4, 0.2, 0.8)',
      color2: 'vec3(0.2, 0.4, 0.9)',
      mixColor: 'vec3(0.3, 0.1, 0.7)'
    },
    premiumTrading: {
      color1: 'vec3(0.1, 0.6, 0.3)',
      color2: 'vec3(0.2, 0.8, 0.4)',
      mixColor: 'vec3(0.0, 0.5, 0.2)'
    },
    premiumRotation: {
      color1: 'vec3(0.5, 0.2, 0.7)',
      color2: 'vec3(0.6, 0.3, 0.8)',
      mixColor: 'vec3(0.4, 0.1, 0.6)'
    },
    alpha: {
      color1: 'vec3(0.8, 0.4, 0.1)',
      color2: 'vec3(0.9, 0.2, 0.1)',
      mixColor: 'vec3(0.7, 0.3, 0.0)'
    }
  };

  // Get current color scheme based on page and scroll position
  const getCurrentColorScheme = () => {
    const path = location.pathname;
    
    if (path === '/plans/fundamental') {
      return 'fundamental';
    } else if (path === '/plans/alpha') {
      return 'alpha';
    } else if (path === '/plans/premium') {
      // Check scroll position for Premium page sections
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Approximate section positions (adjust these values based on your actual layout)
      const tradingSuiteStart = windowHeight * 1.5; // After intro section
      const rotationSuiteStart = windowHeight * 3; // After trading suite section
      
      if (scrollY >= rotationSuiteStart) {
        return 'premiumRotation';
      } else if (scrollY >= tradingSuiteStart) {
        return 'premiumTrading';
      } else {
        return 'premium';
      }
    }
    
    return 'default';
  };

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_mix_color;
      uniform float u_color_transition;
      
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t * 0.5;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }
      
      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);
        float t = .0005 * u_time;
        vec3 color = vec3(0.);
        float noise = neuro_shape(uv, t, p);
        noise = 1.1 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(0.0, noise - 0.5);
        noise *= (1. - length(vUv - .5));
        
        // Use dynamic colors
        color = u_color1;
        color = mix(color, u_color2, 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
        color += u_mix_color * sin(2.0 * u_scroll_progress + 1.5);
        color = color * noise;
        gl_FragColor = vec4(color, noise);
      }
    `;

    const compileShader = (gl, source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRatio = gl.getUniformLocation(program, 'u_ratio');
    const uPointerPosition = gl.getUniformLocation(program, 'u_pointer_position');
    const uScrollProgress = gl.getUniformLocation(program, 'u_scroll_progress');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uMixColor = gl.getUniformLocation(program, 'u_mix_color');
    const uColorTransition = gl.getUniformLocation(program, 'u_color_transition');

    // Color transition state
    let targetColorScheme = getCurrentColorScheme();
    let currentColors = { ...colorSchemes[targetColorScheme] };
    let transitionProgress = 1.0;
    let transitionSpeed = 0.02;

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
    };

    // Parse color string to RGB values
    const parseColor = (colorStr) => {
      const match = colorStr.match(/vec3\(([^)]+)\)/);
      if (match) {
        return match[1].split(',').map(n => parseFloat(n.trim()));
      }
      return [0.5, 0.5, 0.5];
    };

    // Interpolate between two colors
    const lerpColor = (color1, color2, t) => {
      return [
        color1[0] + (color2[0] - color1[0]) * t,
        color1[1] + (color2[1] - color1[1]) * t,
        color1[2] + (color2[2] - color1[2]) * t
      ];
    };

    const updateColors = () => {
      const newTargetScheme = getCurrentColorScheme();
      
      if (newTargetScheme !== targetColorScheme) {
        targetColorScheme = newTargetScheme;
        transitionProgress = 0.0;
      }
      
      if (transitionProgress < 1.0) {
        transitionProgress = Math.min(1.0, transitionProgress + transitionSpeed);
        
        const currentScheme = colorSchemes[currentColorScheme.current] || colorSchemes.default;
        const targetScheme = colorSchemes[targetColorScheme];
        
        const currentColor1 = parseColor(currentScheme.color1);
        const targetColor1 = parseColor(targetScheme.color1);
        const currentColor2 = parseColor(currentScheme.color2);
        const targetColor2 = parseColor(targetScheme.color2);
        const currentMixColor = parseColor(currentScheme.mixColor);
        const targetMixColor = parseColor(targetScheme.mixColor);
        
        const newColor1 = lerpColor(currentColor1, targetColor1, transitionProgress);
        const newColor2 = lerpColor(currentColor2, targetColor2, transitionProgress);
        const newMixColor = lerpColor(currentMixColor, targetMixColor, transitionProgress);
        
        gl.uniform3f(uColor1, newColor1[0], newColor1[1], newColor1[2]);
        gl.uniform3f(uColor2, newColor2[0], newColor2[1], newColor2[2]);
        gl.uniform3f(uMixColor, newMixColor[0], newMixColor[1], newMixColor[2]);
        
        if (transitionProgress >= 1.0) {
          currentColorScheme.current = targetColorScheme;
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const currentTime = performance.now();
      
      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.1;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.1;
      
      updateColors();
      
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uPointerPosition, 
        pointer.current.x / window.innerWidth, 
        1 - pointer.current.y / window.innerHeight
      );
      gl.uniform1f(uScrollProgress, window.pageYOffset / (2 * window.innerHeight));
      gl.uniform1f(uColorTransition, transitionProgress);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      pointer.current.tX = e.clientX;
      pointer.current.tY = e.clientY;
    };

    const handleScroll = () => {
      // Trigger color update on scroll for Premium page
      if (location.pathname === '/plans/premium') {
        updateColors();
      }
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        pointer.current.tX = e.touches[0].clientX;
        pointer.current.tY = e.touches[0].clientY;
      }
    });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [location.pathname]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none opacity-95 z-0"
    />
  );
};

export default InteractiveNeuralVortex;