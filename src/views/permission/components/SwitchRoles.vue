<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ $t('permission.roles') }}： {{ roles }}
    </div>
    {{ $t('permission.switchRoles') }}：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="executive" />
      <el-radio-button label="admin" />
      <el-radio-button label="superadmin" />
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'SwitchRoles'
})
export default class extends Vue {
  get roles() {
    return AdminModule.roles
  }

  get switchRoles() {
    return this.roles[0]
  }

  set switchRoles(value) {
    AdminModule.ChangeRoles(value).then(() => {
      this.$emit('change')
    })
  }
}
</script>
