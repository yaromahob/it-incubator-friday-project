import React from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'

export const AddNewPack = () => {
  return (
    <div>
      <ModalFields>
        <HeaderModal titleModal={'Add new pack'} />
        <AddOrEditPack />
        <SaveAndCancelField type={'Save'} />
      </ModalFields>
    </div>
  )
}
