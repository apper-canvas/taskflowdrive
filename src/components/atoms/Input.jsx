import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className, ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
          />
        )
      }

      export default Input