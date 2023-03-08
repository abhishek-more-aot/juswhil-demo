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
          <el-switch v-model="postForm.enabled" />
        </el-form-item> -->

        <el-form-item
          label="State Name"
          prop="name"
          style="margin-bottom: 20px"
        >
          <el-input
            v-model="postForm.name"
            name="name"
            style="width: 68%"
            required
            placeholder="State Name"
          />
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
          <el-button v-waves type="reset" @click="resetForm">
            {{ $t("global.form.reset") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  defaultStateData,
  addstate,
  updatestate,
  getstateById,
} from "@/api/state";
import { AppModule } from "@/store/modules/app";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import { Form } from "element-ui";
import router from "../../../router";
import { Action } from "vuex-module-decorators";
// import {arrangeLetters} from '@/utils/index'

@Component({
  name: "ZipCodeDetail",
  components: {},
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private showImageUpload = false;
  private params = { some_params: "your_params_goes_here" };
  private postForm = Object.assign({}, defaultStateData);
  private loading = false;

  private rules = {
    name: [
      { required: true, message: "Please enter State Name", trigger: "blur" },
      {
        pattern: "^[a-zA-Z0-9_]",
        message: "Space not allow at start of name",
        trigger: ["blur", "change"],
      },
    ],
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language;
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    } else {
      this.postForm = Object.assign({}, defaultStateData);
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route);
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getstateById(id);
      this.postForm = data;
      // Just for test
      //  const title = this.postForm.email
      // Set tagsview title
      //  this.setTagsViewTitle(title)
      // Set page title
      //  this.setPageTitle(title)
    } catch (err) {
      console.error(err);
    }
  }

  private setTagsViewTitle(title: string) {
    const tagView = this.tempTagView;
    if (tagView) {
      tagView.title = `${title}-${this.postForm.id}`;
      TagsViewModule.updateVisitedView(tagView);
    }
  }

  private setPageTitle(title: string) {
    document.title = `${title} - ${this.postForm.id}`;
  }

  private submitForm() {
    (this.$refs.postForm as Form).validate((valid) => {
      if (valid) {
        this.saveForm();
      } else {
        console.error("Submit Error!");
        return false;
      }
    });
  }

  private resetForm() {
    (this.$refs.postForm as Form).resetFields();
  }

  @Action
  public async saveForm() {
    try {
      
      this.loading = true;
      // this.postForm.countryId =1;
      // this.postForm.name=arrangeLetters(this.postForm.name);
      if (this.isEdit) {
        await updatestate(this.postForm.id, this.postForm).then((res: any) => {
          this.$notify({
            title: "Success",
            message: "State saved successfully",
            type: "success",
            duration: 2000,
          });
          router.push("/state/list");
        });
      } else {
        
        await addstate(this.postForm)
          .then((res: any) => {
            ;
            // if (res.statusCode === 200) {
              this.$notify({
                title: "Success",
                message: "State saved successfully",
                type: "success",
                duration: 2000,
              });
              router.push("/state/list");
            // }
          })
          // .catch((res: any) => {
          //   if (res.statusCode === 500) {
          //     this.loading = false;
          //     this.$notify({
          //       title: "Warning",
          //       message: "State name already exist.",
          //       type: "warning",
          //       duration: 3000,
          //     });
          //   }
          // });
      }
    } catch (err) {
      this.loading = false;
      // this.$message(err.message)
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
