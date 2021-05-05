import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firedb from '../services/firedb'
import { AUTH_STORE } from '../store/AUTH_STORE'

const createUser = (email, password, username) => firedb.app('admin').auth().createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
        if (username) { user.updateProfile({ displayName: username }) }
        // // prepare user assets
        // firedb.app('admin').firestore().collection('membres').doc(user.uid).set({ roles: [] })
    })
const loginUser = (email, password) => firedb.app('admin').auth().signInWithEmailAndPassword(email, password)
const logutUser = () => firedb.app('admin').auth().signOut()


const createAttribute = (uid, label, type, variations) => firedb.app('admin').firestore().collection("attributes").doc()
    .set({ label, type, variations, ownerID: uid })

const removeAttributeVariation = (attributeID, variation) => firedb.app('admin').firestore().collection("attributes").doc(attributeID)
    .update({ variations: firedb.firestore.FieldValue.arrayRemove(variation) })
const createAttributeVariation = (attributeID, variation) => firedb.app('admin').firestore().collection("attributes").doc(attributeID)
    .update({ variations: firedb.firestore.FieldValue.arrayUnion(variation) })


const listen = () => dispatch => {
    dispatch(AUTH_STORE.loading(true))
    firedb.app('admin').auth().onAuthStateChanged(user => {
        if (!user) return dispatch(AUTH_STORE.setUserUnlogged())
        const { uid, displayName, photoURL, email, emailVerified, phoneNumber } = user

        Promise.all([
            firedb.app('admin').firestore().collection("attributes").where('ownerID', '==', uid),
            firedb.app('admin').firestore().collection("collections").where('ownerID', '==', uid),
        ]).then(snapshot => {

            snapshot[0].onSnapshot(data => {
                let attributes = []
                data.forEach(item => attributes.push({ attributeID: item.id, ...item.data() }))
                dispatch(AUTH_STORE.setAttributes(attributes))
            })

            snapshot[1].onSnapshot(data => {
                let collections = []
                data.forEach(item => collections.push({ collectionID: item.id, ...item.data() }))
                dispatch(AUTH_STORE.setCollections(collections))
            })

            dispatch(AUTH_STORE.setUserUID(uid))
            dispatch(AUTH_STORE.setUserUsername(displayName))
            dispatch(AUTH_STORE.setUserAvatar(photoURL))
            dispatch(AUTH_STORE.setUserEmail(email))
            dispatch(AUTH_STORE.setUserEmailVerification(emailVerified))
            dispatch(AUTH_STORE.setUserPhone(phoneNumber))

            dispatch(AUTH_STORE.setUserLogged())
            dispatch(AUTH_STORE.loading(false))

        })

    })

}


const RootWrapper = ({ children }) => {
    const dis = useDispatch()
    const { loading } = useSelector(state => state.auth)
    useEffect(() => { dis(AUTH.listen()) }, [dis])
    if (loading) return <div>Loading Authentication/user ...</div>
    return children
}

export const AUTH = {
    RootWrapper,
    listen,
    createUser,
    loginUser,
    logutUser,
    createAttribute,
    removeAttributeVariation,
    createAttributeVariation
}