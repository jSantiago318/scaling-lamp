import './styles/globals.css'

import { useEffect, useState } from 'react'

import Auth from './screens/Auth'
import Home from './screens/Home'
import { Session } from 'inspector'
import {supabase} from '../supabaseClient'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
const localEmail = localStorage.getItem('emailData')
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session  )
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
    // auth
    <Auth />
  )
  }
  else {
    return (
      <Home/>
    )
  }
}
 