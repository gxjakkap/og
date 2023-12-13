import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'

 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
 
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Error';

    const interMedFontData = await fetch(
        new URL('../../assets/Inter-Medium.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer())

    const image = await fetch(new URL('../../assets/g.png', import.meta.url)).then(
      (res) => res.arrayBuffer(),
    )
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to right top, rgb(212, 212, 216), rgb(207, 250, 254), rgb(212, 212, 216))',
          }}
        >
          <div tw='flex flex-col w-full h-full'>
            <h1 tw='mx-auto my-auto text-9xl text-slate-900' style={{ fontFamily: 'Inter', fontWeight: 'bold'}} >{title}</h1>
            <div tw='flex self-end'>
                <img width={36} height={36} src={image as any} tw='mr-3 mt-1' />
                <span tw='text-2xl mb-10 mr-10' style={{ fontFamily: 'Inter', fontWeight: 'lighter'}} >g;ode Project</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
            {
              name: 'Inter',
              data: interMedFontData,
              style: 'normal',
            }
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}