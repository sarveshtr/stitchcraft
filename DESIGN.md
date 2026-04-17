# Design Brief

## Purpose & Context
Elegant stitching/tailoring service platform for booking custom garments. Users experience refined luxury; admin experience focused efficiency.

## Tone
Soft luxury editorial — sophisticated, fashion-forward, approachable. Confidence without clutter.

## Color Palette
| Token              | OKLCH           | Purpose                              |
|--------------------|-----------------|--------------------------------------|
| Primary (Rose)     | 0.58 0.12 24    | Buttons, accents, primary CTA        |
| Accent (Mauve)     | 0.65 0.15 26    | Highlights, interactive states      |
| Background (Cream) | 0.97 0.01 70    | Main surface, breathing space        |
| Card (Warm White)  | 0.99 0.01 65    | Card backgrounds, elevated surfaces  |
| Muted (Pale Cream) | 0.93 0.01 70    | Secondary backgrounds, dividers      |
| Foreground (Char)  | 0.2 0.01 52     | Body text, primary content          |

## Typography
| Role            | Font                | Usage                                |
|-----------------|---------------------|--------------------------------------|
| Display / Serif | Lora (400, 700)     | Headlines, service titles, emphasis  |
| Body / Modern   | Plus Jakarta Sans   | Body copy, UI labels, interactions   |
| Mono / Code     | Geist Mono          | Pricing, order codes, measurements   |

Type scale: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px (8px grid base).

## Elevation & Depth
- **Card elevation**: shadow-elegant (subtle 2px offset, low opacity spread)
- **Modal/overlay**: shadow-lifted (emphasized 4px offset, greater depth)
- **Hover state**: +1px shadow increase, scaled at 1.02
- **Radius**: 12px default (soft, not sharp), 4px buttons (accessible touch), 0px sections (clean blocks)

## Structural Zones
| Zone            | Background             | Treatment                                  |
|-----------------|------------------------|---------------------------------------------|
| Header/Nav      | Warm White (card)      | shadow-elegant border-b, no background blur |
| Hero            | Cream (background)     | Full width, subtle gradient accent overlay  |
| Content Section | Cream (background)     | Alt section rows: muted-30 background       |
| Cards/Service   | Warm White (card)      | shadow-elegant, hover shadow-lifted         |
| Footer          | Muted (pale cream)     | border-t, service link grouping             |

## Spacing & Rhythm
Baseline 4px grid. Components use 8px, 16px, 24px, 32px padding/margins. Breathing room > density.

## Component Patterns
- **Button**: Primary (rose bg, white text, shadow-elegant), Secondary (muted bg, charcoal text), Ghost (transparent, underline on hover)
- **Card**: shadow-elegant, 16px padding, full-width on mobile, grid layout desktop
- **Input**: border-input, rounded-md, focus ring-accent with no outline
- **Service tile**: Image + title (Lora), price (Geist Mono), description, "Book" button

## Motion
- **Default transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive elements
- **Fade entrance**: opacity 0–1 over 0.2s on page load
- **Slide in**: translateY(10px) → 0 over 0.4s for card reveals
- **Hover scale**: 1.02 on card/button, instant shadow lift
- **No bouncing, no overshoot**: Maintain refinement

## Constraints
- Light mode primary; dark mode available with warm tone preservation
- Mobile-first: start at 360px, scale to 1400px
- Maximum content width: 1400px with 2rem padding
- No generic default shadows; all shadows contextual and mood-appropriate
- Typography hierarchy through size + Lora serif emphasis, never weight alone

## Signature Detail
Rose gold accent stroke on hero images; subtle Lora serif italics for subheadings; cream-to-white gradient on card tops for depth without visual heaviness.
