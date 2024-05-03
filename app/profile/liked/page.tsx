'use client'
import ContentWrapper from '@/app/components/contentWrapper'
import Footer from '@/app/components/footer/footer'
import Navbar from '@/app/components/navbar/navbar'
import { auth } from '@/app/tools/firebase/main'
import fb from '@/app/tools/firebase/queries'
import { clasterConfig } from '@/claster-confing'
import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
    const [liked, setLiked] = useState<Product[] | null>(null)
    const [hoveredDiv, setHoveredDiv] = useState<number | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const id = user.uid
                const userData = await fb.getUser(id)
                const likedData = await fb.getAllUsersLikedProducts(id)
                if (!userData) {
                    return
                }
                if (!likedData) {
                    return
                }
                setLiked(likedData)
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
                    <div className="flex w-full justify-center border-r-2 border-r-white ">
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
                    <div className="flex w-full justify-center border-r-2">
                        <Link className="flex w-2/5 items-center gap-2 text-lg" href={'/profile/liked'}>
                            <img src="/icons/heart.svg" alt="" />
                            <p>Oblíbené</p>
                        </Link>
                    </div>
                    <div className="flex w-full justify-center border-r-2 border-r-white">
                        <Link className="flex w-2/5 items-center gap-2 text-lg" href={'/profile/cart'}>
                            <img src="/icons/cart.svg" alt="" />
                            <p>Košík</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex w-2/3 items-center  justify-center gap-2">
                {liked?.map((product, index) => {
                    return (
                        <Link
                            key={index}
                            onMouseEnter={() => setHoveredDiv(index)}
                            onMouseLeave={() => setHoveredDiv(null)}
                            className="shadow-xs  mx-0 mt-0 flex min-w-60 flex-col items-center overflow-visible bg-white"
                            href={`/products/${product.id}`}
                        >
                            {/* <div
                                    style={{
                                        boxShadow: hoveredDiv === index ? '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' : '',
                                    }}
                                    className="bg-primary-hades-light m-0 min-h-80 min-w-80 rounded-lg"
                                ></div> */}
                            <img
                                style={{
                                    boxShadow: hoveredDiv === index ? '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' : '',
                                }}
                                className="bg-primary-hades-light m-0 h-[22rem] w-[22rem] rounded-lg"
                                src={product.images[0].url}
                                alt="alt"
                            />
                            <h3 className="text-md mx-0 py-2 font-bold uppercase">{product.name}</h3>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
