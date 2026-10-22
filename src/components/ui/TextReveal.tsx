import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../utils/cn';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    splitBy?: 'word' | 'char' | 'line';
}

export function TextReveal({
    text,
    className,
    delay = 0,
    as: Tag = 'h2',
    splitBy = 'word',
}: TextRevealProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3});

    const words = text.split('');

     const container = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: splitBy === 'char' ? 0.025 : 0.08,
                delayChildren: delay,
             },
        },
     };

     const wordVariant = {
        hidden: { opacity: 0, y: 24,  filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98] as const,
            },
        },
     };

     const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.h2;

      return (
        <MotionTag
           ref={ref}
           className={cn('overflow-hidden', className)}
           variants={container}
           initial="hidden"
           animate={inView ? 'visible' : 'hidden'}
        >
        {words.map((word, i) => (
        <motion.span
           key={i}
           variants={wordVariant}
           style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
           {word}
        </motion.span>
      ))}
      
    </MotionTag>

  );

}