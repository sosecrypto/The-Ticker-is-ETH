import { useEffect, useRef, useCallback } from 'react';

// --- Constants ---
const POOL_SIZE = 15;
const SPAWN_INTERVAL = 60;
const LIFETIME = 600;
const CURSOR_SIZE = 28;
const PARTICLE_SIZE = 14;

// --- Types ---
interface Particle {
  el: HTMLDivElement | null;
  born: number;
  x: number;
  y: number;
  active: boolean;
}

// --- SVG ---
const ETH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid">
  <path fill="#A086FC" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
  <path fill="#C4B5FD" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
  <path fill="#A086FC" d="M127.961 312.187l-1.575 1.92V414.45l1.575 4.6L256 236.587z"/>
  <path fill="#C4B5FD" d="M127.962 419.05V312.187L0 236.587z"/>
  <path fill="#7B6BD8" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/>
  <path fill="#9B8AE8" d="M0 212.32l127.96 75.639v-133.8z"/>
</svg>`;

const encodedSvg = `data:image/svg+xml,${encodeURIComponent(ETH_SVG)}`;

// --- Touch detection ---
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

// --- Component ---
const EthCursorTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastSpawnRef = useRef(0);
  const rafRef = useRef(0);
  const isTouchRef = useRef(true);

  const initPool = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const pool: Particle[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        width: ${PARTICLE_SIZE}px;
        height: ${PARTICLE_SIZE}px;
        pointer-events: none;
        opacity: 0;
        will-change: transform, opacity;
        z-index: 9998;
        filter: drop-shadow(0 0 4px rgba(160, 134, 252, 0.5));
      `;
      const img = document.createElement('img');
      img.src = encodedSvg;
      img.style.cssText = 'width: 100%; height: 100%;';
      img.alt = '';
      img.draggable = false;
      el.appendChild(img);
      container.appendChild(el);
      pool.push({ el, born: 0, x: 0, y: 0, active: false });
    }
    poolRef.current = pool;
  }, []);

  const animate = useCallback((now: number) => {
    const { x, y } = mouseRef.current;
    const cursor = cursorRef.current;
    const pool = poolRef.current;

    // Update cursor position
    if (cursor) {
      cursor.style.transform = `translate3d(${x - CURSOR_SIZE / 2}px, ${y - CURSOR_SIZE / 2}px, 0)`;
    }

    // Spawn new particle
    if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
      lastSpawnRef.current = now;
      const inactive = pool.find((p) => !p.active);
      if (inactive) {
        inactive.active = true;
        inactive.born = now;
        inactive.x = x;
        inactive.y = y;
      }
    }

    // Update particles
    for (const p of pool) {
      if (!p.active || !p.el) continue;

      const age = now - p.born;
      if (age >= LIFETIME) {
        p.active = false;
        p.el.style.opacity = '0';
        continue;
      }

      const progress = age / LIFETIME;
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const opacity = 1 - eased;
      const scale = 1 - 0.7 * eased;
      const rotation = progress * 30;

      p.el.style.opacity = String(opacity);
      p.el.style.transform = `translate3d(${p.x - PARTICLE_SIZE / 2}px, ${p.y - PARTICLE_SIZE / 2}px, 0) scale(${scale}) rotate(${rotation}deg)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouchDevice()) {
      isTouchRef.current = true;
      return;
    }
    isTouchRef.current = false;

    initPool();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initPool, animate]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && isTouchDevice()) {
    return null;
  }

  return (
    <>
      {/* Particle container */}
      <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />

      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: 'drop-shadow(0 0 8px rgba(160, 134, 252, 0.6))',
          willChange: 'transform',
          top: 0,
          left: 0,
        }}
      >
        <img
          src={encodedSvg}
          alt=""
          draggable={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
};

export default EthCursorTrail;
