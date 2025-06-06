import React from 'react'

      const Select = ({ value, onChange, options, className, ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
          >
            {options.map((option, index) => (
              <option key={option.value || index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }

      export default Select