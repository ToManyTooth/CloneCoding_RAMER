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
let overlay = $('.gnavOverlay');
let closeBtn = $('.closeButton');

mainMenu.hover(function(){
    if($(this).is('.headerGnavMainItemCart')==true){
        //장바구니 팝업창
    }else{
        prevSubMenu.css('visibility','hidden');
        
        let currentSubMenu = $(this).find('.headerGnavContents');
        currentSubMenu.css('visibility','visible');
        $('body').css('overflow', 'hidden');
        overlay.css('visibility','visible');
    }
},function(){
    overlay.mouseover(function(){
        prevSubMenu.css('visibility','hidden');
        $('body').css('overflow', 'auto');
        overlay.css('visibility','hidden');
    });
});
closeBtn.on('click',function(){
    prevSubMenu.css('visibility','hidden');
        $('body').css('overflow', 'auto');
    overlay.css('visibility','hidden');
});

//스크롤 애니메이션
$(window).on('scroll', function(){
    //포인트지점은 뷰포트의 바텀(뷰포트탑+뷰포트전체높이)
    let viewportBottom = $(window).scrollTop() + $(window).height();
    let section = $('.scrollAnimate');
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
