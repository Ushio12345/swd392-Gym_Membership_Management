import { NextResponse } from "next/server"

// Mock data based on your API response structure
const mockPackages = [
  {
    id: 3,
    name: "Center C Bowling Special",
    description: "Weekend bowling access with equipment included",
    price: 800000,
    durationMonths: 1,
    isActive: true,
    createdAt: "2025-08-20T17:48:50.1234567",
    centerId: 3,
    centerName: "Center C",
  },
  {
    id: 4,
    name: "Center D Ultimate Package",
    description: "24/7 gym access + unlimited bowling for 6 months",
    price: 5500000,
    durationMonths: 6,
    isActive: true,
    createdAt: "2025-08-20T17:49:00.9876543",
    centerId: 4,
    centerName: "Center D",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockPackages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}