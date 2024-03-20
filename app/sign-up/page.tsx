'use client'

import { useState } from 'react'
import scripts from '../tools/scripts/scripts'
import { notFound } from 'next/navigation'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export default function Page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [error, setError] = useState<boolean | null>(null)

    const provider = new GoogleAuthProvider()

    const handleSubmit = async () => {
        if (!scripts.validateSignUpFields(name, email, password, password2)) {
            setError(true)
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const uid = userCredential.user.uid
                const email = userCredential.user.email
                const name = userCredential.user.displayName || userCredential.user.email
                const photoURL = userCredential.user.photoURL || ''

                if (!uid || !email || !name) {
                    notFound()
                }

                //? check if user exists in the database and create if not
                const user = await fb.getUser(uid)
                if (!user) {
                    await fb.createUser(uid, email, name, photoURL)
                }

                window.location.href = '/'
            })
            .catch((error) => {
                setError(true)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (userCredential) => {
                const uid = userCredential.user.uid
                const email = userCredential.user.email
                const name = userCredential.user.displayName || userCredential.user.email
                const photoURL = userCredential.user.photoURL || ''

                if (!uid || !email || !name) {
                    notFound()
                }

                //? check if user exists in the database and create if not
                const user = await fb.getUser(uid)
                if (!user) {
                    await fb.createUser(uid, email, name, photoURL)
                }

                window.location.href = '/'
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorCode, errorMessage, email, credential)
            })
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="md:shadow-custom flex w-full flex-col rounded-md p-5 md:w-4/12 md:p-10 2xl:w-3/12">
                <h1 className="text-3xl font-bold">Sign up</h1>

                <div className="flex flex-col gap-5 py-8">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password again"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />

                    <button className="bg-hades_main h-12 rounded-md text-white" onClick={handleSubmit}>
                        Sign up
                    </button>
                    <button
                        onClick={handleGoogleSignIn}
                        className="border-hades_main flex h-12 items-center justify-center gap-2 rounded-md border-2 border-solid"
                    >
                        <img src="/icons/google.svg" className="w-8" />
                        <p>Sign up with Google</p>
                    </button>
                    {error && <p className="text-red">Invalid credentials...</p>}
                </div>

                <br />

                <div className="flex justify-center gap-2">
                    <p>Already have an account?</p>
                    <a className="font-semibold hover:underline" href="/log-in">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    )
}
