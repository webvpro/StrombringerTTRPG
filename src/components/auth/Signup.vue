<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
         <router-link class="mx-auto w-auto text-center" to="/">
            <v-icon class="rounded-full bg-purple-600 border-2 p-1" name="gi-magic-portal" label="TTP Overlays" scale="5" fill="#fff" />
        </router-link>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new free account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a href="/login" class="font-medium text-purple-600 hover:text-purple-500">
            Sign with my account
          </a>
        </p>
      </div>
      <div>
        <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="googleSignIn">
          Login with Google
        </button>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />
        <span v-if="message" class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {{message}}
        </span>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model='email'/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model='password'/>
          </div>
        </div>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-purple-500 group-hover:text-purple-400" aria-hidden="true" />
            </span>
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
        getAuth,
        createUserWithEmailAndPassword,
        GoogleAuthProvider 
        } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { LockClosedIcon } from '@heroicons/vue/solid'
export default {
   components: {
    LockClosedIcon,
  },
  setup() {
    const auth = getAuth()
    const router = useRouter()
    const provider = new GoogleAuthProvider()
    const message = ref(null);
    const handleSubmit = async e => {
      const { email, password } = e.target.elements
      message.value = null
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        router.push('/')
      } catch (e) {
        message.value = e.message
      }
    };
     
    const googleSignIn = () => {
      signInWithRedirect(auth, provider).then(
        router.push('/')
      )
    }  
    return { handleSubmit, googleSignIn, message}
  },
};
</script>