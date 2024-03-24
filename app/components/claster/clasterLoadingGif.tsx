import React from 'react'
import loadingGif from '@/public/icons/loading.gif'

interface Props {
    width: number
}

export default function ClasterLoadingGif(p: Props) {
    return <img src={loadingGif.src} alt="loading gif" width={p.width} />
}
