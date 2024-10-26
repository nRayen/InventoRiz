"use client"
import { useInventory } from '@/hooks/useInventory'
import React from 'react'

const InventoryList = () => {
    const {inventory, addToInventory,removeFromInventory} = useInventory();

  const handleDelete = (id) => {
    removeFromInventory(id);
  }


  return (
      <table>
        <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
          {inventory.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button>Modifier</button>
                  <button onClick={() => handleDelete(item.id)}>Supprimer</button>
                </td>
              </tr>
            )
          })}
        <tr><td rowSpan={5}>
          <button>Ajouter</button>
        </td></tr>
        </tbody>
      </table>
  )
}

export default InventoryList