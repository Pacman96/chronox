import { format } from "../utils"
const { reducerErr } = format

const START_LOADING = '⏳ START_LOADING_PRODUCTS'
const END_LOADING = '⌛️ END_LOADING_PRODUCTS'
const ERROR = '⛔️ PRODUCTS_ERROR'
const CLEAR_ERRORS = 'CLEAR_SHOPS_ERRORS'

const SET_PRODUCTS = 'SET_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'


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

        case SET_PRODUCTS:
            return { ...state, data: payload }
        case SELECT_PRODUCT:
            return { ...state, selectedID: payload }

        case ERROR:
            return { ...state, errs: [...state.errs, payload] }
        case CLEAR_ERRORS:
            return { ...state, errs: [] }
        default:
            return state
    }
}

export const PRODUCTS_STORE = {
    reducer,
    loading: (loading) => loading ? ({ type: START_LOADING }) : ({ type: END_LOADING }),

    setProducts: products => products && products.length > 0 ? ({ type: SET_PRODUCTS, payload: shops }) : ({ type: ERROR, payload: reducerErr('empty', 'You have no products') }),
    setSelectedProduct: (productID) => ({ type: SELECT_PRODUCT, payload: productID }),

    setErr: (code, message) => ({ type: ERROR, payload: format.reducerErr(code, message) }),
    clearErrors: () => ({ type: END_LOADING }),
}

