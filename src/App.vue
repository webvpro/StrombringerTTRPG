<template>
  <div class="h-full w-full flex flex-col flex-nowrap flex-grow">
    <header class="bg-indigo-900 shadow">
     <PageHeader />
    </header>
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/stores/firebase/'
import PageHeader from '@/components/PageHeader.vue'
export default {
 components: { PageHeader },
  setup() {
    const { uid, signInWithGoogle, signOut, user } = useAuth()
    return {
      signInWithGoogle,
      signOut,
      uid,
      user
    }
  },
}
</script>