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

// actions : ['view','edit','create']

const status = {
    unsaved: <EuiHealth color="warning">Unsaved change</EuiHealth>,
    new: <EuiHealth color='secondary'>New item</EuiHealth>,
    removed: <EuiHealth color='danger'>Removed item</EuiHealth>,
    ready: <EuiHealth color='secondary'>Ready</EuiHealth>,
    empty: <EuiHealth color="warning">Please pick a value</EuiHealth>
}


const Variation = ({
    data,
    click = { remove: () => null },
    type,
    readOnly,
}) => {
    const { label, value } = data
    const render = {
        label:
            <EuiFormRow fullWidth helpText={label.isChanged() && status.unsaved}>
                <EuiFieldText fullWidth
                    value={label.value}
                    onChange={e => label.onChange(e.target.value)}
                    readOnly={readOnly}
                    isLoading={label.isLoading}
                    disabled={label.isLoading}
                />
            </EuiFormRow>,
        remove: !readOnly && <EuiFlexItem grow={false}>  <EuiButtonIcon display="fill" color='danger' size="xs" iconType="cross" aria-label="Remove" onClick={click.remove} /> </EuiFlexItem>,
    }
    return (
        <EuiFlexGroup style={{ marginLeft: 40 }}>
            <EuiFlexItem>{render.label}</EuiFlexItem>
            {render.remove}
        </EuiFlexGroup>
    )
}



export const CollectionItem = ({
    initial = {
        collectionID: '',
        label: '',
        variations: []
    },
    action = 'view',
    afterDelete= () => null,
}) => {
    const dis = useDispatch()
    const { uid, collections } = useSelector(state => state.auth)
    const prev = {
        collectionID: initial.collectionID,
        label: initial.label || '',
        variations: initial.variations || []
    }
    const [loading, setLoading] = useState(false)

    const [label, setLabel] = useState(prev.label)
    const [variations, setVariations] = useState(prev.variations)

    const next = {
        label,
        variations,
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
        variations: {
            id: 'variations',
            name: 'Sub-collections',
            onChange: (payload, variationIndex) => {
                let vars = [...variations]
                vars[variationIndex].label = payload
                setVariations(vars)
            },
            // TODO : check every child
            isValid: next.variations.length > 0,
            isChanged: !utils.isEqual(prev.variations, next.variations),
        }
    }
    const ids = variations.map(({ id }) => id)
    const anyChanged = data.variations.isChanged || data.label.isChanged
    const allValid = data.label.isValid && data.variations.isValid

    const reset = () => {
        setLabel(prev.label)
        setVariations(prev.variations)
    }
    const click = {
        addVariation: () => setVariations([...variations, { id: utils.generateID(ids), label: '' }]),
        removeVariation: (index) => setVariations(variations.filter((item, ix) => ix !== index)),
        delete: () => {
            setLoading(true)
            if (collections.length === 1) {
                dis(TOASTS.add({ title: 'Delete failed. Add another collection', color: 'danger' }))
                setLoading(false)
                return
            }
            firedb.app('admin').firestore().collection('collections')
                .doc(prev.collectionID).delete()
                .then(() => dis(TOASTS.add({ title: 'Collection deleted', color: 'success' })))
                .then(afterDelete)
                .then(() => setLoading(false))
                .catch(err => console.log("Error while deleting", err))
        },
        create: () => {
            setLoading(true)
            firedb.app('admin').firestore().collection('collections')
                .doc().set(next)
                .then(() => dis(TOASTS.add({ title: 'Collection created', color: 'success' })))
                .then(() => reset())
                .then(() => setLoading(false))
        }
    }
    const render = {
        label:
            <EuiFlexItem grow={true}>
                <EuiFormRow fullWidth label={action !== 'view' && "Collection label"} helpText={(action === 'edit' && data.label.isChanged) && status.unsaved}>
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
        addVariation: action !== 'view' &&
            <EuiButtonIcon
                display="fill" size="s" iconType="plus"
                onClick={click.addVariation}
            />,
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
                children='Create attribute'
                onClick={click.create}
            />,
        delete: (action === 'edit') &&
            <EuiButton
                size="s" iconType="" fill color='danger'
                children='Delete attribute'
                onClick={click.delete}
            />,

        variations: variations.length > 0 && variations.map((item, index) => <Variation
            key={index}
            readOnly={action === 'view'}
            data={{
                label: {
                    value: item.label,
                    onChange: payload => data.variations.onChange(payload, index),
                    isChanged: () => {
                        if (action !== 'edit') return false
                        if ((Number(index) + 1) > prev.variations.length) return true
                        if (!prev.variations[index]) return true
                        else return prev.variations[index].label !== next.variations[index].label
                    },
                    isValid: next.variations[index].label.length > 0,
                    isLoading: loading
                }
            }}
            click={{
                remove: () => click.removeVariation(index),
            }}
        />
        )
    }

    return (
        <EuiForm >
            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
                <EuiFlexItem grow={false}>
                    <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
                        <EuiFlexItem grow={false}>
                            {render.addVariation}
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
            </EuiFlexGroup>
            <br />
            { render.variations}
        </EuiForm >
    )
}
