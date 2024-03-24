import React from 'react'

interface Props {
    title: string
    handler: () => void
}

export default function ClasterWideBtn(p: Props) {
    return (
        <button
            className={`
                w-full rounded-lg border-2 border-solid border-hades bg-hades
                px-3 py-2 font-medium text-white active:scale-95
                `}
            onClick={p.handler}
        >
            {p.title}
        </button>
    )
}
