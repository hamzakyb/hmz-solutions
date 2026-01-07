import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface BlogPost {
    _id: string
    title: string
    content: string
    excerpt: string
    featuredImage: string
    slug: string
    tags: string[]
    published: boolean
    author: string
    createdAt: string
    updatedAt: string
    views: number
    seoTitle?: string
    seoDescription?: string
}

async function getPost(slug: string): Promise<BlogPost | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        const response = await fetch(`${baseUrl}/api/blog?slug=${slug}&published=true`, {
            cache: 'no-store'
        })

        if (!response.ok) return null

        const data = await response.json()
        return data.posts && data.posts.length > 0 ? data.posts[0] : null
    } catch (error) {
        console.error('Failed to fetch post for metadata:', error)
        return null
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPost(params.slug)

    if (!post) {
        return {
            title: 'Blog Yazısı Bulunamadı | HMZ Solutions',
            description: 'Aradığınız blog yazısı bulunamadı.',
        }
    }

    const title = post.seoTitle || post.title
    const description = post.seoDescription || post.excerpt
    const url = `https://hmzsolutions.com/blog/${post.slug}`

    return {
        title: `${title} | HMZ Solutions Nevşehir Blog`,
        description: description,
        keywords: [
            ...post.tags,
            'nevşehir teknoloji',
            'kapadokya yazılım',
            'hmz solutions blog',
            'web geliştirme',
            'dijital dönüşüm'
        ],
        authors: [{ name: post.author }],
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
            url: url,
            siteName: 'HMZ Solutions Nevşehir',
            locale: 'tr_TR',
            images: post.featuredImage ? [
                {
                    url: post.featuredImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: post.featuredImage ? [post.featuredImage] : [],
        },
        alternates: {
            canonical: url,
        },
        other: {
            'article:author': post.author,
            'article:published_time': post.createdAt,
            'article:modified_time': post.updatedAt,
            'article:section': post.tags[0] || 'Teknoloji',
        }
    }
}

export default function BlogPostPage() {
    return <BlogPostClient />
}
