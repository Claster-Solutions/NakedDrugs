/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://naked-drugs.web.app.cz',
    outDir: './out',
    exclude: ['/admin', '/admin/**', '/admin/**/**', '/admin/**/**/**'],
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin', '/admin/**', '/admin/**/**', '/admin/**/**/**'],
            },
        ],
    },

    // ...other options
}
