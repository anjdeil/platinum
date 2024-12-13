import { CustomSelectProps } from '@/types/components/global/selects'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CustomLabel, CustomSelectStyled, MenuItem, StyledCollapse } from './styles'
import ArrowIcon from '../../icons/ArrowIcon/ArrowIcon'
import { CustomError } from '../../forms/CustomFormInput/styles'

export default function CustomSelect({
  options,
  width,
  value,
  onChange,
  setValue,
  register,
  errors,
  name,
  defaultValue,
  borderRadius,
  background,
  padding,
  fontSize,
  mobFontSize,
  mobPadding,
  tabletPadding,
  allignItem,
  paddingOptions,
  label,
}: CustomSelectProps) {
  const [isError, setError] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue || '')

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // react-hook-form
  useEffect(() => {
    if (!errors || !name) {
      setError(false)
      return
    }
    setError(name in errors)
  }, [errors, name])

  useEffect(() => {
    if (defaultValue && defaultValue !== '' && setValue) {
      setValue(name, defaultValue, { shouldValidate: true })
      setSelectedValue(defaultValue)
    }
  }, [defaultValue, setValue, name])

  const handleOptionClick = (optionCode: string) => {
    setSelectedValue(optionCode)
    if (setValue) {
      setValue(name, optionCode, { shouldValidate: true })
    }
  }

  return (
    <>
      {label && <CustomLabel htmlFor={name}>{label}</CustomLabel>}
      <CustomSelectStyled
        ref={containerRef}
        onClick={handleToggle}
        isOpen={isOpen}
        width={width}
        borderRadius={borderRadius}
        background={background}
        padding={padding}
        fontSize={fontSize}
        mobFontSize={mobFontSize}
        mobPadding={mobPadding}
        tabletPadding={tabletPadding}
      >
        {selectedValue}
        <ArrowIcon isOpen={isOpen} />
        <StyledCollapse id={name} in={isOpen} timeout="auto">
          {options.map((option) => (
            <MenuItem
              key={option.code}
              onClick={() => handleOptionClick(option.code)}
              mobFontSize={mobFontSize}
              background={background}
              padding={padding}
              mobPadding={mobPadding}
              tabletPadding={tabletPadding}
              allignItem={allignItem}
              paddingOptions={paddingOptions}
            >
              {option.name}
            </MenuItem>
          ))}
        </StyledCollapse>
        {isError && name && <CustomError>{errors[name]?.message}</CustomError>}
      </CustomSelectStyled>
    </>
  )
}
