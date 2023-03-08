<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="title"
        style="width: 200px"
        class="filter-item"
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
      <!-- <el-select 
      v-model="listQuery.documentMasterId" 
      style="width: 180px"
      class="filter-item"
      @change="handleFilter"
      >
        <el-option
          v-for="documentMaster in documentMasterIdList"
          :key="documentMaster.value"
          :label="documentMaster.name"
          :value="documentMaster.id">
        </el-option>
      </el-select> -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <router-link :to="'/documents/add/' + this.$route.params.id" class="margin-horizontal">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus">
          {{ $t("global.form.add") }}
        </el-button>
      </router-link>
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
        width="150"
        align="center"
        label="Enable/Disable"
        prop=""
      >
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/orders-document/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        label="Title"
        prop="title"
      >
        <template slot-scope="scope">
         {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Document"
        width="300px"
      >
       <template slot-scope="scope">
      <a
                :href="scope.row.document"
                download="true"
              >
                <svg-icon
                  name="documentation"
                  style="font-size: 32px; color: orange;cursor: pointer;"
                />
              </a>
        
        </template>
      </el-table-column>

      <!-- <el-table-column label="Description">
        <template slot-scope="scope">
          <el-row
            type="flex"
            justify=""
            :span="24"
            style="text-align: left;"
            :gutter="20"
          >
            <el-col :span="6">
              <el-image
                style="width: 150px;"
                :src="scope.row.image"
                fit="fit"
              />
            </el-col>
           
            <el-col :span="12" margin-left="0.5rem">
              <b>Tendor :</b> <br><span v-if="scope.row.tendor != null">{{ scope.row.tendor.name }}</span>
              <br><br>
              <b>Title:</b> <br><span>{{ scope.row.title }}</span>
              <br><br>
            </el-col>
            <el-col :span="12">
              <b>Description:</b> <br><span>{{ scope.row.description }}</span>
              <br><br>
              <b>Document Type :</b> <br><span v-if="scope.row.documentMaster != null">{{ scope.row.documentMaster.name }}</span>
              <br><br>
            </el-col>
          </el-row>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="180"
      >
        <template slot-scope="scope">
          <router-link :to="'/documents/edit/' + scope.row.id">
            <el-button v-waves type="warning" size="small" icon="el-icon-edit" />
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.createdTimestamp | moment("from")
          }}</span>
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
import { Component, Vue } from "vue-property-decorator";
import { getDocuments } from "@/api/documents";
import { IDocumentsData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { getQuery, formatJson } from "@/utils/index";
import { exportJson2Excel } from "@/utils/excel";

import Enabled from "@/components/Enabled/index.vue";
// import { getDocumentsType } from "@/api/documenttype/documenttype";

@Component({
  name: "DocumentList",
  components: {
    Pagination,
    Enabled,
  },
})

export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IDocumentsData[] = [];
  private documentMasterIdList:any = [];
  private orderId:number = 0;
  private documentMasterId:number = 0;
  private listLoading = true;
  private downloadLoading = false;
  private showCreatedDate: boolean = false;

    private listQuery = parseInt(this.$route.params && this.$route.params.id) != 0 ? {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    orderId: this.$route.params.id,
    enabled: true,
    filter: {
      enabled: 'eq',
      documentMasterId: 'eq',
      orderId: 'eq',
      title: '$contL'
    }
  } : {
    page: 1,
    limit: 10,
    sort: 'id,DESC',
    enabled: true,
    filter: {
      enabled: 'eq',
      title: '$contL'
    }
  }

  //   private listQuery = {
  //   page: 1,
  //   limit: 10,
  //   sort: 'id,DESC',
  //   tendorId: this.$route.params.id,
  //   enabled: true,
  //   filter: {
  //     enabled: 'eq',
  //     documentMasterId: 'eq',
  //     tendorId: 'eq',
  //     title: '$contL'
  //   }
  // };

  private sortOptions = [
    { label: "ID Ascending", key: "id,ASC" },
    { label: "ID Descending", key: "id,DESC" },
  ];

  private enableTypeOptions = [
    { key: true, value: "Enable" },
    { key: false, value: "Disabled" },
  ];

  created() {
    // this.fetchDocTypes()
    this.orderId = parseInt(this.$route.params.id)
    
    this.getList();
  }

  // data(){
  //   return{
  //     tendorId: this.$route.params.id
  //   }
  // }

  private async getList() {
    try {
      this.listLoading = true;
      const data: any = await getDocuments(getQuery(this.listQuery));
      this.list = data.data;
      this.total = data.total;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  private sortChange(data: any) {
    const { prop, order } = data;
    if (prop) {
      this.listQuery.sort = `${prop},` + (order === "ascending" ? "ASC" : "DESC");
      this.handleFilter();
    }
  }

  //   private async fetchDocTypes() {
  //   this.documentMasterIdList = await getDocumentsType(
  //     getQuery({
  //       enabled: true,
  //       sort: 'id,ASC',
  //       filter: {
  //         enabled: 'eq'
  //       }
  //     })
  //   )
    
  // }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort;
    return sort === `${key},ASC`
      ? "ascending"
      : sort === `${key},DESC`
      ? "descending"
      : "";
  }

  private documentdownload(){
    this.downloadLoading = true;

  }

  private handleDownload() {
    this.downloadLoading = true;
    const tHeader = ["ID", "tendor", "title","description","timestamp"];
    const filterVal = ["id", "tendor", "title","description", "createdTimestamp"];
    const data = formatJson(filterVal, this.list);
    exportJson2Excel(tHeader, data, this.$tc("route.adminManagement.roles.title"));
    this.downloadLoading = false;
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
