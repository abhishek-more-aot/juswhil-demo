<template>
  <news-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NewsDetail from './components/NewsDetail.vue'

@Component({
  name: 'ManageNews',
  components: {
    NewsDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
