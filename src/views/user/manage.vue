<template>
  <user-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserDetail from './components/UserDetail.vue'

@Component({
  name: 'ManageUser',
  components: {
    UserDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
