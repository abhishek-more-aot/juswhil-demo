<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.fullName"
        placeholder="Full Name"
        style="width: 200px;"
        class="filter-item"
        clearable
        @input="handleFilter"
      />

      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Contact Number"
        style="width: 200px;"
        class="filter-item"
        clearable
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email"
        style="width: 200px;"
        class="filter-item"
        clearable
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
      <!-- <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button> -->
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
        sortable="custom"
        width="100"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />
      <!-- <el-table-column
        width="150"
        align="center"
        label="Enable/Disable"
        prop=""
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/contacts/' + scope.row.id"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        width="200"
        align="center"
        label="Full Name"
        prop="fullName"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        align="center"
        label="Email"
        prop="email"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        label="Contact Number"
        prop="contactNumber"
      >
        <template slot-scope="scope">

          <span>{{ scope.row.contactNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        label="Message"
        prop="message"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.message }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <!-- <router-link :to="'/warranty/edit/' + scope.row.id">
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
            style="margin-left: 10px"
            @click="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/userContact/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
        </template>
      </el-table-column> -->
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
import { getUserContacts, deleteUserContact, updateUserContact, getUserContactById } from '@/api/usersContact'
import { IEventData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'
import Sortable, { get } from 'sortablejs'
import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'UserContactList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IEventData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;

  private listQuery = {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    filter: {
      contactNumber: '$contL',
      fullName:'$contL',
      email:'$contL'
    }
  };

  private sortOptions = [
    { label: 'Ascending', key: 'id,ASC' },
    { label: 'Descending', key: 'id,DESC' }
  ];

  private statusList = [
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'On-going', value: 'On-going' },
    { label: 'completed', value: 'completed' },
    { label: 'Closed', value: 'Closed' }
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
      const data: any = await getUserContacts(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  // private async updateStatus(id: number, status: any) {
  //
  //   const data: any = await getEventById(id)
  //   data.isContacted = status
  //   await updateEvent(id, data)
  //
  // }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
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
    const { prop, id } = data
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (id === 'ascending' ? 'ASC' : 'DESC')
      this.handleFilter()
    }
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        "Do you want to delete this contact?",
        this.$tc("table.delete"),
        {
          confirmButtonText: this.$tc("table.delete"),
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteUserContact(data.id).then((deleted) => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$tc("table.deleteCanceled"),
          });
        });
    }
  }

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true
    const fliterData: any = []
    const page = this.listQuery.page
    const limit = this.listQuery.limit
    this.listQuery.page = 1
    this.listQuery.limit = 100000

    const dataAll: any = await getUserContacts(getQuery(this.listQuery))
    const listAll:IEventData[] = dataAll.data

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
