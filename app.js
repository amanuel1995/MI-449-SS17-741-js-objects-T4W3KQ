// declare vaiables and extract items by selectors
var newJokeKey = document.getElementById('new-joke-key')
var newJokeSetup = document.getElementById('new-joke-setup')
var newJokePunchline = document.getElementById('new-joke-punchline')
var addNewJoke = document.getElementById('save-button')
var deleteJokeKey = document.getElementById('delete-joke-key')
var deleteThisJoke = document.getElementById('delete-button')
var jokeSavedNotice = document.getElementById('saved-notice')
var jokeDeletedNotice = document.getElementById('delete-notice')
var addJokeAtIndex = 0
var stringifiedJokes
var stringifiedJokesArray
var jokes = {}
var arrayOfJokes = []
var initFlag = 0

stringifiedJokes = JSON.stringify(jokes)
stringifiedJokesArray = JSON.stringify(arrayOfJokes)

if (parseInt(window.localStorage.getItem('flag')) !== 1) {
  window.localStorage.setItem('arrayOfJokes', stringifiedJokesArray)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// A couple jokes to start with or parse localStorage
if (window.localStorage.getItem('jokes') === '{}') {
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
} else {
  jokes = JSON.parse(window.localStorage.getItem('jokes'))
}
// create or retrieve existing array to store the joke keys
if (window.localStorage.getItem('arrayOfJokes') === '[]') {
  arrayOfJokes = ['the horse', 'Orion\'s pants']
} else {
  arrayOfJokes = JSON.parse(window.localStorage.getItem('arrayOfJokes'))
}
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

// function to check existing joke and display it when searched for
var updateDisplayedJoke = function () {
  if ((requestedJokeInput.value !== null) && (requestedJokeInput.value !== '')) {
    var i
    for (i = 0; i < arrayOfJokes.length; i++) {
      if (arrayOfJokes[i] === requestedJokeInput.value) {
        var requestedJokeKey = requestedJokeInput.value
        var setup = '<p>' + (jokes[requestedJokeKey].setup) + '</p>'
        var punchline = '<p>' + (jokes[requestedJokeKey].punchline) + '</p>'

        // update joke box with two paragraphs
        jokeBox.innerHTML = setup + punchline
      }
    }
  } else {
    jokeBox.textContent = 'No matching jokes found.'
  }
}

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

  // update jokes menu to include new joke
  updateJokesMenu()

  // update localStorage with modified version
  stringifiedJokes = JSON.stringify(jokes)
  stringifiedJokesArray = JSON.stringify(arrayOfJokes)
  window.localStorage.setItem('arrayOfJokes', stringifiedJokesArray)
  window.localStorage.setItem('jokes', stringifiedJokes)
  initFlag = 1
  window.localStorage.setItem('flag', initFlag)
}

// Delete unwanted jokes
var deleteJokeObject = function () {
  var deleteJokeKeyValue = deleteJokeKey.value
  var j
  for (j = 0; j < arrayOfJokes.length; j++) {
    if (arrayOfJokes[j] === deleteJokeKeyValue) {
      // delete the joke from jokes obect using that key
      delete jokes[deleteJokeKeyValue]
      // update arrayOfJokes by removing the item
      var indexDeleteKey = arrayOfJokes.indexOf(deleteJokeKeyValue)
      if (indexDeleteKey !== -1) {
        arrayOfJokes.splice(indexDeleteKey, 1)
      }
      jokeDeletedNotice.textContent = 'Joke has been deleted.'

      // update the menu list
      updateJokesMenu()

      // update localStorage with modified version
      stringifiedJokes = JSON.stringify(jokes)
      stringifiedJokesArray = JSON.stringify(arrayOfJokes)
      window.localStorage.setItem('arrayOfJokes', stringifiedJokesArray)
      window.localStorage.setItem('jokes', stringifiedJokes)
      initFlag = 1
      window.localStorage.setItem('flag', initFlag)
    } else {
      jokeDeletedNotice.innerHTML = 'That joke didn\'t exist.'
    }
  }
}

// Function to keep track of all page updates to  call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// Update the page immediately on startup
updatePage()

// Keep the jokes up-to-date with event listeners
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addNewJoke.addEventListener('click', saveNewJoke)
deleteThisJoke.addEventListener('click', deleteJokeObject)
