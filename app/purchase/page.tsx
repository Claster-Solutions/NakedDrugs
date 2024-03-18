'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { v4 } from 'uuid'
import Script from 'next/script'
import PacketaWidget from './packetaWidget'

export default function Page() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return
                setUser(userData)

                if (user.displayName) {
                    setName(user.displayName)
                }

                if (user.email) {
                    setEmail(user.email)
                }

                if (user.phoneNumber) {
                    setPhone(user.phoneNumber)
                }
            }
        })
    }, [])

    //#Delivery data
    const [deliveryAddress, setDeliveryAddress] = useState('')

    //#Invoice data
    //#User
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    //#Address
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')

    //#Other
    const [note, setNote] = useState('')

    const handleSubmit = async () => {
        if (!user) return
        if (user.cart.length < 1) return

        if (!name || !lastName || !email || !phone || !street || !city || !zip || !country || !deliveryAddress) {
            //log all of them
            console.log(name, lastName, email, phone, street, city, zip, country, deliveryAddress)
            alert('Please fill all fields')
            return
        }

        const newOrder: Order = {
            id: v4(),
            state: 'pending',
            date: new Date(),
            items: user.cart,
            note,
            deliveryAddress,
            invoice: {
                name,
                lastName,
                email,
                phone,
                street,
                city,
                zip,
                country,
            },
        }

        const newOrders = user.orders.concat(newOrder)
        setUser({ ...user, orders: newOrders })
        setUser({ ...user, cart: [] })
        await fb.updateUserOrders(user.id, newOrders)
        await fb.updateUsercart(user.id, [])

        //redirect to tahank you page
        window.location.href = `/thank-you`
    }

    return (
        <div>
            <h1>Purchase</h1>
            <br />
            <h1>Items:</h1>
            <div className="flex flex-col">
                {user?.cart.map((item) => (
                    <div key={item.id} className="flex">
                        <img src={item.productImage} alt="" className="h-20 w-20" />
                        <p>{item.productName}</p>
                        <p>{item.amount}</p>
                    </div>
                ))}
            </div>

            <br />
            <br />

            <h1>Vyberte dopravu</h1>
            <PacketaWidget setDeliveryAddress={setDeliveryAddress} />

            <br />
            <br />

            <h1>Vyberte platbu</h1>
            <p>TODO: Brana</p>

            <br />
            <br />

            <h1>Fakturační údaje</h1>
            <div>
                {/* //TODO: ADD NAMES AND IDS TO ENANLE AUTO FILL */}
                <input type="text" placeholder="Jméno" value={name} onChange={(e) => setName(e.target.value)} />
                <input
                    type="text"
                    placeholder="Příjmení"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <input type="text" placeholder="Ulice" value={street} onChange={(e) => setStreet(e.target.value)} />
                <input type="text" placeholder="Město" value={city} onChange={(e) => setCity(e.target.value)} />
                <input type="text" placeholder="PSČ" value={zip} onChange={(e) => setZip(e.target.value)} />
                <input type="text" placeholder="Země" value={country} onChange={(e) => setCountry(e.target.value)} />

                <textarea placeholder="Poznámka" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
