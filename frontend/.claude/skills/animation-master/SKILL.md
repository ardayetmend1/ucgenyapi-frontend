---
name: animation-master
description: Create stunning CSS and JS animations for React components. Use this skill when the user asks for animations, transitions, scroll effects, loading spinners, page transitions, hover effects, micro-interactions, or any motion design work.
---

# Animation Master Skill

Create fluid, purposeful animations that elevate the user experience. Every motion should feel intentional and enhance comprehension.

## Animation Philosophy

- **Purpose over decoration**: Every animation should communicate something — state change, spatial relationship, or feedback
- **Physics over math**: Use easing curves that mimic real-world physics (spring, bounce, friction)
- **Restraint over excess**: One perfectly timed animation beats ten competing ones
- **Performance over beauty**: Never sacrifice 60fps. Use `transform` and `opacity` only when possible

## Easing Functions

```css
/* Natural motion — use these, not linear */
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);       /* Deceleration — entering elements */
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);           /* Acceleration — exiting elements */
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);     /* Smooth — repositioning */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Overshoot — playful emphasis */
--ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);   /* Bouncy — fun interactions */
```

## Duration Guidelines

| Type | Duration | Use Case |
|------|----------|----------|
| Micro | 100-150ms | Button press, toggle, checkbox |
| Small | 200-300ms | Tooltips, dropdowns, fades |
| Medium | 300-500ms | Modals, page sections, cards |
| Large | 500-800ms | Page transitions, hero animations |
| Stagger | 50-100ms | Delay between list items |

## Core Animation Patterns

### Page Load — Staggered Reveal
```css
.stagger-in > * {
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.6s var(--ease-out) forwards;
}
.stagger-in > *:nth-child(1) { animation-delay: 0ms; }
.stagger-in > *:nth-child(2) { animation-delay: 80ms; }
.stagger-in > *:nth-child(3) { animation-delay: 160ms; }
.stagger-in > *:nth-child(4) { animation-delay: 240ms; }

@keyframes revealUp {
  to { opacity: 1; transform: translateY(0); }
}
```

### Scroll-Triggered Animations
```javascript
// Intersection Observer — lightweight scroll trigger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
```

### Hover Effects
```css
/* Lift and glow */
.card-hover {
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
}
.card-hover:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

/* Magnetic button */
.btn-magnetic {
  transition: transform 0.2s var(--ease-out);
}
.btn-magnetic:hover {
  transform: scale(1.05);
}
.btn-magnetic:active {
  transform: scale(0.97);
  transition-duration: 0.1s;
}
```

### Loading States
```css
/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Pulse dot loader */
.loader-dots span {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 1.4s infinite both;
}
.loader-dots span:nth-child(2) { animation-delay: 0.16s; }
.loader-dots span:nth-child(3) { animation-delay: 0.32s; }
@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
```

### Page Transitions (React)
```jsx
// Simple fade transition wrapper
function PageTransition({ children }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}

// CSS
.page-transition {
  animation: pageIn 0.4s var(--ease-out);
}
@keyframes pageIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Performance Rules

1. **Only animate `transform` and `opacity`** — they don't trigger layout/paint
2. **Use `will-change` sparingly** — only on elements about to animate
3. **Prefer CSS over JS** for simple animations
4. **Use `requestAnimationFrame`** for JS animations
5. **Respect `prefers-reduced-motion`** — always provide a reduced alternative
6. **Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`** — use transforms instead

## Anti-Patterns
- Animations longer than 1 second (feels sluggish)
- Linear easing (feels robotic)
- Animating layout properties (causes jank)
- Too many competing animations at once
- Animations that block user interaction
- No reduced-motion fallback
