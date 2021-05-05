import {
    EuiFlexGroup, EuiFlexItem, EuiFormRow,
    EuiForm, EuiFieldText, EuiTextArea, EuiFieldNumber, EuiSelect, EuiSuperSelect,
    EuiButton, EuiButtonIcon,
} from '@elastic/eui'
import { db } from '../../db'


const Field = ({
    type = 'text',
    value = '',
    extraValue,
    onChange,
    isLoading = false,
    ...rest
}) => {

    const props = {
        compressed: false,
        value,
        fullWidth: true,
        isLoading,
        readOnly: isLoading
    }

    const options = {
        countries: db.countires.map(({ text, value }) => ({
            value,
            dropdownDisplay: <div style={{ display: 'flex' }}>
                <div>flag - </div>
                <div style={{ flex: 1 }}> {text}</div>
            </div>
        })),
        cities: db.cities.map(({ text, value }) => ({ value, dropdownDisplay: text })),
        shopCategories: db.shopCategories.map(({ text, value }) => ({ value, dropdownDisplay: text })),
        attributeTypes: db.attributeTypes.map(({ text, value }) => ({ value, dropdownDisplay: text })),
    }

    switch (type) {
        case 'text':
            return <EuiFieldText onChange={e => onChange(e.target.value)} {...props}{...rest} />
        case 'longText':
            return <EuiTextArea onChange={e => onChange(e.target.value)} {...props}{...rest} />
        case 'number':
            return <EuiFieldNumber onChange={e => onChange(e.target.value)} {...props}{...rest} />
        case 'percent':
            return <EuiFieldNumber onChange={e => onChange(e.target.value)} append='%' {...props}{...rest} />
        case 'price':
            return <EuiFieldNumber onChange={e => onChange(e.target.value)} append='Currency' {...props}{...rest} />
        case 'country':
            return <EuiSuperSelect onChange={value => onChange(value)} options={options.countries} hasNoInitialSelection {...props}{...rest} />
        case 'city':
            return <EuiSuperSelect onChange={value => onChange(value)} options={options.cities} hasNoInitialSelection {...props}{...rest} />
        case 'shopCategory':
            return <EuiSelect onChange={e => onChange(e.target.value)} options={db.shopCategories} hasNoInitialSelection {...props}{...rest} />
        case 'attributeType':
            return <EuiSuperSelect onChange={value => onChange(value)} options={options.attributeTypes} hasNoInitialSelection {...props}{...rest} />
        case 'facebook':
            return <EuiFieldText onChange={value => onChange(value)} prepend='#3b5998' {...props}{...rest} />

        default:
            return <div> Error rendering form field</div>
    }
}




const Toolbar = ({
    title,
    size = 's',
    isLoading,
    action = 'edit',
    isChanged,

    onSave,
    onCreate,
    onDelete,
    onReset,

    canCreate = true,
}) => {
    const props = {
        size: size,
        isLoading: isLoading,
        disbled: isLoading,
        disabled: action === 'create' && !canCreate
    }

    const buttons = {
        save: action === 'edit' && isChanged ? <EuiButton iconType="save" fill color='secondary' children='Save changes' {...props} onClick={onSave} type="submit" /> : <></>,
        create: action === 'create' ? <EuiButton iconType="plus" fill color='secondary' children='Create' {...props} onClick={onCreate} type="submit" /> : <></>,
        delete: action === 'view' ? <EuiButton iconType="trash" fill color='danger' children='Delete' {...props} onClick={onDelete} /> : <></>,
        reset: action !== 'view' && isChanged ? <EuiButtonIcon display="fill" iconType="editorUndo" color='text' {...props} onClick={onReset} type="reset" /> : <></>,
    }


    const left = <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
        <EuiFlexItem grow={false}>{buttons.reset}</EuiFlexItem>
        <EuiFlexItem grow={false}></EuiFlexItem>
    </EuiFlexGroup>

    const right = <EuiFlexGroup alignItems='center' justifyContent='flexEnd' gutterSize='s'>
        <EuiFlexItem grow={false}>{buttons.delete}</EuiFlexItem>
        <EuiFlexItem grow={false}>{buttons.save}{buttons.create}</EuiFlexItem>
    </EuiFlexGroup>


    return (
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween' style={{ marginBottom: 15 }}>
            <EuiFlexItem grow={false}>{left}</EuiFlexItem>
            <EuiFlexItem grow={false}>{right}</EuiFlexItem>
        </EuiFlexGroup>
    )
}

const Row = ({
    children,
    fields = [],
    isChanged,
    label,
    grow = true,
    ...rest
}) => {

    const props = {
        fullWidth: true,
    }

    if (fields.length > 1) {
        return <EuiFormRow label={label} {...props}{...rest}>
            <EuiFlexGroup>
                {fields.map((field, id) => <EuiFlexItem grow={grow} key={id}>{field}</EuiFlexItem>)}
            </EuiFlexGroup>
        </EuiFormRow>
    }

    return <EuiFormRow {...props}{...rest}>{children || fields[0]}</EuiFormRow>

}

const Root = ({ children, onLoading }) => {
    return <EuiForm onSubmit={(e) => {
        e.preventDefault()
        onLoading()
    }
    }>{children}</EuiForm>
}


const Form = {
    Root,
    Row,
    Field,
    Toolbar
}


export default Form