<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery['user.fullName']"
        placeholder="Name"
        style="width: 160px"
        class="filter-item"
        @input="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.createdTimestamp"
        type="date"
        class="filter-item"
        format="yyyy-MM-dd"
        name="taxInvoiceDate"
        style="width: 160px"
        clearable="true"
        placeholder="From"
        @change="fromUtc"
      />
      <el-date-picker
        v-model="listQuery.createdTimestamp_1"
        type="date"
        class="filter-item"
        format="yyyy-MM-dd"
        style="width: 160px"
        name="taxInvoiceDate"
        clearable="true"
        placeholder="To"
        @change="toUtc"
      />
      <el-select
        v-model="listQuery.status"
        style="width: 160px"
        class="filter-item"
        placeholder="Status"
        clearable="true"
        @change="handleFilter"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
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
        <div v-if="statusData.status== 4">
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
            /> </el-select>

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

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <!-- <el-table-column
        sortable="custom"
        width="100"
        align="center"
        :label="$t('table.id')"
        prop="id"
        :class-name="getSortClass('id')"
      /> -->
      <el-table-column
        style="width: 200px"
        align="center"
        label="Order Details"
        prop="contact"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isEdited"><el-tag type="warning">Edited</el-tag></span><br>
          <span>{{ scope.row.user.fullName }}</span><br>
          <span>{{ scope.row.user.email }}</span><br>
          <span>{{ scope.row.createdTimestamp | moment('DD-MM-YYYY') }}</span><br>
        </template>
      </el-table-column>

      <el-table-column
        
        align="center"
        label="Status"
        style="width: 200px"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status==4">On hold</span>
          <span
            v-else-if="scope.row.status==0 "
            style="color:orange"
          >Pending</span>
          <span
            v-else-if="scope.row.status==1"
            style="color:green"
          >Accepted</span>
          <span
            v-else-if="scope.row.status==2"
            style="color:darkgreen"
          >Dispatched</span>
          <span
            v-else-if="scope.row.status==3"
            style="color:red"
          >Cancelled</span><br>
          <!-- <span v-if="this.myRole =='superadmin'"> -->
            <el-button
            v-if="myRole =='superadmin'"
            v-waves
            class="filter-item"
            type="primary"
            
            style="margin-left:10px"
            @click="OpenStatus(scope.row)"
          >
            Update Status
          </el-button>
          <!-- </span> -->
          <!-- <el-button
           v-if="myRole =='ASM' || myRole =='Zonal Head' || myRole =='RSM'"
            v-waves
            class="filter-item"
            type="primary"
            style="margin-left:10px"
            @click="OpenStatus(scope.row)"
          >
           Update Status
          </el-button> -->
          <!-- <el-button
           v-if="myRole =='Zonal Head' && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 4"
            v-waves
            class="filter-item"
            type="primary"
            style="margin-left:10px"
            @click="OpenStatus(scope.row)"
          >
           Update Status
          </el-button> -->
         
          <!-- <el-button
           v-if="myRole =='RSM' && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 4"
            v-waves
            class="filter-item"
            type="primary"
            style="margin-left:10px"
            @click="OpenStatus(scope.row)"
          >
           Update Status
          </el-button> -->
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Invoice"
        style="width: 200px"
      >
        <template slot-scope="scope">
          <router-link :to="'/order/orderPdf/'+scope.row.id">
            <svg-icon
              name="documentation"
              style="font-size: 32px; color: blue;cursor: pointer;"
            />
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Excel"
        style="width: 200px"
      >
        <template slot-scope="scope">
          <svg-icon
            name="documentation"
            style="font-size: 32px; color: green;cursor: pointer;"
            @click="handleDownload(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        label="Document"
        style="width: 200px"
      >
        <template slot-scope="scope">
          <div
            v-for="doc in scope.row.document"
            :key="doc"
          >
            <el-tooltip
              :content="doc"
              placement="left"
            >
              <a
                :href="doc"
                target="_blank"
              >
                <svg-icon
                  name="documentation"
                  style="font-size: 32px; color: orange;cursor: pointer;"
                />
              </a>
            </el-tooltip>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        v-if="showCreatedDate"
        :label="$t('table.createdDate')"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.createdTimestamp | moment("from")
          }}</span><br>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="150"
        class-name="fixed-width"
      >
        <template slot-scope="scope">
          <el-dialog
            title="Document"
            :visible.sync="dialog"
            width="30%"
          >
            <span>
              <el-upload
                class="upload-demo"
                action="https://api.rdmobiles.com/common/upload"
                :on-change="handleChange"
                multiple
                :file-list="fileList"
              >
                <el-button
                  size="small"
                  type="primary"
                >Click to upload</el-button>
              </el-upload>
              <br>
            </span>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="closeDialog">Cancel</el-button>
              <el-button
                v-loading="dialogLoading"
                type="success"
                @click="updateDocument()"
              >Save</el-button>
            </span>
          </el-dialog>
          <router-link
           :to="'/documents/list/' + scope.row.id"
          >
          <el-button
            size="small"
            type="primary"
            
            
          >
            Upload Document
          </el-button>
          </router-link>
          <br><br>
          <router-link
            v-if="scope.row.addToCart.length>0"
            :to="'/order/edit/'+scope.row.id"
          >
            <el-button
              type="warning"
              size="small"
              icon="el-icon-edit"
            />
          </router-link>&nbsp;
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
    <div
      id="orderBill"
      hidden
    >
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="orderList"
        border
        show-summary
        class="table"
        fit
        highlight-current-row
        style="max-width:2480px;width:100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          style=" width:200px;"
          align="left"
          label="Description of goods"
          prop="contact"
        >
          <template slot-scope="scope">
            {{ scope.row.product.name }}<br>
          </template>
        </el-table-column>

        <el-table-column
          style=" width:auto;overflow: hidden;word-wrap: break-word;"
          align="left"
          label="Quantity"
          prop=""
        >
          <template slot-scope="scope">
            {{ scope.row.quantity+" " }} Pcs<br>
          </template>
        </el-table-column>
        <el-table-column
          style=" width: auto;overflow: hidden;word-wrap: break-word;"
          align="left"
          label="Rate"
          prop=""
        />

        <el-table-column
          style=" width: auto;overflow: hidden;word-wrap: break-word;"
          align="left"
          label="Per"
          prop=""
        />
        <el-table-column
          style=" width: auto;overflow: hidden;word-wrap: break-word;"
          align="left"
          label="Amount"
          prop=""
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getOrders, deleteOrder, updateOrder, getOrderById, defaultOrderData, updateStatus } from '@/api/order'
import { getCartById } from '@/api/cart'
import { IEventData, IOrderData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import { getQuery, formatJson } from '@/utils/index'
import { htmlToPaper } from 'vue-html-to-paper'
import { exportJson2Excel } from '@/utils/excel'
import Sortable, { get } from 'sortablejs'
import Enabled from '@/components/Enabled/index.vue'
import Axios from 'axios'
import { getReasons } from '@/api/reason'
import moment from 'moment'
import { keys, merge } from 'lodash'
import { uploadFile } from '@/api/common'
import { AdminModule } from '@/store/modules/admin'

@Component({
  name: 'orderList',
  components: {
    Pagination,
    Enabled
  }
})
export default class extends Vue {
  private tableKey = 0;
  private total = 0;
  private list: IOrderData[] = [];
  private order:any
  private document:any = []
  private reason:any='';
  private status:any= 0;
  private limitnum=1;
  private fileList:any=[]
  private orderList: any[] = [];
  private listLoading = true;
  private downloadLoading = false;
  private statusData:IOrderData = Object.assign({}, defaultOrderData) ;
  private dialogVisible = false;
  private dialog = false;
  private dialogLoading=false;
  private statusDialogVisible = false;
  private statusDialogLoading=false;
  private fullscreenLoading=false
  
  newList: any = [];
  oldList: any = [];
  private showSortingOption: boolean = false;
  private renderComponent: boolean = true;
  currentPage = 0; // pdf file page number
  pageCount = 0; // total number of pages in pdf file
  fileType = 'pdf'; // file type
  private myRole = AdminModule.roles[0];
  private multipleSelection:any=[]
  private showCreatedDate=false

  private listQuery = this.myRole == 'superadmin'? {
    page: 1,
    limit: 10,
    'user.fullName': '',
    createdTimestamp: '',
    createdTimestamp_1: '',
    isDeleted: false,
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
  }:this.myRole =='RSM'?
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

  private print() {
    // Pass the element id here

    htmlToPaper('orderBill')
  }

  private sortOptions = [
    { label: 'ID Ascending', key: 'id,ASC' },
    { label: 'ID Descending', key: 'id,DESC' }
  ];

   private statusList  = [
    { label: 'Pending', value: 0 },
    { label: 'Accepted', value: 1},
    { label: 'Dispatched', value: 2 },
    { label: 'Cancelled', value: 3 },
    { label: 'On hold', value: 4 }
  ];
 


  private reasonList = [];

  private enableTypeOptions = [
    { key: true, value: 'Enable' },
    { key: false, value: 'Disabled' }
  ];

  sortable: any;

  created() {
    this.fetchReasons()
    this.getList()
  }

  private uploadDoc(data:any) {
    this.order = data
    this.dialog = true
  }

  private handleChange(field:any) {
    if (field.response) {
      this.document.push(field.response)
    }
  }

  private async updateDocument() {
    try {
      this.order.document = this.document
      await updateOrder(this.order.id, this.order)
      this.$message({
        message: 'Status Updated.',
        type: 'success'
      })
      this.dialog = false
      this.fileList = []
    } catch (error) {
      console.log(error)
    }
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

  private handleSelectionChange(val:any) {
    this.multipleSelection = val
  }

  private async fetchReasons() {
    try {
      const data:any = await getReasons(getQuery({ filter: {} }))
      this.reasonList = data
    } catch (error) {
      console.log(error)
    }
  }

  private OpenStatus(row:any) {
    this.statusData = row
    this.statusDialogVisible = true
  }

  private async handleMultipleDelete() {
    const callList:any = []
    this.multipleSelection.forEach((order:any) => {
      order.isDeleted = true
      callList.push(updateOrder(order.id, order))
      
    })
    this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      Axios.all(callList).then((data: any) => {
        
        if (data.length > 0) {
          this.$message({
            message: 'Deleted Successfully.',
            type: 'success'
          })
          this.getList()
        } else {
          this.getList()
          this.$message.error('Orders not deleted.')
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
  }

  private closeDialog() {
    this.dialog = false
    this.fileList = []
  }

  private async getOrders(row:any) {
    this.orderList = []
    var callList:any = []
    this.fullscreenLoading = true

    await row.addToCartIds.forEach(async(cartId:any) => {
      callList.push(getCartById(cartId))
    }
    )

    await Axios.all(callList).then((data: any) => {
      data.forEach((response: any, index: any) => {
        this.orderList.push(response)
      })
    })

    // this.$htmlToPaper('orderBill');
    // this.fullscreenLoading=false

    var printWindow:any = window.open('', '', 'height=800,width=1000')
    printWindow.document.write('<html><head><link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" type="text/css" media="all" title="no title" charset="utf-8"/><title>Table Contents</title>')
    printWindow.document.write('<body>')
    var divContents:any = document.getElementById('orderBill')
    divContents = divContents.innerHTML

    printWindow.document.write(divContents)
    printWindow.document.write('</body>')
    printWindow.document.write('</html>')
    printWindow.document.close()
    this.fullscreenLoading = false
    setTimeout(function() { printWindow.print() }, 1000)

    // this.print()
  }

  private toggleVisibility() {
    this.dialogVisible = true
  }

  private async updateStatus() {
    this.statusData.isEdited = false
    const data:any = this.statusData
    if (data.status != 4) {
      data.reason = null
    }

    await updateStatus(data).then(() => {
      this.$message({
        message: 'Status Updated.',
        type: 'success'
      })

      this.statusDialogVisible = false
    }).catch((error) => { console.log(error) })
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

  fromUtc(field: any) {
    
    if (field == null) {
      this.listQuery.createdTimestamp = ''
      this.handleFilter()
    } else {
      this.listQuery.createdTimestamp = field.toISOString()
      this.handleFilter()
    }
  }

  toUtc(field: any) {
    if (field == null) {
      this.listQuery.createdTimestamp_1 = ''
      this.handleFilter()
    } else {
      this.listQuery.createdTimestamp_1 = moment(field).endOf('day').hour(23).toISOString()
      this.handleFilter()
    }
  }

  private handleFilter() {
    this.listQuery.page = 1
    if (this.listQuery.createdTimestamp == null) {
      this.listQuery.createdTimestamp = ''
    }
    if (this.listQuery.createdTimestamp_1 == null) {
      this.listQuery.createdTimestamp_1 = ''
    }
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
    const { prop, order } = data
    if (prop) {
      this.listQuery.sort =
        `${prop},` + (order === 'ascending' ? 'ASC' : 'DESC')
      this.handleFilter()
    }
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
          deleteOrder(data.id).then((deleted) => {
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$tc('table.deleteCanceled')
          })
        })
    }
  }

  async fetchProducts(ids:any) {
    const products:any = []
    const callList:any = []
    await ids.forEach(async(id:any) => {
      callList.push(getCartById(id))
    })
    Axios.all(callList).then((data: any) => {
      data.forEach((response: any) => {
        products.push(response)
      })
    })
    return products
  }

  private async handleDownload(row: any) {
    this.downloadLoading = true

    let orderData: any = row;
    // orderData.state=orderData.user.state.name;
    // orderData.address=orderData.user.address;
    // let statename:any = orderData.user.state.name
    const products:any = []
    const callList:any = []

    await orderData.addToCartIds.forEach(async(id:any) => {
      await callList.push(getCartById(id))
    })


    await Axios.all(callList).then((data: any) => {
      data.forEach(async(response: any) => {
        await products.push(response)
      })
    })
    const user:any = orderData.user

    products.forEach((product:any,index:any) => {
      var options = '';
      var subTotal=product.amount * product.quantity;
      // var amount=product.amount;
      for (var key in product.options) {
        options = options.concat(((key + ':' + product.options[key]).toString() + ' ,'))
      }
      if (options.length < 1) {
        options = 'NA'
      }
      product.optionsName = options
      if(index==0){
        
        product.user.address!=null? product.address =product.user.address : product.address='';
        product.user.stateId!=null ? product.state=product.user.state.name : product.state='';
        product.user.companyName != null ? product.companyName = product.user.companyName:product.companyName ="";
        product.order.createdTimestamp != null ? product.createdTimestamp = product.order.createdTimestamp: product.createdTimestamp =""
      }else{
          product.address =''
          product.state=''
          product.companyName=''
          product.createdTimestamp=null
      }
      product.createdTimestamp=product.order.createdTimestamp
      product.subTotal=subTotal
      product.name=product.product.name;
      product.description=product.product.description;
      product.mrpPrice = product.product.mrpPrice;
      product.gstId= product.product.gstId;
    })
    console.log(products);
    //  let userData:any= row;
    //  userData.state=userData.user.state.name;
    // userData.address=userData.user.address;
    //  user.address = user.address;
    // user.state = user.state.name;
    const tHeader = [
      'Invoice No',
      'Invoice Date',
      'Party Name',
      'Address',
      'State',
      "GSTIN No",
      'Stock Item Name',
      'Stock Item Code',
      'Item Description',
      'Qty',
      'Rate',
      'Amount',
      'CGST Amount',
      'SGST Amount',
      'IGST Amount',
      'Invoice Amount'
    ]
    // const merges = ['A1:F1']
    // const multiHeader = [[user.fullName + '   (' + user.companyName + ')','', '','','','']]
    const filterVal = [
      'createdTimestamp',
      'createdTimestamp',
      'companyName',
      'address',
      'state',
      'product.gstId',
      'name',
      'product.modelNumber',
      'product.description',
      'quantity',
      'product.mrpPrice',
      'amount',
      'amount',
      'quantity',
      'optionsName',
      'subTotal'
    ]
    const data = formatJson(filterVal, products)
    const heading:any = []

    exportJson2Excel(tHeader, data, (this.$tc(user.companyName + '_' + moment(orderData.createdTimestamp).format('DD-MM-YYYY'))))
    //exportJson2Excel(tHeader,data, this.$tc(user.companyName + '_' + moment(orderData.createdTimestamp).format('DD-MM-YYYY')),multiHeader, merges)
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
