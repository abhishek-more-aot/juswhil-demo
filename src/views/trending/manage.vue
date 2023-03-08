<template>
  <trending-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TrendingDetail from './components/TrendingDetail.vue'

@Component({
  name: 'ManageTrending',
  components: {
    TrendingDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
