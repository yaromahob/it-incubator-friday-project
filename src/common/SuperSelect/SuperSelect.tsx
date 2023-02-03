import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react'
import { OptionsType } from '../types'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: OptionsType[]
  onChangeOption?: (option: number) => void
}

export const SuperSelect: React.FC<SuperSelectPropsType> = ({ options, className, onChange, value, onChangeOption, ...restProps }) => {
  const mappedOptions: JSX.Element[] = options
    ? options.map(o => (
        <option id={'hw7-option-' + o.id} className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [] // map options with key
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    // делают студенты
    onChangeOption?.(Number(e.currentTarget.value))
    onChange?.(e)
  }

  const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <select className={finalSelectClassName} onChange={onChangeCallback} value={value} {...restProps}>
      {mappedOptions}
    </select>
  )
}
