import { notFound } from 'next/navigation'
import ContentWrapper from '../../components/contentWrapper'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Karantina } from 'next/font/google'
import Amount from './components/amount'
import Dropdown from './components/dropdownn'
import Like from './components/like'
import Cart from './components/cart'
import Product from './components/product'

export async function generateStaticParams() {
    const products = await fb.getAllProducts()
    const productsMapped = products.map((product) => {
        return {
            productId: product.id,
        }
    })
    return productsMapped.flat()
}

const Page = async ({ params }: { params: { productId: string } }) => {
    const product = await fb.getProduct(params.productId)

    return (
        <>
            <Navbar />
            <ContentWrapper type="default">
                <Product product={product} />
            </ContentWrapper>
            <Footer />
        </>
    )
}
export default Page

const validateOrder = (): boolean => {
    return true
}

const handleSubmit = () => {
    const isValid = validateOrder()

    if (isValid) {
        alert('Objednávka byla úspěšně odeslána')
    } else {
        alert('Objednávka nebyla odeslána')
    }
}
