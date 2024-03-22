import Link from 'next/link'

type NavbarBtnProps = {
    title: string
    link: string
}

const NavbarBtn = (p: NavbarBtnProps) => {
    return (
        <Link href={p.link} className="flex h-full items-center justify-center">
            <p className="open-sans text-primary-white whitespace-nowrap text-xs font-light uppercase">{p.title}</p>
        </Link>
    )
}
export default NavbarBtn
