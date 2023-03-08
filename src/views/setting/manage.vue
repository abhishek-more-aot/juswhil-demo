<template>
  <category-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/SettingDetail.vue'

@Component({
  name: 'ManageCoach',
  components: {
    CategoryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
