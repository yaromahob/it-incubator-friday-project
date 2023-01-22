import React from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { DeletePackOrCard } from '../../common/ModalFields/DeletePackOrCard/DeletePackOrCard'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'

export const DeleteCard = () => {
  return (
    <div>
      <ModalFields>
        <HeaderModal titleModal={'Delete Card'} />
        <DeletePackOrCard nameItem={'PATRONUS'} />
        <SaveAndCancelField type={'Delete'} />
      </ModalFields>
    </div>
  )
}
