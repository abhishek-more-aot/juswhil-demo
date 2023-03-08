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
        <div
          v-for="(cart,index) in postForm.addToCart"
          :key="index"
        >
          <el-card
            v-if="postForm.addToCart.length>0"
            class="box-card"
            style="width: 100%"
          >
            <div>
              <el-row>
                <el-col
                  :span="8"
                >
                  <el-avatar
                    :size="140"
                    :src="cart.product.image"
                    fit="fill"
                    shape="square"
                  />
                </el-col>
                <el-col
                  :span="16"
                >
                  <el-row>
                    <el-col><span v-if="cart.product.name"><b>{{ cart.product.name }}</b><br><br></span></el-col>
                    <el-col>
                      <el-form-item
                        style="margin-bottom: 20px;"
                        label="Quantity"
                        prop=""
                      >
                        <el-input-number
                          v-model="postForm.addToCart[index].quantity"
                          name="quantity"
                          :min="1"
                          required
                          style="width:50%"
                          placeholder="Quantity"
                        />
                        <br><span>{{ postForm.addToCart[index].multiplier }}</span>
                      </el-form-item>
                      <el-button
                        size="small"
                        type="danger"
                        icon="el-icon-delete"
                        @click="handleDelete(index)"
                      />
                      <el-button
                        size="small"
                        type="primary"
                        @click="changeQuantity(postForm.addToCart[index])"
                      >
                        update
                      </el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <br><br>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import {
  getAdminById,
  defaultAdminData,
  updateAdmin,
  register
} from '@/api/admins'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import { Form } from 'element-ui'
import router from './../../../router'
import { Action } from 'vuex-module-decorators'
import { getAdminsRoles } from '@/api/adminsRoles'
import { getQuery } from '../../../utils'
import { defaultOrderData, updateOrder, addOrder, getOrderById } from '@/api/order'
import PanThumb from '@/components/PanThumb/index.vue'
import AvatarUpload from '@/components/AvatarUpload/index.vue'
import { uploadFile } from '@/api/common'
import { updateCart } from '@/api/cart'
@Component({
  name: 'TypeDetail',
  components: {
    PanThumb,
    AvatarUpload
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;
  private redirectionType: any = [
    {
      id: '0',
      name: 'Link'
    },
    {
      id: '1',
      name: 'Contact Page'
    },
    {
      id: '2',
      name: 'About Page'
    }
  ];

  private postForm =Object.assign({}, defaultOrderData);
  private loading = false;
  private showImageUpload = false;
  private image = 'https://via.placeholder.com/154'
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
      }
    ],
    email: [
      // {
      //   required: true,
      //   message: 'Please enter email',
      //   trigger: 'blur'
      // },
      {
        type: 'email',
        message: 'Please enter correct email',
        trigger: ['blur', 'change']
      }
    ],
    pincode: [
      {
        pattern: '^[1-9][0-9]{5}$',
        message: 'Please enter correct pincode',
        trigger: ['blur', 'change']
      }
    ],

    contactNumber: [
      {
        required: true,
        message: 'Please enter contact number',
        trigger: 'blur'
      },
      {
        trigger: ['blur', 'change'],
        pattern: '(^[0-9]*$)',
        message: 'Contact number should contain number only'
      },
      {
        max: 10,
        min: 10,
        message: 'Length should be of 10 Digits',
        trigger: ['blur', 'change']
      }
    ]

  };

  handleDelete(index:any) {
    this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      if (index <= this.postForm.addToCart.length) {
        
        this.postForm.addToCart.splice(index, 1)
        this.postForm.addToCartIds.splice(index, 1)
        updateOrder(this.postForm.id, this.postForm).then(() => {
          
          this.$message({
            type: 'success',
            message: 'Delete successfully'
          })
        })
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
  }

  changeQuantity(cart:any) {
    
    if (cart) {
      updateCart(cart.id, cart).then(() => {
        this.$message({
          message: 'Quantity updated',
          type: 'success'
        })
      })
    }
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
      this.postForm = Object.assign({}, defaultOrderData)
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getOrderById(id)
      
      this.postForm = data.product
      this.image = data.image
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
    this.image = 'https://via.placeholder.com/154'
  }

  @Action
  public async saveForm() {
    try {
      this.loading = true
      if (this.isEdit) {
        await updateOrder(this.postForm.id, this.postForm)
      } else {
        await addOrder(this.postForm)
      }

      this.$notify({
        title: 'Success',
        message: 'Data saved successfully',
        type: 'success',
        duration: 2000
      })
      router.push('/Order/list')
    } catch (err) {
      this.loading = false
    }
  }

  // private imageUpload(file: any) {
  //   this.postForm.image = file.response
  // }

  // private sendToAllToggled() {
  //   if (this.postForm.sendToAll) {
  //     this.$confirm(
  //       'Are you sure want to send notification to All Orders?',
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
