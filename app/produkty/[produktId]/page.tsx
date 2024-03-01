import { notFound } from 'next/navigation'
import ContentWrapper from '../../components/contentWrapper'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import { Products } from '../data'
import Kratom from '@/public/images/placeholder.png'
import fb from '@/app/tools/firebase/queries'
import Link from 'next/link'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import { Karantina } from 'next/font/google'
import Amount from './amount'
import Dropdown from './volumeDropdownn'

export async function generateStaticParams() {
  const products = await fb.getAllProducts()
  const produkty = products.map((produkt) => {
    return {
      produktId: produkt.id,
    }
  })
  return produkty.flat()
}
//export async function generateStaticParams() {
// const produkty = Products.map((produkt) => {
//    return {
//      produktId: produkt.id,
//    }
//  })
//  return produkty.flat()
//}
// export async function generateMetadata({
//     params,
// }: {
//     params: { produktId: string }
// }): Promise<Metadata> {
//     const produkt = Products.find(
//         (produkt) => produkt.id === params.produktId,
//     )

//     if (!produkt) {
//         return notFound()
//     }

//     return {
//         title: produkt.name,
//         description: produkt.about,
//         openGraph: {
//             type: 'article',
//             url: 'https://hvezdapardubice.web.app/brand/banner.webp',
//             title: produkt.name,
//             description: produkt.about,
//             images: [
//                 {
//                     url: produkt.foto,
//                     alt: `Title image`,
//                 },
//             ],
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: produkt.name,
//             description: produkt.about,
//             images: [produkt.foto],
//         },
//     }
// }

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
  // const produkt = Products.map((produkt) => {
  //  if (produkt.id === p.produktId) {
  //  return produkt
  /// }
  // })
  //   .flat()
  //    .filter((e) => e !== undefined)[0]

  if (!product) {
    return notFound()
  }
  return (
    <div className="flex  flex-row">
      <div className="">
        {' '}
        <img src={Kratom.src} alt="obrázek produktu - kratom" />
      </div>
      <div className="absolute right-40 flex flex-col justify-center gap-5">
        <h1 className=" text-5xl font-semibold ">{product.name}</h1>

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
