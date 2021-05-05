import { useState } from "react";
import { useStyletron } from 'baseui';
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { Navigation } from 'baseui/side-navigation';
import { Cell, Grid } from "baseui/layout-grid";
import { useHistory, useLocation } from "react-router";


import {
    EuiPage,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPageSideBar,
    EuiPageBody,
    EuiHeader,
    EuiHeaderLogo,
    EuiSideNav,
    EuiFocusTrap,
    EuiFlexGroup
} from '@elastic/eui';

const Header = () => {
    const sections = [
        {
            items: [<EuiHeaderLogo>Elastic</EuiHeaderLogo>],
            borders: 'right',
        },
    ];
    return (
        <>
            <EuiHeader position='fixed' sections={sections} />
        </>
    )
}

const SiteSideNavigation = () => {
    const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false);

    const toggleOpenOnMobile = () => {
        setisSideNavOpenOnMobile(!isSideNavOpenOnMobile);
    };

    const sideNav = [
        {
            name: 'Kibana',
            id: 0,
            items: [
                {
                    name: 'Advanced settings',
                    id: 1,
                    onClick: () => { },
                },
                {
                    name: 'Index Patterns (link)',
                    id: 2,
                    href: 'http://www.elastic.co',
                },
                {
                    name: 'Saved Objects',
                    id: 3,
                    onClick: () => { },
                    isSelected: true,
                },
                {
                    name: 'Reporting',
                    id: 4,
                    onClick: () => { },
                },
            ],
        },
    ];
    return <EuiSideNav
        aria-label="Basic example"
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={() => toggleOpenOnMobile()}
        isOpenOnMobile={isSideNavOpenOnMobile}
        style={{ width: 192 }}
        items={sideNav}
    />
}


export const PageWithSider = ({
    children,
    navigationItems = []
}) => {
    const his = useHistory()
    const { pathname } = useLocation()
    return (
        <Grid
            gridColumns={[1, 1, 3]}
            gridGaps={[20, 20, 20]}
            gridMargins={[0, 0, 0]}
        >
            <Cell span={[1, 1, 1]}>
                <Navigation
                    items={navigationItems}
                    activeItemId={pathname}
                    onChange={({ event, item }) => {
                        event.preventDefault();
                        if (item.itemId) {
                            his.push(item.itemId)
                        }
                    }}
                    overrides={{
                        NavItem: {
                            style: ({ $active, $theme }) => {
                                if (!$active) return ({ ':hover': { fontWeight: 500 } })
                                return {
                                    backgroundColor: $theme.colors.backgroundPrimary,
                                    borderLeftColor: $theme.colors.primaryA,
                                    color: $theme.colors.primaryA,
                                    ':hover': { fontWeight: 500 },
                                };
                            },
                        },
                    }}
                />
            </Cell>
            <Cell span={[1, 1, 2]}>
                {children}
            </Cell>
        </Grid>
    )
}


export const SiteLayout = ({
    children,
    navBarProps,
    mainMenuItems,
    userMenuItems,
    button = <>btn</>, sideNav
}) => {
    const his = useHistory()
    const { pathname } = useLocation()

    const [css] = useStyletron();
    const [mainItems, setMainItems] = useState([...mainMenuItems]);


    return <>
            <Header />
            <EuiPage paddingSize="none">
                <EuiPageSideBar sticky>
                    {<SiteSideNavigation />}
                </EuiPageSideBar>
                <EuiPageBody >
                    <EuiPageHeader
                        restrictWidth
                        iconType="logoElastic"
                        pageTitle="Page title"
                        rightSideItems={[button]}
                        tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
                    />
                    <EuiPageContent
                        hasBorder={true}
                        hasShadow={true}
                        paddingSize={'l'}
                        color="transparent"
                        borderRadius="none">
                        <EuiPageContentBody restrictWidth>
                            {children}
                        </EuiPageContentBody>
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>


    </>
    return (
        <>
            <AppNavBar
                {...navBarProps}
                overrides={{ AppName: { style: () => ({ width: "100%" }) } }}
                mainItems={mainItems}
                onMainItemSelect={item => {
                    if (item.path) { his.push(item.path) }
                    setMainItems(prev => setItemActive(prev, item))
                }}
                isMainItemActive={item => item.path === pathname}
                userItems={userMenuItems}
                mapItemToNode={
                    item => (
                        <div
                            // onClick={item.onClick}
                            className={css({ color: item.info && item.info.color })}
                        >
                            { item.label}
                        </div>
                    )
                } />

            <div className='content'>
                {children}
            </div>
            <div>Footer</div>
        </>
    )
}


export const CenteredPage = ({ children, width = '50%', centered }) => {
    return (
        <div style={{ display: 'felx', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
            <div style={{ width, margin: "40px auto", textAlign: centered && 'center' }}>
                {children}

            </div>
        </div>
    )
}
