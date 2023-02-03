import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react'

import { OptionsType } from '../types'

import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
  options?: OptionsType[]
  onChangeOption?: (option: number) => void

  spanProps?: DefaultSpanPropsType // пропсы для спана
}

export const SuperRadio: React.FC<SuperRadioPropsType> = ({
  id,
  name,
  className,
  options,
  value,
  onChange,
  onChangeOption,
  spanProps,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    // делают студенты
    // const newValue = e.currentTarget.value === options?.map(o => o.value);
    onChangeOption?.(Number(e.currentTarget.value))
  }

  const finalRadioClassName = s.radio + (className ? ' ' + className : '')
  const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

  const mappedOptions: JSX.Element[] = options
    ? options.map(o => {
        return (
          <label key={name + '-' + o.id} className={s.label}>
            <input
              id={id + '-input-' + o.id}
              className={finalRadioClassName}
              type={'radio'}
              // name, checked, value делают студенты
              name={name}
              checked={value === o.id}
              value={o.id}
              onChange={onChangeCallback}
              {...restProps}
            />
            <span id={id + '-span-' + o.id} {...spanProps} className={spanClassName}>
              {o.value}
            </span>
          </label>
        )
      })
    : []

  return <div className={s.options}>{mappedOptions}</div>
}
