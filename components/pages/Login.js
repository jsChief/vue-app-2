//import v from '../../js/supabase.esm.js';
//console.log(createClient);

const Login = {
  template: `<div class="h-full grid items-center place-content-center p-1">
  
    <div :class="theme.container" class="w-72 h-64 rounded-2xl myborder p-2 flex flex-col place-content-between">
      
      
      
      <div v-if="authing && !authConfirmed" class="h-full  flex flex-col items-center place-content-center">
        <img class="w-16" src="../../assets/infinite-spinner.svg">
      </div>
      
      <div v-if="authConfirmed" class="h-full  flex flex-col items-center place-content-center  fadeUp delay-5">
        <img class="w-16" src="../../assets/animated_checkmark.svg">
      </div>
      
      <div v-show="!authing && !authConfirmed" class="h-full flex flex-col place-content-center fadeUp delay-5">
        <input type="email" v-model="mail" :class="[theme.containerHigh, theme.placeholderText]" class="w-full rounded-2xl p-2 ring-purple-800 focus:ring" placeholder="Email">
        <input type="password" v-model="pass" :class="[theme.containerHigh, theme.placeholderText]" class="w-full rounded-2xl mt-2 p-2 ring-purple-800 focus:ring" placeholder="Password">
         <button @click="login" class="w-full mt-6 p-2 rounded-2xl text-white bg-purple-700">Login</button>
    
      </div>
    
    
    </div>
    
   
  </div>`,
  props: {
    
  },
  data(){
    return {
      authing: true,
      authConfirmed: false,
      pass: '',
      mail: ''
    }
  },
  computed: {
    theme(){
      return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  async mounted(){
    var authStatus = await checkAuth();
    
    if(authStatus == null){
      setTimeout(()=>{
        this.authing = false;
        this.authConfirmed = false;
      }, 2000);
    } else {
      setTimeout(()=>{
        this.authConfirmed = true;
      }, 2000);
      setTimeout(()=>{
        this.goToHr();
      }, 4500)
    }
  },
  methods: {
    async login(){
      if(this.authing) return;
      else {
        this.authing = true;
        var signInStatus = await signIn(this.mail, this.pass);
        
        if(signInStatus.data.session == null){
          setTimeout(()=>{
            this.authing = false;
          }, 1000);
        } else {
          setTimeout(()=>{
            this.authing = false;
            this.authConfirmed = true;
        }, 2000);
          setTimeout(()=>{
            this.goToHr();
        }, 4500)
        }
      }
    },
    goToHr(){
      this.$router.replace('/home');
    }
  }
}

export {Login};