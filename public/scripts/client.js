
$(document).ready(function() {

  const getTimeCreatedAt = function(time) {
    const currentDate = Date.now();
    const timePassedSeconds = (currentDate - time) / 1000
    const timePassedMinutes = (currentDate - time) / 1000 / 60
    const timePassedHours = (currentDate - time) / 1000 / 60 / 60
    const timePassedDays = (currentDate - time) / 1000 / 60 / 60 / 24
    const timePassedWeeks = (currentDate - time) / 1000 / 60 / 60 / 24 / 7
    const timePassedYears = (currentDate - time) / 1000 / 60 / 60 / 24 / 7 / 52

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
  }

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
      `
    
    let $tweet = $(`${html}`);
    
    return $tweet;
  }

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => $('#tweets-container').prepend(createTweetElement(tweet)));
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $(function() {
    $('.new-tweet').on('submit', function() {
      event.preventDefault();
      const rawTweetInput = $('#tweet-text').val();
      const tweetContent = $('#tweet-text').serialize();
      if (!rawTweetInput) {
        alert("You must write something to make a tweet");
      } else if (rawTweetInput.length > 140) {
        alert("Your tweet is over 140 characters");
      } else {
        $.ajax('/tweets', { 
          url: '/tweets',
          method: 'POST',
          data: tweetContent,
        })
        .then(function() {
          loadTweets();
        });
      }
    });
  });

  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
    })
    .then(function(tweets) {
      renderTweets(tweets)
    });
  };

  loadTweets();

});