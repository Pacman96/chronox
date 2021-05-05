import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firedb from '../services/firedb'
import { PRODUCTS_STORE } from '../store/PRODUCTS_STORE'
import { SHOPS_STORE } from "../store/SHOPS_STORE"
import { TOASTS } from './TOASTS'

const select = (shopID) => dispatch => dispatch(SHOPS_STORE.setSelectedShop(shopID))

const createOne = (
    shopID,
    name,
    description1 = '',
    description2 = '',
    attributes = [
        { attributeID: '', values: [] },
        { attributeID: '', values: [] }
    ],

) => firedb.app('admin').firestore().collection('products').doc()
    .set({
        meta: {
            label: name,
            url,
            description1,
            description2,
        },
        attributes,
        shopID
    })

// const uploadLogo = (files, shopID) => firedb.app('admin').storage()
//     .ref('brandLogo/')
//     .child(shopID).put(files[0])


// const updateShopField = {
//     label: (shopID, labelString, onSuccess) => dispatch => {
//         return firedb.app('admin').firestore().collection('shops').doc(shopID)
//             .update({ label: labelString })
//             .then(() => dispatch(TOASTS.add({ title: labelString + "label's changed", color: 'success' })))
//             .then(onSuccess)
//             .catch(() => dispatch(TOASTS.add({ title: 'Error updating label ', color: 'error' })))
//     },
//     contact: (shopID, dataObject, onSuccess) => dispatch => {
//         return firedb.app('admin').firestore().collection('shops').doc(shopID)
//             .update({ contact: dataObject })
//             .then(() => dispatch(TOASTS.add({ title: "Shop contact informations changed", color: 'success' })))
//             .then(onSuccess)
//             .catch(() => dispatch(TOASTS.add({ title: 'Error updating contact informations', color: 'error' })))
//     },
//     brand: (shopID, dataObject, onSuccess) => dispatch => {
//         return firedb.app('admin').firestore().collection('shops').doc(shopID)
//             .update({ brand: dataObject })
//             .then(() => dispatch(TOASTS.add({ title: "Shop brand changed", color: 'success' })))
//             .then(onSuccess)
//             .catch(() => dispatch(TOASTS.add({ title: 'Error updating brand ', color: 'error' })))
//     },
//     categoryID: (shopID, categoryIDString, onSuccess) => dispatch => {
//         return firedb.app('admin').firestore().collection('shops').doc(shopID)
//             .update({ categoryID: categoryIDString })
//             .then(() => dispatch(TOASTS.add({ title: "Shop category changed", color: 'success' })))
//             .then(onSuccess)
//             .catch(() => dispatch(TOASTS.add({ title: 'Error updating category ', color: 'error' })))
//     },
//     ownersIDS: () => {

//     }
// }



const listen = shopID => (dispatch, getState) => {

    dispatch(PRODUCTS_STORE.loading(true))

    firedb.app('admin').firestore().collection("products")
        .where('shopID', '==', shopID)
        .onSnapshot(snapshot => {
            let products = []

            snapshot.forEach(doc => products.push({
                productID: doc.id,
                ...doc.data(),
            }))
            dispatch(PRODUCTS_STORE.setProducts(products))

            if (!getState().shops.selectedID) {
                dispatch(PRODUCTS_STORE.setSelectedProduct(products[0]?.productID))
            }

            dispatch(SHOPS_STORE.loading(false))

        })
}



const RootWrapper = ({ children }) => {
    const dis = useDispatch()
    const { loading } = useSelector(state => state.products)
    const { logged, uid } = useSelector(state => state.auth)
    useEffect(() => { dis(listen(uid)) }, [dis, uid])
    if (logged && loading) return <div>Loading Products ...</div>
    return children
}

export const PRODUCTS = {
    RootWrapper,
    listen,
    createOne,
    select,
}