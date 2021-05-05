import { useState } from 'react';

import { EuiIcon, EuiSideNav } from '@elastic/eui';
import { useHistory, useLocation } from 'react-router';

export const SiteMainSidebar = ({ }) => {

    const { pathname } = useLocation()
    const his = useHistory()


    const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);

    const toggleOpenOnMobile = () => {
        setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
    };

    const isArray = (arr) => Array.isArray(arr) > 0


    const createItem = (name, path, data = { items: [] }) => {

        const link = isArray(path) ? path[0] : path

        const isSelected = () => isArray(path) ? path.includes(pathname) : pathname === path

        return {
            ...data,
            id: link,
            name,
            isSelected: isSelected(),
            onClick: () => link && his.push(link),

        };
    };


    const sideNav = [
        createItem('Dashboard', '/'),
        createItem('Assets', '/assets', {
            // icon: <EuiIcon type="logoElasticsearch" />,
            items: [
                createItem('Attributes',
                    ['/assets/attributes', '/assets/attributes/add'],
                    {
                        items: [
                            createItem('List', '/assets/attributes'),
                            createItem('Add', '/assets/attributes/add'),
                        ],
                    }),
                createItem('Collections',
                    ['/assets/collections', '/assets/collections/add'],
                    {
                        items: [
                            createItem('List', '/assets/collections'),
                            createItem('Add', '/assets/collections/add'),
                        ]
                    }),
            ],
        }),
        createItem(
            'Shops',
            ['/shops/list', '/shops/add', '/shops/branding'],
            {
                items: [
                    createItem('List', '/shops/list'),
                    createItem('Add', '/shops/add'),
                    createItem('Branding', '/shops/branding'),
                ]
            }),
        createItem(
            'Delivery',
            ['/delivery/list', '/delivery/add'],
            {
                items: [
                    createItem('Providers', '/delivery/list'),
                    createItem('Add', '/delivery/add'),
                ]
            }),
        createItem('Products', '/products'),
        createItem('Orders', '/orders'),
    ];

    return (
        <EuiSideNav
            aria-label="Complex example"
            mobileTitle="Navigate within $APP_NAME"
            toggleOpenOnMobile={toggleOpenOnMobile}

            isOpenOnMobile={isSideNavOpenOnMobile}
            items={sideNav}
            style={{ minWidth: 245, padding: 20 }}
        />
    )
}
