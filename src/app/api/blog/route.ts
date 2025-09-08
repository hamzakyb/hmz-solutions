import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const slug = searchParams.get('slug')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = parseInt(searchParams.get('skip') || '0')

    const db = await getDatabase()
    const collection = db.collection('blog_posts')
    
interface BlogQuery {
  published?: boolean
  slug?: string
}

    const query: Partial<BlogQuery> = {}
    if (published === 'true') {
      query.published = true
    }
    if (slug) {
      query.slug = slug
    }

    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await collection.countDocuments(query)

    return NextResponse.json({ 
      posts: posts.map(post => ({
        ...post,
        _id: post._id.toString()
      })),
      total,
      hasMore: skip + limit < total
    })

  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazıları getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { 
      title, 
      content, 
      excerpt, 
      featuredImage, 
      slug, 
      tags, 
      published,
      seoTitle,
      seoDescription 
    } = await request.json()
    
    // Validation
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Başlık, içerik ve slug alanları zorunludur' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection('blog_posts')
    
    // Slug unique kontrolü
    const existingPost = await collection.findOne({ slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'Bu slug zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Blog yazısını veritabanına kaydet
    const result = await collection.insertOne({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      featuredImage: featuredImage || '',
      slug,
      tags: tags || [],
      published: published || false,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      author: admin.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0
    })

    return NextResponse.json({
      success: true,
      postId: result.insertedId,
      message: 'Blog yazısı başarıyla oluşturuldu!'
    })

  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}