"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  className = "",
  suffix = "",
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, end, duration, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: delay + 0.2,
      }}
    >
      {count}{suffix}
    </motion.span>
  );
};

export default CountUp;
