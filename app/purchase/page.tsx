import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../tools/firebase/main'
import fb from '../tools/firebase/queries'
import { v4 } from 'uuid'
import Script from 'next/script'
import PacketaWidget from './packetaWidget'
import '@adyen/adyen-web/dist/adyen.css'
import Pay from './pay'

export default async function Page() {
    // Require the parts of the module you want to use.

    // Include your idempotence key when you make an API request.
    const data = await fetch('http://localhost:3000/api')
    const json = await data.json()

    return (
        <div>
            <h1>Hello</h1>
            {/* <Form /> */}
            {json.response && <Pay session={json.response} />}
        </div>
    )
}
