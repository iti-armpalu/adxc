interface LogoProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'full' | 'icon' | 'text'
    theme?: 'light' | 'dark'
    className?: string
    showGlow?: boolean
  }
  
  const sizeConfig = {
    xs: {
      icon: 'w-6 h-6',
      iconText: 'text-xs',
      text: 'text-sm',
      svgIcon: 'w-3.5 h-3.5',
      rounded: 'rounded-md',
      gap: 'gap-1.5',
    },
    sm: {
      icon: 'w-8 h-8',
      iconText: 'text-sm',
      text: 'text-lg',
      svgIcon: 'w-4 h-4',
      rounded: 'rounded-lg',
      gap: 'gap-2',
    },
    md: {
      icon: 'w-10 h-10',
      iconText: 'text-lg',
      text: 'text-xl',
      svgIcon: 'w-5 h-5',
      rounded: 'rounded-xl',
      gap: 'gap-2',
    },
    lg: {
      icon: 'w-12 h-12',
      iconText: 'text-xl',
      text: 'text-2xl',
      svgIcon: 'w-6 h-6',
      rounded: 'rounded-xl',
      gap: 'gap-2.5',
    },
    xl: {
      icon: 'w-14 h-14',
      iconText: 'text-2xl',
      text: 'text-3xl',
      svgIcon: 'w-7 h-7',
      rounded: 'rounded-2xl',
      gap: 'gap-3',
    },
  }
  
  export default function Logo({ 
    size = 'md', 
    variant = 'full', 
    theme = 'light',
    className = '',
    showGlow = false
  }: LogoProps) {
    const config = sizeConfig[size]
    
    const textColor = theme === 'light' ? 'text-gray-900' : 'text-white'
    const glowStyle = showGlow ? 'shadow-[0px_0px_15px_0px_rgba(102,2,60,0.5)]' : ''
  
    const LogoIcon = () => (
      <div 
        className={`${config.icon} bg-[#66023C] ${config.rounded} flex items-center justify-center ${glowStyle}`}
      >
        {/* Option 1: Letter "A" */}
        {/* <span className={`text-white font-bold ${config.iconText}`}>A</span> */}
        
        {/* Option 2: Abstract layers icon */}
        <svg 
          className={`${config.svgIcon} text-white`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    )
  
    const LogoText = () => (
      <span className={`font-bold ${config.text} ${textColor} tracking-tight`}>
        ADXC
      </span>
    )
  
    if (variant === 'icon') {
      return (
        <div className={className}>
          <LogoIcon />
        </div>
      )
    }
  
    if (variant === 'text') {
      return (
        <div className={className}>
          <LogoText />
        </div>
      )
    }
  
    // Full variant - icon + text
    return (
      <div className={`flex items-center ${config.gap} ${className}`}>
        <LogoIcon />
        <LogoText />
      </div>
    )
  }
  
  // Export a simple hook-like component for the icon only
  export function LogoIcon({ 
    size = 'md', 
    className = '',
    showGlow = false 
  }: Pick<LogoProps, 'size' | 'className' | 'showGlow'>) {
    return <Logo size={size} variant="icon" className={className} showGlow={showGlow} />
  }