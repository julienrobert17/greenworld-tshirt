import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClass = "btn"
    const variantClass = variant === "secondary" ? "btn--secondary" : "btn--default"
    const finalClassName = `${baseClass} ${variantClass} ${className}`.trim()
    
    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }