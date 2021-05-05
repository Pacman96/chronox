import {
    EuiForm,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiButtonIcon,
    EuiButton,
    EuiFieldText,
    EuiSelect,
    EuiHealth,
    EuiColorPicker
} from '@elastic/eui';
import { useState } from 'react';
import { db } from '../../db';
import utils from '../../utils';
import firedb from '../../services/firedb';
import { useDispatch, useSelector } from 'react-redux';
import { TOASTS } from '../../api/TOASTS';
import { SHOPS } from '../../api/SHOPS'

// actions : ['view','edit','create']





const DeliveryCompanyItem = ({
    userID,
    initialState = {
        deliveryProviderID: '',
        label: '',
        cityIDs: []
    },
    action = 'view',
    afterDelete = () => null,
}) => {
    const dis = useDispatch()

    const [label, setLabel] = useState(initialState.label)
    const [cityIDs, setCityIDs] = useState(initialState.cityIDs)

    const [loading, setLoading] = useState(false)


    const reset = () => {
        setLabel(initialState.label)
        setCityIDs(initialState.cityIDs)
    }

    const isChanged = {
        label: label !== initialState.label,
        cityIDs: cityIDs !== initialState.cityIDs
    }

    const anyChange = isChanged.label || isChanged.cityIDs

    useEffect(() => { reset() }, [initialState, userID])

    const saveChanges = () => {
        // setLoading(true)

        // const dataObject = {
        //     phone,
        //     whatsapp,
        //     email,
        //     address,
        //     cityID,
        //     countryID,
        // }
        // const next = () => setLoading(false)

        // dis(SHOPS.updateShopField.contact(shopID, dataObject, next))
    }

    return (
        <EuiForm >
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Buttons.Reset display={anyChange} onClick={reset} disabled={loading} />
                </div>
                <div>
                    111
                    <Buttons.SaveChanges display={anyChange} onClick={saveChanges}
                        style={{ marginLeft: 10 }} isLoading={loading} disabled={loading} />
                </div>
            </div>


            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
                        <EuiFlexItem grow={false}>

                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            {render.reset}
                        </EuiFlexItem>
                    </EuiFlexGroup>

                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
                        <EuiFlexItem grow={false}>
                            {render.delete}
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            {render.save || render.create}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup>

            <br />
            <EuiFormRow fullWidth label='Name' helpText={isChanged.label ? <Status.UnsavedChange /> : <> </>}>
                <EuiTextArea fullWidth value={label} onChange={e => setLabel(e.target.value)} isLoading={loading} disabled={loading} />
            </EuiFormRow>

            <br />

            <EuiFormRow fullWidth label='Cities' helpText={isChanged.cityID ? <Status.UnsavedChange /> : <> </>}>
                <EuiSelect hasNoInitialSelection fullWidth multiple options={db.cities} value={cityIDs} onChange={e => setCityIDs(e.target.value)} isLoading={loading} disabled={loading} />
            </EuiFormRow>

            <br />


        </EuiForm>
    )
}


export const DeliveryCompanyItem = ({
    initial = {
        deliveryProviderID: '',
        label: '',
        cityIDs: []
    },
    action = 'view',
    afterDelete = () => null,
}) => {

    const dis = useDispatch()
    const { uid } = useSelector(state => state.auth)
    const { data } = useSelector(state => state.delivery)

    const prev = {
        shopID: initial.deliveryProviderID,
        label: initial.label || '',
        categoryID: initial.categoryID
    }

    const [loading, setLoading] = useState(false)

    const [label, setLabel] = useState(prev.label)
    const [categoryID, setCategoryID] = useState(prev.categoryID)

    const next = {
        label,
        categoryID,
        ownerID: uid
    }

    const data = {
        label: {
            id: 'label',
            name: 'Collection name',
            onChange: e => setLabel(e.target.value),
            isChanged: prev.label !== next.label,
            isValid: next.label.length > 0 && prev.label !== next.label,
        },
        categoryID: {
            id: 'categoryID',
            name: 'Category',
            onChange: e => setCategoryID(e.target.value),
            isChanged: prev.categoryID !== next.categoryID,
            isValid: next.categoryID.length > 0,
        },
    }
    const anyChanged = data.categoryID.isChanged || data.label.isChanged
    const allValid = data.label.isValid && data.categoryID.isValid

    const reset = () => {
        setLabel(prev.label)
        setCategoryID(prev.categoryID)
    }

    const click = {
        delete: () => {
            setLoading(true)
            if (shops.length === 1) {
                dis(TOASTS.add({ title: 'Delete failed. Add another shop', color: 'danger' }))
                setLoading(false)
                return
            }
            firedb.app('admin').firestore().collection('shops')
                .doc(prev.shopID).delete()
                .then(() => dis(TOASTS.add({ title: 'Shop deleted', color: 'success' })))
                .then(afterDelete)
                .catch(err => console.log("Error while deleting", err))
        },
        create: () => {
            setLoading(true)
            SHOPS.createOne(uid, next.label, next.categoryID)
                .then(() => dis(TOASTS.add({ title: 'Shop created', color: 'success' })))
                .then(() => reset())
                .then(() => setLoading(false))
        }
    }
    const render = {
        label:
            <EuiFlexItem grow={true}>
                <EuiFormRow fullWidth label={action !== 'view' && "Shop name"} helpText={(action === 'edit' && data.label.isChanged) && status.unsaved}>
                    <EuiFieldText
                        value={label}
                        fullWidth
                        onChange={data.label.onChange}
                        readOnly={action === 'view'}
                        isLoading={loading}
                        disabled={loading}
                    />
                </EuiFormRow>
            </EuiFlexItem>,
        categoryID:
            <EuiFlexItem grow={false}>
                <EuiFormRow label={action !== 'view' && "Shop category"} helpText={(action === 'edit' && data.categoryID.isChanged) && status.unsaved}>
                    {action === 'view' ?
                        <EuiFieldText
                            fullWidth
                            value={categoryID}
                            readOnly
                        /> :
                        <EuiSelect
                            hasNoInitialSelection
                            fullWidth
                            options={db.shopCategories}
                            onChange={data.categoryID.onChange}
                            value={categoryID}
                            isLoading={loading}
                            disabled={loading} />
                    }
                </EuiFormRow>
            </EuiFlexItem>,
        reset: anyChanged && (action === 'edit' || action === 'create') &&
            <EuiButtonIcon
                display="fill" size="s" iconType="editorUndo" color='text'
                onClick={reset}
            />,
        save: anyChanged && action === 'edit' &&
            <EuiButton
                size="s" iconType="save" fill color='secondary'
                children='Save changes' />,
        create: (anyChanged && allValid && action === 'create') &&
            <EuiButton
                size="s" iconType="" fill color='secondary'
                children='Create shop'
                onClick={click.create}
            />,
        delete: (action === 'edit') &&
            <EuiButton
                size="s" iconType="" fill color='danger'
                children='Delete shop'
                onClick={click.delete}
            />,
    }
    return (
        <EuiForm >
            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
                        <EuiFlexItem grow={false}>

                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            {render.reset}
                        </EuiFlexItem>
                    </EuiFlexGroup>

                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
                        <EuiFlexItem grow={false}>
                            {render.delete}
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            {render.save || render.create}
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFlexGroup>
                {render.label}
                {render.categoryID}
            </EuiFlexGroup>
        </EuiForm >
    )
}
