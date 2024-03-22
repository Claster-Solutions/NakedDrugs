import ContentWrapper from '../contentWrapper'

const Footer = () => (
    <ContentWrapper type="default" tags="shadow-all">
        <Component />
    </ContentWrapper>
)
export default Footer

const Component = () => {
    return (
        <>
            <div className="hidden md:block">{Desktop()}</div>
            <div className="block md:hidden">{Mobile()}</div>
        </>
    )
}

const Desktop = () => {
    return (
        <div className="flex w-full gap-36 pt-12 text-black">
            <div>footer</div>
            <div>footer</div>
            <div>footer</div>
            <div>footer</div>
            <div>footer</div>
            <div>footer</div>
            <div>footer</div>
        </div>
    )
}

const Mobile = () => {
    return <div className="flex flex-col gap-2"></div>
}
