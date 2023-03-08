<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.fullName"
        placeholder="Name"
        clearable
        class="filter-item"
        style="width: 170px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.email"
        placeholder="Email"
        clearable
        class="filter-item"
        style="width: 170px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery['userContact.contactNumber']"
        placeholder="Contact number"
        clearable
        maxlength="10"
        class="filter-item"
        style="width: 170px"
        @input="handleFilter"
      />
      <el-input
        v-model="listQuery.pincode"
        placeholder="Pincode"
        clearable
        class="filter-item"
        style="width: 170px"
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

      <router-link :to="'/user/add'" class="margin-horizontal">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
        >
          Add Distributor
        </el-button>
      </router-link>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t("table.export") }}
      </el-button>
      <el-button
        :disabled="multipleSelection.length <= 0"
        type="danger"
        icon="el-icon-delete"
        round
        @click="handleMultipleDelete"
      >
        Delete
      </el-button>
      <el-checkbox
        v-model="showCreatedDate"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.createdDate") }}
      </el-checkbox>
    </div>

    <el-tabs type="border-card" value="cnf" @tab-click="handleClick">
      <el-tab-pane label="CNF" name="cnf">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" clearable placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>
          

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="User" name="user">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                    <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
              
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="Super Stockist" name="superstockist">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                   <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="CD" name="cd">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                    <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="SD" name="sd">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                    <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="WB" name="wb">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                   <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="MRP" name="mrp">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                   <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="COP" name="cop">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                   <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>

      <el-tab-pane label="SOP" name="sop">
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
            width="100px"
            align="center"
            :label="$t('table.id')"
            prop="id"
            :class-name="getSortClass('id')"
          />
          <el-table-column
            width="90"
            align="center"
            label="Enable/Disable"
            prop=""
          >
            <template slot-scope="scope">
              <enabled
                :key="scope.row.id"
                v-model="scope.row.enabled"
                :url="'/users/' + scope.row.id"
              />
            </template>
          </el-table-column>

          <el-table-column label="Distributor Details" width="350px">
            <template slot-scope="scope">
              <el-row
                type="flex"
                justify=""
                :span="24"
                :gutter="20"
                style="text-align: left"
              >
                <el-col :span="12">
                  <b>Name:</b>&nbsp;&nbsp;<span>{{ scope.row.fullName }}</span
                  ><br /><br />
                  <b>Company Name:</b>&nbsp;&nbsp;<span>{{
                    scope.row.companyName
                  }}</span
                  ><br /><br />
                  <b>Email Address:</b>&nbsp;&nbsp;<span>{{
                    scope.row.email
                  }}</span
                  ><br /><br />
                </el-col>
                <el-col :span="12">
                  <b>Pincode Number:</b>&nbsp;&nbsp;<span>{{
                    scope.row.pincode
                  }}</span
                  ><br /><br />
                  <b>City Name:</b>&nbsp;&nbsp;<span>{{ scope.row.city }}</span
                  ><br /><br />
                  <b>Registered Number:</b>&nbsp;&nbsp;<span
                    v-for="contact in scope.row.userContact"
                    :key="contact.id"
                  >
                    {{ contact.contactNumber }}<br /><br />
                  </span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
            v-if="showCreatedDate"
            :label="$t('table.createdDate')"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: red">{{
                scope.row.createdTimestamp | moment("from")
              }}</span>
            </template>
          </el-table-column>

                   <el-table-column
            v-if="this.roleName == 'superadmin'"
            align="center"
            label="Convert"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="Select">
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <br /><br />
              <el-button
                v-waves
                class="filter-item"
                type="success"
                @click="updateDistributor(scope.row)"
              >
                Convert
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            
          align="center" label="Asm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.superAdminId" placeholder="Select">
                <el-option
                  v-for="item in asmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
                v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateAsm(scope.row)"
              >
                Assign Asm
              </el-button>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeAsm(scope.row)"
              >
               Remove ASM
              </el-button>
            </template>
          </el-table-column>

          <el-table-column 
           v-if=" this.roleName == 'superadmin' || this.roleName == 'RSM'|| this.roleName == 'Zonal Head' "
            align="center" label="Rsm" width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rsmId" placeholder="Select">
                <el-option
                  v-for="item in rsmList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
               v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateRsm(scope.row)"
              >
                Assign RSM
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeRsm(scope.row)"
              >
               Remove RSM
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column
            v-if=" this.roleName == 'superadmin' || this.roleName == 'Zonal Head' "
            align="center"
            label="Zonal Head"
            width="220"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.zoneHeadId" placeholder="Select">
                <el-option
                  v-for="item in zonalList"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                />
              </el-select>
              <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="updateZonal(scope.row)"
              >
                Assign Zonal Head
              </el-button>
               <br /><br />
              <el-button
              v-if="roleName == 'superadmin'"
                v-waves
                class="filter-item"
                type="success"
                @click="removeZonal(scope.row)"
              >
               Remove Zonal
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            v-if="myRole.indexOf('superadmin') > -1"
            align="center"
            :label="$t('table.actions')"
            width="180"
          >
            <template slot-scope="scope">
              <router-link
                :to="'/userContact/list/' + scope.row.id"
                class="margin-horizontal"
              >
                <el-button v-waves class="filter-item" type="success">
                  Add Contact
                </el-button> </router-link
              ><br /><br />
              <el-popover placement="right" width="500" trigger="click">
                <el-table :data="statusDetails">
                  <el-table-column
                    width="200"
                    property="admin.fullName"
                    label="Admin Name"
                  >
                  </el-table-column>
                  <el-table-column width="200" property="" label="status">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">User</span>
                      <span v-if="scope.row.status == 2">CNF</span>
                      <span v-if="scope.row.status == 3">Super Socket</span>
                      <span v-if="scope.row.status == 4">CD</span>
                      <span v-if="scope.row.status == 5">SD</span>
                      <span v-if="scope.row.status == 6">WB</span>
                      <span v-if="scope.row.status == 7">MRP</span>
                      <span v-if="scope.row.status == 8">COP</span>
                      <span v-if="scope.row.status == 9">SOP</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button
                  v-loading="userStatusLoading"
                  size="small"
                  type="warning"
                  slot="reference"
                  @click="getUserStatusLog(scope.row)"
                >
                  History
                </el-button> </el-popover
              ><br /><br />
              <router-link :to="'/user/edit/' + scope.row.id">
                <el-button
                  v-waves
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                />
              </router-link>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUsersData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson, getQuery } from "@/utils";
import Enabled from "@/components/Enabled/index.vue";
import {
  deleteUser,
  getUserByContactNumber,
  getUsers,
  sendDeletionOtp,
  updateUser,
  verifyDeletionOtp,
} from "@/api/users";
import { AdminModule } from "@/store/modules/admin";
import Axios from "axios";
import { getAdmins } from "@/api/admins";
import { AppModule } from "@/store/modules/app";
import { addUserLog, getUserLogs } from "@/api/userlog";

@Component({
  name: "TypeList",
  components: {
    Pagination,
    Enabled,
    // PanThumb
  },
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  deleteDialog = false;
  private user: any;
  private isUser = 2;
  private status = "";
  private asmList: any[] = [];
  private rsmList: any[] = [];
  private zonalList: any[] = [];
  private zoneHeadList: any[] = [];
  private list: IUsersData[] = [];
  private myRole = AdminModule.roles[0];
  private listLoading = true;
  private callList: any = [];
  private userStatusLoading = false;
  private downloadLoading = false;
  private multipleSelection: any = [];

  private listQuery =
    this.myRole == "superadmin"
      ? {
          page: 1,
          limit: 10,
          sort: "id,DESC",
          isDeleted: false,
          status: 2,
          adminId: AdminModule.id,
          "userContact.contactNumber": "",

          filter: {
            enabled: "eq",
            // adminId:'eq',
            fullName: "$contL",
            email: "$contL",
            pincode: "eq",
            isDeleted: "eq",
            status: "eq",
            "userContact.contactNumber": "$contL",
          },
        }
      : this.myRole == "admin"
      ? {
          page: 1,
          limit: 10,
          sort: "id,DESC",
          isDeleted: false,
          status: 2,
          // id:AdminModule.id,
          "userContact.contactNumber": "",

          filter: {
            enabled: "eq",
            // id:'eq',
            fullName: "$contL",
            email: "$contL",
            pincode: "eq",
            isDeleted: "eq",
            status: "eq",
            "userContact.contactNumber": "$contL",
          },
        }
      : this.myRole == "ASM"
      ? {
          page: 1,
          limit: 10,
          sort: "id,DESC",
          isDeleted: false,
          status: 2,
          // id:AdminModule.id,
          "userContact.contactNumber": "",
          superAdminId: AdminModule.id,

          filter: {
            superAdminId: "eq",
            enabled: "eq",
            // id:'eq',
            fullName: "$contL",
            email: "$contL",
            pincode: "eq",
            isDeleted: "eq",
            status: "eq",
            "userContact.contactNumber": "$contL",
          },
        }
      : this.myRole == "RSM"
      ? {
          page: 1,
          limit: 10,
          sort: "id,DESC",
          isDeleted: false,
          status: 2,
          // id:AdminModule.id,
          "userContact.contactNumber": "",
          rsmId: AdminModule.id,

          filter: {
            rsmId: "eq",
            enabled: "eq",
            // id:'eq',
            fullName: "$contL",
            email: "$contL",
            pincode: "eq",
            isDeleted: "eq",
            status: "eq",
            "userContact.contactNumber": "$contL",
          },
        }
      : {
          page: 1,
          limit: 10,
          sort: "id,DESC",
          isDeleted: false,
          status: 2,
          // id:AdminModule.id,
          "userContact.contactNumber": "",

          zoneHeadId: AdminModule.id,

          filter: {
            zoneHeadId: "eq",
            enabled: "eq",
            // id:'eq',
            fullName: "$contL",
            email: "$contL",
            pincode: "eq",
            isDeleted: "eq",
            status: "eq",
            "userContact.contactNumber": "$contL",
          },
        };

  // private listQuery =
  // {
  //   page: 1,
  //   limit: 20,
  //   sort: "id,DESC",
  //   isDeleted: false,
  //   status: 2,

  //   'userContact.contactNumber': "",
  //   filter: {
  //     enabled: "eq",

  //     fullName: "$contL",
  //     email: "$contL",
  //     pincode: "eq",
  //     isDeleted: "eq",
  //     status: "eq",
  //     "userContact.contactNumber": "$contL"
  //   },
  // };

  private contactQuery = {
    status: 0,
    contactNumber: "",
  };

  private showCreatedDate: boolean = false;
  private sortOptions = [
    { label: "ID Ascending", key: "id,ASC" },
    { label: "ID Descending", key: "id,DESC" },
  ];

  private enableTypeOptions = [
    { key: true, value: "Enable" },
    { key: false, value: "Disabled" },
  ];

  private filters: any = [];

  private userList = [
    { label: "User", value: 1 },
    { label: "CNF", value: 2 },
    { label: "Super Stockist", value: 3 },
    { label: "CD", value: 4 },
    { label: "SD", value: 5 },
    { label: "WB", value: 6 },
    { label: "MRP", value: 7 },
    { label: "COP", value: 8 },
    { label: "SOP", value: 9 },
  ];
  adminId: any;
  private statusDetails: any = [];
  userId: any;
  adminName: any;
  roleId: any;
  roleName: any;

  created() {
    console.log(this.myRole,"Admin role");
    this.getAdminInfo();
    this.getList();
    this.fetchAsms();
    this.fetchRsms();
    this.fetchZonal();
  }

  async fetchAsms() {
    try {
      const data: any = await getAdmins(
        getQuery({
          adminsRoleId: 4,
          enabled: true,

          filter: {
            adminsRoleId: "eq",
            enabled: "eq",
          },
        })
      );

      this.asmList = data;
    } catch (error) {}
  }

  async fetchRsms() {
    try {
      const data: any = await getAdmins(
        getQuery({
          adminsRoleId: 5,
          enabled: true,
          filter: {
            adminsRoleId: "eq",
            enabled: "eq",
          },
        })
      );

      this.rsmList = data;
      console.log("rsm", this.rsmList);
    } catch (error) {}
  }
  async fetchZonal() {
    try {
      const data: any = await getAdmins(
        getQuery({
          adminsRoleId: 6,
          enabled: true,
          filter: {
            adminsRoleId: "eq",
            enabled: "eq",
          },
        })
      );

      this.zonalList = data;
    } catch (error) {}
  }

  async updateAsm(data: any) {
    data.superAdmin = {
      id: data.superAdminId,
    };

    await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "ASM Updated successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }

  async updateRsm(data: any) {
    data.rsm = {
      id: data.rsmId,
    };

    await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "RSM Updated successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }
  async updateZonal(data: any) {
    data.zoneHead = {
      id: data.zoneHeadId,
    };
    await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "Zonal Head Updated successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }
  private async removeZonal(data:any){
  data.zoneHeadId = null;
   await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "Zonal Head Removed successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }
   private async removeRsm(data:any){
  data.rsmId = null;
   await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "RSM Removed successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }
 private async removeAsm(data:any){
  data.superAdminId = null;
   await updateUser(data.id, data)
      .then((res: any) => {
        this.$message({
          message: "ASM Removed successfully",
          type: "success",
        });
      })
      .catch((e) => {});
  }
  private handleClick(tab: any, event: any) {
    if (tab.name == "user") {
      this.isUser = 1;
      this.listQuery.status = 1;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "cnf") {
      this.isUser = 2;
      this.listQuery.status = 2;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "superstockist") {
      this.isUser = 3;
      this.listQuery.status = 3;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "cd") {
      this.isUser = 4;
      this.listQuery.status = 4;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "sd") {
      this.isUser = 5;
      this.listQuery.status = 5;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "wb") {
      this.isUser = 6;
      this.listQuery.status = 6;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "mrp") {
      this.isUser = 7;
      this.listQuery.status = 7;
      this.listQuery.page = 1;
      this.getList();
    } else if (tab.name == "cop") {
      this.isUser = 8;
      this.listQuery.status = 8;
      this.listQuery.page = 1;
      this.getList();
    } else {
      this.isUser = 9;
      this.listQuery.status = 9;
      this.listQuery.page = 1;
      this.getList();
    }
  }

  private async getList() {
    try {
      this.listLoading = true;
      const data: any = await getUsers(getQuery(this.listQuery));
      this.list = data.data;
      this.total = data.total;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private async getListByNumber(contactNumber: any) {
    try {
      this.listLoading = true;
      this.contactQuery.contactNumber = contactNumber;
      if (this.isUser == 1) {
        this.contactQuery.status = 1;
      } else if (this.isUser == 2) {
        this.contactQuery.status = 2;
      } else if (this.isUser == 3) {
        this.contactQuery.status = 3;
      } else if (this.isUser == 4) {
        this.contactQuery.status = 4;
      } else if (this.isUser == 5) {
        this.contactQuery.status = 5;
      } else if (this.isUser == 6) {
        this.contactQuery.status = 6;
      } else if (this.isUser == 7) {
        this.contactQuery.status = 7;
      } else if (this.isUser == 8) {
        this.contactQuery.status = 8;
      } else {
        this.contactQuery.status = 9;
      }
      const data: any = await getUserByContactNumber(
        getQuery(this.contactQuery)
      );
      this.list = data.users;
      this.total = data.users.length;
      this.listLoading = false;
    } catch (error) {
      this.listLoading = false;
    }
  }

  private async handleMultipleDelete() {
    try {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          this.multipleSelection.forEach(async (user: any) => {
            user.isDeleted = true;
            await updateUser(user.id, user);
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "Deleted succesfully",
          });
          this.getList();
        });
    } catch (error) {
      this.$message.error("Deletion unsuccessfull");
    }
  }
  private async getAdminInfo() {
    try {
      const data1: any = AdminModule;
      console.log()
      this.adminId = data1.id;
      this.roleName = data1.roles[0];
      console.log("admin id", (this.adminId = data1.id));
       console.log("role id", (this.roleId = data1.roles[0]));
    } catch (err) {
      console.error(err);
    }
  }

  private async updateDistributor(data: any) {
    data.status = data.status;
    data.adminId = this.adminId;

    var data1 = {
      status: data.status,
      adminId: this.adminId,
      userId: data.id,
    };
    ;
    this.userStatusLoading = true;
    if (data) {
      this.userStatusLoading = true;
      // this.$confirm(
      //   this.$tc("table.updateConfirmation", undefined, {
      //     name: data.fullName,
      //   }),
      //   "Convert to distributor",
      //   {
      //     confirmButtonText: "Confirm",
      //     confirmButtonClass: "el-button--primary",
      //     cancelButtonText: "Cancel",
      //     type: "warning",
      //   }
      // )

      await updateUser(data.id, data);
      await addUserLog(data1).then((deleted) => {
        this.$message({
          message: "User updated successfully",
          type: "success",
        });
        this.userStatusLoading = true;
        this.getList();
        this.userStatusLoading = false;
        ;
      });

      // })
      // .then(() => {
      //   var data1 ={
      //     status:data.status,
      //     adminId:data.adminId,
      //     userId:data.userId
      //   }
      //   addUserLog(data1).then((deleted) => {

      //     this.getList();
      //     

      //   });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "Update cancelled",
      //   });
      // });
    }
  }
  private async getUserStatusLog(data: any) {
    ;
    const userLogs = await getUserLogs(
      getQuery({
        sort: "id,DESC",
        userId: data.id,
        filter: {
          userId: "eq",
        },
      })
    );
    this.statusDetails = userLogs;
    console.log("data to usdr", this.statusDetails);
    ;
  }

  private handleFilter() {
    this.listQuery.page = 1;
    // if (this.listQuery.contactNumber.length >= 10) {
    //   this.getListByNumber(this.listQuery.contactNumber);
    // } else {
    this.getList();
    // }
  }

  private async deletePayment(value: any) {
    try {
      const data = value.toString();
      var otp = data.replace(/,/g, "");
      const response: any = await verifyDeletionOtp({ otp });
      if (response.responseCode === 200) {
        Axios.all(this.callList).then((data: any) => {
          if (data.length > 0) {
            this.$message({
              message: "Deleted Successfully.",
              type: "success",
            });
            this.getList();
          } else {
            this.getList();
            this.$message.error("Orders not deleted.");
          }
        });
      } else {
        this.$message({
          type: "error",
          message: response.message,
        });
      }
    } catch (error) {
      this.$message({
        type: "info",
        message: "error",
      });
    }
    this.deleteDialog = false;
  }

  private async handleDelete(data: any) {
    try {
      await sendDeletionOtp();
      this.deleteDialog = true;
      this.user = data;
    } catch (error) {
      this.$message({
        type: "info",
        message: "error",
      });
      this.deleteDialog = false;
    }
  }

  private handleSelectionChange(val: any) {
    this.multipleSelection = val;
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
    var exportData: any = this.list;
    exportData.forEach((user: any) => {
      var contactNumber = "";
      var contact: any;
      user.userContact.forEach((contact: any) => {
        contactNumber = contactNumber.concat(
          contact.contactNumber.toString() + " ,"
        );
      });
      // for (contact in user.userContact) {
      //
      //   contactNumber = contactNumber.concat((contact.contactNumber).toString() + ' ,')
      //
      // }
      if (contactNumber.length < 1) {
        contactNumber = "NA";
      }
      user.contacts = contactNumber;
    });
    const tHeader = ["ID", "Full Name", "Company Name", "Contact Number"];
    const filterVal = ["id", "fullName", "companyName", "contacts"];
    const data = formatJson(filterVal, this.list);
    exportJson2Excel(tHeader, data, this.$tc("distributors"));
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
