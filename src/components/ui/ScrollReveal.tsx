import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    scale?: boolean;
    once?: boolean; 
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = 'up',
    scale = false,
    once = true,

}: ScrollRevealProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, amount: 0.1 });

    const directionMap = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: -40 },
        right: { x: 40 },
        none: {},
    };

    const initial = {
        opacity: 0,
        ...(scale ? { scale: 0.92 } : {}),
        ...directionMap[direction],
    };

     return (
        <motion.div ref={ref} className={cn(className)} initial={initial} animate={inView ? { opacity: 1, y: 0, x: 0, 
        scale: 1 } : initial } transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }} > 
        {children}
        </motion.div>
     );

}
