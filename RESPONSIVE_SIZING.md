# Responsive Sizing System

This system maintains the exact ratios and sizing from your MacBook Pro M1 16-inch setup (1728px viewport width) across all devices and screen sizes.

## 🎯 Goal

Preserve your current perfect layout while making it responsive across all devices, maintaining exact proportional scaling.

## 📁 Files Created

- `lib/responsive-sizing.ts` - Core sizing utilities and calculations
- `hooks/use-responsive-sizing.ts` - React hooks for dynamic sizing
- `styles/responsive-sizing.css` - CSS custom properties
- `tailwind-responsive.config.js` - Tailwind plugin with utility classes
- `components/examples/` - Example implementations

## 🚀 Quick Start

### 1. Font Sizes

Replace your current clamp() values with utility classes:

```tsx
// Before
className="text-[clamp(40px,7vw,90px)]"

// After  
className="text-cerita"
```

```tsx
// Before
className="text-[clamp(78px,16vw,190px)]"

// After
className="text-kanzler"
```

```tsx
// Before
className="text-[clamp(13px,1.1vw,16px)]"

// After
className="text-body-responsive"
```

### 2. Image Sizes

Replace fixed dimensions with responsive utility classes:

```tsx
// Before
<Image width={60} height={60} className="..." />

// After
<Image width={60} height={60} className="size-nav-crown" />
```

```tsx
// Before
<Image width={700} height={150} className="..." />

// After
<Image width={700} height={150} className="size-kanzler-logo" />
```

### 3. Container Widths

Replace fixed max-widths:

```tsx
// Before
className="max-w-[640px]"

// After
className="max-w-cerita"
```

```tsx
// Before
className="max-w-[940px]"

// After
className="max-w-kanzler-story"
```

## 🎨 Available Utility Classes

### Font Sizes
```css
.text-cerita      /* clamp(40px, 7vw, 120px) */
.text-kanzler     /* clamp(78px, 16vw, 240px) */
.text-body-responsive /* clamp(13px, 1.1vw, 18px) */
```

### Image Sizes

#### Navigation & UI
```css
.size-nav-crown      /* 60px base - navigation crown */
.size-navbar-logo    /* 50px base - navbar logo */
.size-nav-icon       /* 48px base - navigation icons */
```

#### Logos & Branding
```css
.size-crown-hero     /* 150px base - hero section crown */
.size-crown-split    /* 120px base - split view crown */
.size-kanzler-logo   /* 700px base - main Kanzler text */
.size-kanzler-split  /* 400px base - split view Kanzler */
.size-kanzler-quote  /* 800px base - quote image */
.size-homepack-logo  /* 350px base - Homepack logo */
```

#### Product Images
```css
.size-product-hero       /* 350px base - hero products */
.size-product-floating   /* 300px base - floating products */
.size-product-carousel   /* 700px base - carousel (nugget) */
.size-product-carousel-sm /* 500px base - carousel (others) */
.size-product-mockup     /* 400px base - package mockups */
.size-product-mockup-lg  /* 500px base - large mockups */
```

#### Homepack Specific
```css
.size-nugget-package     /* 200px base */
.size-beef-cocktail      /* 350px base */
.size-crispy-nugget      /* 500px base */
.size-nugget-floating    /* 220px base */
.size-homepack-products  /* 360px base */
```

### Container Widths
```css
.max-w-cerita           /* 640px base from CeritaKanzler */
.max-w-kanzler-story    /* 940px base from CeritaKanzler */
```

### Spacing
```css
.p-responsive     /* Responsive padding */
.m-responsive     /* Responsive margin */
.gap-responsive   /* Responsive gap */
```

### Grid Layouts
```css
.grid-responsive-2  /* 2-column responsive grid */
.grid-responsive-3  /* 3-column responsive grid */
.grid-responsive-4  /* 4-column responsive grid */
```

## 🔧 Advanced Usage

### React Hooks

```tsx
import { useResponsiveSizing, useResponsiveImageSize } from '@/hooks/use-responsive-sizing';

function MyComponent() {
  const { scale, isMobile, isDesktop } = useResponsiveSizing();
  const imageSize = useResponsiveImageSize(350, 500);
  
  return (
    <Image
      width={imageSize.width}
      height={imageSize.height}
      style={imageSize.style}
    />
  );
}
```

### CSS Custom Properties

```css
/* Use in your CSS */
.my-element {
  width: var(--size-product-hero);
  font-size: var(--font-cerita);
  padding: var(--space-4);
}
```

### TypeScript Utilities

```tsx
import { getResponsiveSize, responsiveFontSize } from '@/lib/responsive-sizing';

// Get responsive size
const responsiveWidth = getResponsiveSize(350, window.innerWidth);

// Get responsive font size
const fontSize = responsiveFontSize('cerita');
```

## 📱 Breakpoints

The system uses your exact breakpoint requirements:

```typescript
{
  'xs': '320px',     // Small phones
  'sm': '640px',     // Large phones  
  'md': '768px',     // Tablets
  'lg': '1024px',    // Small laptops
  'xl': '1280px',    // Desktop
  '2xl': '1536px',   // Large desktop
  '3xl': '1728px',   // MacBook Pro M1 16" (your reference)
  '4xl': '1920px',   // Full HD
  '5xl': '2560px',   // QHD
}
```

## 🎯 Migration Guide

### Step 1: Update CeritaKanzler Component

```tsx
// Replace existing component with:
import ResponsiveCeritaKanzler from '@/components/examples/ResponsiveCeritaKanzler';
```

### Step 2: Update Image Components

```tsx
// Before
<Image width={60} height={60} />

// After
<Image width={60} height={60} className="size-nav-crown" />
```

### Step 3: Update Container Widths

```tsx
// Before
className="max-w-[640px]"

// After
className="max-w-cerita"
```

### Step 4: Update Font Sizes

```tsx
// Before
className="text-[clamp(40px,7vw,90px)]"

// After
className="text-cerita"
```

## 🧪 Testing

Test on different screen sizes:

1. **Mobile (320px)**: All elements scale down proportionally
2. **Tablet (768px)**: Medium scaling maintained
3. **Desktop (1280px)**: Near-original size
4. **MacBook Pro (1728px)**: Exact original size
5. **Large Desktop (1920px+)**: Scales up proportionally

## 🎨 Examples

See the `components/examples/` folder for complete implementation examples:

- `ResponsiveCeritaKanzler.tsx` - Updated CeritaKanzler component
- `ResponsiveImageExample.tsx` - Various image sizing examples

## 💡 Tips

1. **Always maintain aspect ratios** - The system preserves your original proportions
2. **Use utility classes first** - They're optimized for your exact sizes
3. **Test on real devices** - Ensure the scaling feels natural
4. **Keep original values** - The system is based on your current perfect setup

## 🚀 Performance

- **CSS-based**: Uses efficient CSS clamp() and viewport units
- **Zero JavaScript overhead**: Most sizing is handled by CSS
- **Optimized builds**: Unused utilities are purged by Tailwind

Your MacBook Pro M1 16-inch layout will look identical, while all other devices get perfectly scaled versions!
