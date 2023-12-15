$(function() {
    $('.content-img-banner .banner1:gt(0)').hide();
    setInterval(function(){
      $('.content-img-banner :first-child').fadeOut()
         .next('.banner1').fadeIn()
         .end().appendTo('.content-img-banner');}, 
      4000);
})