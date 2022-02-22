<template>
  <v-container>
    <v-card>
      <v-card-title>Add Transaction</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-autocomplete :items="stocks" item-text="name" item-value="id" v-model="stock_id" label="Stock Name"
                            placeholder="Select stock name..."></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="quantity" label="No of Stocks.."
                          placeholder="Enter no. of stocks you want to trade"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-autocomplete :items="transactionTypeItems" v-model="transaction_type" label="Transaction Type"
                            placeholder="Select transaction type..."></v-autocomplete>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="unit_price" label="Price per stock"
                          placeholder="Enter unit price per stock"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                max-width="290px"
            >
              <template v-slot:activator="{on}">
                <v-text-field
                    label="Transaction date"
                    prepend-inner-icon="mdi-calendar"
                    placeholder="Select transaction date"
                    readonly
                    hide-details
                    :value="transaction_date"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  locale="en-in"
                  v-model="transaction_date"
                  no-title
                  @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>


        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" color="success">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TransactionPage",
  data() {
    return {
      dateMenu: false,
      transaction_date: null,
      stock_id: null,
      transaction_type: null,
      quantity: null,
      unit_price: null,
      stocks: [],
      transactionTypeItems: [
        {text: "Buy", value: "buy"},
        {text: "Sell", value: "sell"},
      ]
    };
  },
  methods: {
    ...mapActions(["storeTransaction"]),
    submit() {
      let temp = this;
      console.log(temp.user.id);

      this.storeTransaction({
        id: temp.id,
        stock_id: temp.stock_id,
        user_id: temp.user.id,
        transaction_type: temp.transaction_type,
        quantity: temp.quantity,
        unit_price: temp.unit_price,
        transaction_date: temp.transaction_date,
      }).then(function(){
          temp.$router.push('/');
      });
    }
  },
  mounted() {
    var temp = this;
    axios.get('http://localhost:8000/api/stocks')
        .then(function (response) {
          if (response.status === 200) {
            temp.stocks = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  computed: {
    ...mapGetters(["user"])
  }
}
</script>

<style scoped>

</style>