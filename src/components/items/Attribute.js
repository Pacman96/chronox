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

// TODO :switch type to typeID


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
        value: type === 'hex' && <EuiFlexItem>
            <EuiFormRow helpText={value.isChanged() && status.unsaved}>
                <EuiColorPicker
                    onChange={color => value.onChange(color)}
                    color={value.value}
                    readOnly={readOnly}
                    isLoading={label.isLoading}
                    disabled={label.isLoading}
                />
            </EuiFormRow>
        </EuiFlexItem>,
        remove: !readOnly && <EuiFlexItem grow={false}>  <EuiButtonIcon display="fill" color='danger' size="xs" iconType="cross" aria-label="Remove" onClick={click.remove} /> </EuiFlexItem>,
    }
    return (
        <EuiFlexGroup style={{ marginLeft: 40 }}>
            <EuiFlexItem>{render.label}</EuiFlexItem>
            {render.value}
            {render.remove}
        </EuiFlexGroup>
    )
}

export const AttributeItem = ({
    action = 'view',
    initial = { attributeID: '', label: '', type: 'text', variations: [] }
    , afterDelete = () => null,
}) => {
    const dis = useDispatch()
    const { uid, attributes } = useSelector(state => state.auth)
    const prev = {
        attributeID: initial.attributeID,
        ownerID: initial.ownerID,
        label: initial.label || '',
        type: initial.type || '',
        variations: initial.variations || [],
    }

    const [loading, setLoading] = useState(false)

    const [label, setLabel] = useState(prev.label)
    const [type, setType] = useState(prev.type)
    const [variations, setVariations] = useState(prev.variations)

    const next = {
        ownerID: uid,
        label: label,
        type: type,
        variations: variations.map(variation => ({ id: variation.id, label: variation.label, value: type === 'hex' ? variation.value : '', })) || []
    }
    const data = {
        label: {
            id: 'label',
            name: 'Attribute label',
            onChange: e => setLabel(e.target.value),
            isChanged: prev.label !== next.label,
            isValid: next.label.length > 0 && prev.label !== next.label,

        },
        type: {
            id: 'type',
            name: 'Attribute type',
            onChange: e => setType(e.target.value),
            isChanged: prev.type !== next.type,
            isValid: next.type.length > 0,
        },
        variations: {
            id: 'variations',
            name: 'Attribute variations',
            onChange: (payload, variationIndex, variationField) => {
                let vars = [...variations]
                vars[variationIndex][variationField] = payload
                setVariations(vars)
            },
            // TODO : check every child
            isValid: next.variations.length > 0,
            isChanged: !utils.isEqual(prev.variations, next.variations),
        }
    }

    const ids = variations.map(({ id }) => id)
    const anyChanged = data.variations.isChanged || data.type.isChanged || data.label.isChanged
    const allValid = data.label.isValid && data.type.isValid && data.variations.isValid
    const reset = () => {
        setLabel(prev.label)
        setType(prev.type)
        setVariations(prev.variations)
    }
    const click = {
        addVariation: () => setVariations([...variations, { id: utils.generateID(ids), label: '', value: '' }]),
        removeVariation: (index) => setVariations(variations.filter((item, ix) => ix !== index)),
        delete: () => {
            setLoading(true)
            if (attributes.length === 1) {
                dis(TOASTS.add({ title: 'Delete failed. Add another attribute', color: 'danger' }))
                setLoading(false)
                return
            }
            firedb.app('admin').firestore().collection('attributes')
                .doc(prev.attributeID).delete()
                .then(() => dis(TOASTS.add({ title: 'Attribute deleted', color: 'success' })))
                .then(afterDelete)
                .then(() => setLoading(false))
                .catch(err => console.log("Error while deleting", err))
        },
        create: () => {
            setLoading(true)
            firedb.app('admin').firestore().collection('attributes')
                .doc().set(next)
                .then(() => dis(TOASTS.add({ title: 'Attribute created', color: 'success' })))
                .then(() => reset())
                .then(() => setLoading(false))
        }
    }
    const render = {
        label:
            <EuiFlexItem grow={true}>
                <EuiFormRow fullWidth label={action !== 'view' && "Attribute label"} helpText={(action === 'edit' && data.label.isChanged) && status.unsaved}>
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
        type: action !== 'view' &&
            <EuiFlexItem grow={false}>
                <EuiFormRow label='Type' helpText={(action === 'edit' && data.type.isChanged) && status.unsaved}>
                    {action === 'view' ?
                        <EuiFieldText
                            fullWidth
                            value={type}
                            readOnly
                        /> :
                        <EuiSelect
                            fullWidth
                            options={db.attributeTypes}
                            onChange={data.type.onChange}
                            value={type}
                            isLoading={loading}
                            disabled={loading} />
                    }
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
            key={index} type={type}
            readOnly={action === 'view'}
            data={{
                label: {
                    value: item.label,
                    onChange: payload => data.variations.onChange(payload, index, 'label'),
                    isChanged: () => {
                        if (action !== 'edit') return false
                        if ((Number(index) + 1) > prev.variations.length) return true
                        if (!prev.variations[index]) return true
                        else return prev.variations[index].label !== next.variations[index].label
                    },
                    isValid: next.variations[index].label.length > 0,
                    isLoading: loading
                },
                value: {
                    value: item.value,
                    onChange: payload => data.variations.onChange(payload, index, 'value'),
                    isChanged: () => prev.variations[index]?.value !== next.variations[index].value,
                    isValid: next.variations[index].value.length > 0,
                    isLoading: loading
                },
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
                {render.type}
            </EuiFlexGroup>
            <br />
            { render.variations}
        </EuiForm >
    )
}
