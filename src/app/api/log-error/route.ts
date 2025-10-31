import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();
    
    // Add server-side context
    const logEntry = {
      ...errorData,
      serverTimestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || 'unknown',
      host: request.headers.get('host') || 'unknown'
    };

    // Log to console (in production, you might want to send to a logging service)
    console.error('Frontend Error Log:', JSON.stringify(logEntry, null, 2));

    // In production, you could send this to external logging services like:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - CloudWatch
    // - Custom logging endpoint
    
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to external logging service
      // await fetch(process.env.LOGGING_ENDPOINT, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error logging failed:', error);
    return NextResponse.json(
      { error: 'Failed to log error' }, 
      { status: 500 }
    );
  }
}