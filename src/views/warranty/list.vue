<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.firstName"
        placeholder="First Name"
        clearable
        class="filter-item"
        style="width: 200px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.lastName"
        placeholder="Last Name"
        clearable
        class="filter-item"
        style="width: 200px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.contactNumber"
        placeholder="Contact Number"
        clearable
        class="filter-item"
        style="width: 200px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="E-mail"
        clearable
        class="filter-item"
        style="width: 200px"
        @input="handleFilter"
      />
      <!-- <el-date-picker v-model="listQuery.purchasedDate"  format='yyyy-MM-dd' placeholder="Purchased Date" @input="handleFilter" /> -->
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

      <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.createdDate") }}
      </el-checkbox>

      <!-- <el-checkbox
        v-model="showSortingOption"
        class="filter-item"
        style="margin-left: 15px"
        @change="onPriortyChange()"
      >
        Change Order
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
      <el-table-column width="80" align="center" label="Status">
        <template slot-scope="scope">
          <enabled
            :key="scope.row.id"
            v-model="scope.row.enabled"
            :url="'/warranty/' + scope.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column width="400" align="center" label="Details">
        <template slot-scope="scope">
          <el-row>
            <el-col span="12" style="text-align: left">
              <b>First Name :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.firstName }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Last Name :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.lastName }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Contact Number :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.contactNumber }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Email :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.email }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Purchased From :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.purchasedFrom }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Purchased Date :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.purchasedDate | moment("YYYY-MM-DD") }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Comments :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.comments }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column width="400" align="center" label="Product Details">
        <template slot-scope="scope">
          <el-row>
            <el-col span="12" style="text-align: left">
              <b>Category Name :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.categories.name }}</span>
            </el-col>

            <el-col span="12" style="text-align: left">
              <b>Product Name :</b>
            </el-col>
            <el-col span="12" style="text-align: left">
              <span>{{ scope.row.products.name }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Source" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.invoice" target="_blank" style="color: blue">
            <el-tag>
              <span style="color: blue">
                {{
                  scope.row.invoice.slice(
                    scope.row.invoice.length - 16,
                    scope.row.invoice.length
                  )
                }}
              </span>
            </el-tag>
          </a>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="400px"
        align="center"
        prop="image"
        label="Image"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :width="360"
            :height="150"
          >
        </template>
      </el-table-column> -->
      <!-- <el-table-column width="180px" align="center" label="order" prop="order" /> -->
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
            v-if="myRole == 'superadmin'"
            size="small"
            type="danger"
            icon="el-icon-delete"
            style="margin-left: 10px"
            @click="handleDelete(scope.row)"
          />
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
import { IWarrantyData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson, getQuery } from "@/utils";
import Enabled from "@/components/Enabled/index.vue";
import { deleteWarranty, getWarranty, updateOrder } from "@/api/warranty";
import { AdminModule } from "@/store/modules/admin";
import Sortable from "sortablejs";

@Component({
  name: "WarrantyList",
  components: {
    Pagination,
    Enabled,
  },
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IWarrantyData[] = [];
  private mallsList: any = [];
  private listLoading = true;
  private downloadLoading = false;
  private myRole = AdminModule.roles;
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  newList: any = [];
  oldList: any = [];
  private listQuery = {
    page: 1,
    limit: 10,
    sort: "id,DESC",
    filter: {
      enabled: "eq",
      firstName:'$contL',
      lastName:'$contL',
      email:'$contL',
      contactNumber:'$contL',
      purchasedDate:'eq'
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

  sortable: any;

  created() {
    this.getList();
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
      const data: any = await getWarranty({
        page: 1,
        limit: 100000,
        sort: "order,ASC",
      });
      this.list = data.data;
      this.total = data.length;
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
    } catch (error) {}
  }

  private handleDelete(data: any) {
    if (data) {
      this.$confirm(
        "Do you want to delete this warranty?",
        this.$tc("table.delete"),
        {
          confirmButtonText: this.$tc("table.delete"),
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteWarranty(data.id).then((deleted) => {
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

  private async getList() {
    try {
      this.listLoading = true;
      const data: any = await getWarranty(getQuery(this.listQuery));
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
    exportJson2Excel(
      tHeader,
      data,
      this.$tc("route.WarrantyManagement.Warranty.title")
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
