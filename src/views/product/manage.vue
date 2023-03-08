<template>
  <product-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductDetail from './components/ProductDetail.vue'

@Component({
  name: 'ManageUser',
  components: {
    ProductDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
