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
            inverseContainer: ' bg-neutral-800/50',
            surface: ' bg-neutral-100/90',
          },
          dark: {
            text: 'text-white',
            subtitle: 'text-gray-400',
            border: ' border-slate-200/10',
            themeBorder: ' myborder',
            containerHighest: ' bg-neutral-500/50',
            containerHigh: ' bg-neutral-600/30',
            container: ' bg-neutral-800/50',
            inverseContainer: ' bg-neutral-200/50',
            surface: ' bg-neutral-800/80'
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
        productsFetched: false,
        storesFetched: false,
        usersFetched: false,
        staff: [],
        products: [],
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
        SET_PRODUCTS(state, products) {
          state.products = products
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