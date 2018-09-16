<template>
  <div class="flex-column vfull">
    <div class="pad flex-row">
      <input v-model="search" placeholder="search" class="marginr theme-mid">
      <button @click="$router.push('/')">+</button>
    </div>

    <div class="flex-one scrolly">
      <ul class="">
        <li v-for="(row, i) in filteredRows" :key="i" v-if="i !== rows.length - 1" class="theme-mid shadow entry">
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
      rows: [],
      search: ''
    }
  },
  computed: {
    filteredRows () {
      if (this.search) {
        const q = this.search.toLowerCase()
        return this.rows
          .filter(r => JSON.stringify(r).toLowerCase().includes(q))
      } else {
        return this.rows
      }
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
}
</style>
