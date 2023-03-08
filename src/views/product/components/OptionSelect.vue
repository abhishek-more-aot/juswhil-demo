<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery['option.name']"
        placeholder="Name"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />

      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
         style="background:#59b6e3;border:1px solid #59b6e3"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>

      <el-select
        v-model="postForm.optionId"
        name="optionIds"
        style="width:20%"
        placeholder="Select"
        filterable="true"
        clearable="true"
        class="filter-item"
      >
        <el-option
          v-for="item in optionList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        style="background:#59b6e3;border:1px solid #59b6e3"
        icon="el-icon-plus"
        @click="saveForm()"
      >
        Add Option
      </el-button>

      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>-->
      <!-- <el-checkbox
        v-model="showSortingOption"
        class="filter-item"
        style="margin-left:15px;"
        @change="onPriortyChange()"
      >
        Change Priority
      </el-checkbox> -->
      <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.createdDate') }}
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width:100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="100px"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />
      <el-table-column
        width="130"
        align="center"
        label="Enable/Disable"
        prop=""
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/product-options/' + scope.row.id"
          />
        </template>
      </el-table-column>

      <el-table-column
        width="250"
        align="center"
        label="Selected option for pricing"
        prop=""
      >
        <template slot-scope="scope">
         <el-switch v-model="scope.row.isSelected" @change="updateIsSelected(scope.row)"/>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Options"
        width="300"
      >
        <template slot-scope="scope">
          <router-link
            style="color:#59b6e3;"
            :to="'/product/values/'+scope.row.id+'/'+scope.row.optionId"
          >
            <u>{{ scope.row.option.name }}</u>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.createdTimestamp | moment("from") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="myRole.indexOf('superadmin') > -1"
        align="center"
        :label="$t('table.actions')"
        width="160"
      >
        <template slot-scope="scope">
          <!-- <router-link :to="'/product/edit/'+scope.row.id">
            <el-button
              v-waves
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link> -->
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IProductData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson, getQuery } from '@/utils'
import Enabled from '@/components/Enabled/index.vue'
import { AdminModule } from '@/store/modules/admin'
import Sortable from 'sortablejs'
import { Action } from 'vuex-module-decorators'
import { addProductOption, defaultProductOptionData, deleteProductOption, getProductOptions, updateProductOption, updateProductOptionIsSelected } from '@/api/productOption'
import { getOptionValues } from '@/api/optionValues'
import { updateOrder } from '@/api/productOptionValues'
import { getOptions } from '@/api/option'
import { availableOptions } from '@/api/product'

@Component({
  name: 'TypeList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  optionList:any = []
  private loading = false;
  private postForm = Object.assign({}, defaultProductOptionData);
  private list: IProductData[] = [];
  isSelectedLoading: boolean=false;
  private myRole = AdminModule.roles;
  private listLoading = true;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  sortable: any;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 20,
    sort: 'id,DESC',
    productId: 0,
    enabled:true,
    'option.name': '',
    filter: {
      enabled: 'eq',
      'option.name': '$contL',
      productId: 'eq'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'Ascending', key: 'id,ASC' },
    { label: 'Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  private filters: any = [];

  created() {
    this.listQuery.productId = parseInt(this.$route.params && this.$route.params.id)
    this.postForm.productId = this.listQuery.productId
    this.fetchOption()
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getProductOptions(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
      this.fetchOption()
    } catch (error) {
      this.listLoading = false
    }
  }

  private async fetchOption() {
    const data = {
      productId: this.listQuery.productId
    }
    try {
      const response:any = await availableOptions(data)
      this.optionList = response.options
    } catch (err) {
      Promise.reject(err)
    }
  }

    @Action
  public async saveForm() {
    try {
      this.loading = true

      // if (this.isEdit) {
      //   await updateOption(this.postForm.id, this.postForm)
      // } else {

      if (this.postForm.optionId) {
        await addProductOption(this.postForm).then((res:any) => {
          this.$notify({
            title: 'Success',
            message: 'Option saved successfully',
            type: 'success',
            duration: 2000
          })
          this.postForm.optionId = null
          this.getList()
        })
      } else {
        this.$message.error('Please select an option value')
      }

      // }
    } catch (err) {
      this.loading = false
    }
  }
  async updateIsSelected(data:any){
    this.isSelectedLoading = true;
    console.log(data);
    const dataModel:any ={
      productId:data.productId,
      id:data.id

    }
    await updateProductOptionIsSelected(dataModel).then((res:any)=>{
      this.getList();
    this.$message({
          message: 'Product options updated succesfully.',
          type: 'success'
        });


    }).catch((e:any)=>{
    this.isSelectedLoading = true;


    })
    

  }

    private handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }

    async onPriortyChange() {
      if (this.showSortingOption) {
        this.fetchAllRecored(true)
      } else {
        this.renderComponent = false
        this.sortable.options.disabled = true
        this.$nextTick().then(() => {
          this.renderComponent = true
        })
      }
    }

    async fetchAllRecored(checkForFirstTime: boolean) {
      try {
        this.listLoading = true
        this.listQuery.limit = 10000
        const data: any = await getOptionValues(getQuery(this.listQuery))
        this.list = data.data
        this.total = data.total
        this.listLoading = false
        if (checkForFirstTime) {
          this.oldList = this.list.map((v) => v.id)
          this.newList = this.oldList.slice()
          this.$nextTick(this.setSort)
        }
      } catch (error) {
        this.listLoading = false
      }
    }

    setSort() {
      const temp: any = this.$refs.dragTable
      const el = temp.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = this.list.splice(Number(evt.oldIndex), 1)[0]
          this.list.splice(Number(evt.newIndex), 0, targetRow)
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          console.log(this.newList)
          this.updateOrder()
        }
      })
    }

    private async updateOrder() {
      try {
        const updateCheck = await updateOrder(this.newList)
        this.fetchAllRecored(false)
        // eslint-disable-next-line no-empty
      } catch (error) {

      }
    }

    private handleDelete(data: any) {
      if (data) {
        this.$confirm(
          this.$tc('table.deleteConfirmation', undefined, { name: data.name }),
          this.$tc('table.delete'),
          {
            confirmButtonText: this.$tc('table.delete'),
            confirmButtonClass: 'el-button--danger',
            cancelButtonText: 'Cancel',
            type: 'error'
          }
        )
          .then(() => {
            deleteProductOption(data.id).then(deleted => {
              this.getList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$tc('table.deleteCanceled')
            })
          })
      }
    }

    private sortChange(data: any) {
      const { prop, order } = data
      if (prop) {
        this.listQuery.sort =
        `${prop},` + (order === 'ascending' ? 'ASC' : 'DESC')
        this.handleFilter()
      }
    }

    private getSortClass(key: string) {
      const sort = this.listQuery.sort
      return sort === `${key},ASC`
        ? 'ascending'
        : sort === `${key},DESC`
          ? 'descending'
          : ''
    }

    private handleDownload() {
      this.downloadLoading = true
      const tHeader = [
        'ID',
        'Full Name',
        'Email',
        'Contact Number',
        'Status',
        'timestamp'
      ]
      const filterVal = [
        'id',
        'fullName',
        'email',
        'contactNumber',
        'enabled',
        'createdTimestamp'
      ]
      const data = formatJson(filterVal, this.list)
      exportJson2Excel(tHeader, data, this.$tc('route.notifications.title'))
      this.downloadLoading = false
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
