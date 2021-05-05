
 const ADD_TOAST = 'ADD_TOAST'
 const REMOVE_TOAST = 'REMOVE_TOAST'


const initialState = []

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TOAST:
            return [...state, payload]
        case REMOVE_TOAST:
            return state.filter((item) => item.id !== payload.id)
        default:
            return state
    }
}

export const TOASTS_STORE = {
    reducer,
    add: (payload) => ({ type: ADD_TOAST, payload }),
    remove: (payload) => ({ type: REMOVE_TOAST, payload }),
}

