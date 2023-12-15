jQuery(function($) {
    function fixDiv() {
      var $cache = $('#formKeKhai table tr:first-child td');
      if ($(window).width() > 993) {
          if ($(window).scrollTop() > 200)
              $cache.css({
                  'position': 'sticky',
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

  }
  $(window).scroll(fixDiv);
  fixDiv();
});