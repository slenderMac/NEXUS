import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "../../utils/cn";


interface CountUpProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function CountUp ({
    end,
    suffix = '',
    prefix = '',
    duration = 2000,
    className,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const[count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;

        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            //Ease out public 
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
              if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    },  [inView, end, duration]);

    return (
        <span ref={ref} className={cn(className)}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );


}