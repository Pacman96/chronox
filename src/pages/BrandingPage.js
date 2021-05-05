import { useDispatch, useSelector } from "react-redux"
import { Empty } from "../components/Empty"
import { ShopSelector } from "../components/misc/ShopSelector"
import firedb from '../services/firedb'

import {
    EuiForm,
    EuiTitle,
    EuiFormRow,
    EuiFieldText,
    EuiFilePicker,
    EuiColorPicker,
    EuiFlexGroup,
    EuiFlexItem,
    EuiImage,
    EuiTextArea,
    EuiSelect,
} from '@elastic/eui';

import { useEffect, useState } from "react";
import Status from "../components/Status";
import Buttons from "../components/Buttons";
import { SHOPS } from "../api/SHOPS";
import { db } from "../db";


const LogoSection = ({
    shopID,
    initialBrand = {
        logoLabel: '',
        logoURL: '',
        slogan: '',
        primaryColor: '',
        secondaryColor: ''
    }
}) => {
    const dis = useDispatch()

    const [logoLabel, setLogoLabel] = useState(initialBrand.logoLabel)
    const [logoURL, setLogoURL] = useState(initialBrand.logoURL)
    const [slogan, setSlogan] = useState(initialBrand.slogan)
    const [primaryColor, setPrimaryColor] = useState(initialBrand.primaryColor)
    const [secondaryColor, setSecondaryColor] = useState(initialBrand.secondaryColor)


    const [loading, setLoading] = useState(false)
    const [files, setfiles] = useState([])


    const reset = () => {
        setLogoLabel(initialBrand.logoLabel)
        setLogoURL(initialBrand.logoURL)
        setSlogan(initialBrand.slogan)
        setPrimaryColor(initialBrand.primaryColor)
        setSecondaryColor(initialBrand.secondaryColor)
        setfiles([])
    }

    const isChanged = {
        logoLabel: logoLabel !== initialBrand.logoLabel,
        logoURL: logoURL !== initialBrand.logoURL || files.length > 0,
        slogan: slogan !== initialBrand.slogan,
        primaryColor: primaryColor !== initialBrand.primaryColor,
        secondaryColor: secondaryColor !== initialBrand.secondaryColor,
    }

    const anyChange = isChanged.logoLabel || isChanged.logoURL || isChanged.slogan || isChanged.primaryColor || isChanged.secondaryColor

    useEffect(() => { reset() }, [initialBrand, shopID])


    const update = (dataObject) => dis(SHOPS.updateShopField.brand(shopID, dataObject, () => { setLoading(false) }))
    const upload = (finnaly) => {
        const uploadTask = firedb.app('admin').storage().ref('brandLogo/').child(shopID).put(files[0])
        const onNext = () => { }
        const onError = () => { }
        const onComplete = () => uploadTask.snapshot.ref.getDownloadURL().then(url => finnaly(url))
        uploadTask.on('state_changed', onNext, onError, onComplete)
    }

    const saveChanges = () => {
        setLoading(true)
        if (files.length > 0) return upload(payload => update({ logoLabel, slogan, primaryColor, secondaryColor, logoURL: payload }))
        else return update({ logoLabel, slogan, primaryColor, secondaryColor, logoURL })
    }


    return (
        <EuiForm >

            <br />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <EuiTitle size='m'><b>Logo</b></EuiTitle>
                <div>
                    <Buttons.Reset display={anyChange} onClick={reset} disabled={loading} />
                    <Buttons.SaveChanges display={anyChange} onClick={saveChanges}
                        style={{ marginLeft: 10 }} isLoading={loading} disabled={loading} />
                </div>
            </div>

            <br />

            <EuiFlexGroup>

                {logoURL && <EuiFlexItem>
                    <EuiFormRow fullWidth label='Logo image'>
                        <EuiImage src={logoURL} />
                    </EuiFormRow>
                </EuiFlexItem>}

                <EuiFlexItem>

                    <EuiFormRow fullWidth label='Upload image' helpText={isChanged.logoURL ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFlexGroup>

                            <EuiFlexItem grow={true}>
                                <EuiFilePicker fullWidth display='default' onChange={data => setfiles(data)} isLoading={loading} disabled={loading} />
                            </EuiFlexItem>

                            {logoURL && <EuiFlexItem grow={false}>
                                <Buttons.Remove onClick={() => setLogoURL('')} disabled={loading} size='m' />
                            </EuiFlexItem>}
                            
                        </EuiFlexGroup>
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Logo label' helpText={isChanged.logoLabel ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFieldText fullWidth value={logoLabel} onChange={e => setLogoLabel(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Slogan' helpText={slogan !== initialBrand.slogan ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFieldText fullWidth value={slogan} onChange={e => setSlogan(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Primary color' helpText={primaryColor !== initialBrand.primaryColor ? <Status.UnsavedChange /> : <> </>}>
                        <EuiColorPicker fullWidth color={primaryColor} onChange={color => setPrimaryColor(color)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Secondary color' helpText={secondaryColor !== initialBrand.secondaryColor ? <Status.UnsavedChange /> : <> </>}>
                        <EuiColorPicker fullWidth color={secondaryColor} onChange={color => setSecondaryColor(color)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                </EuiFlexItem>
            </EuiFlexGroup>



        </EuiForm>
    )
}



const ContactSection = ({
    shopID,
    initialContact = {
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        cityID: '',
        countryID: '',
    }
}) => {
    const dis = useDispatch()

    const [phone, setPhone] = useState(initialContact.phone)
    const [whatsapp, setWhatsapp] = useState(initialContact.whatsapp)
    const [email, setEmail] = useState(initialContact.email)
    const [address, setAddress] = useState(initialContact.address)
    const [cityID, setCityID] = useState(initialContact.cityID)
    const [countryID, setCountryID] = useState(initialContact.countryID)

    const [loading, setLoading] = useState(false)


    const reset = () => {
        setPhone(initialContact.phone)
        setWhatsapp(initialContact.whatsapp)
        setEmail(initialContact.email)
        setAddress(initialContact.address)
        setCityID(initialContact.cityID)
        setCountryID(initialContact.countryID)
    }

    const isChanged = {
        phone: phone !== initialContact.phone,
        whatsapp: whatsapp !== initialContact.whatsapp,
        email: email !== initialContact.email,
        address: address !== initialContact.address,
        cityID: cityID !== initialContact.cityID,
        countryID: countryID !== initialContact.countryID,
    }

    const anyChange = isChanged.phone || isChanged.whatsapp || isChanged.email || isChanged.address || isChanged.cityID || isChanged.countryID

    useEffect(() => { reset() }, [initialContact, shopID])

    const saveChanges = () => {
        setLoading(true)

        const dataObject = {
            phone,
            whatsapp,
            email,
            address,
            cityID,
            countryID,
        }
        const next = () => setLoading(false)

        dis(SHOPS.updateShopField.contact(shopID, dataObject, next))
    }

    return (
        <EuiForm >
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <EuiTitle size='m'><b>Contact informations</b></EuiTitle>
                <div>
                    <Buttons.Reset display={anyChange} onClick={reset} disabled={loading} />
                    <Buttons.SaveChanges display={anyChange} onClick={saveChanges}
                        style={{ marginLeft: 10 }} isLoading={loading} disabled={loading} />
                </div>
            </div>
            <br />
            <EuiFlexGroup>

                <EuiFlexItem>

                    <EuiFormRow fullWidth label='Address' helpText={isChanged.address ? <Status.UnsavedChange /> : <> </>}>
                        <EuiTextArea fullWidth value={address} onChange={e => setAddress(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='City' helpText={isChanged.cityID ? <Status.UnsavedChange /> : <> </>}>
                        <EuiSelect hasNoInitialSelection fullWidth options={db.cities} value={cityID} onChange={e => setCityID(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Country' helpText={isChanged.countryID ? <Status.UnsavedChange /> : <> </>}>
                        <EuiSelect hasNoInitialSelection fullWidth options={db.countires} value={countryID} onChange={e => setCountryID(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                </EuiFlexItem>


                <EuiFlexItem>



                    <EuiFormRow fullWidth label='Phone number' helpText={isChanged.phone ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFieldText fullWidth value={phone} onChange={e => setPhone(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Whatsapp' helpText={isChanged.whatsapp ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFieldText fullWidth value={whatsapp} onChange={e => setWhatsapp(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />

                    <EuiFormRow fullWidth label='Email' helpText={isChanged.email ? <Status.UnsavedChange /> : <> </>}>
                        <EuiFieldText fullWidth value={email} onChange={e => setEmail(e.target.value)} isLoading={loading} disabled={loading} />
                    </EuiFormRow>

                    <br />


                </EuiFlexItem>
            </EuiFlexGroup>



        </EuiForm>
    )
}






export const BrandingPage = () => {
    const { data = [], selectedID } = useSelector(state => state.shops)

    const getShop = async id => {
        const match = await data.filter(i => i.shopID === id)
        return ({
            found: match.length > 0,
            brand: match[0]?.brand || {},
            contact: match[0]?.contact || {},
        })
    }


    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(null)
    const [brand, setBrand] = useState({})
    const [contact, setContact] = useState({})


    useEffect(() => {
        setLoading(true)
        getShop(selectedID).then(({ found, brand, contact }) => {
            setFound(found)
            setBrand(brand)
            setContact(contact)
            setLoading(false)
        })
    }, [selectedID, data])

    useEffect(() => { }, [data])

    if (loading) return <> Loading a zrboi</>
    if (data.length < 1) return <Empty mode='shops' type='page' />
    if (found === false) return <> 404 </>

    return (
        <>
            <ShopSelector />
            <LogoSection shopID={selectedID} initialBrand={brand} />
            <ContactSection shopID={selectedID} initialContact={contact} />
        </>
    )
}
