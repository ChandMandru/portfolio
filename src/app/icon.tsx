import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
          borderRadius: 6,
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
