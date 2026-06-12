const store = new Vuex.Store({
      state: {
        theme: {
          light: {
            text: 'text-black',
            subtitle: 'text-gray-600',
            border: ' border-slate-800/10',
            themeBorder: ' myborder',
            containerHighest: ' bg-white/70',
            containerHigh: ' bg-neutral-100/50',
            container: ' bg-neutral-200/50',
            containerLowest: ' bg-neutral-200/80',
            inverseContainer: ' bg-gray-800/50',
            surface: ' bg-neutral-100/90',
            placeholderText: ' placeholder-gray-600'
          },
          dark: {
            text: 'text-white',
            subtitle: 'text-gray-400',
            border: ' border-slate-200/10',
            themeBorder: ' myborder',
            containerHighest: ' bg-gray-500/50',
            containerHigh: ' bg-gray-600/30',
            container: ' bg-gray-800/50',
            containerLowest: ' bg-gray-800/80',
            inverseContainer: ' bg-neutral-200/50',
            surface: ' bg-gray-800/80',
            placeholderText: ' placeholder-gray-400'
          }
        },
        productsFilterTags: {
          approved: true,
          pending: false,
          rejected: false
        },
        usersFilterTags: {
          approved: true,
          suspended: false,
          banned: false
        },
        productsCategoryFetched: {
          approved: false,
          pending: false,
          rejected: false
        },
        //productsFetched: false,
        storesFetched: false,
        usersFetched: false,
        staff: [],
        approvedProducts: [],
        pendingProducts: [],
        rejectedProducts: [],
        activeProductsTab: {
          index: 0,
          left: 0,
          width: 0
        },
        stores: [],
        users: [],
        productsFilters: [],
        usersFilters: [],
        productsLoading: false,
        productsLoadError: null,
        loading: false,
        error: null,
        darkTheme: true,
      },
      getters: {
        allStaff: state => state.staff,
        staffById: state => id => state.staff.find(u => u.id === id)
      },
      mutations: {
        SET_LOADING(state, status) {
          state.loading = status
        },
        SET_ERROR(state, error) {
          state.error = error
        },
        SET_PRODUCTS(state, value) {
          let typeString = value.type+"Products";
          state[typeString] = [...value.data]
        },
        SET_PRODUCTS_TAB(state, tabData){
          state.activeProductsTab[tabData.type] = tabData.data;
        },
        SET_PRODUCTS_FETCHED(state, value) {
          state.productsCategoryFetched[value.type] = value.data
        },
        SET_STAFF(state, staff) {
          state.staff = staff
        },
        SET_USERS(state, users) {
          state.users = users
        },
        SET_DATA_FETCHED(state, value) {
          state[value.type] = value.data
        },
        SET_TAG(state, value){
          state[value.type][value.tag] = value.data;
        },  
        ADD_FILTER(state, value){
          state[value.type].push(value.data);
        },
        REMOVE_FILTER(state, value){
          let index = state[value.type].indexOf(value.data);
          state[value.type].splice(index,1);
        },
        SET_DARKTHEME(state, value){
          state.darkTheme = value
        },
        SET_STORES(state, stores) {
          state.stores = stores
        },
        SET_STORES_FETCHED(state, value) {
          state.storesFetched = value
        },
      },
      actions: {
        
        async fetchStaff({ commit }) {
          commit('SET_LOADING', true)
          commit('SET_ERROR', null)
          try {
            const { data, error } = await client.from('staff_profiles').select('*');
            if (error) {
              commit('SET_LOADING', false);
              commit('SET_ERROR', 'Failed to fetch staff');
              return;
            }
            
            commit('SET_STAFF', data)
            //console.log(data);
          } catch (err) {
            commit('SET_LOADING', false);
            commit('SET_ERROR', 'Failed to fetch staff')
          } finally {
            setTimeout(()=>{
              commit('SET_LOADING', false);
            }, 1500)
          }
        }
      }
    })