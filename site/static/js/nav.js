function toggleNav(){const navbarToggler=document.querySelector('.navbar-toggle');const menuCollapse=document.querySelector('.navbar-collapse');navbarToggler.addEventListener('click',function(){if(menuCollapse.classList.contains('in')){menuCollapse.classList.remove('in');navbarToggler.setAttribute('aria-expanded','false');navbarToggler.classList.add('collapsed')}
else{menuCollapse.classList.add('in');navbarToggler.setAttribute('aria-expanded','true');navbarToggler.classList.remove('collapsed')}},{passive:!0});
if(window.addEventListener) {
    window.addEventListener('load',toggleNav,false);
} else {
    window.attachEvent('onload',toggleNav);
}
