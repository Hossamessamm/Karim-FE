export const colors = {
  // Main background colors
  background: {
    primary: 'bg-slate-50',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800',
    white: 'bg-white',
  },

  // Text colors
  text: {
    primary: 'text-slate-900',
    secondary: 'text-slate-600',
    light: 'text-slate-300',
    white: 'text-white',
    teal: 'text-teal-400',
    accent: 'text-teal-300',
  },

  // Button colors
  button: {
    primary: {
      base: 'bg-teal-600',
      hover: 'hover:bg-teal-700',
      shadow: 'shadow-lg shadow-teal-500/25',
    },
    secondary: {
      base: 'bg-slate-800',
      hover: 'hover:bg-slate-700',
      border: 'border border-teal-500/30',
    },
  },

  // Accent colors and effects
  accent: {
    teal: {
      light: 'bg-teal-100',
      medium: 'bg-teal-500',
      transparent: 'bg-teal-500/20',
      border: 'border-teal-500',
    },
    blob: {
      teal: 'bg-teal-500/30',
      purple: 'bg-purple-500/30',
      pink: 'bg-pink-500/30',
    },
  },

  // Border colors
  border: {
    light: 'border-slate-100',
    white: 'border-white/10',
    divider: 'border-slate-200',
  },

  // Rating colors
  rating: {
    star: 'text-yellow-400',
  },
};

// Reusable component color combinations
export const componentColors = {
  // Hero section
  hero: {
    wrapper: `${colors.background.dark} ${colors.text.white}`,
    badge: `${colors.accent.teal.transparent} ${colors.text.accent}`,
    heading: colors.text.white,
    subheading: colors.text.teal,
    description: colors.text.light,
  },

  // Primary button
  primaryButton: `${colors.button.primary.base} ${colors.text.white} ${colors.button.primary.hover} ${colors.button.primary.shadow} transform hover:-translate-y-1 transition-all duration-300`,

  // Secondary button
  secondaryButton: `${colors.button.secondary.base} ${colors.text.teal} ${colors.button.secondary.hover} ${colors.button.secondary.border} transform hover:-translate-y-1 transition-all duration-300`,

  // Section headers
  sectionHeader: {
    title: colors.text.primary,
    description: colors.text.secondary,
    highlight: colors.accent.teal.light,
  },

  // Cards
  card: {
    wrapper: `${colors.background.white} ${colors.border.light}`,
    hover: 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
  },
};

// Theme configuration
export const themeConfig = {
  primary: '#14b8a6', // teal-600
  secondary: '#7c3aed', // purple-600
  dark: '#0f172a', // slate-900
  light: '#f8fafc', // slate-50
}; 