const ProductPage = {
  template: `
  
 <div class="h-full w-full flex flex-col place-content-evenly items-center gap-2">
 
 
  <!-- Search and filter(tabs) -->
    <div :class="[theme.border, theme.container]" class="border rounded-4xl p-2 w-95/100 mx-auto h-30 flex flex-col items-center place-content-between backdrop-blur">
      
      <div class="w-full flex items-center rounded-4xl" :class="theme.containerHighest">
        <button class="w-12 fa fa-search rounded-l-4xl"></button>
        <input type="text" @input="" class="w-full rounded-r-4xl py-3 placeholder-gray-400" v-model="searchQuery" placeholder="Search..."/>
      </div>
      
      <!-- Tab bar -->
    <div
    class="relative border flex w-full rounded-3xl p-1"
    :class="theme.border"
    ref="bar"
  >
    <!-- Pill -->
    <div
      class="tab-slider"
      :class="[{ snapping: isSnapping }, 'bg-'+tabs[activeTab].color+'-600']"
      :style="{ left: sliderLeft + 'px', width: sliderWidth + 'px'}"
    ></div>

    <!-- Tab buttons -->
    <button
      v-for="(tab, i) in tabs"
      :key="tab.id"
      :ref="'tab_' + i"
      class="tab-btn flex-1 py-2 px-3 text-sm rounded-lg text-center"
      :style="{ color: activeTab === i ? '#fff' : '#666' }"
      @click="switchTab(i)"
    >
      {{ tab.label }}
    </button>
    <div
      class="drag-handle"
      :style="{ left: sliderLeft + 'px', width: sliderWidth + 'px' }"
      @mousedown="onDragStart"
      @touchstart.prevent="onDragStart"
    ></div>
  </div>
      
      
      <!-- Tab Bar --
      
  <div class="w-full relative border flex rounded-3xl p-1" :class="theme.border">

    <!-- Sliding pill --
    <div
      class="tab-slider"
      :class="activePillColor"
      :style="{
        left: sliderLeft + 'px',
        width: sliderWidth + 'px'
      }"
    ></div>

    <!-- Tab buttons --
    <button
      v-for="(tab, i) in tabs"
      :key="tab.id"
      :ref="'tab_' + i"
      class="tab-btn flex-1 py-2 px-3 text-sm rounded-lg text-center select-none"
      :style="{ color: activeTab === i ? '#fff' : '#888' }"
      @click="switchTab(i)"
    >
      <span class="text-sm fa" :class="tab.icon"></span>
      {{ tab.label }}
    </button>
  </div> -->
  
    </div>
    
    <!-- data output -->
    <div class="mx-auto backdrop-blur border rounded-[30px] w-95/100 h-70/100" :class="[theme.border, theme.container]">
      <!-- load state -->
        <div v-if="isLoading" class="h-full  flex flex-col items-center place-content-center">
          <img class="w-16" src="../../assets/infinite-spinner.svg">
        </div>
        <div v-else-if="loadError" class="h-full  flex flex-col gap-2 items-center place-content-center">
        <img class="w-16" src="../../assets/error-icon.svg">
        <button @click="fetchProducts" class="text-white bg-purple-800 px-3 py-2 rounded-3xl w-fit">
          retry
        </button>
        </div>
        
        
        <!-- Swipeable Panel -->
  <div v-else
    class="swipe-viewport rounded-[30px] h-full"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div
      class="swipe-track h-full"
      :style="{ transform: swipeTransform }"
    >
      <!-- Panel per tab -->
      <div v-for="(tab, ti) in tabs" :key="tab.id" class="swipe-panel overflow-y-scroll h-full px-0.5 pb-1">
      
        <div class="grid grid-cols-2 gap-3 py-4 px-2">
          <div
            v-for="(product, index) in products[currentTab]"
            :key="product.id"
            class="product-card"
            :style="{ '--accent': tab.color }" :class="[theme.container, theme.border]"
            @click="toDetails(index)"
          >
            <!-- Image placeholder -->
            <div
              class="w-full aspect-square flex items-center justify-center relative overflow-hidden"
              :style="{ background: tab.cardBg }"
            >
              <img class="" :src="product.image_urls[0]">
              <span
                v-if="product.badge"
                class="badge absolute top-2 right-2"
                :style="{ background: tab.color + '22', color: tab.color }"
              >{{ product.badge }}</span>
            </div>
            <!-- Info -->
            <div class="p-3">
              <p class="text-xs mb-1" style="font-family:'DM Sans',sans-serif;" :class="theme.subtitle">{{ product.category }}</p>
              <p class="font-heading font-semibold text-sm leading-snug" >{{ product.name }}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="font-heading font-bold text-base" :class="'text-'+tab.color+'-600'">{{ product.price }}</span>
                <button
                  class="w-7 h-7 rounded-lg flex items-center justify-center text-white text-base transition-opacity hover:opacity-80" :class="activePillColor"
                >+</button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="products[currentTab].length > 2" class="h-40"></div>

        <!-- Empty state -->
        <div v-if="products[currentTab].length === 0" class="h-full grid place-content-center items-center text-center py-16 text-sm" style="color:#555;">
          No products in this category yet.
        </div>
        
      </div>
    </div>
  </div>
  
    </div>
  </div>
  `,
  data(){
    return {
      //activeTab: 0,
      //fix activeTab
      isSnapping: false,

      // Drag state
      dragging: false,
      dragStartX: 0,
      dragStartLeft: 0,
      isLoading: false,
      loadError: false,
      searchQuery: '',
      tm: 0,
      category: ['approved', 'pending', 'rejected'],
      sliderLeft: 0,
      sliderWidth: 0,

      // Touch
      touchStartX: 0,
      touchStartY: 0,
      dragOffset: 0,
      isDragging: false,
      isHorizontal: null,
      tabs: [
        {
          id: 'approved',
          label: 'approved',
          icon: "fa-check-circle",
          color: 'green',
          cardBg: '#1e1428',
        },
        {
          id: 'pending',
          label: 'pending',
          icon: "fa-clock",
          color: 'orange',
          cardBg: '#131d26',
        },
        {
          id: 'rejected',
          label: 'rejected',
          icon: "fa-circle-xmark",
          color: 'red',
          cardBg: '#211c11',
        }
      ]
    }
  },
  mounted() {
    /*this.$nextTick(() => this.setSliderToTab(0))
    window.addEventListener('resize', () => this.setSliderToTab(this.activeTab))*/
    const observer = new ResizeObserver(() => {
    this.setSliderToTab(this.activeTab)
    })
    observer.observe(this.$refs.bar)
    this._barObserver = observer
    window.addEventListener('mousemove', this.onDragMove)
    window.addEventListener('mouseup',   this.onDragEnd)
    window.addEventListener('touchmove', this.onDragMove, { passive: false })
    window.addEventListener('touchend',  this.onDragEnd)
    if(!this.$store.state.productsCategoryFetched.approved){
    this.fetchProducts();
  }
  
  },
  beforeDestroy() {
    this._barObserver?.disconnect()
    window.removeEventListener('mousemove', this.onDragMove)
    window.removeEventListener('mouseup',   this.onDragEnd)
    window.removeEventListener('touchmove', this.onDragMove)
    window.removeEventListener('touchend',  this.onDragEnd)
  },
  computed: {
    tabData(){
      return this.$store.state.activeProductsTab
    },
    activeTab(){
      return this.$store.state.activeProductsTab.index;
    },
    currentTab(){
      return this.category[this.activeTab];
    },
    products(){
      return {
        approved: this.$store.state.approvedProducts,
        pending: this.$store.state.pendingProducts,
        rejected: this.$store.state.rejectedProducts
      }
    },
    categoryFetched(){
      return this.$store.state.productsCategoryFetched
    },
    swipeTransform(){
      return `translateX(calc(-${this.activeTab * 100}% + ${this.dragOffset}px))`;
    },
    activePillColor() {
      return ` bg-${this.tabs[this.activeTab].color}-600`;
    },
    theme() {
      return this.$store.state.darkTheme ? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    toDetails(productIndex){
      this.$router.push('/productdetails/'+productIndex+'_'+this.currentTab);
    },
    getTabRect(i) {
      const bar = this.$refs.bar
      const btn = this.$refs['tab_' + i]
      const el  = Array.isArray(btn) ? btn[0] : btn
      const barRect = bar.getBoundingClientRect()
      const btnRect = el.getBoundingClientRect()
      return { left: btnRect.left - barRect.left, width: btnRect.width }
    },

    setSliderToTab(i, animate = false) {
      const { left, width } = this.getTabRect(i)
      if (animate) {
        this.isSnapping = true
        setTimeout(() => { this.isSnapping = false }, 320)
      }
      this.sliderLeft  = left
      this.sliderWidth = width
      this.$store.commit("SET_PRODUCTS_TAB", {
        type: 'index',
        data: i,
      });
      this.$store.commit("SET_PRODUCTS_TAB", {
        type: 'left',
        data: left,
      });
      this.$store.commit("SET_PRODUCTS_TAB", {
        type: 'width',
        data: width,
      });
      
      if(!this.categoryFetched[this.currentTab]){
        this.fetchProducts();
      }
    },

    switchTab(i) {
      this.setSliderToTab(i, true)
    },

    // Resolve which tab the slider centre is closest to
    nearestTab(sliderCenterX) {
      let closest = 0, minDist = Infinity
      this.tabs.forEach((_, i) => {
        const { left, width } = this.getTabRect(i)
        const dist = Math.abs((left + width / 2) - sliderCenterX)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      return closest
    },

    // ── Drag handlers ──────────────────────────────────────────
    onDragStart(e) {
      this.dragging     = true
      this.isSnapping   = false
      this.dragStartX   = e.touches ? e.touches[0].clientX : e.clientX
      this.dragStartLeft = this.sliderLeft
    },

    onDragMove(e) {
      if (!this.dragging) return
      e.preventDefault()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const dx = clientX - this.dragStartX

      // Clamp within bar padding
      const bar       = this.$refs.bar
      const barWidth  = bar.getBoundingClientRect().width
      const minLeft   = 4
      const maxLeft   = barWidth - this.sliderWidth - 4
      this.sliderLeft = Math.min(Math.max(this.dragStartLeft + dx, minLeft), maxLeft)

      // Highlight nearest tab label while dragging
      const center    = this.sliderLeft + this.sliderWidth / 2
      //this.activeTab  = this.nearestTab(center)
      this.$store.commit("SET_PRODUCTS_TAB", {
        type: 'index',
        data: this.nearestTab(center),
      });
    },

    onDragEnd() {
      if (!this.dragging) return
      this.dragging = false
      // Snap to nearest tab
      this.setSliderToTab(this.activeTab, true)
    },
    
    // Touch swipe
    onTouchStart(e) {
      this.touchStartX = e.touches[0].clientX
      this.touchStartY = e.touches[0].clientY
      this.dragOffset = 0
      this.isDragging = true
      this.isHorizontal = null
    },

    onTouchMove(e) {
      if (!this.isDragging) return
      const dx = e.touches[0].clientX - this.touchStartX
      const dy = e.touches[0].clientY - this.touchStartY

      if (this.isHorizontal === null) {
        this.isHorizontal = Math.abs(dx) > Math.abs(dy)
      }

      if (this.isHorizontal) {
        e.preventDefault()
        // Resist at edges
        const atStart = this.activeTab === 0 && dx > 0
        const atEnd = this.activeTab === this.tabs.length - 1 && dx < 0
        this.dragOffset = atStart || atEnd ? dx * 0.2 : dx
      }
    },

    onTouchEnd(e) {
      if (!this.isDragging || !this.isHorizontal) {
        this.dragOffset = 0
        this.isDragging = false
        return
      }

      const dx = e.changedTouches[0].clientX - this.touchStartX
      const threshold = 50

      if (dx < -threshold && this.activeTab < this.tabs.length - 1) {
        this.switchTab(this.activeTab + 1)
      } else if (dx > threshold && this.activeTab > 0) {
        this.switchTab(this.activeTab - 1)
      }

      this.dragOffset = 0
      this.isDragging = false
      
    },
    
    async fetchProducts(category) {
    this.loadError = false;
    this.isLoading = true;
    

  try {

    let query = client.from('test_products').select('*');
    
    query = query.or(`status.eq.${this.currentTab}`);
    

    /*if (this.selectedFilters.length != 0) {
      query = query.or(this.selectedFilters.map((s) => `status.eq.${s}`).join(','));
    }*/

    if (this.searchQuery != '') {
      let searchTerm = `%${this.searchQuery.toLowerCase()}%`;
      query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`);
    }

    const { data, error } = await query;

    if (error) throw error;

    //this.searchResults = data;
    
    //this.prod[this.currentTab] = data;
    
    this.$store.commit("SET_PRODUCTS", {
      type: this.currentTab,
      data
    });
    this.$store.commit("SET_PRODUCTS_FETCHED", {
      type: this.currentTab,
      data: true
    });
    //console.log(data)
  } catch (e) {
    console.log('error occurred: ' + e);
    this.loadError = true;
    //this.searchResults = [];
  }

  this.isLoading = false;
}
  }
}


export {ProductPage};