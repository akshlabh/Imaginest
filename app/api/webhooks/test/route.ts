import { NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action"; // adjust path if needed

export async function POST(req: Request) {
  try {
    console.log("📦 Receiving POST request to create user...");

    // Simulate incoming user data (replace with real values or pull from req.body if dynamic)
    const userData = {
      clerkId: "test_clerk_001",
      email: "testuser@example.com",
      username: "testuser",
      photo: "https://example.com/testuser.jpg",
      firstName: "Test",
      lastName: "User",
    };

    console.log("📤 Attempting to create user:", userData);

    const newUser = await createUser(userData);

    console.log("✅ User successfully created:", newUser);

    return NextResponse.json({
      message: "User created and saved to MongoDB successfully!",
      user: newUser,
    });
  } catch (error: any) {
    console.error("❌ Error during user creation:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      codeName: error.codeName,
    });

    return NextResponse.json(
      {
        error: "User creation failed",
        details: {
          name: error.name,
          message: error.message,
          code: error.code,
          codeName: error.codeName,
        },
      },
      { status: 500 }
    );
  }
}
