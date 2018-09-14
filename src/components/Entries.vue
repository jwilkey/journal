<template>
  <div class="flex-column vfull">
    <div class="pad">
      <button @click="$router.push('/')">+</button>
    </div>

    <div class="flex-one scrolly">
      <ul class="pad">
        <li v-for="(row, i) in rows" :key="i" v-if="i !== 0" class="theme-mid shadow entry">
          <p class="muted">{{formattedDate(row[0])}}</p>
          <p>{{row[1]}}</p>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import google from '@/js/google'

export default {
  name: 'Entries',
  data () {
    return {
      rows: []
    }
  },
  methods: {
    getSheet () {
      const self = this
      google.getSheet()
        .then(r => {
          self.rows = r.result.values.reverse()
        })
    },
    formattedDate (dateString) {
      return new Date(dateString).toLocaleString()
    }
  },
  mounted () {
    this.getSheet()
  }
}
</script>

<style lang="less">
@import '../assets/less/common';

.entry {
  .marginb;
  .pad;
  .rounded;
}
</style>
