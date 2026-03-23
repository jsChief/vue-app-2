/*var pk = ["cello","mello","hello"];
var id = pk.indexOf("hello");
pk.splice(id,1);
console.log(pk.some((e,i)=>e=="mello"), pk);
*/
const Products = {
  template: `
  <div class="h-full w-full flex flex-col place-content-evenly items-center gap-2">
  
    <div :class="theme.border" class="border rounded-4xl p-2 w-90/100 mx-auto h-30 flex flex-col items-center place-content-between backdrop-blur">
      
      <div class="w-full flex items-center rounded-4xl" :class="theme.containerHighest">
        <button class="w-12 fa fa-search rounded-l-4xl"></button>
        <input type="text" @input="delayFetch" class="w-full rounded-r-4xl py-2" v-model="searchQuery" placeholder="Search..."/>
      </div>
      
      <div class="flex w-full items-center place-content-between p-1" :class="theme.subtitle">
        <button @click="toggleFilter('approved')" class="rounded-3xl border h-10 w-22 p-2 flex items-center gap-1" :class="[{'bg-green-500 text-white': searchTags.approved}, theme.border]">
          <span class="text-sm fa fa-check-circle"></span>
          <span class="text-xs">approved</span>
        </button>
        <button @click="toggleFilter('pending')" class="rounded-3xl text-sm border h-10 w-22 p-2 flex items-center gap-1" :class="[{'bg-orange-500 text-white': searchTags.pending}, theme.border]">
          <span class="text-sm fa fa-clock"></span>
          <span class="text-xs">pending</span>
        </button>
        <button @click="toggleFilter('rejected')" class="rounded-3xl text-sm border h-10 w-22 p-2 flex items-center gap-1" :class="[{'bg-red-500 text-white': searchTags.rejected}, theme.border]">
          <span class="text-sm fa fa-circle-xmark"></span>
          <span class="text-xs">rejected</span>
        </button>
      </div>
    </div>
    
    <!-- data output -->
    <div class="mx-auto backdrop-blur border rounded-[30px] w-90/100 h-70/100" :class="theme.border">
        <div v-if="isLoading" class="h-full  flex flex-col items-center place-content-center">
          <img class="w-16" src="../../assets/infinite-spinner.svg">
        </div>
        <div v-else-if="loadError" class="h-full  flex flex-col gap-2 items-center place-content-center">
        <img class="w-16" src="../../assets/error-icon.svg">
        <button @click="fetchFilteredProducts" class="text-white bg-purple-800 px-3 py-2 rounded-3xl w-fit">
          retry
        </button>
        </div>
        <div v-else class="p-2 h-full rounded-[30px] overflow-y-scroll">
        <ul>
          <li v-for="(product, index) in searchResults" class="py-2 mt-2 px-3 flex items-center gap-2 h-16 rounded-[30px]" :class="theme.containerHigh" @click="toDetails(index)">
           <img :src="product.image_urls[0]" class="size-12 rounded-full" :class="theme.containerHigh">
           
           <div class="w-70/100">
             <p class="font-bold line-clamp-1"> {{product.name}} </p>
             <div class="flex items-center gap-2 text-sm">
               <p :class="theme.subtitle"> {{'#'+product.price}}</p>
               <p v-if="product.status == 'pending'" class="text-xs text-white px-2 py-[2px] w-fit rounded-3xl bg-orange-500">
                 pending
               </p>
               <p v-if="product.status == 'rejected'" class="text-xs text-white px-2 py-[2px] w-fit rounded-3xl bg-red-500">
                 rejected
               </p>
             </div>
           </div>
          </li>
        </ul>
        </div>
    </div>
  </div>`,
  props: {

  },
  data() {
    return {
      /*approvedTag: true,
      pendingTag: false,
      rejectedTag: false,
      searchResults: [],*/
      isLoading: false,
      loadError: false,
      //selectedFilters: [],
      searchQuery: '',
      tm: 0
    }
  },
  created(){
    if(!this.$store.state.productsFetched){
    this.selectedFilters.push("approved");
    this.fetchFilteredProducts();
    }
  },
  computed: {
    selectedFilters(){
      return this.$store.state.productsFilters
    },
    searchTags(){
      return this.$store.state.productsFilterTags
    },
    searchResults(){
      return this.$store.state.products
    },
    /*
    darkTheme() {
      return this.$store.state.darkTheme
    },*/
    theme() {
      return this.$store.state.darkTheme ? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    toDetails(productIndex){
      //console.log(productIndex);
      this.$router.push('/productdetails/'+productIndex);
    },
    delayFetch(){
      clearTimeout(this.tm);
      
      this.tm = setTimeout(()=>{
        this.fetchFilteredProducts();
      }, 2500);
    },
    toggleFilter(filter){
      var hasFilter = this.selectedFilters.some((e)=>e==filter);
      var filterCommit = hasFilter ? "REMOVE_FILTER" : "ADD_FILTER";
      var status = hasFilter ? false : true;
      
      this.$store.commit(filterCommit, {
        type: 'productsFilters',
        data: filter
      })
      
      this.$store.commit("SET_TAG", {
        type: 'productsFilterTags',
        tag: filter,
        data: status
      });
      
      this.fetchFilteredProducts();
    },
    async fetchFilteredProducts() {
    this.loadError = false;
    this.isLoading = true;

  try {
    if (this.selectedFilters.length == 0 && this.searchQuery == '') {
      //this.searchResults = [];
      this.isLoading = false;
      return;
    }

    let query = client.from('test_products').select('*');

    if (this.selectedFilters.length != 0) {
      query = query.or(this.selectedFilters.map((s) => `status.eq.${s}`).join(','));
    }

    if (this.searchQuery != '') {
      let searchTerm = `%${this.searchQuery.toLowerCase()}%`;
      query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`);
    }

    const { data, error } = await query;

    if (error) throw error;

    //this.searchResults = data;
    this.$store.commit("SET_PRODUCTS", data);
    this.$store.commit("SET_DATA_FETCHED", {
      type: 'productsFetched',
      data: true
    });
    //console.log(data)
  } catch (e) {
    console.log('error occurred: ' + e);
    this.loadError = true;
    //this.searchResults = [];
  }

  this.isLoading = false;
}
    
  }
}

export { Products };