import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/blog called')
    
    try {
      const db = await getDatabase()
      console.log('Database connection established for blog')
      
      const collection = db.collection('blog_posts')
      console.log('Blog collection accessed')
      
      const { searchParams } = new URL(request.url)
      const published = searchParams.get('published')
      const slug = searchParams.get('slug')
      const limit = parseInt(searchParams.get('limit') || '10')
      const skip = parseInt(searchParams.get('skip') || '0')

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
    } catch (dbError) {
      console.error('Database error in blog API:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası: ' + (dbError as Error).message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazıları getirilirken hata oluştu: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/blog called')
    
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    console.log('Admin user from token:', admin)
    
    if (!admin) {
      console.log('Unauthorized access attempt to blog creation')
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
    
    console.log('Blog post data received:', { title, slug })
    
    // Validation
    if (!title || !content || !slug) {
      console.log('Validation failed:', { title, content, slug })
      return NextResponse.json(
        { error: 'Başlık, içerik ve slug alanları zorunludur' },
        { status: 400 }
      )
    }

    try {
      const db = await getDatabase()
      console.log('Database connection established for blog post creation')
      
      const collection = db.collection('blog_posts')
      console.log('Blog collection accessed for creation')
      
      // Slug unique kontrolü
      const existingPost = await collection.findOne({ slug })
      if (existingPost) {
        console.log('Slug already exists:', slug)
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
      
      console.log('Blog post created successfully:', result.insertedId)

      return NextResponse.json({
        success: true,
        postId: result.insertedId,
        message: 'Blog yazısı başarıyla oluşturuldu!'
      })
    } catch (dbError) {
      console.error('Database error in blog post creation:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası: ' + (dbError as Error).message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulurken hata oluştu: ' + (error as Error).message },
      { status: 500 }
    )
  }
}
