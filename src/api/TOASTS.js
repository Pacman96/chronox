import { EuiGlobalToastList } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'
import { TOASTS_STORE } from '../store/TOASTS_STORE'

const remove = toast => dispatch => dispatch(TOASTS_STORE.remove(toast))
const add = toast => dispatch => dispatch(TOASTS_STORE.add(toast))

export const Caller = () => {
    const dis = useDispatch()
    const toasts = useSelector(state => state.toasts)
    const dismissToast = (toast) => dis(remove(toast))
    return <EuiGlobalToastList
        toasts={toasts}
        dismissToast={dismissToast}
        toastLifeTimeMs={6000}
    />

}

export const TOASTS = {
    Caller,
    add,
    remove
}