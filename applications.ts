
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../server/storage';
import { insertApplicationSchema } from '../shared/schema';
import { z } from 'zod';

export async function GET() {
  try {
    const applications = await storage.getApplications();
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertApplicationSchema.parse(body);
    const application = await storage.createApplication(validatedData);
    return NextResponse.json({ success: true, application });
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
        { success: false, message: "Failed to submit application" },
        { status: 500 }
      );
    }
  }
}
