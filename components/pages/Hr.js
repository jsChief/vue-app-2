import {NavButton} from '../widgets/NavButton.js';

const Home = {
  template: `
  
  <div v-if="loading" class="h-full  flex flex-col items-center place-content-center">
        <img class="w-16" src="../../assets/infinite-spinner.svg">
      </div>
     
  <div v-else-if="error" class="h-full  flex flex-col items-center place-content-center">
        <img class="w-16" src="../../assets/error-icon.svg">
      </div>
      
  <div v-else class="h-full rounded-2xl overflow-y-scroll p-2">
  
      <div>
      <div class="h-90">
      
      </div>
        <div v-for="(staff,index) in allStaff" class="rounded-[40px]" :class="theme.containerHigh">
          <div @click="toDetailsPage(index)" class="p-2 mt-2 h-20 flex items-center">
             <img class="ml-1 size-16 bg-slate-900 rounded-full" :src="staff.image_url">
            <div class="pl-4">
            <p class="text-xl font-bold">{{ staff.first_name +' '+staff.last_name }} </p>
            <p class="text-sm" :class="theme.subtitle">{{ staff.bio }} </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="h-64">
      
      </div>
      
      <div class="p-2 absolute bottom-0 left-0 w-full h-fit duration-400 rounded-t-[30px] flex flex-col items-center place-content-end">
        <!-- Nav Menu -->
        <div v-if="showNav" class="backdrop-blur rounded-[30px] h-50 p-2 w-97/100 mx-auto grid grid-rows-2 grid-cols-3 gap-2 justify-items-center items-center border" :class="[theme.container, theme.border]">
          <nav-button 
            displayIcon="fa-shop" 
            displayText="businesses" 
            @buttonClick="navToPage('businesses')"
          ></nav-button>
          <nav-button 
            displayIcon="fa-cart-shopping" 
            displayText="products" 
            @buttonClick="navToPage('products')"
          ></nav-button>
          <nav-button 
            displayIcon="fa-user" 
            displayText="users" 
            @buttonClick="navToPage('users')"
          ></nav-button>
          <nav-button 
            displayIcon="fa-sliders" 
            displayText="settings" 
            @buttonClick="navToPage('settings')"
          ></nav-button>
        </div>
        
        <!-- buttons -->
        <div class="rounded-[30px] mt-3 h-16 p-2 w-65/100 mx-auto flex place-content-between border backdrop-blur" :class="[theme.container, theme.border]">
          <button @click="showNav=!showNav" class="size-12 rounded-full flex text-2xl fa fa-grip" :class="theme.containerHigh">
          </button>
          <div class="h-12 w-[1px] bg-slate-200/30"></div>
          <button @click="logout" class="text-white text-xl p-2 size-12 rounded-full rounded-3xl bg-gradient-to-b from-purple-600 to-purple-800 fa fa-right-from-bracket">
          </button>
        </div>
      </div>
    </div>`,
  data(){
    return {
      navData: {
        nav1: {
          icon: 'fa-fire',
          text: 'flamin!'
        }
      },
      showNav: false
    }
  },
  components: {
    NavButton
  },
  computed: {
        allStaff()   { return this.$store.getters.allStaff },
        loading() { return this.$store.state.loading },
        error()   { return this.$store.state.error },
        theme(){
          return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
        }
      },
  created() {
        // Only fetch if not already loaded
        if (this.$store.state.staff.length === 0) {
          this.$store.dispatch('fetchStaff')
        }
      },
  methods: {
    logStuff(){
      //console.log(this.allStaff[3])
    },
    toDetailsPage(id){
      //this.$emit("to:info","");
      this.$router.push('/staffdetails/'+id);
    },
    navToPage(page){
      this.showNav = false;
      this.$router.push('/'+page);
      /*
      switch (page) {
        case 'businesses':
          this.$router.push('/businesses');
          break;
        case 'products':
          this.$router.push('/products');
          break;
        case 'users':
          this.$router.push('/users');
          break;
        case 'settings':
          this.$router.push('/settings');
          break;
        default:
          // Tab to edit
      }*/
    },
    logout(){
      signOut();
      this.$router.replace('/');
    },
    openNavModal(){
      
    }
  }
}

export {Home};

/*
const Func = {
  template: `<div v-show="visible" :class="theme.pBg" class="h-full flex flex-col place-content-between">
  
  <div class="absolute top-0 p-2">
    <button @click="back" class="ml-2 fa fa-chevron-left text-3xl text-black"></button>
  </div>
  
    <div :class="theme.tBg" class="h-60 flex flex-col place-content-center items-center mb-2 rounded-b-xl">
      <p class="font-bold text-3xl p-2 text-black"> Func </p>
    </div>
    
    <div class="bg-white rounded-t-xl h-full">
      
    </div>
  </div>`,
  props: {
    visible: Boolean,
    theme: Object
  },
  data(){
    return {
      
    }
  },
  methods: {
    back(){
      this.$emit("go:back","");
    }
  }
}

export {Func};
*/