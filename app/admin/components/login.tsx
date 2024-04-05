'use client'

import ClasterInput from '@/app/components/claster/clasterInput'
import ClasterLoadingScreen from '@/app/components/claster/clasterLoadingScreen'
import ClasterWideBtn from '@/app/components/claster/clasterWideBtn'
import { auth } from '@/app/tools/firebase/main'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
    children: ReactNode
}

export default function Login(p: Props) {
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

    if (authenticated === null) {
        return <ClasterLoadingScreen />
    } else if (authenticated) {
        return <>{p.children}</>
    } else {
        return (
            <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center text-center">
                <div className="flex w-min flex-col items-center justify-center">
                    <img src="https://claster.cz/brand/logo300x400.png" alt="Claster logo" className="w-6/12" />
                    <h1 className="f3 w-full whitespace-nowrap text-center font-semibold">Nástroj pro správce</h1>
                    <ClasterInput
                        id="email"
                        title="Email"
                        value={email}
                        onChange={(value) => setEmail(value)}
                        error={error}
                    />
                    <ClasterInput
                        id="password"
                        title="Password"
                        password={true}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        error={error}
                    />
                    <div className="sup mt-5" />
                    <ClasterWideBtn title="Submit" handler={handleSunmit} />

                    <div className="mt-20 text-center">
                        <a href="https://claster.cz" className="underline">
                            claster.cz
                        </a>
                        <p>contact@claster.cz</p>
                        <p>+420 734 701 234</p>
                    </div>
                </div>
            </div>
        )
    }
}
