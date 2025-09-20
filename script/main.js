// 프로모션 슬라이더
(function(){
    let promotionList = $('.promotionList > li');
    let promotionPrevBtn = $('.headerTopPrevBtn');
    let promotionNextBtn = $('.headerTopNextBtn');
    let promotionListLength = promotionList.length;
    let isclick = false;
    let currentIdx = 0;
    let sliderInterval = null;

    //4초 자동 슬라이더
    promotionList.eq(0).css({opacity:1});//첫 프로모션 목록 보이기
    sliderInterval = setInterval(autoSlider, 4000);
    function autoSlider(){
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
        if(currentIdx == (promotionListLength-1)){
            currentIdx = 0;
        }else {
            currentIdx++;
        }
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
    }
    //왼쪽버튼
    promotionPrevBtn.on('click',function(a){
        if(isclick) return;
        isclick = true;
        a.preventDefault();
        clearInterval(sliderInterval);

        let tempThis = $(this);
        tempThis.css('pointer-events','none');
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
        if(currentIdx > 0){
            currentIdx--;
        }else{
            currentIdx = promotionListLength-1;
        }
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
        
        //1초 후 버튼클릭 + 다시 자동슬라이더 시작
        setTimeout(() => {
            isclick = false;
            sliderInterval = setInterval(autoSlider, 3000);
            tempThis.css('pointer-events','auto');
        }, 1000);
    });

    //오른쪽버튼
    promotionNextBtn.on('click',function(a){
        if(isclick) return;
        isclick = true;
        a.preventDefault();
        clearInterval(sliderInterval);

        let tempThis = $(this);
        tempThis.css('pointer-events','none');
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:0});
        if(currentIdx == promotionListLength - 1){
            currentIdx = 0;
        }else{
            currentIdx++;
        }
        promotionList.eq(currentIdx).stop(true,true).animate({opacity:1});
        
        //1초 후 버튼클릭 + 다시 자동슬라이더 시작
        setTimeout(() => {
            isclick = false;
            sliderInterval = setInterval(autoSlider, 3000);
            tempThis.css('pointer-events','auto');
        }, 1000);
    });
})(); // 프로모션 슬라이더 끝

//네비게이션
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
    $('body').css('overflow', 'hidden');//스크롤막기
    overlay.css('visibility','visible');
},function(){
    overlay.mouseover(function(){
        prevSubMenu.css('visibility','hidden');
        $('body').css('overflow', 'auto');
        overlay.css('visibility','hidden');
    });
});

//네비 닫힘 함수
function closeNav($curNavContentsMenu){
    if($curNavContentsMenu && $curNavContentsMenu.length > 0){
        $curNavContentsMenu.css('visibility','hidden');
    }
     $('body').css('overflow', 'auto');
    overlay.css('visibility','hidden');
}

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

//모바일,태블릿 - 햄버거 메뉴 버튼
let hamburgerGnav = $('.headerGnav');
let hamburgerGnavBackground = $('.headerGnavContentsBackground');
let hamburgerToggleButton = $('.hamburgerToggleButton');
let hamburgerOnButton = $('.hamburgerOnButton');
let hamburgerOffButton = $('.hamburgerOffButton');
let brandStoryMenu = $('.brandStoryMenu');
let plusBtn = $('.categoryToggleButton');
let windowWidth = $(window).width();
let categoryGap = 30;
let hasClonedSearchMenu = false;
let clonedSearchMenuOn = false;
let openHamburgerGnav = false;
let $loginClone = null;

hamburgerToggleButton.on('click',function(){
    const brandStoryTop = $('.brandStoryMenu').offset().top;
    windowWidth = $(window).width();
    if(windowWidth<=1023){
        let humburgerBtnOn = $(this).data('open');
        openHamburgerGnav = true;
        if(clonedSearchMenuOn){//검색창 열린상태면 지워주기
            $('.clonedSearchItem').remove();
            $('clonedLogin').remove();
            hasClonedSearchMenu = false;
            clonedSearchMenuOn = false;

             $(this).data('open',false);
            humburgerBtnOn = $(this).data('open');

            hamburgerOnButton.css('visibility','visible');
            hamburgerOffButton.css('visibility','hidden');
            hamburgerGnavBackground.css('display','none');
        }

        if(!humburgerBtnOn){//햄버거 버튼 열기
             $(this).data('open',true);
            humburgerBtnOn = $(this).data('open');
            hamburgerGnav.css('display','block');
            openHamburgerGnav = true;
            
            hamburgerOnButton.css('visibility','hidden');
            hamburgerOffButton.css('visibility','visible');
            hamburgerGnavBackground.css('display','block');

            //바디 스크롤 막고 네비 카테고리 스크롤만 보이게
            $('body').css('overflow', 'hidden');
            hamburgerGnav.find('.headerGnavMainMenu').css('overflow-y','auto');

            //검색메뉴 수정전
            if(!hasClonedSearchMenu){

                const $searchItem = $('.searchNavItem').clone();
                $searchItem.addClass('clonedSearchItem');

                //검색 카테고리 아래의 로그인메뉴도 복사
                if(!$loginClone){
                    $loginClone = $('.login').clone();
                    $loginClone.addClass('clonedLogin');
                }
                
                const $searchBtn = $searchItem.find('.searchGnavMainItem');
                const $searchContents = $searchItem.find('.headerGnavContents');
                const $searchCloseBtn = $searchItem.find('.closeButton');
                
                $searchContents.hide();
                $loginClone.show();
                $searchContents.find('.searchMenuWrapper').css('display','block');
                
                $searchBtn.on('click',function(e){//검색버튼 클릭시
                    e.preventDefault();

                    $searchContents.show();
                    $searchCloseBtn.css('visibility','visible');
                    
                    hamburgerOnButton.css('visibility','visible');
                    hamburgerOffButton.css('visibility','hidden');

                    //겉메뉴의 스크롤 방지+서치메뉴의 리스트만 스크롤 보이게
                    hamburgerGnav.find('.headerGnavMainMenu').css('overflow-y','hidden');

                    clonedSearchMenuOn = true;

                    //카테고리안에 폴딩 메뉴 접기
                    plusBtn.each(function(){
                        $(this).data('open', false);
                        $(this).next('ul').css('display', 'none');
                        $(this).children('.plusButton').css('visibility','visible');
                        $(this).children('.minusButton').css('visibility','hidden');
                    });
                });
                
                $('.brandStoryListItem').after($searchItem);
                $searchItem.after($loginClone);
                hasClonedSearchMenu = true;
            }

            //브랜드 스토리 top위치 재조정
            let shoppingMenuHeight = $('.shopping').outerHeight();
            let asideHeight = $('.asideMenu').outerHeight();
            let brandStoryNewTop = asideHeight + shoppingMenuHeight + categoryGap;

            brandStoryMenu.css('top', brandStoryNewTop);



        }else{//햄버거 버튼 닫기
            $(this).data('open',false);
            humburgerBtnOn = $(this).data('open');
            hamburgerGnav.css('display','none');
            openHamburgerGnav = false;

            hamburgerOnButton.css('visibility','visible');
            hamburgerOffButton.css('visibility','hidden');
            hamburgerGnavBackground.css('display','none');
            $('body').css('overflow', 'auto');//스크롤 보이기
            
            //검색메뉴 클론 삭제
            $('.clonedSearchItem').remove();
            $('.clonedLogin').remove();
            hasClonedSearchMenu = false;
            clonedSearchMenuOn = false;

            //카테고리안에 폴딩 메뉴 접기
            plusBtn.each(function(){
                $(this).data('open', false);
                $(this).next('ul').css('display', 'none');
                $(this).children('.plusButton').css('visibility','visible');
                $(this).children('.minusButton').css('visibility','hidden');
            });
        }
    }
});

//모바일,태블릿 - 햄버거 메뉴 안의 폴딩메뉴 및 브랜드스토리 top위치 재조정 
$(this).data('open', false);//초기상태 설정
if(windowWidth<=1023){
    plusBtn.on('click', function(){
        let minusBtnOn = $(this).data('open');
        let currentCategory;
        //footer 폴딩메뉴일때 메뉴찾기가 다름
        if($(this).hasClass('footerToggleButton')){
            //currentCategory = $(this).closest('.infoHeader').next('ul');
            $(this).toggleClass('active');
            $(this).closest('.infoSection').toggleClass('active')
        }else{
            //액티브 클래스 따로 만들기
            currentCategory = $(this).next('ul');
    
            if(minusBtnOn){
                $(this).data('open', false);
                currentCategory.css('display', 'none');
                $(this).children('.plusButton').css('visibility','visible');
                $(this).children('.minusButton').css('visibility','hidden');
            }
            else{
                $(this).data('open', true);
                currentCategory.css('display', 'block');
                $(this).children('.plusButton').css('visibility','hidden');
                $(this).children('.minusButton').css('visibility','visible');
            }
        }

        if(!$(this).hasClass('footerToggleButton')){
            let shoppingMenuHeight = $('.shopping').outerHeight();
            let asideHeight = $('.asideMenu').outerHeight();
            let brandStoryNewTop = asideHeight + shoppingMenuHeight + categoryGap;
    
            brandStoryMenu.css('top', brandStoryNewTop);
        }
    
    });
}




//모바일,태블릿 -> PC 초기화
let isPC = window.innerWidth > 1023;
$(window).on('resize', function(){
    const newWidth = window.innerWidth;
    const nowPC = newWidth > 1023;

    if(nowPC !== isPC){
        isPC = nowPC;

        if(nowPC){//PC로 초기화
            //햄버거 상태 초기화
            hamburgerGnav.css('display','');
            hamburgerToggleButton.data('open',false);
            hamburgerGnavBackground.css('display','none');
            openHamburgerGnav = false;
            //햄버거 버튼 초기화
            hamburgerOnButton.css('visibility','visible');
            hamburgerOffButton.css('visibility','hidden');
            //열린 네비+뒷배경 닫기
            $('.headerGnavContents').css('visibility','hidden');
            $('.gnavOverlay').css('visibility','hidden');

            //스크롤보이기
            $('body').css('overflow', 'auto');

            //검색메뉴 클론 삭제
            $('.clonedSearchItem').remove();
            $('.clonedLogin').remove();
            hasClonedSearchMenu = false;
            clonedSearchMenuOn = false;

            //폴딩 카테고리 닫기
            plusBtn.each(function(){
                $(this).data('open', false);
                $(this).next('ul').css('display', '');
                $(this).children('.plusButton').css('visibility','visible');
                $(this).children('.minusButton').css('visibility','hidden');
            });

        }else{//모바일,태블릿으로 초기화
            $('body').css('overflow', 'auto');
        }
    }
});

//네비 클로즈버튼
//document사용이유 클론시점이랑 dom 생성이 안맞아서 빈객체 현상 발생
$(document).on('click', '.closeButton',function(){
            console.log('클로즈버튼 눌림');
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if(isDesktop){ //pc버전일때
            console.log('PC클로즈버튼 눌림');

        prevSubMenu.css('visibility','hidden');
        overlay.css('visibility','hidden');
    }else{
            console.log('MOBILE클로즈버튼 눌림');

        const $searchContents = $('.clonedSearchItem .headerGnavContents');
        $searchContents.hide();
        $('.clonedLogin').hide();
        hamburgerGnav.css('display','none');
        hamburgerGnavBackground.css('display','none');
        openHamburgerGnav = false;
    }
    $('body').css('overflow', 'auto');
});

//스티키헤더
let prevScrollTop = 0;
let headerHeight = $('header').outerHeight();
setInterval(function(){
    let curScrollTop = $(window).scrollTop();
    
    if(scrollDown){
        scrollDown = false;
        //화면 내릴때
        if(curScrollTop > prevScrollTop && !openHamburgerGnav){
            $('header').animate({top:-headerHeight});
        }else{//화면 올릴때
            if(curScrollTop<=headerHeight+30){
                //최상단까지 거의 다 왔을때 온전한 헤더(최상단오토슬라이드+네비) 보여주기
                $('header').css({top:0});
            }else{
                //최상단이 아닐때 헤더바텀만 보여주기
                $('header').animate({top:-50});
            }
        };
        prevScrollTop = curScrollTop;
    };
},500);

//두번째 메인페이지 버튼&드래그 슬라이더(모바일만)
let isMobile = window.innerWidth < 768;
let isSliderSetup = false;
let slideCurIndex = 2;
let curTranslateX = 0;
let slideWidth = $('.bestProductsSlide').outerWidth(true);

function clearSlider(){
    $('.bestProducts_wrapper').find('.bestProductsSlide.slideClone').remove();
    $('.bestProducts_wrapper').off('mousedown touchstart');
    $(document).off('mousemove mouseup touchmove touchend touchcancel');
    $('.mainSlidePrevBtn').off('click');
    $('.mainSlideNextBtn').off('click');
    $('.bestProducts_wrapper').css({transform:'', transition:''});
    isSliderSetup = false;
}

function initMobileSlider(){
    const $slideWrapper = $('.bestProducts_wrapper');
    let $slide = $('.bestProductsSlide');
    
    //초기화
    clearSlider();

    let slideLength = $slide.length;
    let isAnimating = false;
    slideWidth = $slide.outerWidth(true);
    
    //슬라이드 복제 앞2개 뒤에서2개
    const $firstClone = $slide.eq(0).clone().addClass('slideClone');
    const $secondClone = $slide.eq(1).clone().addClass('slideClone');
    const $lastClone = $slide.last().clone().addClass('slideClone');
    const $lastsecondClone = $slide.eq($slide.length - 2).clone().addClass('slideClone');
    
    $slideWrapper.append($firstClone);
    $slideWrapper.append($secondClone);
    $slideWrapper.prepend($lastClone);
    $slideWrapper.prepend($lastsecondClone);
    
    //새로 추가된 슬라이드 갱신
    $slide = $('.bestProductsSlide'); 
    slideLength = $slide.length;
    slideCurIndex = 2;
    curTranslateX = 0;
    $slideWrapper.css('transform',`translateX(-${slideWidth * slideCurIndex}px)`);//초기위치잡기
    curTranslateX = -slideWidth * slideCurIndex;

    function moveToPrevSlide(){
        if(isAnimating) return;
        isAnimating = true;
    
        slideCurIndex--;
        $slideWrapper.css('transition','all 0.5s');
        $slideWrapper.css('transform',`translateX(-${slideWidth * slideCurIndex}px)`);
        curTranslateX = -slideWidth * slideCurIndex;
        
        if(slideCurIndex === 0){
            setTimeout(function(){
                slideCurIndex = slideLength-4;
                $slideWrapper.css('transition','none');
                $slideWrapper.css('transform',`translateX(-${slideWidth * slideCurIndex}px)`);
                curTranslateX = -slideWidth * slideCurIndex;
                isAnimating = false;
            },500);
        }else{
            setTimeout(() => {
                curTranslateX = -slideWidth * slideCurIndex;
                isAnimating = false;
            }, 500);
        }
    };
    function moveToNextSlide(){
        if(isAnimating) return;
        isAnimating = true;
    
        slideCurIndex++;
        $slideWrapper.css('transition','all 0.5s');
        $slideWrapper.css('transform',`translateX(-${slideWidth * slideCurIndex}px)`);
        curTranslateX = -slideWidth * slideCurIndex;

        if(slideCurIndex === slideLength - 2){
            setTimeout(function(){
                slideCurIndex = 2;
                $slideWrapper.css('transition','none');
                $slideWrapper.css('transform',`translateX(-${slideWidth * slideCurIndex}px)`);
                curTranslateX = -slideWidth * slideCurIndex;
                isAnimating = false;
            },500);
        }else{
            setTimeout(() => {
                isAnimating = false;
                curTranslateX = -slideWidth * slideCurIndex;
            }, 500);
        }
    };
    //버튼 이벤트
    $('.mainSlidePrevBtn').on('click', moveToPrevSlide);
    $('.mainSlideNextBtn').on('click', moveToNextSlide);

    //드래그 이벤트
    let startX = 0;
    let isDragging = false;
    let isTouch = false;    
    $slideWrapper.on('mousedown',function(e){
        if(isTouch) return;
        if(e.cancelable) e.preventDefault();
        //[Intervention] Ignored attempt to cancel a touchend event with cancelable=false,에 대한 에러 처리
        dragAndTouchStartX(e);
    });
    $slideWrapper.on('touchstart', function(e){
        isTouch = true;
        if(e.cancelable) e.preventDefault();
        dragAndTouchStartX(e);
    }
);
    function dragAndTouchStartX(e){
        if(isAnimating) return;
        isDragging = true;
        if(e.type === "touchstart"){
            startX = e.originalEvent.touches[0].clientX;
        }else{
            startX = e.clientX;
        }
    }

    $(document).on('mousemove touchmove', function(e){
        if(!isDragging || isAnimating) return;
        let moveX = 0;
        if(e.type === "touchmove"){
            moveX = e.originalEvent.touches[0].clientX;
        }else{
            moveX = e.clientX;
        }
        let temp = moveX - startX;
        
        const slideArea = $slideWrapper[0].getBoundingClientRect();
        if(temp < -50){
            isDragging = false;
            moveToNextSlide();
            return;
        }
        if(temp > 50){
            isDragging = false;
            moveToPrevSlide();
            return;
        }

        $slideWrapper.css('transition', 'none');
        $slideWrapper.css('transform', `translateX(${curTranslateX + temp}px)`);
    });
    
    $(document).on('mouseup touchend',function(e){
        if(!isDragging || isAnimating) return;
        isDragging = false;
        let endX = 0;
        
        if(e.type === "touchend"){
            endX = e.originalEvent.changedTouches[0].clientX;
        }else{
            endX = e.clientX;
        }
        const distance = endX - startX;
        const exTranslateX = curTranslateX;
        let nextTranslateX = curTranslateX + distance;

        if(distance < -50){//다음슬라이드
            $slideWrapper.css('transition', 'none');
            $slideWrapper.css('transform', `translateX(${nextTranslateX}px)`);
            moveToNextSlide();
        }else if(distance > 50){//이전
            $slideWrapper.css('transition', 'none');
            $slideWrapper.css('transform', `translateX(${nextTranslateX}px)`);
            moveToPrevSlide();
        }else{//원래 위치로
            $slideWrapper.css('transition','all 0.5s');
            $slideWrapper.css('transform',`translateX(${exTranslateX}px)`);
        }
    });
    $(document).on('touchcancel', function(e){
        if(!isDragging || isAnimating) return;
        isDragging = false;
        $slideWrapper.css('transition','all 0.5s');
        $slideWrapper.css('transform',`translateX(${curTranslateX}px)`);
    });
    isSliderSetup = true;
};

let prevSlideWidth = 0;
$(function(){
    if(isMobile){
        initMobileSlider();
    }
    $(window).on('resize', function(){
        const nowMobile = window.innerWidth < 768;

        if(nowMobile !== isMobile){
            isMobile = nowMobile;

            if(isMobile){
                initMobileSlider();
            }else{//pc 모드시 초기화
                clearSlider();
            }
        }else if(isMobile && !isSliderSetup){
            initMobileSlider();
        }
        if(isMobile && isSliderSetup){
            const nowSlideWidth = $('.bestProductsSlide').outerWidth(true);
            slideWidth = nowSlideWidth;//슬라이드 위치 갱신

            if(prevSlideWidth !== nowSlideWidth){
                const newTranslateX = -nowSlideWidth * slideCurIndex;
                $('.bestProducts_wrapper').css('transition', 'none');
                $('.bestProducts_wrapper').css('transform', `translateX(${newTranslateX}px)`);
                curTranslateX = newTranslateX;
                prevSlideWidth = nowSlideWidth;
            }
        }
    });
});


//두번째 페이지 상품용량 슬라이드
$('.productSizeBoxPrevBtn').on('click', function(){
    $('.productSizeBoxSlide').find($('.productSizeBox')).css({justifyContent:'flex-start'});
});
$('.productSizeBoxNextBtn').on('click', function(){
    $('.productSizeBoxSlide').find($('.productSizeBox')).css({justifyContent:'flex-end'});
});

//백투탑 버튼
$('.backToTopButton').on('click',function(){
    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    });
});

