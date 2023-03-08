<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="City Name"
        style="width: 200px"
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
      <el-select
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

      <router-link :to="'/cities/add/' + this.listQuery.stateId" class="margin-horizontal">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t("global.form.add") }}
        </el-button>
      </router-link>
      <!-- <el-checkbox
        v-model="showSortingOption"
        class="filter-item"
        style="margin-left:15px;"
        @change="onPriortyChange()"
      >
        Change Priority
      </el-checkbox> -->
      <!-- <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.createdDate") }}
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
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        width="250"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      />
      <el-table-column
        width="200"
        align="center"
        label="Enabled/Disabled"
        prop=""
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Enable/Disable"
            placement="top-start"
          >
            <enabled
              :key="scope.row.id"
              v-model="scope.row.enabled"
              :url="'/cities/' + scope.row.id"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="City Name" prop="">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="300" align="center" label="City Code" prop="">
        <template slot-scope="scope">
          <span>{{ scope.row.city_code }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="250"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <router-link :to=" '/cities/edit/' + scope.row.id,
            ">
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            /> </router-link
          >&nbsp;
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
        width="auto"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.createdTimestamp | moment("from")
          }}</span
          ><br />
          <span>( {{ scope.row.createdByFullName }} )</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0 && !this.showSortingOption"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
      style="text-align: center"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  addcities,
  deletecities,
  getcities,
  getcitiesById,
  updatecities
} from "@/api/cities";
import { getAdminById } from "@/api/admins";
import { ICityData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { getQuery, formatJson } from "@/utils/index";
import { exportJson2Excel } from "@/utils/excel";
import Sortable from "sortablejs";
import Enabled from "@/components/Enabled/index.vue";

@Component({
  name: "stateList",
  components: {
    Pagination,
    Enabled,
  },
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ICityData[] = [];
  private listLoading = true;
  private downloadLoading = false;
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  private showCreatedDate = false;
  private stateId= this.$route.params.stateId;

  private listQuery = {
    page: 1,
    limit: 10,
    sort:"id,ASC",
    stateId:Number(this.$route.params.id),
    enabled:true,
    filter:{
      stateId:"eq",
      enabled:'eq',
      name:"$contL"
    },
  };

  private sortOptions = [
    { label: "Ascending", key: "id,ASC" },
    { label: "Descending", key: "id,DESC" },
  ];

  // private visibilityOptions = [
  //   { key: true, value: 'On' },
  //   { key: false, value: 'Off' }
  // ];

  private enableTypeOptions = [
    { key: true, value: "Enable" },
    { key: false, value: "Disabled" },
  ];

  sortable: any;

  created() {
     this.getList();
    this.listQuery.stateId=parseInt(this.$route.params && this.$route.params.id)
   
    // this.stateId=Number(this.$route.query.stateId);
  }

  private async getList() {
    try {
      this.listLoading = true;
      const data: any = await getcities(getQuery(this.listQuery));
      this.list = data.data;
      this.total = data.total;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort;
    return sort === `${key},ASC`
      ? "ascending"
      : sort === `${key},DESC`
      ? "descending"
      : "";
  }

  private sortChange(data: any) {
    const { prop, order } = data;
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === "ascending" ? "ASC" : "DESC");
      this.handleFilter();
    }
  }

  private async visibiltyUpdate(id: number, visibility: any) {
    const data: any = await getcitiesById(id);
    data.visibility = visibility;
    updatecities(id, data);
  }

  private handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        this.$tc("table.deleteConfirmation", undefined, { name: data.name }),
        this.$tc("table.delete"),
        {
          confirmButtonText: this.$tc("table.delete"),
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deletecities(data.id).then((deleted) => {
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

  private async getAllList() {
    try {
      this.listLoading = true;
      const data: any = await getcities(getQuery(this.listQuery));
      this.list = data.data;
      this.total = data.total;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  async onPriortyChange() {
    if (this.showSortingOption) {
      this.fetchAllRecored(true);
    } else {
      this.renderComponent = false;
      this.sortable.options.disabled = true;
      this.$nextTick().then(() => {
        this.renderComponent = true;
      });
    }
  }

  async fetchAllRecored(checkForFirstTime: boolean) {
    try {
      this.listLoading = true;
      const data: any = await getcities(
        getQuery({
          page: 1,
          limit: 100000,
          sort: "id,ASC",
          filter: {
            enabled: "eq",
          },
        })
      );
      this.list = data.data;
      this.total = data.total;
      this.listLoading = false;
      if (checkForFirstTime) {
        this.oldList = this.list.map((v) => v.id);
        this.newList = this.oldList.slice();
        this.$nextTick(this.setSort);
      }
    } catch (error) {
      this.listLoading = false;
    }
  }

  setSort() {
    const temp: any = this.$refs.dragTable;
    const el = temp.$el.querySelectorAll(
      ".el-table__body-wrapper > table > tbody"
    )[0];
    this.sortable = Sortable.create(el, {
      ghostClass: "sortable-ghost",
      setData: function (dataTransfer) {
        dataTransfer.setData("Text", "");
      },
      onEnd: (evt) => {
        const targetRow = this.list.splice(Number(evt.oldIndex), 1)[0];
        this.list.splice(Number(evt.newIndex), 0, targetRow);
        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
        this.newList.splice(evt.newIndex, 0, tempIndex);
        console.log(this.newList);
      },
    });
  }

  private async handleDownload(paid: boolean) {
    this.downloadLoading = true;
    const fliterData: any = [];
    const page = this.listQuery.page;
    const limit = this.listQuery.limit;
    this.listQuery.page = 1;
    this.listQuery.limit = 100000;

    const dataAll: any = await getcities(getQuery(this.listQuery));
    const listAll: ICityData[] = dataAll.data;

    this.listQuery.page = page;
    this.listQuery.limit = limit;
    const tHeader = [
      "id",
      "fullName",
      "email",
      "contactNumber",
      "type",
      "isMonthlyNewsletter",
      "planExipiryDate",
    ];
    const filterVal = [
      "id",
      "fullName",
      "email",
      "contactNumber",
      "type",
      "isMonthlyNewsletter",
      "planExipiryDate",
    ];
    const data = formatJson(filterVal, fliterData);
    exportJson2Excel(
      tHeader,
      data,
      this.$tc("route.userManagement.zipcode.title")
    );
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
