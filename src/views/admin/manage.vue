<template>
  <admin-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminDetail from './components/AdminDetail.vue'

@Component({
  name: 'ManageAdmin',
  components: {
    AdminDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
