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
        :to="'/testimonial/add'"
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
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
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
            :url="'/testimonials/' + scope.row.id"
          />
        </template>
      </el-table-column>

      <!-- <el-table-column
        width="200"
        align="center"
        label="Name"
        prop="name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        width="330"
        align="center"
        label="Review"
        prop="review"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.review }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        width="300"
        align="center"
        prop="image"
        label="Image"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :width="150"
            :height="150"
          >
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        width="180px"
        align="center"
        label="Location"
        prop="location"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="Description">
        <template slot-scope="scope">
          <el-row
            type="flex"
            justify=""
            :span="24"
            style="text-align: left;"
          >
            <el-col
              :span="8"
              style="padding: 1.2rem;"
            >
              <el-image
                style="width: 150px; height: 150px;border-radius:50%;"
                :src="scope.row.image"
                fit="fit"
              />
            </el-col>
            <el-col :span="16">
              <b>Name:</b> <br><span>{{ scope.row.name }}</span>
              <br><br>
              <b>Review:</b> <br><span>{{ scope.row.review }}</span>
              <br><br>
              <b>Location:</b> <br><span>{{ scope.row.location }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to="'/testimonial/edit/' + scope.row.id">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
          <!-- <el-button
            class="filter-item"
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleIsDelete(scope.row)"
          /> -->
          <!-- <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          /> -->
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="180px"
        align="center"
        :label="$t('testimonial.state')"
        prop="state.name"
      />
      <el-table-column
        width="180px"
        align="center"
        :label="$t('testimonial.city')"
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
          <router-link :to="'/testimonial/view/'+scope.row.id">
            <el-button v-waves type="primary" size="small" icon="el-icon-eye"/>
          </router-link>
        </template>
      </el-table-column>-->
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
import {
  getTestimonial,
  getFilters
} from '@/api/testimonial/testimonial'
import { ITestimonialData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { exportJson2Excel } from '@/utils/excel'

import Enabled from '@/components/Enabled/index.vue'

@Component({
  name: 'TestimonialList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ITestimonialData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private listQuery = {
    page: 1,
    limit: 20,
    sort: 'id,DESC',
    filter: {
      id: 'ne',
      enabled: 'eq',
      title: '$contL'
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
      const data: any = await getTestimonial(getQuery(this.listQuery))
      this.list = data
      this.total = data.length
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
    exportJson2Excel(tHeader, data, this.$tc('route.testimonial.name'))
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
