<template>
  <el-form
    ref="postForm"
    :model="postForm"
    :rules="rules"
  >
    <el-form-item
      label="Fullname"
      prop="fullName"
      style="margin-bottom: 20px;"
    >
      <el-input
        v-model="postForm.fullName"
        name="fullName"
      />
    </el-form-item>
    <el-form-item
      label="Email"
      prop="email"
      style="margin-bottom: 20px;"
    >
      <el-input
        v-model="postForm.email"
        name="email"
        readonly="true"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item
      label="Gender"
      prop="gender"
      style="margin-bottom: 20px;"
    >
      <el-select
        v-model="postForm.gender"
        style="width:100%"
        name="gender"
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
     <el-form-item label="Role">
      <el-input
        v-model.trim="user.roles"
        readonly
        :disabled="true"
      />
    </el-form-item> 
    <el-form-item
      label="Avatar"
      style="margin-bottom: 20px;"
    >
      <br>
      <pan-thumb
        :image="postForm.avatar"
        style="height:100px;width:100px"
      /><br>
      <el-button
        type="primary"
        icon="el-icon-upload"
        tyle="position: absolute;bottom: 15px;margin-left: 40px;"
        @click="toggleShow"
      >
        Change Avatar
      </el-button>
      <avatar-upload
        v-model="showImageUpload"
        field="avatar"
        @crop-success="cropSuccess"
        @close="onClose"
        @crop-upload-success="onCropUploadSuccess"
      />
    </el-form-item>
   
    <el-form-item>
      <el-button
        type="primary"
        @click="submit"
      >
        Update
      </el-button>

      <el-button
        type="primary"
        @click="dialogFormVisible = true"
      >
        Change Password
      </el-button>
      <el-dialog
        title="Change Password"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          ref="changePasswordForm"
          :model="changePasswordForm"
          :rules="rules"
        >
          <el-form-item
            label="Current Password"
            label-width="140px"
            style="margin-bottom: 20px"
            prop="password"
          >
            <el-input
              v-model="changePasswordForm.password"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item
            id="newPassword"
            label="New Password"
            label-width="140px"
            prop="newPassword"
            style="margin-bottom: 20px"
          >
            <el-input
              v-model="changePasswordForm.newPassword"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="Confirm Password"
            label-width="140px"
            prop="confirmPassword"
            style="margin-bottom: 20px"
          >
            <el-input
              v-model="changePasswordForm.confirmPassword"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            v-loading="changePasswordLoading"
            type="primary"
            @click="changePassword()"
          >Confirm</el-button>
        </span>
      </el-dialog>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { uploadFile } from '@/api/common'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'
import {
  getAdminById,
  defaultAdminData,
  updateAdmin,
  UpdatePassword,
  register
} from '@/api/admins'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Action } from 'vuex-module-decorators'
import { Form } from 'element-ui'
import router from '@/router'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'Account',
  components: {
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile
   private image = this.user.avatar ? this.user.avatar : 'https://stumpz.s3.ap-south-1.amazonaws.com/1611434872392-img.png'
  private showImageUpload = false
  private dialogFormVisible = false;
  private changePasswordLoading = false;
  private tempTagView?: ITagView;
  private postForm = Object.assign({}, defaultAdminData);
  private loading = false;
  private genderList = [
    { label: 'Female', value: 0 },
    { label: 'Male', value: 1 },
    { label: 'Others', value: 2 }
  ];

  created() {
    this.fetchData(AdminModule.id)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getAdminById(id)
      this.postForm = data
      this.image = data.avatar

      // Just for test
      const title = this.postForm.email
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  private changePasswordForm: any = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  };

  private validatenewPassword:any = this.validate

  validate(rule: any, value: string, callback: Function) {
    if (this.changePasswordForm.newPassword.length > 1) {
      if (this.changePasswordForm.newPassword != value) {
        callback(new Error('Passwords does not match'))
      }
    } else {
      callback()
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

  private submit() {
    (this.$refs.postForm as Form).validate(valid => {
      if (valid) {
        this.saveForm()
      } else {
        return false
      }
    })
  }

  @Action
  public async saveForm() {
    try {
      this.postForm.adminsRole.id = this.postForm.adminsRoleId
      // delete this.postForm.password

      await updateAdmin(this.postForm.id, this.postForm)

      this.$notify({
        title: 'Success',
        message: 'Admin saved successfully',
        type: 'success',
        duration: 2000
      })
      window.location.reload()
    } catch (err) {
      this.loading = false
    }
  }

  private async changePassword() {
    (this.$refs.changePasswordForm as Form).validate(async(valid: boolean) => {
      if (this.changePasswordForm.newPassword === this.changePasswordForm.confirmPassword) {
        if (valid) {
          this.changePasswordLoading = true
          const data:any = {
            oldPassword: this.changePasswordForm.password,
            newPassword: this.changePasswordForm.newPassword
          }
          const response:any = await UpdatePassword(data).then((res:any) => {
            if (res.responseCode == 200) {
              this.$message({
                message: 'password changed successfully.',
                type: 'success'
              })
              this.changePasswordLoading = false
              this.dialogFormVisible = false;
              (this.$refs.changePasswordForm as Form).resetFields()
            } else {
              this.$message({
                message: 'Incorrect current password',
                type: 'error'
              })
              this.changePasswordLoading = false
            }
          }).catch(res => {
            this.$message.error('Some error occured')
          })
        } else {
          this.$message({
            message: 'Enter all details',
            type: 'error'
          })
          return false
        }
      } else {
        this.$message({
          message: 'Password doesn\'t match',
          type: 'error'
        })
        return false
      }
    })
  }

   private rules = {
     fullName: [
       {
         required: true,
         message: 'Please enter full name',
         trigger: ['blur', 'change']
       },
       { min: 3, message: 'Length should be greater than 3', trigger: ['blur', 'change'] },
       {
        //  pattern: '[A-Za-z]+$',
         pattern: '[A-Za-z]+$',
         message: 'Name should contain characters only',
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
         pattern: '[123456789][0-9]*$',
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
         message: 'Length should be between 10-50 characters',
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
       }
     ],
     gender: [
       {
         required: true,
         message: 'Please enter gender',
         trigger: ['blur', 'change']
       }
     ],

     newPassword: [
       { required: true, message: 'Please enter new password', trigger: 'blur' }
     ],
     confirmPassword: [
       {
         required: true,
         message: 'Please enter confirm password',
         trigger: 'blur'
       }
       // { validator: this.validatenewPassword, trigger: 'blur' }
     ]
   };
}
</script>
