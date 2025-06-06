import React from 'react'

      const Button = ({ children, onClick, className, type = 'button', icon: IconComponent, iconSize = 16, iconClassName = '', ...props }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`transition-colors flex items-center justify-center ${className}`}
            {...props}
          >
            {IconComponent && <IconComponent size={iconSize} className={`mr-2 ${iconClassName}`} />}
            {children}
          </button>
        )
      }

      export default Button