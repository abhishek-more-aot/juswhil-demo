<template>
  <reason-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReasonDetail from './components/ReasonDetail.vue'

@Component({
  name: 'ManageAdminRole',
  components: {
    ReasonDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
