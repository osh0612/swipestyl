import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  // Check if the email belongs to the organization
  const { data: orgMember, error: orgError } = await supabase
    .from('organization_members')
    .select('email')
    .eq('email', email)
    .single()

  if (orgError || !orgMember) {
    return NextResponse.json({ error: 'Email not authorized for signup' }, { status: 403 })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Check your email to confirm your account' })
}
