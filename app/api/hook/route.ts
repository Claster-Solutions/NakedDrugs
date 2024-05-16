import fb from "@/app/tools/firebase/queries"

export async function POST(request: Request) {
    const res = await request.json()
    const sessionId = res.notificationItems[0].NotificationRequestItem.additionalData.checkoutSessionId
    const success = res.notificationItems[0].NotificationRequestItem.success

    const users = await fb.getAllUsers()
    const user = users.find((user) => user.orders.find((order) => order.sessionId === sessionId))
    if (!user) return new Response("User not found")

    const userOrders = user.orders

    //edit status
    const order = userOrders.find((order) => order.sessionId === sessionId)
    if (!order) return new Response("Order not found")

    order.state = success ? "paid" : "pending"

    const newOrders = userOrders.map((order) => (order.sessionId === sessionId ? order : order))
    await fb.updateUserOrders(user.id, newOrders)

    return new Response("Done")
}