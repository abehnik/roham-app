$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        $("header").css("top", "-130px");
    } else {
        $("header").css("top", "0");
    }
    if ($(this).scrollTop() > 800) {
        $("header").addClass("scroll");
    } else if ($(this).scrollTop() <= 800) {
        $("header").removeClass("scroll");
    }
    if ($(window).width() < 1200) {
        $("header").removeClass("scroll");
        $("header").css("top", "0");
    }
    if ($(this).scrollTop() > 2000) {
        $("#toTop").addClass("fixed");
    } else if ($(this).scrollTop() <= 2000) {

        $("#toTop").removeClass("fixed");
    }
    var body_sc = $(this).scrollTop();
    $('.small-logo,.rotate-icon').css('transform', 'rotate(' + 2 * body_sc + 'deg)');

    $('.product-text').css('transform', 'translateY(-' + body_sc / 3 + 'px)');
    $('#About,.about-goal').css('background-position', '  center calc(50% + ' + ($(window).scrollTop() * 0.1) + 'px');

});



//main js

$(document).ready(function () {
    $(function () {
        var oTop = $('.counter').offset().top - window.innerHeight;
        $(window).scroll(function () {
            var pTop = $(window).scrollTop();
            if (pTop > oTop) {
                $('.counter').each(function () {
                    var $this = $(this),
                        countTo = $this.attr('data-count');

                    $({ countNum: $this.text() }).animate({
                        countNum: countTo
                    },
                        {
                            duration: 3000,
                            easing: 'linear',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                                //alert('finished');
                            }
                        });
                });
            }
        });
    });
    $(function () {
        var oTop = $('.circle-product').offset().top - window.innerHeight;
        $(window).scroll(function () {
            var pTop = $(window).scrollTop();
            if (pTop > oTop) {
                $('.circle-product').each(function () {
                    $('.circle-product').addClass('active');


                });

            }
        });
    });

    ////--------------banner
    options = {
        items: 1,
        singleItem: true,
        nav: false,
        dots: true,
        center: true,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        stopOnHover: true,
        autoplayTimeout: 11000,
        slideSpeed: 5000,
        rewindSpeed: 8000,
        //animateIn: 'fadeIn',
        animateOut: 'fadeOut',

    };
    if ($('.banner .item').length > 1) {
        options = {
            items: 1,
            singleItem: true,
            nav: false,
            dots: true,
            center: true,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            autoplaySpeed: 1500,
            stopOnHover: true,
            autoplayTimeout: 11000,
            slideSpeed: 5000,
            rewindSpeed: 8000,
            //animateIn: 'fadeIn',
            animateOut: 'fadeOut',



        };
    };
    $('.banner').owlCarousel(options);


    ////--------------About
    options1 = {
        items: 4,
        singleItem: false,
        nav: false,
        dots: false,
        rtl: false,
        center: false,
        loop: false,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        autoplayTimeout: 5000,
        slideSpeed: 1000,
        rewindSpeed: 8000,
        responsive: {
            0: { items: 1 },
            550: { items: 2 },
            900: { items: 3 },
            1200: { items: 4 },
        }
    };
    if ($('#About-Carousel .item').length > 4) {
        options1 = {
            items: 4,
            singleItem: false,
            nav: false,
            dots: false,
            rtl: false,
            center: false,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            autoplaySpeed: 800,
            autoplayTimeout: 5000,
            slideSpeed: 1000,
            rewindSpeed: 8000,
            responsive: {
                0: { items: 1 },
                550: { items: 2 },
                900: { items: 3 },
                1200: { items: 4 },

            }
        };
    }
    $('#About-Carousel').owlCarousel(options1);

    ////--------------Counter-Carousel

    options2 = {
        items: 3,
        singleItem: false,
        nav: false,
        dots: false,
        rtl: false,
        center: false,
        loop: false,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        autoplayTimeout: 5000,
        slideSpeed: 1000,
        rewindSpeed: 8000,
        responsive: {
            0: { items: 1 },
            740: { items: 2 },
            1100: { items: 3 },

        }
    };
    if ($('#Counter-Carousel .item').length > 3) {
        options2 = {
            items: 3,
            singleItem: false,
            nav: false,
            dots: false,
            rtl: false,
            center: false,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            autoplaySpeed: 800,
            autoplayTimeout: 5000,
            slideSpeed: 1000,
            rewindSpeed: 8000,
            responsive: {
                0: { items: 1 },
                740: { items: 2 },
                1100: { items: 3 },

            }
        };
    }
    $('#Counter-Carousel').owlCarousel(options2);

    ////--------------Product

    options3 = {
        items: 1,
        singleItem: true,
        nav: true,
        navText: ['<span  class=" slider-left-btn"> </span>', '<span  class=" slider-right-btn"> </span>'],
        navRewind: false,
        dots: true,
        mouseDrag: false,
        center: true,
        loop: false,
        margin: 0,
        autoplay: false,
        autoplayHoverPause: true,
        autoplaySpeed: 5000,
        stopOnHover: true,
        autoplayTimeout: 5000,
        slideSpeed: 5000,
        rewindSpeed: 8000,
        animateOut: 'fadeOut',
    };
    $('#Product-Carousel').owlCarousel(options3);


    ////--------------News

    options4 = {
        items: 1,
        singleItem: true,
        nav: false,
        dots: true,
        center: true,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 1500,
        stopOnHover: true,
        autoplayTimeout: 5000,
        slideSpeed: 5000,
        rewindSpeed: 8000,
        animateOut: 'fadeOut',

    };
    if ($('#News-Carousel .item,#Event-Carousel').length > 1) {
        options4 = {
            items: 1,
            singleItem: true,
            nav: false,
            dots: true,
            center: true,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayHoverPause: true,
            autoplaySpeed: 1500,
            stopOnHover: true,
            autoplayTimeout: 5000,
            slideSpeed: 5000,
            rewindSpeed: 8000,
            animateOut: 'fadeOut',
        };
    }
    $('#News-Carousel,#Event-Carousel').owlCarousel(options4);
    $(".search-toggle ").click(function () {
        $(".search-box").slideToggle();
        $('#search-site').focus();
    });
    
    $("#toTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    
    var video = $(".video-box video").get(0)

  
    $(".video-toggle ").click(function () {
        video.play();
    });
    $(".video-box ").click(function () {
        video.pause();
    });
    $(".video .close").click(function () {
        video.pause();
    });

    $('[data-toggle="tooltip"]').tooltip();
    $(".pakistan").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".pakistan").addClass("active");

    });
    $(".india").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".india").addClass("active");
    });
    $(".spain").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".spain").addClass("active");
    });
    $(".portugal").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".portugal").addClass("active");
    });
    $(".italy").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".italy").addClass("active");
    });
    $(".poland").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".poland").addClass("active");
    });
    $(".belgium").click(function () {
        $(".point,.agancy-item").removeClass("active");
        $(".belgium").addClass("active");
    });
    $('nav ul li').hover(function () {

        if ($(window).width() >= 1199) {
            $(this).addClass('open');
        }
    }, function () {
        if ($(window).width() >= 1199) {
            $(this).removeClass('open');
        }
    });
    $(".navbar-toggle").click(function () {
        //$(".dropdown").removeClass('open');
        $('.menu-btn').toggleClass('active');
    });
    $(function () {
        $('#search-site').focus(function () {

            console.log($(this).val())
            if ($(this).val() == Se)
                $(this).val('');
        });
        $('#search-site').blur(function () {
            if ($(this).val() == '')
                $(this).val(Se);
        });
        Se = $('#search-site').val();

    });
    function SearchClick(SearchTitle) {
        if ($('#search-site').val() == Se || $('#search-site').val().trim() == '') {
            alert(SearchTitle);
            return false;
        }

    }

    //chart Product
    $("#Chart-Carousel .carousel-inner .item:eq(0)").addClass("active")

});
$(window).on('load', function () {
    //$(this).impulse({ range: 200, tempo: 600 });
});
