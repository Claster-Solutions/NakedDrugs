import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    index: number
    object: BlogEvent
    setObject: Dispatch<SetStateAction<BlogEvent>>
}

export default function List(p: Props) {
    const handleChange = (e: any, index: number) => {
        let newContentList: Content[] = [...p.object.content]

        let newWarningList: ContentList = newContentList[p.index] as ContentList
        newWarningList.items[index] = e.target.value
        newContentList[p.index] = newWarningList

        p.setObject({
            ...p.object,
            content: newContentList,
        })
    }

    const handleAddNewItem = () => {
        let newContentList: Content[] = [...p.object.content]
        let newWarningList: ContentList = newContentList[p.index] as ContentList
        newWarningList.items.push('')
        newContentList[p.index] = newWarningList

        p.setObject({
            ...p.object,
            content: newContentList,
        })
    }

    const handleDeleteItem = (index: number) => {
        let newContentList: Content[] = [...p.object.content]
        let newWarningList: ContentList = newContentList[p.index] as ContentList
        newWarningList.items.splice(index, 1)
        newContentList[p.index] = newWarningList

        p.setObject({
            ...p.object,
            content: newContentList,
        })
    }

    return (
        <div className="border-blueLight m-2 rounded border-2 border-solid">
            <div className="bg-blueLight w-full p-2">Seznam</div>

            <div className="m-2 flex flex-col gap-2">
                {(p.object.content[p.index] as ContentList).items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="border-blueLight flex gap-2 rounded border-2 border-solid"
                        >
                            <textarea
                                className="h-16 w-full"
                                value={item}
                                onChange={(e) => {
                                    handleChange(e, index)
                                }}
                            />
                            <button
                                className="bg-redLight m-2 rounded px-4"
                                onClick={() => handleDeleteItem(index)}
                            >
                                X
                            </button>
                        </div>
                    )
                })}
                <button
                    className="bg-blueLight mt-3 w-min rounded px-4"
                    onClick={handleAddNewItem}
                >
                    +
                </button>
            </div>
        </div>
    )
}
