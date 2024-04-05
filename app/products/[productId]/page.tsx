import ContentWrapper from '../../components/contentWrapper'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import fb from '@/app/tools/firebase/queries'
import Product from './components/product'

export async function generateStaticParams() {
    const products = await fb.getAllProducts()
    console.log(products)
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
            <ContentWrapper page type="default">
                <Product product={product} />
            </ContentWrapper>
            <Footer />
        </>
    )
}
export default Page
