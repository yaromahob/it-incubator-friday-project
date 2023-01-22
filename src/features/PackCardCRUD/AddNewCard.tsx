import React from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { EditOrAddCard } from '../../common/ModalFields/EditOrAddCard/EditOrAddCard'

export const AddNewCard = () => {
  return (
    <div>
      <ModalFields>
        <HeaderModal titleModal={'Add new card'} />
        <EditOrAddCard />
      </ModalFields>
    </div>
  )
}
