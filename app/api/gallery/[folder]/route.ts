import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED = new Set([
  'private-charter-images',
  'corporate-charter-images',
  'wedding-on-sun-goddess',
  'wedding-on-mermaid-spirit',
  'valentines-day-images',
]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string }> },
) {
  const { folder } = await params;

  if (!ALLOWED.has(folder)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const dir = path.join(process.cwd(), 'public', folder);

  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort()
      .map((f) => `/${folder}/${f}`);

    return NextResponse.json({ images: files });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
