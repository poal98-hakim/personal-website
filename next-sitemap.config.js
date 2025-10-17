/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hakimabdelcadir.vercel.app';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true, // creates robots.txt
  sitemapSize: 5000, // splits large sitemaps automatically
};
