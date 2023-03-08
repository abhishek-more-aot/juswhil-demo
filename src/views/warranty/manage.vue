<template>
  <warranty-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WarrantyDetail from './components/WarrantyDetail.vue'

@Component({
  name: 'ManageWarranty',
  components: {
    WarrantyDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
