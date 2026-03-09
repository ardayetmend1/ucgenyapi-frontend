---
name: theme-factory
description: Toolkit for styling components and pages with professional themes. Use when the user wants to apply a visual theme, create a design system, choose color palettes, or set up consistent styling across the application. Provides 10 pre-set themes with colors/fonts that can be applied to any component, or generates new themes on-the-fly.
---

# Theme Factory Skill

This skill provides a curated collection of professional font and color themes, each with carefully selected color palettes and font pairings. Once a theme is chosen, it can be applied to any component or page.

## Purpose

Apply consistent, professional styling to any React component or page. Each theme includes:
- A cohesive color palette with hex codes and CSS variables
- Complementary font pairings for headers and body text (Google Fonts)
- A distinct visual identity suitable for different contexts and audiences
- Tailwind / CSS variable integration ready

## Available Themes

1. **Ocean Depths** — Professional and calming maritime theme
   - Primary: `#0A2647`, Accent: `#00D2FF`, Background: `#E8F4F8`
   - Fonts: "Playfair Display" (headers) + "Source Sans 3" (body)

2. **Sunset Boulevard** — Warm and vibrant sunset colors
   - Primary: `#FF6B35`, Accent: `#F7C59F`, Background: `#1A1423`
   - Fonts: "Sora" (headers) + "Nunito" (body)

3. **Forest Canopy** — Natural and grounded earth tones
   - Primary: `#2D6A4F`, Accent: `#95D5B2`, Background: `#FAF3E0`
   - Fonts: "Fraunces" (headers) + "Work Sans" (body)

4. **Modern Minimalist** — Clean and contemporary grayscale
   - Primary: `#1A1A2E`, Accent: `#E94560`, Background: `#FAFAFA`
   - Fonts: "Outfit" (headers) + "DM Sans" (body)

5. **Golden Hour** — Rich and warm autumnal palette
   - Primary: `#B8860B`, Accent: `#FFD700`, Background: `#1C1C1C`
   - Fonts: "Cormorant Garamond" (headers) + "Raleway" (body)

6. **Arctic Frost** — Cool and crisp winter-inspired theme
   - Primary: `#E0FBFC`, Accent: `#3D5A80`, Background: `#0B132B`
   - Fonts: "Space Grotesk" (headers) + "IBM Plex Sans" (body)

7. **Desert Rose** — Soft and sophisticated dusty tones
   - Primary: `#C9ADA7`, Accent: `#9A8C98`, Background: `#22223B`
   - Fonts: "Libre Baskerville" (headers) + "Karla" (body)

8. **Tech Innovation** — Bold and modern tech aesthetic
   - Primary: `#00F5D4`, Accent: `#7B2FF7`, Background: `#0D0D0D`
   - Fonts: "JetBrains Mono" (headers) + "Inter Tight" (body)

9. **Botanical Garden** — Fresh and organic garden colors
   - Primary: `#606C38`, Accent: `#FEFAE0`, Background: `#283618`
   - Fonts: "Lora" (headers) + "Jost" (body)

10. **Midnight Galaxy** — Dramatic and cosmic deep tones
    - Primary: `#7400B8`, Accent: `#80FFDB`, Background: `#10002B`
    - Fonts: "Clash Display" (headers) + "General Sans" (body)

## Usage Instructions

1. **Show available themes**: Present the list above to the user
2. **Ask for their choice**: Ask which theme fits their project
3. **Apply the theme**: Generate CSS variables, Tailwind config, or styled-components theme object
4. **Consistency**: Ensure all components use theme tokens, never hardcoded colors

## Custom Theme Creation

If none of the existing themes work:
1. Ask the user for a mood, reference, or brand colors
2. Generate a cohesive palette (primary, secondary, accent, background, text, muted, border)
3. Select complementary Google Fonts pairing
4. Output as CSS variables + Tailwind config

## Output Format

```css
:root {
  --color-primary: #value;
  --color-accent: #value;
  --color-background: #value;
  --color-text: #value;
  --color-muted: #value;
  --color-border: #value;
  --font-heading: 'Font Name', serif;
  --font-body: 'Font Name', sans-serif;
}
```
