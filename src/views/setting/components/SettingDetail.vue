/* eslint-disable no-sparse-arrays */
<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="postForm"
        :model="postForm"
        status-icon
        :rules="rules"
        label-width="180px"
        class="demo-form"
        label-position="left"
      >
        <el-form-item
          label="Version"
          prop="version"
          style="margin-bottom: 20px;width:100%"
        >
          <el-input
            v-model="postForm.version"
            name="version"
            style="width:50%"
            required
            placeholder="Version"
          />
        </el-form-item>

        <el-form-item
          label="App name"
          prop="appName"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.appName"
            name="appName"
            style="width:50%"
            required
            placeholder="App name"
          />
        </el-form-item>

        <el-form-item
          label="Share app message"
          prop="shareAppMessage"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.shareAppMessage"
            name="shareAppMessage"
            required
            type="textarea"
            :rows="3"
            style="width:50%"
            placeholder="Share app message"
          />
        </el-form-item>

        <el-form-item
          label="Contact number"
          prop="contactNumber"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            style="width:50%"
            :min="1"
            required
            placeholder="Contact number"
          />
        </el-form-item>

        <el-form-item
          label="Whatsapp number"
          prop="whatappNumber"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.whatappNumber"
            name="whatsappNumber"
            style="width:50%"
            :min="1"
            required
            placeholder="Whatsapp number"
          />
        </el-form-item>
        <el-form-item
          label="ios version"
          prop="iosVersion"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.iosVersion"
            name="iosVersion"
            style="width:50%"
            placeholder="ios version"
          />
        </el-form-item>
        <el-form-item
          label="Playstore link"
          prop="playstoreLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.playstoreLink"
            name="playstoreLink"
            style="width:50%"
            placeholder="Playstore link"
          />
        </el-form-item>
        <el-form-item
          label="Appstore link"
          prop="appstoreLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.appstoreLink"
            name="appstoreLink"
            required
            style="width:50%"
            placeholder="Appstore link"
          />
        </el-form-item>

        <el-form-item
          label="Aboutus link"
          prop="aboutUsLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.aboutUsLink"
            name="aboutUsLink"
            required
            style="width:50%"
            placeholder="Aboutus link"
          />
        </el-form-item>

        <el-form-item
          label="Contactus link"
          prop="contactUsLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.contactUsLink"
            name="contactUsLink"
            required
            style="width:50%"
            placeholder="Contactus link"
          />
        </el-form-item>

        <el-form-item
          label="Terms and conditions link"
          prop="termsAndConditionsLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.termsAndConditionsLink"
            name="termsAndConditionsLink"
            placeholder="Terms and conditions link"
            required
            style="width:50%"
          />
        </el-form-item>

        <el-form-item
          label="Privacy policy link"
          prop="privacyPolicyLink"
          style="margin-bottom: 20px;"
        >
          <el-input
            v-model="postForm.privacyPolicyLink"
            name="privacyPolicyLink"
            required
            placeholder="Privacy policy link"
            style="width:50%"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            @click="submitForm"
          >
            {{ $t('global.form.save') }}
          </el-button>
          <!-- <el-button
            v-waves
            type="reset"
            @click="resetForm"
          >
            {{ $t('global.form.reset') }}
          </el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import {
  getSettingById,
  defaultSettingData,
  updateSetting,
  addSetting
} from '@/api/setting'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getQuery } from '../../../utils'
import { getCompanies } from '@/api/master/companies'
import Dropzone from '@/components/Dropzone/index.vue'
import { uploadFile } from '@/api/common'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import VueSimpleRangeSlider from 'vue-simple-range-slider'
import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css'

@Component({
  name: 'SettingDetail',
  components: {
    Dropzone,
    AvatarUpload,
    PanThumb,
    VueSimpleRangeSlider
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private planList: any = [];
  private typeList: any = [
    'Agent',
    'Development Officer',
    'SBA',
    'CLIA',
    'Other'
  ];

   private showImageUpload = false
  private image = 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
  private params = { some_params: 'your_params_goes_here' }
  private headers = { smail: '*_~' }

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

  private postForm = Object.assign({}, defaultSettingData);
  private loading = false;
  private rules = {
    version: [
      { required: true, message: 'Version is required', trigger: 'blur' }
    ],
    iosVersion: [
      { required: true, message: 'ios Version is required', trigger: 'blur' }
    ],
    appName: [
      { required: true, message: 'App name is Required', trigger: 'blur' }

    ],
    whatappNumber: [
      { required: true, message: 'Whatsapp Number is Required', trigger: 'blur' }

    ],
    playstoreLink: [
      { required: true, message: 'Playstore link is Required', trigger: 'blur' }
    ],
    appstoreLink: [
      { required: true, message: 'Appstore Link is Required', trigger: 'blur' }

    ],
    aboutUsLink: [
      { required: true, message: 'About us Link is Required', trigger: 'blur' }

    ],
    contactUsLink: [
      { required: true, message: 'Contact us Link is Required', trigger: 'blur' }

    ],
    termsAndConditionsLink: [
      { required: true, message: 'Terms and conditions link is Required', trigger: 'blur' }

    ],
    privacyPolicyLink: [
      { required: true, message: 'privacy policy link is required', trigger: 'blur' }

    ],
    shareAppMessage: [
      { required: true, message: 'Shareapp messageis required', trigger: 'blur' }

    ],
    contactNumber: [
      { required: true, message: 'Max video length is required', trigger: 'blur' },
      {
        trigger: ['blur', 'change'],
        pattern: '[123456789][0-9]*$',
        message: 'Mobile number should contain number only'
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

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false
    this.image = jsonData.files[field]
  }

  private onClose() {
    this.showImageUpload = false
  }

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  // get filteredStates() {
  //   return this.stateList
  //     .filter
  //     // (p: any) => p.countryId === this.postForm.countryId
  //     ()
  // }

  // get filteredCities() {
  //   return this.cityList
  //     .filter
  //     // (p: any) =>
  //     // p.countryId === this.postForm.countryId &&
  //     // p.stateId === this.postForm.stateId
  //     ()
  // }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt('1'))
    } else {
      this.postForm = Object.assign({}, defaultSettingData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getSettingById(id)
      this.postForm = data
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
        await updateSetting(this.postForm.id, this.postForm)
      } else {
        await addSetting(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Setting saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/dashboard')
    } catch (err) {
      this.loading = false
      console.error(err)
    }
  }
}
</script>

<style lang="scss">
.admin-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }

}
.secs{
 margin:10px;
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
