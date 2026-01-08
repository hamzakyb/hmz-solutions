import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    // 1. Check for Environment Variable
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN is missing in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error: BLOB_READ_WRITE_TOKEN is missing.' },
        { status: 500 }
      );
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate the user
        // Note: handleUpload provides a standard Request, but we can pass it to requireAuth
        // we might need to cast or adapt it since requireAuth expects NextRequest
        const admin = requireAuth(request as any);
        if (!admin) {
          console.error('Upload unauthorized: No valid admin token found.');
          throw new Error('Unauthorized');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            userId: admin.email,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed:', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}