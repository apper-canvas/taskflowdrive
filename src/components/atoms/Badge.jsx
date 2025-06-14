import React from 'react'

      const Badge = ({ children, className }) => {
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
            {children}
          </span>
        )
      }

      export default Badge