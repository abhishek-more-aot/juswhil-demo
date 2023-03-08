<template>
  <award-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AwardDetail from './components/AwardDetail.vue'

@Component({
  name: 'ManageNews',
  components: {
    AwardDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
