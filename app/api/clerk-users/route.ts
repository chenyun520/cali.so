import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const secretKey = process.env.CLERK_SECRET_KEY

    if (!secretKey) {
      console.error('CLERK_SECRET_KEY not configured')
      return NextResponse.json(
        { error: 'Clerk secret key not configured', users: [], totalCount: 0 },
        { status: 500 }
      )
    }

    // Fetch users from Clerk API with count
    const response = await fetch('https://api.clerk.com/v1/users?limit=100&order_by=-created_at&count=true', {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Clerk API error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to fetch users from Clerk', users: [], totalCount: 0 },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Clerk API returns: { data: [...], totalCount: number }
    const users = Array.isArray(data) ? data : (data?.data || [])
    // totalCount is returned directly by Clerk API when count=true
    const totalCount = data?.totalCount ?? data?.total_count ?? users.length

    console.log('Clerk API response - users count:', users.length, 'totalCount:', totalCount)

    // Return only the data we need
    return NextResponse.json({
      users,
      totalCount,
    })
  } catch (error) {
    console.error('Error fetching Clerk users:', error)
    return NextResponse.json(
      { error: 'Internal server error', users: [], totalCount: 0 },
      { status: 500 }
    )
  }
}