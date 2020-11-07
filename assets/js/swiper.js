"use strict";

if( !mainSyngenta )
    var mainSyngenta = {};

mainSyngenta.init = function(){
    console.log('Init Syngenta Berries...');
}

mainSyngenta.homeSwipper = function(){
    let mySwiper = new Swiper('#HomeSwipper', {
        autoplay: {
            delay: 3000,
        },
        effect: 'fade',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    }
    });
}


window.onload = function(){
    mainSyngenta.init();
    mainSyngenta.homeSwipper();
}
