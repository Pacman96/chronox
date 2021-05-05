import { EuiAvatar, EuiButtonIcon } from '@elastic/eui'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { SHOPS } from '../../api/SHOPS'

const emptyImage = ''

export const ShopSelector = () => {
    const his = useHistory()
    const dis = useDispatch()
    const { data, selectedID } = useSelector(state => state.shops)


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                {data.map(({ shopID, label, brand }) => {
                    const isSelected = shopID === selectedID
                    return <EuiAvatar
                        key={shopID}
                        size="m"
                        name={brand.logoLabel || label}
                        color={isSelected > 0.5 ? '#25282f' : '#ffffff'}
                        imageUrl={brand.logoURL}
                        style={{ marginRight: 5, cursor: 'pointer' }}
                        type="space"
                        onClick={() => dis(SHOPS.select(shopID))}
                    />
                })}
            </div>
            <div>
                <EuiButtonIcon
                    iconType='plus'
                    size="s"
                    style={{ marginLeft: 5 }}
                    display='empty'
                    onClick={() => his.push('/assets/shops/add')}
                />
                <EuiButtonIcon
                    iconType='list'
                    size="s"
                    style={{ marginLeft: 5 }}
                    display='empty'
                    onClick={() => his.push('/assets/shops')}
                />
            </div>
        </div>
    )
}
