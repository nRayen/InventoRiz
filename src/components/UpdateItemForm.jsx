"use client"
import { useInventory } from '@/hooks/useInventory'
import React from 'react'

const UpdateItemForm = () => {
    const {updateMenu, setUpdateMenu, inventory, updateInInventory} = useInventory();

    if (updateMenu.open === false) {
        return
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = updateMenu.item.id

        const updatedItem = {
            id,
            name : document.getElementById('name').value.trim(),
            description : document.getElementById('description').value.trim() || null,
            quantity : document.getElementById('quantity').value.toString().trim(),
            price : document.getElementById('price').value.toString().trim() || null,
        }



        if (updatedItem.name && updatedItem.quantity) {
            updateInInventory(updatedItem)
            setUpdateMenu({open: false, item: null})

            // Update w/ Prisma
            
        }
    }

    return (

        <form  onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" defaultValue={updateMenu.item.name} required/>


            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" defaultValue={updateMenu.item.description}/>


            <label htmlFor="quantity" required>Quantité</label>
            <input type="number" name="quantity" id="quantity" defaultValue={updateMenu.item.quantity}/>


            <label htmlFor="price">Prix</label>
            <input type="number" name="price" id="price" defaultValue={updateMenu.item.price}/>

            <button type="submit">Confirmer</button>
        </form>
    )
}

export default UpdateItemForm