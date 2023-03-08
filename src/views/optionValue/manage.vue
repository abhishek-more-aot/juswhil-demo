<template>
  <optionValue-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OptionValueDetail from './components/OptionValueDetail.vue'

@Component({
  name: 'ManageProductOptionValue',
  components: {
    OptionValueDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
