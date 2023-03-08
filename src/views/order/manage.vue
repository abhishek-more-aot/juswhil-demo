<template>
  <order-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrderDetail from './components/OrderDetail.vue'

@Component({
  name: 'ManageUserContact',
  components: {
    OrderDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
