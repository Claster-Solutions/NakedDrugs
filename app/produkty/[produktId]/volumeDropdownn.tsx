'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Price, Products } from '../data'
import dropdown from '@/public/icons/Arrow_drop_down.svg'
import { set } from 'firebase/database'

interface DropdownProps {
    price: Price[]
}

const Dropdown = (p: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [rotation, setRotation] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedOptionPrice, setSelectedOptionPrice] = useState(null)
    // const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
        setRotation(!rotation)
    }

    const closeDropdown = () => {
        setIsOpen(false)
        setRotation(false)
    }
    const handleOptionClick = (option: any, price: any) => {
        setSelectedOption(option)
        closeDropdown()
        setSelectedOptionPrice(price)
    }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setIsOpen(false)
    //         }
    //     }

    //     if (isOpen) {
    //         document.addEventListener('click', handleClickOutside)
    //     }

    //     return () => {
    //         document.removeEventListener('click', handleClickOutside)
    //     }
    // }, [isOpen])

    return (
        <div className="w-full py-6 pb-8">
            <div className="relative inline-block">
                <div className="flex flex-col ">
                    {' '}
                    <p className="px-4 py-2 text-2xl font-medium text-black">
                        {selectedOptionPrice || p.price[0].price}
                    </p>
                    <div className="bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 flex flex-row items-center justify-center">
                        <button
                            type="button"
                            className="flex flex-row items-center rounded-2xl border-2 p-2 text-lg font-medium text-black "
                            onClick={toggleDropdown}
                        >
                            {selectedOption || p.price[0].volume}

                            <img
                                src={dropdown.src}
                                alt="dropdown arrow"
                                className={`ml-2 h-6 w-6 transform ${
                                    rotation ? 'rotate-180' : ''
                                } transition-transform`}
                            />
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute right-0 ml-6 w-44 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <ul
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            {p.price.map((item, index) => {
                                return (
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm"
                                            onClick={() =>
                                                handleOptionClick(item.volume, item.price)
                                            }
                                        >
                                            {item.volume}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown
