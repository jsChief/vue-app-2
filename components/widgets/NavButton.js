const NavButton = {
  template: `
    <div @click="doOnClick" class="p-2 w-16 h-22 flex flex-col rounded-xl active:bg-slate-200/30 duration-400 place-content-around items-center">
       <button class="size-12 rounded-full fa" :class="[displayIcon, theme.containerHigh]">
       </button>
       <p class="text-xs mt-1"> {{displayText}} </p>
     </div>
  `,
  props: {
    displayIcon: String,
    displayText: String
  },
  data(){
    return {
      
    }
  },
  computed: {
    theme(){
      return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    doOnClick(){
      this.$emit('buttonClick', '');
    }
  }
}

export {NavButton};