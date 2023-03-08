<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AdminModule } from '@/store/modules/admin'
import AdminDashboard from './admin/index.vue'
import ExecutiveDashboard from './executive/index.vue'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    ExecutiveDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard';

  get roles() {
    return AdminModule.roles
  }

  created() {
    if (this.roles.includes('executive')) {
      this.currentRole = 'executive-dashboard'
    }
  }
}
</script>
