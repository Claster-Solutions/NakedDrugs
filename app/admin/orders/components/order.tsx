import fb from '@/app/tools/firebase/queries'

interface Props {
    index: number
    order: AdminOrder
}
const handleOrderDone = async (p: Props, uid: string) => {
    try {
        const order = await fb.getAllOrdersFromUser(uid)
        for (let i = 0; i < order.length; i++) {
            if (order[i].id === p.order.order[0].id) {
                order[i].state = 'shipped'
            }
        }

        console.log(order)
        await fb.updateUserOrders(uid, order)
        alert('Order done')
    } catch (e) {
        console.log(e)
    }
}
const OrderCard = (p: Props) => {
    return (
        <div className="flex h-40 w-1/3 flex-row items-center justify-between rounded-xl border-2 p-2">
            <div>
                {p.order.order.map((item, index) => {
                    return (
                        <div>
                            {item.items.map((item, index) => {
                                return (
                                    <div>
                                        <p>{item.productName}</p>

                                        <p>
                                            hmotnost: <strong>{item.price.volume}</strong>
                                        </p>
                                        <p>
                                            počet kusů: <strong>{item.amount}</strong>
                                        </p>
                                        <p>{p.order.order[index].state}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <button
                className="flex h-8 w-24 items-center justify-center rounded-lg bg-hades-main text-white"
                onClick={() => handleOrderDone(p, p.order.userId)}
            >
                <p>Hotovo</p>
            </button>
        </div>
    )
}
export default OrderCard
