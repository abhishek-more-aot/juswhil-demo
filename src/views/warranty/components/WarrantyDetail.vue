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
          style="margin-bottom: 20px"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="First Name"
          prop="firstName"
        >
          <el-input
            v-model="postForm.firstName"
            name="firstName"
            style="width: 50%"
            required
            placeholder="First Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="Last Name"
          prop="lastName"
        >
          <el-input
            v-model="postForm.lastName"
            name="lastName"
            style="width: 50%"
            required
            placeholder="Last Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="Phone Number"
          prop="contactNumber"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            style="width: 50%"
            required
            placeholder="Phone Number"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 20px" label="Email" prop="email">
          <el-input
            v-model="postForm.email"
            name="email"
            style="width: 50%"
            required
            placeholder="Email"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px; margin-top: 20px"
          label="Products Id"
          prop="productsId"
        >
          <el-select
            v-model="postForm.productsId"
            name="productsId"
            style="width: 50%"
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
          style="margin-bottom: 20px; margin-top: 20px"
          label="Purchased From"
          prop="purchasedFromId"
        >
          <el-select
            v-model="postForm.purchasedFromId"
            name="purchasedFromId"
            style="width: 50%"
            filterable
            placeholder="Select"
            @change="fetchValues()"
          >
            <el-option
              v-for="item in purchasedFromOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px; margin-top: 20px"
          label="Purchased Date"
          prop="purchasedDate"
        >
          <el-date-picker
            style="width: 50%"
            v-model="postForm.purchasedDate"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px; margin-top: 20px"
          label="Invoice"
          prop="invoice"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="uploadDocument"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            multiple
            :on-exceed="handleExceed"
            :show-file-list="false"
          >
            <el-button
              v-loading="documentLoading"
              size="small"
              type="primary"
            >
              Click to upload
            </el-button>
          </el-upload>
          <div v-if="postForm.invoice != ''">
              <el-tag
                type="danger"
                style="color:blue"
                :closable="true"
                @close="handleCloseDocument"
              >
                <a
                  :href="this.postForm.invoice"
                  target="_blank"
                >{{
                  this.postForm.invoice.split("/")[this.postForm.invoice.split("/").length - 1]
                }}</a>
              </el-tag>
          </div>
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px; margin-top: 20px"
          label="Categories Id"
          prop="categoriesId"
        >
          <el-select
            v-model="postForm.categoriesId"
            name="categoriesId"
            style="width: 50%"
            filterable
            placeholder="Select"
            @change="fetchCategories()"
          >
            <el-option
              v-for="item in CategoriesOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { AppModule } from "@/store/modules/app";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import { Form } from "element-ui";
import router from "../../../router";
import { Action } from "vuex-module-decorators";
import { getAdminsRoles } from "@/api/adminsRoles";
import { getQuery } from "../../../utils";
import {
  defaultWarrantyData,
  updateWarranty,
  addWarranty,
  getWarranty,
  getWarrantyById,
} from "@/api/warranty";
import PanThumb from "@/components/PanThumb/index.vue";
import AvatarUpload from "@/components/AvatarUpload/index.vue";
import { uploadFile } from "@/api/common";
import { getCategorys } from "@/api/category";
import UploadImage from "@/components/UploadImage/index.vue";

@Component({
  name: "WarrantyDetail",
  components: {
    // PanThumb,
    // AvatarUpload,
    UploadImage,
  },
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private redirectionValue: any = [];
  private redirectionValue1: any = [];
  private redirectionOption: any = [
    {
      id: 0,
      name: "Category Page",
    },
    {
      id: 1,
      name: "Category Page 1",
    },
  ];
  private purchasedFromOption: any = [
    {
      id: 0,
      name: "Purchased Product 1",
    },
    {
      id: 1,
      name: "Purchased Product 2",
    },
  ];
  private CategoriesOption: any = [
    {
      id: 0,
      name: "Category Product 1",
    },
    {
      id: 2,
      name: "Category Product 2",
    }
  ]

  private documentLoading = false;
  private showImageUpload = false;
  private renderKey = 0;
  private image = "https://via.placeholder.com/";

  private postForm = Object.assign({}, defaultWarrantyData);
  private loading = false;
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload;
  }
  // private updateBannerImage(res:any){
  //   this.postForm.image=res;
  // }

  //  private removeBannerImage(){
  //   this.postForm.image='';
  // }

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false;
    this.image = jsonData.files[field];
  }

  private onClose() {
    this.showImageUpload = false;
  }

  private rules = {
    image: [
      {
        message: "Please enter image",
        required: true,
        trigger: "blur",
      },
    ],
    redirectionType: [
      {
        message: "Please enter type",
        required: true,
        trigger: "blur",
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
      this.postForm = Object.assign({}, defaultWarrantyData);
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route);
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getWarrantyById(id);
      this.postForm = data;
      this.renderKey++;
      this.image = data.image;
      this.fetchValues();
      this.fetchCategories();
      // Just for test
      const title = "image";
      // Set tagsview title
      this.setTagsViewTitle(title);
      // Set page title
      this.setPageTitle(title);
    } catch (err) {
      Promise.reject(err);
    }
  }

  // Document Upload
  private async uploadDocument(param: any) {
    var fileObj = param.file
    var form = new FormData()
    form.append('file', fileObj)
    this.documentLoading = true
    await uploadFile(form, (event: ProgressEvent) => {
      this.documentLoading = false
      console.log(event)
    }).then((res) => {
      this.postForm.invoice = res.toString()
      this.documentLoading = false
      debugger
    })
    this.documentLoading = false
  }
  handlePreview(file: any) {
    console.log(file)
  }
  handleRemove(file: any, fileList: any) {
    console.log(file, fileList)
  }
  beforeUpload(file:any){
    const doc= file.type == 'application/pdf'?true:false
    if(!doc){
      this.$message.error('Only pdf file upload');
      
    }
    return doc
  }
  private handleCloseDocument(tag:any) {
    this.postForm.invoice = ""
  }

  private async fetchValues() {
    this.redirectionValue = await getWarranty(
      getQuery({
        enabled: true,
        isDeleted: false,
        filter: {
          enabled: "eq",
          isDeleted: "eq",
        },
      })
    );
  }
  private async fetchCategories(){
    this.redirectionValue1 = await getWarranty(
      getQuery({
        enabled: true,
        isDeleted: false,
        filter: {
          enabled: "eq",
          isDeleted: "eq",
        },
      })
    )
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
        return false;
      }
    });
  }

  private resetForm() {
    (this.$refs.postForm as Form).resetFields();

    this.renderKey--;
    // this.postForm.image = ''
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true;
      if (this.isEdit) {
        await updateWarranty(this.postForm.id, this.postForm);
      } else {
        await addWarranty(this.postForm);
      }

      this.$notify({
        title: "Success",
        message: "Warranty saved successfully",
        type: "success",
        duration: 2000,
      });
      router.push("/warranty/list");
    } catch (err) {
      this.loading = false;
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
