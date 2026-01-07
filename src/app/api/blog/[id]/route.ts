import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Resolve the params promise
    const { id } = await context.params;
    
    const db = await getDatabase()
    const collection = db.collection('blog_posts')
    
    const post = await collection.findOne({ 
      _id: new ObjectId(id) 
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      )
    }

    // View count artır
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    )

    return NextResponse.json({
      post: {
        ...post,
        _id: post._id.toString()
      }
    })

  } catch (error) {
    console.error('Blog post fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Resolve the params promise
    const { id } = await context.params;
    
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

    const db = await getDatabase()
    const collection = db.collection('blog_posts')

    // Slug unique kontrolü (kendisi hariç)
    if (slug) {
      const existingPost = await collection.findOne({ 
        slug, 
        _id: { $ne: new ObjectId(id) } 
      })
      if (existingPost) {
        return NextResponse.json(
          { error: 'Bu slug zaten kullanılıyor' },
          { status: 400 }
        )
      }
    }

interface UpdateData {
  updatedAt: Date
  title?: string
  content?: string
  excerpt?: string
  featuredImage?: string
  slug?: string
  tags?: string[]
  published?: boolean
  seoTitle?: string
  seoDescription?: string
}

    const updateData: Partial<UpdateData> = {
      updatedAt: new Date()
    }

    if (title) updateData.title = title
    if (content) updateData.content = content
    if (excerpt) updateData.excerpt = excerpt
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage
    if (slug) updateData.slug = slug
    if (tags) updateData.tags = tags
    if (published !== undefined) updateData.published = published
    if (seoTitle) updateData.seoTitle = seoTitle
    if (seoDescription) updateData.seoDescription = seoDescription

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Blog yazısı başarıyla güncellendi!'
    })

  } catch (error) {
    console.error('Blog post update error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Resolve the params promise
    const { id } = await context.params;
    
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const collection = db.collection('blog_posts')

    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Blog yazısı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Blog yazısı başarıyla silindi!'
    })

  } catch (error) {
    console.error('Blog post deletion error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı silinirken hata oluştu' },
      { status: 500 }
    )
  }
}