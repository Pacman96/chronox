import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import React, { useState } from 'react'
import { AUTH } from '../../api/AUTH'

export const AuthPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState("")

    return (
        <div>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
            <Input value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
            <Input value={username} onChange={e => setUsername(e.target.value)} placeholder='username' />

            <Button onClick={() =>AUTH.createUser(email, password, username)}>
                Create User
            </Button>

            <Button onClick={() => AUTH.loginUser(email, password, username)}>
                Login User
            </Button>

        </div>
    )
}
