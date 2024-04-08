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
        <div className=" mx-6 flex h-10 w-10 flex-row items-center  justify-evenly">
            <button className="text-lg font-medium" onClick={minusClickHandlerer}>
                -
            </button>
            <div className="mx-2 rounded-lg border-2 border-solid p-2 px-2 text-lg ">{p.amount}</div>
            <button className="text-lg font-medium" onClick={plusClickHandlerer}>
                +
            </button>
        </div>
    )
}
export default Amount
