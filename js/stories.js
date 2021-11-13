"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
    /*StoryList.stories is an array of objects, each object is an instance of Story class is as follows:
      {author: "Elie Schoppik"
      createdAt: "2021-11-08T00:01:15.358Z"
      storyId: "8b89d167-b64d-4020-bcfe-b86118ffc486"
      title: "Springboard's latest news!"
      url: "https://www.springboard.com/"
      username: "quyenpham"}
    */
    storyList = await StoryList.getStories();
    // console.log(storyList)
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {

    const showStar = Boolean(currentUser)
    const showTrash = Boolean(currentUser)

    const hostName = story.getHostName();

    return $(`
      <li id="${story.storyId}">
      ${showTrash ? getDeleteButton(currentUser, story) : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small> 
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

}

function getDeleteButton(user, story) {

    if (user.isMyStory(story)) { return `<span class ="trash"><i class="fas fa-trash-alt"></i></span>` }
    //tried returning '' but it kept showing up as undefined
    return `<i></i>`
}

async function deleteMyStory(e) {
    e.preventDefault()
    const $target = $(e.target)
    const $closestLi = $target.closest('li')
    const $storyId = $closestLi.attr('id')

    const story = currentUser.ownStories.find(s => s.storyId === $storyId)

    await storyList.removeStory(currentUser, story)

    $closestLi.remove()

}

$allStories.on('click', '.trash', deleteMyStory)


function getStarHTML(story, user) {
    const isFavorite = user.isFavorite(story)

    if (isFavorite === true) {
        return `<span class='heart-button'>
  <i class="fas fa-heart"></i>
  </span>`
    }
    else {
        return '<span class="heart-button"><i class="far fa-heart"></i></span>'
    }
}

async function toggleStoryFavorites(evt) {
    //add the story to the currentUser.favorites
    //change the icon 
    let $target = $(evt.target)
    let $closestLi = $target.closest('li')
    let $tgtParentId = $closestLi.attr('id')
    //story is the the story from storyList which matches the LI's Id.
    let story = storyList.stories.find(s => s.storyId === $tgtParentId)

    if ($target.hasClass('fas')) {
        await currentUser.removeFavorite(story)
        $target.closest('i').toggleClass("fas far")
    } else {
        await currentUser.addFavorite(story)
        $target.closest('i').toggleClass("fas far")
    }
}

$allStories.on('click', '.heart-button', toggleStoryFavorites)

function putFavoritesOnPage() {
    //get list of favs and put it on page
    $favStoriesList.empty()
    for (let story of currentUser.favorites) {
        const $favStory = generateStoryMarkup(story)
        $favStoriesList.append($favStory)

    }

}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
    }

    $allStoriesList.show();
}





async function submitNewStory(evt) {
    evt.preventDefault()

    if (!currentUser) {
        alert('You need to be logged in to submit a story')
    }

    const title = $('#story-input-title').val()
    const author = $('#story-input-author').val()
    const url = $('#story-input-url').val()
    const username = currentUser.username

    const story = await storyList.addStory(currentUser, { title, author, url, username })


    // $('#story-input-title').val('')
    // $('#story-input-author').val('')
    // $('#story-input-url').val('')
    // { storyId, title, author, url, username, createdAt }
    // const storyData = response.data.story
    // const story = { storyId: storyData.storyId, title: storyData.title, author: storyData.author, url: storyData.url, username: storyData.username, createdAt: storyData.createdAt }

    const $story = generateStoryMarkup(story)
    $allStoriesList.prepend($story)
    $submitStoryForm.trigger('reset')
    alert('New story submitted!')
}

$submitStoryForm.on('submit', submitNewStory)


function putMyStoriesOnPage() {
    const myStories = currentUser.ownStories

    for (let story of myStories) {
        let $story = generateStoryMarkup(story)
        $myStoriesList.append($story)
    }
}