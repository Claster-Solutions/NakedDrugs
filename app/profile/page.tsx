'use client'
import { useEffect, useState } from 'react'
import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import User from './components/user'
import OrderState from './components/oderState'
import Liked from './components/liked'
import Cart from './components/cart'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'

const Page = () => (
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

    const handleCopyReferalLink = () => {
        navigator.clipboard.writeText(`${clasterConfig.websiteRootUrl}/invite?user=${user?.id}`)
    }

    const handleLogOut = () => {
        auth.signOut()
    }

    // if (authenticated === null) {
    //     return <p>Loading...</p>
    // }

    if (authenticated === false) {
        return <p>Not authenticated</p>
    }
    return (
        <div className="flex h-[70vh]">
            <div className="flex w-1/3  flex-col items-center justify-center gap-4">
                <h1 className=" text-3xl font-semibold">User Profile</h1>
                <div className="flex w-full flex-col items-center justify-end gap-4">
                    <div className="flex w-full justify-center border-r-2 ">
                        <Link className=" flex w-2/5  gap-2 text-lg" href={'/profile'}>
                            <img src="/icons/user.svg" alt="" />
                            <p>Profil</p>
                        </Link>
                    </div>
                    <div className="flex w-full justify-center border-r-2 border-r-white">
                        <Link className="flex w-2/5 items-center  gap-2 text-lg" href={'/profile/orderState'}>
                            <img src="/icons/orders.svg" alt="" />
                            <p>Stav Objednávky</p>
                        </Link>
                    </div>
                    <div className="flex w-full justify-center border-r-2  border-r-white">
                        <Link className="flex w-2/5 items-center gap-2 text-lg" href={'/profile/liked'}>
                            <img src="/icons/heart.svg" alt="" />
                            <p>Oblíbené</p>
                        </Link>
                    </div>
                    <div className="flex w-full justify-center border-r-2 border-r-white ">
                        <Link className="flex w-2/5 items-center gap-2 text-lg" href={'/profile/cart'}>
                            <img src="/icons/cart.svg" alt="" />
                            <p>Košík</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex w-2/3 flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center gap-4 ">
                    <div className="flex flex-row items-center justify-center gap-4">
                        <div className="flex flex-col items-center p-4">
                            <p className=" text-lg font-medium">{user?.name}</p>
                            <div className="flex items-center gap-2">
                                <img
                                    className="rounded-full"
                                    referrerPolicy="no-referrer"
                                    src={user?.photoURL}
                                    alt="User photo"
                                    width={20}
                                    height={20}
                                    onError={(e: any) => (e.target.src = '/icons/user.png')}
                                />
                                <p>{user?.email}</p>
                            </div>
                            <p>{user?.invoiceData?.phone}</p>

                            <p>{user?.invoiceData?.company?.companyName}</p>
                            <p>{user?.invoiceData?.company?.IC}</p>
                            <p>{user?.invoiceData?.company?.DIC}</p>
                            <p>{user?.invoiceData?.city}</p>
                            <p>{user?.invoiceData?.street}</p>
                            <p>{user?.invoiceData?.zip}</p>
                            <p>{user?.invoiceData?.country}</p>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                            {/* <div className="over h-32 min-w-32 flex-nowrap overflow-scroll rounded-xl border-2 p-6 pl-2 pt-2">
                    <p>Liked: </p>
                    <div className="flex flex-col">
                        {user?.liked.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p>{item}</p>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
                            {/* <div className="over h-32 min-w-32 flex-nowrap overflow-scroll rounded-xl border-2 p-6 pl-2 pt-2"> */}
                            <div>
                                <strong>Referals: </strong>
                                <div className="flex flex-col">
                                    {user?.referals.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{item}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <p>Referal link: {`${clasterConfig.websiteRootUrl}/invite?user...`}</p>
                                <button onClick={handleCopyReferalLink}>
                                    <img className=" aspect-square w-5" src="/icons/copy-icon.png" alt="copy" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className=" h-8 w-28 rounded-lg bg-hades-main text-white" onClick={handleLogOut}>
                        <p>Odhlásit se</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
// return (
//     <div className="flex h-[70vh]">
//         <div className="flex w-1/3  flex-col items-center justify-center gap-4 border">
//             <h1 className=" text-3xl font-semibold">User Profile</h1>
//             <div className="flex flex-col gap-4">
//                 <button className="flex gap-2 text-lg" onClick={() => handleElementChange('user')}>
//                     <img src="/icons/user.svg" alt="" />
//                     <p>Profil</p>
//                 </button>
//                 <button className="flex items-center gap-2 text-lg" onClick={() => handleElementChange('orderState')}>
//                     <img src="/icons/orders.svg" alt="" />
//                     <p>Stav Objednávky</p>
//                 </button>
//                 <button className="flex items-center gap-2 text-lg" onClick={() => handleElementChange('liked')}>
//                     <img src="/icons/heart.svg" alt="" />
//                     <p>Oblíbené</p>
//                 </button>
//                 <button className="flex items-center gap-2 text-lg" onClick={() => handleElementChange('cart')}>
//                     <img src="/icons/cart.svg" alt="" />
//                     <p>Košík</p>
//                 </button>
//             </div>
//         </div>
//         <div className="flex w-2/3 flex-col items-center justify-center">
//             {activeElement === 'user' && <User />}
//             {activeElement === 'orderState' && <OrderState />}
//             {activeElement === 'liked' && <Liked />}
//             {activeElement === 'cart' && <Cart />}
//         </div>
//     </div>
// )
