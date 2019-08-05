window.onload=function(){
	function isInViewport(elem){let bounding=elem.getBoundingClientRect();
	return(bounding.top>=0&&bounding.left>=0&&bounding.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&bounding.right<=(window.innerWidth||document.documentElement.clientWidth))
}
let lazyElements=document.querySelectorAll('.js-lazy-image');
window.addEventListener('scroll',function(event){
	for(let i=0;i<lazyElements.length;i++){
		if(isInViewport(lazyElements[i])){
			if(lazyElements[i].getAttribute('data-src')){
				lazyElements[i].setAttribute('src',lazyElements[i].getAttribute('data-src'));
				lazyElements[i].removeAttribute('data-src');
				if(lazyElements[i].getAttribute('data-srcset')){
					lazyElements[i].setAttribute('srcset',lazyElements[i].getAttribute('data-srcset'));
					lazyElements[i].removeAttribute('data-srcset')
				}
				lazyElements[i].classList.add('animated');
				lazyElements[i].classList.add('fadeIn');
				lazyElements[i].classList.remove('lazy')
			}
		}
	}
},!1)
