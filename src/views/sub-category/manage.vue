<template>
  <sub-category-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubCategoryDetail from './components/SubCategoryDetail.vue'

@Component({
  name: 'ManageCoach',
  components: {
    SubCategoryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
