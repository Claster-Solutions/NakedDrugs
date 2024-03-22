interface ClasterConfig {
    websiteRootUrl: string
    gitRepoSignature: string
    emailRecipients: {
        name: string
        email: string
    }[]
}

const clasterConfig: ClasterConfig = {
    websiteRootUrl: 'https://naked-drugs.web.app',
    gitRepoSignature: '',
    emailRecipients: [],
}
export default clasterConfig
