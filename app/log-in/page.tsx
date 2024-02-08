'use client'
import { auth } from '@/firebase/main'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<boolean | null>(null)

    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        setAuthenticated(sessionStorage.getItem('authenticated') === 'true')
    }, [])

    const validateFields = () => {
        if (email === '' || password === '') {
            setError(true)
            return false
        }
        return true
    }

    const handleSunmit = async () => {
        if (!validateFields()) {
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sessionStorage.setItem('authenticated', 'true')
                setAuthenticated(true)
            })
            .catch((error) => {
                setError(true)
            })

        
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col bg-gray p-3">
                {
                    authenticated && <p className="text-green-500">You are authenticated</p>
                }

                <h1 className="text-3xl font-bold">Here you can log-in</h1>
                <input
                    type="text"
                    placeholder="email"
                    className="bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">Invalid credentials</p>}
                <button onClick={handleSunmit}>Submit</button>
            </div>
        </div>
    )
}
