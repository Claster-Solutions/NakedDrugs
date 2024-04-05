import React from 'react'
import ClasterLoadingGif from './clasterLoadingGif'

export default function ClasterLoadingScreen() {
    return (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
            <ClasterLoadingGif width={90} />
        </div>
    )
}
