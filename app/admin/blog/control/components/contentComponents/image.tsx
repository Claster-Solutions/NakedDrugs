import fb from '@/app/tools/firebase/queries'
import scripts from '@/app/tools/scripts/scripts'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    index: number
    object: BlogEvent
    setObject: Dispatch<SetStateAction<BlogEvent>>
}

export default function Image(p: Props) {
    const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
    const [uploadedToFirebase, setUploadedToFirebase] = useState<boolean>(
        (p.object.content[p.index] as ContentImage).id !== '',
    )

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        setUploadedToFirebase(false)
        const selectedFile = event.target.files[0]

        //* Create a Blob from the selected file
        const blob = new Blob([selectedFile], { type: selectedFile.type })
        setSelectedImage(blob)

        //* Upload to firebse with random id
        const id = `events/${p.object.id}/${scripts.generateRandomID()}`
        const resizedFile = await scripts.resizeImage(blob as File, 800)
        await fb.setImage(resizedFile, id)

        //* Setting the content component
        const newContent: Content[] = [...p.object.content]
        const newContentImage = newContent[p.index] as ContentImage
        newContentImage.id = id
        newContent[p.index] = newContentImage
        p.setObject({
            ...p.object,
            content: newContent,
        })

        setUploadedToFirebase(true)
    }

    const handleAltChange = (e: any) => {
        //* Getting content component
        const newContent: Content[] = [...p.object.content]
        const newContentImage = newContent[p.index] as ContentImage

        //* Changing the content component
        newContentImage.alt = e.target.value
        newContent[p.index] = newContentImage

        //* Setting the content component
        p.setObject({
            ...p.object,
            content: newContent,
        })
    }

    const loadingStatusIcon = () => {
        if (!uploadedToFirebase && selectedImage) {
            return <p>loading</p>
        } else if (uploadedToFirebase) {
            return <p className="text-green">✔</p>
        } else {
            return <></>
        }
    }

    return (
        <div className="bg-blueLight m-2 rounded p-3 pt-5">
            <div className="flex flex-col gap-4 pl-4">
                {uploadedToFirebase && (
                    <img
                        src={fb.getImage((p.object.content[p.index] as ContentImage).id)}
                        width="20%"
                        alt="uploaded"
                    />
                )}

                <div className="m-1 flex w-full items-center gap-3 ">
                    {loadingStatusIcon()}
                    <input
                        className="bg-blueLight rounded "
                        type="file"
                        accept=".webp"
                        onChange={(e) => {
                            handleImageChange(e)
                        }}
                    />
                </div>
            </div>
            <div className="bg-blueLight m-1 flex w-full flex-col items-start gap-2 rounded p-2">
                <p className="ml-1 w-20 whitespace-nowrap">Alt</p>
                <input
                    className="w-full rounded p-1 text-lg"
                    placeholder={'Alt'}
                    type="text"
                    value={(p.object.content[p.index] as ContentImage).alt}
                    onChange={(e) => {
                        handleAltChange(e)
                    }}
                />
            </div>
        </div>
    )
}
