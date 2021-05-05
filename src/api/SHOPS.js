import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firedb from '../services/firedb'
import { SHOPS_STORE } from "../store/SHOPS_STORE"
import { TOASTS } from './TOASTS'

const select = (shopID) => dispatch => dispatch(SHOPS_STORE.setSelectedShop(shopID))

const createBasicShop = (data = {}, beforeStart, onSuccess, onFail) => (dispatch, getState) => {
    const { label, categoryID } = data
    const uid = getState().auth.uid
console.log(data)
    beforeStart && beforeStart()

    return firedb.app('admin').firestore().collection('shops').add({
        label: label,
        contact: {
            phone: '',
            whatsapp: '',
            email: '',
            address: '',
            cityID: '',
            countryID: '',
        },
        brand: {
            logoLabel: '',
            slogan: '',
            logoURL: '',
            primaryColor: '',
            secondaryColor: ''
        },
        categoryID: categoryID || null,
        ownersIDS: [uid]
    })
        .then(() => {
            dispatch(TOASTS.add({ title: `<b>${label}</b> created successfully`, color: 'success' }))
            onSuccess()
        })
        .catch(() => {
            dispatch(TOASTS.add({ title: `Couldn't create shop`, color: 'error' }))
            onFail()
        })



}

const createOne = (uid, name, categoryID) => firedb.app('admin').firestore().collection('shops').doc().set({
    label: name,
    contact: {
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        cityID: '',
        countryID: '',
    },
    brand: {
        logoLabel: '',
        slogan: '',
        logoURL: '',
        primaryColor: '',
        secondaryColor: ''
    },
    categoryID: categoryID || 'unset',
    ownersIDS: [uid]
})

const uploadLogo = (files, shopID) => firedb.app('admin').storage()
    .ref('brandLogo/')
    .child(shopID).put(files[0])


const updateShopField = {
    label: (shopID, labelString, onSuccess) => dispatch => {
        return firedb.app('admin').firestore().collection('shops').doc(shopID)
            .update({ label: labelString })
            .then(() => dispatch(TOASTS.add({ title: labelString + "label's changed", color: 'success' })))
            .then(onSuccess)
            .catch(() => dispatch(TOASTS.add({ title: 'Error updating label ', color: 'error' })))
    },
    contact: (shopID, dataObject, onSuccess) => dispatch => {
        return firedb.app('admin').firestore().collection('shops').doc(shopID)
            .update({ contact: dataObject })
            .then(() => dispatch(TOASTS.add({ title: "Shop contact informations changed", color: 'success' })))
            .then(onSuccess)
            .catch(() => dispatch(TOASTS.add({ title: 'Error updating contact informations', color: 'error' })))
    },
    brand: (shopID, dataObject, onSuccess) => dispatch => {
        return firedb.app('admin').firestore().collection('shops').doc(shopID)
            .update({ brand: dataObject })
            .then(() => dispatch(TOASTS.add({ title: "Shop brand changed", color: 'success' })))
            .then(onSuccess)
            .catch(() => dispatch(TOASTS.add({ title: 'Error updating brand ', color: 'error' })))
    },
    categoryID: (shopID, categoryIDString, onSuccess) => dispatch => {
        return firedb.app('admin').firestore().collection('shops').doc(shopID)
            .update({ categoryID: categoryIDString })
            .then(() => dispatch(TOASTS.add({ title: "Shop category changed", color: 'success' })))
            .then(onSuccess)
            .catch(() => dispatch(TOASTS.add({ title: 'Error updating category ', color: 'error' })))
    },
    ownersIDS: () => {

    }
}



const listen = uid => (dispatch, getState) => {

    dispatch(SHOPS_STORE.loading(true))

    firedb.app('admin').firestore().collection("shops")
        .where('ownersIDS', 'array-contains', uid)
        .onSnapshot(snapshot => {
            let shops = []

            snapshot.forEach(doc => shops.push({
                shopID: doc.id,
                ...doc.data(),
                function: 'owner'
            }))
            dispatch(SHOPS_STORE.setUserShops(shops))

            if (!getState().shops.selectedID) {
                dispatch(SHOPS_STORE.setSelectedShop(shops[0]?.shopID))
            }

            dispatch(SHOPS_STORE.loading(false))

        })
}



const RootWrapper = ({ children }) => {
    const dis = useDispatch()
    const { loading } = useSelector(state => state.shops)
    const { logged, uid } = useSelector(state => state.auth)
    useEffect(() => { dis(listen(uid)) }, [dis, uid])
    if (logged && loading) return <div>Loading shops ...</div>
    return children
}


export const SHOPS = {
    create: {
        basic: createBasicShop
    },
    RootWrapper,
    listen,
    createOne,
    select,
    updateShopField,
    uploadLogo
}