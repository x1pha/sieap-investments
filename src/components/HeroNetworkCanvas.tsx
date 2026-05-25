import { useEffect, useRef } from "react";

// ── Node types that mirror the SIEAP platform ──────────────────────────────
type NodeType = "startup" | "investor" | "incubator";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: NodeType;
  radius: number;
  opacity: number;
  label?: string;
  pulsePhase: number;
}

// Premium visual config — fewer nodes, clear hierarchy through size + color + glow
const TYPE_CFG: Record<NodeType, {
  r: number; baseOpacity: number; color: string; glowColor: string; glowR: number;
  count: number; speed: number;
}> = {
  // Platinum-cream: capital, authority, power
  investor:  { r: 6.8,  baseOpacity: 0.96, color: "248, 238, 210", glowColor: "248, 238, 210", glowR: 40, count: 4,  speed: 0.20 },
  // Warm amber: mentorship, nurturing, warmth
  incubator: { r: 5.2,  baseOpacity: 0.88, color: "255, 188, 76",  glowColor: "255, 188, 76",  glowR: 28, count: 3,  speed: 0.24 },
  // Muted gold: many startups, smaller but present
  startup:   { r: 2.1,  baseOpacity: 0.52, color: "180, 150, 65",  glowColor: "180, 150, 65",  glowR: 0,  count: 13, speed: 0.32 },
};

const INVESTOR_LABELS  = ["Venture Capital", "Angel Network", "PE Fund", "Family Office"];
const INCUBATOR_LABELS = ["Tech Incubator", "Accelerator", "Growth Hub"];

const CONNECT_DIST        = 180;
const MOUSE_ATTRACT_RADIUS = 230;
const MOUSE_ATTRACT_STR    = 0.042;
const MOUSE_REPEL_RADIUS   = 55;
const MOUSE_REPEL_STR      = 0.10;

// Smooth edge alpha — cross-type edges are notably brighter
function lineAlpha(a: Node, b: Node, proximity: number): number {
  if (a.type === "startup" && b.type === "startup") return proximity * 0.12;
  if (a.type !== b.type) return proximity * 0.52;
  return proximity * 0.22;
}

// Manually draw a rounded rectangle (broad browser compat)
function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// Pill label rendered above the node with dark semi-transparent backdrop
function drawNodeLabel(
  ctx: CanvasRenderingContext2D,
  n: Node,
  cfg: { color: string },
) {
  if (!n.label) return;

  ctx.save();
  ctx.font = "500 10px 'Inter', system-ui, sans-serif";

  const text   = n.label;
  const tw     = ctx.measureText(text).width;
  const pH     = 5;  // vertical padding
  const pW     = 9;  // horizontal padding
  const boxW   = tw + pW * 2;
  const boxH   = 19;
  const bx     = n.x - boxW / 2;
  const by     = n.y - n.radius - 10 - boxH;

  // Dark pill backdrop
  roundRectPath(ctx, bx, by, boxW, boxH, 5);
  ctx.fillStyle = "rgba(10, 8, 6, 0.78)";
  ctx.fill();

  // Subtle gold border
  ctx.strokeStyle = `rgba(${cfg.color}, 0.28)`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Label text — warm white for legibility
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = `rgba(250, 244, 228, ${n.opacity * 0.92})`;
  ctx.fillText(text, n.x, by + boxH / 2);

  ctx.restore();
}

/**
 * Interactive premium particle network representing the SIEAP ecosystem.
 * Platinum Investors ↔ Amber Incubators ↔ Gold Startups, mouse-reactive.
 */
export function HeroNetworkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const nodesRef  = useRef<Node[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────────────────
    let W = 0, H = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Initialise nodes ─────────────────────────────────────────────────
    const buildNodes = () => {
      const nodes: Node[] = [];
      const types: NodeType[] = ["investor", "incubator", "startup"];
      let invIdx = 0, incIdx = 0;
      const pad = 70;
      const cW = Math.max(W, 300);
      const cH = Math.max(H, 300);

      types.forEach((type) => {
        const cfg = TYPE_CFG[type];
        for (let i = 0; i < cfg.count; i++) {
          const label =
            type === "investor"  ? INVESTOR_LABELS[invIdx++] :
            type === "incubator" ? INCUBATOR_LABELS[incIdx++] :
            undefined;

          nodes.push({
            x: pad + Math.random() * (cW - pad * 2),
            y: pad + Math.random() * (cH - pad * 2),
            vx: (Math.random() - 0.5) * cfg.speed,
            vy: (Math.random() - 0.5) * cfg.speed,
            type,
            radius: cfg.r + Math.random() * 0.7,
            opacity: cfg.baseOpacity * (0.82 + Math.random() * 0.18),
            label,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      });
      return nodes;
    };

    // Defer node build until first draw so W/H are definitely set
    let nodesBuilt = false;

    // ── Mouse ──────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // ── Draw loop ─────────────────────────────────────────────────────
    const draw = () => {
      if (!nodesBuilt && W > 0 && H > 0) {
        nodesRef.current = buildNodes();
        nodesBuilt = true;
      }

      ctx.clearRect(0, 0, W, H);

      const ns    = nodesRef.current;
      const mouse = mouseRef.current;

      if (!ns.length) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Update positions
      ns.forEach((n) => {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d  = Math.hypot(dx, dy) || 1;

        if (d < MOUSE_REPEL_RADIUS) {
          const f = ((MOUSE_REPEL_RADIUS - d) / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STR;
          n.vx -= (dx / d) * f;
          n.vy -= (dy / d) * f;
        } else if (d < MOUSE_ATTRACT_RADIUS) {
          const f = ((MOUSE_ATTRACT_RADIUS - d) / MOUSE_ATTRACT_RADIUS) * MOUSE_ATTRACT_STR;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        // Gentle damping
        n.vx *= 0.991;
        n.vy *= 0.991;

        const maxSpd = TYPE_CFG[n.type].speed * 2.8;
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > maxSpd) { n.vx = (n.vx / spd) * maxSpd; n.vy = (n.vy / spd) * maxSpd; }

        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce with margin
        const m = 32;
        if (n.x < m)     { n.x = m;     n.vx =  Math.abs(n.vx); }
        if (n.x > W - m) { n.x = W - m; n.vx = -Math.abs(n.vx); }
        if (n.y < m)     { n.y = m;     n.vy =  Math.abs(n.vy); }
        if (n.y > H - m) { n.y = H - m; n.vy = -Math.abs(n.vy); }

        // Breathe opacity gently
        n.pulsePhase += 0.011;
        const pulse = Math.sin(n.pulsePhase) * 0.07;
        n.opacity = Math.min(0.99, Math.max(0.28, TYPE_CFG[n.type].baseOpacity + pulse));
      });

      // ── Edges ─────────────────────────────────────────────────────
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a = ns[i], b = ns[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist >= CONNECT_DIST) continue;

          const proximity = 1 - dist / CONNECT_DIST;
          const alpha = lineAlpha(a, b, proximity);
          if (alpha < 0.015) continue;

          const isCross = a.type !== b.type;

          if (isCross) {
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${TYPE_CFG[a.type].color}, ${alpha})`);
            grad.addColorStop(1, `rgba(${TYPE_CFG[b.type].color}, ${alpha})`);
            ctx.strokeStyle = grad;
          } else {
            ctx.strokeStyle = `rgba(${TYPE_CFG[a.type].color}, ${alpha})`;
          }

          ctx.lineWidth = isCross ? 0.85 : 0.45;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Nodes: back-to-front (startups → incubators → investors) ──
      const DRAW_ORDER: NodeType[] = ["startup", "incubator", "investor"];
      for (const type of DRAW_ORDER) {
        ns.filter(n => n.type === type).forEach((n) => {
          const cfg = TYPE_CFG[n.type];

          // Outer glow halo for hub nodes
          if (n.type !== "startup") {
            const glowR = cfg.glowR * (1 + 0.10 * Math.sin(n.pulsePhase));
            const grd = ctx.createRadialGradient(n.x, n.y, n.radius * 0.4, n.x, n.y, glowR);
            grd.addColorStop(0,   `rgba(${cfg.glowColor}, ${n.opacity * 0.30})`);
            grd.addColorStop(0.5, `rgba(${cfg.glowColor}, ${n.opacity * 0.08})`);
            grd.addColorStop(1,   `rgba(${cfg.glowColor}, 0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          // Core dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

          if (n.type === "investor") {
            // Platinum sphere effect — bright highlight off-centre
            const sph = ctx.createRadialGradient(
              n.x - n.radius * 0.28, n.y - n.radius * 0.28, 0,
              n.x, n.y, n.radius,
            );
            sph.addColorStop(0, `rgba(255, 255, 255, ${n.opacity})`);
            sph.addColorStop(0.5, `rgba(${cfg.color}, ${n.opacity * 0.95})`);
            sph.addColorStop(1, `rgba(200, 185, 150, ${n.opacity * 0.75})`);
            ctx.fillStyle = sph;
          } else if (n.type === "incubator") {
            // Amber sphere — rich warm center
            const sph = ctx.createRadialGradient(
              n.x - n.radius * 0.22, n.y - n.radius * 0.22, 0,
              n.x, n.y, n.radius,
            );
            sph.addColorStop(0, `rgba(255, 220, 130, ${n.opacity})`);
            sph.addColorStop(1, `rgba(${cfg.color}, ${n.opacity * 0.85})`);
            ctx.fillStyle = sph;
          } else {
            ctx.fillStyle = `rgba(${cfg.color}, ${n.opacity})`;
          }
          ctx.fill();

          // Labels on hub nodes — pill backdrop + white text
          if (n.label) {
            drawNodeLabel(ctx, n, cfg);
          }
        });
      }

      // ── Subtle mouse aura ─────────────────────────────────────────
      if (mouse.x > -100) {
        const aura = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_ATTRACT_RADIUS * 0.48,
        );
        aura.addColorStop(0, "rgba(201, 168, 76, 0.055)");
        aura.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_ATTRACT_RADIUS * 0.48, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", cursor: "crosshair" }}
    />
  );
}
