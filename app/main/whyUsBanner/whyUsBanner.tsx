'use client'
import React, { useState } from 'react'
import ProductImage from '@/public/images/kratom_placeholder.webp'
import { WhyUsData } from './data'

export default function WhyUsBanner() {


  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);


  return (
    <div className=" flex flex-col justify-evenly">

      <p className='mx-[7%] text-3xl font-bold'>🖤 Nejoblíbenější 🖤</p>
      <div className='flex flex-col justify-evenly p-8  md:flex-row'>
        {WhyUsData.map((item, index) => {
          return (

            <div key={index} onMouseEnter={() => setHoveredDiv(index)} onMouseLeave={() => setHoveredDiv(null)} className="mx-10 mt-2 flex min-w-60 flex-col items-center overflow-hidden bg-white shadow-xs">
              <div className="">
                <div style={{ boxShadow: hoveredDiv === index ? '0px 5px 10px 0px rgba(0, 0, 0, 0.5)' : '', }} className='bg-primary-hades_light m-4 rounded-lg min-w-80 min-h-80'>
                </div>
                <h3 className='font-bold uppercase py-2 mx-4 text-md'>{item.title}</h3>
                <p className=' mx-4'>{item.text}</p>
              </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}
