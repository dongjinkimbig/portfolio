'use strict';  //이 뒤로 스크립트는 문법에 대해서 엄격하게 하겠다. 변수 제대로 선언안했거나 하면 죽는거야

// 스크롤에 따른 메뉴바(navbar) 처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;              // 죠 사각형의 높이를 가져오세요
console.log(navbarHeight);
document.addEventListener('scroll',() => {
    // console.log('이벤트가 발생되었음..!');
    // console.log(window.scrollY);

    
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--bold');
    }else{
        navbar.classList.remove('navbar--bold');
    }
});

// 메뉴바 버튼 스무스처리
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(e)=>{
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }
    // console.log(link);
    scrollIntoView(link);
});

// contact 버튼 스무스처리
const contactBtn = document.querySelector('.home__contact');            // .빼먹냐 
contactBtn.addEventListener('click',(e)=>{
    scrollIntoView('#contact');
});

// 홈버튼 화살표 처리
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const arrow = document.querySelector('.fa-arrow-up');
document.addEventListener('scroll',() => {
    if(window.scrollY > homeHeight/2){
        arrow.classList.add('visible');
    }else{
        arrow.classList.remove('visible');
    }
    home.style.opacity = 1 - window.scrollY/homeHeight;     // 내려갈때 홈부분 투명해짐
});

arrow.addEventListener('click',(e)=>{   
    scrollIntoView('#home');
});

// 프로젝트 버튼 처리



function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}
