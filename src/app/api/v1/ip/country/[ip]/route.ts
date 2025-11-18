import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  return new NextResponse("DK");
}
