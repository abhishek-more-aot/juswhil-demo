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
        <!-- <el-form-item
          style="margin-bottom: 20px;"
          label="Enabled"
          prop="enabled"
        >
          <el-switch v-model="postForm.enabled" />
        </el-form-item> -->
        <el-form-item style="margin-bottom: 20px" label="Name" prop="fullName">
          <el-input
            v-model="postForm.fullName"
            name="fullName"
            required
            maxlength="30"
            style="width: 50%"
            placeholder="Name"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 20px" label="User Type" prop="userType">
          <el-select
            v-model="postForm.status"
            clearable
            name="userType"
            style="width: 50%"
            placeholder="Select"
          >
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom: 20px" label="Company name" prop="companyName">
          <el-input
            v-model="postForm.companyName"
            name="companyName"
            required
            style="width: 50%"
            placeholder="Company name"
          />
        </el-form-item>

        <el-form-item
          v-if="!isEdit"
          style="margin-bottom: 20px"
          label="Contact Number"
          prop="contactNumber"
        >
          <el-input
            v-model="postForm.contactNumber"
            name="contactNumber"
            required
            style="width: 50%"
            placeholder="Contact Number"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 20px" label="Email" prop="email">
          <el-input
            v-model="postForm.email"
            name="email"
            required
            style="width: 50%"
            placeholder="Email"
          />
        </el-form-item>
          <el-form-item style="margin-bottom: 20px" label="State" prop="stateId">
          <el-select
            v-model="postForm.stateId"
            clearable
            name="userType"
            style="width: 50%"
            placeholder="Select"
            @change="getCities(postForm.stateId)"
          >
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
          <el-form-item style="margin-bottom: 20px" label="City" prop="cityId">
          <el-select
            v-model="postForm.cityId"
            clearable
            name="userType"
            style="width: 50%"
            placeholder="Select"
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
         <el-form-item style="margin-bottom: 20px" label="Address" prop="address">
          <el-input
            v-model="postForm.address"
            name="address"
            required
            type="textarea"
            rows="2"
            style="width: 50%"
            placeholder="address"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 20px" label="Pincode" prop="pincode">
          <el-input
            v-model="postForm.pincode"
            name="pincode"
            required
            style="width: 50%"
            placeholder="Pincode"
          />
        </el-form-item>

        <el-form-item>
          <el-button v-loading="loading" v-waves type="success" @click="submitForm">
            {{ $t("global.form.save") }}
          </el-button>
          <el-button v-if="!isEdit" v-waves type="reset" @click="resetForm">
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
import { getAdminById, defaultAdminData, updateAdmin, register } from "@/api/admins";
import { AppModule } from "@/store/modules/app";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import { Form } from "element-ui";
import router from "./../../../router";
import { Action } from "vuex-module-decorators";
import { getAdminsRoles } from "@/api/adminsRoles";
import { getQuery } from "../../../utils";
import { defaultUsersData, updateUser, addUser, getUserById } from "@/api/users";
import PanThumb from "@/components/PanThumb/index.vue";
import AvatarUpload from "@/components/AvatarUpload/index.vue";
import { uploadFile } from "@/api/common";
import {
 
  getstate,
  
} from "@/api/state";
import {
  
  getcities,
  
} from "@/api/cities";
@Component({
  name: "TypeDetail",
  components: {
    PanThumb,
    AvatarUpload,
  },
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private redirectionType: any = [
    {
      id: "0",
      name: "Link",
    },
    {
      id: "1",
      name: "Contact Page",
    },
    {
      id: "2",
      name: "About Page",
    },
  ];

  private postForm = Object.assign({}, defaultUsersData);
  private loading = false;
  private showImageUpload = false;
  private image = "https://via.placeholder.com/154";
  private toggleShow() {
    this.showImageUpload = !this.showImageUpload;
  }

  private onCropUploadSuccess(jsonData: any, field: string) {
    this.showImageUpload = false;
    this.image = jsonData.files[field];
  }

  private onClose() {
    this.showImageUpload = false;
  }
  private stateList:any =[];
  private cityList:any =[]
  private async getState(){
   let data:any= await getstate(getQuery({
    page: 1,
    limit: 1000,
    sort: "id,DESC",
    enabled:true,
    filter: {
      name: "$contL",
      enabled: "eq",
    },
   }))
   this.stateList= data.data
  }
   private async getCities(stateId:number){
   this.cityList = [];
   let data:any= await getcities(getQuery({
    page: 1,
    limit: 1000,
    sort: "id,DESC",
    stateId:stateId,
    enabled:true,
    filter: {
      
      stateId:'eq',
      enabled: "eq",
    },
   }))
   this.cityList= data.data;
  
  }

  private rules = {
    fullName: [
      {
        required: true,
        message: "Please enter full name",
        trigger: ["blur", "change"],
      },
      { min: 3, message: "Length should be greater than 3", trigger: ["blur", "change"] },
      {
        pattern: "^[a-zA-Z ]*$",
        message: "Name should contain characters only",
        trigger: ["blur", "change"],
      },
      {
        pattern: '^[a-zA-Z]{4,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$',
        message: 'Spaces are not allowed',
        trigger: ['blur', 'change']
      }
    ],
    pincode: [
      {
        required: true,
        message: "Please enter pincode",
        trigger: ["blur", "change"],
      },
      { 
        trigger: ["blur", "change"],
        pattern: "^[0-9]*$",
        message: "Please enter correct pincode",
        
      }
    ],
    companyName: [
      {
        required: true,
        message: "Please enter compnay name",
        trigger: ["blur", "change"],
      },
      // {
      //   pattern: '^[a-zA-Z ]*$',
      //   message: 'Name should contain characters only',
      //   trigger: ['blur', 'change']
      // }
    ],
    email: [
      // {
      //   required: true,
      //   message: 'Please enter email',
      //   trigger: 'blur'
      // },
      {
        type: "email",
        message: "Please enter correct email",
        trigger: ["blur", "change"],
      },
    ],

    contactNumber: [
      {
        required: true,
        message: "Please enter contact number",
        trigger: "blur",
      },
      {
        trigger: ["blur", "change"],
        pattern: "(^[0-9]*$)",
        message: "Contact number should contain number only",
      },
      {
        max: 10,
        min: 10,
        message: "Length should be of 10 Digits",
        trigger: ["blur", "change"],
      },
    ],
  };

  private tempTagView?: ITagView;

  get lang() {
    return AppModule.language;
  }

  private userList = [
    { label: "User", value: 1 },
    { label: "CNF", value: 2 },
    { label: "Super Stockist", value: 3 },
    { label: "CD", value: 4 },
    { label: "SD", value: 5 },
    { label: "WB", value: 6 },
    { label: "MRP", value: 7 },
    { label: "COP", value: 8 },
    { label: "SOP", value: 9 },
  ];
  private stateId:any;
  created() {
    this.getState();
    this.getCities(this.stateId);
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    } else {
      this.postForm = Object.assign({}, defaultUsersData);
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route);
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getUserById(id);
      this.postForm = data;
      this.image = data.image;
      this.postForm.pincode = data.pincode.toString();
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
    this.image = "https://via.placeholder.com/154";
  }

  @Action
  public async saveForm() {
    try {
      //  this.postForm.countryId=1;
      // this.postForm.pincode = Number(this.postForm.pincode);
      // if (this.postForm.pincode == 0) {
      //   this.postForm.pincode = null;
      // }
      this.loading = true;
      if (this.isEdit) {
        this.postForm.state=({id:this.postForm.stateId})
         this.postForm.city=({id:this.postForm.cityId})

        await updateUser(this.postForm.id, this.postForm);
        this.$notify({
          title: "Success",
          message: "Data saved successfully",
          type: "success",
          duration: 2000,
        });
        router.push("/user/list");
      } else {
        await addUser(this.postForm).then((res: any) => {
          if (res.responseCode === 200) {
            this.loading = false;
            this.$notify({
              title: "Success",
              message: "Data saved successfully",
              type: "success",
              duration: 2000,
            });
            router.push("/user/list");
          } else {
            this.$message.error("Oops, this is a error message.");
            this.loading = false;
          }
        });
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
</style>
