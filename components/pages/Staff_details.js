const StaffDetails = {
  template: `<div class="h-full overflow-y-scroll no-scrollbar" :class="theme.surface">
  
   <!-- Hero card -->
    <div class="fade-up delay-1 rounded-[24px] p-6 mb-4"
         style="background: rgba(255,255,255,0.025); border: 1px solid rgba(172,65,255,0.18); backdrop-filter: blur(12px);">

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">

        <!-- Avatar -->
        <div class="avatar-ring flex-shrink-0 h-48">
          <div class="avatar-inner w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, #1e1030, #2a1550);">
            <img class="h-full" :src="staff.image_url">
          </div>
        </div>
       

        <!-- Name & role -->
        <div class="flex-1 min-w-0">
          <div class="flexa flexa-wrap items-center gap-3 mb-4">
            <h1 class="font-display font-extrabold text-2xl  tracking-tight leading-tight mb-1">
              {{staff.first_name + ' ' + staff.last_name}}
            </h1>
            <p class="text-purple-500 font-display font-semibold text-sm mb-2">{{ staff.bio }}</p>
            <div :class="theme.container" class="px-2 py-1 border border-green-500/30 flex items-center rounded-2xl text-xs text-green-500 gap-2 w-fit">
              <div class="h-2 w-2 rounded-full bg-green-500"></div>
              {{ staff.status }}
            </div>
          </div>
          
          <div class="flex flex-wrap items-center gap-3 text-xs" :class="theme.subtitle">
            <span class="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{staff.location}}
            </span>
            <span class="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              {{ staff.department }} Dept.
            </span>
            <span class="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Hired {{ staff.hire_date }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-2 flex-shrink-0">
          <button class="btn-primary">Message</button>
          <button @click="editStaffInfo" class="btn-ghost" :class="theme.subtitle">Edit</button>
        </div>
      </div>
      
      
      <hr class="divider mt-4"/>
     
      <!-- Quick stats -->
      <div class="grid grid-cols-3 gap-3 mt-6">
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl">48</p>
          <p class="text-xs text-slate-400 mt-0.5">Projects</p>
        </div>
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl">4.9</p>
          <p class="text-xs text-slate-400 mt-0.5">Rating</p>
        </div>
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl" style="color:#AC41FF;">3y 2m</p>
          <p class="text-xs text-slate-400 mt-0.5">Tenure</p>
        </div>
      </div>
      
    </div>
    
    
    <!-- Bio -->
    <div class="fade-up delay-2 rounded-[20px] p-5 mb-4"
         style="background: rgba(255,255,255,0.025); border: 1px solid rgba(172,65,255,0.12);">
      <p class="section-label mb-3">About</p>
      <p class="text-sm leading-relaxed" :class="theme.subtitle">
        {{staff.first_name + ' ' + staff.last_name}} is a results-driven product designer with a passion for human-centred experiences. He blends strategic thinking with visual craft to deliver interfaces that are both beautiful and deeply functional. Known for bringing calm clarity to complex design challenges.
      </p>
    </div>

    <!-- Skills -->
    <div class="fade-up delay-3 rounded-[20px] p-5 mb-4"
         style="background: rgba(255,255,255,0.025); border: 1px solid rgba(172,65,255,0.12);">
      <p class="section-label mb-4">Skills</p>

      <div class="space-y-4">
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-medium" :class="theme.subtitle">UI / UX Design</span>
            <span class="text-xs text-purple-400 font-display font-bold">95%</span>
          </div>
          <div class="progress-bg"><div class="progress-fill" style="width:95%"></div></div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-medium" :class="theme.subtitle">Figma & Prototyping</span>
            <span class="text-xs text-purple-400 font-display font-bold">90%</span>
          </div>
          <div class="progress-bg"><div class="progress-fill" style="width:90%"></div></div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-medium" :class="theme.subtitle">Design Systems</span>
            <span class="text-xs text-purple-400 font-display font-bold">85%</span>
          </div>
          <div class="progress-bg"><div class="progress-fill" style="width:85%"></div></div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-xs font-medium" :class="theme.subtitle">User Research</span>
            <span class="text-xs text-purple-400 font-display font-bold">78%</span>
          </div>
          <div class="progress-bg"><div class="progress-fill" style="width:78%"></div></div>
        </div>
      </div>

      <hr class="divider my-5"/>

      <div class="flex flex-wrap gap-2">
        <span class="skill-badge">Figma</span>
        <span class="skill-badge">Framer</span>
        <span class="skill-badge">Vue.js</span>
        <span class="skill-badge">Tailwind</span>
        <span class="skill-badge">Motion Design</span>
        <span class="skill-badge">Accessibility</span>
        <span class="skill-badge">Research</span>
      </div>
    </div>

    
    
    <!-- Contact -->
    <div class="fade-up backdrop-blur delay-5 rounded-[20px] p-5"
         style="background: rgba(255,255,255,0.025); border: 1px solid rgba(172,65,255,0.12);">
      <p class="section-label mb-4 text-purple-500">Contact</p>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-[6px] flex items-center place-content-center"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
            <span class="fa fa-square-envelope text-purple-500 text-3xl"></span>
          </div>
          <span class="text-sm" :class="theme.subtitle">{{ staff.email }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-[6px] flex items-center place-content-center"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
               <span class="text-3xl fa fa-square-phone text-purple-500"></span>
            
          </div>
          <span class="text-sm" :class="theme.subtitle">{{ staff.phone }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="size-8 rounded-[6px] flex items-center place-content-center"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
            <span class="text-3xl fab fa-square-whatsapp text-purple-500"></span>
          </div>
          <span class="text-sm" :class="theme.subtitle">{{ staff.phone }}</span>
        </div>
      </div>
      
      
    </div>
    
  </div>`,
  props: ['staffIndex'],
  computed: {
    staff(){
      return this.$store.state.staff[this.$props.staffIndex];
    },
    theme(){
      return this.$store.state.darkTheme? this.$store.state.theme.dark : this.$store.state.theme.light
    }
  },
  methods: {
    editStaffInfo(){
      //console.log(this.$props.staffIndex);
      this.$router.push('/about/'+this.$props.staffIndex)
    }
  }
}

export {StaffDetails};