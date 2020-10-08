$(document).ready(function() {
  
  //controls the movement of the tweet character counter as a user types
  $("#tweet-text").on('keyup', function(event) {
    const remainingChars = 140 - $(this).val().length;
    const charCounter = $('.counter').text(`${remainingChars}`);
    if (remainingChars < 0) {
      charCounter.addClass('color-red');
    } else
      charCounter.removeClass('color-red');
  });

});