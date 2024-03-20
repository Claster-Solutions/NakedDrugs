import Compress from 'compress.js'

const validateSignUpFields = (name: string, email: string, password: string, password2: string) => {
    if (name === '' || email === '' || password === '' || password === password2) {
        return false
    }
    return true
}

const validateLogInFields = (email: string, password: string) => {
    if (email === '' || password === '') {
        return false
    }
    return true

}

const generateRandomID = (): string => {
    let randomID = ''
    const length = 10
    for (let i = 0; i < length; i++) {
        randomID += Math.floor(Math.random() * 10)
    }
    return randomID
}
const resizeImage = async (file: File, maxWidth: number) => {
    const compress = new Compress()
    const resizedImage = await compress.compress([file], {
        size: 2, // the max size in MB, defaults to 2MB
        quality: 0.9, // the quality of the image, max is 1,
        maxWidth: maxWidth, // the max width of the output image, defaults to 1920px
        maxHeight: maxWidth, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
    })
    const img = resizedImage[0]
    const base64str = img.data
    const imgExt = img.ext
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
    return resizedFiile
}

const scripts = {
    validateSignUpFields,
    validateLogInFields,
    generateRandomID,
    resizeImage,
}
export default scripts
