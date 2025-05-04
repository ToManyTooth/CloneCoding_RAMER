
let mainMenu = $('.headerGnavMainItem');
let prevSubMenu = $('.headerGnavContents');
let overlay = $('.gnavOverlay');

mainMenu.hover(function(){
    if($(this).is('.headerGnavMainItemCart')==true){
        //장바구니 팝업창
    }else{
        prevSubMenu.css('visibility','hidden');
        
        let currentSubMenu = $(this).find('.headerGnavContents');
        currentSubMenu.css('visibility','visible');
        overlay.css('visibility','visible');
        console.log("호버시작");
    }
},function(){
    overlay.mouseover(function(){
        prevSubMenu.css('visibility','hidden');
        overlay.css('visibility','hidden');
        console.log("호버끝");
    });
});



// 서브웨이 참고하기
// //네비게이션 구문
// let mainMenu = $('nav > ul > li');
// let subMenu = $('nav > ul ul');
// let header = $('header');

// mainMenu.mouseover(function(){
//     header.addClass('navActive');
//     subMenu.stop().slideDown(200);
// }).mouseout(function(){
//     header.removeClass('navActive');
//     subMenu.stop().slideUp(200);
// });



// // 메인 슬라이더 구문
// let slideContainer = $('.slide ul');
// let slideLength = $('.slide ul li').length;
// let currentIdx = 0;

// setInterval(function(){
//     if(currentIdx == (slideLength-1)){
//         currentIdx = 0;
//     }else{
//         currentIdx++;
//     }
//     slideContainer.animate({marginLeft:-1920*currentIdx + 'px'});
// }, 3000);

// // 메뉴 페이지 전환 구문

// let menuTap = $('.menu_header > ul > li');
// let menuWrapper = $('.menu_wrapper');
// let hiddenPageCheck = false;

// menuTap.click(function(a){
//     a.preventDefault();
//     let tapId = this.querySelector("a").getAttribute('href');
//     let changingPage = $(tapId);
//     menuWrapper.removeClass('movingPage');
//     menuWrapper.animate({opacity:'0'});
//     changingPage.addClass('movingPage');
//     changingPage.animate({opacity:'1'});
// });


// // 각 메뉴별 슬라이더 구문

// let prevBtn = $('.prevBtn_pageOn');
// let nextBtn = $('.nextBtn_pageOn');
// let classicMenu = $('.classicMenu');

// nextBtn.click(function(a){
//     a.preventDefault();
//     var temp = $(this).parent();
//     var currentPage = temp.prev();
//     currentPage.addClass('active');
// });
// prevBtn.click(function(a){
//     a.preventDefault();
//     var temp = $(this).parent();
//     var currentPage = temp.prev();
//     currentPage.removeClass('active');
// });
