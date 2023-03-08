<template>
  <admin-role-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminRoleDetail from './components/AdminRoleDetail.vue'

@Component({
  name: 'ManageAdminRole',
  components: {
    AdminRoleDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
