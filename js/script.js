//use this for adaptive single slide
$(document).ready(function(){
    $('.card_container').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        // adaptiveHeight: true
    });
});


// use this for adaptive multy slide
$(document).ready(function(){
    // my slick slider options
    var options = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: false,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false
              }
            }
        ]
      };
      // my slick slider as constant object
      const mySlider = $('.testimonials__carousel').on('init', function(slick) {
  
        // on init run our multi slide adaptive height function
        multiSlideAdaptiveHeight(this);
  
      }).on('beforeChange', function(slick, currentSlide, nextSlide) {
  
        // on beforeChange run our multi slide adaptive height function
        multiSlideAdaptiveHeight(this);
  
      }).slick(options);
  
  
      // our multi slide adaptive height function passing slider object
      function multiSlideAdaptiveHeight(slider) {
  
        // set our vars
        let activeSlides = [];
        let tallestSlide = 0;
        // set item margin bottom 
        let marginBottomItem = 35;
  
        // very short delay in order for us get the correct active slides
        setTimeout(function() {
  
          // loop through each active slide for our current slider
          $('.slick-track .slick-active', slider).each(function(i) {
  
            // add current active slide height to our active slides array
            activeSlides[i] = $(this).outerHeight();
  
          });
  
          // for each of the active slides heights
          activeSlides.forEach(function(item) {
  
            // if current active slide height is greater than tallest slide height
            if (item > tallestSlide) {
  
              // override tallest slide height to current active slide height
              tallestSlide = item;
  
            }
  
          });
  
          // set the current slider slick list height to current active tallest slide height
          $('.slick-list', slider).height(tallestSlide+marginBottomItem);
  
        }, 10);
  
      }
  
  
      // when window is resized
      $(window).on('resize', function() {
  
        // run our multi slide adaptive height function incase current slider active slides change height responsively
        multiSlideAdaptiveHeight(mySlider);
  
      });
  
  
});

  
  
$(document).ready(function(){
    $('.exper__img').hover(function(){
        $(this).find('.exper__hoover').toggleClass('active');
    });
});
$(document).ready(function(){
    const top_nav_menu = document.querySelector('.top_nav_menu');
    const header_nav = document.querySelector('.header');
    const body = document.querySelector('body');
    const burger = document.querySelector('.burger');
    $('.burger').click(function(event){
        $('.top_nav_menu').toggleClass('top_nav_menu_active');
        $('.header').toggleClass('header_nav_stick_tothe_top');
        $(this).toggleClass('active_burger');
        $('body').toggleClass('lock');
        $('.about').toggleClass('zindex');  
        $('.recipes').toggleClass('zindex');  
        $('.top_nav_ul').click(function(event){
            top_nav_menu.classList.remove('top_nav_menu_active');
            header_nav.classList.remove('header_nav_stick_tothe_top');
            burger.classList.remove('active_burger');
            body.classList.remove('lock');
            $('.about').removeClass('zindex');
            $('.recipes').removeClass('zindex');
        });
    });
});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() != 0)
        $('#jumbBtn').fadeIn();
        else
        $('#jumbBtn').fadeOut();
    });
    $('#jumbBtn').click(function(){
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});
(function(){
    if(!Element.prototype.closest){
        Element.prototype.closest = function(css){
            let node = this;
            while(node){
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function(){
    if(!Element.prototype.matches){
        Element.prototype.matches = Element.prototype.matchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();

(function(){
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const elToAddPad = document.querySelectorAll('section');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const lockMargin = document.querySelectorAll('.lock-margin');
    let unlock = true;
    const timeout = 800; //this parametr has to be the same as transforme in your css ex: transition: all .8s ease 0s;
    let forms = document.querySelectorAll('.footer-form');

    

    if(popupLinks.length > 0){
        for(let i = 0; i < popupLinks.length; i++){
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function(e){
                const popupName = popupLink.getAttribute('popup-id');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            }); 
        }
    }
    const popupCloseIcons = document.querySelectorAll('.close-popup');
    if(popupCloseIcons.length > 0){
        for(let i = 0; i < popupCloseIcons.length; i++){
            const popupCloseIcon = popupCloseIcons[i];
            popupCloseIcon.addEventListener('click', function(e){
                popupClose(popupCloseIcon.closest('.popup'));
                e.preventDefault();
            }); 
        }
    }
    function popupOpen(currentPopup){
        if(currentPopup && unlock){
            const popupActive = document.querySelector('.popup.popup-active');
            popupActive ? popupClose(popupActive, false) : bodyLock();
            

            currentPopup.classList.add('popup-active');
            currentPopup.addEventListener('click', function(e){
                if(!e.target.closest('.popup__content')){
                    popupClose(e.target.closest('.popup'));
                }
                e.preventDefault();
            })
        }
    }
    
    function popupClose(popupActive, doUnlock){
        doUnlock = (doUnlock === undefined) ? true : doUnlock;
        if(unlock){
            popupActive.classList.remove('popup-active');
            if(doUnlock){
                bodyUnlock();
            }
        }
    }
    function bodyLock(){
        const lockPaddingVal = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
        if(lockPadding.length > 0){
            for(let i=0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingVal;
            }
            
        }
        if(lockMargin.length > 0){
            for(let i=0; i < lockMargin.length; i++){
                const el = lockMargin[i];
                el.style.marginRight = lockPaddingVal;
            }
            
        }
        body.classList.add('lock');
        // body.style.paddingRight = lockPaddingVal; //to use comment bottom if section and next 2 lines

        if(elToAddPad.length > 0){
            for(let i=0; i < elToAddPad.length; i++){
                const el = elToAddPad[i];
                el.style.paddingRight = lockPaddingVal;
            }
            
        }
        header.style.paddingRight = lockPaddingVal;
        footer.style.paddingRight = lockPaddingVal;

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }
    function bodyUnlock(){
        setTimeout(function(){
            if(lockPadding.length > 0){
                for(let i=0; i < lockPadding.length; i++){
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            if(lockMargin.length > 0){
                for(let i=0; i < lockMargin.length; i++){
                    const el = lockMargin[i];
                    el.style.marginRight = '0px';
                }
            }
            body.classList.remove('lock');
            // body.style.paddingRight = '0px';  //to use comment bottom if section and next 2 lines
            
            if(elToAddPad.length > 0){
                for(let i=0; i < elToAddPad.length; i++){
                    const el = elToAddPad[i];
                    el.style.paddingRight = '0px';
                }
                
            }
            header.style.paddingRight = '0px';
            footer.style.paddingRight = '0px';
        }, timeout);

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e){
        if(e.which === 27){
            console.log(true);
            const popupActive = document.querySelector('.popup.popup-active');
            if(popupActive === null) {return;}
            popupClose(popupActive);
        }
    });



    if(forms.length === 0){
        return;
    }


    // name=value&name2=value2
    let serialize = function(form){
        let items = form.querySelectorAll('input, select, textarea');
        let str = '';
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let name = item.name;
            let value = item.value;
            let separator = i === 0 ? '' : '&';

            if(value){
                str += separator + name + '=' + value;
            }
        }

        return str;
    }

    let formSend = function(form){
        let data = serialize(form);
        let xhr = new XMLHttpRequest();
        let url = 'mail/mail.php'
        

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            if (this.response === 'success'){
                console.log('form sent successfully')
                const curentPopup = document.getElementById('popupEmailSuccess');
                popupOpen(curentPopup);
                // e.preventDefault();
            }else{
                console.log('some error occurred')
                const curentPopup = document.getElementById('popupEmailError');
                popupOpen(curentPopup);
                // e.preventDefault();
            }
            form.reset();
        }

        xhr.send(data);
    }

    for(let i = 0; i < forms.length; i++){
        forms[i].addEventListener('submit', function(e){
            e.preventDefault();
            let form = e.currentTarget;
            formSend(form);
        })
    }
})();
