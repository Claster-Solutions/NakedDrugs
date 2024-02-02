import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    index: number
    object: BlogEvent
    setObject: Dispatch<SetStateAction<BlogEvent>>
}

export default function Paragraph(p: Props) {
    const handleChange = (e: any, field: string, index: number) => {
        if (index === undefined) return

        let newContentList: Content[] = [...p.object.content]

        switch (field) {
            case 'text':
                newContentList[index] = {
                    ...newContentList[index],
                    text: e.target.value,
                } as ContentParagraph
                break
        }

        p.setObject({
            ...p.object,
            content: newContentList,
        })
    }

    return (
        <div className="bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2">
            <p className="ml-1 w-20 whitespace-nowrap">Odstavec</p>
            <textarea
                className="w-full rounded p-1 text-lg"
                placeholder="Odstavec"
                value={(p.object.content[p.index] as ContentParagraph).text}
                onChange={(e) => {
                    handleChange(e, 'text', p.index)
                }}
            />
        </div>
    )
}
