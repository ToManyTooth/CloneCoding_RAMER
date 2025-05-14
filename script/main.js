// 프로모션 슬라이더
(function(){
    let promotionList = $('.promotionList > li');
    let promotionPrevBtn = $('.headerTopPrevBtn');
    let promotionNextBtn = $('.headerTopNextBtn');
    let promotionListLength = promotionList.length;
    let autoSlider = null;
    let currentIdx = 0;

    //5초 자동 슬라이더
    promotionList.eq(0).css({opacity:1});//첫 프로모션 목록 보이기
    function sliderTimer(){
        autoSlider = setTimeout(function(){
            promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
            if(currentIdx == (promotionListLength-1)){
                currentIdx = 0;
            }else{
                    currentIdx++;
                }
                promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
            sliderTimer();
        },5000);
    };

    sliderTimer();
    
    //왼쪽버튼
    promotionPrevBtn.on('click',function(a){
        a.preventDefault();
        let tempThis = $(this);
        clearTimeout(autoSlider);
        tempThis.css('pointer-events','none');
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
        if(currentIdx>0){
            currentIdx--;
        }else{
            currentIdx = promotionListLength-1;
        }
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
        
        //5초 후 다시 자동슬라이더 시작, 1.5초후 버튼 클릭가능
        setTimeout(sliderTimer,5000);
        setTimeout(function(){
            tempThis.css('pointer-events','auto');
        },1500);
    });

    //오른쪽버튼
    promotionNextBtn.on('click',function(a){
        a.preventDefault();
        let tempThis = $(this);
        tempThis.css('pointer-events','none');
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
        if(currentIdx==promotionListLength-1){
            currentIdx = 0;
        }else{
            currentIdx++;
        }
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
        
        //5초 후 다시 자동슬라이더 시작, 1.5초후 버튼 클릭가능
        setTimeout(sliderTimer,5000);
        setTimeout(function(){
            tempThis.css('pointer-events','auto');
        },1500);
    });
})(); // 프로모션 슬라이더 끝

// 네비게이션
let mainMenu = $('.headerGnavMainItem');
let prevSubMenu = $('.headerGnavContents');
let cartMenu = $('.headerGnavMainItemCart');
let overlay = $('.gnavOverlay');
let closeBtn = $('.closeButton');


mainMenu.hover(function(){
    if($(this).is('.headerGnavMainItemCart')){
        return;
    }
    prevSubMenu.css('visibility','hidden');
    
    let currentSubMenu = $(this).find('.headerGnavContents');
    currentSubMenu.css('visibility','visible');
    $('body').css('overflow', 'hidden');
    overlay.css('visibility','visible');
},function(){
    overlay.mouseover(function(){
        prevSubMenu.css('visibility','hidden');
        $('body').css('overflow', 'auto');
        overlay.css('visibility','hidden');
    });
});
//네비 클로즈버튼
closeBtn.on('click',function(){
    prevSubMenu.css('visibility','hidden');
        $('body').css('overflow', 'auto');
    overlay.css('visibility','hidden');
});
//장바구니 팝업창
cartMenu.on('mouseenter',function(){
    $('.cartPopup').css('display', 'block');
});
cartMenu.on('mouseleave',function(){
    $('.cartPopup').css('display','none');
});
$('.cartCloseButton').on('click',function(){
    $('.cartPopup').css('display','none');
});
//스크롤 애니메이션
let scrollDown = false;
$(window).on('scroll', function(){
    //포인트지점은 뷰포트의 바텀(뷰포트탑+뷰포트전체높이)
    let viewportBottom = $(window).scrollTop() + $(window).height();
    let section = $('.scrollAnimate');
    scrollDown = true;
    //sectionTop 구하기
    section.each(function(){
        let sectionTop = $(this).offset().top;
        
        if(viewportBottom >= sectionTop+50){
            if(!$(this).hasClass('scrollAnimateOn')){
                $(this).addClass('scrollAnimateOn');
                $(this).removeClass('scrollAnimateOff');
            }
        }else{
            if(!$(this).hasClass('scrollAnimateOff')){
                $(this).addClass('scrollAnimateOff');
                $(this).removeClass('scrollAnimateOn');
            };
        };
    });

    
});
// $(window).scrollTop();//뷰포트(브라우저창)의 맨위 위치
// $(window).height();//뷰포트의 전체높이 == 화면 높이
// $('섹션').offset().top;//섹션이 scrollTop에서 얼마나 떨어져있는지

//스티키헤더
let prevScrollTop = 0;
let headerHeight = $('header').outerHeight();
setInterval(function(){
    let currScrollTop = $(window).scrollTop();
    
    
    if(scrollDown){
        scrollDown = false;
        console.log(headerHeight);
        //스크롤 위로 올릴 때
        if(currScrollTop > prevScrollTop){
            $('header').animate({top:-headerHeight});
        }else{//스크롤 아래로 내릴 때
            if(currScrollTop<=headerHeight+30){
                //최상단까지 거의 다 왔을때 온전한 헤더 보여주기
                $('header').css({top:0});
            }else{
                //최상단이 아닐때 헤더바텀만 보여주기
                $('header').animate({top:-50});
            }
        };
        prevScrollTop = currScrollTop;
    };
},500);

//백투탑 버튼
$('.backToTopButton').on('click',function(){
    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    });
});