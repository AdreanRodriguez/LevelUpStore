import { NextResponse } from "next/server";

// För error meddelanden i API routes
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

// För lyckad hämtning i API routes
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}
