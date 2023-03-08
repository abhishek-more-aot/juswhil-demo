<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.fullName"
        :placeholder="$t('admin.fullName')"
        style="width: 160px"
        class="filter-item"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        :placeholder="$t('admin.email')"
        style="width: 160px"
        class="filter-item"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Mobile Number"
        style="width: 160px"
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
        style="width: 160px"
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
        style="background: #59b6e3; border: 1px solid #59b6e3"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <router-link :to="'/admins/add'" class="margin-horizontal">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          style="background: #59b6e3; border: 1px solid #59b6e3"
          icon="el-icon-plus"
        >
          {{ $t("global.form.add") }}
        </el-button>
      </router-link>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button> -->
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
            :url="'/admins/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="270"
        align="center"
        prop="fullName"
        label="FullName"
      >
        <template slot-scope="scope">
          <el-avatar
            :size="90"
            :src="scope.row.avatar"
            fit="fill"
            shape="circle"
          /><br />
          <span>{{ scope.row.fullName }}</span
          ><br />
          ( {{ scope.row.adminsRole.name }} )
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" prop="gender" label="Gender">
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 0">Female</span>
          <span v-if="scope.row.gender == 1">Male</span>
        </template>
      </el-table-column>
      <el-table-column
        width="250"
        align="center"
        label="Contact Details"
        prop="email"
      >
        <template slot-scope="scope">
          <a style="color: #eb6f33" :href="`mailto:${scope.row.email}`">{{
            scope.row.email
          }}</a
          ><br />
          <span>{{ scope.row.contactNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="100"
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
      <el-table-column align="center" :label="$t('table.actions')" width="140">
        <template slot-scope="scope">
          <router-link
            v-if="
              myRole.indexOf('superadmin') > -1 ||
              (myRole.indexOf('Admin') > -1 && scope.row.adminsRoleId === 3)
            "
            :to="'/admins/edit/' + scope.row.id"
          >
            <el-button
              v-waves
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>
          <br /><br />
          <!-- <router-link :to="'/admins/logs/'+scope.row.id">
            <el-button
              type="primary"
              size="small"
            >
              View Logs
            </el-button>
          </router-link> -->
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
import {
  defaultAdminData,
  deleteAdmin,
  getAdminById,
  getAdmins,
} from "@/api/admins";
import { IAdminData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { getQuery, formatJson } from "@/utils/index";
import { exportJson2Excel } from "@/utils/excel";
import Enabled from "@/components/Enabled/index.vue";
import { AdminModule } from "../../store/modules/admin";
import Axios from "axios";

@Component({
  name: "AdminList",
  components: {
    Pagination,
    Enabled,
  },
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IAdminData[] = [];
  private createdBy = Object.assign({}, defaultAdminData);
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private listQuery = {
    page: 1,
    limit: 10,
    id: AdminModule.id,
    fullName: undefined,
    email: undefined,
    contactNumber: undefined,
    sort: "id,ASC",
    filter: {
      id: "ne",
      fullName: "$contL",
      email: "$contL",
      contactNumber: "$contL",
      enabled: "eq",
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

  created() {
    this.getList();
  }

  private async getList() {
    try {
      this.listLoading = true;
      const data: any = await getAdmins(getQuery(this.listQuery));
      var listTemp = data.data;
      this.total = data.total;
      const callList: any = [];
      listTemp.forEach(async (admin: any, index: any, arr: any) => {
        // invoice.dealerName = 'Hitesh';
        const a = arr;
        // invoice.dealerName = 'loading';
        if (admin.createdBy != null) {
          callList.push(getAdminById(admin.createdBy));
        }
      });
      Axios.all(callList).then((data: any) => {
        data.forEach((response: any, index: any) => {
          listTemp[index].createdByFullName = response.fullName;
        });

        this.list = listTemp;
      });

      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private async fetchAdmin(id: number) {
    const data: any = await getAdmins(id);
    this.createdBy = data;
    return this.createdBy.fullName;
  }

  private handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  private sortChange(data: any) {
    const { prop, order } = data;
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === "ascending" ? "ASC" : "DESC");
      this.handleFilter();
    }
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
          deleteAdmin(data.id).then((deleted) => {
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
    exportJson2Excel(
      tHeader,
      data,
      this.$tc("route.adminManagement.admins.title")
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
