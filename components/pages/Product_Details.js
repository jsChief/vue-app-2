const ProductDetails = {
  template: `
    <div class="h-full w-full flex flex-col items-center px-4 pt-4 pb-12 overflow-y-scroll">

  <div class="w-full max-w-sm backdrop-blur">

    <!-- Image -->
    <div class="img-wra rounded-3xl overflow-hidden aspect-square flex items-center justify-center mb-6 relative">
      <img :src="product.image_urls[0]" class="rounded-3xl">

      <!-- Badge -->
      <span class="pill absolute top-4 left-4 px-3 py-1 rounded-full">New</span>
    </div>

    <!-- Category + Title -->
    <p class="text-xs text-white/35 font-medium tracking-widest uppercase mb-2" style="font-family:'Syne',sans-serif;">{{product.category}}</p>
    <h1 class="text-3xl font-800 leading-tight mb-3" style="font-family:'Syne',sans-serif;font-weight:800;">
      {{product.name}}
    </h1>

    <!-- Rating -->
    <div class="flex items-center gap-2 mb-4">
      <div class="flex gap-0.5 text-base">
        <span class="star-on">★</span>
        <span class="star-on">★</span>
        <span class="star-on">★</span>
        <span class="star-on">★</span>
        <span class="star-off">★</span>
      </div>
      <span class="text-sm text-white/40">4.8 · 2,341 reviews</span>
    </div>

    <!-- Description -->
    <p class="text-sm text-white/50 leading-relaxed mb-6">
      {{product.description}}
    </p>

    <div class="divider mb-6"></div>

    <!-- Price -->
    <div class="h-30 flex items-baseline gap-3 ">
      <span class="text-3xl font-800 brand" style="font-family:'Syne',sans-serif;font-weight:800;">{{'#'+product.price}}</span>
      <span class="text-base text-white/25 line-through">#429</span>
      <span class="text-xs font-700 brand" style="font-family:'Syne',sans-serif;font-weight:700;">19% OFF</span>
    </div>
    

    <!-- CTAs -->
    <div class="flex gap-3">
      <button class="btn-primary flex-1 py-4 rounded-2xl text-white text-sm">Contact seller</button>
    </div>
    

  </div>

</div>
  `,
  props: ['productIndex'],
  data(){
    return {
      
    }
  },
  computed: {
    product(){
      return this.$store.state.products[this.$props.productIndex];
    }
  },
  methods: {
    
  }
}

export {ProductDetails};