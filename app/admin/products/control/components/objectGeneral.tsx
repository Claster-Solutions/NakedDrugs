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
    const handleSubmition = async () => {
        const newProduct: Product = {
            id: p.product.id,
            name: name,
            prices: [
                {
                    price: price10.toString(),
                    volume: '10',
                },
                {
                    price: price100.toString(),
                    volume: '100',
                },
                {
                    price: price1000.toString(),
                    volume: '1000',
                },
            ],
            description: description,
            images: p.product.images,
            reviews: p.product.reviews,
            categories: categories.split(','), //f fix it
        }
        await fb.setProduct(newProduct)
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

    const [price10, setPrice10] = useState<number>(0)
    const [price100, setPrice100] = useState<number>(0)
    const [price1000, setPrice1000] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [categories, setCategories] = useState<string>('')

    return (
        <div>
            <form action="">
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'name'}
                    type={'text'}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 1000g'}
                    type={'text'}
                    value={price1000}
                    onChange={(e) => {
                        setPrice1000(Number(e.target.value))
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 100g'}
                    type={'text'}
                    value={price100}
                    onChange={(e) => {
                        setPrice100(Number(e.target.value))
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'price for 10g'}
                    type={'text'}
                    value={price10}
                    onChange={(e) => {
                        setPrice10(Number(e.target.value))
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'description'}
                    type={'text'}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'categories - all'}
                    type={'text'}
                    value={categories}
                    onChange={(e) => {
                        setCategories(e.target.value)
                    }}
                />
                <button onClick={handleSubmition}>přidat produkt</button>
            </form>
        </div>
    )
}

export default objectRoot
