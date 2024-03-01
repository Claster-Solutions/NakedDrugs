import fb from '@/app/tools/firebase/queries'
import React from 'react'

interface Props {
    data: ContentImage
}

export default function ContentSingleImage(p: Props) {
    return (
        <div className="flex aspect-video md:w-9/12">
            <img
                src={fb.getImage(p.data.id)}
                alt={p.data.alt}
                className="featured-image my-4  rounded object-contain md:ml-10 md:w-9/12"
            />
        </div>
    )
}
