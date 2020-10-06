$(document).ready(function() {
  console.log("Ready for Javascript");

  $(".tweet").on('mouseover', function(event) {
      const handleName = "@SirIsaac"
      $('#handle').text(handleName);
      $('#handle').addClass('.tweet:hover');
  });

  $(".tweet").on('mouseout', function(event) {
    $('#handle').text("");
    $('#handle').removeClass('.tweet:hover');
});

});