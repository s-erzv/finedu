"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize * 0.85, magnification, baseItemSize * 0.85],
  );
  const size = useSpring(targetSize, spring);

  const targetOpacity = useTransform(
    mouseDistance, 
    [-distance * 2, 0, distance * 2], 
    [0.6, 1, 0.6]
  );
  const opacity = useSpring(targetOpacity, spring);

  const targetRotation = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [-8, 0, 8]
  );
  const rotation = useSpring(targetRotation, { ...spring, stiffness: 200 });

  const targetY = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [4, -12, 4]
  );
  const y = useSpring(targetY, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        opacity: opacity,
        rotate: rotation,
        y: y,
        scale: isPressed ? 0.95 : 1,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-2xl 
        bg-white/20 dark:bg-white/5
        backdrop-blur-xl shadow-2xl 
        border border-white/30 dark:border-white/10
        hover:bg-white/30 dark:hover:bg-white/10
        hover:shadow-3xl hover:border-white/50 dark:hover:border-white/20
        transition-all duration-300 cursor-pointer
        ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          opacity: useTransform(mouseDistance, [-distance/2, 0, distance/2], [0, 0.8, 0])
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {Children.map(children, (child) => cloneElement(child, { isHovered }))}
      </div>
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: -15, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ 
            duration: 0.2, 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className={`${className} absolute -top-12 left-1/2 w-fit whitespace-nowrap 
            rounded-xl px-3 py-2 text-sm font-medium
            bg-gray-900/95 text-white border border-gray-700/30
            dark:bg-gray-800/95 dark:text-gray-100 dark:border-gray-600/30
            backdrop-blur-xl shadow-2xl
            before:absolute before:bottom-[-6px] before:left-1/2 before:transform before:-translate-x-1/2
            before:w-3 before:h-3 before:rotate-45 
            before:bg-gray-900/95 before:border-r before:border-b before:border-gray-700/30
            dark:before:bg-gray-800/95 dark:before:border-gray-600/30
            z-50`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center text-gray-700 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.08, stiffness: 500, damping: 20 },
  magnification = 80,
  distance = 130,
  panelHeight = 72,
  dockHeight = 280,
  baseItemSize = 52,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification * 1.4),
    [magnification, dockHeight]
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="mx-auto flex max-w-fit items-center relative"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} absolute bottom-6 left-1/2 transform -translate-x-1/2 
          flex items-center w-fit gap-4 rounded-3xl
          p-4
          bg-white/10 dark:bg-black/30
          backdrop-blur-2xl 
          border border-white/20 dark:border-white/10
          shadow-2xl
          hover:bg-white/15 dark:hover:bg-black/40
          hover:shadow-3xl hover:border-white/30 dark:hover:border-white/15
          transition-all duration-500`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />
        
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}