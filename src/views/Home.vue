<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h1 class="display-1">
              User Information
            </h1>
          </v-card-title>
          <v-simple-table>
            <v-list>
              <ul>User Name: {{ user.name }}</ul>
              <ul>Email Address: {{ user.email }}</ul>
            </v-list>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h1 class="display-1">
              My share details
            </h1>
          </v-card-title>
          <v-list>
            <ul>Total Shares: {{ stocksReport.total_units }}</ul>
            <ul>Total Investment: {{ stocksReport.total_investment }}</ul>
            <ul>Sold Amount: {{ stocksReport.sold_amount }}</ul>
            <ul>Net Profit: {{ stocksReport.profit }}</ul>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-toolbar extended flat rounded>
      <v-toolbar-title><h1 class="display-1">My Portfolio</h1></v-toolbar-title>
      <v-spacer/>
      <v-btn
          class="d-flex align-self-center"
          color="success" depressed
          :to="('/transaction')">
        <v-icon left>mdi-layers-plus</v-icon>
        <span>Buy Stock</span></v-btn>
    </v-toolbar>
    <v-card class="mx-4 mt-n10">
      <v-card-text>
        <v-data-table
            :headers="headers"
            :hide-default-footer="true"
            :items="transactionsPaginatedData.data"
            :items-per-page="query.perPage"
            :loading="isLoading"
            :options.sync="options"
            :page="query.page"
            :pageCount="transactionsPaginatedData.pagination.total_pages"
            :server-items-length="transactionsPaginatedData.pagination.total"
            :sort-by.sync="query.sortBy"
            :sort-desc.sync="query.sortDesc"
            fixed-header
            loading-text="Fetching data. Please wait..."
        >
          <template v-slot:top="{ pagination, options, updateOptions }">
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="query.search" append-icon="mdi-magnify" dense filled
                                label="Search..." @change="getDataFromApi"
                                @click:append="getDataFromApi"
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="8">
                  <v-data-footer
                      :items-per-page-options="[10,25,50,100]"
                      :options.sync="options"
                      :pagination="pagination"
                      :show-first-last-page="true"
                      first-icon="mdi-arrow-collapse-left"
                      items-per-page-text="$vuetify.dataTable.itemsPerPageText"
                      last-icon="mdi-arrow-collapse-right"
                      next-icon="mdi-arrow-right-thin"
                      prev-icon="mdi-arrow-left-thin"
                      @update:options="updateOptions"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-content-center align-items-center">
              <v-btn color="error" fab icon x-small @click="confirm(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn color="success" fab icon x-small :to="`/individual/${item.stock_id}`">
                <v-icon>mdi-eye</v-icon>
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
  name: "Home",
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
      query: {
        page: 1,
        perPage: 10,
        search: ""
      },
      options: {},
      stocksReport: {},
    }
  },
  computed: {
    ...mapGetters(["transactionsPaginatedData", "isLoading", "user", "accessToken"])
  },
  methods: {
    ...mapActions(["fetchAllTransactions", "deleteTransaction"]),
    getStocksReport() {
      let temp = this;
      axios.post("http://localhost:8000/api/stocks-report", {user_id: temp.user.id}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + temp.accessToken
        }
      }).then(function (response) {
        if (response.status === 200) {
          temp.stocksReport = response.data.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getDataFromApi() {
      this.fetchAllTransactions(this.query);
    },
    confirm(transaction) {
      let temp = this;
      this.$root.confirm('Confirm Delete', 'Are you sure you want to delete ' + transaction.stock.name + '?', {color: 'red'}).then(() => {
        temp.deleteTransaction(transaction.id);
        temp.fetchAllTransactions({
          page: 1,
          perPage: 10,
          search: ''
        });
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
  created() {
    this.getDataFromApi();
    this.getStocksReport();
  }
}
</script>

<style scoped>

</style>
