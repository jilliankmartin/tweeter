
$(document).ready(function() {

  //Takes in a unix timestamp and outputs a string that represents how long ago that unix timestamp was in the past from the current time, in the correct second/minute/hour/day/week/year format
  // Minor bug means the code doesn't handle singular time units, e.g. "1 Day Ago" will return as "1 Days ago"
  const getTimeCreatedAt = function(time) {
    const currentDate = Date.now();
    const timePassedSeconds = (currentDate - time) / 1000;
    const timePassedMinutes = (currentDate - time) / 1000 / 60;
    const timePassedHours = (currentDate - time) / 1000 / 60 / 60;
    const timePassedDays = (currentDate - time) / 1000 / 60 / 60 / 24;
    const timePassedWeeks = (currentDate - time) / 1000 / 60 / 60 / 24 / 7;
    const timePassedYears = (currentDate - time) / 1000 / 60 / 60 / 24 / 7 / 52;

    if (timePassedSeconds < 60) {
      return `${Math.floor(timePassedSeconds)} seconds ago`;
    } else if (timePassedMinutes > 1 && timePassedMinutes < 60) {
      return `${Math.floor(timePassedMinutes)} minutes ago`;
    } else if (timePassedHours > 1 && timePassedHours < 24) {
      return `${Math.floor(timePassedHours)} hours ago`;
    } else if (timePassedDays > 1 && timePassedDays < 7) {
      return `${Math.floor(timePassedDays)} days ago`;
    } else if (timePassedWeeks > 1 && timePassedWeeks < 52) {
      return `${Math.floor(timePassedWeeks)} weeks ago`;
    } else if (timePassedYears > 1) {
      return `${Math.floor(timePassedYears)} years ago`;
    }
  };

  //Generates the Jquery object representing the tweet which can then be used to render tweets to the page
  const createTweetElement = function(tweet) {
    const html =
      `   <article class="tweet">
              <header>
                <div>
                  <img src="${tweet.user.avatars}">
                  <span>&nbsp ${tweet.user.name}</span>
                </div>
                <p id="handle">${tweet.user.handle}</p>
              </header>
              <p>
                ${escape(tweet.content.text)}
              </p>
              <footer>
                <div>${getTimeCreatedAt(tweet.created_at)}</div>

                <div>&#9873 &#8634 &#9829</div>
              </footer>
          </article>
      `;
    
    let $tweet = $(`${html}`);
    
    return $tweet;
  };

  //Loops over the submitted tweets, passes them to the function that creates the injectable html and renders what is returned on the page
  const renderTweets = function(tweets) {

    const $container = $('#tweets-container');

    $container.empty();
    tweets.forEach(tweet => $container.prepend(createTweetElement(tweet)));
  };

  //Takes in raw user input and outputs text that is safe from xss attacks
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //handles post submission for new tweet, including errors if the user inputs invalid things
  $(function() {

    const $tweetText = $('#tweet-text');
    const maxTweet = 140;

    $('.new-tweet').on('submit', function() {
      event.preventDefault();
      const rawTweetInput = $tweetText.val();
      const tweetContent = $tweetText.serialize();
      if (!rawTweetInput || rawTweetInput === " ") {
        $('.error-no-input').slideDown("slow");
      } else if (rawTweetInput.length > maxTweet) {
        $('.error-max-chars').slideDown("slow");
      } else {
        $.ajax('/tweets', {
          method: 'POST',
          data: tweetContent,
        })
          .then(function() {
            $('textarea').val("");
            $('.counter').text(maxTweet);
            $('.new-tweet div').slideUp();
            loadTweets();
          });
      }
    });
  });

  //changes write new tweet button if its hovered on
  $(function() {

    const $newTweet = $('#new-tweet-nav');
    const $headerSticky = $("#header-sticky button");

    $newTweet.on('mouseover', function() {
      $headerSticky.addClass('tweeter-hovered');
    });
    $newTweet.on('mouseleave', function() {
      $headerSticky.removeClass('tweeter-hovered');
    });
  });

  //drops the new tweet input down if a user clicks the button in nav
  $(function() {
    const $newTweet = $('.new-tweet')
    let tweetOpened = false;
    $('#new-tweet-nav').on('click', function() {
      if (tweetOpened) {
        $newTweet.slideUp();
        tweetOpened = false;
      } else {
        $newTweet.slideDown("slow");
        $('textarea').focus();
        tweetOpened = true;
      }
    });
  });

  //  hides error messages on page load
  $(".error-no-input").hide();
  $(".error-max-chars").hide();

  //hides the tweet container on page load (until a user drops it down using the button)
  $(".new-tweet").hide();


  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
    })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  //initial call on load to load existing tweets
  loadTweets();
});