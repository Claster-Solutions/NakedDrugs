import React, { Dispatch, SetStateAction, useState } from 'react'
import Paragraph from './contentComponents/paragraph'
import List from './contentComponents/list'
import Image from './contentComponents/image'

interface Props {
    object: BlogEvent
    setObject: Dispatch<SetStateAction<BlogEvent>>
}

const ObjectContentFormatter = (p: Props) => {
    return (
        <div className="flex flex-col">
            {p.object.content.map((_, index) => {
                return (
                    <div key={index}>
                        <ContentItem
                            index={index}
                            actionEvent={p.object}
                            setActionEvent={p.setObject}
                        />
                        <ContentItemController
                            index={index}
                            actionEvent={p.object}
                            setActionEvent={p.setObject}
                        />
                    </div>
                )
            })}
        </div>
    )
}
export default ObjectContentFormatter

interface ContentItemProps {
    index: number
    actionEvent: BlogEvent
    setActionEvent: Dispatch<SetStateAction<BlogEvent>>
}

const ContentItemController = (p: ContentItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleAddItem = (content: Content, index: number) => {
        let newContentList: Content[] = [...p.actionEvent.content]
        newContentList.splice(index + 1, 0, content)

        p.setActionEvent({
            ...p.actionEvent,
            content: newContentList,
        })
    }

    const handleDelteItem = (index: number) => {
        if (index === undefined) return

        if (p.actionEvent.content.length === 1) {
            alert('Nelze smazat poslední položku')
            return
        }

        let newContentList: Content[] = [...p.actionEvent.content]
        newContentList.splice(index, 1)

        p.setActionEvent({
            ...p.actionEvent,
            content: newContentList,
        })
    }

    return (
        <div>
            <button
                className="bg-blueLight m-1 flex h-min w-min items-center justify-center rounded-xl  border border-solid px-5 text-center"
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                {isOpen ? '-' : '+'}
            </button>
            {isOpen && (
                <div className="flex flex-wrap items-baseline">
                    {items.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className=" bg-blueLight m-1 flex h-min w-min items-center justify-center whitespace-nowrap rounded-xl border border-solid px-5 text-center"
                                onClick={() => {
                                    handleAddItem(item.newItem, p.index)
                                    setIsOpen(false)
                                }}
                            >
                                {item.title}
                            </button>
                        )
                    })}
                    <button
                        className=" bg-redLight flex h-min w-min items-center justify-center rounded-xl border border-solid px-5 text-center"
                        onClick={() => {
                            handleDelteItem(p.index)
                        }}
                    >
                        X
                    </button>
                </div>
            )}
        </div>
    )
}

interface Item {
    title: string
    type: number
    newItem: Content
}

//* Add new content type here
const items: Item[] = [
    // {
    //     title: 'záhlaví 2',
    //     type: 102,
    //     newItem: {
    //         type: 102,
    //         text: '',
    //     },
    // },
    // {
    //     title: 'záhlaví 3',
    //     type: 103,
    //     newItem: {
    //         type: 103,
    //         text: '',
    //     },
    // },
    // {
    //     title: 'záhlaví 4',
    //     type: 104,
    //     newItem: {
    //         type: 104,
    //         text: '',
    //     },
    // },
    {
        title: 'odstavec',
        type: 200,
        newItem: {
            type: 200,
            text: '',
        },
    },
    {
        title: 'obrázek',
        type: 300,
        newItem: {
            type: 300,
            id: '',
            alt: '',
        },
    },
    // {
    //     title: 'sada obrázků',
    //     type: 301,
    //     newItem: {
    //         type: 301,
    //         images: [],
    //         alt: '',
    //     },
    //},
    {
        title: 'seznam',
        type: 401,
        newItem: {
            type: 401,
            items: [],
        },
    },
    // {
    //     title: 'seznam varování',
    //     type: 400,
    //     newItem: {
    //         type: 400,
    //         items: [],
    //     },
    // },
]

const ContentItem = (p: ContentItemProps) => {
    switch (p.actionEvent.content[p.index].type) {
        // case 102:
        //     return (
        //         <Header2
        //             index={p.index}
        //             object={p.actionEvent}
        //             setObject={p.setActionEvent}
        //         />
        //     )

        // case 103:
        //     return (
        //         <Header3
        //             index={p.index}
        //             object={p.actionEvent}
        //             setObject={p.setActionEvent}
        //         />
        //     )

        // case 104:
        //     return (
        //         <Header4
        //             index={p.index}
        //             object={p.actionEvent}
        //             setObject={p.setActionEvent}
        //         />
        //     )

        case 200:
            return (
                <Paragraph
                    index={p.index}
                    object={p.actionEvent}
                    setObject={p.setActionEvent}
                />
            )

        case 300:
            return (
                <Image
                    index={p.index}
                    object={p.actionEvent}
                    setObject={p.setActionEvent}
                />
            )

        // case 301:
        //     return (
        //         <ImagesSet
        //             index={p.index}
        //             object={p.actionEvent}
        //             setObject={p.setActionEvent}
        //         />
        //     )

        // case 400:
        //     return (
        //         <WarningList
        //             index={p.index}
        //             object={p.actionEvent}
        //             setObject={p.setActionEvent}
        //         />
        //     )

        case 401:
            return (
                <List
                    index={p.index}
                    object={p.actionEvent}
                    setObject={p.setActionEvent}
                />
            )

        //* Add new content type here
    }
}
