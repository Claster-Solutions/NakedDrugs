import '@adyen/adyen-web/dist/adyen.css'
import Content from './content'

export default async function Page() {
    // Require the parts of the module you want to use.

    // Include your idempotence key when you make an API request.
    const data = await fetch('http://localhost:3000/api')
    const json = await data.json()

    return (
        <div>
            <Content session={json.response} />
        </div>
    )
}
