<template>
  <div class="form-block">
    <div class="source">
      <el-form
        ref="postForm"
        :model="postForm"
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

        <el-form-item style="margin-bottom: 20px" label="Name" prop="name">
          <el-input
            v-model="postForm.name"
            name="name"
            style="width: 50%"
            required
            placeholder="Name"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="Model Number"
          prop="modelNumber"
        >
          <el-input
            v-model="postForm.modelNumber"
            name="modelNumber"
            style="width: 50%"
            required
            placeholder="Model Number"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="Description"
          prop="description"
        >
          <vue-editor v-model="postForm.description" />
          <!-- <el-input
            v-model="postForm.description"
            name="description"
            type="textarea"
            style="width: 50%"
            :rows="4"
            required
            placeholder="Description"
          /> -->
        </el-form-item>

        <!-- <el-form-item
          style="margin-bottom: 30px"
          label="mrpPrice"
          prop="mrpPrice"
        >
          <el-input
            type="number"
            v-model="postForm.mrpPrice"
            name="mrpPrice"
            style="width:50%"
            required
            placeholder="mrpPrice"
          />
        </el-form-item> -->

        <el-form-item style="margin-bottom: 30px" label="Featured Image" prop="image">
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
          style="margin-bottom: 20px"
          label="Featured Image"
          prop="image"
        >
          <pan-thumb :image="image" /><br>
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
        </el-form-item> -->

        <el-form-item
          style="margin-bottom: 50px"
          label="Product images"
          prop="productImages"
        >
          <br />
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :on-change="uploadImages"
            list-type="picture-card"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept="image/jpeg,image/png"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :file-list="fileList"
            drag
            limit="6"
            multiple
          >
            <i slot="default" class="el-icon-plus" />
            <span style="color: red; margin-left: 10px"
              >only .JPG/PNG files</span
            >

            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <!-- Amazon Link -->
        <el-form-item
          style="margin-bottom: 20px"
          label="Amazon Link"
          prop="amazonLink"
        >
          <el-input
            v-model="postForm.amazonLink"
            name="amazonLink"
            style="width: 50%"
            required
            placeholder="Amazon Link"
          />
        </el-form-item>
        <!-- Amazon Link -->

        <!-- Flipkart Link -->
        <el-form-item
          style="margin-bottom: 20px"
          label="Flipkart Link"
          prop="flipkartLink"
        >
          <el-input
            v-model="postForm.flipkartLink"
            name="flipkartLink"
            style="width: 50%"
            required
            placeholder="Flipkart Link"
          />
        </el-form-item>
        <!-- Flipkart Link -->

        <!-- Myntra Link -->
        <el-form-item
          style="margin-bottom: 20px"
          label="Myntra Link"
          prop="myntraLink"
        >
          <el-input
            v-model="postForm.myntraLink"
            name="myntraLink"
            style="width: 50%"
            required
            placeholder="Myntra Link"
          />
        </el-form-item>
        <!-- Myntra Link -->


        <el-form-item
          style="margin-bottom: 20px"
          label="Trending"
          prop="trending"
        >
          <el-switch v-model="postForm.trending" />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px" label="New" prop="new">
          <el-switch v-model="postForm.new" />
        </el-form-item>

        <el-form-item>
          <el-button
            v-loading="loading"
            v-waves
            style="background: #59b6e3; border: 1px solid #59b6e3"
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
import { isValidURL } from "@/utils/validate";
import {
  getAdminById,
  defaultAdminData,
  updateAdmin,
  register,
} from "@/api/admins";
import { AppModule } from "@/store/modules/app";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import { Form } from "element-ui";
import router from "./../../../router";
import { Action } from "vuex-module-decorators";
import { getAdminsRoles } from "@/api/adminsRoles";
import { getQuery } from "../../../utils";
import {
  defaultProductData,
  updateProduct,
  addProduct,
  getProductById,
} from "@/api/product";
import PanThumb from "@/components/PanThumb/index.vue";
import AvatarUpload from "@/components/AvatarUpload/index.vue";
import { uploadFile } from "@/api/common";
import { getCategorys } from "@/api/category";
import { getOptions } from "@/api/option";
import Axios from "axios";
import { getOptionValues } from "@/api/optionValues";
import { getGst } from "@/api/gst";
import UploadImage from "@/components/UploadImage/index.vue";
import Vue2Editor from "vue2-editor";
// import { getUnit } from '@/api/unit'
@Component({
  name: "TypeDetail",
  components: {
    PanThumb,
    AvatarUpload,
    UploadImage,
    Vue2Editor,
  },
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  private postForm = Object.assign({}, defaultProductData);
  private loading = false;
  private showImageUpload = false;
  private showSketchUpload = false;
  private categoriesList: any = [];
  private optionsList: any = [];
  private optionValuesList: any = [];
  private productPhotosArr: any = [];
  private photos: any = [];
  private renderKey: any;
  dialogImageUrl = "";
  private imageEdited = false;
  dialogVisible = false;
  disabled = false;
  private fileList: any = [];
  private editList: any = [];
  private unitList: any = [];
  private gstList: any = [];
  private unitChanged = false;
  private image = "https://via.placeholder.com/300";
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload;
  }

  private toggleSketch() {
    this.showSketchUpload = !this.showSketchUpload;
  }

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false;
    this.showSketchUpload = false;
    this.image = jsonData.files[field];
  }

  private onClose() {
    this.showImageUpload = false;
  }

  private onSketchClose() {
    this.showSketchUpload = false;
  }
  private updateImage(res: any) {
    this.postForm.image = res;
  }
  private removeImage() {
    this.postForm.image = "";
  }

  // private async fetchUnits() {
  //   const data: any = await getUnit(getQuery({}))
  //   this.unitList = data
  //
  // }

  private handleUnitChange(field: any) {
    if (this.isEdit) {
      if (field !== "") {
        this.postForm.unit = {
          id: field,
        };
      } else if (field === "") {
        delete this.postForm.unit;
        this.postForm.unitId = null;
        this.postForm.unit = {
          id: null,
        };
      }

      this.unitChanged = true;
    }
  }

  private cropSuccess(imgDataUrl: string, field: string) {
    this.image = imgDataUrl;
    const data = new FormData();
    fetch(imgDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "img." + blob.type.split("/")[1], {
          type: "image/png",
        });
        data.append("file", file);
        uploadFile(data, (event: ProgressEvent) => {
          console.log(event);
        }).then((res: any) => {
          this.postForm.image = res;
        });
      });
  }

  async uploadImages(file: any, fileList: any) {
    // var isIMAGE = false
    // if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png') {
    //
    //   isIMAGE = true
    // }
    // if (!isIMAGE) {
    //   this.fileList.forEach((element:any, index:any) => {
    //     if (file.raw.name === element.name) {
    //       fileList.splice(index, 1)
    //       this.fileList.splice(index, 1)
    //     }
    //   })
    //   this.$message.error('Avatar picture must be JPG format!')
    // } else {
    const img = new Image();
    img.onload = () => {
      this.fileList = fileList;
      if (this.isEdit) {
        this.imageEdited = true;
        this.editList.push(file);
      }
    };
    img.src = file.url;
  }

  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }

  private handleRemove(file: any) {
    this.fileList.forEach((photo: any, index: any) => {
      if (photo.name === file.name) {
        this.fileList.splice(index, 1);
        this.postForm.productImages.splice(index, 1); // this.photos.splice(index, 1)
      }
    });
  }

  // Image upload size check
  beforeUpload(file: any) {
    var isIMAGE = false;
    if (file.raw.type === "image/jpeg" || file.raw.type === "image/png") {
      isIMAGE = true;
    }
    if (!isIMAGE) {
      this.$message.error("Avatar picture must be JPG format!");
    }

    return isIMAGE;
  }

  private async finalUpload() {
    if (!this.isEdit) {
      const formList: any = [];
      const callList: any = [];
      this.fileList.forEach((file: any) => {
        var fileObj = file.raw;
        var form = new FormData();
        form.append("file", fileObj);
        formList.push(form);
      });
      await formList.forEach(async (form: any) => {
        callList.push(
          uploadFile(form, async (event: ProgressEvent) => {
            console.log(event);
          })
        );
      });
      await Axios.all(callList).then((res) => {
        this.postForm.productImages = res;
      });
    } else if (this.isEdit) {
      const formList: any = [];
      const callList: any = [];
      this.editList.forEach((file: any) => {
        var fileObj = file.raw;
        var form = new FormData();
        form.append("file", fileObj);
        formList.push(form);
      });
      await formList.forEach(async (form: any) => {
        callList.push(
          uploadFile(form, async (event: ProgressEvent) => {
            console.log(event);
          })
        );
      });

      await Axios.all(callList).then(async (res) => {
        res.forEach((response: any) => {
          this.postForm.productImages.push(response);
        });
      });
    }
  }

  private rules = {
    name: [
      {
        required: true,
        message: "Please enter product name",
        trigger: ["blur", "change"],
      },
      {
        min: 3,
        message: "Length should be greater than 3",
        trigger: ["blur", "change"],
      },
      // {
      //   max: 20,
      //   pattern: '^[a-zA-Z]{4,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$',
      //   message: 'Spaces are not allowed',
      //   trigger: ['blur', 'change']
      // },
      // {
      //   pattern: '^[a-zA-Z ]*$',
      //   message: 'Name should contain characters only',
      //   trigger: ['blur', 'change']
      // }
    ],
    cnfPrice: [
      {
        required: true,
        message: "Enter CNF Price",
        trigger: ["blur", "change"],
      },
    ],
    superStockistPrice: [
      {
        required: true,
        message: "Enter Super Stocklist Price",
        trigger: ["blur", "change"],
      },
    ],
    cdPrice: [
      {
        required: true,
        message: "Enter CD Price",
        trigger: ["blur", "change"],
      },
    ],
    sdPrice: [
      {
        required: true,
        message: "Enter SD Price",
        trigger: ["blur", "change"],
      },
    ],
    copPrice: [
      {
        required: true,
        message: "Enter COP Price",
        trigger: ["blur", "change"],
      },
    ],
    sopPrice: [
      {
        required: true,
        message: "Enter SOP Price",
        trigger: ["blur", "change"],
      },
    ],
    // mrpPrice: [
    //   {
    //    required: true,
    //    message: "Enter MRP Price",
    //    trigger: ["blur","change"]
    //   },
    // ],
    wbPrice: [
      {
        required: true,
        message: "Enter WB Price",
        trigger: ["blur", "change"],
      },
    ],
    gstId: [
      {
        required: true,
        message: "Please select GST",
        trigger: "blur",
      },
    ],
    email: [
      {
        required: true,
        message: "Please enter email",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Please enter correct email",
        trigger: ["blur", "change"],
      },
    ],
    rating: [
      {
        required: true,
        message: "Please enter rating",
        trigger: "blur",
      },
    ],
    modelNumber: [
      {
        required: true,
        message: "Please enter Model Number",
        trigger: ["blur", "change"],
      },
    ],
    image: [
      {
        required: true,
        message: "Please enter image",
        trigger: "blur",
      },
    ],
    productOptionId: [
      {
        required: true,
        message: "Please select product Options",
        trigger: "blur",
      },
    ],
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language;
  }

  created() {
    // this.fetchUnits()
    this.fetchOption();
    this.fetchOptionValues();
    this.fetchGst();
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    } else {
      this.postForm = Object.assign({}, defaultProductData);
      this.postForm.categoriesId = parseInt(
        this.$route.params && this.$route.params.categoriesId
      );
      if (parseInt(this.$route.params && this.$route.params.subCategoryId)) {
        this.postForm.subCategoryId = parseInt(
          this.$route.params && this.$route.params.subCategoryId
        );
      }
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route);
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getProductById(id);
      this.postForm = data.product;
      this.renderKey++;

      this.image = data.product.image;

      data.product.productImages.forEach((image: any, index: any) => {
        this.fileList.push({ name: "image1" + index, url: image });
      });

      // Just for test
      // const title = this.postForm.title ? this.postForm.title : ''
      // Set tagsview title
      // this.setTagsViewTitle(title)
      // Set page title
      // this.setPageTitle(title)
    } catch (err) {
      Promise.reject(err);
    }
  }

  private async fetchOption() {
    try {
      this.optionsList = await getOptions(
        getQuery({
          enabled: true,
          filter: {
            enabled: "eq",
          },
        })
      );
    } catch (err) {
      Promise.reject(err);
    }
  }

  private async fetchOptionValues() {
    try {
      this.optionValuesList = await getOptionValues(
        getQuery({
          enabled: true,
          filter: {},
        })
      );
    } catch (err) {
      Promise.reject(err);
    }
  }

  private async fetchGst() {
    try {
      this.gstList = await getGst(
        getQuery({
          enabled: true,
          filter: { enabled: "eq" },
        })
      );
    } catch (err) {
      Promise.reject(err);
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

  private async submitForm() {
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
    this.image = "https://via.placeholder.com/300";
    this.fileList = [];
    this.renderKey--;
    this.postForm.image = "";
  }

  @Action
  public async saveForm() {
    try {
      await this.finalUpload();
      this.loading = true;
      if (this.isEdit) {
        if (this.imageEdited) {
          // await this.finalUpload()
        }
        this.postForm.gst = {
          id: this.postForm.gstId,
        };
        await updateProduct(this.postForm.id, this.postForm);

        this.$notify({
          title: "Success",
          message: "Data updated successfully",
          type: "success",
          duration: 2000,
        });
        // if (this.postForm.subCategoryId) {
        //   router.push(
        //     '/product/list/' +
        //       this.postForm.categoriesId +
        //       '/' +
        //       this.postForm.subCategoryId
        //   )
        // } else {
        this.loading = false;
        router.push("/product/list/" + this.postForm.categoriesId);
        // }

        // .catch((error: any) => {

        //   this.loading = false
        //   this.$message.error('some error occured.')
        //   console.log(error)
        // })
      } else {
        debugger;

        await addProduct(this.postForm);
        this.$notify({
          title: "Success",
          message: "Data saved successfully",
          type: "success",
          duration: 2000,
        });
        debugger;
        this.loading = false;
        router.push("/product/list/" + this.postForm.categoriesId);
      }
    } catch (err) {
      this.loading = false;
    }
  }

  // private imageUpload(file: any) {
  //   this.postForm.image = file.response
  // }

  // private sendToAllToggled() {
  //   if (this.postForm.sendToAll) {
  //     this.$confirm(
  //       'Are you sure want to send notification to All users?',
  //       'Attention!',
  //       {
  //         confirmButtonText: "Yes, I know what I'm doing",
  //         confirmButtonClass: 'el-button--success',
  //         cancelButtonText: this.$tc('table.cancel'),
  //         cancelButtonClass: 'el-button--danger',
  //         type: 'error'
  //       }
  //     )
  //       .then(confirm => {
  //         // let it confirm
  //         // clear other dropdowns
  //       })
  //       .catch(_ => {
  //         this.postForm.sendToAll = false
  //       })
  //   }
  // }
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
