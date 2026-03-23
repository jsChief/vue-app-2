const Businesses = {
  template: `
  <div class="h-full overflow-y-scroll no-scrollbar">
  
    <div v-if="isLoading" class="h-full flex flex-col items-center place-content-center">
          <img class="w-16" src="../../assets/infinite-spinner.svg">
    </div>
    <div v-else-if="loadError" class="h-full  flex flex-col gap-2 items-center place-content-center">
        <img class="w-16" src="../../assets/error-icon.svg">
      <button @click="fetchFilteredProducts" class="text-white bg-purple-800 px-3 py-2 rounded-3xl w-fit">
          retry
      </button>
    </div>
    <div v-else class="p-2">
      <div class="h-32">
      </div>
      
      <ul>
        <li v-for="(store, i) in stores" :key="store.id">
          <div :class="[theme.containerHigh, theme.border]" class="rounded-2xl p-5 mb-3 store-card backdrop-blur"
        >
          <!-- Top row -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <img :src="store.logo_url" class="store-avatar rounded-xl">
              <div>
                <h3 class="font-display font-semibold text-sm leading-tight">{{ store.name }}</h3>
                <p :class="theme.subtitle" class="text-xs mt-0.5">{{ store.category }}</p>
              </div>
            </div>
          </div>

          <!-- Details -->
          <p :class="theme.subtitle" class="text-xs leading-relaxed mb-4">{{ store.details }}</p>

          <!-- Meta row -->
          <div class="flex items-center justify-between">
            <!-- Stars -
            <div class="flex items-center gap-1">
              <div class="flex">
                <span v-for="n in 5" :key="n" :class="n <= Math.round(store.rating) ? 'star-fill' : 'star-empty'" style="font-size:11px">★</span>
              </div>
              <span class="text-xs ml-1 font-medium" style="color:var(--muted)">{{ store.rating }}</span>
            </div>-->

            <!-- Location -->
            <div :class="theme.subtitle" class="flex items-center gap-1">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-xs">{{ store.location }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="mt-4 pt-4" :class="theme.border">
            <div class="flex items-center justify-between">
              <span class="text-xs" :class="theme.subtitle">{{ store.tags }} products</span>
              <button
                class="text-xs font-semibold flex items-center gap-1 transition-colors" :class="theme.subtitle">
                View store
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>`,
  data(){
    return {
      isLoading: false,
      loadError: false
    }
  },
  computed: {
    stores(){
      return this.$store.state.stores
    },
    theme(){
      return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  created(){
    if(!this.$store.state.storesFetched){
    this.fetchStores();
    }
  },
  methods: {
    async fetchStores(){
      this.fetchError = false
      this.isLoading = true
      
      try {
        const { data, error } = await client.from('test_stores').select('*');
        
        if(error) throw error;
        
        this.$store.commit("SET_STORES", data);
        this.$store.commit("SET_STORES_FETCHED", true);
        console.log(data);
      }
      catch (e) {
        this.fetchError = true;
      }
      
      this.isLoading = false;
    }
  }
}

export {Businesses};