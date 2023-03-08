<template>
  <document-details :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import documentDetails from './components/documentDetails.vue'

@Component({
  name: 'ManageDocuments',
  components: {
    documentDetails
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
