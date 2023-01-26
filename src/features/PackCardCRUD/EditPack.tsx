import React from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { EditOrAddCard } from '../../common/ModalFields/EditOrAddCard/EditOrAddCard'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'

export const EditPack = () => {
  return (
    <div>
      <ModalFields>
        <HeaderModal titleModal={'Edit pack'} />
        <AddOrEditPack />
        <SaveAndCancelField type={'Save'} />
      </ModalFields>
    </div>
  )
}