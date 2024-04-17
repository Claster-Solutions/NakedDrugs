'use client'
import fb from '@/app/tools/firebase/queries'
import { set } from 'firebase/database'
import { useEffect, useState } from 'react'
import OrderCard from './components/order'

const ObjectRoot = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fb.getAllUsersWithOrder()

                setOrders(categoriesData)
            } catch (err) {
                console.log(err)
            }
            console.log(orders)
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-primary-blue text-5xl font-semibold uppercase">Orders</h1>

            {orders.map((order, index) => (
                <OrderCard order={order} key={index} index={index} />
            ))}
            <div className="sup h-20" />
        </div>
    )
}

export default ObjectRoot
