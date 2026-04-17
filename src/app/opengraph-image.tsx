import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Chand Mandru — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#0a0a1a',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* blue glow orb (top-left) */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'rgba(96, 165, 250, 0.35)',
            filter: 'blur(80px)',
          }}
        />
        {/* violet glow orb (bottom-right) */}
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'rgba(124, 58, 237, 0.30)',
            filter: 'blur(80px)',
          }}
        />

        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #7c3aed 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
          }}
        >
          Chand Mandru
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 48,
            fontWeight: 400,
            color: '#a3a3a3',
            display: 'flex',
          }}
        >
          Software Developer
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 96,
            fontSize: 24,
            color: '#737373',
            display: 'flex',
          }}
        >
          chandmandru.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
