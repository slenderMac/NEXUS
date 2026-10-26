import { motion } from 'framer-motion';
import { Terminal, GitBranch, Activity, Layers, Shield, Cpu } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TextReveal } from '../components/ui/TextReveal';

interface BentoCardProps {
    className?: string;
    children: React.ReactNode;
    glowColor?: string;
}

function BentoCard({ className = '', children, glowColor = 'rgba(124,107,255,0.08)' }: BentoCardProps) {
  return (
    <SpotlightCard
      className={`relative glass rounded-3xl p-6 overflow-hidden border border-white/[0.06] hover:border-white/[0.10] transition-all duration-500 group ${className}`}
      spotlightColor={glowColor}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="h-full"
      >
        {children}
      </motion.div>
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none gradient-border" />
    </SpotlightCard>
  );
}

function CodeBlock() {
  const lines = [
    { text: '$ nexus deploy --prod', color: 'text-white/70' },
    { text: '  ✓ Building application...', color: 'text-violet-400' },
    { text: '  ✓ Optimizing assets...', color: 'text-violet-400' },
    { text: '  ✓ Deploying to edge...', color: 'text-violet-400' },
    { text: '  ⚡ Live in 12 seconds', color: 'text-emerald-400' },
    { text: '', color: '' },
    { text: '  🌍 https://app.nexus.cloud', color: 'text-blue-400' },
  ];

  return (
    <div className="rounded-2xl bg-black/50 border border-white/8 p-5 font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          viewport={{ once: true }}
          className={`${line.color} min-h-[1.5em]`}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

function MetricBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-white/50">{label}</span>
        <span className="text-white/80 font-medium">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="bento" className="relative py-16 md:py-32 px-4" aria-label="Product Overview">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-violet-400/80 uppercase mb-6">
              Platform
            </span>
          </ScrollReveal>
          <TextReveal
            text="The complete deployment suite"
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            delay={0.1}
          />
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/45 max-w-xl mx-auto">
              Every tool you need, beautifully integrated.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {/* Card 1 — Large: Deploy terminal (spans 2 cols) */}
          <BentoCard className="lg:col-span-2" glowColor="rgba(124,107,255,0.1)">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                  <Terminal size={18} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">One-command Deploys</h3>
                  <p className="text-xs text-white/40">From commit to production in seconds</p>
                </div>
              </div>
              <div className="flex-1">
                <CodeBlock />
              </div>
            </div>
          </BentoCard>

          {/* Card 2 — Branch previews */}
          <BentoCard glowColor="rgba(99,102,241,0.1)">
            <div className="flex flex-col h-full">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-4">
                <GitBranch size={18} className="text-indigo-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Branch Previews</h3>
              <p className="text-sm text-white/45 mb-5 leading-relaxed">
                Every PR gets a live preview URL automatically. Review changes before merging.
              </p>
              <div className="mt-auto space-y-2">
                {['main → production', 'feat/auth → preview', 'fix/ui → preview'].map((branch) => (
                  <div key={branch} className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${branch.includes('main') ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                    <span className="text-white/50 font-mono">{branch}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 3 — Analytics */}
          <BentoCard glowColor="rgba(251,191,36,0.08)">
            <div className="flex flex-col h-full">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-4">
                <Activity size={18} className="text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-5">Performance</h3>
              <div className="space-y-4 flex-1">
                <MetricBar label="Response time" value="12ms" pct={92} color="bg-gradient-to-r from-violet-500 to-purple-500" />
                <MetricBar label="Global uptime" value="99.99%" pct={99} color="bg-gradient-to-r from-emerald-500 to-teal-500" />
                <MetricBar label="Cache hit rate" value="97.4%" pct={97} color="bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
            </div>
          </BentoCard>

          {/* Card 4 — Infrastructure & Security (spans 2 cols) */}
          <BentoCard className="lg:col-span-2" glowColor="rgba(52,211,153,0.07)">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <Layers size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Infrastructure & Security</h3>
                  <p className="text-xs text-white/40">Enterprise-grade scale and compliance built-in</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                {/* Infrastructure side */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Auto-scaling', icon: Cpu, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/15' },
                    { label: 'DDoS Protection', icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/15' },
                    { label: 'Multi-region Edge', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
                  ].map(({ label, icon: Icon, color, bg, border }) => (
                    <div key={label} className={`rounded-xl ${bg} border ${border} flex items-center gap-3 p-3 group hover:scale-[1.02] transition-transform duration-300`}>
                      <Icon size={18} className={color} />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Security side */}
                <div className="hidden lg:flex flex-col justify-center rounded-xl bg-black/40 border border-white/5 p-5">
                  <p className="text-sm text-white/60 leading-relaxed mb-4">
                    SOC2 Type II certified. GDPR compliant. End-to-end encryption for all data in transit and at rest.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['GDPR', 'HIPAA', 'ISO 27001'].map((cert) => (
                      <span key={cert} className="text-[11px] font-medium text-white/50 bg-white/5 border border-white/8 rounded-full px-2.5 py-1">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// Need to import Globe for the infrastructure card
function Globe({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
