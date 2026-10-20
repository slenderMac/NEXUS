import { motion } from "framer-motion";
import { useScrollProgress } from "../../hooks/useScrollprogress";

export function ProgressBar() {
    const progress = useScrollProgress();

    return (
        <motion.div className="fixed top-0 left-0 right-0 z-9999 h-0.5 origin-left" style={{
            background:'linear-gradient(90deg #7c6bff, #a78bfa, #7cbff)',
            scaleX: progress,
            transformOrigin: '0% 0%',
            boxShadow:'0 0 8px rgba(124, 107, 255, 0.8)',
        }}
        />
    );
}
