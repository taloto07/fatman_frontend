(function($) {
	//************************************************************************************
  // hide/show navbar
  // $("div.navbar-fixed-top").autoHidingNavbar();

  var didScroll;

  // on scroll, let the interval function know the user has scrolled
  $(window).scroll(function(event){
    didScroll = true;
  });

  // run hasScrolled() and reset disScroll status
  setInterval(function(){
    if (didScroll){
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $("div.navbar-fixed-top").outerHeight();
  function hasScrolled(){
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;
    // if current position > last position and scrolled past navbar
    if (st > lastScrollTop && st > navbarHeight){
      // alert('scolldown');
      $("div.navbar-fixed-top").removeClass('nav-down').addClass('nav-up');
    }else{
      // scroll up
      // if did not scroll past the document (possible on mac)
      if ((st + $(window).height()) < $(document).height()){
        // alert("scrollup");
        $('div.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');
      }
    }

    lastScrollTop = st;
  }

  //************************************************************************************


})(jQuery);