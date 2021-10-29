import firebase from 'firebase/compat/app'

require('firebase/firestore')

export type Face = {
  anger: number
  anxios: number
  confidence: number
  contempt: number
  disgust: number
  fear: number
  happiness: number
  honest: number
  leadership: number
  narvous: number
  sadness: number
  surprise: number
}

export const signOut = () => {
  firebase.auth().signOut()
}

export const addInterview = (face: Face) => {
  const user = firebase.auth().currentUser
  const db = firebase.firestore()
  if (!user) {
    return
  }
  db.collection(`user/${user.uid}/interview`)
    .add(face)
    .then(docRef => {
      console.warn(docRef)
    })
    .catch(error => {
      console.error('Error adding document: ', error)
      return null
    })
}
