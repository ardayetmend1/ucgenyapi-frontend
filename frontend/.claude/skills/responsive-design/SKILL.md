---
name: responsive-design
description: Create fully responsive, mobile-first layouts and interfaces. Use this skill when the user asks to make something responsive, fix mobile layout issues, create adaptive designs, or build layouts that work across all screen sizes.
---

# Responsive Design Skill

Build interfaces that look stunning on every screen size — from mobile phones to ultrawide monitors.

## Core Philosophy

**Mobile-first, always.** Start with the smallest screen and enhance upward. This produces cleaner CSS, faster mobile loads, and better overall architecture.

## Breakpoint System

```css
/* Mobile first — base styles are for mobile */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }

/* Ultrawide */
@media (min-width: 1920px) { }
```

## Modern CSS Techniques

### Fluid Typography (no breakpoints needed)
```css
/* Scales smoothly from 16px to 24px */
font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);

/* Heading scale */
h1 { font-size: clamp(2rem, 1rem + 4vw, 4rem); }
h2 { font-size: clamp(1.5rem, 0.75rem + 3vw, 2.5rem); }
```

### Container Queries (component-level responsiveness)
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Auto-fit Grids
```css
/* Cards that auto-adjust column count */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}
```

## Layout Patterns

### Stack (vertical rhythm)
```css
.stack > * + * {
  margin-block-start: var(--space, 1rem);
}
```

### Sidebar Layout
```css
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.with-sidebar > :first-child {
  flex-basis: 300px;
  flex-grow: 1;
}
.with-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 60%;
}
```

### Content Max-Width
```css
.content {
  width: min(90%, 1200px);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
}
```

## Responsive Component Rules

### Navigation
- **Mobile**: Hamburger menu, slide-in drawer or full-screen overlay
- **Tablet**: Collapsed sidebar or icon-only nav
- **Desktop**: Full horizontal navbar or expanded sidebar

### Images
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Art direction with picture element */
<picture>
  <source srcset="hero-wide.jpg" media="(min-width: 1024px)">
  <source srcset="hero-medium.jpg" media="(min-width: 768px)">
  <img src="hero-mobile.jpg" alt="...">
</picture>
```

### Tables
- **Mobile**: Stack rows vertically or use horizontal scroll container
- **Desktop**: Standard table layout

### Forms
- **Mobile**: Full-width inputs, stacked labels
- **Desktop**: Inline labels, multi-column layouts where appropriate

## Touch-Friendly Design
- Minimum touch target: 44x44px
- Adequate spacing between interactive elements (min 8px gap)
- No hover-only interactions — everything accessible via tap
- Use `:hover` AND `:focus-visible` together
- Avoid small close buttons, tiny links, or cramped controls

## Performance Considerations
- Lazy load images below the fold
- Use `loading="lazy"` and `decoding="async"` on images
- Avoid layout shifts (set explicit width/height on media)
- Prefer CSS over JS for responsive behavior
- Use `prefers-reduced-motion` media query for accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Checklist
- [ ] iPhone SE (375px) — smallest common mobile
- [ ] iPhone 14 Pro (393px) — standard mobile
- [ ] iPad (768px) — tablet portrait
- [ ] iPad Landscape (1024px) — tablet/small laptop
- [ ] Desktop (1440px) — standard desktop
- [ ] Ultrawide (1920px+) — content doesn't stretch awkwardly
- [ ] Text zoom 200% — layout doesn't break
- [ ] Landscape mobile — no horizontal overflow
