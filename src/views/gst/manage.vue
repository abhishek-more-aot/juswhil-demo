<template>
  <gst-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GstDetail from './components/GstDetail.vue'

@Component({
  name: 'ManageAdminRole',
  components: {
    GstDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
