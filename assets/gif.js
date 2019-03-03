// topics to display
var topics = ['batman', 'spider-man', 'wolverine'];

function renderButtons() {
  var buttonsRendered = [];
  topics.forEach(function(topic) {
    var bttnContainer = $('<li>');
    var bttn = $('<button>')
                .addClass('showMeTheGiphy')
                .attr('data-gif', topic)
                .text(topic)
    bttnContainer.append(bttn);
    buttonsRendered.push(bttnContainer)
  })

  $('.topics').empty().append(buttonsRendered)
}


// add button
$('#topic-add').click(function(e) {
  e.preventDefault();
  var newTopic = $('#topic-input').val().trim();
  if (newTopic !== '') {
    topics.unshift(newTopic);
    renderButtons();
  }
  $('#topic-input').val('');
})


$(document).on("click", ".showMeTheGiphy", function() {
  var gif = $(this).attr("data-gif");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
  gif + "&api_key=TCW1jTUIEdZrL78UFfUCHtWVO7VpiHTg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    var gifs = [];

    results.forEach(function(res) {
      var gifDiv = $('<div>');
      var myGif = $('<img>');
      myGif.attr('src', res.images.fixed_height.url);
      gifDiv.append(myGif);
      gifs.push(gifDiv)
    })

    $('#gifsDisplayed').prepend(gifs);
    
  });

})

$(document).ready(function() {
  renderButtons();
})



