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
          label="Sub Category Name"
          prop="name"
          style="margin-bottom: 30px;"
        >
          <el-input
            v-model="postForm.name"
            name="name"
            style="width:50%"
            required
            placeholder="Sub Category Name"
          />
        </el-form-item>
        <el-form-item
          style="margin-bottom: 30px"
          label="Icon"
          prop="image"
        >
          <pan-thumb :image="image" /><br>
          <el-button
            type="primary"
            icon="el-icon-upload"
            name="image"
            tyle="position: absolute;bottom: 15px;margin-left: 40px;"
            @click="toggleShow"
          >
            Change Icon
          </el-button>
          <!-- <span style="font-weight:500"> (Minimum required resolution : 300*300)</span> -->
          <avatar-upload
            v-model="showImageUpload"
            field="avatar"
            name="image"
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px;"
          label="Feature"
          prop="feature"
        >
          <el-switch v-model="postForm.feature" />
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
import { addSubCategory, defaultSubCategoryData, getSubCategoryById, updateSubCategory } from '@/api/sub-category'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from '../../../router'
import { Action } from 'vuex-module-decorators'
import Dropzone from '@/components/Dropzone/index.vue'
import { uploadFile } from '@/api/common'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import PanThumb from '@/components/PanThumb/index.vue'

@Component({
  name: 'SubCategoryDetail',
  components: {
    Dropzone,
    AvatarUpload,
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private dialogVisibility:boolean=false
   private showImageUpload = false
  private image = 'https://via.placeholder.com/300'
  private resetImage = 'https://via.placeholder.com/300'
  private params = { some_params: 'your_params_goes_here' }
  private headers = { smail: '*_~' }

  private postForm = Object.assign({}, defaultSubCategoryData);
  private loading = false;
  private rules = {
    name: [
      { required: true, message: 'Please enter category name', trigger: 'blur' },
      {
        min: 3,
        max: 150,
        message: 'Length should be 3 to 150',
        trigger: 'blur'
      }
    ],
    image: [
      {
        message: 'Please enter image',
        required: true,
        trigger: 'blur'
      }
    ],
    priority: [
      { required: true, message: 'Please enter priority', trigger: 'blur' }

    ]

  };

  private toggleShow() {
    this.showImageUpload = !this.showImageUpload
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
          this.postForm.image = res
        })
      })
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
      this.postForm = Object.assign({}, defaultSubCategoryData)
      this.postForm.categoriesId = parseInt(
        this.$route.params && this.$route.params.id
      )
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getSubCategoryById(id)
      this.image = data.image
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
    this.image = this.resetImage;
    (this.$refs.postForm as Form).resetFields()
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        await updateSubCategory(this.postForm.id, this.postForm)
      } else {
        await addSubCategory(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Sub Category saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/subCategory/list/' + this.postForm.categoriesId)
    } catch (err) {
      this.loading = false
      this.$message(err.message)
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
