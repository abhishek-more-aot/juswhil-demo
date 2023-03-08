<template>
  <gallery-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GalleryDetail from './components/GalleryDetail.vue'

@Component({
  name: 'ManageGallery',
  components: {
    GalleryDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
