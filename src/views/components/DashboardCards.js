import { Card } from 'baseui/card'
import { useSelector } from 'react-redux'
import { ChevronRight, Check, Alert } from 'baseui/icon';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Block } from "baseui/block"
import Buttons from '../../components/Buttons';

// Requirements
/// Profile
/// Assets
/// Shops


export const FirstLine = () => {
    return (
        <Block display='flex' justifyContent='space-between' alignItems='center'>
            <div>
                <Buttons.GoToCreateShop />
            </div>
            <div>
                <Buttons.Logout />
            </div>
        </Block>
    )
}

export const Requirements = ({ requirements, title }) => {
    const count = requirements.length
    const should = count > 0
    const prefix = should ? Alert : Check
    const suffix = () => should ? count + ' elements' : 'Up to date'
    return <>
        <ListItem
            overrides={{
                ArtworkContainer: { style: ({ $theme }) => ({ color: should ? $theme.colors.warning : $theme.colors.positive }) },
                EndEnhancerContainer: { style: { fontSize: 'smaller' } },
                Content: { style: { height: '60px' } },
            }}
            artwork={prefix}
            children={<ListItemLabel children={title} />}
            endEnhancer={suffix}
        />
        {requirements.map(({ msg }) => <ListItem
            overrides={{
                Content: { style: { fontSize: 'smaller', height: '30px' } },
            }}
            sublist
            endEnhancer={() => <ChevronRight />}
            children={msg}
        />)}
    </>
}


export const DashboardRequirementsCard = () => {
    const { errs: authErrs } = useSelector(state => state.auth)
    const { errs: shopsErrs } = useSelector(state => state.shops)
    return (
        <Card title='Requirements' overrides={{
            Root: { style: () => ({ margin: '0px', height: '380px' }) },
            Body: { style: () => ({ padding: '0px', height: '305px', overflowY: 'auto' }) },
        }} >
            <Requirements title={'Profile'} requirements={authErrs.filter(({ code }) => code.includes('empty'))} />
            <Requirements title={'Shops'} requirements={shopsErrs.filter(({ code }) => code.includes('empty'))} />
        </Card>
    )
}


export const DashboardDevloppementCard = () => {
    return (
        <Card title='Devloppement'
            overrides={{
                Root: { style: () => ({ height: '380px' }) }
            }}
        >
            Devloppement graph
        </Card>
    )
}
