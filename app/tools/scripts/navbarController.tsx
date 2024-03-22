'use client'
import React, { use, useEffect, useState } from 'react'

export default function NavbarController() {
    const [show, setShow] = useState<boolean>(true)
    const [navbar, setNavbar] = useState<HTMLElement | null>(null)

    useEffect(() => {
        setNavbar(document.getElementById('navbar'))

        const handleScroll = () => {
            if (navbar) {
                if (window.scrollY > 400) {
                    setShow(false)
                    navbar.classList.add('top-[-16rem]')
                } else {
                    setShow(true)
                    navbar.classList.remove('top-[-16rem]')
                }
            }
        }

        window.addEventListener('scroll', handleScroll) // Add event listener for scroll
    }, [navbar])

    return <></>
}
