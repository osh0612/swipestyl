import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setView('check-email')
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/dashboard')
    router.refresh()
  }

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/update-password`,
    })
    setView('check-email')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {view === 'check-email' ? (
        <p className="text-center text-foreground">
          Check your email for the confirmation link.
        </p>
      ) : (
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={
            view === 'sign-in'
              ? handleSignIn
              : view === 'forgot-password'
              ? handlePasswordReset
              : handleSignUp
          }
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          {view !== 'forgot-password' && (
            <>
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
              />
            </>
          )}
          {view === 'sign-in' && (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Sign In
              </button>
              <p className="text-sm text-center">
                Don't have an account?
                <button
                  type="button"
                  className="ml-1 underline"
                  onClick={() => setView('sign-up')}
                >
                  Sign Up Now
                </button>
              </p>
              <p className="text-sm text-center">
                <button
                  type="button"
                  className="underline"
                  onClick={() => setView('forgot-password')}
                >
                  Forgot your password?
                </button>
              </p>
            </>
          )}
          {view === 'sign-up' && (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  type="button"
                  className="ml-1 underline"
                  onClick={() => setView('sign-in')}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
          {view === 'forgot-password' && (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Reset Password
              </button>
              <p className="text-sm text-center">
                Remembered your password?
                <button
                  type="button"
                  className="ml-1 underline"
                  onClick={() => setView('sign-in')}
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  )
}
