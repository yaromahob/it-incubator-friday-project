import React from 'react'

import SuperButton from '../../common/SuperButton/SuperButton'
import { SuperCheckbox } from 'common/SuperCheckbox'
import { SuperEditableSpan } from 'common/SuperEditableSpan'
import { SuperInputText } from 'common/SuperInputText'
import { SuperRadio } from 'common/SuperRadio'
import { SuperRange } from 'common/SuperRange'
import { SuperSelect } from 'common/SuperSelect'

export const SuperComponents = () => {
  return (
    <div>
      <SuperButton />
      <SuperCheckbox />
      <SuperEditableSpan />
      <SuperInputText />
      <SuperRadio />
      <SuperRange />
      <SuperSelect />
    </div>
  )
}
