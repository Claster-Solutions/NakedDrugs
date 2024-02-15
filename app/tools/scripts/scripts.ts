const validateEmailPasswordFields = (email: string, password: string) => {
    if (email === '' || password === '') {
        return false
    }
    return true
}

const scripts = {
    validateEmailPasswordFields
}
export default scripts
