---
name: component-builder
description: Build production-ready, reusable React components with best practices. Use this skill when the user asks to create a new UI component like a button, card, modal, navbar, sidebar, form, table, dropdown, tooltip, or any other reusable interface element.
---

# Component Builder Skill

Build production-ready, reusable React components that are accessible, responsive, and beautifully designed.

## Process

When asked to create a component:

1. **Understand the context**: What page/feature is this for? What data does it display?
2. **Design first**: Decide on the visual style before writing code
3. **Implement with quality**: Clean code, proper props, accessibility built-in

## Component Standards

### File Structure
```
src/components/ComponentName/
├── ComponentName.jsx      # Main component
├── ComponentName.css      # Styles (CSS Modules or plain CSS)
└── index.js               # Re-export
```

### Code Quality Rules
- **Props**: Always destructure, provide sensible defaults
- **Accessibility**: Use semantic HTML, ARIA labels, keyboard navigation
- **Responsive**: Mobile-first approach, use clamp() and container queries
- **Animation**: Subtle entrance animations, smooth hover/focus transitions
- **States**: Handle loading, empty, error, and success states visually

### Design Principles
- Every component should feel INTENTIONAL, not template-generated
- Use consistent spacing scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64)
- Border radius should be consistent across the app
- Shadows should have purpose (elevation hierarchy)
- Color contrast must meet WCAG AA (4.5:1 for text)
- Focus indicators must be visible and styled

### Component Categories

**Layout**: Container, Grid, Stack, Divider, Spacer
**Navigation**: Navbar, Sidebar, Breadcrumb, Tabs, Pagination
**Data Display**: Card, Table, List, Badge, Avatar, Tooltip, Stat
**Forms**: Input, Select, Checkbox, Radio, Switch, Textarea, DatePicker
**Feedback**: Alert, Toast, Modal, Drawer, Progress, Skeleton, Spinner
**Actions**: Button, IconButton, ButtonGroup, FAB, Dropdown

### Animation Defaults
```css
/* Entrance */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover lift */
.interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Smooth transitions */
.component {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Anti-Patterns to Avoid
- Generic gray boxes with no personality
- Inconsistent padding/margins between components
- Missing hover/focus/active states
- Hard-coded colors instead of theme variables
- No loading/empty state handling
- Ignoring keyboard accessibility
- Using divs when semantic elements exist (button, nav, main, section, article)
