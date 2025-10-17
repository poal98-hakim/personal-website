/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://hakimabdelcadir.vercel.app',
  generateRobotsTxt: true, // creates robots.txt for you
  sitemapSize: 5000, // splits large sitemaps automatically
};
