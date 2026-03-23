const Stores = {
  template: `<div :class="theme.surface" class="h-full overflow-y-scroll">
    Stor3s
  </div>`,
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
    back(){
      this.$emit("go:back","");
    }
  }
}

export {Stores};