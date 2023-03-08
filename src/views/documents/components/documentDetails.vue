<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="160px"
        class="demo-form"
        label-position="left"
        v-if="!isEdit"
      >
        <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
          required
        >
          <el-switch v-model="formData.enabled" />
        </el-form-item>

        <el-form-item
          label="Title"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            name="title"
            placeholder="Title"
          />
        </el-form-item>

        <!-- <el-form-item
          label="Description"
          prop="description"
        >
          <el-input
            type="textarea"
            :rows="2"
            :cols="4"
            v-model="formData.description"
            name="description"
            placeholder="Description">
          </el-input>
        </el-form-item> -->

        
        <el-form-item label="Document" prop="document">
          <el-upload
            ref="file"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="uploadDocSectionFile"
            multiple
            :file-list="docFileList"
            list-type="file"
            :show-file-list="false"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel ,application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <el-button size="medium" type="primary" v-loading="documentLoading"> Click to upload </el-button>
          </el-upload>
          
          <span v-if="formData.document != null">
              <span v-if="formData.document.length > 0">
                  <a
                    :href="formData.document"
                    target="-blank"
                  >
                  <svg-icon
                      name="documentation"
                      style="
                        font-size: 25px;
                        color: green;
                        cursor: pointer;
                        margin-left: 5px;
                      "
                    />
                  </a>  
                
                </span>
              </span>
           
        </el-form-item>

        

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            @click="submitForm"
          >
            {{ $t("global.form.save") }}
          </el-button>
          <el-button
            v-waves
            type="reset"
            @click="resetForm"
          >
            {{ $t("global.form.reset") }}
          </el-button>
        </el-form-item>
      </el-form>

      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="160px"
        class="demo-form"
        label-position="left"
        v-if="isEdit"
      >
        <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
          required
        >
          <el-switch v-model="formData.enabled" />
        </el-form-item>

        <el-form-item
          label="Title"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            name="title"
            placeholder="Title"
          />
        </el-form-item>

        

       
        <el-form-item label="Document" prop="document">
          <el-upload
            ref="file"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="uploadDocSectionFile"
            multiple
            :file-list="docFileList"
            list-type="file"
            :show-file-list="false"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel ,application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <el-button size="medium" type="primary" v-loading="documentLoading"> Click to upload </el-button>
          </el-upload>
          
          <span v-if="formData.document != null">
              <span v-if="formData.document.length > 0">
                  <a
                    :href="formData.document"
                    target="-blank"
                  >
                  <svg-icon
                      name="documentation"
                      style="
                        font-size: 25px;
                        color: green;
                        cursor: pointer;
                        margin-left: 5px;
                      "
                    />
                  </a>  
                
                </span>
              </span>
           
        </el-form-item>



        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            @click="submitForm"
          >
            {{ $t("global.form.save") }}
          </el-button>
          <el-button
            v-waves
            type="reset"
            @click="resetForm"
          >
            {{ $t("global.form.reset") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  getDocumentsById,
  updateDocument,
  createDocument
} from '@/api/documents'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from '@/router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '@/utils'
import PanThumb from '@/components/PanThumb/index.vue'
import FileUpload from '@/components/FileUpload/index.vue'
import { getAppVersions, uploadFile } from '@/api/common'
import { defaultDocumentsData } from '@/api/documents'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
// import { getTendors } from '@/api/tendors/tendors'
// import { defaultDocumentTypeData, getDocumentsType } from '@/api/documenttype/documenttype'
// import { getUsers } from '@/api/users'

@Component({
  name: 'documentDetails',
  components: {
    FileUpload,
    PanThumb,
    AvatarUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private platformList: any = ['android', 'ios'];
  private pageList: any = ['Home'];
  private limitnum = 1;
  
  // this added
  private tendorIdList: any = [];
  private documentMasterIdList: any = [];
  private documentMaster: any = [];
  private docFileList:any = [];

  private fileList: any = [];
  private appVersionList: any = [];
  private image = '';
  private document =''
  private documentLoading=false
  private showImageUpload = false;
  private formData = Object.assign({}, defaultDocumentsData);
  // private postForm = Object.assign({}, defaultDocumentTypeData);
  private loading = false;
  private rules = {
    // title: [
    //   {
    //     required: true,
    //     trigger: 'blur',
    //     message: 'Title is required'
    //   },
    //   {
    //     min: 3,
    //     max: 50,
    //     message: 'Length should be 3 to 50',
    //     trigger: 'blur'
    //   }
    // ],
    title: [
      {
        required: true,
        message: "Please enter title",
        trigger: ["blur","change"]
      },
      {
        pattern: '^[a-zA-Z0-9_]',
        message: "Space not allow at start of title ",
        trigger: ["blur", "change"],
      },  
      // {
      //   pattern: "^[a-zA-Z ]*$",
      //   message: "Please enter valid input"
      // }
    ],
    document: [
      {
        required: true,
        trigger: 'blur',
        message: 'Please upload document'
      },
      // {
      //   min: 3,
      //   message: 'Length should be greater than 3',
      //   trigger: 'blur'
      // }
    ],
    source:[
       {
        required: true,
        trigger: 'blur',
        message: 'Source is required'
      },
    ],
    page: [
      {
        required: true,
        trigger: 'blur'
      }
    ],
    link: [
      {
        trigger: 'blur'
      },
      {
        pattern: /[-a-zA-Z0-9@%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        message: 'Invalid URL format',
        trigger: ['blur', 'change']
      }
    ]
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }
  private documentClose(){
    this.formData.document='';
    this.formData.tags=''
  }

  created() {
    this.getAppVersionList()
    // this.fetchTendors()
    // this.fetchDocTypes()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      
    } else {
      this.formData = Object.assign({}, defaultDocumentsData)
      
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getDocumentsById(id)
      this.formData = data
      this.image = data.image
      // this.document=data.document
      // const title = this.formData.description ? this.formData.description : ''
      // Set tagsview title
      // this.setTagsViewTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  //  private async fetchTendors() {
  //   this.tendorIdList = await getTendors(
  //     getQuery({
  //       enabled: true,
  //       sort: 'id,ASC',
  //       filter: {
  //         enabled: 'eq'
  //       }
  //     })
  //   )
    
  // }

    // private async fetchDocTypes() {
    // this.documentMasterIdList = await getDocumentsType(
    //     getQuery({
    //       enabled: true,
    //       sort: 'id,ASC',
    //       filter: {
    //         enabled: 'eq'
    //       }
    //     })
    //   )
      
    // }

  // private async uploadSectionFile(param: any) {
    
  //   var fileObj = param.file
  //   var form = new FormData()
    
  //   form.append('file', fileObj)
  //   await uploadFile(form, (event: ProgressEvent) => {
  //     console.log(event)
  //   }).then((res) => {
      
  //     this.formData.image = res.toString()
  //   })
    
  // }

    private async uploadDocSectionFile(param: any) {
      var fileObj = param.file
      var form = new FormData()
      this.documentLoading=true;
      form.append('file', fileObj)
      
      await uploadFile(form, (event: ProgressEvent) => {
         this.documentLoading=true;
        console.log(event)
      }).then((res) => {
        this.documentLoading=true;
        this.formData.document = res.toString()
        console.log(res);
        console.log(this.formData);
        this.documentLoading=false;
      }).catch((err)=>{
        console.log(err);
      })
    }

  private handleUploadChange(file: any){
    this.docFileList = [file];
  }

  private uploadFileError(err: any, file: any, fileList: any) {
    this.$message.error('upload failed!')
  }

  private exceedFile(files: any, fileList: any) {
    this.$message.error('Only upload' + this.limitnum + 'Files')
  }

  // private handleRemove(file: any) {
    
  //   this.formData.image = ''
  //   const temp: any = this.$refs.upload
  //   temp.clearFiles()
    
  // }

  private uploadFileSuccess(response: any, file: any, fileList: any) {
    if (response.data.error == 0) {
      file.response = response.data.data
      this.fileList.push(file)
    } else {
      this.$message.error(response.data.message) // File upload error prompt
    }
  }

  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

  private onClose() {
    this.showImageUpload = false
  }

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false
    this.image = jsonData.files[field]
  }

  private cropSuccess(imgDataUrl: string, field: string) {
    this.image = imgDataUrl
    const data = new FormData()
    fetch(imgDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'img.' + blob.type.split('/')[1], {
          type: 'image/png'
        })
        data.append('file', file)
        uploadFile(data, (event: ProgressEvent) => {
          console.log(event)

        }).then((res: any) => {
          console.log(res)
          
          // this.formData.image = res
        })
      })
    
  }



  private setTagsViewTitle(title: string) {
    const tagView = this.tempTagView
    if (tagView) {
      tagView.title = `${title}-${this.formData.id}`
      TagsViewModule.updateVisitedView(tagView)
    }
  }

  private setPageTitle(title: string) {
    document.title = `${title} - ${this.formData.id}`
    // document.title = `${title}`
  }

  private submitForm() {
    (this.$refs.formData as Form).validate((valid) => {
      if (valid) {
        this.saveForm()
      } else {
        return false
      }
    })
  }

  private resetForm() {
    (this.$refs.formData as Form).resetFields()
    this.fileList = []
    // this.formData.image = ''
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) { 
        
        // this.formData.documentMaster = { id : this.formData.documentMasterId}
        // this.formData.tendorId= Number(this.$route.params.id)
        await updateDocument(this.formData.id, this.formData)
        
      } else {
        
        this.formData.orderId= Number(this.$route.params.id)
        await createDocument(this.formData)

        
      }

      this.$notify({
        title: 'Success',
        message: 'Document saved successfully',
        type: 'success',
        duration: 2000
      })
      
      router.push('/documents/list/' + Number(this.formData.orderId))
      
    } catch (err) {
      this.loading = false
    }
  }

  private async getAppVersionList() {
    try {
      this.appVersionList = await getAppVersions()
    } catch (err) {
      Promise.reject(err)
    }
  }

  private imageUpload(file: any) {
    // this.formData.image = file.response
  }

  // private sendToAllToggled() {
  //   if (this.formData.sendToAll) {
  //     this.$confirm(
  //       'Are you sure want to send notification to All users?',
  //       'Attention!',
  //       {
  //         confirmButtonText: "Yes, I know what I'm doing",
  //         confirmButtonClass: 'el-button--success',
  //         cancelButtonText: this.$tc('table.cancel'),
  //         cancelButtonClass: 'el-button--danger',
  //         type: 'error'
  //       }
  //     )
  //       .then((confirm) => {
  //         // let it confirm
  //         // clear other dropdowns
  //         this.formData.countryId = null
  //         this.formData.stateId = null
  //         this.formData.cityId = null

  //         // delete this.formData.country
  //         // delete this.formData.state
  //         // delete this.formData.city
  //       })
  //       .catch((_) => {
  //         this.formData.sendToAll = false
  //       })
  //   }
  // }
}
</script>
<style lang="scss">
.admin-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
  }
}
</style>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
