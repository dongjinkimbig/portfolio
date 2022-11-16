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

// 메뉴바 버튼 처리
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(e)=>{

    const target = e.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }    
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// 모바일 토글버트ㅡㄴ
const navbarToggleBtn = document.querySelector('.navbar__togle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
});

// contact 버튼 스무스처리
const contactBtn = document.querySelector('.home__contact');            // .빼먹냐 
contactBtn.addEventListener('click',()=>{
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

// 프로젝트 버튼 처리 (선택한거 보이기)
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    const active = document.querySelector('.category__btn.selected');
    if(active != null){
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');
    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === "*" || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300)
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map((id)=> document.querySelector(id));
// console.log(sections);
const navItems = sectionIds.map((id)=> document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions ={
    root:null,
    rootmargin:'0px',
    threshold:0.3
}

const observerCallback = (entries,observer) => {
    entries.forEach((entry)=>{
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            console.log('y');
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
            if(entry.boundingClientRect.y <0){
                selectedNavIndex = index +1;
            }else{
                selectedNavIndex = index -1;
            }
            console.log(selectedNavIndex);
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel',()=>{
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight
    ){
        selectedNavIndex = navItems.length -1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});