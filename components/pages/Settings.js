const Settings = {
  template: `
  <div class="h-full w-full flex flex-col place-content-evenly items-center">
    <div :class="theme.border" class="border rounded-4xl p-2 text-3xl text-center w-90/100 mx-auto font-bold backdrop-blur">
        Settings
    </div>
    <div class="p-2 mx-auto border rounded-[30px] w-90/100 h-80/100 backdrop-blur" :class="theme.border">
        <ul>
          <li class="py-2 px-4 flex items-center place-content-between h-16 rounded-[30px]" :class="theme.containerHigh">
           <p class="font-bold"> Theme </p>
           
           <div class="flex">
              <button @click="setDarkMode(false)" class="h-8 w-18 rounded-l-2xl border flex items-center place-content-center gap-2" :class="[{'bg-purple-800 text-white': !darkTheme}, theme.border]">
                <span class="fa fa-sun"></span>
                <span class="text-xs">Light</span>
              </button>
              <button @click="setDarkMode(true)" class="h-8 w-18 rounded-r-2xl border border-slate-200/10 flex items-center place-content-center gap-2" :class="[{'bg-purple-800': darkTheme}, theme.border]">
                <span class="text-xs">Dark</span>
                <span class="fa fa-moon"></span>
              </button>
           </div>
          </li>
        </ul>
    </div>
  </div>`,
  props: {
    
  },
  data(){
    return {
      
    }
  },
  computed: {
    darkTheme(){
      return this.$store.state.darkTheme
    },
    theme(){
      return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    setDarkMode(value){
      this.$store.commit('SET_DARKTHEME', value)
    }
  }
}

export {Settings};