<template>
  <arrivals-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArrivalsDetail from './components/ArrivalsDetail.vue'

@Component({
  name: 'ManageArrivals',
  components: {
    ArrivalsDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
