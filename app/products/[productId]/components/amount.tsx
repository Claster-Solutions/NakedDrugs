'use client'
import React, { useState } from 'react'

interface Props {
    amount: number
    setAmount: (amount: number) => void
}

const Amount = (p: Props) => {
    const plusClickHandlerer = () => {
        p.setAmount(p.amount + 1)
    }
    const minusClickHandlerer = () => {
        if (p.amount > 1) {
            p.setAmount(p.amount - 1)
        }
    }

    return (
        <div className="felx-row m-2 flex">
            <button className="text-lg font-medium" onClick={minusClickHandlerer}>
                -
            </button>
            <div className="mx-2 rounded-lg border-2 border-solid p-2 text-lg ">
                {p.amount}
            </div>
            <button className="text-lg font-medium" onClick={plusClickHandlerer}>
                +
            </button>
        </div>
    )
}
export default Amount
