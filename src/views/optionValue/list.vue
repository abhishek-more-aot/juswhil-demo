<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="Name"
        style="width: 200px;"
        class="filter-item"
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
      <router-link
        :to="'/optionValue/add/'+this.listQuery.optionsId"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          style="background:#59b6e3;border:1px solid #59b6e3"
          icon="el-icon-plus"
        >
          {{ $t('global.form.add') }}
        </el-button>
      </router-link>
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
      border
      row-key="id"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="100"
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
            :url="'/option-values/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="400"
        align="center"
        label="Name"
        prop="name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
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
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/optionValue/edit/'+scope.row.id">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
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
      v-show="total>0 "
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getOptionValues, deleteOptionValue, updateOrder, updateOptionValue, getOptionValueById } from '@/api/optionValues'
import { IOptionValuesData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import Sortable, { get } from 'sortablejs'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'ProductOptionValueList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IOptionValuesData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;

  private listQuery = {
    page: 1,
    limit: 10,
    optionsId: 0,
    sort: 'id,DESC',
    filter: {
      optionsId: '$eq',
      name: '$contL'
    }
  };

  private sortOptions = [
    { label: 'Ascending', key: 'id,ASC' },
    { label: 'Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  sortable: any;

  created() {
    this.listQuery.optionsId = parseInt(this.$route.params && this.$route.params.id)
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getOptionValues(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
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
      const data: any = await getOptionValues(getQuery({
        page: 1,
        limit: 100000,
        sort: 'priority,ASC',
        filter: {
          enabled: 'eq'
        }
      }))
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

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `${key},ASC`
      ? 'ascending'
      : sort === `${key},DESC`
        ? 'descending'
        : ''
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === 'ascending' ? 'ASC' : 'DESC')
      this.handleFilter()
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
          deleteOptionValue(data.id).then(deleted => {
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

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true
    const fliterData: any = []
    const page = this.listQuery.page
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000

    const dataAll: any = await getOptionValues(getQuery(this.listQuery))
    const listAll:IOptionValuesData[] = dataAll.data

    this.listQuery.page = page
    this.listQuery.limit = limit
    const tHeader = [
      'id',
      'fullName',
      'email',
      'contactNumber',
      'type',
      'isMonthlyNewsletter',
      'planExipiryDate'
    ]
    const filterVal = [
      'id',
      'fullName',
      'email',
      'contactNumber',
      'type',
      'isMonthlyNewsletter',
      'planExipiryDate'
    ]
    const data = formatJson(filterVal, fliterData)
    exportJson2Excel(
      tHeader,
      data,
      this.$tc('route.userManagement.Event.title')
    )
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
