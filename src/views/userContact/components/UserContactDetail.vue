<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="postForm"
        :model="postForm"
        status-icon
        :rules="rules"
        label-width="160px"
        class="demo-form"
        label-position="left"
      >
        <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" />
        </el-form-item>

        <el-form-item
          label="Contact Number"
          prop="contactNumber"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.contactNumber"
            class="col"
            style="width:50%"
            name="contactNumber"
            required
            placeholder="Contact"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            class="row"
            @click="submitForm"
          >
            {{ $t('global.form.save') }}
          </el-button>
          <el-button
            v-if="!isEdit"
            v-waves
            type="reset"
            @click="resetForm"
          >
            {{ $t('global.form.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import {
  getUserContactById,
  defaultUserContactData,
  updateUserContact,
  addUserContact
} from '@/api/usersContact'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import Dropzone from '@/components/Dropzone/index.vue'
import { uploadFile } from '@/api/common'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import moment from 'moment'

@Component({
  name: 'UserContactDetail',
  components: {
    Dropzone,
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private validity: Date[] = [];
  private roleList: any = [];
  private planList: any = [];
  private userId=0;
  private typeList: any = [
    'Agent',
    'Development Officer',
    'SBA',
    'CLIA',
    'Other'
  ];

   private showImageUpload = false
  private image = 'https://stumpz.s3.ap-south-1.amazonaws.com/1611434872392-img.png'
  private file='';
  private params = { some_params: 'your_params_goes_here' }
  private headers = { smail: '*_~' }
   options:any={
     acceptedFiles: 'image/*'
   };

   private onCropUploadSuccess(jsonData: any, field: string) {
     this.showImageUpload = false
     this.image = jsonData.files[field]
   }

   data() {
     return {
       datePickerOptions: {
         disabledDate(date:any) {
           return moment() >= date
         }
       }
     }
   }

   //  private cropSuccess(imgDataUrl: string, field: string) {
   //    this.image = imgDataUrl
   //    const data = new FormData()
   //    fetch(imgDataUrl)
   //      .then((res) => res.blob())
   //      .then((blob) => {
   //        const file = new File([blob], 'img.' + blob.type.split('/')[1], {
   //          type: 'image/png'
   //        })
   //        data.append('file', file)
   //        uploadFile(data, (event: ProgressEvent) => {
   //          console.log(event)
   //        }).then((res: any) => {
   //          this.postForm.featuredImage = res
   //        })
   //      })
   //  }

  private countryList: any = [];
  private stateList: any = [];
  private cityList: any = [];

  private planName='';

  private validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      if (rule.field === 'imageURL') {
        this.$message({
          message: 'Upload cover image is required',
          type: 'error'
        })
      } else {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
      }
      callback(new Error(rule.field + ' is required'))
    } else {
      callback()
    }
  };

  //  private dropzoneSuccess(file: File, response: any) {
  //
  //     const data = new FormData()
  //     data.append('file', file)
  //     uploadFile(data, (event: ProgressEvent) => {
  //       console.log(event)
  //     }).then(res => {
  //       this.postForm.termsAndCondition = res.toString()
  //       console.log(res.toString())
  //     })
  //     this.$notify({
  //       title: 'Success',
  //       message: 'File saved successfully',
  //       type: 'success',
  //       duration: 2000
  //     })
  //     this.$message({ message: 'Upload success', type: 'success' })
  //   }

  private postForm = Object.assign({}, defaultUserContactData);
  private loading = false;
  private rules = {
    contactNumber: [
      {
        required: true,
        message: 'Please enter contact number',
        trigger: 'blur'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '(^[0-9]*$)',
        message: 'Contact number should contain number only'
      },
      {
        max: 10,
        min: 10,
        message: 'Length should be of 10 Digits',
        trigger: ['blur', 'change']
      }
    ]
  };

  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
  }

  private onClose() {
    this.showImageUpload = false
  }

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.userId = parseInt(this.$route.params && this.$route.params.id)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultUserContactData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

   private selectOptions = [
     { name: 'Male', value: 'male' },
     { name: 'Female', value: 'female' },
     { name: 'Others', value: 'others' }
   ];

   private async fetchData(id: number) {
     try {
       const data: any = await getUserContactById(id)
       this.postForm = data
     } catch (err) {
       console.error(err)
     }
   }

   private setTagsViewTitle(title: string) {
     const tagView = this.tempTagView
     if (tagView) {
       tagView.title = `${title}-${this.postForm.id}`
       TagsViewModule.updateVisitedView(tagView)
     }
   }

   private setPageTitle(title: string) {
     document.title = `${title} - ${this.postForm.id}`
   }

   private submitForm() {
     (this.$refs.postForm as Form).validate(valid => {
       if (valid) {
         this.saveForm()
       } else {
         console.error('Submit Error!')
         return false
       }
     })
   }

   private resetForm() {
     (this.$refs.postForm as Form).resetFields()
   }

  @Action
   public async saveForm() {
     try {
       this.loading = true
       if (this.isEdit) {
         await updateUserContact(this.postForm.id, this.postForm)
       } else {
         await addUserContact(this.postForm)
       }

       this.$notify({
         title: 'Success',
         message: 'Contact saved successfully',
         type: 'success',
         duration: 2000
       })
       router.push('/userContact/list/')
     } catch (err) {
       this.loading = false
       console.error(err)
     }
   }
}
</script>

<style lang="scss">

.col {
  width: 68%;
}

@media screen and (max-width: 600px) {
  .col {
    width: 25%
  }

  .row{
    float:left ;
    margin-left: -20%;
  }

}
.admin-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
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
.avatar {
  width: 400px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  transform-origin: 95% 40%;
}

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
