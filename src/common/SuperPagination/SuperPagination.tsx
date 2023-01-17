import React, { ChangeEvent } from 'react'

import { Pagination } from '@mui/material'

import SuperSelect from '../SuperSelect/SuperSelect'

import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
  disabled: boolean
}

export const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'hw15',
  disabled,
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage)
  const onChangeCallback = (event: ChangeEvent<unknown>, page: number) => {
    // пишет студент
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(page, +event.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={
          {
            // стили для Pagination // пишет студент
          }
        }
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
        disabled={disabled}
      />

      <span className={s.text1}>Show</span>

      <SuperSelect
        id={id + '-pagination-select'}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 7, value: 7 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
        disabled={disabled}
      />

      <span className={s.text2}>Cards per Page</span>
    </div>
  )
}

