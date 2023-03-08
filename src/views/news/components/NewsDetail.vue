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
          label="Description"
          prop="description"
          required
        >
          <el-input
            v-model="formData.description"
            name="description"
            required
            placeholder="Description"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="Link"
          prop="link"
          required
        >
          <el-input
            v-model="formData.link"
            type="textarea"
            :rows="2"
            :autosize="{minRows: 2, maxRows: 4}"
            name="link"
            placeholder="Link"
            show-word-limit
          />
        </el-form-item>

          <el-form-item
          label="Source"
          prop="source"
          required
        >
          <el-input
            v-model="formData.source"
            name="source"
            placeholder="Source"
            show-word-limit
          />
        </el-form-item>

        <!-- <el-form-item
          style="margin-bottom: 20px"
          label="Image"
          prop="image"
          required
        >
          <pan-thumb :image="image" /><br>
          <el-button
            type="primary"
            icon="el-icon-upload"
            tyle="position: absolute;bottom: 15px;margin-left: 40px;"
            @click="toggleShow"
          >
            Upload Image
          </el-button>
          <avatar-upload
            v-model="showImageUpload"
            field="avatar"
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
          />
        </el-form-item> -->

        <el-form-item style="margin-bottom: 30px" label="Image" prop="image">
          <upload-image
            :key="renderKey"
            :form-field="formData.image"
            @handle-upload="updateImage"
            @handle-remove="removeImage"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
             style="background:#59b6e3;border:1px solid #59b6e3"
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
  getNewsById,
  updateNews,
  createNews
} from '@/api/news'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from '@/router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '@/utils'
import PanThumb from '@/components/PanThumb/index.vue'
import FileUpload from '@/components/FileUpload/index.vue'
import { getAppVersions, uploadFile } from '@/api/common'
import { defaultNewsData } from '@/api/news'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
// import { getUsers } from '@/api/users'
import UploadImage from "@/components/UploadImage/index.vue";


@Component({
  name: 'NewsDetail',
  components: {
    FileUpload,
    PanThumb,
    AvatarUpload,
    UploadImage,
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private platformList: any = ['android', 'ios'];
  private pageList: any = ['Home'];
  private limitnum = 1;
  private fileList: any = [];
  private appVersionList: any = [];
  private image = '';
  private showImageUpload = false;
  private formData = Object.assign({}, defaultNewsData);
  private loading = false;
  private renderKey: any;

  private rules = {
    title: [
      {
        required: true,
        trigger: 'blur',
        message: 'Title is required'
      },
      {
        min: 3,
        max: 50,
        message: 'Length should be 3 to 50',
        trigger: 'blur'
      }
    ],
    message: [
      {
        required: true,
        trigger: 'blur',
        message: 'Message is required'
      },
      {
        min: 3,
        message: 'Length should be greater than 3',
        trigger: 'blur'
      }
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
    ],
    image: [
      {
        required: true,
        trigger: 'blur',
        message: 'Image is required'
      },
    ]
  };

  private updateImage(res: any) {
    this.formData.image = res;
  }
  private removeImage() {
    this.formData.image = "";
  }

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.getAppVersionList()

    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.formData = Object.assign({}, defaultNewsData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getNewsById(id)
      this.renderKey++;
      this.formData = data
      this.image = data.image
      if (data.stateId) {
        // this.getCityList(data.stateId)
      }
      // if (data.cityId) {
      //   this.getPincodeList(data.cityId)
      // }
      // Just for test
      const title = this.formData.description ? this.formData.description : ''
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async uploadSectionFile(param: any) {
    
    var fileObj = param.file
    var form = new FormData()
    
    form.append('file', fileObj)
    await uploadFile(form, (event: ProgressEvent) => {
      console.log(event)
    }).then((res) => {
      
      this.formData.image = res.toString()
    })
    
  }

  private uploadFileError(err: any, file: any, fileList: any) {
    this.$message.error('upload failed!')
  }

  private exceedFile(files: any, fileList: any) {
    this.$message.error('Only upload' + this.limitnum + 'Files')
  }

  private handleRemove(file: any) {
    
    this.formData.image = ''
    const temp: any = this.$refs.upload
    temp.clearFiles()
    
  }

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
          
          this.formData.image = res
          
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
    this.formData.image = '';
    (this.$refs.formData as Form).resetFields()
    this.renderKey++;
    this.fileList = []
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        // this.formData.country = { id: this.formData.countryId }
        // this.formData.state = { id: this.formData.stateId }
        // this.formData.city = { id: this.formData.cityId }
        await updateNews(this.formData.id, this.formData)
      } else {
        await createNews(this.formData)
      }

      this.$notify({
        title: 'Success',
        message: 'News saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/news/list')
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
    this.formData.image = file.response
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
