
import { EuiRadioGroup, EuiCheckboxGroup } from "@elastic/eui"
import { useState } from "react"
import Form from "../../_powerful/src/Form"

export const DashboardPage = () => {

    const [action, setAction] = useState('view')
    const [isLoading, setIsLoading] = useState(false)

    const [text, setText] = useState("i'm  a simple text")
    const [longText, setLongText] = useState('orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt')
    const [number, setNumber] = useState(1)
    const [percent, setPercent] = useState(10)
    const [price, setPrice] = useState(199)



    return <Form.Root>
        <EuiRadioGroup
            horizontal
            options={[
                { id: 'view', label: 'View Mode' },
                { id: 'edit', label: 'Editing Mode' },
                { id: 'create', label: 'Creation mode' }
            ]}
            idSelected={action}
            onChange={id => setAction(id)}
        />

        <br />
        <br />

        <Form.Toolbar
            action={action}
            isChanged={true}
            isLoading={isLoading}

        />

        <Form.Row
            label='Text'
            fields={[
                <Form.Field
                    type='text'
                    value={text}
                    onChange={payload => setText(payload)}
                    isLoading={isLoading}
                />,
                <Form.Field
                    type='longText'
                    value={longText}
                    onChange={payload => setLongText(payload)}
                    isLoading={isLoading}
                />
            ]}
        />
        <Form.Row
            label='Numerique'
            fields={[
                <Form.Field
                    type='number'
                    value={number}
                    onChange={payload => setNumber(payload)}
                    isLoading={isLoading}
                />,
                <Form.Field
                    type='percent'
                    value={percent}
                    onChange={payload => setPercent(payload)}
                    isLoading={isLoading}
                    step={10}
                />,
                <Form.Field
                    type='price'
                    value={price}
                    onChange={payload => setPrice(payload)}
                    isLoading={isLoading}
                />,
            ]}
        />
        <Form.Row
            label='Selections'
            fields={[
                <Form.Field
                    type='country'
                    value={number}
                    onChange={payload => setNumber(payload)}
                    isLoading={isLoading}
                />,
                <Form.Field
                    type='city'
                    value={percent}
                    onChange={payload => setPercent(payload)}
                    isLoading={isLoading}
                />,
                <Form.Field
                    type='shopCategory'
                    value={price}
                    onChange={payload => setPrice(payload)}
                    isLoading={isLoading}
                />,
                <Form.Field
                    type='attributeType'
                    value={price}
                    onChange={payload => setPrice(payload)}
                    isLoading={isLoading}
                />,
            ]}
        />

    </Form.Root >

}


