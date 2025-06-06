import React from 'react'

      const Checkbox = ({ id, checked, onChange, label, className = '' }) => {
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={id}
              checked={checked}
              onChange={onChange}
              className={`mr-2 h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded ${className}`}
            />
            {label && (
              <label htmlFor={id} className="text-sm">
                {label}
              </label>
            )}
          </div>
        )
      }

      export default Checkbox