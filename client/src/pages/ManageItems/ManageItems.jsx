import React from 'react'
import './ManageItem.css'
import ItemForm from '../../components/ItemForm/ItemForm'
import ItemList from '../../components/ItemList/ItemList'
export default function ManageItems() {
  return (
     <div className="items-container text-light">
      <div className="left-column">
              <ItemForm/>
      </div>
      <div className="right-column">
        <ItemList/>
      </div>
    </div>
  )
}
