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

        <el-form-item
          style="margin-bottom: 20px"
          label="Values"
          prop="optionValueId"
          v-if="!this.isEdit"
        >
          <el-select
            v-model="postForm.optionValueId"
            name="optionIds"
            style="width: 50%"
            placeholder="Select"
            filterable="true"
            clearable="true"
            class="filter-item"
          >
            <el-option
              v-for="item in optionValuesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            /> </el-select
        ></el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="CNF Price"
          prop="cnfPrice"
        >
          <el-input
            v-model="postForm.cnfPrice"
            name="cnfPrice"
            style="width: 50%"
            required
            placeholder="CNF Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="Super Stockist Price"
          prop="superStockistPrice"
        >
          <el-input
            v-model="postForm.superStockistPrice"
            name="superStockistPrice"
            style="width: 50%"
            required
            placeholder="Super Stockist Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="CD Price"
          prop="cdPrice"
        >
          <el-input
            v-model="postForm.cdPrice"
            name="cdPrice"
            style="width: 50%"
            required
            placeholder="CD Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="SD Price"
          prop="sdPrice"
        >
          <el-input
            v-model="postForm.sdPrice"
            name="sdPrice"
            style="width: 50%"
            required
            placeholder="SD Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="COP Price"
          prop="copPrice"
        >
          <el-input
            v-model="postForm.copPrice"
            name="copPrice"
            style="width: 50%"
            required
            placeholder="COP Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="SOP Price"
          prop="sopPrice"
        >
          <el-input
            v-model="postForm.sopPrice"
            name="sopPrice"
            style="width: 50%"
            required
            placeholder="SOP Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="MRP Price"
          prop="mrpPrice"
        >
          <el-input
            v-model="postForm.mrpPrice"
            name="mrpPrice"
            style="width: 50%"
            required
            placeholder="MRP Price"
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 20px"
          label="WB Price"
          prop="wbPrice"
        >
          <el-input
            v-model="postForm.wbPrice"
            name="wbPrice"
            style="width: 50%"
            required
            placeholder="WB Price"
          />
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
          <el-button v-waves type="reset" @click="resetForm" v-if="!this.isEdit">
            {{ $t("global.form.reset") }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IProductData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson, getQuery } from "@/utils";
import Enabled from "@/components/Enabled/index.vue";
import { AdminModule } from "@/store/modules/admin";
import Sortable from "sortablejs";
import { Form } from "element-ui";
import { Action } from "vuex-module-decorators";
import {
  addProductOptionValue,
  defaultProductOptionValuesData,
  updateProductOptionValue,
  getProductOptionValueById
} from "@/api/productOptionValues";
import { availableValues } from "@/api/product";
import router from "./../../../router";

@Component({
  name: "TypeList",
  components: {
    Pagination,
    Enabled,
  },
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  private tableKey = 0;
  private total = 0;
  optionId = 0;
  optionValuesList: any = [];
  private postForm = Object.assign({}, defaultProductOptionValuesData);
  private loading = false;
  private list: IProductData[] = [];
  private myRole = AdminModule.roles;
  private listLoading = true;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  sortable: any;
  private downloadLoading = false;

  private showCreatedDate: boolean = false;

  private filters: any = [];

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    } else {
      this.optionId = parseInt(
        this.$route.params && this.$route.params.optionId
      );
      this.postForm.productOptionId = parseInt(
        this.$route.params && this.$route.params.id
      );
      this.fetchOptionValues();
    }
  }

  private async fetchData(id: number) {
    try {
      const data: any = await getProductOptionValueById(id)
      this.postForm = data
      this.optionId = data.productOption.optionId
      this.fetchOptionValues()
    } catch (err) {
      Promise.reject(err)
    }
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
  }

  @Action
  public async saveForm() {
    try {
      ;
      this.loading = true;
      if (this.isEdit) {
        await updateProductOptionValue(this.postForm.id, this.postForm)
          .then((response: any) => {
            ;
            this.$notify({
              title: "Success",
              message: "Data updated successfully",
              type: "success",
              duration: 2000,
            });

            router.push(
              "/product/values/" +
                this.postForm.productOptionId +
                "/" +
                this.optionId
            );
          })
          .catch((error: any) => {
            this.loading = false;
            this.$message.error("some error occured.");
            console.log(error);
          });
      } else {
        await addProductOptionValue(this.postForm)
          .then((response: any) => {
            this.$notify({
              title: "Success",
              message: "Data saved successfully",
              type: "success",
              duration: 2000,
            });

            router.push(
              "/product/values/" +
                this.postForm.productOptionId +
                "/" +
                this.optionId
            );
          })
          .catch((error: any) => {
            this.loading = false;
            this.$message.error("some error occured.");
            console.log(error);
          });
      }
    } catch (err) {
      this.loading = false;
    }
  }

  private async fetchOptionValues() {
    const data = {
      productOptionId: this.postForm.productOptionId,
      optionsId: this.optionId,
    };
    
    try {
      const response: any = await availableValues(data);
      
      this.optionValuesList = response.values;
    } catch (err) {
      Promise.reject(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
