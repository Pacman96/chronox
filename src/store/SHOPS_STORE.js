import { format } from "../utils"
const { reducerErr } = format

const START_LOADING = '⏳ START_LOADING_SHOPS'
const END_LOADING = '⌛️ END_LOADING_SHOPS'
const ERROR = '⛔️ SHOPS_ERROR'
const CLEAR_ERRORS = 'CLEAR_SHOPS_ERRORS'

const SET_SHOPS = 'SET_SHOPS'
const SELECT_SHOP = 'SELECT_SHOP'


const initialState = {
    loading: true,

    data: [],
    selectedID: '',

    errs: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case START_LOADING:
            return { ...state, loading: true }
        case END_LOADING:
            return { ...state, loading: false }

        case SET_SHOPS:
            return { ...state, data: payload }
        case SELECT_SHOP:
            return { ...state, selectedID: payload }

        case ERROR:
            return { ...state, errs: [...state.errs, payload] }
        case CLEAR_ERRORS:
            return { ...state, errs: [] }
        default:
            return state
    }
}

export const SHOPS_STORE = {
    reducer,
    loading: (loading) => loading ? ({ type: START_LOADING }) : ({ type: END_LOADING }),

    setUserShops: shops => shops && shops.length > 0 ? ({ type: SET_SHOPS, payload: shops }) : ({ type: ERROR, payload: reducerErr('empty', 'You have no shops') }),
    setSelectedShop: (shopID) => ({ type: SELECT_SHOP, payload: shopID }),

    setErr: (code, message) => ({ type: ERROR, payload: format.reducerErr(code, message) }),
    clearErrors: () => ({ type: END_LOADING }),
}

