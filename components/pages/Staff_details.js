const StaffDetails = {
  template: `<div class="h-full">
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
          <div class="flex flex-wrap items-center gap-3 mb-1">
            <h1 class="font-display font-extrabold text-xl  tracking-tight leading-tight">
              {{staff.first_name + ' ' + staff.last_name}}
            </h1>
            <div :class="theme.container" class="px-2 py-1 border border-green-500/30 flex items-center rounded-2xl text-xs text-green-500 gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500"></div>
              {{ staff.status }}
            </div>
          </div>
          <p class="text-purple-500 font-display font-semibold text-sm mb-2">{{ staff.bio }}</p>
          <div class="flex flex-wrap items-center gap-3 text-xs" :class="theme.subtitle">
            <span class="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Lagos, Nigeria
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
      
      <!--
      <hr class="divider my-5"/>
      -->
      <!-- Quick stats --
      <div class="grid grid-cols-3 gap-3">
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl text-white">48</p>
          <p class="text-xs text-slate-400 mt-0.5">Projects</p>
        </div>
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl text-white">4.9</p>
          <p class="text-xs text-slate-400 mt-0.5">Rating</p>
        </div>
        <div class="stat-card p-4 text-center">
          <p class="font-display font-bold text-xl" style="color:#AC41FF;">3y 2m</p>
          <p class="text-xs text-slate-400 mt-0.5">Tenure</p>
        </div>
      </div>-->
      
    </div>
    
    
    <!-- Contact --
    <div class="fade-up delay-5 rounded-[20px] p-5"
         style="background: rgba(255,255,255,0.025); border: 1px solid rgba(172,65,255,0.12);">
      <p class="section-label mb-4">Contact</p>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AC41FF" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <span class="text-sm text-slate-300">{{ staff.email }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AC41FF" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.56 2 2 0 0 1 3.6 2.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 14.09 16l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <span class="text-sm text-slate-300">{{ staff.phone }}</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
               style="background: rgba(172,65,255,0.1); border: 1px solid rgba(172,65,255,0.2);">
            <img src="assets/whatsapp.svg">
          </div>
          <span class="text-sm text-slate-300">{{ staff.phone }}</span>
        </div>
      </div>
      -->
      
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