import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const scoreTrend = [
  { month: "Month 1", score: 44 },
  { month: "Month 2", score: 51 },
  { month: "Month 3", score: 58 },
  { month: "Month 4", score: 65 },
  { month: "Month 5", score: 71 },
  { month: "Month 6", score: 78 },
];

const pillars = [
  { label: "Financials",  score: 72, max: 100 },
  { label: "Team",        score: 85, max: 100 },
  { label: "Product",     score: 68, max: 100 },
  { label: "Market",      score: 80, max: 100 },
  { label: "Governance",  score: 74, max: 100 },
];

const stages = [
  { stage: "Idea",      pct: 15 },
  { stage: "Prototype", pct: 22 },
  { stage: "MVP",       pct: 30 },
  { stage: "PMF",       pct: 18 },
  { stage: "Growth",    pct: 12 },
  { stage: "Scale",     pct: 3  },
];

const kpis = [
  { value: 78,   suffix: "/100", label: "Avg. SIEAP Score"       },
  { value: 94,   suffix: "%",    label: "Report Accuracy"         },
  { value: 1,    suffix: "%",    label: "Success Fee"             },
  { value: 3,    suffix: "×",    label: "Valuation Methods"       },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

// ─── Score Ring ──────────────────────────────────────────────────────────────

function ScoreRing({ score, trigger }: { score: number; trigger: boolean }) {
  const R = 72;
  const circumference = 2 * Math.PI * R;
  const [dash, setDash] = useState(0);
  const display = useCountUp(score, 1600, trigger);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const target = (score / 100) * circumference;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDash(eased * target);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, score, circumference]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-44">
        <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
          {/* track */}
          <circle cx="90" cy="90" r={R} fill="none"
            stroke="rgba(201,168,76,0.12)" strokeWidth="10" />
          {/* progress arc */}
          <circle cx="90" cy="90" r={R} fill="none"
            stroke="url(#goldArc)" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`} />
          <defs>
            <linearGradient id="goldArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#FFE484" />
            </linearGradient>
          </defs>
        </svg>
        {/* centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span className="text-4xl font-bold text-primary leading-none">{display}</span>
          <span className="text-xs text-muted-foreground mt-1">out of 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground">SIEAP Score — Sample Startup</p>
      <p className="text-xs text-muted-foreground">Bronze → Silver after 3 months</p>
    </div>
  );
}

// ─── Pillar Bars ─────────────────────────────────────────────────────────────

function PillarBars({ trigger }: { trigger: boolean }) {
  const [widths, setWidths] = useState(pillars.map(() => 0));

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setWidths(pillars.map((pill) => eased * pill.score));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger]);

  return (
    <div className="space-y-3 w-full">
      {pillars.map((pill, i) => (
        <div key={pill.label} className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{pill.label}</span>
            <span className="text-primary font-medium">{Math.round(widths[i])}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${widths[i]}%`,
                background: `linear-gradient(90deg, #C9A84C ${i * 8}%, #FFE484)`,
                transition: "none",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tooltip helpers ──────────────────────────────────────────────────────────

const GoldTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs border border-primary/20">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="text-primary font-semibold">{payload[0].value}</p>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PlatformMetrics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="container px-4 py-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/25 bg-primary/8">
            Live Platform Data
          </span>
          <h2 className="text-4xl md:text-5xl font-normal mb-4">
            Platform{" "}
            <span className="text-gradient font-medium">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real numbers. Real evaluation. Real investor confidence.
          </p>
        </motion.div>
      </div>

      {/* ── Row 1: KPI counters ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, i) => {
          const count = useCountUp(kpi.value, 1600 + i * 100, inView);
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary leading-none">
                {count}{kpi.suffix}
              </div>
              <div className="text-xs text-muted-foreground mt-2">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Row 2: Score Ring + Pillars + Stage Chart ─────────── */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        {/* Score Ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-8 flex flex-col items-center justify-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
            100-Point Scorecard
          </p>
          <ScoreRing score={78} trigger={inView} />
        </motion.div>

        {/* Pillar breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-8 flex flex-col justify-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
            5-Pillar Breakdown
          </p>
          <PillarBars trigger={inView} />
        </motion.div>

        {/* Stage distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-2xl p-8"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
            Startup Stage Mix
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stages} layout="vertical" margin={{ left: 0, right: 12 }}>
              <XAxis type="number" hide domain={[0, 35]} />
              <YAxis
                type="category" dataKey="stage" width={60}
                tick={{ fill: "rgba(201,168,76,0.6)", fontSize: 11 }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<GoldTooltip />} cursor={false} />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}
                isAnimationActive={inView} animationDuration={1400}
                animationEasing="ease-out"
              >
                {stages.map((_, i) => (
                  <Cell key={i}
                    fill={`rgba(201,168,76,${0.35 + i * 0.1})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground text-right mt-1">% of startups per stage</p>
        </motion.div>
      </div>

      {/* ── Row 3: Score trend line chart (full width) ─────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
              Score Improvement Trajectory
            </p>
            <h3 className="text-2xl font-medium text-foreground">
              Bronze → Silver in{" "}
              <span className="text-primary">6 months</span>
            </h3>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Start</div>
              <div className="text-2xl font-bold text-muted-foreground">44</div>
            </div>
            <div className="self-end text-muted-foreground mb-1">→</div>
            <div>
              <div className="text-xs text-muted-foreground">Month 6</div>
              <div className="text-2xl font-bold text-primary">78</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Delta</div>
              <div className="text-2xl font-bold text-primary">+34</div>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={scoreTrend} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#FFE484" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: "rgba(201,168,76,0.5)", fontSize: 10 }}
              axisLine={{ stroke: "rgba(201,168,76,0.1)" }}
              tickLine={false}
            />
            <YAxis
              domain={[30, 100]}
              tick={{ fill: "rgba(201,168,76,0.5)", fontSize: 12 }}
              axisLine={false} tickLine={false}
              tickCount={5}
            />
            <Tooltip content={<GoldTooltip />} cursor={{ stroke: "rgba(201,168,76,0.15)" }} />
            <Line
              type="monotone" dataKey="score"
              stroke="url(#lineGold)" strokeWidth={3}
              dot={{ fill: "#C9A84C", strokeWidth: 0, r: 5 }}
              activeDot={{ fill: "#FFE484", r: 7, strokeWidth: 0 }}
              isAnimationActive={inView}
              animationDuration={1800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border/30">
          {[
            { label: "Bronze tier", range: "0 – 49", color: "rgba(180,120,50,0.6)" },
            { label: "Silver tier", range: "50 – 74", color: "rgba(180,180,180,0.6)" },
            { label: "Gold tier",   range: "75 – 89", color: "rgba(201,168,76,0.9)" },
            { label: "Platinum",    range: "90 – 100", color: "rgba(230,230,255,0.8)" },
          ].map((tier) => (
            <div key={tier.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full" style={{ background: tier.color }} />
              <span>{tier.label}</span>
              <span className="text-foreground/40">{tier.range}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
