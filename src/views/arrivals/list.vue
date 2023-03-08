<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
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
      <router-link
        :to="'/arrivals/add'"
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
      </el-checkbox>
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
            :url="'/arrivals/' + scope.row.id"
          />
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" prop="image" label="Image">
        <template slot-scope="scope">
          <img :src="scope.row.image" :width="360" :height="150" />
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" prop="name" label="Alternate Name">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/arrivals/edit/' + scope.row.id">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
        </template>
      </el-table-column>
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
  getArrivals,
  getFilters,
  updateOrder
} from '@/api/arrivals'
import { IArrivalsData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import Sortable from 'sortablejs'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'ArrivalsList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IArrivalsData[] = [];
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
    sort: 'priority,ASC',
    filter: {
      id: 'ne',
      enabled: 'eq',
      title: '$contL'
    }
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: 'Ascending', key: 'priority,ASC' },
    { label: 'Descending', key: 'priority,DESC' }
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
      const data: any = await getArrivals(getQuery(this.listQuery))
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
      const data: any = await getArrivals(
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
    exportJson2Excel(tHeader, data, this.$tc('route.arrivals.description'))
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
