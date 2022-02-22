import axios from "axios";

const state = () => ({
    transactions: [
        {
            id: null,
            stock_id: null,
            user_id: null,
            transaction_type: null,
            quantity: null,
            unit_price: null,
            transaction_date: null,

        }
    ],
    transactionsPaginatedData: {
        data: [
            {
                id: null,
                stock_id: null,
                user_id: null,
                transaction_type: null,
                quantity: null,
                unit_price: null,
                transaction_date: null,
            }
        ],
        pagination: {
            total: null,
            per_page: null,
            current_page: null,
            total_pages: null
        }
    },
    isLoading: false,
    isUpdating: null,
    updatedData: {
        id: null,
        stock_id: null,
        user_id: null,
        transaction_type: null,
        quantity: null,
        unit_price: null,
        transaction_date: null,
    },
    transaction: {
        id: null,
        stock_id: null,
        user_id: null,
        transaction_type: null,
        quantity: null,
        unit_price: null,
        transaction_date: null,
    },
    isCreating: false,
    createdData: {
        id: null,
        stock_id: null,
        user_id: null,
        transaction_type: null,
        quantity: null,
        unit_price: null,
        transaction_date: null,
    },
});

const mutations = {
    setTransactionIsLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setTransactions(state, transactions) {
        state.transactions = transactions;
    },
    setTransactionsPaginated(state, transactionsPaginatedData) {
        state.transactionsPaginatedData = transactionsPaginatedData;
    },
    setTransactionIsCreating(state, isCreating) {
        state.isCreating = isCreating;
    },
    saveNewTransactions(state, transaction) {
        state.transactions.unshift(transaction);
        state.createdData = transaction;
    },
    setTransactionIsUpdating(state, isUpdating) {
        state.isUpdating = isUpdating
    },
    saveUpdatedTransaction(state, transaction) {
        state.transactions.unshift(transaction)
        state.updatedData = transaction;
    },
    setTransactionDetail: (state, transaction) => {
        state.transaction = transaction
    },
    setDeleteTransaction: (state, id) => {
        state.transactionsPaginatedData.data.filter(x => x.id !== id);
    },

    setTransactionIsDeleting(state, isDeleting) {
        state.isDeleting = isDeleting
    },

};

const actions = {
    async fetchDetailTransaction(state, id) {
        state.commit('setTransactionIsLoading', true);
        await axios.get(`http://localhost:8000/api/transactions/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + state.rootGetters['accessToken']
            }
        })
            .then(res => {
                state.commit('setTransactionDetail', res.data.data);
                state.commit('setTransactionIsLoading', false);
            }).catch(err => {
                console.log('error', err);
                state.commit('setTransactionIsLoading', false);
            });
    },
    async updateTransaction(state, transaction) {
        state.commit('setTransactionIsUpdating', true);
        await axios.post(`http://localhost:8000/api/transactions/${transaction.id}?_method=PUT`, transaction, {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + state.rootGetters['accessToken']
            }
        }).then(res => {
            state.commit('saveUpdatedTransaction', res.data.data);
            state.commit('setTransactionIsUpdating', false);
        }).catch(err => {
            console.log('error', err);
            state.commit('setTransactionIsUpdating', false);
        });
    },
    async storeTransaction(state, transaction) {
        state.commit('setTransactionIsCreating', true);
        await axios.post(
            `http://localhost:8000/api/transactions`, transaction, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + state.rootGetters['accessToken']
                }
            }
        ).then(res => {
                state.commit('saveNewTransactions', res.data.data);
                state.commit('setTransactionIsCreating', false);
            }
        ).catch(err => {
            console.log('error', err);
            state.commit('setTransactionIsCreating', false);
        });
    },
    async fetchAllTransactions(state, query = null) {
        let page = '';
        let search = '';
        let perPage = '';
        let sortBy = '';
        let sortDesc = '';
        if (query != null) {
            page = query.page;
            search = query.search;
            perPage = query.perPage;
            sortBy = query.sortBy;
            sortDesc = query.sortDesc;
        }
        state.commit('setTransactionIsLoading', true);
        let url = `http://localhost:8000/api/transactions`;
        if (search === null || search.length <= 0) {
            url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`;
        } else {
            url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`;
        }

        await axios.get(url, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + state.rootGetters['accessToken']
            }
        })
            .then(res => {
                const transactions = res.data.data;
                state.commit('setTransactions', transactions);
                const pagination = {
                    total: res.data.data.total,  // total number of elements or transactions
                    per_page: res.data.data.per_page, // transactions per page
                    current_page: res.data.data.current_page, // current page (it will be automatically updated when transactionCategories clicks on some page number).
                    total_pages: res.data.data.last_page // total pages in record
                }
                res.data.data.pagination = pagination;
                state.commit('setTransactionsPaginated', res.data.data);
                state.commit('setTransactionIsLoading', false);
            })
            .catch(err => {
                console.log('error', err);
                state.commit('setTransactionIsLoading', false);
            })

    },
    async fetchAllFilterTransactions(state, query = null) {
        let page = query.page ? query.page : '';
        let search = query.search? query.search : '';
        let perPage = query.perPage? query.perPage : '';
        let sortBy = query.sortBy? query.page : '';
        let sortDesc = query.sortDesc? query.sortDesc : '';
        let transactionCategory = query.transactionCategory? query.transactionCategory : '';
        let transactionSubCategory = query.transactionSubCategory? query.transactionSubCategory : '';
        state.commit('setTransactionIsLoading', true);
        let url = `http://localhost:8000/api/filter-transactions`;
        if (search === null || search.length <= 0) {
            url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&transactionCategory=${transactionCategory}&transactionSubCategory=${transactionSubCategory}`;
        } else {
            url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}&transactionCategory=${transactionCategory}&transactionSubCategory=${transactionSubCategory}`;
        }

        await axios.get(url, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + state.rootGetters['accessToken']
            }
        })
            .then(res => {
                const transactions = res.data.data;
                state.commit('setTransactions', transactions);
                const pagination = {
                    total: res.data.data.total,  // total number of elements or transactions
                    per_page: res.data.data.per_page, // transactions per page
                    current_page: res.data.data.current_page, // current page (it will be automatically updated when transactionCategories clicks on some page number).
                    total_pages: res.data.data.last_page // total pages in record
                }
                res.data.data.pagination = pagination;
                state.commit('setTransactionsPaginated', res.data.data);
                state.commit('setTransactionIsLoading', false);
            })
            .catch(err => {
                console.log('error', err);
                state.commit('setTransactionIsLoading', false);
            })

    },

    async deleteTransaction(state,id) {
        state.commit('setTransactionIsDeleting', true);
        await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
            }
        })
            .then(res => {
                state.commit('setDeleteTransaction', res.data.data.id);
                state.commit('setTransactionIsDeleting', false);
            }).catch(err => {
                console.log('error', err);
                state.commit('setTransactionIsDeleting', false);
            });
    },

};

const getters = {
    transactionList: state => state.transactions,
    transactionsPaginatedData: state => state.transactionsPaginatedData,
    isLoading: state => state.isLoading,
    updatedData: state => state.updatedData,
    transaction: state => state.transaction,
    isUpdating: state => state.isUpdating,
};

export default {
    state,
    mutations,
    actions,
    getters,
};

