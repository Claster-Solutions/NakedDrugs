'use client'
import { auth } from '@/firebase/main'
import React from 'react'

export default function CurrentUser() {
    return (
        <div>
            <p>CurrentUser</p>
            <button
                onClick={() => {
                    console.log(auth.currentUser)
                }}
            >
                cehck
            </button>
        </div>
    )
}
