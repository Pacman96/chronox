import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SHOPS } from '../api/SHOPS'
import Form from '../_powerful/src/Form'

export const CreateShopPage = () => {
    const dis = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [label, setLabel] = useState('')
    const [categoryID, setCategoryID] = useState(null)


    const canReset = label && categoryID

    const payload = {
        label,
        categoryID
    }

    const onReset = () => {
        setLabel('')
        setCategoryID('')
    }
    const beforeStart = () => setIsLoading(true)
    const onSuccess = () => null
    const onFail = () => null

    return <Form.Root onLoading={() => setIsLoading(true)}>
        <Form.Toolbar
            size='s'
            action='create'
            canCreate={canReset}
            onCreate={() => dis(SHOPS.create.basic(
                payload,
                beforeStart,
                onSuccess,
                onFail,

            ))}
            onReset={onReset}
        />
        <Form.Row

            label='Shop Name'
            fields={[
                <Form.Field
                    type='text'
                    value={label}
                    onChange={payload => setLabel(payload)}
                    isLoading={isLoading}
                />,

            ]}
        />
        <Form.Row
            label='Shop category'
            fields={[
                <Form.Field
                    type='shopCategory'
                    value={categoryID}
                    onChange={payload => setCategoryID(payload)}
                    isLoading={isLoading}
                />

            ]}
        />

    </Form.Root>
}



