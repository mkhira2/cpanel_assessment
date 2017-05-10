//------------------------------------------------------------------------------
//******************************************************************************
//************************************PART 1************************************
//******************************************************************************
//------------------------------------------------------------------------------

/* settings for alert boxes */
/* test at http://codeseven.github.io/toastr/demo.html */
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


//------------------------------------------------------------------------------
// FUNCTION TESTS - all tests will return TRUE if test case is present
//------------------------------------------------------------------------------



// USERNAME TESTS
function findLowercase(string) {
  return /[A-Z]/.test(string)
}

function findUppercase(string) {
  return /[a-z]/.test(string)
}

function findNumber(string) {
  return /[0-9]/.test(string)
}

function findSpecialCharacter(string) {
  return /\D\W/.test(string)
}

function findWhitespace(string) {
  return /\s/.test(string)
}

// PASSWORD TESTS
function findTwoNumbers(string) {
  return /\d{2,}/.test(string)
}

// GEOGLOCATION TESTS
function findNonNumber(string) {
  return /\D/.test(string)
}



//------------------------------------------------------------------------------
// USERNAME VALIDATION
//------------------------------------------------------------------------------
function testUsername(usernameString) {
  if (findLowercase(usernameString) && findUppercase(usernameString) && findNumber(usernameString) && !findSpecialCharacter(usernameString) && !findWhitespace(usernameString)) {
    return true

  } else if (findWhitespace(usernameString)) {
    toastr.error('USERNAME cannot contain spaces')
    return false

  } else if (findSpecialCharacter(usernameString)) {
    toastr.error('USERNAME cannot contain special characters')
    return false

  } else {
    toastr.error('USERNAME must include a lowercase character, uppercase character, and number')
    return false
  }
}

//------------------------------------------------------------------------------
// PASSWORD VALIDATION
//------------------------------------------------------------------------------
function testPassword(passwordString) {
  if (passwordString.length < 8 || passwordString.length > 15) {
    toastr.error('PASSWORD must be between 8 and 15 characters')
    return false

  } else if (!findTwoNumbers(passwordString)) {
    toastr.error('PASSWORD must contain two numbers')
    return false

  }
  return true
}

//------------------------------------------------------------------------------
// USERNUMBER VALIDATION
//------------------------------------------------------------------------------
function testUsernumber(usernumberString) {
  if (usernumberString.length !== 36 || findNonNumber(usernumberString)) {
    toastr.error('USER NUMBER must be 36 numeric characters')
    return false

  }
  return true
}

//------------------------------------------------------------------------------
// GEOGLOCATION VALIDATION
//------------------------------------------------------------------------------
var geoglocationNode = $('input#geoglocation')
function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      geoglocationNode[0].value = position.coords.latitude + ', ' + position.coords.longitude
    })

  } else {
    toastr.info('Your broswer does not support navigation')
  }
}
geoglocationNode.on('click', getCoords)

function greatSuccess() {
  var usernameNode = $('#username')
  var passwordNode = $('#password')
  var usernumberNode = $('#usernumber')

  if (testUsername(usernameNode[0].value) && testPassword(passwordNode[0].value) && testUsernumber(usernumberNode[0].value) && getCoords()) {
    return true

  }
  return false
}



//------------------------------------------------------------------------------
//******************************************************************************
//************************************PART 2************************************
//******************************************************************************
//------------------------------------------------------------------------------



YUI().use('overlay', function(Y) {
  var overlay = new Y.Overlay({
    srcNode: '#overlay',
    width: '800px',
    visible: false,
    centered: true,
    node: '#someinfo'
  })
  overlay.render()
  Y.on('click', Y.bind(overlay.show, overlay), '#findoutmore')
})



//------------------------------------------------------------------------------
//******************************************************************************
//************************************PART 3************************************
//******************************************************************************
//------------------------------------------------------------------------------



function modifyArray(array) {
  for (var i = 2; i <= array.length; i += 2)
    array.splice(i, 1)
  return array.join('')
}

function writeString() {
  var modifiedStringNode = $('div.modifiedArray')[0]
  modifiedStringNode.innerHTML = modifyArray(thisArray)
}

writeString()



//------------------------------------------------------------------------------
//******************************************************************************
//************************************PART 4************************************
//******************************************************************************
//------------------------------------------------------------------------------



function showFlickrPictures() {
  $.getJSON('http://www.flickr.com/services/feeds/photos_public.gne?tags=punctuation,atsign&format=json', 'jsoncallback=?').then(function(apiResponse) {
    var picturesArray = apiResponse.items
    var htmlArray = picturesArray.map(function(picture) {
      var publishedDate = new Date(picture.published)
      var formattedDate = publishedDate.toLocaleDateString()
      var htmlString = ''
      htmlString += "<div class='flickrPicture'>"
      htmlString += '<img src=' + picture.media.m + '>'
      htmlString += '<h4><b>' + picture.title + '</b></h4>'
      htmlString += '<h5><i>Publish Date: ' + formattedDate + '</i></h5>'
      htmlString += '</div>'
      return htmlString
    })
    htmlArray.forEach(function(html) {
      document.querySelector('.imageContainer').innerHTML += html
    })
  }, function(error) {
    console.log(error)
  })
}
