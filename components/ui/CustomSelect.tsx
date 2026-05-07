"use client"

import Select, { StylesConfig } from 'react-select'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  isLoading?: boolean
  icon: React.ReactNode
}

export default function CustomSelect({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  isLoading,
  icon
}: CustomSelectProps) {
  const customStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
      ...base,
      border: 'none',
      boxShadow: 'none',
      background: 'transparent',
      cursor: 'pointer',
      minHeight: 'auto',
      '&:hover': {
        border: 'none',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#111827',
      fontWeight: '600',
      fontSize: '0.875rem',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#6B7280',
      fontWeight: '500',
      fontSize: '0.875rem',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#9CA3AF',
      padding: '0 4px',
      '&:hover': {
        color: '#6B7280',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px border-gray-100',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      zIndex: 50,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected 
        ? '#2563EB' 
        : isFocused 
          ? '#EFF6FF' 
          : 'transparent',
      color: isSelected ? 'white' : '#374151',
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '10px 16px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#DBEAFE',
      },
    }),
  }

  const selectedOption = options.find(opt => opt.value === value) || null

  return (
    <div className="flex-1 flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-r-0">
      <div className="text-blue-600 mr-3 flex-shrink-0">
        {icon}
      </div>
      <div className="w-full">
        <Select
          options={options}
          value={selectedOption}
          onChange={(opt) => onChange(opt?.value || "")}
          placeholder={placeholder}
          isLoading={isLoading}
          styles={customStyles}
          isSearchable={true}
          instanceId={placeholder}
        />
      </div>
    </div>
  )
}
