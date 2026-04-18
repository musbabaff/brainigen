import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Brainigen - The Ultimate AI Agent Platform';
      
    const description = searchParams.get('desc') || 'Build, deploy, and manage AI workflows effortlessly.';
    const type = searchParams.get('type') || 'default'; // default, blog, service

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#030014',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a2e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a2e 2%, transparent 0%)',
              backgroundSize: '100px 100px',
              opacity: 0.5,
            }}
          />

          {/* Logo / Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
              backgroundColor: '#5B4FE9',
              padding: '12px 24px',
              borderRadius: '100px',
            }}
          >
            <div style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Brainigen</div>
            {type !== 'default' && (
              <>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {type}
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 32,
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {description}
          </div>

          {/* Decorative Gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(91,79,233,0.3) 0%, rgba(3,0,20,0) 70%)',
              borderRadius: '50%',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
