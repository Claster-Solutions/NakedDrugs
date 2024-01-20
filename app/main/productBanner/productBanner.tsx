import React from 'react'
import ProductBannerImg from '@/public/banners/product-banner-img3.jpg'
import { ProductBannerData } from './data'
export default function ProductBanner() {
    return (
        <div className="relative flex flex-row justify-evenly">
            {ProductBannerData.map((item, index) => {
                return (
                    <div className="hover:animate-glow2 m-10 mt-6 flex  flex-col items-center overflow-hidden rounded-2xl ">
                        <div className="absolute">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                        <img src={ProductBannerImg.src} alt="obrázek produktu" />
                    </div>
                )
            })}
        </div>
    )
}
// shadow-xl hover:shadow-2xl
