import ObjectGeneral from '@/app/admin/products/control/components/objectGeneral'
import fb from '@/app/tools/firebase/queries'
import { useEffect, useState } from 'react'

const newProducts = (): Product => {
    return {
        id: '',
        name: '',
        prices: [],
        description: '',
        images: [],
        reviews: [],
        categories: [],
    }
}

const getProduct = async (): Promise<Product | null> => {
    const productId = localStorage.getItem('Id')
    if (productId) {
        const product = await fb.getProduct(productId)
        if (!product) {
            localStorage.removeItem('Id')
            return null
        }
        return product
    }
    return null
}

const ObjectRoot = () => {
    const [object, setObject] = useState<Product>(newProducts())
    const [isIdEntered, setIsIdEntered] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const event = await getProduct()
                if (event) {
                    setObject(event)
                    setIsIdEntered(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <ObjectGeneral
                product={object}
                setObject={setObject}
                isIdEntered={isIdEntered}
                setIsIdEntered={setIsIdEntered}
            />
        </div>
    )
}

export default ObjectRoot
