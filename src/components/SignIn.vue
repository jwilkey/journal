<template>
  <div class="vfull">
    <div class="pad flex-column vfull flex-center text-center">
      <button :disabled="!gapiLoaded" @click="signIn">Sign In</button>
    </div>
  </div>
</template>

<script>
import google from '@/js/google'

export default {
  name: 'sign-in',
  data () {
    return {
      gapiLoaded: false
    }
  },
  methods: {
    signIn () {
      const self = this
      google.signIn()
        .then(r => {
          self.$router.push('/entries')
        })
    }
  },
  mounted () {
    const self = this
    google.initialize()
      .then(() => {
        if (google.isSignedIn()) {
          self.$router.push('/entries')
        } else {
          self.gapiLoaded = true
        }
      })
      .catch(e => {
        console.error(e)
      })
  }
}
</script>
