function animateItems(items){
    items.each(function(item){
        var $this = $(this)
        setTimeout(function(){
            $this.addClass('animate');
        },100 * item);
    });
}

animateItems($('content__list'));

function isFullyVisible(element){
    var bottomOfElement = element.offset().top + element.height(); 
    var isVisible = (bottomOfElement <= ($(window).scrollTop() + $(window).height()));
    return isVisible;
}

$(window).scroll(function(){
    if(isFullyVisible($('.li').first())){
        animateItems($('.li'));
    }
});