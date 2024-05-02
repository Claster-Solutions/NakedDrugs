'use client'
import AdyenCheckout from '@adyen/adyen-web'
import React, { useEffect, useRef } from 'react'

interface Props {
    session: any
}

export default function Pay(p: Props) {
    const dropinContainerRef = useRef<HTMLDivElement>(null)

    const configuration = {
        environment: 'test',
        clientKey: 'test_GWTQ34MH5BGFFI7BHPK7KRR7OILIYPUH', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        session: p.session,
        onPaymentCompleted: (result: any, component: any) => {
            console.info(result, component)
        },
        onError: (error: any, component: any) => {
            console.error(error.name, error.message, error.stack, component)
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
            card: {
                hasHolderName: true,
                holderNameRequired: true,
                billingAddressRequired: true,
            },
        },
    }

    useEffect(() => {
        const func = async () => {
            // Create an instance of AdyenCheckout using the configuration object.
            const checkout = await AdyenCheckout(configuration)

            // Create an instance of Drop-in and mount it to the container you created.
            const dropinComponent = checkout.create('dropin').mount('#dropin-container')
        }

        func()
    }, [])

    return (
        <div>
            <button
                onClick={() => {
                    console.log(p.session)
                }}
            >
                Show
            </button>
            <div className="h-[40vh] w-full bg-red" id="dropin-container" ref={dropinContainerRef}></div>
        </div>
    )
}
