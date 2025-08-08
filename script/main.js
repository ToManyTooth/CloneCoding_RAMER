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

// //네비 클로즈버튼
// //document사용이유 클론시점이랑 dom 생성이 안맞아서 빈객체 현상 발생
// $(document).on('click', '.closeButton',function(){
//     const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
//     if(isDesktop){ //pc버전일때
//         closeNav(prevSubMenu);
//     }else{
//         const $searchContents = $('.clonedSearchItem .headerGnavContents');
//         // closeNav($searchContents);
//         $searchContents.hide();
//     }
// });

//서치메뉴만 닫힘 다른것도 다 닫게 해주면 될듯!!




// closeBtn.on('click',function(){
//     console.log('눌림');
//     const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
//     if(isDesktop){ //pc버전일때
//         closeNav(prevSubMenu);
//     }else{
//         const $searchContents = $searchItem.find('.headerGnavContents');
//         // closeNav($searchContents);
//         $searchContents.hide();
//     }
// });


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

hamburgerToggleButton.on('click',function(){
    const brandStoryTop = $('.brandStoryMenu').offset().top;
    windowWidth = $(window).width();
    if(windowWidth<=1023){
        let humburgerBtnOn = $(this).data('open');
        if(clonedSearchMenuOn){//검색창 열린상태면 지워주기
            $('.clonedSearchItem').remove();
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
            
            hamburgerOnButton.css('visibility','hidden');
            hamburgerOffButton.css('visibility','visible');
            hamburgerGnavBackground.css('display','block');

            //바디 스크롤 막고 네비 카테고리 스크롤만 보이게
            $('body').css('overflow', 'hidden');
            hamburgerGnav.find('.headerGnavMainMenu').css('overflow-y','auto');


            //검색메뉴
            if(!hasClonedSearchMenu){

                const $searchItem = $('.searchNavItem').clone();
                $searchItem.addClass('clonedSearchItem');

                const $searchBtn = $searchItem.find('.searchGnavMainItem');
                const $searchContents = $searchItem.find('.headerGnavContents');
                const searchCloseBtn = $searchItem.find('.closeButton');
                
                $searchContents.hide();
                $searchContents.find('.searchMenuWrapper').css('display','block');
                
                $searchBtn.on('click',function(e){//검색버튼 클릭시
                    e.preventDefault();

                    $searchContents.show();
                    searchCloseBtn.css('visibility','visible');
                    
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

            hamburgerOnButton.css('visibility','visible');
            hamburgerOffButton.css('visibility','hidden');
            hamburgerGnavBackground.css('display','none');
            $('body').css('overflow', 'auto');//스크롤 보이기
            
            //검색메뉴 클론 삭제
            $('.clonedSearchItem').remove();
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
        let currentCategory = $(this).next('ul');
        if(minusBtnOn){
            console.log('마이너스눌림');
            $(this).data('open', false);
            currentCategory.css('display', 'none');
            $(this).children('.plusButton').css('visibility','visible');
            $(this).children('.minusButton').css('visibility','hidden');
        }
        else{
            console.log('플러스눌림');
            $(this).data('open', true);
            currentCategory.css('display', 'block');
            $(this).children('.plusButton').css('visibility','hidden');
            $(this).children('.minusButton').css('visibility','visible');
        }

        let shoppingMenuHeight = $('.shopping').outerHeight();
        let asideHeight = $('.asideMenu').outerHeight();
        let brandStoryNewTop = asideHeight + shoppingMenuHeight + categoryGap;

        brandStoryMenu.css('top', brandStoryNewTop);
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
        hamburgerGnav.css('display','none');
        hamburgerGnavBackground.css('display','none');
    }
    $('body').css('overflow', 'auto');
});



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

//상품용량 슬라이드(두번째 페이지)
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


