<template>
  <option-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OptionDetail from './components/OptionDetail.vue'

@Component({
  name: 'ManageUserContact',
  components: {
    OptionDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
