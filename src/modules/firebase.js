import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { reactive, computed, onMounted, onUnmounted, toRefs } from 'vue'
import firebaseConfig from '../../firebase.config'


export const state = reactive({
    user: null,
    error: false,
    loading: true
  });


export const firebaseApp = initializeApp(firebaseConfig.config);


export const getUserState = () => {
  const auth = getAuth()
  return (
    new Promise((resolve, reject) =>
      onAuthStateChanged(auth, resolve, reject)
    )
  )
}

export const useAuthState = () => {
  state.user = null
  state.error = false
  state.loading = true

  const auth = getAuth()
  let unsubscribe
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => {
        state.user = u ? {...u} : null
        state.loading = false
      },
      e => {
        state.error = e
        state.loading = false
      }
    )
  })
  onUnmounted(() => unsubscribe())

  const isAuthenticated = computed(() => state.user != null)

  return { ...toRefs(state), isAuthenticated }
}


