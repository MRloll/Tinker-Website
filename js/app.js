$(document).ready(function() {

  //===========================
  // adjusting the nav on scroll
  //===========================
  var nav = $('nav');
  var navList = $('.nav-list');
  var bar = $('.fa-bars');

  $(window).on('scroll load', function () {

    if( $(window).scrollTop() > 200) {
      nav.css({
        background: '#fff',
        color: '#000',
      })
    } else {
      nav.css({
        background: 'transparent',
        color: '#fff',
      })
    }

  });

  //===========================
  // scroll to clicked section at nav
  //===========================
  var navHeight = $('nav').innerHeight();
  $('nav .nav-list a').on('click', function() {
    $('html, body').animate({
      scrollTop: $($(this).data('id')).offset().top - navHeight
    }, 1000)
  });



  //===========================
  // adjusting header height
  //===========================
  $(window).on('resize load', function() {
    $('header').css({
      height: $(window).height()
    })
  })


  //===========================
  // slide toggle the nav list
  //===========================
  $(bar).on('click', function () {
    $(navList).slideToggle(300);
  });



  //===========================
  // adjusting the header * the moving bg *
  //===========================
  let container = $('header'),
      image = $('.bg');

  
    var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 5 / 30;

  function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
    
    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
  
    $(image).css({
      '-webit-transform': translate,
      '-moz-transform': translate,
      'transform': translate
    });
  
    window.requestAnimationFrame(moveBackground);
  }
  
  $(window).on('mousemove click', function(e) {
  
    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;
  
  });
  
  moveBackground();
  
  // $(container).on('mousemove', moveBackgound)

  //===========================
  //  shuffle images
  //===========================
  let a = $('.portfolio li a');

  a.on('click', function (e) {
    e.preventDefault();

    var value = $(this).attr('data-class'),
        img = $('.portfolio .img-wrapper');

    $(img).find(value).show();
    $(img).find(".img:not(" + value + ")").hide();
    $(this).addClass('active').parent("li").siblings().find('a').removeClass('active');

    // if (value == "all") {

    //   $('.fliter').show();

    // }else {
    //   $('.filter').not(value).hide();
    //   $('.filter').filter(value).show();
      
    // }

  });

  /*
    00000000000000000000000
    creating images in the overlay deping on
    portfolio images && 
    00000000000000000000000
  */

  let imagesLength = $('.portfolio .img-wrapper .row').children().length;
  let imagesSrc = [];
  let i = 0;

  for (i; i < imagesLength; i++) {

    imagesSrc.push($('.portfolio .img-wrapper .row .img').eq(i).find('img').attr('src'))

    $('.overlay .img .wrap').append("<img src=" + imagesSrc[i] + " alt='image' class='img-thumbnail' />")
  }

  //0000000000000000000000000000000000000000000000
  //==============================================
  //  adjusting the overlay & displaying the image
  //==============================================
  //0000000000000000000000000000000000000000000000
  let overlay = $('.overlay')

  //setting the height of the overlay to the the whole document
  $(window).on('resize load', function () {
    $(overlay).height($(document).innerHeight())
  });

  $('.portfolio .img a').on('click', function (e) {
    e.preventDefault();

    //**********
    // prevent scrolling
    //========
    //  Grab current scroll position (don't forget horizontal axis!).
    //========
    var scrollPosition = [
      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];

    //========
    //  saving the over flow in data class
    //========
    var html = jQuery('html'); 
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    //========
    //  displaying the clicked image 
    //  in the overlay deping on it's index
    //========
    let clickedIndex =   $(this).parent().index();
    $('.overlay img').eq(clickedIndex).addClass('active').siblings().removeClass('active');

    //========
    //  set overlflow  hidden & display the overlay
    //========
    html.css('overflow', 'hidden');
    $(overlay).fadeIn().find('img').eq(clickedIndex).fadeIn()
    $('.overlay .wrapper').css('display', 'flex')
    //**********
    // un-lock scrolling and hide the overlay 
    //**********
    $('.overlay, .overlay a').click(function(e) {
      e.preventDefault();
      $('.overlay').fadeOut();
      $('.overlay .wrapper').css('display', 'none')
      //removing the active calss from images when aborting the overlay
      $('.overlay .img .wrap img.active').removeClass('active').fadeOut();

      var html = jQuery('html');
      var scrollPosition = html.data('scroll-position');
      html.css('overflow', html.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1])
    });
  });

  //stop propagation on the image itself
  $('.overlay .img').click(function (e) {
    e.stopPropagation()
  });

  /*
    00000000000000000000000
    swape between images when click on cheveron
    00000000000000000000000
  */
  let cheveronLeft = $('.overlay .img .fa-chevron-left');
  let cheveronRight= $('.overlay .img .fa-chevron-right');
 
  //========
  //  when clicking on right cheveron
  //========
  $(cheveronRight).on('click', function () {

    let activeImage = $('.overlay .img .wrap img.active');
    if (!activeImage.is(':last-child')) {

      activeImage.fadeOut(function () {

        $(this).removeClass('active').next().fadeIn(function () {

          $(this).addClass('active');
        })

      });      
    } else {

      activeImage.fadeOut(function () {

        $(this).removeClass('active').siblings().eq(0).fadeIn(function () {
          
          $(this).addClass('active');
        })
      });      
    }
  })

  //========
  //  when clicking on left cheveron
  //========
  $(cheveronLeft).on('click', function () {

    let activeImage = $('.overlay .img .wrap img.active');

    if (!activeImage.is(':first-child')) {

      activeImage.fadeOut(function () {

        $(this).removeClass('active').prev().fadeIn(function () {

          $(this).addClass('active');
        })

      });      
    } else {

      activeImage.fadeOut(function () {

        $(this).removeClass('active').siblings().eq(-1).fadeIn(function () {
          
          $(this).addClass('active');
        })
      });      
    }
  })
  //0000000000000000000000000000000000000000000000
  //==============================================
  //              end the overlay 
  //==============================================
  //0000000000000000000000000000000000000000000000


  
  /*
    00000000000000000000000
    start testemonials
    00000000000000000000000
  */
  $('.slider .items').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: false,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false

  });
  
  /*
    00000000000000000000000
          start blogs
    00000000000000000000000
  */
  $('.blog li a').on('click', function(e) {
    e.preventDefault();
    var blogIndex = $(this).attr('data-index');

    //fade in the clicked blog & fade out the current one
    if(!$(this).hasClass('active')) {

      $('.blog .img-wrapper .blog-content.active').fadeOut(function() {

        $(this).removeClass('active');
        $('.blog .img-wrapper .blog-content').eq(blogIndex).fadeIn().addClass('active');
      })

      //change the active class from link to the clicked one
      $(this).addClass('active').parent().siblings().find('a').removeClass('active')
    }
  });

    /*
    00000000000000000000000
          start contact us
    00000000000000000000000
    */
  $('.contact-us').on('click', function() {
    $(overlay).fadeIn();
    $('.contact-form').css('display', 'flex');
    
    $('.overlay, .contact-form i').on('click', function() {
      $(overlay).fadeOut();
      $('.contact-form').css('display', 'none');
    });
   
    $('.contact-form form').click(function(e) {
      e.stopPropagation()
    });
  
  });

    /*
    00000000000000000000000
          start footer
    00000000000000000000000
    */
   $(window).on('load resize', function() {

    $('body').css({
      marginBottom:  $('footer').innerHeight()
    })

   })
});
