'use client'
import AdyenCheckout from '@adyen/adyen-web'
import React, { useEffect, useRef } from 'react'

interface Props {
    session: any
}

export default function Pay(p: Props) {
    const [done, setDone] = React.useState(false)
    const dropinContainerRef = useRef<HTMLDivElement>(null)

    const configuration = {
        environment: 'test',
        clientKey: 'test_DN4AG7OZKRGSZHXTB7FRUVXWAUELRWB2', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        session: p.session,
        onPaymentCompleted: (result: any, component: any) => {
            console.log(result, component)
            setDone(true)
        },
        onError: (error: any, component: any) => {
            console.error(error.name, error.message, error.stack, component)
        },
    }

    useEffect(() => {
        const func = async () => {
            // Create an instance of AdyenCheckout using the configuration object.
            const checkout = await AdyenCheckout(configuration)

            // Create an instance of Drop-in and mount it to the container you created.

            if (dropinContainerRef.current) {
                console.log('checkout:', checkout)
                const dropinComponent = checkout.create('dropin').mount(dropinContainerRef.current as HTMLElement)
            }
        }

        func()
    }, [dropinContainerRef])

    return (
        <div>
            <button
                onClick={() => {
                    console.log(p.session)
                }}
            >
                Show
            </button>
            {done ? <h1>Done</h1> : <div className="w-4/12" id="dropin-container" ref={dropinContainerRef}></div>}
        </div>
    )
}
