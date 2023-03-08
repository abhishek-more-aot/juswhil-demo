<template>
  <div>
    <el-row
      v-if="this.myRole == 'superadmin'"
      :gutter="40"
      class="panel-group"
    >
      <!-- <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/user/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="users-alt"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Distributors
              </div>
              <count-to
                :start-val="0"
                :end-val="DistributorCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col> -->

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/admins/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="users-alt"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
             Admins
              </div>
              <count-to
                :start-val="0"
                :end-val="AdminsCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col>

       <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/career/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="bag"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Career
              </div>
              <count-to
                :start-val="0"
                :end-val="careerTotal"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col> 

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/category/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="create-dashboard"
                height="50"
                width="50"
                class="card-panel-icon"
              />
              <!-- <img src="https://cdn2.vectorstock.com/i/1000x1000/40/76/flat-group-people-icon-symbol-background-vector-5524076.jpg"> -->
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Categories
              </div>
              <count-to
                :start-val="0"
                :end-val="categoriesCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col>

      <!-- <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/option/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="box"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Options
              </div>
              <count-to
                :start-val="0"
                :end-val="productOptionCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col> -->

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/category/list'"
          class="margin-horizontal"
        >
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="cube"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Products
              </div>
              <count-to
                :start-val="0"
                :end-val="productCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col>
      <!-- <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
      >
        <router-link
          :to="'/order/list'"
          class="margin-horizontal"
        >
          <div
            class="card-panel"
            @click="handleSetLineChartData('purchases')"
          >
            <div class="card-panel-icon-wrapper icon-money">
              <unicon
                name="shopping-cart"
                height="50"
                width="50"
                class="card-panel-icon"
              />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                Orders
              </div>
              <count-to
                :start-val="0"
                :end-val="orderCount"
                :duration="3200"
                class="card-panel-num"
              />
            </div>
          </div>
        </router-link>
      </el-col> -->
    </el-row>
    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
       <line-chart :chart-data="lineChartData" />
      <b><p style="text-align:center; color:red">Users</p></b>
      <bar-chart />
    </el-row> -->
    <el-dialog
      title="Reason"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <el-select
          v-model="reason"
          placeholder="Select"
        >
          <el-option
            v-for="item in reasonList"
            :key="item.reason"
            :label="item.reason"
            :value="item.reason"
          /> </el-select></span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          v-loading="dialogLoading"
          type="success"
          @click="updateReason()"
        >Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Status"
      :visible.sync="statusDialogVisible"
      width="30%"
    >
      <span>
        <el-select
          v-model="statusData.status"
          placeholder="Status"
          class="filter-item"
          style="width: 100%"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <br><br>
        <div v-if="statusData.status == 4">
          <el-select
            v-model="statusData.reason"
            placeholder="Reason"
            style="width: 100%"
          >
            <el-option
              v-for="item in reasonList"
              :key="item.reason"
              :label="item.reason"
              :value="item.reason"
            />
          </el-select>
        </div>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="statusDialogVisible = false">Cancel</el-button>
        <el-button
          v-loading="statusDialogLoading"
          type="success"
          @click="updateStatus()"
        >Confirm</el-button>
      </span>
    </el-dialog>

    <!-- <el-label>Today's Orders</el-label>
    <hr>
    <br>

    <el-row >
      <div class="app-container"> -->
        <!-- <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            sortable="custom"
            width="100"
            align="center"
            :label="$t('table.id')"
            prop="id"
          />
          <el-table-column
            style="width: 200px"
            align="center"
            label="User Details"
            prop="contact"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.user.fullName }}</span><br>
              <span>{{ scope.row.user.email }}</span><br>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Status"
            style="width: 200px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 4">On hold</span>
              <span
                v-else-if="scope.row.status == 0"
                style="color: orange"
              >Pending</span>
              <span
                v-else-if="scope.row.status == 1"
                style="color: green"
              >Accepted</span>
              <span
                v-else-if="scope.row.status == 2"
                style="color: darkgreen"
              >Dispatched</span>
              <span
                v-else-if="scope.row.status == 3"
                style="color: red"
              >Cancelled</span><br>

              <el-button
                v-waves
                class="filter-item"
                type="primary"
                style="margin-left: 10px"
                @click="OpenStatus(scope.row)"
              >
                Update Status
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Invoice"
            style="width: 200px"
          >
            <template slot-scope="scope">
              <router-link :to="'/order/orderPdf/' + scope.row.id">
                <svg-icon
                  name="documentation"
                  style="font-size: 32px; color: green; cursor: pointer"
                />
              </router-link>
            </template>
          </el-table-column>
        </el-table> -->
        <!-- <el-tabs
          :activeName="activeTab"
          :stretch="true"
          style="height: 10%"
          @tab-click="handleClick"
        >
          <el-tab-pane label="Pending" name="pending">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  sortable="custom"
                  width="100"
                  align="center"
                  :label="$t('table.id')"
                  prop="id"
                />
                <el-table-column
                  style="width: 200px"
                  align="center"
                  label="User Details"
                  prop="contact"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.fullName }}</span><br>
                    <span>{{ scope.row.user.email }}</span><br>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Status"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 4">On hold</span>
                    <span
                      v-else-if="scope.row.status == 0"
                      style="color: orange"
                    >Pending</span>
                    <span
                      v-else-if="scope.row.status == 1"
                      style="color: green"
                    >Accepted</span>
                    <span
                      v-else-if="scope.row.status == 2"
                      style="color: darkgreen"
                    >Dispatched</span>
                    <span
                      v-else-if="scope.row.status == 3"
                      style="color: red"
                    >Cancelled</span><br>

                    <el-button
                     v-if="myRole == 'superadmin'"
                      v-waves
                      class="filter-item"
                      type="primary"
                      style="margin-left: 10px"
                      @click="OpenStatus(scope.row)"
                    >
                      Update Status
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Invoice"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <router-link :to="'/order/orderPdf/' + scope.row.id">
                      <svg-icon
                        name="documentation"
                        style="font-size: 32px; color: green; cursor: pointer"
                      />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="Accepted" name="accepted">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  sortable="custom"
                  width="100"
                  align="center"
                  :label="$t('table.id')"
                  prop="id"
                />
                <el-table-column
                  style="width: 200px"
                  align="center"
                  label="User Details"
                  prop="contact"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.fullName }}</span><br>
                    <span>{{ scope.row.user.email }}</span><br>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Status"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 4">On hold</span>
                    <span
                      v-else-if="scope.row.status == 0"
                      style="color: orange"
                    >Pending</span>
                    <span
                      v-else-if="scope.row.status == 1"
                      style="color: green"
                    >Accepted</span>
                    <span
                      v-else-if="scope.row.status == 2"
                      style="color: darkgreen"
                    >Dispatched</span>
                    <span
                      v-else-if="scope.row.status == 3"
                      style="color: red"
                    >Cancelled</span><br>
      
                    <el-button
                     v-if="myRole == 'superadmin'"
                      v-waves
                      class="filter-item"
                      type="primary"
                      style="margin-left: 10px"
                      @click="OpenStatus(scope.row)"
                    >
                      Update Status
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Invoice"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <router-link :to="'/order/orderPdf/' + scope.row.id">
                      <svg-icon
                        name="documentation"
                        style="font-size: 32px; color: green; cursor: pointer"
                      />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="Dispatched" name="dispatched">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  sortable="custom"
                  width="100"
                  align="center"
                  :label="$t('table.id')"
                  prop="id"
                />
                <el-table-column
                  style="width: 200px"
                  align="center"
                  label="User Details"
                  prop="contact"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.fullName }}</span><br>
                    <span>{{ scope.row.user.email }}</span><br>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Status"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 4">On hold</span>
                    <span
                      v-else-if="scope.row.status == 0"
                      style="color: orange"
                    >Pending</span>
                    <span
                      v-else-if="scope.row.status == 1"
                      style="color: green"
                    >Accepted</span>
                    <span
                      v-else-if="scope.row.status == 2"
                      style="color: darkgreen"
                    >Dispatched</span>
                    <span
                      v-else-if="scope.row.status == 3"
                      style="color: red"
                    >Cancelled</span><br>
      
                    <el-button
                   
                     v-if="myRole == 'superadmin'"
                      v-waves
                      class="filter-item"
                      type="primary"
                      hidden=true
                      style="margin-left: 10px"
                      @click="OpenStatus(scope.row)"
                    >
                      Update Status
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Invoice"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <router-link :to="'/order/orderPdf/' + scope.row.id">
                      <svg-icon
                        name="documentation"
                        style="font-size: 32px; color: green; cursor: pointer"
                      />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="Cancelled" name="cancelled">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  sortable="custom"
                  width="100"
                  align="center"
                  :label="$t('table.id')"
                  prop="id"
                />
                <el-table-column
                  style="width: 200px"
                  align="center"
                  label="User Details"
                  prop="contact"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.fullName }}</span><br>
                    <span>{{ scope.row.user.email }}</span><br>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Status"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 4">On hold</span>
                    <span
                      v-else-if="scope.row.status == 0"
                      style="color: orange"
                    >Pending</span>
                    <span
                      v-else-if="scope.row.status == 1"
                      style="color: green"
                    >Accepted</span>
                    <span
                      v-else-if="scope.row.status == 2"
                      style="color: darkgreen"
                    >Dispatched</span>
                    <span
                      v-else-if="scope.row.status == 3"
                      style="color: red"
                    >Cancelled</span><br>
      
                    <el-button
                      v-if="myRole == 'superadmin'"
                      v-waves
                      class="filter-item"
                      type="primary"
                      style="margin-left: 10px"
                      @click="OpenStatus(scope.row)"
                    >
                      Update Status
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Invoice"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <router-link :to="'/order/orderPdf/' + scope.row.id">
                      <svg-icon
                        name="documentation"
                        style="font-size: 32px; color: green; cursor: pointer"
                      />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="On Hold" name="on hold">
              <el-table
                :key="tableKey"
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  sortable="custom"
                  width="100"
                  align="center"
                  :label="$t('table.id')"
                  prop="id"
                />
                <el-table-column
                  style="width: 200px"
                  align="center"
                  label="User Details"
                  prop="contact"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.fullName }}</span><br>
                    <span>{{ scope.row.user.email }}</span><br>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Status"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 4">On hold</span>
                    <span
                      v-else-if="scope.row.status == 0"
                      style="color: orange"
                    >Pending</span>
                    <span
                      v-else-if="scope.row.status == 1"
                      style="color: green"
                    >Accepted</span>
                    <span
                      v-else-if="scope.row.status == 2"
                      style="color: darkgreen"
                    >Dispatched</span>
                    <span
                      v-else-if="scope.row.status == 3"
                      style="color: red"
                    >Cancelled</span><br>
      
                    <el-button
                      v-if="myRole == 'superadmin'"
                      v-waves
                      class="filter-item"
                      type="primary"
                      style="margin-left: 10px"
                      @click="OpenStatus(scope.row)"
                    >
                      Update Status
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Invoice"
                  style="width: 200px"
                >
                  <template slot-scope="scope">
                    <router-link :to="'/order/orderPdf/' + scope.row.id">
                      <svg-icon
                        name="documentation"
                        style="font-size: 32px; color: green; cursor: pointer"
                      />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
        </el-tabs>
        
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div> -->
      <!-- <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <radar-chart />
        </div>
      </el-col> -->
      <!-- <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <pie-chart :piechartdata="pieChartData" />
        </div>
      </el-col> -->
      <!-- <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    <!-- </el-row> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'
import BarChart from './BarChart.vue'
import LineChart, { ILineChartData } from '../components/LineChart.vue'
import PieChart from './PieChart.vue'
import RadarChart from './RadarChart.vue'
import { getQuery } from '@/utils'
import { getBannerCount } from '@/api/banner'
import { getDistributorsCount, getUsersCount } from '@/api/users'
import { getCategorysCount } from '@/api/category'
import { getOptionCount } from '@/api/option'
import { getProductCount } from '@/api/product'
import {
  defaultOrderData,
  getOrderCount,
  getOrders,
  updateOrder
} from '@/api/order'
import { IOrderData } from '@/api/types'
import moment from 'moment'
import Pagination from '@/components/Pagination/index.vue'
import { getReasons } from '@/api/reason'
import { AdminModule } from '@/store/modules/admin'
import { getAdmins } from '@/api/admins'
import { getCareer} from '@/api/career'

const lineChartData: { [type: string]: ILineChartData } = {
  userCounts: {
    actualData: [120, 82, 91, 154, 162, 140, 145],
    expectedData: [200, 192, 120, 144, 160, 130, 140]
  }
}

@Component({
  name: 'PanelGroup',
  components: {
    CountTo,
    LineChart,
    PieChart,
    BarChart,
    RadarChart,
    Pagination
  }
})
export default class extends Vue {
  private listLoading = true;
  activeTab: any = "pending";
  private tableKey = 0;
  private total = 0;
  private list: IOrderData[] = [];
  private AdminsCount: any = 0;
  private DistributorCount: any = 0;
  private careerTotal: any = 0;
  private status: any = 0;
  private statusData: IOrderData = Object.assign({}, defaultOrderData);
  private statusDialogVisible = false;
  private statusDialogLoading = false;
  private dialogVisible = false;
  private dialogLoading = false;
  private reasonList = [];
  private reason: any = '';
  private Users: any = 0;
  private categoriesCount: any = 0;
  private productOptionCount: any = 0;
  private productCount: any = 0;
  private orderCount: any = 0;
  private lineChartData = lineChartData.userCounts;
  private barChartData: any;
  private pieChartData: any;
  private today: any;
  private myRole = AdminModule.roles[0];
  private handleSetLineChartData(type: string) {
    this.$emit('handleSetLineChartData', type)
  }

  // private listQuery ={
  //   userRoleId: 1,
  //   filter: {
  //     userRoleId: 'eq'

  //   }
  // }
  // private listQuery = {
  //   page: 1,
  //   limit: 10,
  //   createdTimestamp: '',
  //   createdTimestamp_1: '',
  //   status: 0,
  //   sort: 'id,DESC',
  //   filter: {
  //     createdTimestamp: 'gte',
  //     createdTimestamp_1: 'lte',
  //     status: 'eq'
  //   }
  // };
   private listQuery = this.myRole == 'superadmin'? {
    page: 1,
    limit: 10,
    'user.fullName': '',
    createdTimestamp: '',
    createdTimestamp_1: '',
    isDeleted: false,
    status: 0,
    sort: 'id,DESC',
    filter: {
      'user.fullName': '$contL',
      createdTimestamp: 'gte',
      createdTimestamp_1: 'lte',
      status: 'eq',
      isDeleted: 'eq'
    }
  }:this.myRole == 'ASM'?
  {
    page: 1,
    limit: 10,
    'user.fullName': '',
    createdTimestamp: '',
    createdTimestamp_1: '',
    isDeleted: false,
    asmId:AdminModule.id,
    sort: 'id,DESC',
    filter: {
      asmId:'eq',
      'user.fullName': '$contL',
      createdTimestamp: 'gte',
      createdTimestamp_1: 'lte',
      status: 'eq',
      isDeleted: 'eq'
    }
  }:this.myRole == 'RSM'?
   {

    page: 1,
    limit: 10,
    'user.fullName': '',
    createdTimestamp: '',
    createdTimestamp_1: '',
    isDeleted: false,
    rsmId:AdminModule.id,
    sort: 'id,DESC',
    filter: {
      rsmId:'eq',
      'user.fullName': '$contL',
      createdTimestamp: 'gte',
      createdTimestamp_1: 'lte',
      status: 'eq',
      isDeleted: 'eq'
    }
  }:
  {
    page: 1,
    limit: 10,
    'user.fullName': '',
    createdTimestamp: '',
    createdTimestamp_1: '',
    isDeleted: false,
    zoneHeadId:AdminModule.id,
    sort: 'id,DESC',
    filter: {
      zoneHeadId:'eq',
      'user.fullName': '$contL',
      createdTimestamp: 'gte',
      createdTimestamp_1: 'lte',
      status: 'eq',
      isDeleted: 'eq'
    }
  };

  


  private statusList = [
    { label: 'Pending', value: 0 },
    { label: 'Accepted', value: 1 },
    { label: 'Dispatched', value: 2 },
    { label: 'Cancelled', value: 3 },
    { label: 'On hold', value: 4 }
  ];

  created() {
    // var today: any = moment().format('YYYY-MM-DD')
    var today: any = moment().startOf('day').hour(0)
    var today_1: any = moment().endOf('day')

    today = today.toISOString()
    today_1 = today_1.toISOString()
    this.listQuery.createdTimestamp = today
    this.listQuery.createdTimestamp_1 = today_1

    
    if (this.$route.query.tabName != null) {
      this.activeTab = this.$route.query.tabName;
    }
    this.fetchReasons()
    this.getUsersCount()
    this.getDistributorsCount()
    this.getCareerCount()
    this.getCategorysCount()
    this.getProductOptionCount()
    this.getProductCount()
    this.getOrderCount()
    this.getList()
  }

  private async fetchReasons() {
    try {
      const data: any = await getReasons(getQuery({ filter: {} }))
      this.reasonList = data
      
    } catch (error) {
      console.log(error)
    }
  }

  data() {
    return {
      activeName: "pending",
    };
  }

    private handleClick(tab:any) {
    switch(tab.name) {
        case 'accepted': {
          this.listQuery.status = 1;
          
          this.getList();
          break;
        }
        case "dispatched": {
          this.listQuery.status = 2;
          
          this.getList();
          break;
        }
        case "cancelled": {
          this.listQuery.status = 3;
          
          this.getList();
          break;
        }
        case "on hold": {
          this.listQuery.status = 4;
          
          this.getList();
          break;
        }
        case "pending": {
          this.listQuery.status = 0;
          
          this.getList();
          break;
        }
    }
    
  }

  private updateReason() {
    try {
      this.statusData.status = 4
      this.statusData.reason = this.reason
      
      updateOrder(this.statusData.id, this.statusData).then(() => {
        this.dialogVisible = false
        this.statusData.reason = ''
        this.$message({
          message: 'Status Updated.',
          type: 'success'
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  private async updateStatus() {
    const data: any = this.statusData
    if (data.status !== 4) {
      data.reason = null
    }
    
    await updateOrder(data.id, data)
      .then(() => {
        this.$message({
          message: 'Status Updated.',
          type: 'success'
        })
        this.getList();

        this.statusDialogVisible = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  private async getList() {
    try {
      this.listLoading = true
      const data: any = await getOrders(getQuery(this.listQuery))
      this.list = data.data
      this.total = data.total
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private OpenStatus(row: any) {
    
    this.statusData = row
    this.statusDialogVisible = true
  }
   private adminQuery = {
    page: 1,
    limit: 10,
    enabled:true,
    sort: 'id,DESC',
    filter: {
     
      enabled: 'eq'
    }
  };

  private async getUsersCount() {
    
      this.listLoading = true
    const data1:any = await getAdmins(
        getQuery(this.adminQuery))
     this.AdminsCount = data1.data.length
  
  }

  private async getDistributorsCount() {
    try {
      this.listLoading = true
      this.DistributorCount = await getDistributorsCount(
        getQuery({
          filter: {}
        })
      )
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getCareerCount() {
    try {
      this.listLoading = true
      const data: any = await getCareer(
        getQuery({
          sort:'id,DESC',
          enabled:true,
          filter: {
            enabled:'eq',
          }
        })
      )
      this.careerTotal = data.length
      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getCategorysCount() {
    try {
      this.listLoading = true

      this.categoriesCount = await getCategorysCount(
        getQuery({
          filter: {}
        })
      )

      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getProductOptionCount() {
    try {
      this.listLoading = true

      this.productOptionCount = await getOptionCount(
        getQuery({
          filter: {}
        })
      )

      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getProductCount() {
    try {
      this.listLoading = true

      this.productCount = await getProductCount();

      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  private async getOrderCount() {
    try {
      this.listLoading = true

      this.orderCount = await getOrderCount(
        getQuery({
          filter: {}
        })
      )

      this.listLoading = false
    } catch (error) {
      this.listLoading = false
    }
  }

  // private async getStats() {
  //   try {
  //     this.listLoading = true
  //
  //     const data: any = await getAdminStats()
  //     this.pieChartData=data.categories;
  //
  //     this.listLoading = false
  //   } catch (error) {
  //     this.listLoading = false
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    padding: 20px 36px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #59b6e3;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper .card-panel-icon {
        color: #fff;
        fill: #fff;
      }

      .icon-people {
        background: #59b6e3;
      }

      .icon-message {
        background:#59b6e3;
      }

      .icon-money {
        background: #59b6e3;
      }

      .icon-money .card-panel-icon {
        fill: #fff;
      }

      .icon-shopping {
        background: #59b6e3;
      }
      .icon-money .card-panel-icon {
        fill: white !important;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      // margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
      fill: #59b6e3 !important;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      // margin: 26px;
      // margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.card-panel-icon {
  fill: #59b6e3;
}
</style>
