$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 900,
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/chevron-right-solid.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                dots: false
              }
            }
          ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
        });
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      //modal

      $('[data-modal=consultat]').on('click', function() {
        $('.overlay, #consultat').fadeIn();
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultat, #order, #thanks').fadeOut();
      });
      $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn();
      });
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn();
        });
      });

      window.addEventListener('DOMContentLoaded', () => {
        const menu = document.querySelector('.header__menu'),
        menuItem = document.querySelectorAll('.header__menu-item'),
        hamburger = document.querySelector('.header__hamburger');
    
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('header__hamburger_active');
            menu.classList.toggle('header__menu_active');
        });
    
        menuItem.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.toggle('header__hamburger_active');
                menu.classList.toggle('header__menu_active');
            });
        });
    });

    function validateForms(form){
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста введите свое имя",
          phone: "Пожалуйста введите свой номер телефона",
          email: {
            required: "Пожалуйста введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      }
      );
    }
    
    validateForms('#order form');
    validateForms('#consultat form');
    validateForms('#main form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();

      if(!$(this).valid()) {
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultat, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.scroll').fadeIn();
      } else {
        $('.scroll').fadeOut();
      }
    });

    $("a[href^='#']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
});
