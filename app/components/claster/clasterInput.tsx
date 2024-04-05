import React from 'react'

interface Props {
    id: string
    value: string
    onChange: (value: string) => void
    title: string
    error: boolean | null

    textarea?: boolean
    textareaRows?: number
    password?: boolean
}

const getTextColor = (error: boolean | null) => {
    if (error === null) {
        return 'text-hades'
    }
    if (error) {
        return 'text-red'
    }
    return 'text-green'
}

const getBorderColor = (error: boolean | null) => {
    if (error === null) {
        return 'border-hades'
    }
    if (error) {
        return 'border-red'
    }
    return 'border-green'
}

export default function ClasterInput(p: Props) {
    return (
        <div className="claster-input f-1 w-full">
            <label
                htmlFor="input"
                className={`text font-semibold ${getTextColor(p.error)}`}
            >
                {p.title}
            </label>
            {p.textarea ? (
                <textarea
                    name={p.id}
                    id={p.id}
                    className={`input w-full resize-none rounded-lg border-2 border-solid px-3 py-2 ${getBorderColor(
                        p.error,
                    )}`}
                    value={p.value}
                    rows={p.textareaRows}
                    onChange={(e) => p.onChange(e.target.value)}
                />
            ) : (
                <input
                    name={p.id}
                    id={p.id}
                    className={`input w-full rounded-lg border-2 border-solid px-3 py-2 ${getBorderColor(
                        p.error,
                    )}`}
                    type={p.password ? 'password' : 'text'}
                    value={p.value}
                    onChange={(e) => p.onChange(e.target.value)}
                />
            )}
        </div>
    )
}
