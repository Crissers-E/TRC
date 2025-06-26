
import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../server/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const application = await storage.getApplication(id);
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const deleted = await storage.deleteApplication(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: "Application deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete application" },
      { status: 500 }
    );
  }
}
