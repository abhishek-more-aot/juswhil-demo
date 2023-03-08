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
         <el-form-item style="margin-bottom: 30px" label="Image" prop="image">
            <upload-image
              :key="renderKey"
              :form-field="postForm.image"
              @handle-upload="updateImage"
              @handle-remove="removeImage"
            />
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="Only Image of dimension 1000 * 1000 is accepted"
              placement="left-start"
            >
              <span class="el-icon-question" style="font-size: 20px" />
            </el-tooltip> -->
          </el-form-item>

        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Image"
          prop="image"
        >
          <div
            style="margin: auto;padding: 10px;display: flex;align-items: center;background:white;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
          >
            <div style="width:50%;text-align:center;">
              <pan-thumb
                :image="image"
                width="350px"
                height="150px"
              />
            </div>
            <div
              style="float:right;text-align:center;padding-left:30px;border-left:2px solid red;width:50%"
            >
              <unicon
                name="upload"
                height="50"
                width="50"
                class="card-panel-icon"
                fill="red"
              />
              <br>
              <el-button
                type="primary"
                icon="el-icon-upload"
                @click="toggleShow"
              >
                Browse
              </el-button>
            </div>
          </div>
          <avatar-upload
            v-model="showImageUpload"
            field="file"  
            @crop-success="cropSuccess"
            @close="onClose"
            @crop-upload-success="onCropUploadSuccess"
          />
        </el-form-item> -->

        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Type"
          prop="redirectionOption"
        >
          <el-select
            v-model="postForm.redirectionOption"
            name="redirectionOption"
            filterable
            placeholder="Select"
            @change="fetchValues()"
          >
            <el-option
              v-for="item in redirectionOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="postForm.redirectionOption == 0"
          style="margin-bottom: 20px;"
          label="Category"
          prop="redirectionValue"
          :rules="{required: true, message: 'Please input category', trigger: ['blur','change']}"
        >
          <el-select
            v-model="postForm.redirectionValue"
            name="redirectionValue"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in redirectionValue"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        
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
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getAdminsRoles } from '@/api/adminsRoles'
import { getQuery } from '../../../utils'
import {
  defaultGalleryData,
  updateGallery,
  addGallery,
  getGalleryById
} from '@/api/gallery/gallerys'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'
import { getCategorys } from '@/api/category'
import UploadImage from '@/components/UploadImage/index.vue'
import { getProducts } from '@/api/product'

@Component({
  name: 'GalleryDetail',
  components: {
    PanThumb,
    AvatarUpload,
    UploadImage
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private redirectionValue: any = []
  private renderKey:any;
  private redirectionOption: any = [
    {
      id: 0,
      name: 'Category Page'
    }
  ];

  private showImageUpload = false;
  private image =
    'https://via.placeholder.com/1000x1000';

  private postForm = Object.assign({}, defaultGalleryData);
  private loading = false;
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
        }).then((res) => {
          this.postForm.image = res.toString()
        })
      })
  }

  private rules = {

    image: [
      {
        message: 'Please enter image',
        required: true,
        trigger: 'blur'
      }
    ],
    redirectionType: [
      {
        message: 'Please enter type',
        required: true,
        trigger: 'blur'
      }
    ]
  };

  private updateImage(res:any){
    this.postForm.image =res;

  }
   private removeImage(){
    this.postForm.image ='';
    
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
      this.postForm = Object.assign({}, defaultGalleryData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getGalleryById(id)
      this.postForm = data
      this.renderKey++
      this.image = data.image
      this.fetchValues()
      // Just for test
      const title = 'image'
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
    }
  }

  private async fetchValues() {
    this.redirectionValue = await getCategorys(getQuery({
      enabled: true,
      isDeleted: false,
      filter: {
        enabled: 'eq',
        isDeleted: 'eq'
      }
    }))
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
    (this.$refs.postForm as Form).validate((valid) => {
      if (valid) {
        this.saveForm()
      } else {
        return false
      }
    })
  }

  private resetForm() {
    (this.$refs.postForm as Form).resetFields()
    this.image = 'https://via.placeholder.com/'
    this.renderKey--
    this.postForm.image = ''
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        await updateGallery(this.postForm.id, this.postForm)
      } else {
        await addGallery(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Gallery saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/gallery/list')
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
</style>
