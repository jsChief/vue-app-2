const Template = {
  template: `<div class="h-full">
  
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
    
  }
}

export {Template};