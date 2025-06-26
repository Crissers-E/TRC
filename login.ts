
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../server/storage';
import { adminLoginSchema } from '../../shared/schema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = adminLoginSchema.parse(body);
    const user = await storage.getUserByUsername(username);
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Login failed" },
        { status: 500 }
      );
    }
  }
}
