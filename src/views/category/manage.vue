<template>
  <category-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CategoryDetail from './components/CategoryDetail.vue'

@Component({
  name: 'ManageCoach',
  components: {
    CategoryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
