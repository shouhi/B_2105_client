import firebase from 'firebase/compat/app'
import type { DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { FC, createContext, useEffect, useState } from 'react'

import { auth } from '../../utils/firebase'

type AuthContextProps = {
  currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })
const QuestionsContext = createContext<DocumentData>([{}])

const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >(undefined)
  const [questions, setQuestions] = useState<DocumentData>([{}])

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

        await firebase.firestore()
          .collection('questions')
          .doc("G6KSLCITWDWB80S5DFtD")
          .collection('frontend').get()
          .then((querySnapshot) => {
            setQuestions(querySnapshot.docs.map(doc => doc.data()))
          })
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
      <QuestionsContext.Provider value={{ questions }}>
        {children}
      </QuestionsContext.Provider>
    </AuthContext.Provider>
  )
}

export { AuthContext, QuestionsContext, AuthProvider }
