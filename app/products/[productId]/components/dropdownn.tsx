'use client'
import React, { useState, useRef, useEffect } from 'react'
import dropdown from '@/public/icons/Arrow_drop_down.svg'
import { set } from 'firebase/database'

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
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {p.price.price} - {p.price.volume}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {p.prices
                        .filter((price) => price !== p.price)
                        .map((price, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(price)}
                            >
                                {price.price} - {price.volume}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
