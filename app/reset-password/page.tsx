'use client'

import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push('/login')
    } catch (error: any) {
      setError(error.message || 'An error occurred while resetting the password')
    }
  }

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {error && <p>{error}</p>}
    </form>
  )
}
