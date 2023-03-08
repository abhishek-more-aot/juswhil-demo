<template>
  <userContact-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserContactDetail from './components/UserContactDetail.vue'

@Component({
  name: 'ManageUserContact',
  components: {
    UserContactDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
