const ProductDetails = {
  template: `
    <div class="h-full flex items-center justify-center px-4 py-12">

  <div class="w-full max-w-sm">

    <!-- Image -->
    <div class="img-wrap rounded-3xl overflow-hidden aspect-square flex items-center justify-center mb-6 relative">
      <svg viewBox="0 0 300 300" class="w-48 h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 160 C60 90 100 50 150 50 C200 50 240 90 240 160" stroke="#AC41FF" stroke-width="14" stroke-linecap="round"/>
        <rect x="30" y="150" width="52" height="72" rx="22" fill="#1e0840"/>
        <rect x="30" y="150" width="52" height="72" rx="22" stroke="#AC41FF" stroke-width="2" opacity="0.5"/>
        <ellipse cx="56" cy="186" rx="8" ry="11" fill="#AC41FF" opacity="0.4"/>
        <circle cx="56" cy="186" r="4" fill="#AC41FF"/>
        <rect x="218" y="150" width="52" height="72" rx="22" fill="#1e0840"/>
        <rect x="218" y="150" width="52" height="72" rx="22" stroke="#AC41FF" stroke-width="2" opacity="0.5"/>
        <ellipse cx="244" cy="186" rx="8" ry="11" fill="#AC41FF" opacity="0.4"/>
        <circle cx="244" cy="186" r="4" fill="#AC41FF"/>
        <rect x="56" y="146" width="12" height="20" rx="4" fill="#AC41FF" opacity="0.6"/>
        <rect x="232" y="146" width="12" height="20" rx="4" fill="#AC41FF" opacity="0.6"/>
      </svg>

      <!-- Badge -->
      <span class="pill absolute top-4 left-4 px-3 py-1 rounded-full">New</span>
    </div>

    <!-- Category + Title -->
    <p class="text-xs text-white/35 font-medium tracking-widest uppercase mb-2" style="font-family:'Syne',sans-serif;">Headphones</p>
    <h1 class="text-3xl font-800 leading-tight mb-3" style="font-family:'Syne',sans-serif;font-weight:800;">
      Aura X Pro
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
      Studio-grade spatial audio with 60-hour battery life and active noise cancellation. Built for audiophiles who refuse to compromise on sound or endurance.
    </p>

    <div class="divider mb-6"></div>

    <!-- Price -->
    <div class="flex items-baseline gap-3 mb-6">
      <span class="text-3xl font-800 brand" style="font-family:'Syne',sans-serif;font-weight:800;">$349</span>
      <span class="text-base text-white/25 line-through">$429</span>
      <span class="text-xs font-700 brand" style="font-family:'Syne',sans-serif;font-weight:700;">19% OFF</span>
    </div>

    <!-- CTAs -->
    <div class="flex gap-3">
      <button class="btn-cart flex-1 py-4 rounded-2xl text-white text-sm">Add to Cart</button>
      <button class="btn-wish px-5 py-4 rounded-2xl text-lg">♡</button>
    </div>

  </div>

</div>
  `,
  props: ['productIndex'],
  data(){
    return {
      
    }
  },
  methods: {
    
  }
}

export {ProductDetails};