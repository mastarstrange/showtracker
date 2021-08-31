//* #################################################################################
//# Navigation and Home Page
//* #################################################################################

//? Alphabet filtering (Listnav jQuery plugin v3*modified)
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$('.showlist').listnav({
  // allText: 'All',        // set custom text in navbar to ALL button
  // cookieName: null,      // Set this to a string to remember the last clicked navigation item requires jQuery Cookie Plugin ('myCookieName')
  // dontCount: '',         // A comma separated list of selectors you want to exclude from the count function (numbers on top of navigation)
  // filterSelector: '',    // Set the filter to a CSS selector rather than the first text letter for each item
  // flagDisabled: true,    // Add a class of 'ln-disabled' to nav items with no content to show
  // includeAll: true,      // Include the ALL button
  // includeNums: true,     // Include a '0-9' option to filter by
  // includeOther: false,   // Include a '...' option to filter non-english characters by
  // initHidden: false,     // After LiatNav loads, hide all of the list items until you click a letter
  // initHiddenText: '',    // Message to display to users when the initial input is hidden
  // initLetter: '',        // filter the list to a specific letter on init ('a'-'z', '-' [numbers 0-9], '_' [other])
  // letters: [''],         // Add a custom set of letters for non-engligh languages. See Demo 5
  // noMatchText: '',       // set custom text for nav items with no content to show
  // onClick: null,         // Set a function that fires when you click a nav item. see Demo 5
  prefixes: ['the', 'a', 'an'], // Set an array of prefixes that should be counted for the prefix and the first word after the prefix ex: ['the', 'a', 'my']
  removeDisabled: true, // Remove those 'ln-disabled' nav items (flagDisabled must be set to true for this to function)
  showCounts: false, // Show the number of list items that match that letter above the mouse
})

$('.listNav').prependTo('.taglist') //// Changing the default location of listnav

//? Navigation Bar and other button click actions
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).on('click touchend', '.homeswp', function () {
  $('.addpg').slideUp('slow')
  $('.detpg').fadeOut('slow')
  $('.signup').slideUp('slow')
  $('.login').slideUp('slow')
  $('.home').fadeIn('slow')
  return false
})

$(document).on('click touchend', '.addswp', function () {
  $('.home').fadeOut('fast', function () {
    $('.detpg').fadeOut('fast', function () {
      $('.addpg').slideDown('slow')
      $('.signup').slideUp('slow')
      $('.login').slideUp('slow')
    })
  })
  return false
})

$(document).on('click touchend', '.showdetail', function () {
  let showTitle = $(this).siblings('h4').text()
  let postImgSrc = $(this).parent().siblings().children().attr('src')
  console.log(postImgSrc)
  $('#detpgimg').attr('src', postImgSrc)
  $('#detpgtitle').text(showTitle)
  $('.home').fadeOut('fast', function () {
    $('.detpg').fadeIn('slow', $('.detpg').scrollTop())
  })
  return false
  // $(".addpg").slideUp("");
  // $(".signup").slideUp("");
  // $(".login").slideUp("");
})

$(document).on('click touchend', '.loginswp', function () {
  $('.home').fadeOut('fast', function () {
    $('.detpg').fadeOut('fast', function () {
      $('.addpg').slideUp('slow')
      $('.signup').slideDown('slow')
      $('.login').slideUp('slow')
    })
  })
  return false
})

$(document).on('click touchend', '.signupswp', function () {
  $('.home').fadeOut('fast', function () {
    $('.detpg').fadeOut('fast', function () {
      $('.addpg').slideUp('slow')
      $('.signup').slideUp('slow')
      $('.login').slideDown('slow')
    })
  })
  return false
})

$('.filtertag').on('click', function () {
  $('a.filtertag').removeClass('active')
  console.log('test')
  $(this).addClass('active')
})

//? Genre filtering
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function () {
  $('.filtertag').click(function () {
    var value = $(this).attr('data-filter')
    if (value == 'all') {
      //$('.filter').removeClass('hidden');
      $('.filtr-item').show('')
    } else {
      //$('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //$(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $('.filtr-item')
        .not('.' + value)
        .hide('')
      $('.filtr-item')
        .filter('.' + value)
        .show('')
    }
  })
})

//* #################################################################################
//# Add Page things
//* #################################################################################

//? Adding Show validation and prompts
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).on('click touchend', '#addshowbtn', function () {
  let addName = document.getElementById('addshow').value
  if (isNaN(addName.charAt(0))) {
    alert(addName + ' has been added.')
    if (window.confirm('Do you want to Add more?')) {
      return false
    } else {
      $('.addpg').slideUp('slow')
      $('.detpg').fadeOut('fast')
      $('.signup').slideUp('slow')
      $('.login').slideUp('slow')
      $('.home').fadeIn('slow')
    }
  } else {
    alert("Invalid TV show name. Are you sure you didn't make that up :)")
    return false
  }
})

//* #################################################################################
//# Login & SignUp Page things
//* #################################################################################

//? User Details Storage Object
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const userDetails = {
  names: ['ST', 'testtwo', 'testthree', 'testfour', 'testfive'],
  emails: [
    'thuvaragan28@gmail.com',
    'test2@gmail.com',
    'test3@gmail.com',
    'test4@gmail.com',
    'test5@gmail.com',
  ],
  pass: ['123', '456', '789', 'abc', 'abc123'],
}

//? Login Validation and Attempts limiter
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let attempt = 3 // Variable to count number of attempts.
let btnLogIn = document.getElementById('loginbtn')

// Below function Executes on click of login button.
btnLogIn.onclick = function () {
  var semail = document.getElementById('email').value
  var spass = document.getElementById('password').value

  let validateLogIn = function (semail, spass) {
    var email_index = userDetails.emails.indexOf(semail)
    if (email_index > -1) {
      return spass == userDetails.pass[email_index]
    } else {
      return false
    }
  }

  if (validateLogIn(semail, spass) == true) {
    alert('Login successfull')
    window.location = 'index.html' // Redirecting to other page.
    return false // To prevent the default behahvior of things, specially onsubmit.
  } else {
    attempt-- // Decrementing by one.
    // Below function disables fields on no attempts remaining.
    if (attempt == 0) {
      alert(
        'Input Fields are disabled. \nTry again later or find the link below to reset your password.'
      )
      document.getElementById('email').disabled = true
      document.getElementById('password').disabled = true
      document.getElementById('loginbtn').disabled = true
      return false
    } else {
      alert('You have ' + attempt + ' attempts left.')
      return false
    }
  }
}

//? SignUP Button, Validation & Saving User Details related
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let btnSignUp = document.getElementById('signupbtn')
btnSignUp.onclick = function () {
  let nname = document.getElementById('newname').value
  if (/\d/.test(nname) || nname.length <= 5 || /[ -/:-@[-`{-~]/.test(nname)) {
    alert('Check your name!')
  } else {
    let nemail = document.getElementById('newmail').value
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nemail)) {
      let npass = document.getElementById('newpass').value
      if (
        /[A-Z]/.test(npass) &&
        /[a-z]/.test(npass) &&
        /[0-9]/.test(npass) &&
        /[0-9]/.test(npass) &&
        /[ -/:-@[-`{-~]/.test(npass) &&
        npass.length == 8
      ) {
        userDetails.emails.push(nemail)
        userDetails.names.push(nname)
        userDetails.pass.push(npass)
        console.log(userDetails)
        alert('SignUp Successfull!, \nRedirecting to Login Page.')
        $('.login').slideDown('slow')
        $('.signup').slideUp('slow')
      } else {
        alert('Check your Password!')
      }
    } else {
      alert('Check your email!')
    }
  }
  return false
}

//? Name related things
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function () {
  $('#newname').keyup(function () {
    let nname = document.getElementById('newname').value

    if (/\d/.test(nname)) {
      document.getElementById('nvnonum').className = 'list-group-item list-group-item-danger'
    } else {
      document.getElementById('nvnonum').className = 'list-group-item list-group-item-success'
    }

    if (nname.length <= 5) {
      document.getElementById('nv5char').className = 'list-group-item list-group-item-danger'
    } else {
      document.getElementById('nv5char').className = 'list-group-item list-group-item-success'
    }

    if (/[ -/:-@[-`{-~]/.test(nname)) {
      document.getElementById('nvnosym').className = 'list-group-item list-group-item-danger'
    } else {
      document.getElementById('nvnosym').className = 'list-group-item list-group-item-success'
    }
  })
})

let nameFocus = function () {
  $('.nameval').slideDown('slow')
  $('.namereq').slideUp('fast')
  $('.namecor').slideUp('fast')
}

let nameBlur = function () {
  let nname = document.getElementById('newname').value
  $('.nameval').slideUp('fast')
  if (nname == '') {
    $('.namereq').slideDown('fast')
  } else if (/\d/.test(nname) || nname.length <= 5 || /[ -/:-@[-`{-~]/.test(nname)) {
    $('.namecor').slideDown('fast')
  }
}

//? Email related things
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function () {
  $('#newmail').keyup(function () {
    let nemail = document.getElementById('newmail').value
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nemail)) {
      $('.emailreq').slideUp('fast')
    } else {
      $('.emailreq').slideDown('fast')
    }
  })
})

let emailBlur = function () {
  let nemail = document.getElementById('newmail').value
  if (nemail == '') {
    $('.emailreq').slideDown('fast')
  }
}

//? Password related things
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(function () {
  $('#newpass').keyup(function () {
    let npass = document.getElementById('newpass').value

    if (/[A-Z]/.test(npass)) {
      document.getElementById('pvcap').className = 'list-group-item list-group-item-success'
    } else {
      document.getElementById('pvcap').className = 'list-group-item list-group-item-danger'
    }

    if (/[a-z]/.test(npass)) {
      document.getElementById('pvsma').className = 'list-group-item list-group-item-success'
    } else {
      document.getElementById('pvsma').className = 'list-group-item list-group-item-danger'
    }

    if (/[0-9]/.test(npass)) {
      document.getElementById('pvnum').className = 'list-group-item list-group-item-success'
    } else {
      document.getElementById('pvnum').className = 'list-group-item list-group-item-danger'
    }

    if (/[ -/:-@[-`{-~]/.test(npass)) {
      document.getElementById('pvsym').className = 'list-group-item list-group-item-success'
    } else {
      document.getElementById('pvsym').className = 'list-group-item list-group-item-danger'
    }

    if (npass.length == 8) {
      document.getElementById('pveig').className = 'list-group-item list-group-item-success'
    } else {
      document.getElementById('pveig').className = 'list-group-item list-group-item-danger'
    }
  })
})

let passFocus = function () {
  $('.passval').slideDown('slow')
  $('.passreq').slideUp('fast')
  $('.passcor').slideUp('fast')
}

let passBlur = function () {
  let npass = document.getElementById('newpass').value
  $('.passval').slideUp('fast')
  if (npass == '') {
    $('.passreq').slideDown('fast')
  } else if (
    !(
      /[A-Z]/.test(npass) &&
      /[a-z]/.test(npass) &&
      /[0-9]/.test(npass) &&
      /[0-9]/.test(npass) &&
      /[ -/:-@[-`{-~]/.test(npass) &&
      npass.length == 8
    )
  ) {
    $('.passcor').slideDown('fast')
  }
}

//? Some Fun Stuff...
//? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let huhji = String.raw`¯\_(ツ)_/¯`

$(document).on('click touchend', '#forgPass', function () {
  if (window.confirm('Are you sure about that?')) {
    alert(
      "We don't do that here. \nJust create a new account \nIt's Free! " +
        huhji +
        ' \nP.S: Login fields are open now. and you can try 5 times'
    )
    $('#email, #password, #loginbtn').prop('disabled', false)
    attempt = 5
    return false
  } else {
    alert('Close your eyes and relax. \nHope you get better soon.')
    return false
  }
})

$(document).on('click touchend', '#sapice', function () {
  alert(String.raw`We don't have those things. We are... free birds ¯\_(ツ)_/¯`)
  return false
})

$(document).on('click touchend', '.gsocup, .asocup, .fsocup', function () {
  alert(
    "Mayday... Mayday... Mayday... \nGoogle Headquaters down, seems like Thanos snapped it. \nApple don't listen you, so think for your self. \nAnd Facebook... is facebook. You sure you want to use it?"
  )
  return false
})
