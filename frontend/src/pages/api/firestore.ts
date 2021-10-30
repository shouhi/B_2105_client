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

export type Emotions = {
  anger: number
  contempt: number
  disgust: number
  fear: number
  happiness: number
  sadness: number
  surprise: number
}

export type Impressions = {
  anxious: number
  confidence: number
  honest: number
  leadership: number
  nervous: number
  feaniceCoworkerr: number
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

// export const getResultMeotions = () => {
//   const db = firebase.firestore()
//   db.collection(`user/xmkjt589JgTbhbOUlVCvvLh6ILO2/interview`)
//     .doc('X7VvOEU9JxKbU7cLDBfw')
//     .get()
//     .then(Emotions: data => {
//       console.log(data.ref.)
//     })
// }
