# Toy Exchange Platform - Comprehensive UI/UX Design Specification

**Project:** Toy Exchange - SvelteKit + Svelte 5 + Tailwind CSS Auction Platform
**Created:** February 12, 2026
**Current State:** Dark theme (slate-950 bg, amber-500 accents), basic auction functionality
**Goal:** Implement Kids Mode, Professional Mode, and Default Mode with mode switcher

---

## Executive Summary

This specification provides complete design guidance for transforming the Toy Exchange platform into a multi-mode UI system. Three distinct experiences will coexist:

1. **Default Mode** - Current professional dark theme (optimized for general users)
2. **Kids Mode** - Playful, safety-focused interface for children
3. **Professional Mode** - Advanced analytics and tools for serious collectors

Each mode maintains brand consistency while adapting typography, color, information density, and interaction patterns to its audience.

---

## Part 1: Color Systems & Typography

### 1.1 Default Mode Color Palette

**Dark, sophisticated theme (existing)**

```tailwind
Primary Background:    slate-950 (#0f172a)
Secondary Background:  slate-900 (#111827)
Tertiary Background:   slate-800 (#1e293b)
Accent Color:          amber-500 (#f59e0b)
Text Primary:          white / slate-50
Text Secondary:        slate-300 / slate-400
Text Tertiary:         slate-500 / slate-600
Border Color:          slate-800 / slate-700
Success:               emerald-500 / emerald-600
Error:                 red-500 / red-600
Warning:               amber-500 / amber-600
```

**Palette Rationale:** Professional, trustworthy, reduces visual fatigue. Amber accent creates energy without aggression.

---

### 1.2 Kids Mode Color Palette

**Bright, playful theme optimized for children**

```tailwind
Primary Background:    indigo-50 (#eef2ff)
Secondary Background:  white (#ffffff)
Tertiary Background:   indigo-100 (#e0e7ff)
Accent Color:          violet-500 (#a78bfa) - Primary action
Secondary Accent:      rose-400 (#f472b6) - Supporting action
Tertiary Accent:       sky-400 (#38bdf8) - Information

Text Primary:          indigo-900 (#312e81)
Text Secondary:        indigo-700 (#3730a3)
Text Tertiary:         indigo-600 (#4f46e5)
Border Color:          indigo-200 (#c7d2fe)
Success:               emerald-500 (#10b981)
Error:                 rose-500 (#f43f5e)
Warning:               amber-400 (#fbbf24)

Playful Accents:
- Lime-400 (#a3e635) - Highlights, badges
- Cyan-400 (#22d3ee) - Secondary highlights
- Pink-300 (#f472b6) - Interactive elements
- Orange-400 (#fb923c) - Calls-to-action
```

**Palette Rationale:**
- High contrast, accessible for developing eyes
- Bright but not oversaturated
- Multiple accent colors reduce monotony
- Indigo base is calming but engaging
- Large color transitions create visual interest

---

### 1.3 Professional Mode Color Palette

**Data-driven, minimalist theme**

```tailwind
Primary Background:    slate-900 (#111827)
Secondary Background:  slate-800 (#1e293b)
Tertiary Background:   slate-700 (#334155)
Accent Color:          blue-500 (#3b82f6) - Data-focused accent
Secondary Accent:      cyan-500 (#06b6d4) - Trending/positive
Tertiary Accent:       purple-500 (#a855f7) - Alerts/warnings

Text Primary:          white / slate-50
Text Secondary:        slate-300 / slate-400
Text Tertiary:         slate-500 / slate-600
Border Color:          slate-700 / slate-600

Data Visualization:
- Success:      emerald-500 (#10b981) - Price increases
- Decline:      rose-500 (#f43f5e) - Price decreases
- Neutral:      slate-500 (#64748b) - Flat trends
- Highlight:    yellow-400 (#facc15) - Important metrics

Analysis Colors:
- Volume:       blue-600 (#2563eb)
- Volatility:   orange-500 (#f97316)
- Trend:        purple-600 (#9333ea)
```

**Palette Rationale:**
- Cool, analytical aesthetic
- High contrast for readability in data-heavy layouts
- Distinct data visualization colors
- Professional but not cold

---

### 1.4 Typography System

**Font Families (unchanged from current)**
```
Sans-serif:  Inter
Monospace:   JetBrains Mono (for prices, codes, metrics)
```

#### Heading Hierarchy

| Level | Default                      | Kids                         | Professional              |
|-------|------------------------------|------------------------------|---------------------------|
| H1    | 36px / 1.4 font-bold         | 40px / 1.3 font-black        | 32px / 1.4 font-bold      |
| H2    | 28px / 1.4 font-bold         | 32px / 1.3 font-bold         | 24px / 1.4 font-bold      |
| H3    | 20px / 1.4 font-semibold     | 24px / 1.2 font-bold         | 18px / 1.4 font-semibold  |
| H4    | 16px / 1.5 font-semibold     | 18px / 1.2 font-bold         | 14px / 1.5 font-semibold  |
| Body  | 14px / 1.6 font-normal       | 16px / 1.8 font-normal       | 13px / 1.6 font-normal    |
| Small | 12px / 1.5 font-normal       | 14px / 1.6 font-normal       | 11px / 1.5 font-normal    |

**Key Differences:**
- **Kids:** Larger overall, bolder weights, more generous line-height
- **Professional:** Compact, smaller base size, data-dense
- **Default:** Balanced middle ground

---

### 1.5 Spacing & Layout System

```
Base Unit: 4px (Tailwind default)

Default Mode Spacing:
- xs: 4px (minimal gaps)
- sm: 8px (tight spacing)
- md: 12px (breathing room)
- lg: 16px (standard gap)
- xl: 24px (section spacing)
- 2xl: 32px (major sections)
- 3xl: 48px (full sections)

Kids Mode Spacing (50-75% larger):
- xs: 6px
- sm: 12px
- md: 18px
- lg: 24px
- xl: 36px
- 2xl: 48px
- 3xl: 72px

Professional Mode Spacing (25% tighter):
- xs: 2px
- sm: 6px
- md: 10px
- lg: 14px
- xl: 20px
- 2xl: 28px
- 3xl: 40px
```

**Container Padding:**
- Default: px-4 sm:px-6 lg:px-8
- Kids: px-6 sm:px-8 lg:px-10
- Professional: px-3 sm:px-4 lg:px-6

---

## Part 2: Component Design Variations

### 2.1 Mode Switcher Component

**Location:** Top-right corner of Navbar, next to user profile
**Visual Hierarchy:** Secondary action, not primary focus

#### Default Mode Switcher

```svelte
<script>
  import { theme } = $store;
  let showMenu = $state(false);
</script>

<!-- Toggle Button -->
<button
  onclick={() => showMenu = !showMenu}
  class="relative p-2 hover:bg-slate-800 rounded-lg transition"
  aria-label="Switch theme"
>
  <!-- Icon changes based on current mode -->
  {#if theme === 'default'}
    <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
      <!-- Standard theme icon -->
    </svg>
  {:else if theme === 'kids'}
    <svg class="w-5 h-5 text-violet-500" viewBox="0 0 24 24" fill="currentColor">
      <!-- Kids icon (star/sparkle) -->
    </svg>
  {:else}
    <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
      <!-- Professional icon (chart/graph) -->
    </svg>
  {/if}
</button>

<!-- Dropdown Menu -->
{#if showMenu}
  <div class="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700
              rounded-lg shadow-lg overflow-hidden z-50">

    <!-- Default Mode -->
    <button
      onclick={() => { theme = 'default'; showMenu = false; }}
      class="w-full px-4 py-3 text-left hover:bg-slate-700 transition
             {theme === 'default' ? 'bg-slate-700' : ''}"
    >
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-gradient-to-br from-slate-900 to-slate-800
                    rounded-lg border border-amber-500"></div>
        <div>
          <p class="font-medium text-white">Professional</p>
          <p class="text-xs text-slate-400">Dark, focused</p>
        </div>
        {#if theme === 'default'}
          <svg class="w-4 h-4 ml-auto text-amber-500" fill="currentColor">
            <!-- Checkmark -->
          </svg>
        {/if}
      </div>
    </button>

    <!-- Kids Mode -->
    <button
      onclick={() => { theme = 'kids'; showMenu = false; }}
      class="w-full px-4 py-3 text-left hover:bg-slate-700 transition
             border-t border-slate-700 {theme === 'kids' ? 'bg-slate-700' : ''}"
    >
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-gradient-to-br from-indigo-100 to-violet-200
                    rounded-lg border-2 border-violet-500"></div>
        <div>
          <p class="font-medium text-white">Kids Mode</p>
          <p class="text-xs text-slate-400">Playful & safe</p>
        </div>
        {#if theme === 'kids'}
          <svg class="w-4 h-4 ml-auto text-violet-500" fill="currentColor">
            <!-- Checkmark -->
          </svg>
        {/if}
      </div>
    </button>

    <!-- Professional Mode -->
    <button
      onclick={() => { theme = 'professional'; showMenu = false; }}
      class="w-full px-4 py-3 text-left hover:bg-slate-700 transition
             border-t border-slate-700 {theme === 'professional' ? 'bg-slate-700' : ''}"
    >
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-900 to-slate-800
                    rounded-lg border-2 border-blue-500"></div>
        <div>
          <p class="font-medium text-white">Pro Analytics</p>
          <p class="text-xs text-slate-400">Advanced tools</p>
        </div>
        {#if theme === 'professional'}
          <svg class="w-4 h-4 ml-auto text-blue-500" fill="currentColor">
            <!-- Checkmark -->
          </svg>
        {/if}
      </div>
    </button>

    <!-- Divider -->
    <div class="border-t border-slate-700"></div>

    <!-- Info text -->
    <div class="px-4 py-3 bg-slate-900">
      <p class="text-xs text-slate-500">
        Settings saved to your account
      </p>
    </div>
  </div>
{/if}
```

**Spec Details:**
- Always visible in navbar (non-intrusive)
- Dropdown shows all three modes with preview colors
- Current mode highlighted with checkmark
- Smooth selection without page reload
- Settings persist in localStorage + sync to backend
- Accessible: keyboard navigation (arrow keys, Enter)
- Mobile: same UI, tap-to-open

---

#### Kids Mode Switcher Variation

```tailwind
Button Background:      transparent / hover:indigo-100
Icon Color:             violet-500 (always, for consistency)
Menu Background:        white / indigo-50
Menu Border:            indigo-200
Menu Item Hover:        indigo-50
Accent Colors:          Larger icons with colorful gradients
Text Color:             indigo-900 (darker in light theme)
```

**Changes for Kids:**
- Larger button hitbox (48px min instead of 32px)
- Animated icon (spins/sparkles on hover)
- Colorful mode previews (not just grayscale)
- Celebratory animation when switched to Kids Mode
- Emoji icons option: 🎮 Default, ⭐ Kids, 📊 Professional

---

#### Professional Mode Switcher Variation

```tailwind
Button Background:      transparent / hover:slate-700
Icon Color:             blue-500
Menu Background:        slate-800 / slate-900
Menu Border:            slate-700
Menu Item Hover:        slate-700
Selection Indicator:    Subtle checkmark + slight bg highlight
```

**Changes for Professional:**
- Compact, minimal visual treatment
- Grayscale preview thumbnails
- Tooltip on hover: "Switch Interface Mode"
- Keyboard shortcut hint: Cmd+M (Mac) / Ctrl+M (Windows)
- No animation (data-focused)

---

### 2.2 Navbar Component Variations

#### Default Mode Navbar

```svelte
<nav class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo (unchanged) -->

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/" class="text-slate-300 hover:text-white transition">Market</a>
        <a href="/create" class="text-slate-300 hover:text-white transition">Create Listing</a>
        <a href="/dashboard" class="text-slate-300 hover:text-white transition">Dashboard</a>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- User Profile -->

        <!-- Mode Switcher -->
        <ModeSwitcher />
      </div>
    </div>
  </div>
</nav>
```

**Spacing:** Standard (px-4 sm:px-6 lg:px-8, h-16)

---

#### Kids Mode Navbar

```tailwind
Background:             indigo-50 with subtle gradient border
Text Primary:           indigo-900
Link Hover:             indigo-700 with bg-indigo-100
Logo Style:             Rounded more (lg:rounded-2xl), colorful gradient
Mobile Menu Toggle:     Larger icon, animated hamburger
```

**Key Changes:**
- Taller navbar for easier touch targets (h-20 instead of h-16)
- Logo more prominent and colorful (gradient background)
- Text larger and bolder
- More spacing between items
- Fun navigation labels with emoji: 🏪 Market, ✨ Create, 📱 Dashboard
- Mobile menu slides in from top with bounce animation
- Parental controls hint in menu: "⚙️ Safety Settings"

```svelte
<!-- Kids mode navbar with emoji labels -->
<div class="hidden md:flex items-center gap-8">
  <a href="/" class="flex items-center gap-2 text-indigo-900 hover:text-violet-600
                     transition font-bold">
    🏪 <span>Marketplace</span>
  </a>
  <a href="/create" class="flex items-center gap-2 text-indigo-900 hover:text-rose-400
                           transition font-bold">
    ✨ <span>Add Your Toy</span>
  </a>
  <a href="/dashboard" class="flex items-center gap-2 text-indigo-900 hover:text-sky-400
                              transition font-bold">
    📱 <span>My Collections</span>
  </a>
</div>
```

---

#### Professional Mode Navbar

```tailwind
Background:             slate-900 / slate-950 (darker)
Text Primary:           slate-300
Link Hover:             text-white, subtle underline
Spacing:                Tighter (px-3 sm:px-4 lg:px-6)
Height:                 h-14 (4px shorter)
```

**Key Changes:**
- Compact navbar (h-14)
- Professional menu labels without emoji: "Market", "Create Listing", "Dashboard"
- Additional menu: "Analytics" (link to professional dashboard)
- Search bar integrated into navbar (compact)
- Keyboard shortcut hints in tooltips
- Secondary navigation for advanced features

```svelte
<!-- Professional mode with added features -->
<div class="hidden md:flex items-center gap-6">
  <a href="/" class="text-slate-300 hover:text-white text-sm transition">Market</a>
  <a href="/analytics" class="text-slate-300 hover:text-blue-400 text-sm transition">
    Analytics
  </a>
  <a href="/create" class="text-slate-300 hover:text-white text-sm transition">Create Listing</a>
  <a href="/dashboard" class="text-slate-300 hover:text-white text-sm transition">Dashboard</a>
  <!-- Search integration here -->
</div>
```

---

### 2.3 Listing Card Component

#### Default Mode

```svelte
<a href="/listing/{listing.id}" class="block group">
  <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden
              hover:border-amber-500 transition h-full flex flex-col">
    <!-- Image: 192px (h-48) -->
    <div class="bg-gradient-to-br from-slate-800 to-slate-900 h-48 flex items-center
                justify-center overflow-hidden relative">
      <!-- Image with hover scale -->
    </div>

    <!-- Content: p-4 -->
    <div class="p-4 flex-1 flex flex-col">
      <p class="text-xs text-slate-400 uppercase tracking-wide mb-2">
        {listing.category}
      </p>
      <h3 class="font-semibold text-white mb-2 line-clamp-2
                  group-hover:text-amber-400 transition">
        {listing.title}
      </h3>
      <p class="text-xs text-slate-400 mb-4">by {listing.sellerUsername}</p>

      <div class="border-t border-slate-800 my-3"></div>

      <div class="mb-4">
        <p class="text-xs text-slate-400 mb-1">Current Bid</p>
        <p class="text-lg font-mono font-bold text-amber-400">
          {formatCents(listing.currentBid)}
        </p>
        <p class="text-xs text-slate-500">{listing.bids.length} bid(s)</p>
      </div>

      <div class="mt-auto pt-4 border-t border-slate-800">
        <CountdownTimer endTime={listing.endTime} />
      </div>
    </div>
  </div>
</a>
```

---

#### Kids Mode

```tailwind
Background:             white / indigo-50
Border:                 indigo-200 (rounded-2xl instead of rounded-xl)
Image Height:           h-56 (taller for visibility)
Content Padding:        p-6 (more spacious)
Title Font:             text-lg font-bold (larger, bolder)
Category:               Emoji prefix + color: 🧩 Puzzles, 🚗 Vehicles, etc.
Seller:                 "by {sellerUsername}" → "Sold by {sellerUsername}" (clearer)
Condition Badge:        Larger (lg instead of sm)
Current Bid:            Large, bold font + currency symbol: "$X.XX" (not cents)
Bid Count:              Icon + count: "👥 3 bids"
Hover Effects:          Scale up slightly (translate-y-1), shadow glow
```

**Complete Kids Mode Card:**

```svelte
<a href="/listing/{listing.id}" class="block group">
  <div class="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden
              group-hover:border-violet-500 group-hover:shadow-lg
              group-hover:-translate-y-1 transition h-full flex flex-col">

    <!-- Image: h-56 with fun border -->
    <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 h-56 flex items-center
                justify-center overflow-hidden relative border-b-4 border-indigo-300">
      {#if listing.imageUrl}
        <img src={listing.imageUrl} alt={listing.title}
             class="w-full h-full object-cover group-hover:scale-110 transition" />
      {:else}
        <div class="text-indigo-400 text-center">
          <div class="text-5xl mb-2">📦</div>
          <p class="text-sm font-bold">No Image Yet</p>
        </div>
      {/if}

      <!-- Condition Badge - larger -->
      <div class="absolute top-4 right-4">
        <ConditionBadge condition={listing.condition} size="lg" />
      </div>
    </div>

    <!-- Content: p-6 -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Category with emoji -->
      <p class="text-sm font-bold text-violet-600 mb-3 uppercase tracking-wide">
        {getCategoryEmoji(listing.category)} {listing.category}
      </p>

      <!-- Title - larger, bolder -->
      <h3 class="font-black text-lg text-indigo-900 mb-3 line-clamp-2
                  group-hover:text-violet-600 transition">
        {listing.title}
      </h3>

      <!-- Seller - clearer -->
      <p class="text-sm text-indigo-600 mb-4 font-semibold">
        Sold by <span class="text-violet-600">{listing.sellerUsername}</span>
      </p>

      <div class="border-t-2 border-indigo-200 my-4"></div>

      <!-- Price - large and prominent -->
      <div class="mb-4">
        <p class="text-xs font-bold text-indigo-600 mb-1">CURRENT BID</p>
        <p class="text-2xl font-black text-violet-600">
          ${(listing.currentBid / 100).toFixed(2)}
        </p>
        <p class="text-sm text-indigo-600 mt-1 font-bold">
          👥 {listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
        </p>
      </div>

      <!-- Timer -->
      <div class="mt-auto pt-4 border-t-2 border-indigo-200">
        <CountdownTimer endTime={listing.endTime} mode="kids" />
      </div>
    </div>
  </div>
</a>
```

---

#### Professional Mode

```tailwind
Background:             slate-900 / slate-800
Border:                 slate-700 (rounded-lg instead of rounded-xl)
Image Height:           h-40 (smaller)
Content Padding:        p-3 (compact)
Title Font:             text-sm font-semibold (smaller)
Category:               No emoji, just text (gray-400)
Seller:                 "by {sellerUsername}" (minimal)
Condition Badge:        xs size (compact)
Current Bid:            Monospace font (data-focused), no currency symbol prefix
Bid Count:              Just number, no label
Metrics Display:        Add 24h price change % in small text
Hover Effects:          Subtle border change (no scale)
```

**Complete Professional Mode Card:**

```svelte
<a href="/listing/{listing.id}" class="block group">
  <div class="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden
              hover:border-blue-500 hover:bg-slate-750 transition h-full
              flex flex-col">

    <!-- Image: h-40 -->
    <div class="bg-gradient-to-br from-slate-700 to-slate-800 h-40 flex items-center
                justify-center overflow-hidden relative">
      {#if listing.imageUrl}
        <img src={listing.imageUrl} alt={listing.title}
             class="w-full h-full object-cover group-hover:opacity-110 transition" />
      {:else}
        <div class="text-slate-600 text-center">
          <svg class="w-8 h-8 mx-auto mb-1 opacity-50" />
          <p class="text-xs">No Image</p>
        </div>
      {/if}

      <!-- Condition Badge -->
      <div class="absolute top-2 right-2">
        <ConditionBadge condition={listing.condition} size="xs" />
      </div>
    </div>

    <!-- Content: p-3 -->
    <div class="p-3 flex-1 flex flex-col text-xs">
      <!-- Category -->
      <p class="text-slate-500 uppercase tracking-wide mb-1">
        {listing.category}
      </p>

      <!-- Title -->
      <h3 class="font-semibold text-white mb-1 line-clamp-2
                  group-hover:text-blue-400 transition">
        {listing.title}
      </h3>

      <!-- Seller -->
      <p class="text-slate-500 mb-2">by {listing.sellerUsername}</p>

      <!-- Price - monospace, data-like -->
      <div class="mb-2">
        <p class="text-slate-600 mb-0.5">Bid</p>
        <p class="font-mono font-bold text-blue-400">
          {listing.currentBid.toString().padStart(5, ' ')}¢
        </p>
        <p class="text-slate-600 mt-0.5">{listing.bids.length} bid(s)</p>
      </div>

      <!-- 24h change % -->
      {#if calculate24hChange(listing) >= 0}
        <p class="text-emerald-500 text-xs font-mono">
          +{calculate24hChange(listing).toFixed(1)}%
        </p>
      {:else}
        <p class="text-rose-500 text-xs font-mono">
          {calculate24hChange(listing).toFixed(1)}%
        </p>
      {/if}

      <!-- Timer -->
      <div class="mt-auto pt-2 border-t border-slate-700">
        <CountdownTimer endTime={listing.endTime} mode="professional" />
      </div>
    </div>
  </div>
</a>
```

---

### 2.4 Condition Badge Component

#### Default Mode

```tailwind
Grades A-F in gray/amber
Size: sm (12px height)
Font: text-xs font-bold
Bg: Based on grade
```

#### Kids Mode

```tailwind
Grades shown as emoji/text combinations:
- A: ⭐ Perfect
- B: 💚 Great
- C: 💛 Good
- D: 🧡 Fair
- F: 💔 Needs Love

Size: lg (20px height)
Font: text-sm font-bold
Bg: Colorful gradients
Border: 2px colorful border
```

#### Professional Mode

```tailwind
Grades A-F in monospace
Size: xs (8px height)
Font: text-xs font-mono font-bold
Bg: Subtle grayscale
Border: 1px border-slate-600
```

---

### 2.5 Search Bar Variations

#### Default Mode (Market page)

```svelte
<div class="relative">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="Search toys..."
    class="w-full bg-slate-800 border border-slate-700 rounded-lg
           px-4 py-3 text-white placeholder-slate-500
           focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
  />
  <svg class="absolute right-3 top-3 w-5 h-5 text-slate-500" />
</div>
```

#### Kids Mode (Market page)

```svelte
<div class="relative">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="🔍 What toy are you looking for?"
    class="w-full bg-white border-2 border-indigo-300 rounded-2xl
           px-6 py-4 text-indigo-900 placeholder-indigo-400
           text-lg font-semibold
           focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
  />
  <svg class="absolute right-4 top-4 w-6 h-6 text-violet-500" />
</div>
```

**Kids Mode Enhancements:**
- Autocomplete with popular searches: "Action Figures", "Teddy Bears", "Puzzles"
- Search results show toy images larger
- "Did you mean?" suggestions if no results
- Helpful message: "Try searching for your favorite toy brand!"

#### Professional Mode (Navbar integrated)

```svelte
<div class="relative w-64">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="Search listings..."
    class="w-full bg-slate-800 border border-slate-700 rounded
           px-3 py-1.5 text-sm text-slate-300 placeholder-slate-600
           focus:outline-none focus:border-blue-500"
  />
  <svg class="absolute right-2 top-1.5 w-4 h-4 text-slate-600" />
</div>
```

**Professional Enhancements:**
- Keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows)
- Advanced search: Click icon for filtering by price, condition, seller reputation
- Recent searches
- Saved searches

---

## Part 3: Page Layout Variations

### 3.1 Market Page (Listing Grid)

#### Default Mode

```
+--+--+--+--+
|  |  |  |  |  4-column grid on desktop
+--+--+--+--+
+--+--+--+--+
|  |  |  |  |  2-column on tablet
+--+--+--+--+
+--+
|  |
+--+  1-column on mobile
|  |
+--+

Container: max-w-7xl, px-4 sm:px-6 lg:px-8
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
```

#### Kids Mode

```
+-----+-----+-----+
|     |     |     |  3-column grid on desktop (larger cards)
+-----+-----+-----+
+-----+-----+
|     |     |  2-column on tablet
+-----+-----+
+-----+
|     |  1-column on mobile
+-----+

Container: max-w-6xl, px-6 sm:px-8 lg:px-10
Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Card shadows: shadow-lg on hover
```

#### Professional Mode

```
+--+--+--+--+--+
|  |  |  |  |  |  5-column grid on desktop (compact cards)
+--+--+--+--+--+
+--+--+--+
|  |  |  |  3-column on tablet
+--+--+--+
+--+--+
|  |  |  2-column on mobile
+--+--+

Container: max-w-full, px-3 sm:px-4 lg:px-6
Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2
```

---

### 3.2 Listing Detail Page

#### Default Mode Layout

```
NAVBAR
-----
[Image]          [Details Panel]
                 - Price info
                 - Bid form
                 - Condition, seller
[Price Chart]
[Bid History]
[Similar Items]
FOOTER
```

#### Kids Mode Layout

```
NAVBAR
-----
[Large Image with Fun Decoration]
[Fun Details]
- Big price display
- Simple bid button
[Countdown with animation]
[Recent Bids - Celebration effect]
[Suggested Similar Toys]
FOOTER
```

**Kids Mode Details:**
- Image: h-96 (large, celebration border)
- Bid Form: Single big button, no input validation errors shown (just "error" state)
- Seller info: "Sold by {name}" with avatar
- Celebration effect when item goes live
- "Similar toys you might like" section with fun styling

#### Professional Mode Layout

```
NAVBAR with Analytics
-----
[Image]          [Compact Details + Charts]
                 - Current/starting bid
                 - Bid trend mini-chart
                 - Seller stats
[Full Price Chart with data points]
[Advanced Bid History with filtering]
[Market Comparison Data]
[Portfolio Management]
FOOTER
```

**Professional Mode Details:**
- Image: h-72 (compact)
- Pricing: Show starting bid, current bid, 24h change %, estimated value
- Charts: Inline price history with hover tooltips
- Bid Form: Input validation with real-time minimum bid calculation
- Seller Info: Rating, response time, completed sales
- Add to Watchlist/Portfolio button
- Export data button

---

### 3.3 Create Listing Form

#### Default Mode

```
Title input
Description textarea
Category select
Condition select
Price input
Duration input
[Submit Button]
```

#### Kids Mode

```
"Tell us about your toy!"

Larger labels with emoji guides:
📝 Title: "What's your toy called?"
📖 Description: "Describe what's cool about it"
🏷️ Category: "What kind of toy?"
✨ Condition: "How's it looking?" (with picture guide)
💰 Price: "What do you think it's worth?"
⏰ Duration: "How long should people bid?"

Large buttons: Clear, green submit button with celebration text
"List Your Toy!" (not "Create Listing")

Help text under each field:
- Character count with emoji feedback
- Helpful hints: "Good descriptions get more bids!"
```

#### Professional Mode

```
Compact labels with required indicators
Title input (character counter)
Description textarea (word counter)
Category select (with subcategories)
Condition select (with grading guide link)
Price input (starting price field)
Duration input (preset: 24h, 48h, 7d, custom)
Photography tips link
[Submit Button]

Additional fields:
- Authentication/provenance (optional)
- Reserve price (optional)
- Shipping details
- Return policy
- Advanced categorization

Form validation real-time
Keyboard shortcuts for common actions
```

---

### 3.4 Dashboard Pages

#### Default Mode - My Listings Tab

```
List of listings with:
- Thumbnail
- Title
- Current bid / Starting bid
- Bid count
- Time remaining
- Status badge (Active/Ended/Cancelled)
- Actions: View, Edit, Cancel
```

#### Kids Mode - My Collections

```
"My Awesome Listings!"

Card-based grid view:
- Large thumbnail (celebration animation if active)
- Title in large font
- Fun status: "🔥 Hot Listing!" or "⏰ Ending Soon!" or "✅ SOLD!"
- Big action buttons: View, End Listing, Delete

Motivational messages:
- "You have 3 active listings!" with confetti animation
- "Your listing got 5 bids! 🎉"
- "Keep listing items to build your collection!"
```

#### Professional Mode - My Listings

```
Table view with columns:
- Item / ID
- Current Price
- Change (24h %)
- Bids
- Time Remaining
- Status
- Performance Metrics (views, CTR)

Batch operations:
- Select multiple listings
- Bulk edit (duration, reserve price)
- Bulk end/cancel
- Export CSV

Sorting by: date, price, bids, performance
Filtering by: status, category, price range
```

---

## Part 4: Interactive Components & Animations

### 4.1 Countdown Timer

#### Default Mode

```
14h 23m 45s
- Monospace font
- Amber text on hover
- Updates every second
```

#### Kids Mode

```
Component: Animated Countdown Block

Display: "14 hours 23 minutes left ⏰"
or simpler: "⏰ About 14 hours"

Animations:
- Timer numbers pulse red when < 1 hour
- Sparkle effects when < 30 minutes
- "Ending Soon!" badge blinks
- Color changes: green → yellow → orange → red based on time remaining

Touch target: Larger (min 48px height)
```

#### Professional Mode

```
Display: 14h 23m 45s
or ISO format: 2026-02-12T15:30:00Z

Precision: Show seconds if < 1 hour
No color changes (data-focused)
Monospace font, slate-300
On hover: Show exact end timestamp
```

---

### 4.2 Bid Form Validation

#### Default Mode

```
Inline error messages:
- "Bid must be at least $X"
- "Auction has ended"
- Success: "✓ Bid placed!"
```

#### Kids Mode

```
Friendly messaging:
- ✅ "Your bid must be more than $X"
- ❌ "Oops! This auction already ended!"
- 🎉 "You're the highest bidder!"

Large, friendly error icons
Encouraging: "Keep trying!" on validation errors
```

#### Professional Mode

```
Real-time validation:
- Show minimum bid amount in real-time
- Highlight bid form if new high bid received
- Error states only show when needed
- Success notification: Brief toast in top-right

Accessibility: aria-live regions for dynamic updates
```

---

### 4.3 Loading & Transition States

#### Default Mode

```
Skeleton loaders:
- Listing cards: Gray placeholder cards pulse gently
- Forms: Gray input placeholders

Page transitions: Fade (opacity 0→1)
Duration: 200-300ms
```

#### Kids Mode

```
Fun loading states:
- Animated toy character spinning
- Loading text: "Finding the perfect toys for you..." with animation
- Skeleton cards: Colorful placeholders with pulse animation
- Success state: Celebration animation + sound effect (optional)

Page transitions:
- Slide in from bottom with bounce
- Duration: 400ms
- Particles/confetti on successful action
```

#### Professional Mode

```
Minimal loading indicators:
- Small spinner icon (top-left of content)
- Loading text: "Loading..." only
- Skeleton loaders: Subtle grayscale bars
- No animations (data-focused)

Page transitions: Instant (no animation)
Duration: 0ms
```

---

## Part 5: Accessibility Considerations

### 5.1 Color Contrast Requirements

**All modes must meet WCAG AA standards:**

| Element              | Default                | Kids            | Professional       |
|----------------------|------------------------|-----------------|-------------------|
| Text on BG           | 7.5:1 (AA)            | 5.5:1 (AA)      | 7.5:1 (AA)         |
| Interactive Elements | 3:1 minimum            | 4.5:1           | 3:1                |
| Borders              | 2:1 minimum            | 2:1             | 2:1                |
| Status Indicators    | Color + icon/text      | Color + icon    | Color + icon/text  |

---

### 5.2 Touch Target Sizes

| Mode           | Minimum Size | Recommended Size |
|----------------|--------------|------------------|
| Default        | 40x40px      | 44x44px          |
| Kids           | 48x48px      | 56x56px          |
| Professional   | 40x40px      | 40x40px          |

---

### 5.3 Keyboard Navigation

**All modes support:**
- Tab navigation through interactive elements
- Enter/Space to activate buttons
- Arrow keys for dropdowns/selects
- Escape to close modals/dropdowns
- Shortcuts (Default & Professional): Cmd+K/Ctrl+K for search, Cmd+M/Ctrl+M for mode switcher

**Kids Mode:** Simpler shortcuts, mouse-only option preferred

---

### 5.4 Screen Reader Support

```svelte
<!-- Mode Switcher -->
<button aria-label="Switch interface mode" aria-haspopup="menu">

<!-- Listing Card -->
<article aria-label="Toy listing: {title}, current bid: {price}, {timeRemaining}">

<!-- Bid Form -->
<form aria-label="Place bid on {listingTitle}">
  <input aria-label="Bid amount in cents" aria-describedby="bid-help" />
  <div id="bid-help">Minimum bid: $X</div>
</form>
```

---

## Part 6: Implementation Recommendations (Prioritized by Impact)

### Phase 1: Foundation (Week 1)

**High Impact, Low Effort**

1. **Create theme store** (`stores/theme.svelte.ts`)
   - Stores: `selectedMode` (default/kids/professional)
   - Persist: localStorage + backend sync
   - Computed: CSS classes based on mode

2. **Build Mode Switcher component**
   - Navbar integration
   - Three-mode dropdown selector
   - Animation on mode change

3. **Create color palette utilities**
   - Export color objects per mode
   - Utility function: `getThemeColors(mode)`
   - Use in components as fallback

4. **Add Kids Mode colors to Tailwind**
   - Extend tailwind.config.ts with custom colors
   - Create color variants for each mode

### Phase 2: Component Variations (Week 2)

**High Impact, Medium Effort**

5. **Create component variants system**
   - ListingCard: Add `mode` prop
   - Navbar: Add `mode` prop
   - Search: Add `mode` prop
   - ConditionBadge: Add `mode` prop

6. **Update Navbar for all modes**
   - Add mode-specific styling
   - Adjust link labels (emoji in Kids mode)
   - Responsive tweaks per mode

7. **Update Listing Card for all modes**
   - Size variations per mode
   - Font sizes and spacing
   - Emoji badges in Kids mode

8. **Update Listing Grid for all modes**
   - Column counts per mode
   - Spacing adjustments
   - Container width changes

### Phase 3: Pages & Forms (Week 3)

**Medium Impact, Medium Effort**

9. **Update Market page layout**
   - Responsive grid per mode
   - Filter/sort UI adjustments
   - Search bar styling per mode

10. **Update Detail page layout**
    - Image sizing per mode
    - Chart display (collapsed in Kids, expanded in Pro)
    - Bid form styling

11. **Update Create Listing form**
    - Label styling per mode
    - Help text and guidance
    - Field sizes and spacing

12. **Update Dashboard tabs**
    - List vs. table view per mode
    - Batch operations (Pro only)
    - Visual indicators (Kids celebration effects)

### Phase 4: Polish & Animations (Week 4)

**Medium Impact, Higher Effort**

13. **Add mode-specific animations**
    - Kids Mode: Celebration effects, transitions, sparkles
    - Default Mode: Subtle fades
    - Professional Mode: Minimal/none

14. **Loading states per mode**
    - Skeleton screens
    - Loading animations
    - Success celebrations

15. **Mobile responsiveness tuning**
    - Touch targets verified per mode
    - Spacing on small screens
    - Mode switcher accessibility on mobile

16. **Keyboard shortcuts**
    - Mode switcher: Cmd+M / Ctrl+M
    - Search: Cmd+K / Ctrl+K (Default & Pro)
    - Remove in Kids Mode

### Phase 5: Testing & Accessibility (Week 5)

**High Impact, Medium Effort**

17. **Accessibility audit**
    - Color contrast verification (WCAG AA)
    - Screen reader testing
    - Keyboard navigation testing

18. **Cross-browser testing**
    - Desktop (Chrome, Firefox, Safari)
    - Mobile (iOS Safari, Chrome)
    - Voice testing (Kids mode for children)

19. **Performance optimization**
    - Lazy load mode-specific assets
    - Minimize CSS per mode
    - Component code splitting

20. **User testing**
    - Kids Mode with actual children (8-14)
    - Professional Mode with collectors
    - Default Mode baseline

---

## Part 7: File Structure & Code Organization

```
/src
├── lib/
│   ├── stores/
│   │   ├── theme.svelte.ts          [NEW] Mode selection & persistence
│   │   ├── listings.svelte.ts
│   │   ├── user.svelte.ts
│   │   └── bids.svelte.ts
│   │
│   ├── styles/
│   │   ├── colors/
│   │   │   ├── default.ts            [NEW] Default mode palette
│   │   │   ├── kids.ts               [NEW] Kids mode palette
│   │   │   ├── professional.ts       [NEW] Professional mode palette
│   │   │   └── index.ts              [NEW] Export all palettes
│   │   └── theme.css                 [NEW] Theme-specific styles
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.svelte         [MODIFY] Add mode support
│   │   │   ├── Footer.svelte
│   │   │   └── ModeSwitcher.svelte   [NEW]
│   │   │
│   │   ├── listings/
│   │   │   ├── ListingCard.svelte    [MODIFY] Add mode prop
│   │   │   ├── ListingGrid.svelte    [MODIFY] Layout per mode
│   │   │   ├── CategoryFilter.svelte [MODIFY] Styling per mode
│   │   │   └── ConditionBadge.svelte [MODIFY] Add mode variants
│   │   │
│   │   ├── forms/
│   │   │   ├── CreateListingForm.svelte    [MODIFY] Mode styling
│   │   │   └── SearchForm.svelte           [NEW] Extracted search
│   │   │
│   │   ├── bidding/
│   │   │   ├── BidForm.svelte         [MODIFY] Mode validation display
│   │   │   ├── CountdownTimer.svelte  [MODIFY] Add mode animations
│   │   │   └── BidHistory.svelte      [MODIFY] Layout per mode
│   │   │
│   │   └── common/
│   │       ├── LoadingState.svelte    [NEW] Mode-specific loaders
│   │       ├── EmptyState.svelte      [NEW] Mode-specific empty states
│   │       └── SuccessMessage.svelte  [NEW] Mode-specific success UI
│   │
│   ├── utils/
│   │   ├── theme.ts                  [NEW] Theme utility functions
│   │   ├── format.ts
│   │   ├── chart.ts
│   │   └── constants.ts
│   │
│   └── types/
│       ├── index.ts
│       └── theme.ts                  [NEW] Theme types

└── routes/
    ├── +layout.svelte                [MODIFY] Add theme provider
    ├── +page.svelte                  [MODIFY] Use theme-aware components
    ├── listing/[id]/+page.svelte     [MODIFY] Layout per mode
    ├── create/+page.svelte           [MODIFY] Form per mode
    └── dashboard/+page.svelte        [MODIFY] Dashboard per mode
```

---

## Part 8: Tailwind Configuration Update

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif']
			},
			animation: {
				marquee: 'marquee 30s linear infinite',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				spin: 'spin 1s linear infinite',
				bounce: 'bounce 1s infinite'
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				sparkle: {
					'0%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0', transform: 'scale(1)' }
				}
			}
		}
	},
	plugins: [
		// Custom plugin for mode-specific styles
		function({ addVariant }) {
			addVariant('kids', '.mode-kids &');
			addVariant('pro', '.mode-professional &');
			addVariant('default', '.mode-default &');
		}
	]
} satisfies Config;
```

---

## Part 9: Theme Store Implementation

```typescript
// src/lib/stores/theme.svelte.ts
import { writable, derived } from 'svelte/store';

export type ThemeMode = 'default' | 'kids' | 'professional';

interface ThemeState {
	mode: ThemeMode;
	persistToLocalStorage: boolean;
}

function createThemeStore() {
	const defaultState: ThemeState = {
		mode: 'default',
		persistToLocalStorage: true
	};

	const { subscribe, set, update } = writable<ThemeState>(defaultState);

	return {
		subscribe,
		setMode: (mode: ThemeMode) => {
			update(state => {
				const newState = { ...state, mode };
				if (state.persistToLocalStorage) {
					localStorage.setItem('toy-exchange-theme-mode', mode);
					// Sync to backend if user is logged in
				}
				return newState;
			});
		},
		toggleMode: () => {
			update(state => {
				const modes: ThemeMode[] = ['default', 'kids', 'professional'];
				const currentIndex = modes.indexOf(state.mode);
				const nextMode = modes[(currentIndex + 1) % modes.length];

				if (state.persistToLocalStorage) {
					localStorage.setItem('toy-exchange-theme-mode', nextMode);
				}

				return { ...state, mode: nextMode };
			});
		},
		loadFromStorage: () => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('toy-exchange-theme-mode') as ThemeMode | null;
				if (saved && ['default', 'kids', 'professional'].includes(saved)) {
					set({ ...defaultState, mode: saved });
				}
			}
		}
	};
}

export const themeStore = createThemeStore();
export const currentTheme = derived(themeStore, $state => $state.mode);
```

---

## Part 10: Component Example - Updated ListingCard

```svelte
<!-- src/lib/components/listings/ListingCard.svelte -->
<script lang="ts">
	import { formatCents, formatEndTime } from '../../utils/format.js';
	import ConditionBadge from './ConditionBadge.svelte';
	import CountdownTimer from '../bidding/CountdownTimer.svelte';
	import type { ToyListing } from '../../types/index.js';
	import { currentTheme } from '../../stores/theme.svelte.js';

	interface Props {
		listing: ToyListing;
	}

	const { listing } = $props();
	const theme = $derived($currentTheme);

	// Compute classes based on theme
	const cardClasses = $derived.by(() => {
		const baseClasses = 'block group';
		const commonCard = 'border overflow-hidden transition h-full flex flex-col';

		switch (theme) {
			case 'kids':
				return `${baseClasses}`;
			case 'professional':
				return `${baseClasses}`;
			case 'default':
			default:
				return `${baseClasses}`;
		}
	});

	const containerClasses = $derived.by(() => {
		switch (theme) {
			case 'kids':
				return 'bg-white border-2 border-indigo-200 rounded-2xl ' +
					   'group-hover:border-violet-500 group-hover:shadow-lg ' +
					   'group-hover:-translate-y-1';
			case 'professional':
				return 'bg-slate-800 border border-slate-700 rounded-lg ' +
					   'hover:border-blue-500';
			case 'default':
			default:
				return 'bg-slate-900 border border-slate-800 rounded-xl ' +
					   'hover:border-amber-500';
		}
	});

	const imageContainerClasses = $derived.by(() => {
		const baseHeight = theme === 'professional' ? 'h-40' :
		                   theme === 'kids' ? 'h-56' : 'h-48';
		const baseGradient = theme === 'kids' ? 'from-indigo-100 to-indigo-50' :
		                     theme === 'professional' ? 'from-slate-700 to-slate-800' :
		                     'from-slate-800 to-slate-900';

		return `bg-gradient-to-br ${baseGradient} ${baseHeight} flex items-center ` +
		       'justify-center overflow-hidden relative';
	});

	// ... rest of component
</script>

<a href="/listing/{listing.id}" class={cardClasses}>
	<div class={`${containerClasses} transition`}>
		<!-- Image section with theme-specific styling -->
		<div class={imageContainerClasses}>
			{#if listing.imageUrl}
				<img
					src={listing.imageUrl}
					alt={listing.title}
					class="w-full h-full object-cover transition"
					class:group-hover:scale-105={theme !== 'professional'}
					class:group-hover:opacity-110={theme === 'professional'}
				/>
			{:else}
				<div class:text-slate-500={theme !== 'kids'} class:text-indigo-400={theme === 'kids'} class="text-center">
					{#if theme === 'kids'}
						<div class="text-5xl mb-2">📦</div>
						<p class="text-sm font-bold">No Image Yet</p>
					{:else}
						<svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p class="text-sm opacity-50">No Image</p>
					{/if}
				</div>
			{/if}

			<!-- Condition Badge -->
			<div class={theme === 'kids' ? 'absolute top-4 right-4' : 'absolute top-3 right-3'}>
				<ConditionBadge condition={listing.condition} mode={theme} />
			</div>
		</div>

		<!-- Content section with theme-specific styling -->
		<div class={theme === 'professional' ? 'p-3' : theme === 'kids' ? 'p-6' : 'p-4'}>
			<!-- Category -->
			<p class={`uppercase tracking-wide mb-${theme === 'professional' ? '1' : theme === 'kids' ? '3' : '2'} ` +
			          `text-${theme === 'kids' ? 'sm font-bold text-violet-600' :
			                   theme === 'professional' ? 'xs text-slate-500' :
			                   'xs text-slate-400'}`}>
				{#if theme === 'kids'}
					{getCategoryEmoji(listing.category)} {listing.category}
				{:else}
					{listing.category}
				{/if}
			</p>

			<!-- Title -->
			<h3 class={`font-${theme === 'kids' ? 'black text-lg' : theme === 'professional' ? 'semibold text-sm' : 'semibold'} ` +
			           `text-${theme === 'kids' ? 'indigo-900 group-hover:text-violet-600' :
			                   theme === 'professional' ? 'white group-hover:text-blue-400' :
			                   'white group-hover:text-amber-400'} ` +
			           `mb-${theme === 'professional' ? '1' : theme === 'kids' ? '3' : '2'} line-clamp-2 transition`}>
				{listing.title}
			</h3>

			<!-- Seller -->
			<p class={`mb-${theme === 'professional' ? '2' : theme === 'kids' ? '4' : '4'} ` +
			          `text-${theme === 'kids' ? 'sm text-indigo-600 font-semibold' :
			                   theme === 'professional' ? 'xs text-slate-500' :
			                   'xs text-slate-400'}`}>
				{#if theme === 'kids'}
					Sold by <span class="text-violet-600">{listing.sellerUsername}</span>
				{:else}
					by {listing.sellerUsername}
				{/if}
			</p>

			<!-- Divider -->
			<div class={`border-t my-${theme === 'professional' ? '2' : theme === 'kids' ? '4' : '3'} ` +
			            `border-${theme === 'kids' ? 'indigo-200' :
			                     theme === 'professional' ? 'slate-700' :
			                     'slate-800'}`}></div>

			<!-- Price -->
			<div class={`mb-${theme === 'professional' ? '2' : theme === 'kids' ? '4' : '4'}`}>
				<p class={`mb-${theme === 'professional' ? '0.5' : '1'} ` +
				          `text-${theme === 'kids' ? 'xs font-bold text-indigo-600' :
				                   theme === 'professional' ? 'slate-600 text-xs' :
				                   'xs text-slate-400'}`}>
					{theme === 'kids' ? 'CURRENT BID' : 'Current Bid'}
				</p>
				<p class={`font-mono font-bold ` +
				          `text-${theme === 'kids' ? '2xl text-violet-600' :
				                   theme === 'professional' ? 'sm text-blue-400' :
				                   'lg text-amber-400'}`}>
					{#if theme === 'kids'}
						${(listing.currentBid / 100).toFixed(2)}
					{:else if theme === 'professional'}
						{listing.currentBid.toString().padStart(5, ' ')}¢
					{:else}
						{formatCents(listing.currentBid)}
					{/if}
				</p>
				<p class={`text-${theme === 'professional' ? 'xs text-slate-600' :
				                   theme === 'kids' ? 'sm text-indigo-600 font-bold' :
				                   'xs text-slate-500'}`}>
					{#if theme === 'kids'}
						👥 {listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
					{:else}
						{listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
					{/if}
				</p>
			</div>

			<!-- Timer -->
			<div class={`mt-auto pt-${theme === 'professional' ? '2' : theme === 'kids' ? '4' : '4'} ` +
			            `border-t border-${theme === 'kids' ? 'indigo-200' :
			                              theme === 'professional' ? 'slate-700' :
			                              'slate-800'}`}>
				<CountdownTimer endTime={listing.endTime} mode={theme} />
			</div>
		</div>
	</div>
</a>

<script lang="ts">
	function getCategoryEmoji(category: string): string {
		const emojiMap: Record<string, string> = {
			'Action Figures': '🦸',
			'Vehicles': '🚗',
			'Puzzles': '🧩',
			'Building Sets': '🧱',
			'Dolls': '👧',
			'Board Games': '🎲',
			'Plushies': '🧸',
			'Trading Cards': '🃏',
			'Collectibles': '⭐'
		};
		return emojiMap[category] || '🎁';
	}
</script>
```

---

## Part 11: Implementation Checklist

- [ ] Create theme store (`src/lib/stores/theme.svelte.ts`)
- [ ] Build Mode Switcher component (`src/lib/components/layout/ModeSwitcher.svelte`)
- [ ] Create color palette files (`src/lib/styles/colors/`)
- [ ] Update Tailwind config with custom theme variants
- [ ] Update Navbar component with mode support
- [ ] Update ListingCard component with mode variants
- [ ] Update ConditionBadge component with mode styling
- [ ] Update CountdownTimer component with mode animations
- [ ] Create theme utilities (`src/lib/utils/theme.ts`)
- [ ] Update Market page layout per mode
- [ ] Update Listing detail page layout per mode
- [ ] Update Create Listing form styling per mode
- [ ] Update Dashboard tabs per mode
- [ ] Add mode-specific loading states
- [ ] Add mode-specific empty states
- [ ] Implement Kids Mode animations
- [ ] Add accessibility attributes to all components
- [ ] Test color contrast (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Test on mobile devices
- [ ] Performance testing and optimization
- [ ] User testing with kids (Kids Mode)
- [ ] User testing with collectors (Professional Mode)
- [ ] Documentation for theme system

---

## Part 12: CSS Theme Variables Alternative

**If you prefer CSS variables instead of component conditionals:**

```css
/* src/lib/styles/theme.css */

/* Default Mode */
:root,
.mode-default {
	--bg-primary: #0f172a;
	--bg-secondary: #111827;
	--bg-tertiary: #1e293b;
	--text-primary: #ffffff;
	--text-secondary: #cbd5e1;
	--text-tertiary: #94a3b8;
	--accent: #f59e0b;
	--border: #1e293b;
	--card-border: #1e293b;
	--card-hover-border: #f59e0b;
	--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
	--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
	--radius-sm: 0.5rem;
	--radius-md: 0.75rem;
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	--spacing-md: 0.75rem;
	--spacing-lg: 1rem;
	--spacing-xl: 1.5rem;
}

/* Kids Mode */
.mode-kids {
	--bg-primary: #eef2ff;
	--bg-secondary: #ffffff;
	--bg-tertiary: #e0e7ff;
	--text-primary: #312e81;
	--text-secondary: #3730a3;
	--text-tertiary: #4f46e5;
	--accent: #a78bfa;
	--border: #c7d2fe;
	--card-border: #c7d2fe;
	--card-hover-border: #a78bfa;
	--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
	--shadow-md: 0 6px 12px rgba(0, 0, 0, 0.1);
	--radius-sm: 0.75rem;
	--radius-md: 1.5rem;
	--spacing-xs: 0.375rem;
	--spacing-sm: 0.75rem;
	--spacing-md: 1.125rem;
	--spacing-lg: 1.5rem;
	--spacing-xl: 2.25rem;
}

/* Professional Mode */
.mode-professional {
	--bg-primary: #111827;
	--bg-secondary: #1e293b;
	--bg-tertiary: #334155;
	--text-primary: #ffffff;
	--text-secondary: #cbd5e1;
	--text-tertiary: #94a3b8;
	--accent: #3b82f6;
	--border: #334155;
	--card-border: #475569;
	--card-hover-border: #3b82f6;
	--shadow-sm: 0 1px 1px rgba(0, 0, 0, 0.05);
	--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
	--radius-sm: 0.375rem;
	--radius-md: 0.5rem;
	--spacing-xs: 0.125rem;
	--spacing-sm: 0.375rem;
	--spacing-md: 0.625rem;
	--spacing-lg: 0.875rem;
	--spacing-xl: 1.25rem;
}
```

**Usage:**
```svelte
<!-- Component will automatically use correct variables based on active mode -->
<div class="bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border)]">
	...
</div>
```

---

## Part 13: Summary & Key Takeaways

### Why This Design Works

1. **Kids Mode:** Safe, engaging, reduces cognitive load with familiar patterns
2. **Professional Mode:** Data-dense, efficient, optimized for power users
3. **Default Mode:** Balanced middle ground for general users

### Key Principles Applied

- **Minimalism:** Each mode removes unnecessary elements for its audience
- **Consistency:** Shared component structure, different styling
- **Accessibility:** All modes meet WCAG AA standards
- **Reusability:** Single component library, mode-aware variants
- **Performance:** Theme system doesn't require page reloads

### Success Metrics

- Kids users: Fewer clicks to find/bid on items
- Professional users: Access to advanced analytics
- Default users: Maintained current experience + flexibility
- All modes: No performance degradation

---

## Appendix A: Color Contrast Tests

**Kids Mode Example:**
- White text (#ffffff) on violet-500 (#a78bfa): 3.72:1 ❌ (too low)
- White text on indigo-900 (#312e81): 7.5:1 ✅ (WCAG AA)
- Indigo-900 text on white: 7.5:1 ✅ (WCAG AA)
- Violet-600 on white: 5.5:1 ✅ (WCAG AA)

**Recommendation:** Use indigo-900 for primary text, violet-600 for secondary/accents in Kids Mode.

---

**END OF SPECIFICATION**

This comprehensive guide provides frontend engineers everything needed to implement Kids, Professional, and improved Default modes across the Toy Exchange platform.
