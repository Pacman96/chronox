import { EuiButton, EuiButtonIcon } from '@elastic/eui'
import { Button } from 'baseui/button'
import { Plus } from 'baseui/icon'
import { useHistory } from 'react-router'
import { AUTH } from '../api/AUTH'

const radius = '10px'
const spacing = '5px'

const GoToCreateShop = ({ ...rest }) => {
    const his = useHistory()
    return (
        <Button
            onClick={() => his.push('/assets/shops/add')}
            shape='pill'
            children={'Create new shop'}
            {...rest}
        />
    )
}

const Logout = ({ ...rest }) => {
    return (
        <Button
            onClick={() => AUTH.logutUser()}
            shape='pill'
            children={'Logout now '}
            {...rest}
        />
    )
}

const AddLine = ({ ...rest }) => {
    return <Button
        kind='minimal'
        overrides={{
            Root: { style: { marginLeft: spacing, borderRadius: radius, } },
        }}
        startEnhancer={Plus}
        {...rest}
    />
}
const Reset = ({ display = true, ...rest }) => display ? <EuiButtonIcon display="fill" size="s" iconType="editorUndo" color='text'  {...rest} /> : null
const SaveChanges = ({ display = true, ...rest }) => display ? <EuiButton size="s" iconType="save" fill color='secondary' children='Save changes' {...rest} /> : null
const Create = ({ display = true, ...rest }) => display ? <EuiButton size="s" iconType="submit" fill color='secondary' children='Create' {...rest} /> : null
const Remove = ({ display = true, ...rest }) => display ? <EuiButtonIcon display="fill" size="s" iconType="cross" color='text'  {...rest} /> : null
const RemoveText = ({ display = true, ...rest }) => display ? <EuiButton size="s" iconType="" fill color='danger' children='Delete' {...rest} /> : null



const Buttons = {
    GoToCreateShop,
    Create,
    Logout,
    AddLine,
    Reset,
    SaveChanges,
    Remove,
    RemoveText
}




export default Buttons