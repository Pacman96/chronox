import { format } from "../utils"
const { reducerErr } = format

export const START_LOADING = '⏳ START_LOADING_AUTH'
export const END_LOADING = '⌛️ END_LOADING_AUTH'


export const USER_LOGGED = 'USER_LOGGED'
export const USER_UNLOGGED = 'USER_UNLOGGED'

export const USER_UID = 'SET_USER_UID'
export const USER_USERNAME = 'SET_USER_USERNAME'
export const USER_AVATAR = 'SET_USER_AVATAR'
export const USER_EMAIL = 'SET_USER_EMAIL'
export const USER_EMAIL_VERIFIED = 'SET_USER_EMAIL_VERIFIED'
export const USER_EMAIL_UNVERIFIED = 'SET_USER_EMAIL_UNVERIFIED'
export const USER_PHONE = 'SET_USER_PHONE'

export const USER_ATTRIBUTES = 'SET_USER_ATTRIBUTES'
export const USER_COLLECTIONS = 'SET_USER_COLLECTIONS'



export const ERROR = '⛔️ AUTH_ERROR'
export const CLEAR_ERRORS = 'CLEAR_AUTH_ERRORS'

const initialState = {
    loading: true,
    logged: null,

    uid: '',
    username: '',
    avatar: '',
    email: '',
    emailVerified: null,
    phone: '',

    attributes: [],
    collections: [],

    errs: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case START_LOADING:
            return { ...state, loading: true }
        case END_LOADING:
            return { ...state, loading: false }

        case USER_LOGGED:
            return { ...state, logged: true, loading: false }
        case USER_UNLOGGED:
            return { ...state, logged: false, loading: false }

        case USER_UID:
            return { ...state, uid: payload }
        case USER_USERNAME:
            return { ...state, username: payload }
        case USER_AVATAR:
            return { ...state, avatar: payload }
        case USER_EMAIL:
            return { ...state, email: payload }
        case USER_EMAIL_VERIFIED:
            return { ...state, emailVerified: true }
        case USER_EMAIL_UNVERIFIED:
            return { ...state, emailVerified: false }
        case USER_PHONE:
            return { ...state, phone: payload }

        case USER_ATTRIBUTES:
            return { ...state, attributes: payload }
        case USER_COLLECTIONS:
            return { ...state, collections: payload }

        case ERROR:
            return { ...state, errs: [...state.errs, payload] }
        case CLEAR_ERRORS:
            return { ...state, errs: [] }
        default:
            return state
    }
}

export const AUTH_STORE = {
    reducer,
    loading: (loading) => loading ? ({ type: START_LOADING }) : ({ type: END_LOADING }),

    setUserLogged: () => ({ type: USER_LOGGED }),
    setUserUnlogged: () => ({ type: USER_UNLOGGED }),

    setUserUID: uid => ({ type: USER_UID, payload: uid }),

    setUserUsername: username => !username ? ({ type: ERROR, payload: reducerErr('empty-username', 'No username') }) : ({ type: USER_USERNAME, payload: username }),
    setUserAvatar: avatar => !avatar ? ({ type: ERROR, payload: reducerErr('empty-avatar', 'No avatar') }) : ({ type: USER_AVATAR, payload: avatar }),
    setUserEmail: email => !email ? ({ type: ERROR, payload: reducerErr('empty-email', 'No email') }) : ({ type: USER_EMAIL, payload: email }),
    setUserEmailVerification: isVerified => isVerified ? ({ type: USER_EMAIL_VERIFIED }) : ({ type: USER_EMAIL_UNVERIFIED }),
    setUserPhone: phone => !phone ? ({ type: ERROR, payload: reducerErr('empty-phone', 'No phone') }) : ({ type: USER_AVATAR, payload: phone }),

    setAttributes: attributes => attributes && attributes.length > 0 ? ({ type: USER_ATTRIBUTES, payload: attributes }) : ({ type: ERROR, payload: reducerErr('empty-attributes', 'You have no attributes') }),
    setCollections: collections => collections && collections.length > 0 ? ({ type: USER_COLLECTIONS, payload: collections }) : ({ type: ERROR, payload: reducerErr('empty-collections', 'You have no collections') }),

    setErr: (code, message) => ({ type: ERROR, payload: format.reducerErr(code, message) }),
    clearErrors: () => ({ type: END_LOADING }),
}

