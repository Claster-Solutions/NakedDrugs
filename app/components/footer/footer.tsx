import Link from 'next/link'
import ContentWrapper from '../contentWrapper'

const Footer = () => (
  <ContentWrapper type="default" tags="shadow-all bg-hades-main">
    <Component />
  </ContentWrapper>
)
export default Footer

const Component = () => {
  return (
    <div className="bg-hades-main flex flex-col items-center justify-center gap-10 pb-24 pt-10 text-center text-white md:flex-row md:items-start md:justify-start md:text-left">
      <div className="md:pr-20 flex gap-2 flex-col">
        <div className="h-16 w-16 rounded-full bg-white"></div>
        <p>Copyright</p>
      </div>
      <div className='flex w-full gap-4 flex-row justify-between'>
        {data.map((block, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="f3 font-semibold">{block.title}</h3>
            <div className="flex flex-col gap-4">
              {block.items.map((item, index) => (
                <Link key={index} href={item.link} className=" text-lg, hover:underline">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

interface Block {
  title: string
  items: {
    title: string
    link: string
  }[]
}

const data: Block[] = [
  {
    title: 'Navigation',
    items: [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Products',
        link: '/products',
      },
      {
        title: 'About us',
        link: '/about',
      },
      {
        title: 'Blog',
        link: '/blog',
      },
    ],
  },
  {
    title: 'Contact',
    items: [
      {
        title: 'email@email',
        link: 'mailto:email@email',
      },
      {
        title: '+420 123 456 789',
        link: 'tel:+420123456789',
      },
    ],
  },
  {
    title: 'Social',
    items: [
      {
        title: 'Instagram',
        link: 'https://www.instagram.com',
      },
      {
        title: 'Facebook',
        link: 'https://www.facebook.com',
      },
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        title: 'Terms',
        link: 'https://www.instagram.com',
      },
      {
        title: 'Facebook',
        link: 'https://www.facebook.com',
      },
    ],
  }
]
