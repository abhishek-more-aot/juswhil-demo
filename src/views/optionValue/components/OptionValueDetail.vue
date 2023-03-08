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
          style="margin-bottom: 20px;"
          label="Name"
          prop="name"
        >
          <el-input
            v-model="postForm.name"
            name="name"
            required
            style="width:50%"
            placeholder="Name"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            style="background:#59b6e3;border:1px solid #59b6e3"
            class="row"
            @click="submitForm"
          >
            {{ $t('global.form.save') }}
          </el-button>
          <el-button
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
  getOptionValueById,
  defaultOptionValuesData,
  updateOptionValue,
  addOptionValue
} from '@/api/optionValues'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from '../../../router'
import { Action } from 'vuex-module-decorators'
import Dropzone from '@/components/Dropzone/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import moment from 'moment'

@Component({
  name: 'ProductOptionValueDetail',
  components: {
    Dropzone,
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private optionId=0;
  private showImageUpload = false
  private image = 'https://stumpz.s3.ap-south-1.amazonaws.com/1611434872392-img.png'
  private file='';
  private params = { some_params: 'your_params_goes_here' }
  private headers = { smail: '*_~' }
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


  private postForm = Object.assign({}, defaultOptionValuesData);
  private loading = false;
  private rules = {
    name: [
      {
        required: true,
        message: 'Please enter name',
        trigger: ['blur', 'change']
      },
      { min: 3, message: 'Length should be greater than 3', trigger: ['blur', 'change'] },
      {
        pattern: '^[a-zA-Z ]*$',
        message: 'Name should contain characters only',
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
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultOptionValuesData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
    this.postForm.optionsId = parseInt(this.$route.params && this.$route.params.id)
  }

   private selectOptions = [
     { name: 'Male', value: 'male' },
     { name: 'Female', value: 'female' },
     { name: 'Others', value: 'others' }
   ];

   private async fetchData(id: number) {
     try {
       const data: any = await getOptionValueById(id)
       this.postForm = data
       //  this.image = data.featuredImage
       //  this.validity = [
       //     new Date(this.postForm.startDate),
       //     new Date(this.postForm.endDate)
       //   ]
       // Just for test
       //  const title = this.postForm.email
       // Set tagsview title
       //  this.setTagsViewTitle(title)
       // Set page title
       //  this.setPageTitle(title)
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
         await updateOptionValue(this.postForm.id, this.postForm)
       } else {
         await addOptionValue(this.postForm)
       }

       this.$notify({
         title: 'Success',
         message: 'Option Value saved successfully',
         type: 'success',
         duration: 2000
       })
       router.push('/OptionValue/list/' + this.postForm.optionsId)
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
