const FilterButton = {
  template: `
    <button @click="doOnClick" class="rounded-3xl border h-10 w-22 p-2 flex items-center place-content-center gap-1" :class="[classActive, theme.border]">
      <span class="text-sm fa" :class="icon"></span>
      <span class="text-xs text-center"><slot></slot></span>
    </button>
  `,
  props: {
    icon: String,
    activeBg: String,
    text: String,
    active: Boolean
  },
  data() {
    return {
      
    }
  },
  computed: {
    classActive(){
      return this.$props.active? this.$props.activeBg+" text-white" : "";
    },
    theme() {
      return this.$store.state.darkTheme ? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    doOnClick() {
      this.$emit('buttonClick', '');
    }
  }
}

export { FilterButton };