'use client'
import fb from '@/app/tools/firebase/queries'
import React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import ObjectGeneral from './objectGeneral'
import ObjectContentFormatter from './objectContetFormater'
const newEvent = (): BlogEvent => {
    return {
        id: '',
        title: '',
        thrumbnailImageId: 'brand/banner.webp',
        description: '',
        date: new Date(),
        categoryName: new Date().getFullYear().toString(),

        content: [
            {
                type: 102,
                text: '',
            },
        ],
    }
}

const getBlog = async (): Promise<BlogEvent | null> => {
    const eventId = localStorage.getItem('eventId')
    if (eventId) {
        const event = await fb.getBlog(eventId)
        if (!event) {
            localStorage.removeItem('eventId')
            return null
        }
        return event
    }
    return null
}

const ObjectRoot = () => {
    const [object, setObject] = useState<BlogEvent>(newEvent())
    const [isIdEntered, setIsIdEntered] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const event = await getBlog()
                if (event) {
                    setObject(event)
                    setIsIdEntered(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleSubmition = async () => {
        if (object.id === '') {
            alert('Akce musí mít ID.')
            return
        }
        if (object.content.length < 2) {
            alert('Akce musí mít vice nez jednu položku obsahu.')
            return
        }

        await fb.setBlog(object)
        alert('Akce byla úspěšně přidána.')
    }

    const handleEventDelete = async () => {
        if (object.id === '') {
            alert('Akce musí mít ID.')
            return
        }

        await fb.deleteBlog(object.id)
        alert('Akce byla úspěšně smazána.')
        localStorage.removeItem('eventId')
        window.location.href = '/admin/blog'
    }

    const handleBackButton = () => {
        localStorage.removeItem('eventId')
        window.location.href = '/admin/blog'
    }

    return (
        <div className="open-sans flex flex-col items-start">
            <div className="flex gap-2">
                <button
                    onClick={handleBackButton}
                    className="focus:shadow-outline mb-3 mt-6 rounded bg-gray px-4 py-2 font-bold text-white focus:outline-none"
                >
                    {'< Zpět'}
                </button>

                <button
                    className="focus:shadow-outline mb-3 mt-6 rounded bg-gray px-4 py-2 font-bold text-white focus:outline-none"
                    onClick={handleSubmition}
                >
                    {'Uložit'}
                </button>

                <button
                    className="focus:shadow-outline mb-3 mt-6 rounded bg-red px-4 py-2 font-bold text-white focus:outline-none"
                    onClick={handleEventDelete}
                >
                    {'Delete'}
                </button>
            </div>

            {/* <button
                onClick={() => {
                    console.log(object)
                }}
            >
                Log it
            </button>

            <button
                onClick={() => {
                    console.log(scripts.generateRandomID())
                }}
            >
                Log it
            </button> */}

            <h1 className="oswald text-primary-blue mb-3 mt-6 text-5xl font-semibold uppercase">
                Hlavní
            </h1>
            <ObjectGeneral
                object={object}
                setObject={setObject}
                isIdEntered={isIdEntered}
                setIsIdEntered={setIsIdEntered}
            />
            <div className={`w-full ${isIdEntered ? 'block' : 'hidden'}`}>
                <h1 className="oswald text-primary-blue mb-3 mt-6 text-5xl font-semibold uppercase">
                    Obsah
                </h1>
                <ObjectContentFormatter object={object} setObject={setObject} />
            </div>
        </div>
    )
}
export default ObjectRoot
