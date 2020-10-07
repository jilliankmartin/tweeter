
$(document).ready(function() {
  console.log("Ready for Javascript");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

const renderTweets = function(tweets) {
  tweets.forEach(tweet => $('#tweets-container').append(createTweetElement(tweet)));
}

const createTweetElement = function(tweet) {
  const html = 
    `   <article class="tweet">
            <header>
              <div>
                <img src="${tweet.user.avatars}">
                <span>&nbsp ${tweet.user.name}</span>
              </div>
              <p id="handle"></p>
            </header>
            <p>
              ${tweet.content.text}
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

renderTweets(data);

$(".tweet").on('mouseover', function(event) {
  const handleName = `${data.user.handle}`
  $('#handle').text(handleName);
  $('#handle').addClass('.tweet:hover');
});

$(".tweet").on('mouseout', function(event) {
$('#handle').text("");
$('#handle').removeClass('.tweet:hover');
});

});