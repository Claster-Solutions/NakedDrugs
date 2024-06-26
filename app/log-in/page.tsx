'use client'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { notFound } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import scripts from '../tools/scripts/scripts'
import fb from '../tools/firebase/queries'
import { auth } from '../tools/firebase/main'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState<boolean | null>(null)

    const provider = new GoogleAuthProvider()

    const handleSubmit = async () => {
        if (!scripts.validateLogInFields(email, password)) {
            setError(true)
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {})
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
            <div className="flex w-full flex-col rounded p-5 md:w-4/12 md:p-10 md:shadow-custom 2xl:w-3/12">
                <h1 className="text-3xl font-bold">Log in</h1>

                <div className="flex flex-col gap-5 py-8">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="bg-hades-main h-10 rounded text-white" onClick={handleSubmit}>
                        Log in
                    </button>
                    <button
                        onClick={handleGoogleSignIn}
                        className="border-hades-main flex h-10 items-center justify-center gap-2 rounded border-2 border-solid"
                    >
                        <img src="/icons/google.svg" className="w-6" />
                        <p>Sign up with Google</p>
                    </button>
                    {error && <p className="text-red">Invalid credentials...</p>}
                </div>

                <br />

                <div className="flex justify-center gap-2">
                    <p>Dont have an account?</p>
                    <a className="font-semibold hover:underline" href="/sign-up">
                        Sing up
                    </a>
                </div>
            </div>
        </div>
    )
}
