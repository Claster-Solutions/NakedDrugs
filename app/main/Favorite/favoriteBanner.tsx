'use client'
import React, { useState } from 'react'
import ProductImage from '@/public/images/kratom_placeholder.webp'
import { WhyUsData } from './data'
import fb from '@/app/tools/firebase/queries'

export default function WhyUsBanner() {
    const [hoveredDiv, setHoveredDiv] = useState<number | null>(null)

    return (
        <div className=" flex flex-col justify-evenly gap-12">
            <p className="text-5xl font-bold">Nejoblíbenější</p>
            <div className="flex flex-col justify-between p-0  md:flex-row">
                {WhyUsData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredDiv(index)}
                            onMouseLeave={() => setHoveredDiv(null)}
                            className="shadow-xs  mx-0 mt-0 flex min-w-60 flex-col items-center overflow-visible bg-white"
                        >
                            <div className="">
                                {/* <div
                                    style={{
                                        boxShadow: hoveredDiv === index ? '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' : '',
                                    }}
                                    className="bg-primary-hades-light m-0 min-h-80 min-w-80 rounded-lg"
                                ></div> */}
                                <img
                                    style={{
                                        boxShadow: hoveredDiv === index ? '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' : '',
                                    }}
                                    className="bg-primary-hades-light m-0 h-[22rem] w-[22rem] rounded-lg"
                                    src={WhyUsData[index].foto}
                                    alt="alt"
                                />
                                <h3 className="text-md mx-0 py-2 font-bold uppercase">{item.title}</h3>
                                <p className=" mx-0">{item.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
