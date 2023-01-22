import React from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { DeletePackOrCard } from '../../common/ModalFields/DeletePackOrCard/DeletePackOrCard'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'

export const DeletePack = () => {
  return (
    <div>
      <ModalFields>
        <HeaderModal titleModal={'Delete Pack'} />
        <DeletePackOrCard nameItem={'ALAHAMORA'} />
        <SaveAndCancelField type={'Delete'} />
      </ModalFields>
    </div>
  )
}
