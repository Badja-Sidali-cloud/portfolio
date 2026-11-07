import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib';
import { useTheme } from '../theme';

interface Node { x: number; y: number; vx: number; vy: number }
interface Pulse { a: Node; b: Node; t: number }

/** Decorative network behind the hero. Only animates while visible and never under reduced motion. */
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    const cv = ref.current;
    const cx = cv?.getContext('2d');
    if (!cv || !cx) return;
    const rm = prefersReducedMotion();
    let W = 0, H = 0, lastW = 0, wait = 30, running = false, raf = 0, resizeTimer: ReturnType<typeof setTimeout>;
    let nodes: Node[] = [];
    let pulse: Pulse | null = null;
    let green = '#0a0', ink = '#000';
    let mx = -1e4, my = -1e4, pointer = false;

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      green = s.getPropertyValue('--green').trim() || green;
      ink = s.getPropertyValue('--ink').trim() || ink;
    };
    const draw = () => {
      cx.clearRect(0, 0, W, H);
      cx.lineWidth = 1;
      cx.strokeStyle = ink;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 130) {
            cx.globalAlpha = (1 - d / 130) * 0.2;
            cx.beginPath();
            cx.moveTo(nodes[i].x, nodes[i].y);
            cx.lineTo(nodes[j].x, nodes[j].y);
            cx.stroke();
          }
        }
      }
      cx.globalAlpha = 0.28;
      cx.fillStyle = ink;
      nodes.forEach((n) => { cx.beginPath(); cx.arc(n.x, n.y, 2, 0, 6.3); cx.fill(); });
      if (pulse) {
        cx.globalAlpha = 0.9;
        cx.fillStyle = green;
        cx.beginPath();
        cx.arc(pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.t, pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.t, 3.2, 0, 6.3);
        cx.fill();
      }
      if (pointer) {
        cx.strokeStyle = green;
        nodes.forEach((n) => {
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < 150) { cx.globalAlpha = (1 - d / 150) * 0.6; cx.beginPath(); cx.moveTo(mx, my); cx.lineTo(n.x, n.y); cx.stroke(); }
        });
        cx.globalAlpha = 0.7; cx.beginPath(); cx.arc(mx, my, 4, 0, 6.3); cx.stroke();
      }
      cx.globalAlpha = 1;
    };
    const fit = (): boolean => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const b = cv.getBoundingClientRect();
      if (!b.width) return false;
      W = b.width; H = b.height;
      cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };
    const build = () => {
      if (!fit()) return;
      lastW = W;
      const n = Math.min(26, Math.round((W * H) / 17000));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
      colors();
      draw();
    };
    const pick = () => {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      let best: Node | null = null, bd = 1e9;
      nodes.forEach((b) => {
        const e = Math.hypot(a.x - b.x, a.y - b.y);
        if (b !== a && e < 130 && e < bd) { best = b; bd = e; }
      });
      pulse = best ? { a, b: best, t: 0 } : null;
      wait = best ? 0 : 20;
    };
    const step = () => {
      if (!running) return;
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.min(Math.max(n.x, 0), W);
        n.y = Math.min(Math.max(n.y, 0), H);
      });
      if (!pulse) { if (wait-- <= 0) pick(); }
      else { pulse.t += 0.015; if (pulse.t >= 1) { pulse = null; wait = 50 + Math.random() * 90; } }
      draw();
      raf = requestAnimationFrame(step);
    };

    build();
    redraw.current = () => { colors(); draw(); };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (Math.abs(cv.getBoundingClientRect().width - lastW) > 1) build();
        else if (fit()) draw();
      }, 150);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(cv);
    const host = cv.parentElement;
    const onMove = (e: PointerEvent) => { const b = cv.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; pointer = true; };
    const onLeave = () => { pointer = false; };
    const fine = !rm && !!host && matchMedia('(pointer: fine)').matches;
    if (fine) { host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave); }

    let io: IntersectionObserver | undefined;
    if (!rm) {
      io = new IntersectionObserver((es) => {
        const visible = es[0].isIntersecting;
        if (visible && !running) { running = true; raf = requestAnimationFrame(step); }
        else if (!visible) running = false;
      });
      io.observe(cv);
    }
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      if (fine) { host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); }
      io?.disconnect();
    };
  }, []);

  // Re-read the colours when the theme changes.
  useEffect(() => { redraw.current(); }, [theme]);

  return <canvas ref={ref} className="net" aria-hidden="true" />;
}
