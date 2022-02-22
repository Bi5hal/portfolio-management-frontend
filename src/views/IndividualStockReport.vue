<template>
  <v-container>
    <v-card flat height="250">
      <v-card-title><h1 class="display-1">Stock Details</h1></v-card-title>
      <v-list>
        <ul>Total Shares: {{ stockReport.total_units }}</ul>
        <ul>Total Investment: {{ stockReport.total_investment }}</ul>
        <ul>Sold Amount: {{ stockReport.sold_amount }}</ul>
        <ul>Net Profit: {{ stockReport.profit }}</ul>
      </v-list>
    </v-card>
    <v-spacer></v-spacer>
    <v-card flat class="mx-4 mt-n10">
      <v-card-title><h1 class="display-1">Stock Record</h1></v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="stockReport.transactions"
            fixed-header
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-center align-items-center">
              <v-btn color="error" fab icon x-small @click="confirm(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "axios";

export default {
  name: "IndividualStockReport",
  data() {
    return {
      headers: [
        {text: '#', value: 'actions'},
        {text: 'Stock Name', value: 'stock.name'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'Price per share', value: 'unit_price'},
        {text: 'Type', value: 'transaction_type'},
        {text: 'Date of Transaction', value: 'transaction_date'},
      ],
      stockReport: {},
    }
  },
  computed: {
    ...mapGetters(["transactionsPaginatedData", "isLoading","user"])
  },
  methods: {
    getStockReport() {
      let temp = this;
      axios.post("http://localhost:8000/api/stock-report", {user_id: temp.user.id, stock_id: parseInt(temp.$route.params.id)}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + temp.accessToken
        }
      }).then(function (response) {
        console.log(response)
        if (response.status === 200) {
          temp.stockReport = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    ...mapActions(["fetchAllTransactions", "deleteTransaction"]),
    confirm(transaction) {
      let temp = this;
      this.$root.confirm('Confirm Delete', 'Are you sure you want to delete ' + transaction.stock.name + '?', {color: 'red'}).then(() => {
        temp.deleteTransaction(transaction.id);
        this.getStockReport();
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  watch: {
    options: {
      handler(e) {
        this.query.page = e.page;
        this.query.perPage = e.itemsPerPage;
        this.getDataFromApi();
      },
      deep: true,
    }
  },
  mounted() {
    this.getStockReport();

  }

}
</script>

<style scoped>

</style>