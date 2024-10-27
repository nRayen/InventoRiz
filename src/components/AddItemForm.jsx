"use client"
import { useInventory } from '@/hooks/useInventory'
import React from 'react'

const AddItemForm = () => {
    const {addMenu, setAddMenu, inventory, addToInventory} = useInventory();

    if (addMenu === false) {
        return
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = inventory.reduce((max, item) => (item.id > max.id ? item : max), inventory[0]).id + 1;

        const newItem = {
            id,
            name : document.getElementById('name').value.trim(),
            description : document.getElementById('description').value.trim() || null,
            quantity : document.getElementById('quantity').value.toString().trim(),
            price : document.getElementById('price').value.toString().trim() || null,
        }

        if (newItem.name && newItem.quantity) {
            addToInventory(newItem)
            setAddMenu(false)
        }
    }

    return (

        <form  onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" required/>


            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />


            <label htmlFor="quantity" required>Quantité</label>
            <input type="number" name="quantity" id="quantity" />


            <label htmlFor="price">Prix</label>
            <input type="number" name="price" id="price" />

            <button type="submit">Ajouter</button>
        </form>
    )
}

export default AddItemForm