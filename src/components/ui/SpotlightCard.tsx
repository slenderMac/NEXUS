import { useRef, useState, useCallback } from "react";
import type { ReactNode, MouseEvent, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES } from "react";
import { cn} from "../../utils/cn";


interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightColor?: DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES;
}

/**
 *  Card that reacts to cursor position with a soft spotlight glow.
 */
export function SpotlightCard({
    children,
    className,
    spotlightColor = 'rgba(124, 107, 255, 0.12)',
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spotlight, setSpotlight] = useState({e: 50, y:50, opacity: 0});

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
         if (!card) return;
         const rect = card.getBoundingClientRect();
         const x = ((e.clientX - rect.left) / rect.width) * 100;
         const y = ((e.clientY - rect.top) / rect.height) * 100;
         setSpotlight({ x, y, opacity: 1 });
    
    }, []);

    const handleMouseLeave = useCallback(() => {
        setSpotlight(prev => ({ ...prev, opacity: 0 }));
    }, []);

    return (
        <div ref={cardRef} className={cn('relative overflow-hidden', className)} onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
            {/* Spotlight overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500" style={{ 
            background: ''
            opacity: spotlight.opacity,
            }} /* RESOLVER ERROR del getting en el archivo SpotlightCard.
                  y Mandar a llamar/importar los type del react native y Typescript */
            />
            <div className="relative z-10 flex flex-col flex-1 h-full">{children}</div>
        </div>
    );


}
