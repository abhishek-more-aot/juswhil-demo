<template>
  <unit-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UnitDetail from './components/UnitDetail.vue'

@Component({
  name: 'ManageCboDetail',
  components: {
    UnitDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
