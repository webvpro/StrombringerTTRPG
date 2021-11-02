<template>
  <div class="h-full w-full flex flex-col flex-nowrap flex-grow">
    <SkeletonLoader v-if="loading" />
    <header class="bg-indigo-900 shadow">
     <PageHeader />
    </header>
    <div class="flex-grow flex flex-col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useAuthState } from '@/modules/firebase'
import PageHeader from '@/components/PageHeader.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
export default {
 components: { PageHeader, SkeletonLoader },
  setup() {
    const {user, error, loading, isAuthenicated } = useAuthState()
    return {
      user,
      error,
      isAuthenicated,
      loading
    }
  },
}
</script>