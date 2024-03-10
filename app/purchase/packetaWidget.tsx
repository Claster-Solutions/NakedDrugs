'use client'
import React, { useEffect, useState } from 'react'

interface Props {
    setDeliveryAddress: (address: string) => void
}

export default function PacketaWidget(p: Props) {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    const packetaApiKey = 'c2d2174de71e837d'
    const packetaOptions = {
        country: 'cz',
        language: 'cs',
        valueFormat: 'name, street, city, zip, country',
        view: 'modal',
    }

    useEffect(() => {
        const loadScript = (url: string, retries: number, attempt = 0) => {
            const script = document.createElement('script')
            script.src = url
            script.async = true
            script.onload = () => setIsScriptLoaded(true)
            script.onerror = () => {
                if (attempt < retries - 1) {
                    const delay = 500 * Math.pow(2, attempt)
                    setTimeout(() => loadScript(url, retries, attempt + 1), delay)
                }
                return
            }

            document.head.appendChild(script)
        }

        loadScript('https://widget.packeta.com/v6/www/js/library.js', 3)
    }, [])

    function showSelectedPickupPoint(point: any) {
        const address = point.formatedValue
        p.setDeliveryAddress(address)

        const saveElement = document.querySelector('.packeta-selector-value') as HTMLElement

        saveElement.innerText = ''
        if (point) {
            saveElement.innerText = 'Address: ' + address
        }
    }

    const handlePacketa = () => {
        // @ts-ignore
        if (isScriptLoaded && typeof Packeta !== 'undefined') {
            // @ts-ignore
            Packeta.Widget.pick(packetaApiKey, showSelectedPickupPoint, packetaOptions)
        }
    }

    return (
        <div>
            <h1>Packeta</h1>
            <button className="packeta-selector-open" onClick={handlePacketa}>
                Select pick-up point
            </button>
            <div className="packeta-selector-value"></div>
        </div>
    )
}
