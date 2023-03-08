<template>
  <div class="upload-container">
    <el-upload
      ref="upload"
      class="upload-demo"
      :accept="accept"
      action
      :http-request="uploadFile"
      :before-remove="beforeRemove"
      :before-upload="beforeFileUpload"
      :on-error="onFileTransferError"
      :on-success="onFileTransferSuccess"
      :file-list="fileList"
      :max-size="maxSize"
      list-type="picture"
      :multiple="multiple"
    >
      <el-button
        size="small"
        type="primary"
      >
        Click to Upload
      </el-button>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { uploadFile } from '@/api/common'

@Component({
  name: 'FileUpload'
})
export default class extends Vue {
  @Prop({ default: '.jpg, .jpeg, .png' }) private accept!: string;
  @Prop({ default: false }) private multiple!: boolean;
  @Prop({ default: 2 }) private maxSize!: number;
  @Prop({ default: [] }) private fileList!: Array<any>;

  private beforeRemove(file: any, fileList: []) {
    if (this.multiple) {
      return true
    }
    return fileList.length > 1 // for single file
  }

  private beforeFileUpload(file: any) {
    const extenstion = file.name.substr(file.name.lastIndexOf('.'))
    const acceptable = this.accept.split(',').map(function(accept) {
      return accept.trim()
    })

    const isAllowedType = acceptable.indexOf(extenstion) > -1
    const isLessThanMaxSize = file.size / 1024 / 1024 < this.maxSize

    if (!isAllowedType) {
      this.$message.error('file type not permitted!')
    }
    if (!isLessThanMaxSize) {
      this.$message.error('Icon size can not exceed 2MB!')
    }
    return isAllowedType && isLessThanMaxSize
  }

  private onFileTransferError(err: any, file: any, fileList: []) {
    console.log(err) // mubasshir
  }

  private onFileTransferSuccess(response: any, file: any, fileList: []) {
    this.fileList.push(file)
    // if single file then we remove other file
    if (!this.multiple && this.fileList.length > 1) {
      this.fileList.shift()
    }
    // send change
    this.$emit('change', file)
  }

  private uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file.file)

    return uploadFile(data, (event: ProgressEvent) => {
      console.log(event) // mubasshir
    })
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  .el-upload {
    text-align: left;
  }
}
</style>
