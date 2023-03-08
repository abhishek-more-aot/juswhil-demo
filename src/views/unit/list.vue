/* eslint-disable vue/this-in-template */
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
      <el-input
        v-model="listQuery.multiplier"
        placeholder="Multiplier"
        style="width: 200px;"
        class="filter-item"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.finalunits"
        placeholder="Final units"
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
      <!-- <el-select
        v-model="listQuery.enabled"
        :placeholder="$t('admin.enabled')"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in enableTypeOptions"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        />
      </el-select> -->

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>

      <router-link
        :to="'/unit/add'"
        class="margin-horizontal"
      >
        <el-button
          v-waves
          class="filter-item"
          type="primary"
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
      fit
      row-key="id"
      highlight-current-row
      style="width:100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="90"
        align="center"
        :label="$t('table.id')"
        prop="id"
      />

      <el-table-column
        width="200"
        align="center"
        label="Name"
        prop="name"
      />
      <el-table-column
        width="200"
        align="center"
        label="Multiplier"
        prop="multiplier"
      />
      <el-table-column
        width="200"
        align="center"
        label="Final units"
        prop="finalunits"
      />
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="200"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/unit/edit/'+scope.row.id">
            <el-button
              type="primary"
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
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.createdTimestamp | moment("from") }}</span><br>
          <span>( {{ (scope.row.createdByFullName) }} )</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0 && !this.showSortingOption"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUnit, deleteUnit } from '@/api/unit'
import { IUnitData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'ConsumableList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IUnitData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      enabled: 'eq',
      name: '$contL',
      multiplier: 'eq',
      finalunits: '$contL'

    }
  };

  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  sortable: any;

  created() {
    this.getList()
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getUnit(getQuery(this.listQuery))
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
          deleteUnit(data.id).then(deleted => {
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

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true
    const fliterData: any = []
    const page = this.listQuery.page
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000

    const dataAll: any = await getUnit(getQuery(this.listQuery))
    const listAll:IUnitData[] = dataAll.data

    this.listQuery.page = page
    this.listQuery.limit = limit
    // this.total = data.total;

    // if (paid) {
    //   fliterData = listAll.filter(list => {
    //     return new Date(list.planExipiryDate) > new Date();
    //   });
    // } else {
    //   fliterData = listAll.filter(list => {
    //     return new Date(list.planExipiryDate) < new Date();
    //   });
    // }
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
      this.$tc('route.userManagement.Consumable.title')
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
