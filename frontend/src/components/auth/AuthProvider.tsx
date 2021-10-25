import firebase from 'firebase/compat/app'
import { useRouter } from 'next/router'
import { FC, createContext, useEffect, useState } from 'react'

import { auth } from '../../utils/firebase'

type AuthContextProps = {
  currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >(undefined)

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      setCurrentUser(user)
      if (user) {
        // ログイン済みのユーザー情報があるかをチェック
        const userDoc = await firebase.firestore().doc(`user/${user.uid}`).get()
        if (!userDoc.exists) {
          //docがなければ作る
          userDoc.ref.set({
            name: user.displayName,
            avatarUrl: user.photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            email: user.email,
          })
        }
      } else {
        if (router.pathname === '/' || router.pathname === '/signup') {
          return
        }
        router.push('/signin')
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
