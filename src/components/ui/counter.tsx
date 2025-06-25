import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, type CSSProperties } from "react";

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <motion.span style={{ ...style, y }}>{number}</motion.span>;
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
  digitStyle?: CSSProperties;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  const defaultStyle: CSSProperties = {
    height,
    position: "relative",
    width: "1ch",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div style={{ ...defaultStyle, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface CounterDisplayProps {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: number[];
  gap?: number;
  textColor?: string;
  fontWeight?: CSSProperties["fontWeight"];
  digitStyle?: CSSProperties;
}

export const CounterDisplay = ({
  value,
  fontSize = 48,
  padding = 0,
  places = [10, 1],
  gap = 1,
  textColor = "white",
  fontWeight = "bold",
  digitStyle,
}: CounterDisplayProps) => {
  const height = fontSize + padding;

  const defaultCounterStyle: CSSProperties = {
    fontSize,
    display: "flex",
    gap: gap,
    overflow: "hidden",
    lineHeight: 1,
    color: textColor,
    fontWeight: fontWeight,
  };

  return (
    <div style={defaultCounterStyle}>
      {places.map((place) => (
        <Digit
          key={place}
          place={place}
          value={value}
          height={height}
          digitStyle={digitStyle}
        />
      ))}
    </div>
  );
};