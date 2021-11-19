import firebase from 'firebase/compat/app'

require('firebase/firestore')

export type Face = {
  movie_id: string
  result_emotions: {
    anger: number
    contempt: number
    disgust: number
    fear: number
    happiness: number
    sadness: number
    surprise: number
  }
  result_impressions: {
    anxious: number
    confidence: number
    honest: number
    leadership: number
    nervous: number
    niceCoworker: number
  }
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
  return db
    .collection(`user/${user.uid}/interview`)
    .add(face)
    .then(docRef => {
      return docRef.id
    })
    .catch(error => {
      console.error('Error adding document: ', error)
      return null
    })
}

export const getInterviewId = () => {
  const user = firebase.auth().currentUser
  const db = firebase.firestore()
  if (!user) {
    return
  }
  return db
    .collection(`user/${user.uid}/interview`)
    .get()
    .then(snapshot => {
      const interviewId = snapshot.docs[snapshot.docs.length - 1].id
      return { interviewId }
    })
}

export const getInterviewResult = (id: string) => {
  const db = firebase.firestore()
  const InterviewRef = db.collection('interview').doc(id)
  if (!InterviewRef) {
    return
  }
  return InterviewRef.get().then(doc => {
    if (doc.exists) {
      return doc.data()
    }
    return
  })
}

export const getAllInterviewId = () => {
  const user = firebase.auth().currentUser
  const db = firebase.firestore()
  if (!user) {
    return
  }
  return db
    .collection(`user/${user.uid}/interview`)
    .get()
    .then(snapshot => {
      const interviewId = snapshot.docs.map(doc => doc.id)
      return { interviewId }
    })
}

export const getResultMeotions = () => {
  const db = firebase.firestore()

  return db
    .collection(`user/xmkjt589JgTbhbOUlVCvvLh6ILO2/interview`)
    .doc('X7VvOEU9JxKbU7cLDBfw')
    .get()
}
