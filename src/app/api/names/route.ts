import { NextRequest, NextResponse } from 'next/server';
import { addName, getAllNames } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName } = await request.json();
    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'First and last name required' }, { status: 400 });
    }
    
    const newName = await addName(firstName, lastName);
    return NextResponse.json({ 
      message: 'Name added successfully',
      name: newName 
    }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to add name' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const names = await getAllNames();
    return NextResponse.json(names);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch names' }, { status: 500 });
  }
}