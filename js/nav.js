"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
    
    hidePageComponents();
    putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
   
    hidePageComponents();
    $loginForm.show();
    $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
   ;
    $(".main-nav-links").show();
    $navLogin.hide();
    $navLogOut.show();
    $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
    // evt.preventDefault()
    if (!currentUser) {
        alert('You need to log on to access this feature')
    }
    else {
        hidePageComponents()
        $submitStoryForm.show()
    }
}

$submitStoryBtn.on('click', navSubmitClick)

function navFavoritesClick(evt) {
    if (!currentUser) {
        alert('You need to log on to access this feature')
        putStoriesOnPage()
    }
    else {
        hidePageComponents()
        putFavoritesOnPage()
        $favStoriesList.show()
    }
}

$('#nav-favorites').on('click', navFavoritesClick)


function navMyStories(e) {
    if (!currentUser) {
        alert('You need to log in to access this feature')
    } else {
        $myStoriesList.empty()
        hidePageComponents()
        putMyStoriesOnPage()
        $myStoriesList.show()
    }
}

$('#nav-my-stories').on('click', navMyStories)
