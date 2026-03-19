const store = new Vuex.Store({
      state: {
        theme: {
          light: {
            text: 'text-black',
            subtitle: 'text-gray-600',
            border: ' border-slate-800/10',
            themeBorder: ' myborder',
            containerHighest: ' bg-white/50',
            containerHigh: ' bg-neutral-100/50',
            container: ' bg-neutral-200/50 shadow-sm'
          },
          dark: {
            text: 'text-white',
            subtitle: 'text-gray-400',
            border: ' border-slate-200/10',
            themeBorder: ' myborder',
            containerHighest: ' bg-neutral-500/30',
            containerHigh: ' bg-neutral-600/30',
            container: ' bg-neutral-800/50'
          }
        },
        tags: {
          approved: true,
          pending: false,
          rejected: false
        },
        productsFetched: false,
        darkTheme: false,
        staff: [],
        products: [],
        productFilters: [],
        productsLoading: false,
        productsLoadError: null,
        loading: false,
        error: null
      },
      getters: {
        allStaff: state => state.staff,
        staffById: state => id => state.staff.find(u => u.id === id)
      },
      mutations: {
        SET_STAFF(state, staff) {
          state.staff = staff
        },
        SET_LOADING(state, status) {
          state.loading = status
        },
        SET_ERROR(state, error) {
          state.error = error
        },
        SET_PRODUCTS(state, products) {
          state.products = products
        },
        SET_PRODUCTS_FETCHED(state, value) {
          state.productsFetched = value
        },
        SET_APPROVED_TAG(state, value) {
          state.tags.approved = value
        },
        SET_PENDING_TAG(state, value) {
          state.tags.pending = value
        },
        SET_REJECTED_TAG(state, value) {
          state.tags.rejected = value
        },
        ADD_FILTER(state, filter){
          state.productFilters.push(filter);
        },
        REMOVE_FILTER(state, filter){
          let index = state.productFilters.indexOf(filter);
          state.productFilters.splice(index,1);
        },
        /*
        SET_PRODUCTS_LOADING(state, status) {
          state.productLoading = status
        },
        SET_PRODUCTS_LOAD_ERROR(state, error) {
          state.productsLoadError = error
        },*/
        SET_DARKTHEME(state, value){
          state.darkTheme = value
        }
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