$(document).ready(function() {
  console.log("Ready for Javascript");

  // $( "#tweet-text" ).click(function() {
  //   console.log("You clicked and event.target is: ", event.target);
  // });

$("#tweet-text").on('keyup', function(event) {
  const remainingChars = 140 - $(this).val().length;
  const charCounter = $('.counter').text(`${remainingChars}`);
  if (remainingChars < 0) {
    charCounter.addClass('color-red');
  } else
  charCounter.removeClass('color-red');
})

});








/*
const createTweet = function(tweetsDB) {
  return `<article class="Tweet">
  ${tweetsDB.name} is a ${something}
  </article>`
}

//to load every tweet in the DB
tweetsDB.forEach(tweet => {
  $container.append(createTweet(tweetsDB))
})
//To load one tweet in the DB
$container.append(createTweet(tweetsDB))
*/