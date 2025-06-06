import React from 'react'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Select from '@/components/atoms/Select'
      import Text from '@/components/atoms/Text'

      const FormField = ({ label, type, value, onChange, placeholder, options, rows, ...props }) => {
        const inputProps = {
          value,
          onChange,
          className: 'w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:ring-2 focus:ring-primary focus:border-transparent',
          ...props
        }

        let control
        switch (type) {
          case 'select':
            control = <Select options={options} {...inputProps} />
            break
          case 'textarea':
            control = <textarea rows={rows} placeholder={placeholder} {...inputProps} />
            break
          default:
            control = <Input type={type} placeholder={placeholder} {...inputProps} />
        }

        return (
          <div>
            {label && <Label>{label}</Label>}
            {control}
          </div>
        )
      }

      export default FormField