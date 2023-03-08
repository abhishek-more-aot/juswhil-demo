<template>
  <notifications-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NotificationsDetail from './components/NotificationsDetail.vue'

@Component({
  name: 'ManageLocation',
  components: {
    NotificationsDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
