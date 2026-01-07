import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const section = searchParams.get('section')

        const db = await getDatabase()
        const collection = db.collection('site_content')

        if (section) {
            const content = await collection.findOne({ section })
            return NextResponse.json({ content })
        }

        const allContent = await collection.find({}).toArray()
        return NextResponse.json({ content: allContent })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const admin = requireAuth(request)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { section, data } = await request.json()
        if (!section || !data) {
            return NextResponse.json({ error: 'Section and data are required' }, { status: 400 })
        }

        const db = await getDatabase()
        const collection = db.collection('site_content')

        const result = await collection.updateOne(
            { section },
            {
                $set: {
                    data,
                    updatedAt: new Date(),
                    updatedBy: admin.email
                }
            },
            { upsert: true }
        )

        return NextResponse.json({
            success: true,
            message: `${section} content updated successfully`,
            result
        })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
