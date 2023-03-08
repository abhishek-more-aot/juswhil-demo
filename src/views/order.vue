<template>
  <div>
    <center>
      <el-button
        icon="el-icon-printer"
        type="success"
        @click="printDiv('printPdf')"
      >
        Print
      </el-button>
    </center>
    <!-- Header -->
    <div id="printPdf">
      <div
        class="page"
        style="display: flex; align-items: center; justify-content: center; background: #EEEEEE"
      >
        <div
          class="page-box"
          style="padding: 50px 50px; width: 600px; background: white; margin: 20px 0; border-radius: 10px"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <span
              style="
                font-size: 12px;
                color: #5b5b5b;
                font-family: 'Open Sans', sans-serif;
              "
            >
              Order No. <b>{{ list.id }}</b>
            </span>
            <span
              style="
                font-size: 12px;
                color: #5b5b5b;
                font-family: 'Open Sans', sans-serif;
              "
            >
              Dated
              <b>{{ list.createdTimestamp | moment("DD-MMM-YYYY") }}</b>
            </span>
          </div>

          <div style="text-align: center; margin: 30px 0 40px; font-size: 15px">
            <div style="margin-bottom: 8px">
              <b>My Varni</b>
            </div>
            <div style="margin-bottom: 8px">
              <b>Delivery Challan</b>
            </div>
            <div>
              Party : <b>{{ list.user.fullName }}</b>
            </div>
          </div>

          <div>
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="fullPadding"
            >
              <tbody>
                <tr>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      padding: 0 0 7px;
                      border-bottom: 1px solid #bebebe;
                    "
                    align="center"
                  >
                    <small>Sr No.</small>
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      padding: 0 10px 7px 10px;
                      border-bottom: 1px solid #bebebe;
                    "
                    width="35%"
                    align="left"
                  >
                    Description of Goods
                  </th>
                  <!-- <th
                    style="
                        font-size: 12px;
                        font-family: 'Open Sans', sans-serif;
                        color: #5b5b5b;
                        font-weight: normal;
                        line-height: 1;
                        vertical-align: top;
                        padding: 0 0 7px;
                        border-bottom: 1px solid #bebebe;
                      "
                    align="left"
                  >
                    <small>Option</small>
                  </th> -->
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      padding: 0 0 7px;
                      border-bottom: 1px solid #bebebe;
                    "
                    align="center"
                  >
                    Quantity
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      font-weight: normal;
                      padding: 0 0 7px;
                      border-bottom: 1px solid #bebebe;
                    "
                    align="center"
                  >
                    Amount
                  </th>
                  <th
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #1e2b33;
                      font-weight: normal;
                      padding: 0 0 7px;
                      border-bottom: 1px solid #bebebe;
                    "
                    align="center"
                  >
                    Tick
                  </th>
                </tr>
                <!-- <tr>
                    <td height="1" style="background: #bebebe" colspan="4" />
                  </tr>
                  <tr>
                    <td height="10" colspan="4" />
                  </tr> -->
                <tr
                  v-for="(product, index) in products"
                  :key="index"
                >
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                      text-align: center;
                    "
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #ff0000;
                      padding: 10px 10px;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                    class="article"
                  >
                    {{ product.product.name }} [{{
                      product.product.modelNumber
                    }}]
                    <div>
                      <ul v-for="(option,index) in product.options" :key="index" style="list-style-type:none;padding:0px">
                        <li style="list-style:none;color:black">{{index}} : {{option}}</li>
                      </ul>
                      
                    </div>
                  </td>
                  <!-- <td
                    style="
                        font-size: 12px;
                        font-family: 'Open Sans', sans-serif;
                        color: #646a6e;
                        line-height: 18px;
                        vertical-align: top;
                        padding: 10px 0;
                        border-right: 1px solid black;
                        border-bottom: 1px solid black;
                      "
                  >
                    
                  </td> -->
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                    align="center"
                  >
                    {{ product.quantity }} PCS
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #646a6e;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                    align="center"
                  >
                    {{product.quantity}} x {{product.amount}} = {{product.quantity * product.amount}}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #1e2b33;
                      padding: 12px 0 10px;
                      border-bottom: 1px solid black;
                    "
                    align="center"
                  >
                    <input type="checkbox">
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  />
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: right;
                      padding: 10px;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    Sub Total
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >

                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    ₹ {{ subtotal }}
                  </td>
                  <td style="border-bottom: 1px solid black" />
                </tr>
                <tr>
                  <td
                    style="
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  />
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: right;
                      padding: 10px;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    Tax
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    ₹ {{ taxAmount }}
                  </td>
                  <td style="border-bottom: 1px solid black" />
                </tr>
                <tr>
                  <td
                    style="
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  />
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: right;
                      padding: 10px;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    Total
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    {{ totalQty + " PCS" }}
                  </td>
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #000;
                      vertical-align: top;
                      text-align: center;
                      font-weight: bold;
                      padding: 10px 0;
                      border-right: 1px solid black;
                      border-bottom: 1px solid black;
                    "
                  >
                    ₹ {{ totalAmt }}
                  </td>
                  <td style="border-bottom: 1px solid black" />
                </tr>
                
                <!-- <tr>
                    <td
                      height="1"
                      colspan="4"
                      style="border-bottom: 1px solid #e4e4e4"
                    />
                  </tr>
                  <tr>
                    <td
                      height="1"
                      colspan="4"
                      style="border-bottom: 1px solid #e4e4e4"
                    />
                  </tr> -->
              </tbody>
            </table>
          </div>

          <div class="information">
            <table
              width="220"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="left"
              class="col"
            >
              <tbody>
                <tr class="hiddenMobile">
                  <td height="30" />
                </tr>
                <tr class="visibleMobile">
                  <td height="30" />
                </tr>
                <tr>
                  <td
                    style="
                      font-size: 11px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      line-height: 1;
                      vertical-align: top;
                    "
                  >
                    <strong>Declaration</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    width="100%"
                    height="10"
                  />
                </tr>
                <tr>
                  <td
                    style="
                      font-size: 10px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      line-height: 20px;
                      vertical-align: top;
                    "
                  >
                    Replacement will accepted upto 50% total Bill
                    <br>Value (Gst included)
                  </td>
                </tr>
              </tbody>
            </table>

            <table
              width="220"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="right"
              class="col"
            >
              <tbody>
                <tr class="hiddenMobile">
                  <td height="30" />
                </tr>
                <tr class="visibleMobile">
                  <td height="30" />
                </tr>
                <tr align="right">
                  <td
                    style="
                      font-size: 11px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      line-height: 1;
                      vertical-align: top;
                    "
                  >
                    <strong>for My Varni Accessories</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    width="100%"
                    height="10"
                  />
                </tr>
                <tr align="right">
                  <td
                    style="
                      font-size: 12px;
                      font-family: 'Open Sans', sans-serif;
                      color: #5b5b5b;
                      line-height: 20px;
                      vertical-align: top;
                    "
                  >
                    <br>
                    <br>
                    Authorized Signatory
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              class="fullPadding"
            >
              <tbody>
                <tr class="hiddenMobile">
                  <td height="30" />
                </tr>
                <tr class="visibleMobile">
                  <td height="30" />
                </tr>
                <tr>
                  <td
                    style="
                      font-size: 12px;
                      color: #5b5b5b;
                      font-family: 'Open Sans', sans-serif;
                      line-height: 18px;
                      vertical-align: top;
                      text-align: left;
                    "
                  >
                    This is a Computer Generated Inovice.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getOrderById } from '@/api/order'
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'

@Component({
  name: 'orderPdf',
  components: {}
})
export default class extends Vue {
  private list: any = [];
  private products: any = [];
  private totalQty = 0;
  private totalAmt = 0;
  private taxAmount=0;
  private subtotal=0;
  printDiv(divName: any) {
    var printContents: any = document.getElementById(divName)?.innerHTML
    //  var originalContents = document.body.innerHTML;

    //  document.body.innerHTML = printContents;

    //  window.print();

    //  document.body.innerHTML = originalContents;

    var printWindow: any = window.open('', '', 'height=800,width=1000')
    printWindow.document.write(printContents)
    printWindow.document.close()
    setTimeout(function() {
      printWindow.print()
    }, 1000)
  }

  created() {
    const orderId = parseInt(this.$route.params && this.$route.params.id)
    this.getData(orderId)
  }

  async getData(id: number) {
    const data: any = await getOrderById(id)
    this.products = data.product.addToCart

    this.list = data.product
    this.totalAmt = data.product.amount
    this.taxAmount=data.product.taxAmount
    this.subtotal=data.product.subTotalmount
    for (var i = 0; i < this.products.length; i++) {
      this.totalQty += this.products[i].quantity
    }
    console.log(this.products)
  }
}
</script>

  <style type="text/css">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
body {
  margin: 0;
  padding: 0;
  background: #e1e1e1;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-box {
  background: white;
  border-radius: 10px;
  padding: 20px 30px;
}
div,
p,
a,
li,
td {
  -webkit-text-size-adjust: none;
}
.ReadMsgBody {
  width: 100%;
  background-color: #ffffff;
}
.ExternalClass {
  width: 100%;
  background-color: #ffffff;
}
body {
  width: 100%;
  height: 100%;
  background-color: #e1e1e1;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
html {
  width: 100%;
}
p {
  padding: 0 !important;
  margin-top: 0 !important;
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 0 !important;
}
.visibleMobile {
  display: none;
}
.hiddenMobile {
  display: block;
}

@media only screen and (max-width: 600px) {
  body {
    width: auto !important;
  }
  .page-box{
    width: 100% !important;
    clear: both;
    padding: 50px 25px !important
  }
  table[class="fullTable"] {
    width: 100% !important;
    clear: both;
  }
  table[class="fullPadding"] {
    width: 100% !important;
    clear: both;
  }
  table[class="col"] {
    width: 45% !important;
  }
  .erase {
    display: none;
  }
}

@media only screen and (max-width: 420px) {
  table[class="fullTable"] {
    width: 100% !important;
    clear: both;
  }

  .page-box{
    width: 100% !important;
    clear: both;
    padding: 50px 25px !important
  }
  table[class="fullPadding"] {
    width: 100% !important;
    clear: both;
  }
  table[class="col"] {
    width: 100% !important;
    clear: both;
  }
  table[class="col"] td {
    text-align: left !important;
  }
  .erase {
    display: none;
    font-size: 0;
    max-height: 0;
    line-height: 0;
    padding: 0;
  }
  .visibleMobile {
    display: block !important;
  }
  .hiddenMobile {
    display: none !important;
  }
}
</style>
