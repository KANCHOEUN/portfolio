export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createPublicNotionClient } from '@/lib/public-notion-client';

const notion = createPublicNotionClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
  }

  try {
    const recordMap = await notion.getPage(pageId);
    return NextResponse.json({ recordMap });
  } catch (err) {
    console.error('Error fetching Notion content:', err);
    return NextResponse.json({ error: 'Failed to fetch Notion content' }, { status: 500 });
  }
}
