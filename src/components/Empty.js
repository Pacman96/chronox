import { H1 } from 'baseui/typography'
import React from 'react'
import Buttons from './Buttons'
import { CenteredPage } from './Layouts'




export const Empty = ({
    mode = 'shops', type = 'page'
}) => {

    const types = {
        page: CenteredPage,
    }
    const modes = {
        shops: {
            head: 'You have no shops yet',
            cta: <Buttons.GoToCreateShop size='large' />
        }
    }
    const Type = types[type]

    return (<Type centered>
        <H1>{modes[mode].head}</H1>
        <br />
        {modes[mode].cta}
    </Type>
    )
}
