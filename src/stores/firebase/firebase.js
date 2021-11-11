import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

export const initializeApp = (options) => {
  if (Firebase.apps.length > 0) {
    return
  }

  Firebase.initializeApp(options.config)

  if (options.persistence) {
    Firebase.firestore().enablePersistence()
  }
}

export function useFirebase() {
  return {
    firebase: Firebase,
    firestore: Firebase.firestore(),
    auth: Firebase.auth(),
  }
}