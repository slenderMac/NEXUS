import { motion } from "framer-motion";
import { useMagnet } from "../../hooks/useMagnet";
import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'ghost' | 'outline';
    onClick?: () => void;
    href?: string;
    as?: 'button' | 'a';
}

export function MagneticButton ({
    children,
    className,
    variant = 'primary',
    onClick,
    href,
    as: Tag = 'button', 

}: MagneticButtonProps) {
    const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnet();

    const baseClasses = 'relative inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm tracking-wide transition-all duration-300 overflow-hidden cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 whitespace-nowrap';

    const variants = {
        primary: 'px-7 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-600/50 hover:shadow-xl ',

        ghost: 'px-6 py-3 text-white/70 hover;text-white hover:bg-white/5',

        outline: 'px-7 py3.5 border border-white/10 text-white/80 hover:border-white/20 hover:text-white hover:bg-white/5',

    };

    const motionProps =  {
        style: { x, y },
        onMouseMove: handleMouseMove as unknown as React.MouseEventHandler<HTMLElement>,
        onMouseLeave: handleMouseLeave,
        whileHover: { scale: 1.02},
        whileTap: { scale: 0.97},
        
    };

    // ... resto de tu código anterior (definición de clases, variantes, etc.)

    if (Tag === 'a') {
        return (
            <motion.a 
                ref={ref as React.Ref<HTMLAnchorElement>} 
                href={href} 
                className={cn(baseClasses, variants[variant], className)} 
                {...motionProps}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>
                {variant === 'primary' && (
                    <span className="absolute inset-0 bg-linear-to-r from-violet-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
            </motion.a>
        );
    }

    return (
        <motion.button 
            ref={ref as React.Ref<HTMLButtonElement>} 
            onClick={onClick} 
            className={cn(baseClasses, variants[variant], className)} 
            {...motionProps}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            {variant === 'primary' && (
                <span className="absolute inset-0 bg-linear-to-r from-violet-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}
        </motion.button>
    );
};


