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
        if (!event) {
            localStorage.removeItem('eventId')
            return null
        }
        return product
    }
    return null
}

const objectRoot = () => {
    const [object, setObject] = useState<Product>(newProducts())
    const [isIdEntered, setIsIdEntered] = useState<boolean>(false)

    const handleObjectChange = (e: any, field: string, index?: number) => {
        let newObject: Product = { ...p.product }
        switch (field) {
            case 'name':
                newObject = { ...newObject, id: e.target.value }
                newObject = { ...newObject, name: e.target.value }
                break
            case 'price20':
                newObject = {
                    ...newObject,
                    prices: [{ price: e.target.value, volume: '20g' }, ...newObject.prices.slice(0)],
                }
                break
            case 'price100':
                newObject = {
                    ...newObject,
                    prices: [{ price: e.target.value, volume: '100g' }, ...newObject.prices.slice(1)],
                }
                break
            case 'price500':
                newObject = {
                    ...newObject,
                    prices: [{ price: e.target.value, volume: '500g' }, ...newObject.prices.slice(2)],
                }
                break
            case 'description':
                newObject = { ...newObject, description: e.target.value }
                break
            case 'categories':
                newObject = { ...newObject, categories: e.target.value }
                break
        }
        p.setObject(newObject)
    }
    const handleSubmition = async () => {
        await fb.setProduct(object)
        alert('Akce byla úspěšně přidána.')
    }

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

export default objectRoot
