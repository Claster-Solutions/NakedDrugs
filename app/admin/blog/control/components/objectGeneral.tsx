'use client'
import fb from '@/app/tools/firebase/queries'
import { useState } from 'react'

interface Props {
    object: BlogEvent
    setObject: React.Dispatch<React.SetStateAction<BlogEvent>>
    isIdEntered: boolean
    setIsIdEntered: React.Dispatch<React.SetStateAction<boolean>>
}

const ObjectGeneral = (p: Props) => {
    const handleObjectChange = (e: any, field: string, index?: number) => {
        let newObject: BlogEvent = { ...p.object }
        switch (field) {
            case 'id':
                newObject = { ...newObject, id: e.target.value }
                break
            case 'title':
                newObject = { ...newObject, title: e.target.value }
                break
            case 'date':
                const newDate = new Date(e.target.value)
                newObject = {
                    ...newObject,
                    date: newDate,
                    categoryName: newDate.getFullYear().toString(),
                }
                break
            case 'description':
                newObject = { ...newObject, description: e.target.value }
                break
        }
        p.setObject(newObject)
    }

    const handleObjectIDSubmition = async () => {
        if (p.object.id === '') {
            alert('Blog musí mít ID.')
            return
        }

        var pattern = /^[a-zA-Z0-9_]+$/ //* only letters, numbers and underscore

        if (!pattern.test(p.object.id)) {
            alert('ID může obsahovat pouze písmena bez diakritiky, číslice a podtržítko.')
            return
        }

        try {
            const existingEvent = await fb.getBlog(p.object.id)
            if (existingEvent) {
                alert('Blog tímto ID již existuje.')
                return
            }
        } catch (e) {
            p.setIsIdEntered(true)
        }
    }

    const [uploadedToFirebase, setUploadedToFirebase] = useState<boolean>()

    return (
        <div className="open-sans flex w-full flex-col items-start">
            <div
                className={`bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2 ${
                    p.isIdEntered ? 'bg-greenLight pointer-events-none' : ''
                }`}
            >
                <div className="ml-1 flex gap-2">
                    <p className="whitespace-nowrap">ID</p>
                    <button
                        className="bg-greenLight rounded border border-solid px-3"
                        onClick={handleObjectIDSubmition}
                    >
                        {p.isIdEntered ? 'Uloženo' : 'Vytvořit'}
                    </button>
                </div>
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'ID'}
                    type={'text'}
                    value={p.object.id}
                    onChange={(e) => {
                        handleObjectChange(e, 'id')
                    }}
                />
            </div>

            <div className={`w-full ${p.isIdEntered ? 'block' : 'hidden'}`}>
                <div className="bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2">
                    <p className="ml-1 w-20 whitespace-nowrap">Title</p>
                    <input
                        className="w-full rounded p-1 text-lg"
                        placeholder="title"
                        type="text"
                        value={p.object.title}
                        onChange={(e) => {
                            handleObjectChange(e, 'title')
                        }}
                    />
                </div>

                <div className="bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2">
                    <p className="ml-1 w-20 whitespace-nowrap">Date</p>
                    <input
                        className="w-full rounded p-1 text-lg"
                        placeholder="date"
                        type="date"
                        value={p.object.date.toISOString().split('T')[0]}
                        onChange={(e) => {
                            handleObjectChange(e, 'date')
                        }}
                    />
                </div>

                <div className="bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2">
                    <p className="ml-1 w-20 whitespace-nowrap">Popis</p>
                    <textarea
                        className="w-full rounded p-1 text-lg"
                        placeholder="Popis"
                        value={p.object.description}
                        onChange={(e) => {
                            handleObjectChange(e, 'description')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ObjectGeneral
