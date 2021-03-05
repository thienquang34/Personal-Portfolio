$(document).ready(function(){    
    $('body').scrollspy({target: ".navbar", offset: 85});
    $(".scroll a").on('click', function(event){
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 60
    }, 700, function(){
    });
  });
});