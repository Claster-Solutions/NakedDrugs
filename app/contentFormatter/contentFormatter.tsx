import ContentHeader1 from './components/ContentHeader1'
import ContentList from './components/ContentList'
import ContentParagraph from './components/ContentParagraph'
import ContentSingleImage from './components/ContentSingleImage'

interface Props {
    content: Content[]
}

const ContentFormatter = (p: Props) => {
    return (
        <div className="flex w-full flex-col">
            {p.content.map((content, index) => (
                <Content {...content} key={index} />
            ))}
        </div>
    )
}
export default ContentFormatter

const Content = (content: Content) => {
    switch (content.type) {
        case 101:
            return <ContentHeader1 data={content} />

        case 200:
            return <ContentParagraph data={content} />
        case 300:
            return <ContentSingleImage data={content} />
        case 401:
            return <ContentList data={content} />
    }
}
