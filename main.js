import {Home} from './components/pages/Hr.js';
import {About} from './components/pages/About.js';
import {Login} from './components/pages/Login.js'
import {Template} from './components/pages/Template.js'
import {StaffDetails} from './components/pages/Staff_details.js'
import {Businesses} from './components/pages/Businesses.js';
import {Products} from './components/pages/Products.js';
import {ProductPage} from './components/pages/Product_Page.js';
import {Users} from './components/pages/Users.js';
import {Settings} from './components/pages/Settings.js';
import {ProductDetails} from './components/pages/Product_Details.js';
import {Stores} from './components/pages/Stores.js';


const router = new VueRouter({
  //mode: 'history',
  
routes: [
{ path: '/u', component: Login },
{ path: '/', component: Home },
{ path: '/temp', component: Template },
{ path: '/about/:selectedStaffIndex', component: About, props: true },
{ path: '/staffdetails/:staffIndex', component: StaffDetails, props: true },
{ path: '/businesses', component: Businesses },
{ path: '/products', component: ProductPage },
//{ path: '/pf', component: ProductPage },
{ path: '/users', component: Users },
{ path: '/settings', component: Settings },
{ path: '/productdetails/:productData', component: ProductDetails, props: true },
{ path: '/stores', component: Stores },
]
});

var vue = new Vue({
el: "#app",
store,
data: {
 navOpen: false
},
computed: {
  darkTheme(){
    return this.$store.state.darkTheme;
  },
  themeClass(){
    return this.$store.state.darkTheme? 'text-white' : 'text-black';
  },
},
methods: {
  toggleTheme(){
    let theme = this.$store.state.darkTheme;
    this.$store.commit("SET_DARKTHEME", !theme)
  },
  fetchUser() { this.$store.dispatch('fetchUser') },
  toAbout(){
    router.replace('/about');
  },
  toHr(){
    router.replace('/');
  }
},
router
});


/*
import { animate } from './js/anime_module.js';

    const ryu = animate('.ball', {
      backgroundPosition: '100% 0px',
      ease: 'steps(9)',
      duration: 500,
      loop: true
    });
*/

function randomPosition() {
    return {
      x: Math.random() * 10,
      y: Math.random() * 80
    };
    /*
    return {
      x: Math.random() * (window.innerWidth - 256),
      y: Math.random() * (window.innerHeight - 256)
    };*/
  }
  
  function moveBall(ball, delayOffset = 0) {
    const pos = randomPosition();
    anime({
      targets: ball,
      translateX: pos.x,
      translateY: pos.y,
      duration: 4000, // slow movement
      delay: delayOffset, // offset start time
      easing: 'easeInOutSine',
      complete: () => moveBall(ball, delayOffset) // loop again
    });
  }
  
  // Animate each ball with a different delay offset
  /*
  const balls = document.querySelectorAll('.ball');
  balls.forEach((ball, index) => {
    moveBall(ball, index * 1000); // 0ms for first, 1000ms for second
  });*/
  
  /*
  console.log(window.innerHeight, window.innerWidth);
  */