<template>
  <div class="home flex-column vfull">
    <div class="pad">
      <button @click="signIn" class="marginr">signin</button>
      <button @click="$router.push('/entries')" class="">entries</button>
    </div>

<div class="flex-one pad">
    <div class="theme-mid pad rounded shadow">
      <form @submit.prevent="submit">
        <div id="content" contenteditable="true" class="pad muted-border" autofocus="true"></div>
        <div class="pad"></div>
        <button class="hfull">done</button>
      </form>

    </div>
</div>
  </div>
</template>

<script>
import { formUrl } from '@/config'
import google from '@/js/google'

export default {
  name: 'home',
  data () {
    return {
      content: undefined
    }
  },
  methods: {
    getContentElement () {
      return this.$el.querySelector('#content')
    },
    submit () {
      this.content = this.getContentElement().textContent
      if (!this.content.trim()) {
        return
      }

      const words = this.content.split(' ')
      const people = words.filter(w => w.startsWith('@')).join(',').replace(/@/g, '')
      const places = words.filter(w => w.startsWith('&')).join(',').replace(/&/g, '')
      const tags = words.filter(w => w.startsWith('#')).join(',').replace(/#/g, '')

      var formData = new FormData()
      formData.append('entry.422271319', this.content)
      formData.append('entry.1871407663', people)
      formData.append('entry.1996090571', places)
      formData.append('entry.1319021338', tags)

      const self = this
      fetch(formUrl, { method: 'POST', body: formData })
        .then(r => {
          self.getContentElement().textContent = ''
        })
        .catch(e => {
          console.log(e)
        })
    },
    signIn () {
      google.signIn()
    }
  }
}
</script>
