import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const admin = requireAuth(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'image.png';

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is missing');
      return NextResponse.json(
        { error: 'Vercel Blob Token bulunamadı. Lütfen Vercel panelinden yapılandırın.' },
        { status: 500 }
      );
    }

    if (!request.body) {
      return NextResponse.json({ error: 'Body is required' }, { status: 400 });
    }

    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Yükleme başarısız oldu: ' + (error as Error).message }, { status: 500 });
  }
}