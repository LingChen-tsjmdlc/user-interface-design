// app/sitemap.js
export default function sitemap() {
  const baseUrl = 'https://lingchen-tsjmdlc.github.io/user-interface-design/';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}