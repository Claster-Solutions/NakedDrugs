import React from 'react'

import GiftIcon from '@/public/icons/gift.png'
import { WhyUsData } from './data'

export default function WhyUsBanner() {
    return (
        <div className=" flex flex-row gap-6 px-10 ">
            {WhyUsData.map((item, index) => {
                return (
                    <div className="flex flex-row items-center justify-center rounded-3xl bg-white p-4">
                        <img className=" h-20" src={GiftIcon.src} alt="ikona dárek" />
                        <div className="flex flex-col gap-4 p-4 pt-0">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
