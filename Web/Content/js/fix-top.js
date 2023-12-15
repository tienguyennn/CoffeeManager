jQuery(function($) {
    function fixDiv() {
      var $cache = $('#menu');
      if ($(window).width() > 993) {
          if ($(window).scrollTop() > 200)
              $cache.css({
                  'position': 'fixed',
                  'top': '0px',
                  'box-shadow': '1px 3px 5px #ccc',
              });
          else
              $cache.css({
                  'position': 'static',
                  'top': 'auto'
              });
      } else {
          if ($(window).scrollTop() > 200)
              $cache.css({
                  'position': 'fixed',
                  'top': '0px',
                  'box-shadow': '1px 3px 5px #ccc',
              });
          else
              $cache.css({
                  'position': 'static',
                  'top': 'auto'
              });
      }

    var $top = $('#banner-tops');
    if ($(window).width() < 993) {
        if ($(window).scrollTop() > 200)
            $top.css({
                'position': 'fixed',
            });
        else
            $top.css({
                'position': 'absolute',
                'top': 'auto'
            });
    }
    
  
  }
  $(window).scroll(fixDiv);
  fixDiv();
});