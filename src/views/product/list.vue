<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="Name"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
     
      <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('admin.enabled')"
        clearable
        class="filter-item"
        style="width: 160px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in enableTypeOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select>
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
        style="background:#59b6e3;border:1px solid #59b6e3 "
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>

      <router-link
        v-if="listQuery.subCategoryId"
        :to="'/product/add/' + this.listQuery.categoriesId"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          Add Product
        </el-button>
      </router-link>
      <router-link
        v-else
        :to="'/product/add/' + this.listQuery.categoriesId"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          style="background:#59b6e3;border:1px solid #59b6e3 "
          icon="el-icon-plus"
        >
          Add Product
        </el-button>
      </router-link>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        style="background:#59b6e3;border:1px solid #59b6e3 "
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
       <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.createdDate") }}
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
      style="width: 100%"
       @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
   
      
      <el-table-column
        sortable="custom"
        width="70px"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />
      <el-table-column
        width="90"
        align="center"
        label="Enable/Disable"
        prop=""
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/products/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Product Details"
        width="400"
      >
        <template slot-scope="scope">
          <viewer>
          <el-avatar
            :size="90"
            :src="scope.row.image"
            fit="fill"
            shape="square"
          />
          </viewer>
          <br>
          <el-badge v-if="scope.row.new == false">
            {{ scope.row.name }}
          </el-badge><br>
          <el-badge
            v-if="scope.row.new == true"
            value="new"
            class="item"
          >
            {{ scope.row.name }}
          </el-badge><br>
          {{ scope.row.categories.name }}<br>
          <span v-if="scope.row.subCategory">{{ scope.row.subCategory.name }}</span>
          <span>
            <u style="margin-right: 10px">
              <b>Model Number:</b>
            </u> 
          </span><span style="word-break: break-word;">{{ scope.row.modelNumber}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        align="left"
        label="Category"
        width="230"
      >
        <template slot-scope="scope">
          {{ scope.row.categories.name }}<br>
          <span v-if="scope.row.subCategory">↳{{ scope.row.subCategory.name }}</span>
        </template>
      </el-table-column> -->

    

      <el-table-column
        align="center"
        label="Product Images"
        width="230"
      >
        <template slot-scope="scope">
          <viewer>
            <img
              v-for="src in scope.row.productImages"
              :key="src"
              style="margin-left:5px"
              height="100px"
              width="80px"
              :src="src"
            >
          </viewer>
        </template>
      </el-table-column>
      <el-table-column
        v-if="video"
        align="center"
        label="Video"
        width="250px"
      >
        <template slot-scope="scope">
          {{ scope.row.video }}
        </template>
      </el-table-column>

      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.createdTimestamp | moment("from")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        
        align="center"
        :label="$t('table.actions')"
        width="180"
      >
        <template slot-scope="scope">
          <!-- <el-button
            v-waves
            type="primary"
            size="small"
            @click="duplicate(scope.row.id)"
          >
            Duplicate
          </el-button><br><br> -->
          <!-- <router-link :to="'/product/options/' + scope.row.id">
            <el-button
              v-waves
              type="primary"
               style="background:#59b6e3;border:1px solid #59b6e3"
              size="small"
            >
              Options
            </el-button>
          </router-link><br><br> -->
          <router-link :to="'/product/edit/' + scope.row.id">
            <el-button
              v-waves
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>
          <el-button
            v-if="myRole =='superadmin'"
            style="margin-left: 10px"
            class="filter-item"
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleIsDelete(scope.row)"
          />

          <!-- <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          /> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
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
import Featured from '@/components/Featured/index.vue'
import {
  addProduct,
  deleteProduct,
  duplicateProduct,
  getProducts,
  updateOrder,
  getProductById,
  updateProduct
} from '@/api/product'
import { AdminModule } from '@/store/modules/admin'
import Sortable from 'sortablejs'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

@Component({
  name: 'TypeList',
  components: {
    Pagination,
    Enabled
    // PanThumb
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IProductData[] = [];
  private myRole = AdminModule.roles;
  private listLoading = true;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  sortable: any;
  private downloadLoading = false;
  private listQuery = parseInt(this.$route.params && this.$route.params.subCategoryId) ? {
    page: 1,
    limit: 20,
    sort: 'priority,ASC',
    categoriesId: 0,
    subCategoryId: 0,
    isDeleted: false,
    filter: {
      enabled: 'eq',
      name: '$contL',
      subCategoryId: 'eq',
      categoriesId: 'eq',
      modelNumber: '$contL',
      new: 'eq',
      isDeleted: 'eq'
    }
  } : {
    page: 1,
    limit: 20,
    sort: 'id,ASC',
    categoriesId: 0,
    isDeleted: false,
    filter: {
      enabled: 'eq',
      name: '$contL',
      categoriesId: 'eq',
      modelNumber: '$contL',
      new: 'eq',
      isDeleted: 'eq'
    }
  }

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'Ascending', key: 'id,ASC' },
    { label: 'Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  private newOption = [
    { label: 'Yes', key: true },
    { label: 'No', key: false }
  ];

  private ratingList = [
    { label: '1 ★', key: 1 },
    { label: '2 ★★', key: 2 },
    { label: '3 ★★★', key: 3 },
    { label: '4 ★★★★', key: 4 },
    { label: '5 ★★★★★', key: 5 }
  ];

  private filters: any = [];

  created() {
    this.listQuery.categoriesId = parseInt(
      this.$route.params && this.$route.params.categoriesId
    )
    if (parseInt(this.$route.params && this.$route.params.subCategoryId)) {
      this.listQuery.subCategoryId = parseInt(this.$route.params && this.$route.params.subCategoryId)
    }
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getProducts(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }
  private alldata:any=[];
  private  demo1:any = [];
  private handleSelectionChange(val:any){
    debugger;
    
    this.alldata = val;
      this.alldata.forEach((val:any) => {
       this.demo1.push(val.id)
     });

  }

  private async duplicate(productId: number) {
    const data = {
      id: productId
    }
    await duplicateProduct(data)
    this.getList()
  }

  private async stockUpdate(data:any){
    const res:any = await updateProduct(data.id,data)
  }

  private async handleIsDelete(row: any) {
    this.$confirm(
      'This will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
      .then(async() => {
        
        const data: any = row
        data.isDeleted = true
        await updateProduct(row.id, data)
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
        this.getList()
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    // const data: any = row
    // data.isDeleted = true;
    // await updateProduct(row.id, data);
    // this.getList()
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
      
      const data: any = await getProducts(
        getQuery({
          page: 1,
          limit: 100000,
          categoriesId: this.listQuery.categoriesId,
          sort: 'priority,ASC',
          isDeleted: 'false',
          filter: {
            enabled: 'eq',
            isDeleted: 'eq',
            categoriesId: 'eq'

          }
        })
      )
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
    } catch (error) {}
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
          deleteProduct(data.id).then((deleted) => {
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
   
 private data1:any =[];
  
  private async handleDownload() {
    
    this.downloadLoading = true;

    //  let data1:any = await getProducts(getQuery(this.listQuery1))
    const tHeader = [
      'ID',
      'Product Name',
      'Timestamp',
      'Mrp Price'
    ]
    const filterVal = [
      'id',
      'name',
      'createdTimestamp',
      'mrpPrice'
    ]
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, this.$tc('route.Products.title'))
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
