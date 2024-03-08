'use client'
import Navbar from '@/app/components/navbar/navbar'
import ContentWrapper from '@/app/components/contentWrapper'
import Footer from '@/app/components/footer/footer'
import fb from '@/app/tools/firebase/queries'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/tools/firebase/main'
import EditPageForm from './components/editForm'

const Page = async () => (
    <>
        <Navbar />
        <ContentWrapper type="none">
            <Component />
        </ContentWrapper>
        <Footer />
    </>
)
export default Page

const Component = () => {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const id = user.uid
                const userData = await fb.getUser(id)
                if (!userData) {
                    return
                }
                setUser(userData)
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        })
    }, [])

    if (user === null) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <EditPageForm user={user} />
            <div>a</div>
        </div>
    )
}
