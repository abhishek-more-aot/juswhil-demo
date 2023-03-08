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
          label="Full Name"
          prop="fullName"
        >
          <el-input
            v-model="postForm.fullName"
            name="fullName"
            style="width:50%"
            required
            placeholder="Full Name"
            maxlength="30"
           
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Email"
          prop="email"
        >
          <el-input
            v-model="postForm.email"
            name="email"
            style="width:50%"
            required
            placeholder="Email"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Gender"
          prop="gender"
        >
          <el-select
            v-model="postForm.gender"
            name="gender"
            style="width:50%"
            placeholder="Select"
          >
            <el-option
              v-for="item in genderList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Mobile Number"
          prop="contactNumber"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            style="width:50%"
            required
            placeholder="Mobile Number"
          />
        </el-form-item>

        <el-form-item
          v-if="!isEdit"
          style="margin-bottom: 20px;"
          label="Password"
          prop="password"
        >
          <el-input
            v-model="postForm.password"
            placeholder="Password"
            type="password"
            style="width:50%"
            show-password
            name="password"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Role"
          prop="adminsRoleId"
        >
          <el-select
            v-model="postForm.adminsRoleId"
            name="adminsRoleId"
            style="width:50%"
            placeholder="Select"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          style="margin-bottom: 20px;"
          label="Profile"
          prop="profile"
        >
          <pan-thumb
            :image="image"
          /><br>
          <el-button
            type="primary"
            icon="el-icon-upload"
            tyle="position: absolute;bottom: 15px;margin-left: 40px;"
            @click="toggleShow"
          >
            Change Avatar
          </el-button> <span style="font-weight:500"> (Minimum required resolution : 300*300)</span>
          <avatar-upload
            v-model="showImageUpload"
            field="file"
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            type="success"
            style="background:#59b6e3;border:1px solid #59b6e3 "
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
import {
  getAdminById,
  defaultAdminData,
  updateAdmin,
  register
} from '@/api/admins'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Avatar, Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getAdminsRoles } from '@/api/adminsRoles'
import { getQuery } from '../../../utils'
import { uploadFile } from '@/api/common'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import { AdminModule } from '../../../store/modules/admin'
@Component({
  name: 'AdminDetail',
  components: {
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private roleList: any = [];
  private postForm = Object.assign({}, defaultAdminData);
  private myRole = AdminModule.roles;
  private loading = false;
  private image = 'https://via.placeholder.com/300'
  private showImageUpload = false

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

  private genderList = [
    { label: 'Female', value: 0 },
    { label: 'Male', value: 1 },
    { label: 'Others', value: 2}
  ];

  private rules = {
    fullName: [
      {
        required: true,
        message: 'Please enter full name',
        trigger: ['blur', 'change']
      },
      { min: 3, message: 'Length should be greater than 3', trigger: ['blur', 'change'] },
      {
        pattern: '^[a-zA-Z ]*$',
        message: 'Name should contain characters only',
        trigger: ['blur', 'change']
      },
      {
        pattern: '^[a-zA-Z]{4,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$',
        message: 'Spaces are not allowed',
        trigger: ['blur', 'change']
      }
    ],
    contactNumber: [
      {
        required: true,
        message: 'Please enter mobile number',
        trigger: 'blur'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '^[0-9]{10}$',
        message: 'Mobile number should contain number only'
      },
      {
        max: 10,
        min: 10,
        message: 'Length should be of 10 Digits',
        trigger: ['blur', 'change']
      }
    ],
    email: [
      {
        required: true,
        message: 'please enter e-mail',
        trigger: 'blur'
      },
      {
        min: 10,
        max: 50,
        pattern : '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
        message: 'please enter correct email address',
        trigger: ['blur', 'change']
      },
      {
        type: 'email',
        message: 'Please enter correct email address',
        trigger: ['blur', 'change']
      }
    ],
    password: [
      {
        required: true,
        message: 'Please enter password',
        trigger: 'blur'
      },
       {
        min: 8,
        max: 15,
        message: 'Length should be 8 to 15',
        trigger: ['blur', 'change']
      },
      // {
      //   pattern: "^\w[a-zA-Z@#0-9.]*$",
      //   message: 'Password should not contain space at start',
      //   trigger: ['blur', 'change']
      // }
    ],

    adminsRoleId: [
      {
        required: true,
        message: 'Please select your role',
        trigger: ['blur', 'change']
      }
    ],
    gender: [
      {
        required: true,
        message: 'Please select gender',
        trigger: ['blur', 'change']
      }
    ],
    profile : [
      {
        required: false,
        message: 'Please Choose a Image',
        trigger: ['blur', 'change']
      }
    ]
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    this.fetchRoles()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultAdminData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getAdminById(id)
      this.postForm = data
      this.image = data.avatar
      const title = this.postForm.email
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async fetchRoles() {
    try {
      var role = this.myRole[0]
      if (role === 'superadmin') {
        this.roleList = await getAdminsRoles(
          getQuery({
            enabled: true,
            sort: 'name,ASC',
            filter: {
              enabled: 'eq'
            }
          })
        )
      }

      if (role === 'Admin') {
        this.roleList = await getAdminsRoles(
          getQuery({
            enabled: true,
            sort: 'name,ASC',
            id: 3,
            filter: {
              enabled: 'eq',
              id: 'eq'
            }
          }))
      }
    } catch (err) {
      Promise.reject(err)
    }
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
          this.postForm.avatar = res
        })
      })
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
    if (this.postForm.avatar === '') {
      this.postForm.avatar = this.image
    }
    (this.$refs.postForm as Form).validate(valid => {
      if (valid) {
        this.saveForm()
      } else {
        return false
      }
    })
  }

  private resetForm() {
    (this.$refs.postForm as Form).resetFields()
    this.image = 'https://via.placeholder.com/300x300'
    this.postForm.avatar = ''
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        this.postForm.adminsRole.id = this.postForm.adminsRoleId
        // delete this.postForm.password
        await updateAdmin(this.postForm.id, this.postForm)
      } else {
        if (this.postForm.avatar === '') { this.postForm.avatar = this.image }
        delete this.postForm.adminsRole
        await register(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Admin saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/admins/list')
    } catch (err) {
      this.loading = false
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
    border-bottom: 1px solid $textAreaBottom;
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

.pan:hover { opacity: 1}
</style>
