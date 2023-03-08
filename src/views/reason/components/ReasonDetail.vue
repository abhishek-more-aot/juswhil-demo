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
        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" /> </el-form-item> -->
        <el-form-item
          style="margin-bottom: 20px;"
          label="Reason"
          prop="reason"
        >
          <el-input
            v-model="postForm.reason"
            name="reason"
            style="width:50%"
            required
            placeholder="reason"
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
  getReasonById,
  defaultReasonData,
  updateReason,
  createReason
} from '@/api/reason'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'

@Component({
  name: 'ReasonDetail',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  private postForm = Object.assign({}, defaultReasonData);
  private loading = false;
  private rules = {
    reason: [
      {
        required: true,
        message: 'Please enter reason',
        trigger: 'blur'
      },
      { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'blur' },
      {
        pattern: '^[a-zA-Z0-9]',
        message: 'No Special Characters allowed',
        trigger: ['blur', 'change']
      }
    ]
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    } else {
      this.postForm = Object.assign({}, defaultReasonData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getReasonById(id)
      this.postForm = data
      // Just for test
      // const title = this.postForm.name
      // Set tagsview title
      // this.setTagsViewTitle(title)
      // Set page title
      // this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err)
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
        await updateReason(this.postForm.id, this.postForm)
      } else {
        await createReason(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Reason added successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/reason/list')
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
