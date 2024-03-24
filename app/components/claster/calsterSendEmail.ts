import clasterConfig from "@/claster-config"



interface Data {
    key: string
    value: string
}

const sendClasterEmail = async (data: Data[]): Promise<boolean> => {
    const res = await fetch(`https://claster.cz/api/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            websiteRootUrl: clasterConfig.websiteRootUrl,
            recipients: clasterConfig.emailRecipients,
            data: data,
        }),
    })
    return res.status === 200
}

export default sendClasterEmail