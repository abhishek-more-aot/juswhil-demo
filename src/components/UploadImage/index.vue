<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadImage"
      :file-list="fileList"
      :before-upload="onBeforeUpload"
      :limit="1"
      :on-exceed="onLimitExceed"
      accept="image/x-png,image/gif,image/jpeg"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <span v-if="(height && width != null)" class="dimensionText">*Only Image of dimension {{height+' * '+ width}} is accepted</span>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { uploadFile } from "@/api/common";
import { Component, Prop, Vue } from "vue-property-decorator";


@Component({
  name: "UploadImage",
})
export default class extends Vue {
  @Prop({ default: "" }) private value!: string;
  @Prop({ required: true }) private formField!: string
  @Prop() private height!: string
  @Prop() private width!: string

  dialogImageUrl = "";
  dialogVisible = false;
  fileList:any=[];

  created () {
    if(this.formField != null && this.formField != ""){
      this.fileList.push({name: '', url: this.formField})
    }
    
  }

private async uploadImage(files:any){
    const data = new FormData()
    data.append('file', files.file)
    await uploadFile(data, (event: ProgressEvent) => {
          console.log(event);
        }).then((res: any) => {
          this.formField = res;
           this.$emit('handle-upload', res)
        });
}

   onBeforeUpload(file:any)
    {
      const isIMAGE = file.type == 'image/jpeg'||file.type=='image/gif'||file.type=='image/png'?true:false
      if (!isIMAGE) {
        this.$message.error('Upload file can only be in picture format!');
      }
      return isIMAGE ;
    }

onLimitExceed(){
  this.$message.error('Limit excedeed')
}

  handleRemove(file: any, fileList: any) {
    this.fileList = [];
    this.$emit('handle-remove')
  }
  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
}
</script>

<style lang="scss" scoped>
.dimensionText{
  color: red;
}
.upload-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 50%;
  .el-upload {
    width: 50%;
  }
}
</style>
