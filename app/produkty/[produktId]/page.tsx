import { notFound } from 'next/navigation'
import ContentWrapper from '../../components/contentWrapper'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Karantina } from 'next/font/google'
import Amount from './components/amount'
import Dropdown from './components/volumeDropdownn'
import Like from './components/like'
import Cart from './components/cart'

export async function generateStaticParams() {
    const products = await fb.getAllProducts()
    const produkty = products.map((produkt) => {
        return {
            produktId: produkt.id,
        }
    })
    return produkty.flat()
}

const Page = async ({ params }: { params: { produktId: string } }) => (
    <>
        <Navbar />
        <ContentWrapper type="default">
            <Component produktId={params.produktId} />
        </ContentWrapper>
        <Footer />
    </>
)
export default Page

const validateOrder = (): boolean => {
    if (true) {
        return true
    }
}

const handleSubmit = () => {
    const isValid = validateOrder()

    if (isValid) {
        alert('Objednávka byla úspěšně odeslána')
    } else {
        alert('Objednávka nebyla odeslána')
    }
}

interface Props {
    produktId: string
}

const Component = async (p: Props) => {
    const product = await fb.getProduct(p.produktId)

    if (!product) return notFound()

    return (
        <div className="flex flex-row">
            <div className="">
                {' '}
                <img src={product.images[0].url} alt={product.images[0].alt} />
            </div>
            <div className="absolute right-40 flex flex-col justify-center gap-5">
                <h1 className=" text-5xl font-semibold ">{product.name}</h1>
                <Like productId={p.produktId} />
                <Cart productId={p.produktId} />
                <Dropdown price={product.price} />
                <p className=" text-sm font-light">{product.description} </p>

                <div className="flex flex-row">
                    <Amount />

                    {/* <button onClick={handleSubmit}>submit</button> */}
                </div>
            </div>
        </div>
    )
}
