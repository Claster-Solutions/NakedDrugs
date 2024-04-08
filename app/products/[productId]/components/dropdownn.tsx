'use client'
import React, { useState, useRef, useEffect } from 'react'
import dropdown from '@/public/icons/Arrow_drop_down.svg'
import { set } from 'firebase/database'
import arrow from '@/public/icons/Arrow_drop_down.svg'

interface Props {
    prices: ProductPrice[]
    price: ProductPrice
    setPrice: (price: ProductPrice) => void
}

const Dropdown = (p: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (option: ProductPrice) => {
        p.setPrice(option)
        setIsOpen(false)
    }

    return (
        <div className="dropdown">
            <button
                className="dropdown-toggle text-md flex h-10 w-24 flex-row items-center  justify-around rounded-lg px-1 font-medium shadow-xl"
                onClick={toggleDropdown}
            >
                <p className=" text-sm">{p.price.volume}</p>
                <img className=" aspect-square w-6" src={arrow.src} />
            </button>
            {isOpen && (
                <div className="dropdown-menu text-md gap-2 font-medium">
                    {p.prices
                        .filter((price) => price !== p.price)
                        .map((price, index) => (
                            <div key={index} className="dropdown-item" onClick={() => handleOptionClick(price)}>
                                {price.volume}
                            </div>
                        ))}
                </div>
            )}
            <p className="p-4 text-xl font-semibold text-hades-main">{p.price.price}</p>
        </div>
    )
}

export default Dropdown
