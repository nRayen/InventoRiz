"use client"
import inventoryReducer from "@/utils/inventoryReducer";
import { createContext, useContext, useReducer, useState } from "react"


const InventoryContext = createContext();

export const InventoryProvider = ({ children, initialInventory }) => {

    const [addMenu, setAddMenu] = useState(false)
    const [updateMenu, setUpdateMenu] = useState({open: false, item : null})

    const [inventory, dispatch] = useReducer(inventoryReducer, initialInventory)
    // const [inventory, setInventory] = useState(initialInventory)



    const addToInventory = (newItem) => {
        dispatch({type: 'ADD_PRODUCT', data : newItem})
    }

    const removeFromInventory = (id) => {
        // setInventory(inventory.filter((item) => item.id !== id))
        dispatch({type: 'DELETE_PRODUCT', data : id})
    }

    const updateInInventory = (updatedItem) => {
        dispatch({type: 'UPDATE_PRODUCT', data : updatedItem})
    }





    let contextData = {inventory, addToInventory, removeFromInventory, addMenu, setAddMenu, updateMenu, setUpdateMenu, updateInInventory}
    return (
        <InventoryContext.Provider value={contextData}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => useContext(InventoryContext);