'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { v4 } from 'uuid'
import PacketaWidget from './packetaWidget'

export default function Form() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fb.getUser(user.uid)
                if (!userData) return
                setUser(userData)

                if (userData.invoiceData) {
                    setName(userData.invoiceData.name)
                    setLastName(userData.invoiceData.lastName)
                    setEmail(userData.invoiceData.email)
                    setPhone(userData.invoiceData.phone)
                    setStreet(userData.invoiceData.street)
                    setCity(userData.invoiceData.city)
                    setZip(userData.invoiceData.zip)
                    setCountry(userData.invoiceData.country)
                    setCompany(userData.invoiceData.company ? true : false)
                    if (userData.invoiceData.company) {
                        setCompanyName(userData.invoiceData.company.companyName)
                        setIC(userData.invoiceData.company.IC)
                        setDIC(userData.invoiceData.company.DIC)
                    }
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

    //#Save data for faster next purchase
    const [saveData, setSaveData] = useState(false)

    //#Buying on company
    const [company, setCompany] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [IC, setIC] = useState('')
    const [DIC, setDIC] = useState('')

    const handleSubmit = async () => {
        if (!user) return
        if (user.cart.length < 1) return

        if (!name || !lastName || !email || !phone || !street || !city || !zip || !country || !deliveryAddress) {
            //log all of them
            console.log(name, lastName, email, phone, street, city, zip, country, deliveryAddress)
            alert('Please fill all fields')
            return
        }

        if (company && (!companyName || !IC || !DIC)) {
            alert('Please fill all company fields')
            return
        }

        const invoiceData: Invoice = {
            name,
            lastName,
            email,
            phone,
            street,
            city,
            zip,
            country,
            company: company
                ? {
                      companyName,
                      IC,
                      DIC,
                  }
                : null,
        }

        const newOrder: Order = {
            id: v4(),
            state: 'pending',
            date: new Date(),
            items: user.cart,
            note,
            deliveryAddress,
            invoice: invoiceData,
            sessionId: null,
        }

        const newOrders = user.orders.concat(newOrder)
        setUser({ ...user, orders: newOrders })
        setUser({ ...user, cart: [] })
        await fb.updateUserOrders(user.id, newOrders)
        await fb.updateUsercart(user.id, [])

        if (saveData) {
            setUser({ ...user, invoiceData })
            await fb.updateUserInvoiceData(user.id, invoiceData)
        }

        //redirect to tahank you page
        window.location.href = `/pay-wall?orderId=${newOrder.id}`
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

            <br />

            <label>Chci fakturu na firmu</label>
            <input type="checkbox" checked={company} onChange={(e) => setCompany(e.target.checked)} />
            {company && (
                <div>
                    <input
                        type="text"
                        placeholder="Název firmy"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <input type="text" placeholder="IČ" value={IC} onChange={(e) => setIC(e.target.value)} />
                    <input type="text" placeholder="DIČ" value={DIC} onChange={(e) => setDIC(e.target.value)} />
                </div>
            )}

            <br />

            <label>{`Uložit (obnovit) fakturační údaje pro další nákup`}</label>
            <input type="checkbox" checked={saveData} onChange={(e) => setSaveData(e.target.checked)} />

            <br />
            <br />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
