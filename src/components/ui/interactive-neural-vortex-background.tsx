import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const InteractiveNeuralVortex = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const animationRef = useRef(null);
  const location = useLocation();

  // Color schemes for different pages
  const colorSchemes = {
    default: {
      color1: [0.5, 0.15, 0.65],
      color2: [0.02, 0.7, 0.9],
      mixColor: [0.15, 0.0, 0.6]
    },
    fundamental: {
      color1: [0.1, 0.3, 0.8],
      color2: [0.2, 0.5, 0.9],
      mixColor: [0.05, 0.2, 0.7]
    },
    premium: {
      color1: [0.4, 0.2, 0.8],
      color2: [0.2, 0.4, 0.9],
      mixColor: [0.3, 0.1, 0.7]
    },
    premiumTrading: {
      color1: [0.1, 0.6, 0.3],
      color2: [0.2, 0.8, 0.4],
      mixColor: [0.0, 0.5, 0.2]
    },
    premiumRotation: {
      color1: [0.5, 0.2, 0.7],
      color2: [0.6, 0.3, 0.8],
      mixColor: [0.4, 0.1, 0.6]
    },
    alpha: {
      color1: [0.8, 0.4, 0.1],
      color2: [0.9, 0.2, 0.1],
      mixColor: [0.7, 0.3, 0.0]
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
      
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;
      
      // Adjusted section positions - slower transitions on mobile
      const tradingSuiteStart = isMobile 
        ? windowHeight * 1.2  // Much slower on mobile - around 1.2 viewports
        : windowHeight * 0.8; // Desktop - around 80% of first viewport
      const rotationSuiteStart = isMobile 
        ? windowHeight * 2.8  // Much slower on mobile - around 2.8 viewports
        : windowHeight * 2.2; // Desktop - around 2.2 viewports
      
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
        
        // Use dynamic colors with consistent intensity
        color = u_color1;
        // Keep scroll progress limited to maintain consistent intensity
        float limitedScrollProgress = clamp(u_scroll_progress, 0.0, 1.0);
        color = mix(color, u_color2, 0.32 + 0.16 * sin(2.0 * limitedScrollProgress + 1.2));
        color += u_mix_color * sin(2.0 * limitedScrollProgress + 1.5);
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

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to compile shaders');
      return;
    }

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

    // Color transition state
    let currentScheme = getCurrentColorScheme();
    let targetScheme = currentScheme;
    let transitionProgress = 1.0;
    const transitionSpeed = 0.02;

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
      
      if (newTargetScheme !== targetScheme) {
        currentScheme = targetScheme;
        targetScheme = newTargetScheme;
        transitionProgress = 0.0;
      }
      
      if (transitionProgress < 1.0) {
        transitionProgress = Math.min(1.0, transitionProgress + transitionSpeed);
      }
      
      const currentColors = colorSchemes[currentScheme] || colorSchemes.default;
      const targetColors = colorSchemes[targetScheme] || colorSchemes.default;
      
      const color1 = lerpColor(currentColors.color1, targetColors.color1, transitionProgress);
      const color2 = lerpColor(currentColors.color2, targetColors.color2, transitionProgress);
      const mixColor = lerpColor(currentColors.mixColor, targetColors.mixColor, transitionProgress);
      
      gl.uniform3f(uColor1, color1[0], color1[1], color1[2]);
      gl.uniform3f(uColor2, color2[0], color2[1], color2[2]);
      gl.uniform3f(uMixColor, mixColor[0], mixColor[1], mixColor[2]);
    };

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
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
      // Limit scroll progress to maintain consistent intensity
      const limitedScrollProgress = Math.min(window.pageYOffset / (2 * window.innerHeight), 1.0);
      gl.uniform1f(uScrollProgress, limitedScrollProgress);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    // Initialize colors
    updateColors();
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gl && program) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
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