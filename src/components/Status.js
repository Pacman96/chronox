import { Button } from 'baseui/button'
import { Plus } from 'baseui/icon'
import { useHistory } from 'react-router'
import { AUTH } from '../api/AUTH'
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

export const UnsavedChange = () =><EuiHealth color="warning">Unsaved change</EuiHealth>


const Status = {
    UnsavedChange,
}




export default Status