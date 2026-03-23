const ProductDetails = {
  template: `
 <div class="h-full w-full overflow-y-scroll no-scrollbar" :class="theme.surface">
 
   <div class="w-full p-2">
  
  <!-- Card shell -->
    <div class="relative backdrop-blur myborder w-full max-w-xl rounded-3xl overflow-hidden"
       style="background: rgba(255,255,255,0.03);">

    <!-- Progress bar -->
      <div class="absolute top-0 left-0 right-0 z-20" style="height:2px; background:rgba(255,255,255,0.06);">
        <div class="progress-bar" :style="{ width: progress + '%' }">
        </div>
      </div>

    <!-- Slide area -->
      <div class="relative overflow-hidden" style="height: 320px;">
        
        <!-- Prev -->
      <button v-if="slides.length > 1" class="arrow-btn border fa fa-angle-left text-2xl absolute z-20 top-[45%] left-5 z-20" :class="[theme.border, theme.container]" @click="prev">
        
      </button>
        
        <!-- Dots -->
        <div v-if="slides.length > 1" class="w-full flex items-center place-content-center absolute bottom-0 left-0 z-20">
          <div class="flex items-center py-2 px-4 rounded-t-2xl gap-2 backdrop-blur" :class="theme.containerHighest">
            <div v-for="(s, i) in slides" :key="i"
             class="dot"
             :class="[theme.inverseContainer, { active: i === current }]"
             @click="goTo(i)">
            </div>
          </div>
        </div>
        
        <!-- Next -->
      <button v-if="slides.length > 1" class="arrow-btn border fa fa-angle-right text-2xl absolute z-20 top-[45%] right-5" :class="[theme.border, theme.container]" @click="next">
      </button>
      
      
        <transition :name="direction === 'next' ? 'slide' : 'slide-prev'">
          <div :key="current"
             class="absolute inset-0 w-full h-full"
             @touchstart="onTouchStart"
             @touchend="onTouchEnd">

          <!-- Image -->
            <img :src="slides[current]"
               :alt="current"
               class="w-full h-full object-cover rounded-3xl" />
               
          </div>
        </transition>
      </div>


    <!-- Slide counter -->
    <div class="absolute top-4 right-4 z-20 text-xs text-white/50 rounded-2xl px-2 py-1 bg-black/30"
         style="font-variant-numeric: tabular-nums;">
      <span class="text-white/80">{{ String(current + 1).padStart(2,'0') }}</span>
      &nbsp;/&nbsp;
      {{ String(slides.length).padStart(2,'0') }}
    </div>
  </div>
  
  <!-- Thumbnail strip -
  <div class="flex gap-2 mt-4 ml-4">
    <div v-for="(s, i) in slides" :key="i"
         class="rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
         :style="{
           width: '52px', height: '40px',
           opacity: i === current ? '1' : '0.4',
           border: i === current ? '2px solid #AC41FF' : '2px solid transparent',
           boxShadow: i === current ? '0 0 10px rgba(172,65,255,0.5)' : 'none'
         }"
         @click="goTo(i)">
      <img :src="s" :alt="i" class="w-full h-full object-cover"/>
    </div>
  </div> -->
  
  
  
  <!-- details area -->
  <div class="mt-3 w-full p-2">
    <!-- Category + Title -->
    <p class="text-xs font-medium tracking-widest uppercase mt-4 mb-2" :class="theme.subtitle" style="font-family:'Syne',sans-serif;">{{product.category}}</p>
    <h1 class="text-2xl font-800 leading-tight mb-3" style="font-family:'Syne',sans-serif;font-weight:800;">
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
      <span class="text-sm" :class="theme.subtitle">4.8 · 2,341 reviews</span>
    </div>
    
    <!-- Description -->
    <p v-html="parsedText" class="text-sm leading-relaxed mb-6" style="white-space: pre-wrap;" :class="theme.subtitle">
      
    </p>

    <div class="divider mb-6"></div>

    <!-- Price -->
    <div class="h-30 flex items-baseline gap-3 ">
      <span class="text-xl font-800 brand" style="font-family:'Syne',sans-serif;font-weight:800;">{{'#'+product.price}}</span>
      <span :class="theme.subtitle" class="text-base line-through">#429</span>
      <span class="text-xs font-700 brand" style="font-family:'Syne',sans-serif;font-weight:700;">19% OFF</span>
    </div>
    

    <!-- CTAs -->
    <div class="flex gap-3">
      <button class="btn-primary flex-1 py-4 rounded-2xl text-white text-sm">Contact seller</button>
    </div>
  
</div>
    
    
  

  </div>

</div>
  `,
  props: ['productIndex'],
  data(){
    return {
      current: 0,
      direction: 'next',
      autoplayTimer: null,
      progress: 0,
      progressTimer: null,
      touchStartX: 0,
      autoplayInterval: 5000,
      autoplay: false
    }
  },
  computed: {
    parsedText() {
    return this.parseTypeset(this.$store.state.products[this.$props.productIndex].description);
  },
    theme() {
      return this.$store.state.darkTheme ? this.$store.state.theme.dark : this.$store.state.theme.light
    },
    product(){
      return this.$store.state.products[this.$props.productIndex];
    },
    slides(){
      return this.$store.state.products[this.$props.productIndex].image_urls
    }
  },
  mounted() {
    
    this.startAutoplay();
    
  },
  beforeDestroy() {
    this.clearAutoplay();
  },
  methods: {
    parseTypeset(text) {
  // 1. Temporarily replace escaped \# with a placeholder
  const HASH_PLACEHOLDER = '\x00HASH\x00';
  
  return text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank">$1</a>')
    .replace(/\\#/g, HASH_PLACEHOLDER)              // escape \# first
    .replace(/\*(.+?)\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/~(.+?)~/g, '<s>$1</s>')
    .replace(/#(.+?)#/g, '<u>$1</u>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(new RegExp(HASH_PLACEHOLDER, 'g'), '#'); // 2. Restore it at the end
},
    next() {
      this.direction = 'next';
      this.current = (this.current + 1) % this.slides.length;
      this.resetAutoplay();
    },
    prev() {
      this.direction = 'prev';
      this.current = (this.current - 1 + this.slides.length) % this.slides.length;
      this.resetAutoplay();
    },
    goTo(i) {
      this.direction = i > this.current ? 'next' : 'prev';
      this.current = i;
      this.resetAutoplay();
    },
    startAutoplay() {
      if(this.slides.length > 1 && this.autoplay){
      this.progress = 0;
      const step = 100 / (this.autoplayInterval / 50);
      this.progressTimer = setInterval(() => {
        this.progress += step;
        if (this.progress >= 100) {
          this.progress = 0;
          this.direction = 'next';
          this.current = (this.current + 1) % this.slides.length;
        }
      }, 50);
      }
    },
    clearAutoplay() {
      clearInterval(this.progressTimer);
    },
    resetAutoplay() {
      this.clearAutoplay();
      this.progress = 0;
      this.startAutoplay();
    },
    onTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    onTouchEnd(e) {
      const diff = this.touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? this.next() : this.prev();
      }
    }
  }
}

export {ProductDetails};