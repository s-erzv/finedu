"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "../../../lib/util";

// Menggunakan JSDoc untuk dokumentasi, menggantikan tipe TypeScript
/**
 * @param {object} props
 * @param {string} [props.borderRadius="1.75rem"]
 * @param {React.ReactNode} props.children
 * @param {React.ElementType} [props.as]
 * @param {string} [props.containerClassName]
 * @param {string} [props.borderClassName]
 * @param {number} [props.duration]
 * @param {string} [props.className]
 * @param {object} otherProps
 */
export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  const finalComponent = Component || "button";

  return React.createElement(
    finalComponent,
    {
      className: cn(
        "relative overflow-hidden bg-transparent p-[1px] text-xl md:col-span-2",
        containerClassName
      ),
      style: {
        borderRadius: borderRadius,
      },
      ...otherProps,
    },
    <>
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8]",
              "bg-[radial-gradient(#3641C9_60%,transparent_60%)] dark:bg-[radial-gradient(#CF97C6_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border text-sm antialiased backdrop-blur-xl",
          "border-slate-300 bg-[#FCCA59]/[0.1] text-slate-900",
          "dark:border-slate-800 dark:bg-slate-900/[0.8] dark:text-white",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </>
  );
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.duration=3000]
 * @param {string} [props.rx]
 * @param {string} [props.ry]
 * @param {object} otherProps
 */
export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};