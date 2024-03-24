import Login from './components/login'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="montserrat px-28 pb-20 pt-32">
            <div className="hidden md:block">
                <Login>{children}</Login>
            </div>
            <div>
                <div className="flex flex-col gap-10 text-center md:hidden">
                    <img
                        className="pl-2"
                        src="https://claster.cz/brand/logo300x400.png"
                        alt="Claster Logo"
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className="f2 font-bold">Pozornost !</h1>
                        <p className="">
                            Nástroj pro správu je k dispozici pouze ve verzi pro
                            počítač...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
