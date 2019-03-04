// topics to display
var starterTopics = ['elephant', 'alligator', 'elephant', 'monkey', 'dog', 'cat'];
var topics = [];
var trending = false;

function renderButtons() {
  var buttonsRendered = [];
  topics.forEach(function(topic) {
    var bttnContainer = $('<li>');
    var bttn = $('<button>')
                .addClass('showMeTheGiphy')
                .attr('data-gif', topic)
                .text(topic);
    var remove = $('<button>')
                  .addClass('remove')
                  .attr('data-remove', topic)
                  .text('-');
    bttnContainer.append(bttn, remove);
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


function getGifs(gif) {
  var queryURL = '';
  var gifTitle = '';

  if (gif !== undefined) {
    if (trending === true) {
      $('#gifsContainer').empty();
      trending = false;
    }
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=TCW1jTUIEdZrL78UFfUCHtWVO7VpiHTg&rating=pg&limit=10&offset=0";
    gifTitle = gif;
  } else {
    queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=TCW1jTUIEdZrL78UFfUCHtWVO7VpiHTg&rating=pg&limit=10";
    gifTitle = 'Some trending GIFs to get you started';
    trending = true;
  }

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    var gifHolder = $('<div>').addClass('gifHolder');
    var title = $('<h2>').text(gifTitle);
    gifHolder.append(title);
    results.forEach(function(res) {
      var gifDiv = $('<div>').addClass('gifContainer');
      var myGif = $('<img>').addClass('gif');
      myGif.attr('src', res.images.fixed_height_still.url);
      myGif.attr('data-src-still', res.images.fixed_height_still.url);
      myGif.attr('data-src-gif', res.images.fixed_height.url);
      myGif.attr('data-state', "still");
      gifDiv.append(myGif);
      gifHolder.append(gifDiv);
    })
    
    $('#gifsContainer').prepend(gifHolder);
    $('#gifsDisplayed').scrollTop($('#gifsDisplayed').scrollTop() + $('#gifsContainer').position().top - 40);
    
  });
  
}

$(document).on("click", ".showMeTheGiphy", function() {
  var gif = $(this).attr("data-gif");
  getGifs(gif);
});

$(document).on("click", ".remove", function() {
  var myTopic = $(this).attr('data-remove');
  var myIndex = topics.indexOf(myTopic)
  topics.splice(myIndex, 1);
  renderButtons();
});


$(document).on("click", ".gif", function() {
  if ($(this).attr('data-state') === 'still') {
    $(this).attr('src', $(this).data('src-gif'));
    $(this).attr('data-state', 'playing');
  } else {
    $(this).attr('src', $(this).data('src-still'));
    $(this).attr('data-state', 'still')
  }
})

$('.saveLink').click(function(e) {
  e.preventDefault();
});

$('.editLink').click(function(e) {
  e.preventDefault();
});





$(document).ready(function() {
  topics = (!topics.length) ? starterTopics : topics;
  renderButtons();
  getGifs();
})



