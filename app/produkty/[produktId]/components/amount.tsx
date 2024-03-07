'use client'

import fb from '@/app/tools/firebase/queries'
import React, { useState } from 'react'

const Amount = () => {
    const [amount, setAmount] = useState(1)

    const plusClickHandlerer = () => {
        setAmount(amount + 1)
    }
    const minusClickHandlerer = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    return (
        <div className="felx-row m-2 flex ">
            <button className="text-lg font-medium" onClick={minusClickHandlerer}>
                -
            </button>
            <div className="mx-2 rounded-lg border-2 border-solid p-2 text-lg ">
                {amount}
            </div>
            <button className="text-lg font-medium" onClick={plusClickHandlerer}>
                +
            </button>
        </div>
    )
}
export default Amount
