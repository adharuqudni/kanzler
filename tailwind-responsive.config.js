// Responsive sizing plugin for Tailwind CSS
// Maintains exact ratios from MacBook Pro M1 16-inch

const plugin = require('tailwindcss/plugin');

const responsiveSizingPlugin = plugin(function({ addUtilities, theme }) {
  const utilities = {
    // Font size utilities based on your exact values
    '.text-cerita': {
      fontSize: 'clamp(40px, 7vw, 120px)',
    },
    '.text-kanzler': {
      fontSize: 'clamp(78px, 16vw, 240px)',
    },
    '.text-body-responsive': {
      fontSize: 'clamp(13px, 1.1vw, 18px)',
    },
    
    // Image size utilities - Navigation & UI
    '.size-nav-crown': {
      width: 'clamp(40px, 3.5vw, 80px)',
      height: 'clamp(40px, 3.5vw, 80px)',
    },
    '.size-navbar-logo': {
      width: 'clamp(40px, 2.9vw, 60px)',
      height: 'clamp(40px, 2.9vw, 60px)',
    },
    '.size-nav-icon': {
      width: 'clamp(40px, 2.8vw, 56px)',
      height: 'clamp(40px, 2.8vw, 56px)',
    },
    
    // Logos and branding
    '.size-crown-hero': {
      width: 'clamp(100px, 8.7vw, 200px)',
      height: 'clamp(100px, 8.7vw, 200px)',
    },
    '.size-crown-split': {
      width: 'clamp(80px, 6.9vw, 160px)',
      height: 'clamp(80px, 6.9vw, 160px)',
    },
    '.size-kanzler-logo': {
      width: 'clamp(400px, 40.5vw, 900px)',
      height: 'clamp(88px, 8.9vw, 198px)', // Maintain aspect ratio
    },
    '.size-kanzler-split': {
      width: 'clamp(250px, 23.1vw, 500px)',
      height: 'clamp(55px, 5.1vw, 110px)', // Maintain aspect ratio
    },
    '.size-kanzler-quote': {
      width: 'clamp(500px, 46.3vw, 1000px)',
      height: 'clamp(63px, 5.8vw, 125px)', // Maintain aspect ratio
    },
    '.size-homepack-logo': {
      width: 'clamp(250px, 20.3vw, 450px)',
      height: 'clamp(107px, 8.7vw, 193px)', // Maintain aspect ratio
    },
    
    // Product images
    '.size-product-hero': {
      width: 'clamp(200px, 20.3vw, 500px)',
      height: 'clamp(286px, 29.0vw, 714px)', // 350:500 ratio
    },
    '.size-product-floating': {
      width: 'clamp(200px, 17.4vw, 400px)',
      height: 'clamp(200px, 17.4vw, 400px)',
    },
    '.size-product-carousel': {
      width: 'clamp(400px, 40.5vw, 900px)',
      height: 'clamp(457px, 46.3vw, 1029px)', // 700:800 ratio
    },
    '.size-product-carousel-sm': {
      width: 'clamp(300px, 28.9vw, 700px)',
      height: 'clamp(343px, 33.0vw, 800px)', // 500:572 ratio
    },
    '.size-product-mockup': {
      width: 'clamp(250px, 23.1vw, 550px)',
      height: 'clamp(250px, 23.1vw, 550px)',
    },
    '.size-product-mockup-lg': {
      width: 'clamp(350px, 28.9vw, 650px)',
      height: 'clamp(350px, 28.9vw, 650px)',
    },
    
    // Homepack specific
    '.size-nugget-package': {
      width: 'clamp(150px, 11.6vw, 280px)',
      height: 'clamp(113px, 8.7vw, 210px)', // 200:150 ratio
    },
    '.size-beef-cocktail': {
      width: 'clamp(250px, 20.3vw, 450px)',
      height: 'clamp(250px, 20.3vw, 450px)',
    },
    '.size-crispy-nugget': {
      width: 'clamp(350px, 28.9vw, 650px)',
      height: 'clamp(245px, 20.2vw, 455px)', // 500:350 ratio
    },
    '.size-nugget-floating': {
      width: 'clamp(180px, 12.7vw, 280px)',
      height: 'clamp(180px, 12.7vw, 280px)',
    },
    '.size-homepack-products': {
      width: 'clamp(280px, 20.8vw, 440px)',
      height: 'clamp(326px, 24.3vw, 513px)', // 360:420 ratio
    },
    
    // Section specific
    '.size-map-large': {
      width: 'clamp(800px, 69.4vw, 1400px)',
      height: 'clamp(467px, 40.5vw, 817px)', // 1200:700 ratio
    },
    '.size-social-icon': {
      width: 'clamp(32px, 2.3vw, 48px)',
      height: 'clamp(32px, 2.3vw, 48px)',
    },
    '.size-singles-logo': {
      width: 'clamp(350px, 28.9vw, 650px)',
      height: 'clamp(70px, 5.8vw, 130px)', // 500:100 ratio
    },
    
    // Container max-widths based on your layout
    '.max-w-cerita': {
      maxWidth: 'clamp(600px, 37.0vw, 680px)', // 640px base from CeritaKanzler
    },
    '.max-w-kanzler-story': {
      maxWidth: 'clamp(800px, 54.4vw, 1000px)', // 940px base from CeritaKanzler
    },
    
    // Aspect ratio utilities
    '.aspect-kanzler-logo': {
      aspectRatio: '5 / 1.1',
    },
    '.aspect-crown': {
      aspectRatio: '1 / 1',
    },
    '.aspect-product': {
      aspectRatio: '0.7 / 1',
    },
    '.aspect-mockup': {
      aspectRatio: '1 / 1',
    },
    '.aspect-quote': {
      aspectRatio: '8 / 1',
    },
    
    // Scale utilities for maintaining proportions
    '.scale-viewport': {
      transform: 'scale(calc(100vw / 1728))',
      transformOrigin: 'center',
    },
    '.scale-mobile': {
      transform: 'scale(0.6)',
      transformOrigin: 'center',
    },
    '.scale-tablet': {
      transform: 'scale(0.8)',
      transformOrigin: 'center',
    },
    '.scale-desktop': {
      transform: 'scale(1)',
      transformOrigin: 'center',
    },
    
    // Responsive padding and margins
    '.p-responsive-sm': {
      padding: 'clamp(12px, 0.9vw, 20px)',
    },
    '.p-responsive': {
      padding: 'clamp(16px, 1.2vw, 24px)',
    },
    '.p-responsive-lg': {
      padding: 'clamp(24px, 1.9vw, 36px)',
    },
    '.p-responsive-xl': {
      padding: 'clamp(32px, 2.8vw, 52px)',
    },
    
    '.m-responsive-sm': {
      margin: 'clamp(12px, 0.9vw, 20px)',
    },
    '.m-responsive': {
      margin: 'clamp(16px, 1.2vw, 24px)',
    },
    '.m-responsive-lg': {
      margin: 'clamp(24px, 1.9vw, 36px)',
    },
    '.m-responsive-xl': {
      margin: 'clamp(32px, 2.8vw, 52px)',
    },
    
    // Gap utilities
    '.gap-responsive': {
      gap: 'clamp(16px, 1.2vw, 24px)',
    },
    '.gap-responsive-lg': {
      gap: 'clamp(24px, 1.9vw, 36px)',
    },
    
    // Grid and flex utilities
    '.grid-responsive-2': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'clamp(16px, 1.2vw, 24px)',
    },
    '.grid-responsive-3': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'clamp(16px, 1.2vw, 24px)',
    },
    '.grid-responsive-4': {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'clamp(16px, 1.2vw, 24px)',
    },
  };

  addUtilities(utilities);
});

module.exports = responsiveSizingPlugin;
