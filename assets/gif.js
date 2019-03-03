// topics to display
var starterTopics = ['batman', 'spider-man', 'wolverine'];
var topics = [];

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
    console.log(results)

    results.forEach(function(res) {
      var gifDiv = $('<div>').addClass('gifContainer');
      var myGif = $('<img>').addClass('gif');
      myGif.attr('src', res.images.fixed_height_still.url);
      myGif.attr('data-src-still', res.images.fixed_height_still.url);
      myGif.attr('data-src-gif', res.images.fixed_height.url);
      myGif.attr('data-state', "still");
      gifDiv.append(myGif);
      gifs.push(gifDiv)
    })

    $('#gifsDisplayed').prepend(gifs);
    
  });
})

$(document).on("click", ".gif", function() {
  if ($(this).attr('data-state') === 'still') {
    $(this).attr('src', $(this).data('src-gif'));
    $(this).attr('data-state', 'playing');
  } else {
    $(this).attr('src', $(this).data('src-still'));
    $(this).attr('data-state', 'still')
  }
})



$(document).ready(function() {
  topics = (!topics.length) ? starterTopics : topics;
  renderButtons();
})



