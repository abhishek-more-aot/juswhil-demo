<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <span
        v-for="filter in filters.filters"
        :key="filter"
      >
        <el-select
          v-if="['country', 'state', 'city'].includes(filter.name)"
          v-model="listQuery[filter.name + 'Id']"
          :placeholder="filter.name"
          clearable
          class="filter-item"
          style="width: 130px"
          auto-complete="off"
          @change="handleFilter"
        >
          <el-option
            v-for="item in filter.filterValues"
            :key="item[filter.name]['id']"
            :label="item[filter.name]['name']"
            :value="item[filter.name]['id']"
          />
        </el-select>
      </span> -->
      <el-input
        v-model="listQuery.fullName"
        placeholder="Search by name"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Search by email"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.message"
        placeholder="search by message"
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
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <!-- <router-link
        :to="'/news/add'"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="warning"
          icon="el-icon-plus"
        >
          Add
        </el-button>
      </router-link>
      <el-checkbox
        v-model="showSortingOption"
        class="filter-item"
        style="margin-left: 15px"
        @change="onPriortyChange()"
      >
        Change Priority
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      row-key="id"
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="80"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />

      <el-table-column label="Name">
          <template slot-scope="scope">
              <span><b>Name: </b><br> {{ scope.row.fullName }}</span>
          </template>
      </el-table-column>

      <el-table-column label="Mobile Number">
          <template slot-scope="scope">
              <span><b>Mobile Number: </b><br> {{ scope.row.contactNumber }}</span>
          </template>
      </el-table-column>

      <el-table-column label="Email">
          <template slot-scope="scope">
              <span><b>Email: </b><br> {{ scope.row.email }}</span>
          </template>
      </el-table-column>

      <el-table-column label="Message">
          <template slot-scope="scope">
              <span><b>Message: </b><br> {{ scope.row.message }}</span>
          </template>
      </el-table-column>

      <el-table-column label="Contacted On">
          <template slot-scope="scope">
              <span><b>Time: </b><br> {{ scope.row.createdTimestamp | moment("DD-MM-YYYY hh:mm A")}}</span>
          </template>
      </el-table-column>


      <!-- <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/enquiry/edit/' + scope.row.id">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
          <el-button
            class="filter-item"
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleIsDelete(scope.row)"
          />
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          />
        </template>
      </el-table-column> -->
      
      <!-- <el-table-column
        width="180px"
        align="center"
        :label="$t('news.state')"
        prop="state.name"
      />
      <el-table-column
        width="180px"
        align="center"
        :label="$t('news.city')"
        prop="city.name" -->
      />
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="
              scope.row.createdTimestamp | moment('MMMM Do YYYY, hh:mm a')
            "
            placement="top"
          >
            <span style="color: red">{{
              scope.row.createdTimestamp | moment("from")
            }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- Sandesh create stats if possible -->
      <!-- <el-table-column align="center" :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <router-link :to="'/news/view/'+scope.row.id">
            <el-button v-waves type="primary" size="small" icon="el-icon-eye"/>
          </router-link>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total > 0 && !this.showSortingOption"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  getEnquiry,
  getFilters
} from '@/api/enquiry'
import { IEnquiryData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import Sortable from 'sortablejs'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'EnquiryList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IEnquiryData[] = [];
  private listLoading = true;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  private downloadLoading = false;
    sortable: any;
  private listQuery = {
    page: 1,
    limit: 20,
    sort: 'id,DESC',
    email:"",
    message:"",
    fullName:"",
    filter: {
      enabled: 'eq',
      email:"eq",
      message:"eq",
      fullName:"eq"
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  private filters: any = [];

  created() {
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getEnquiry(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getFilters() {
    this.filters = await getFilters(
      getQuery({
        sort: 'name,ASC'
      })
    )
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
      const data: any = await getEnquiry(
        getQuery({
          page: 1,
          limit: 100000,
          sort: 'priority,ASC',
          filter: {
            enabled: 'eq',
            isDeleted: 'eq'
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
      }
    })
  }

//   private async updateOrder() {
//     try {
//       const updateCheck = await updateOrder(this.newList)
//       this.fetchAllRecored(false)
//       // eslint-disable-next-line no-empty
//     } catch (error) {}
//   }

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
    exportJson2Excel(tHeader, data, this.$tc('route.enquiry.description'))
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
