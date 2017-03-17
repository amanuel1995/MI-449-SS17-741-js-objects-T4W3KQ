// declare vaiables and extract items by selectors
var newJokeKey = document.getElementById('new-joke-key')
var newJokeSetup = document.getElementById('new-joke-setup')
var newJokePunchline = document.getElementById('new-joke-punchline')
var addNewJoke = document.getElementById('save-button')
var deleteJokeKey = document.getElementById('delete-joke-key').value
var deleteThisJoke = document.getElementById('delete-button')
var jokeSavedNotice = document.getElementById('notice-box')
var addJokeAtIndex = 0
// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// create array to store keys in it
var arrayOfJokes = ['the horse', 'Orion\'s pants']

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')

// function to check existing joke and display
var updateDisplayedJoke = function () {
  if ((requestedJokeInput.value !== null) && (requestedJokeInput.value !== '')) {
    var i
    for (i = 0; i < arrayOfJokes.length; i++) {
      if (arrayOfJokes[i] === requestedJokeInput.value) {
        var requestedJokeKey = requestedJokeInput.value
        jokeBox.textContent = (jokes[requestedJokeKey].setup + '\n' + jokes[requestedJokeKey].punchline) || (noJokesMessage)
      }
    }
  } else {
    jokeBox.textContent = 'No matching jokes found.'
  }
}

// Function to keep track of all page updates to  call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// Update the page immediately on startup
updatePage()
// var stringifiedJokes = window.localStorage.getItem('jokes')
// jokes = JSON.parse(stringifiedJokes)

// add new joke object to jokes object/struct
var saveNewJoke = function () {
  // create new joke object inside jokes
  jokes[newJokeKey.value] = {
    'setup': '',
    'punchline': ''
  }

  // assign values to each attributes of th joke object
  jokes[newJokeKey.value].setup = newJokeSetup.value
  jokes[newJokeKey.value].punchline = newJokePunchline.value
  arrayOfJokes[addJokeAtIndex + arrayOfJokes.length] = newJokeKey.value
  jokeSavedNotice.textContent = 'Joke Saved.'

  // update jokes menu again
  updateJokesMenu()

  // save updated version of jokes in the localstorage
  // var stringifiedJokes = JSON.stringify(jokes)
  // window.localStorage.setItem('jokes', stringifiedJokes)
}

// Keep the requested joke up-to-date with event listeners
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addNewJoke.addEventListener('click', saveNewJoke)
