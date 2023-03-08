<template>
  <div style="text-align:end;">
    <el-button
      type="text"
      style="float:right"
      circle
      icon="custom-icon el-icon-info"
      @click="centerDialogVisible = true"
    />

    <el-dialog
      :title="header"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <p>{{ message }}</p>
      <!-- <Media
        :kind="'video'"
        style="margin-left:10%"
        :controls="true"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        preload="none"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >OK</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Media from '@dongido/vue-viaudio'

// HACK: have to use script-loader to load jsonlint
/* eslint-disable import/no-webpack-loader-syntax */
require('script-loader!jsonlint')

@Component({
  name: 'InfoDialog',
  components: {
    Media
  }
})
export default class extends Vue {
  @Prop({ required: true }) header!: string;
  @Prop({ required: true }) message!: string;
   centerDialogVisible:boolean=false

  // private async getDialogData() {
  //   this.dialogVisibility = true
  // }
}
</script>
<style>
.custom-icon {
   font-size: 2rem;
}
</style>
