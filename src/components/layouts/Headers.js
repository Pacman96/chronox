import { EuiHeader, EuiHeaderLogo } from "@elastic/eui"

export const MainHeader = () => {
    const sections = [
        {
            items: [<EuiHeaderLogo>Chronos</EuiHeaderLogo>],
            borders: 'right',
        },
    ];

    const sections2 = [
        {
            items: [<EuiHeaderLogo>Chronos</EuiHeaderLogo>],
            borders: 'right',
        },
    ];


    return <>
     <EuiHeader position='fixed' sections={sections} theme='dark' />
     {/* <EuiHeader position='static'  /> */}

     </>


}

export const PageHeader = () => {
    return (
        <div>
            
        </div>
    )
}
