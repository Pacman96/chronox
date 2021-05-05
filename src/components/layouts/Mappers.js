import { useSelector } from "react-redux"
import {
    EuiSwitch, EuiEmptyPrompt, EuiBasicTable, EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiTitle, EuiButton
} from "@elastic/eui"
import { useState } from "react"
import Items from "../items"
import { useHistory } from "react-router"





export const AssetMappers = ({
    asset = 'attribute'
}) => {
    const his = useHistory()
    const { data: shops } = useSelector(state => state.shops)
    const { collections, attributes } = useSelector(state => state.auth)


    const [action, setAction] = useState('view')
    const [loading, setLoading] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [item, setItem] = useState({})





    const dataSpots = {
        attribute: attributes,
        collection: collections,
        shop: shops
    }
    const idName = {
        attribute: 'attributeID',
        collection: 'collectionID',
        shop: 'shopID'
    }

    const labelName = {
        attribute: 'Attribute',
        collection: 'Collection',
        shop: 'Shop'
    }


    const data = dataSpots[asset] || []
    const isEmpty = data && data.length < 1


    const columnsData = {
        attribute: [
            { name: 'Variations', field: 'variations', render: (variations) => variations.map(i => i.label).join(', ') },
        ],
        collection: [
            { name: 'Sub-Collections', field: 'variations', render: (variations) => variations.map(i => i.label).join(', ') },
        ],
        shop: [
        ],
    }



    const onClick = {
        attribute: () => his.push('/assets/attributes/add'),
        collection: () => his.push('/assets/collections/add'),
        shop: () => his.push('/assets/shops/add'),
    }

    const close = () => setDrawer(false)

    const open = async (id) => {
        setLoading(true)
        const match = await data.filter(i => i[idName[asset]] === id)[0]
        setItem(match)
        setLoading(false)
        setDrawer(true)
    }

    const itemRender = {
        attribute: <Items.Attribute
            nitial={item}
            action={action}
            afterDelete={close}
        />,
        collection: <Items.Collection initial={item} action={action} afterDelete={close} />,
        shop: <Items.ShopBasic initial={item} action={action} afterDelete={close} />,
    }




    if (isEmpty) return <EuiEmptyPrompt
        title={<h2>You have no {labelName[asset] + 's'}</h2>}
        actions={[
            <EuiButton color="primary" fill onClick={onClick[asset]}>
                Create {labelName[asset]} now
            </EuiButton>
        ]}
    />



    return <>
        <EuiBasicTable
            items={data}
            columns={[
                { name: 'ID', field: idName[asset], width: 200 },
                { name: labelName[asset], field: 'label' },
                ...columnsData[asset],
                {
                    name: '',
                    field: '',
                    actions: [
                        {
                            name: 'crog',
                            description: '',
                            type: 'icon',
                            icon: 'expand',
                            color: 'success',
                            onClick: (i) => open(i[idName[asset]])
                        }
                    ]
                }
            ]}

        />
        {drawer && <EuiFlyout ownFocus onClose={close} >
            <EuiFlyoutHeader hasBorder >
                <EuiTitle >
                    <h2 >
                        {labelName[asset]}
                        <EuiSwitch
                            label='Edit mode'
                            value={action}
                            checked={action === 'edit'}
                            onChange={() => action === 'edit' ? setAction("view") : setAction("edit")}
                        />
                    </h2>
                </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
                {itemRender[asset]}
            </EuiFlyoutBody>
        </EuiFlyout>}

        {/*  */}


    </>
}
