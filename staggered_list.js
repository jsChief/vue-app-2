 function replay(id) {
   const list = document.getElementById(id);
   list.querySelectorAll('[class*="item"]').forEach((el) => {
     el.style.animation = 'none';
     el.offsetHeight; // reflow
     el.style.animation = '';
   });
 }