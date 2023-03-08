<template>
  <banner-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BannerDetail from './components/BannerDetail.vue'

@Component({
  name: 'ManageBanner',
  components: {
    BannerDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
