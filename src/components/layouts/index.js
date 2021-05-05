import { MainHeader } from "./Headers"
import {
    EuiPage,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageSideBar,
    EuiPageBody,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,

} from '@elastic/eui';

export const SiteMainLayout = ({
    title,
    children,
    pageSidebar,
}) => {
    return (
        <>
            <MainHeader />
            <EuiPage paddingSize="none" style={{ minHeight: 'calc(100vh - 49px)' }}>
                {pageSidebar && <EuiPageSideBar

                >{pageSidebar}</EuiPageSideBar>}
                <EuiPageBody panelled={true} restrictWidth={[false, false]} paddingSize='l'>

                    <EuiPageHeader alignItems="center">
                        <EuiPageHeaderSection>
                            <EuiTitle size='l'>
                                <b>{title}</b>
                            </EuiTitle>
                        </EuiPageHeaderSection>
                    </EuiPageHeader>

                    <EuiPageContent

                        hasBorder={false}
                        hasShadow={false}
                        paddingSize='s'
                        grow={true}
                    >
                        <EuiPageContentBody>
                            {

                                children}

                        </EuiPageContentBody>
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        </>
    )
}
