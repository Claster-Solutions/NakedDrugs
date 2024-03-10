import React from 'react'
import ProductBannerImg from '@/public/images/placeholder.png'
import { ProductBannerData } from './data'
export default function ProductBanner() {
    return (
        <div className=" relative flex flex-col justify-evenly md:flex-row">
            {ProductBannerData.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="mx-10 mt-6 flex min-w-60 flex-col items-center overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl"
                    >
                        <div className="m-4">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                        <img src={ProductBannerImg.src} alt="obrázek productu" />
                    </div>
                )
            })}
        </div>
    )
}
// shadow-xl hover:shadow-2xl
