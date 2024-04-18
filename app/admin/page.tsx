import clasterConfig from '@/claster-confing'
import ContentWrapper from '../components/contentWrapper'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import Login from './components/login'
import Link from 'next/link'

{
    /* <Login children={children} /> */
}
export default function Page() {
    const options = { timeZone: 'Europe/Prague' }
    const date = new Date().toLocaleString('en-US', options)

    return (
        <div className="flex w-full flex-col">
            {/* <NavPanel /> */}

            <div className="flex flex-col gap-10">
                <h1 className="f3 whitespace-nowrap font-semibold">
                    Nástroj pro správce{' '}
                    <a href="/" className="text-poseidon-main underline">
                        {clasterConfig.websiteRootUrl.replace('https://', '')}
                    </a>
                </h1>

                <div className="flex flex-col gap-2">
                    <p className="f2 font-medium">
                        Naposledy aktualizováno: <span className="pl-3">{date}</span>
                    </p>
                    {/* <RebuildWeb /> */}
                </div>

                {/* <AdminToolsList /> */}
                <Link href="/admin/blog" className=" text-xl underline">
                    Blog
                </Link>
                <Link href="/admin/products" className="text-xl underline">
                    Products
                </Link>

                <div className="flex flex-col">
                    <p className="f2 font-medium">Kontakt</p>
                    <div className="flex flex-col">
                        <a href="https://claster.cz" className="underline">
                            claster.cz
                        </a>
                        <p>contact@claster.cz</p>
                        <p>+420 734 701 234</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
