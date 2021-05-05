import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import { Select } from 'baseui/select'
import { Tag } from 'baseui/tag'
import { db } from '../db'
import {
    EuiButtonEmpty,
    EuiButtonIcon,
    EuiFieldText,
    EuiIcon,
    EuiIconTip,
    EuiPopover,
    EuiSpacer,
    EuiSwitch,
    EuiText,
    EuiToolTip,
    EuiSelect
} from '@elastic/eui';

const radius = '10px'
const spacing = '5px'

export const AttributeLine = ({
    attribute = {
        type: 'text',
        label: '-'
    },
    onChangeLabel,
    onChangeType,
}) => {

    return <EuiFieldText
        placeholder="XS empty button in a popover & tooltip"
        fullWidth
        prepend={<EuiSelect
        style={{width: '150px'}}
            id="selectDocExample"
            options={db.attributeTypes}
            // value={value}
            onChange={(e) => console.log(e)}
            aria-label="Use aria labels when no actual label is in use"
        />
        }
        aria-label="Use aria labels when no actual label is in use"
    />

    // return (
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //         <Select
    //             placeholder=' '
    //             multi={false}
    //             options={db.attributeTypes}
    //             value={attribute.type || { label: 'Pick', id: 'pick' }}
    //             onChange={({ option }) => onChangeType(option)}
    //             overrides={{
    //                 Root: { style: { width: '150px', marginRight: spacing } },
    //                 ControlContainer: { style: { borderRadius: radius, background: formBackground } },
    //                 Dropdown: { style: { borderRadius: radius, marginTop: spacing } },
    //             }}
    //         />
    //         <Input
    //             placeholder='Attribute Label'
    //             value={attribute.label}
    //             onChange={e => onChangeLabel(e.target.value)}
    //             overrides={{
    //                 Root: { style: { marginLeft: spacing, borderRadius: radius, } },
    //                 InputContainer: { style: { background: formBackground } }
    //             }}
    //         />
    //     </div>
    // )
}




export const AttributeVariationLine = ({
    attributType,
    variation = {
        id: 0,
        label: '-',
        value: '-',
    },
    onChangeLabel,
    onChangeValue,
    onRemove,
    onEdit,
    size = 'default',
    formBackground = 'white',
}) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: spacing }}>
            <Tag closeable={false} size='small' variant='solid'>
                {variation.id}
            </Tag>
            <Input
                size={size}
                overrides={{
                    Root: { style: { borderRadius: radius, } },
                    InputContainer: { style: { background: formBackground } }
                }}
                value={variation.label}
                onChange={e => onChangeLabel(e.target.value)}
            />
            {attributType === 'hex' &&
                <Input
                    size={size}
                    overrides={{
                        Root: { style: { marginLeft: spacing, borderRadius: radius, } },
                        InputContainer: { style: { background: formBackground } }
                    }}
                    value={variation.value}
                    onChange={e => onChangeValue(e.target.value)}
                />
            }

            {onRemove && <Button
                size={size}
                overrides={{
                    Root: { style: { marginLeft: spacing, borderRadius: radius, } },
                }}
                onClick={onRemove}
            >
                Remove
            </Button>}

            {onEdit && <Button
                size={size}
                overrides={{
                    Root: { style: { marginLeft: spacing, borderRadius: radius, } },
                }}
                onClick={onEdit}
            >
                Edit
            </Button>}
        </div>
    )
}

