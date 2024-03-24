import fb from '@/app/tools/firebase/queries'
import { useEffect, useState } from 'react'

interface Props {
    product: Product
    setObject: React.Dispatch<React.SetStateAction<Product>>
    isIdEntered: boolean
    setIsIdEntered: React.Dispatch<React.SetStateAction<boolean>>
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
const objectRoot = (p: Props) => {
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
                    prices: [{ price: e.target.value, volume: '10g' }, ...newObject.prices.slice(0)],
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
                    prices: [{ price: e.target.value, volume: '1000g' }, ...newObject.prices.slice(2)],
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
        await fb.setProduct(p.product)
        alert('Akce byla úspěšně přidána.')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const event = await getProduct()
                if (event) {
                    p.setObject(event)
                    p.setIsIdEntered(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <form action="">
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'name'}
                    type={'text'}
                    value={p.product.name}
                    onChange={(e) => {
                        handleObjectChange(e, 'name')
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 1000g'}
                    type={'text'}
                    value={p.product.prices[0]?.price}
                    onChange={(e) => {
                        handleObjectChange(e, 'price1000')
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 100g'}
                    type={'text'}
                    value={p.product.prices[1]?.price}
                    onChange={(e) => {
                        handleObjectChange(e, 'price100')
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 10g'}
                    type={'text'}
                    value={p.product.prices[2]?.price}
                    onChange={(e) => {
                        handleObjectChange(e, 'price10')
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'description'}
                    type={'text'}
                    value={p.product.description}
                    onChange={(e) => {
                        handleObjectChange(e, 'description')
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'categories - all'}
                    type={'text'}
                    value={p.product.categories}
                    onChange={(e) => {
                        handleObjectChange(e, 'categories')
                    }}
                />
                <button onClick={handleSubmition}>přidat produkt</button>
            </form>
        </div>
    )
}

export default objectRoot
