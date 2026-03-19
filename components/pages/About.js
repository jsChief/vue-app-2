const About = {
  template: `<div class="h-full flex flex-col place-content-between bg-pink-300/50">
  
  <div class="absolute top-0 p-2">
    <button class="ml-2 fa fa-chevron-left text-3xl text-black"></button>
  </div>
  
  {{ count }}
  
    <div class="h-60 flex flex-col place-content-center items-center mb-2 rounded-b-xl">
      <p class="font-bold text-3xl p-2 text-white"> {{ selectedStaffIndex }} </p>
    </div>
    
    <div class="bg-slate-700/50 rounded-t-xl h-full">
      
    </div>
  </div>`,
  props: ['selectedStaffIndex'],
  data(){
    return {
      count: 10
    }
  },
  methods: {
    
  }
  
}

export {About};