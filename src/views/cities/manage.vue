<template>
  <cities-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CitiesDetail from './components/CitiesDetail.vue'

@Component({
  name: 'Managezipcode',
  components: {
    CitiesDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
