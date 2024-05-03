'use client'
import { signOut, getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '../tools/firebase/main'

export default function Page() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            router.push('/log-in')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <div className="flex w-full flex-col items-center  gap-1">
            <h1>Opravdu se chcete odhlásit?</h1>
            <p className=" text-xs">(pls ne)</p>
            <button className="mt-4 h-8 w-16 rounded-md border bg-hades-main text-white" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}
