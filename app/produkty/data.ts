export interface Product {
    id: string
    name: string
    price: Price[]
    description: string
    img: string
}
export interface Price {
    volume: string
    price: string
}

export const Products: Product[] = [
    {
        id: 'kratom_green',
        name: 'Kratom',
        price: [
            {
                volume: '25g',
                price: '100 Kč',
            },
            {
                volume: '50g',
                price: '200 Kč',
            },
            {
                volume: '100g',
                price: '300 Kč',
            },
            {
                volume: '200g',
                price: '500 Kč',
            },
            {
                volume: '500g',
                price: '1500 Kč',
            },
            {
                volume: '1000 g',
                price: '2500 Kč',
            },
        ],
        description: 'Sometimes the leaves are smoked or eaten in food.',
        img: '',
    },
    {
        id: 'kratom_red',
        name: 'Kratom',
        price: [
            {
                volume: '25g',
                price: '100 Kč',
            },
            {
                volume: '50g',
                price: '200 Kč',
            },
            {
                volume: '100g',
                price: '300 Kč',
            },
            {
                volume: '200g',
                price: '500 Kč',
            },
            {
                volume: '500g',
                price: '1500 Kč',
            },
            {
                volume: '1000 g',
                price: '2500 Kč',
            },
        ],
        description: 'Sometimes the leaves are smoked or eaten in food.',
        img: '',
    },
    {
        id: 'kratom_white',
        name: 'Kratom',
        price: [
            {
                volume: '25g',
                price: '100 Kč',
            },
            {
                volume: '50g',
                price: '200 Kč',
            },
            {
                volume: '100g',
                price: '300 Kč',
            },
            {
                volume: '200g',
                price: '500 Kč',
            },
            {
                volume: '500g',
                price: '1500 Kč',
            },
            {
                volume: '1000 g',
                price: '2500 Kč',
            },
        ],

        description: 'Sometimes the leaves are smoked or eaten in food.',
        img: '',
    },
    {
        id: 'kratom_yellow',
        name: 'Kratom',
        price: [
            {
                volume: '25g',
                price: '100 Kč',
            },
            {
                volume: '50g',
                price: '200 Kč',
            },
            {
                volume: '100g',
                price: '300 Kč',
            },
            {
                volume: '200g',
                price: '500 Kč',
            },
            {
                volume: '500g',
                price: '1500 Kč',
            },
            {
                volume: '1000 g',
                price: '2500 Kč',
            },
        ],
        description: 'Sometimes the leaves are smoked or eaten in food.',
        img: '',
    },
]
