<template>
  <testimonial-detail :is-edit="isEdit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TestimonialDetail from './component/TestimonialDetail.vue'

@Component({
  name: 'ManageTestimonial',
  components: {
    TestimonialDetail
  },
  props: ['isEdit']
})
export default class extends Vue {}
</script>
