<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="name"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Contact Number"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.designation"
        placeholder="Designation"
        clearable
        class="filter-item"
        style="width: 160px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email"
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
      <!-- <el-button
        v-waves
        class="filter-item"
        type="primary"
        style="background: #59b6e3; border: 1px solid #59b6e3"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button> -->
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
            :url="'/career-page/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column label="Candidate Details" width="400px">
        <template slot-scope="scope">
          <el-row  gutter="20">
              <el-col :span="10"><b>Name :</b></el-col>
              <el-col :span="14"> {{ scope.row.name }}</el-col>
          </el-row>
          <el-row  gutter="20">
              <el-col :span="10"><b>Contact Number :</b></el-col>
              <el-col :span="14"> {{ scope.row.contactNumber }}</el-col>
          </el-row>
          <el-row  gutter="20">
              <el-col :span="10"><b>Designation :</b></el-col>
              <el-col :span="14"> {{ scope.row.designation }}</el-col>
          </el-row>
          <el-row  gutter="20">
              <el-col :span="10"><b>Email :</b></el-col>
              <el-col :span="14"> {{ scope.row.email }}</el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="Description" width="400px">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column label="Resume" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.uploadResume" target="_blank" style="color: blue">
            <el-tag>
              <span style="color: blue">
                {{
                  scope.row.uploadResume.slice(
                    scope.row.uploadResume.length - 16,
                    scope.row.uploadResume.length
                  )
                }}
              </span>
            </el-tag>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="180">
        <template slot-scope="scope">
          <!-- <router-link :to="'/career/edit/' + scope.row.id">
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
import { Component, Vue } from "vue-property-decorator";
import { getCareer, getFilters, updateOrder,deleteCareer } from "@/api/career";
import { ICareerData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { getQuery, formatJson } from "@/utils/index";
import { exportJson2Excel } from "@/utils/excel";
import Sortable from "sortablejs";
import Enabled from "@/components/Enabled/index.vue";

@Component({
  name: "CareerList",
  components: {
    Pagination,
    Enabled,
  },
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: ICareerData[] = [];
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
    sort: "id,DESC",
    filter: {
      enabled: "eq",
      name: "$contL",
      designation: "$contL",
      contactNumber: "$contL",
      email: "$contL",
    },
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: "Ascending", key: "id,ASC" },
    { label: "Descending", key: "id,DESC" },
  ];

  private enableTypeOptions = [
    { key: true, value: "Enable" },
    { key: false, value: "Disabled" },
  ];

  private filters: any = [];

  created() {
    this.getList();
  }
  private source: any;
  private async getList() {
    try {
      debugger;

      this.listLoading = true;
      const data: any = await getCareer(getQuery(this.listQuery));
      this.list = data.data;

      this.total = data.total;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private async getFilters() {
    this.filters = await getFilters(
      getQuery({
        sort: "name,ASC",
      })
    );
  }

  private handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        "Do you want to delete this Career?",
        this.$tc("table.delete"),
        {
          confirmButtonText: this.$tc("table.delete"),
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteCareer(data.id).then((deleted) => {
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
      const data: any = await getCareer(
        getQuery({
          page: 1,
          limit: 100000,
          sort: "priority,ASC",
          filter: {
            enabled: "eq",
            isDeleted: "eq",
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
        this.updateOrder();
      },
    });
  }

  private async updateOrder() {
    try {
      const updateCheck = await updateOrder(this.newList);
      this.fetchAllRecored(false);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  private sortChange(data: any) {
    const { prop, order } = data;
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === "ascending" ? "ASC" : "DESC");
      this.handleFilter();
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

  private handleDownload() {
    this.downloadLoading = true;
    const tHeader = [
      "ID",
      "Full Name",
      "Email",
      "Contact Number",
      "Status",
      "timestamp",
    ];
    const filterVal = [
      "id",
      "fullName",
      "email",
      "contactNumber",
      "enabled",
      "createdTimestamp",
    ];
    const data = formatJson(filterVal, this.list);
    exportJson2Excel(tHeader, data, this.$tc("route.Career.description"));
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
