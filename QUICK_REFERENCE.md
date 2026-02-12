# Toy Exchange - Quick Reference Guide

**Companion to all design documents**
**Focus:** Quick lookup tables and decision matrices

---

## Mode Comparison Matrix

| Feature | Default | Kids | Professional |
|---------|---------|------|--------------|
| **Primary Color** | Amber-500 | Violet-500 | Blue-500 |
| **Background** | slate-950 | indigo-50 | slate-900 |
| **Text Color** | White | indigo-900 | White |
| **Navbar Height** | h-16 | h-20 | h-14 |
| **Card Images** | h-48 | h-56 | h-40 |
| **Card Padding** | p-4 | p-6 | p-3 |
| **Grid Columns** | 4 (xl) | 3 (lg) | 5 (xl) |
| **Font Size Body** | 14px | 16px | 13px |
| **Font Weight** | normal | bold | normal |
| **Rounded Corners** | rounded-xl | rounded-2xl | rounded-lg |
| **Animations** | Subtle | Playful | None |
| **Touch Targets** | 44px | 56px | 40px |
| **Keyboard Shortcuts** | Yes (Cmd+K/M) | Limited | Yes (Cmd+K/M) |
| **Data Visualization** | Basic | Hidden | Advanced |
| **Target Users** | General | Kids 8-14 | Collectors |
| **Primary Action** | Focused | Celebratory | Efficient |

---

## Component Quick Specs

### Navbar

```
┌─────────────────────────────────────────────────────────────┐
│ Default  │ Kids           │ Professional                    │
├──────────┼────────────────┼─────────────────────────────────┤
│ h-16     │ h-20           │ h-14                            │
│ px-4     │ px-6           │ px-3                            │
│ dark     │ light gradient │ darker dark                     │
│ links    │ emoji links    │ compact links                   │
│ hover    │ bounce         │ underline                       │
│ mobile   │ large toggle   │ compact toggle                  │
└─────────────────────────────────────────────────────────────┘
```

### Listing Card

```
┌─────────────────────────────────────────────────────────────┐
│ Default  │ Kids           │ Professional                    │
├──────────┼────────────────┼─────────────────────────────────┤
│ h-48     │ h-56           │ h-40                            │
│ p-4      │ p-6            │ p-3                            │
│ border-1 │ border-2       │ border-1                        │
│ hover:   │ hover:         │ hover:                          │
│ scale    │ lift + shadow  │ border only                     │
│ ~400px   │ ~520px         │ ~300px                          │
│ height   │ height         │ height                          │
└─────────────────────────────────────────────────────────────┘
```

### Button (Primary Action)

```
┌─────────────────────────────────────────────────────────────┐
│ Default        │ Kids               │ Professional        │
├────────────────┼────────────────────┼─────────────────────┤
│ bg-amber-500   │ bg-gradient        │ bg-blue-600         │
│ hover:amber-600│ hover: scale up    │ hover:blue-700      │
│ text-white     │ + shadow + bounce  │ text-white          │
│ py-2           │ emoji prefix       │ py-1.5              │
│ px-4           │ py-3               │ px-3                │
│ rounded-lg     │ px-6               │ rounded-lg          │
│               │ rounded-xl         │                     │
│               │ text-lg            │ text-sm             │
└────────────────┴────────────────────┴─────────────────────┘
```

---

## Color Palette Quick Reference

### Default Theme (Slate + Amber)

```
Backgrounds:     #0f172a, #111827, #1e293b (slate series)
Text:            #ffffff, #cbd5e1, #94a3b8 (white to gray)
Accent:          #f59e0b (amber-500)
Status Colors:   ✓ Emerald, ✗ Red, ⚠ Amber
Contrast:        7.5:1 (WCAG AAA)
```

### Kids Theme (Indigo + Violet + Accessories)

```
Backgrounds:     #eef2ff, #ffffff, #e0e7ff (indigo + white)
Text:            #312e81, #3730a3, #4f46e5 (indigo series)
Primary Accent:  #a78bfa (violet-500)
Supporting:      #f472b6 (pink), #38bdf8 (cyan), #a3e635 (lime)
Status Colors:   ✓ Emerald, ✗ Rose, ⚠ Amber
Emojis:          🧩, 🚗, 🧸, 🎮, ⭐, 🎉, 💚, 💛, 💔
Contrast:        5.5:1+ (WCAG AA)
```

### Professional Theme (Slate + Blue + Data)

```
Backgrounds:     #111827, #1e293b, #334155 (slate series)
Text:            #ffffff, #cbd5e1, #94a3b8 (white to gray)
Primary Accent:  #3b82f6 (blue-500)
Data Colors:     ↑ Emerald, ↓ Rose, → Slate, ⭐ Yellow
Analytics:       Blue (volume), Orange (volatility), Purple (trend)
Contrast:        7.5:1 (WCAG AAA)
```

---

## Typography Hierarchy

### Default Mode

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| H1 | 36px | bold | 1.4 | Page title |
| H2 | 28px | bold | 1.4 | Section title |
| H3 | 20px | semibold | 1.4 | Subsection |
| H4 | 16px | semibold | 1.5 | Component title |
| Body | 14px | normal | 1.6 | Main content |
| Small | 12px | normal | 1.5 | Helper/meta |
| Mono | 14px | bold | 1.6 | Prices, codes |

### Kids Mode

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| H1 | 40px | black | 1.3 | Page title (big!) |
| H2 | 32px | bold | 1.3 | Section title |
| H3 | 24px | bold | 1.2 | Subsection |
| H4 | 18px | bold | 1.2 | Component title |
| Body | 16px | normal | 1.8 | Main content (big!) |
| Small | 14px | normal | 1.6 | Helper/meta |
| Mono | 16px | bold | 1.8 | Prices (clear) |

### Professional Mode

| Element | Size | Weight | Line Height | Use Case |
|---------|------|--------|-------------|----------|
| H1 | 32px | bold | 1.4 | Page title |
| H2 | 24px | bold | 1.4 | Section title |
| H3 | 18px | semibold | 1.4 | Subsection |
| H4 | 14px | semibold | 1.5 | Component title |
| Body | 13px | normal | 1.6 | Main content (compact) |
| Small | 11px | normal | 1.5 | Helper/meta |
| Mono | 13px | bold | 1.6 | Prices, data (tight) |

---

## Spacing System

### Default Mode (Base 4px)

| Scale | Value | Use Case |
|-------|-------|----------|
| xs | 4px | Minimal gaps |
| sm | 8px | Tight spacing |
| md | 12px | Breathing room |
| lg | 16px | Standard gap |
| xl | 24px | Section spacing |
| 2xl | 32px | Major sections |
| 3xl | 48px | Full sections |

### Kids Mode (Base 6px, 50-75% larger)

| Scale | Value | Use Case |
|-------|-------|----------|
| xs | 6px | Minimal gaps |
| sm | 12px | Tight spacing |
| md | 18px | Breathing room |
| lg | 24px | Standard gap |
| xl | 36px | Section spacing |
| 2xl | 48px | Major sections |
| 3xl | 72px | Full sections |

### Professional Mode (Base 2px, 25% tighter)

| Scale | Value | Use Case |
|-------|-------|----------|
| xs | 2px | Minimal gaps |
| sm | 6px | Tight spacing |
| md | 10px | Breathing room |
| lg | 14px | Standard gap |
| xl | 20px | Section spacing |
| 2xl | 28px | Major sections |
| 3xl | 40px | Full sections |

---

## Grid Layouts by Breakpoint

### Default Mode

| Breakpoint | Columns | Card Width | Gap |
|------------|---------|-----------|-----|
| Mobile (320px) | 1 | Full - 32px | 16px |
| Tablet (768px) | 2 | ~360px | 16px |
| Desktop (1024px) | 3 | ~300px | 16px |
| Wide (1280px) | 4 | ~265px | 16px |

### Kids Mode

| Breakpoint | Columns | Card Width | Gap |
|------------|---------|-----------|-----|
| Mobile (320px) | 1 | Full - 48px | 24px |
| Tablet (768px) | 2 | ~360px | 24px |
| Desktop (1024px) | 3 | ~340px | 24px |
| Wide (1280px) | 3 | ~360px | 24px |

### Professional Mode

| Breakpoint | Columns | Card Width | Gap |
|------------|---------|-----------|-----|
| Mobile (320px) | 2 | ~140px | 8px |
| Tablet (768px) | 3 | ~240px | 8px |
| Desktop (1024px) | 4 | ~270px | 8px |
| Wide (1280px) | 5 | ~230px | 8px |

---

## Animation Specifications

### Default Mode

| Animation | Duration | Timing | Use Case |
|-----------|----------|--------|----------|
| Hover | 200ms | ease-in-out | Button, link hover |
| Transition | 300ms | ease-out | Color changes |
| Scale | 200ms | linear | Border changes |

### Kids Mode

| Animation | Duration | Timing | Use Case |
|-----------|----------|--------|----------|
| Hover Bounce | 300ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Card lift |
| Scale Up | 300ms | ease-out | Button press |
| Celebration | 600ms | ease-in-out | Success state |
| Confetti | 1200ms | ease-out | Major success |
| Pulse | 1.5s | ease-in-out | Timer urgent |

### Professional Mode

| Animation | Duration | Timing | Use Case |
|-----------|----------|--------|----------|
| None | 0ms | N/A | All interactions instant |

---

## Responsive Typography

### Mobile Adjustments

```
DEFAULT MODE:
Body:  14px → 13px (readable on small screens)
H4:    16px → 14px
Small: 12px → 11px

KIDS MODE:
Body:  16px → 15px (maintain readability)
H1:    40px → 36px (fit in viewport)
H3:    24px → 20px

PROFESSIONAL MODE:
Body:  13px → 12px (compact even tighter)
Small: 11px → 10px
```

---

## Touch Target Sizes

### Minimum Safe Areas

```
DEFAULT:  40×40px minimum, 44×44px recommended
KIDS:     48×48px minimum, 56×56px recommended (larger!)
PROF:     40×40px minimum, 44×44px standard

Button Padding:
- Default:  px-4 py-2 (32×40px)
- Kids:     px-6 py-3 (48×48px+)
- Prof:     px-3 py-1.5 (28×36px)
```

---

## Keyboard Navigation

### Available Shortcuts

```
ALL MODES:
✓ Tab              Navigate next
✓ Shift+Tab        Navigate previous
✓ Enter/Space      Activate button
✓ Escape           Close modal/dropdown
✓ Arrow keys       Dropdown navigation

DEFAULT MODE:
✓ Cmd+K (Mac)      Focus search
✓ Ctrl+K (Windows) Focus search
✓ Cmd+M (Mac)      Open mode switcher
✓ Ctrl+M (Windows) Open mode switcher

KIDS MODE:
✓ Tab preferred (arrow keys optional)
✗ No keyboard shortcuts (mouse/touch focused)

PROFESSIONAL MODE:
✓ Cmd+K (Mac)      Focus search
✓ Ctrl+K (Windows) Focus search
✓ Cmd+M (Mac)      Open mode switcher
✓ Ctrl+M (Windows) Open mode switcher
✓ Cmd+Enter        Submit form
✓ Ctrl+Enter       Submit form
```

---

## Color Contrast Verification

### Required Ratios

```
Text on Background:
- AAA (Enhanced):  7:1 or higher
- AA (Minimum):    4.5:1
- Large text AA:   3:1

Current Implementation:
DEFAULT:  7.5:1 (AAA) ✓
KIDS:     5.5:1+ (AA) ✓ (higher for main text)
PROF:     7.5:1 (AAA) ✓
```

### Verification Tools

```
Online:
- WebAIM: webaim.org/resources/contrastchecker
- WCAG Contrast Checker
- Color Oracle (color blindness simulator)

Browser:
- DevTools > Inspect > Accessibility tab
- axe DevTools extension
- Lighthouse

Command Line:
- contrast-checker CLI
```

---

## Accessibility Checklist

### Minimum Requirements

- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Color contrast ≥ 3:1 for large text (18px+)
- [ ] Touch targets ≥ 44×44px
- [ ] Keyboard navigation (Tab, Enter, Escape, Arrows)
- [ ] ARIA labels on interactive elements
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] No content hidden by color alone
- [ ] Focus visible (outline or ring)
- [ ] Alt text for all images
- [ ] Form labels properly associated

### Testing Per Mode

**Default Mode:**
- [ ] Test with axe or Lighthouse
- [ ] Keyboard navigation complete
- [ ] Dark theme contrast verified

**Kids Mode:**
- [ ] Test with actual children if possible
- [ ] Large touch targets verified on mobile
- [ ] Emoji icons don't replace text (duplicate)
- [ ] Focus rings visible and obvious

**Professional Mode:**
- [ ] Data visualization color-coded + labeled
- [ ] Keyboard shortcuts documented
- [ ] Small text still readable (≥11px)

---

## Component Props Reference

### Listing Card

```svelte
<ListingCard
  listing={ToyListing}
  mode?="default" | "kids" | "professional"
/>
```

### Condition Badge

```svelte
<ConditionBadge
  condition="A" | "B" | "C" | "D" | "F"
  mode?="default" | "kids" | "professional"
  size?="xs" | "sm" | "md" | "lg"
/>
```

### Countdown Timer

```svelte
<CountdownTimer
  endTime={number} // milliseconds timestamp
  mode?="default" | "kids" | "professional"
/>
```

### Mode Switcher

```svelte
<ModeSwitcher />
<!-- No props needed, reads from theme store -->
```

---

## File Organization Quick Map

```
src/lib/
├── stores/
│   ├── theme.svelte.ts        ← Theme management
│   ├── listings.svelte.ts
│   ├── user.svelte.ts
│   └── bids.svelte.ts
│
├── styles/
│   ├── colors/
│   │   ├── default.ts         ← Default palette
│   │   ├── kids.ts            ← Kids palette
│   │   ├── professional.ts    ← Professional palette
│   │   └── index.ts
│   └── theme.css              ← CSS variables
│
├── components/
│   ├── layout/
│   │   ├── Navbar.svelte      ← MODE PROP
│   │   ├── ModeSwitcher.svelte ← NEW
│   │   └── Footer.svelte
│   │
│   ├── listings/
│   │   ├── ListingCard.svelte  ← MODE PROP
│   │   ├── ListingGrid.svelte  ← MODE PROP
│   │   ├── CategoryFilter.svelte ← MODE PROP
│   │   └── ConditionBadge.svelte ← MODE PROP
│   │
│   ├── bidding/
│   │   ├── BidForm.svelte      ← MODE STYLING
│   │   ├── CountdownTimer.svelte ← MODE PROP
│   │   └── BidHistory.svelte   ← MODE PROP
│   │
│   └── common/
│       ├── LoadingState.svelte  ← NEW, MODE AWARE
│       └── EmptyState.svelte    ← NEW, MODE AWARE
│
└── utils/
    ├── theme.ts               ← NEW, utilities
    ├── format.ts
    └── chart.ts
```

---

## Implementation Phases Summary

### Phase 1 (Week 1): Foundation
- Create theme store
- Build Mode Switcher
- Add Tailwind config variants
- Update root layout

**LOE:** 16-20 hours

### Phase 2 (Week 2): Components
- Update Navbar for all modes
- Update ListingCard for all modes
- Update ConditionBadge for all modes
- Update Listing Grid for all modes

**LOE:** 20-24 hours

### Phase 3 (Week 3): Pages & Forms
- Update Market page layout
- Update Detail page layout
- Update Create Listing form
- Update Dashboard tabs

**LOE:** 20-24 hours

### Phase 4 (Week 4): Polish
- Add animations (Kids Mode)
- Loading/empty states
- Mobile tweaks
- Keyboard shortcuts

**LOE:** 16-20 hours

### Phase 5 (Week 5): Testing
- Accessibility audit
- Cross-browser testing
- User testing
- Performance optimization

**LOE:** 16-20 hours

**Total LOE:** 88-108 hours (~2.5-3 weeks full-time)

---

## Decision Triggers & Trade-offs

### When to Choose Each Mode

| User Profile | Best Mode | Reason |
|--------------|-----------|--------|
| Parent browsing | Kids | Safe, fun, simple |
| Child (8-14) | Kids | Age-appropriate, playful |
| Teen (15+) | Default | Mature, focused |
| Adult collector | Professional | Advanced tools, data |
| Mobile user | Kids or Default | Larger touch targets |
| Power user | Professional | Keyboard shortcuts, efficiency |
| First-time user | Kids or Default | Simpler interface |

### Design Trade-offs

**Kids Mode:**
- ✓ Engaging, safe, accessible
- ✗ Less data, slower interaction (animations)
- ✗ Takes more screen space (larger fonts/spacing)

**Professional Mode:**
- ✓ Efficient, data-rich, keyboard-friendly
- ✗ Intimidating for children
- ✗ Smaller text/touch targets
- ✗ No visual joy (animations)

**Default Mode:**
- ✓ Balanced, familiar, professional
- ✗ Doesn't fully satisfy either audience
- ✗ Generic, less personality

---

## Common Implementation Patterns

### Conditional Rendering Per Mode

```svelte
{#if theme === 'kids'}
  <!-- Kids-specific UI -->
{:else if theme === 'professional'}
  <!-- Professional-specific UI -->
{:else}
  <!-- Default UI -->
{/if}
```

### Derived Classes Per Mode

```svelte
const classes = $derived.by(() => {
  switch (theme) {
    case 'kids':
      return 'bg-white border-2 border-indigo-200 rounded-2xl p-6';
    case 'professional':
      return 'bg-slate-800 border border-slate-700 rounded-lg p-3';
    default:
      return 'bg-slate-900 border border-slate-800 rounded-xl p-4';
  }
});
```

### CSS Variables (Recommended)

```css
.mode-kids {
  --bg-primary: #eef2ff;
  --text-primary: #312e81;
  --accent: #a78bfa;
}

.mode-professional {
  --bg-primary: #111827;
  --text-primary: #ffffff;
  --accent: #3b82f6;
}
```

```svelte
<div class="bg-[var(--bg-primary)] text-[var(--text-primary)]">
  <!-- Automatically themed -->
</div>
```

---

## Performance Checklist

- [ ] CSS variables loaded before hydration
- [ ] Component render count tracked (Svelte DevTools)
- [ ] Lazy load heavy components per mode
- [ ] Cache computed classes in stores
- [ ] Code split mode-specific pages
- [ ] Monitor bundle size impact
- [ ] Test on slow 4G connection
- [ ] Verify LCP (Largest Contentful Paint)
- [ ] No layout shifts on mode change
- [ ] localStorage doesn't block rendering

---

**END OF QUICK REFERENCE**

**Next Steps:**
1. Read DESIGN_SPEC.md for comprehensive overview
2. Review IMPLEMENTATION_GUIDE.md for code patterns
3. Check VISUAL_REFERENCE.md for component specs
4. Reference this document for quick lookups during implementation
