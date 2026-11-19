import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Called by the backend after every admin change so cached pages refresh immediately.
export async function POST(req: NextRequest) {
  if (!process.env.REVALIDATE_SECRET || req.headers.get("x-revalidate-secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { tags } = (await req.json().catch(() => ({}))) as { tags?: string[] };
  for (const tag of tags ?? []) {
    revalidateTag(tag, "max"); // Next 15 or older: revalidateTag(tag)
  }
  return NextResponse.json({ revalidated: true, tags: tags ?? [] });
}
