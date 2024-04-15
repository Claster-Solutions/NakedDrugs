'use client'
import fb from '@/app/tools/firebase/queries'
import { set } from 'firebase/database'
import { useEffect, useState } from 'react'
import OrderCard from './components/order'

const ObjectRoot = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([]) //all users might be right

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fb.getAllUsersByAdminOrders()
                // console.log(categoriesData)
                // if (categoriesData.orders === null) {
                //     // Add an argument to the element access expression
                //     return
                // }
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
                // <div key={index}>
                //     {order.id}
                //     {order.state}
                // </div>
                <OrderCard order={order} key={index} index={index} />
                // <DropDownYear category={category} key={index} index={index} />
            ))}
            <div className="sup h-20" />
        </div>
    )
}

export default ObjectRoot
