"use client"
import { createContext, useContext, useState } from "react"


const InventoryContext = createContext();

export const InventoryProvider = ({ children, initialInventory }) => {


    const [inventory, setInventory] = useState(initialInventory)

    const addToInventory = (newItem) => {
        setInventory([...inventory, newItem])
    }

    const removeFromInventory = (id) => {
        setInventory(inventory.filter((item) => item.id !== id))
    }

    let contextData = {inventory, addToInventory, removeFromInventory}


    return (
        <InventoryContext.Provider value={contextData}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => useContext(InventoryContext);