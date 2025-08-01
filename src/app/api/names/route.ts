import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for names
const names: { firstName: string; lastName: string }[] = [];

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName } = await request.json();
    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First and last name required' }, { status: 400 });
    }
    names.push({ firstName, lastName });
    return NextResponse.json({ message: 'Name added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(names);
}