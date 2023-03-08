<template>
  <state-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StateDetail from './components/StateDetail.vue'

@Component({
  name: 'Managezipcode',
  components: {
    StateDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
