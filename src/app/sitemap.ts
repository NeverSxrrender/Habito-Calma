import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://habito-calma.vercel.app", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://habito-calma.vercel.app/catalogo", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://habito-calma.vercel.app/espacio-calma", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://habito-calma.vercel.app/sobre-este-proyecto", lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: "https://habito-calma.vercel.app/avisos-legales", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]
}
