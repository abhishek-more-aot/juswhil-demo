<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div
      :key="key"
      style="margin-top:30px;"
    >
      <div>
        <span
          v-permission="['superadmin','admin']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >supermin & admin</el-tag>can see this
        </span>
        <el-tag
          v-permission="['superadmin','admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['superadmin','admin']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['executive']"
          class="permission-alert"
        >
          Only
          <el-tag
            class="permission-tag"
            size="small"
          >executive</el-tag>can see this
        </span>
        <el-tag
          v-permission="['executive']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['executive']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['superadmin','admin','executive']"
          class="permission-alert"
        >
          Both
          <el-tag
            class="permission-tag"
            size="small"
          >admin</el-tag>and
          <el-tag
            class="permission-tag"
            size="small"
          >executive</el-tag>can see this
        </span>
        <el-tag
          v-permission="['superadminÆ’','admin','executive']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['superadmin','admin','executive']"
        </el-tag>
      </div>
    </div>

    <div
      :key="'checkPermission'+key"
      style="margin-top:60px;"
    >
      <aside>
        {{ $t('permission.tips') }}
        <br>e.g.
      </aside>

      <el-tabs
        type="border-card"
        style="width:550px;"
      >
        <el-tab-pane
          v-if="checkPermission(['admin'])"
          label="Admin"
        >
          Admin can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['executive'])"
          label="Executive"
        >
          Executive can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['executive'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['admin','executive'])"
          label="Admin-OR-Executive"
        >
          Both admin or executive can see this
          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['admin','executive'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkPermission } from '@/utils/permission' // Use permission directly
import SwitchRoles from './components/SwitchRoles.vue'

@Component({
  name: 'DirectivePermission',
  components: {
    SwitchRoles
  }
})
export default class extends Vue {
  private key = 1; // ä¸ºäº†èƒ½æ¯?æ¬¡åˆ‡æ?¢æ?ƒé™?çš„æ—¶å€™é‡?æ–°åˆ?å§‹åŒ–æŒ‡ä»¤
  private checkPermission = checkPermission;

  private handleRolesChange() {
    this.key++
  }
}
</script>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}

.permission-tag {
  background-color: #ecf5ff;
}
</style>
