// This is a Next.js App Router API route (Edge or Server)
// Adjust for Pages Router if needed

export async function POST(req: Request) {
  const data = await req.json();

  console.log('Mock received listing:', data);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
