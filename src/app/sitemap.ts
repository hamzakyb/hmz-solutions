import { MetadataRoute } from 'next'
import { getDatabase } from '@/lib/mongodb'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hmzsolutions.com'

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic blog routes
  try {
    const db = await getDatabase()
    const posts = await db.collection('blog_posts')
      .find({ published: true })
      .project({ slug: 1, updatedAt: 1 })
      .toArray()

    const blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...(staticRoutes as MetadataRoute.Sitemap), ...(blogRoutes as MetadataRoute.Sitemap)]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return staticRoutes as MetadataRoute.Sitemap
  }
}