<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.fullName"
        :placeholder="$t('user.fullName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        :placeholder="$t('user.email')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        :placeholder="$t('user.contactNumber')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
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

      <router-link
        :to="'/Setting/add'"
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
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        width="50"
        align="center"
        label="ID"
        prop="id"
      />
      <el-table-column
        width="190px"
        align="center"
        label="Maximum video uploads Allowed"
        prop="maxAllowedVideos"
      />
      <el-table-column
        width="150px"
        align="center"
        label="No.Of Members Allowed in A Team"
        prop="numberOfMembersAllowedInTeam"
      />
      <el-table-column
        width="190px"
        align="center"
        label="User Follow Threshold"
        prop="userFollowThreshold"
      />
      <el-table-column
        width="200px"
        align="center"
        label="Coach and peer rating weightage for video rating"
        prop="coachAndPeerRating"
      />
      <el-table-column
        width="190px"
        align="center"
        label="Leaderboard Top X"
        prop="leaderBoardTopX"
      />
      <el-table-column
        width="190px"
        align="center"
        label="Default Coach Rating"
        prop="defaultCoachRating"
      />
      <el-table-column
        width="190px"
        align="center"
        label="Default Player Rating"
        prop="defaultPlayerRating"
      />
      <el-table-column
        width="170px"
        align="center"
        label="Minimum Coach Rate Count"
        prop="minimumCoachRateCount"
      />
      <el-table-column
        width="200px"
        align="center"
        label="Rating Calculation Time In Months"
        prop="ratingCalculationTimeInMonths"
      />
      <el-table-column
        width="190px"
        align="center"
        label="Max Video Length"
        prop="maxVideoLenght"
      />
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="180"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <!-- <router-link :to="'/bookmark/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp; -->
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
import { deleteSetting, getSetting } from '@/api/setting'
import { ISettingData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'SettingList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ISettingData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 10,
    fullName: undefined,
    email: undefined,
    contactNumber: undefined,
    sort: 'id,DESC',
    filter: {
      fullName: 'cont',
      contactNumber: 'cont',
      email: 'cont'
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

  created() {
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
          deleteSetting(data.id).then(deleted => {
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

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getSetting(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getAllList() {
    try {
      this.listLoading = true
      const data: any = await getSetting(getQuery(this.listQuery))
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

  private sortChange(data: any) {
    this.handleFilter()
  }

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true
    const fliterData: any = []
    const page = this.listQuery.page
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000

    const dataAll: any = await getSetting(getQuery(this.listQuery))
    const listAll:ISettingData[] = dataAll.data

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
      this.$tc('route.userManagement.Setting.title')
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
