<template>
  <career-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CareerDetail from './components/CareerDetail.vue'

@Component({
  name: 'ManageNews',
  components: {
    CareerDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
