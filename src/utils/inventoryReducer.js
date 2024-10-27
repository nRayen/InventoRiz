export default function inventoryReducer (state, action) {
    const {type, data} = action
    switch (type) {
        case 'DELETE_PRODUCT':
            return state.filter((p) => p.id != data)

        case 'ADD_PRODUCT':
            return [...state, data]

        case 'UPDATE_PRODUCT':
            let index = state.findIndex((p) => p.id == data.id)
            let newState = [...state]
            newState[index] = data
            return newState

        default:
            return state
    }
}