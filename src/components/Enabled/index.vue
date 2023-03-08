<template>
  <span>
    <el-switch
      v-model="toggleValue"
      @change="centerDialogVisible=true"
    />
    <!-- <el-switch class="sc-enabled-button-style" /> -->
    <el-dialog
      title="Enable/Disable"
      :visible.sync="centerDialogVisible"
      width="30%"
      :before-close="handleClickedNo"
      center
    >
      <center>
        <span>Are you sure you want to {{ value ? "Disable" : "Enable" }}?</span>
      </center>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="toggleEnable"
        >Yes</el-button>
        <el-button @click="handleClickedNo">No </el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toggleEnable } from '@/api/common'

@Component({
  name: 'Enabled'
})
export default class extends Vue {
  centerDialogVisible: boolean = false;
  @Prop({ default: false }) private value!: boolean;
  @Prop({ default: '' }) private video!: string;
  @Prop({ default: '' }) private url!: string;

  private type: string = 'success';
  private toggleValue:Boolean = true;

  mounted() {
    this.setType(this.value)
  }

  private async toggleEnable(value: boolean) {
    this.centerDialogVisible = false
    const newValue = !this.value
    try {
      const data: any = await toggleEnable(this.url, { enabled: newValue })
      if (data) {
        this.$emit('input', data.enabled)
        this.setType(data.enabled)
      }
    } catch (error) {
      this.$message(error.message)
    }
  }

  private handleClickedNo() {
    this.toggleValue = !this.toggleValue
    this.centerDialogVisible = false
  }

  private setType(newValue: Boolean): void {
    this.toggleValue = newValue
  }
}
</script>
