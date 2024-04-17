import fb from '@/app/tools/firebase/queries'

interface Props {
    index: number
    order: AdminOrder
}
const handleOrderDone = async (p: Props) => {
    const user = p.order.user
    user.orders[p.index].state = 'shipped'
    await fb.updateUserOrders(user.id, user.orders)
}
const OrderCard = (p: Props) => {
    return (
        <div className="flex h-auto w-1/2 flex-row items-center justify-between rounded-xl border-2 p-2">
            <div className="flex gap-10 ">
                <div>
                    <p className=" text-xl font-medium">User</p>
                    <p>{p.order.user.name}</p>
                    <p>{p.order.user.email}</p>
                    <p>{p.order.order.deliveryAddress}</p>
                    <div className="flex gap-1">
                        <p>{p.order.user.invoiceData?.name}</p>
                        <p>{p.order.user.invoiceData?.lastName}</p>
                    </div>
                    <p>{p.order.user.invoiceData?.email}</p>
                    <p>{p.order.user.invoiceData?.phone}</p>
                    <p>{p.order.user.invoiceData?.country}</p>
                    <p>{p.order.user.invoiceData?.street}</p>
                    <p>{p.order.user.invoiceData?.zip}</p>
                    <p>{p.order.user.invoiceData?.company?.companyName}</p>
                </div>
                <div>
                    <p className=" text-xl font-medium">Order</p>
                    <div>
                        {p.order.order.items.map((item, index) => {
                            return (
                                <div>
                                    <p>{item.productName}</p>
                                    <p>{item.amount}</p>
                                </div>
                            )
                        })}
                    </div>
                    <p>{p.order.order.state}</p>
                    <p>
                        poznámka: <strong>{p.order.order.note}</strong>
                    </p>
                </div>
            </div>
            <button
                className="flex h-8 w-24 items-center justify-center rounded-lg bg-hades-main text-white"
                onClick={() => handleOrderDone(p)}
            >
                <p>Hotovo</p>
            </button>
        </div>
    )
}
export default OrderCard
