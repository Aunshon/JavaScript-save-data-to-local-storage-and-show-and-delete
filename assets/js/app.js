var tweetList = document.getElementById('tweet-list');

function allEventListener() {
    document.querySelector("#form").addEventListener('submit', formSubmit);
    tweetList.addEventListener('click', removeTweet);
    document.addEventListener('DOMContentLoaded', loadallstoreddata);

}
allEventListener();

function formSubmit(e) {
    e.preventDefault();

    var tweet = document.getElementById('tweet').value;

    //add tweeet link to show
    var lin = document.createElement('a');
    lin.classList = 'remove-tweet';
    lin.textContent = "X";

    var li = document.createElement('li');
    li.textContent = tweet;
    li.appendChild(lin);

    tweetList.appendChild(li);
    addToLocalStore(tweet);
}

function removeTweet(e) {
    if (e.target.classList == 'remove-tweet') {
        e.target.parentElement.remove();
        removeDataFromLocalStorage(e.target.parentElement.textContent);
    }
}

function addToLocalStore(tweet) {
    var allSavedTweet = getAllSavedTweet();
    allSavedTweet.push(tweet);
    localStorage.setItem('tweet', JSON.stringify(allSavedTweet));
    console.log(allSavedTweet);
}

function getAllSavedTweet() {
    var allTweet;
    var allSavedTweet = localStorage.getItem('tweet');

    if (allSavedTweet == null) {
        allTweet = [];
    } else {
        allTweet = JSON.parse(allSavedTweet);
    }

    return allTweet;
}

function loadallstoreddata() {
    var allSavedTweet = getAllSavedTweet();
    // console.log(allSavedTweet);
    allSavedTweet.forEach(function(item) {
        var lin = document.createElement('a');
        lin.classList = 'remove-tweet';
        lin.textContent = "x";

        var li = document.createElement('li');
        li.textContent = item;
        li.appendChild(lin);

        tweetList.appendChild(li);
    });
}

function removeDataFromLocalStorage(text) {
    var allSavedTweet = getAllSavedTweet();
    allSavedTweet.forEach(function(item, index) {
        if (item == text.substring(0, text.length - 1)) {
            allSavedTweet.splice(index, 1)
        }
    });
    localStorage.setItem('tweet', JSON.stringify(allSavedTweet));
    console.log(allSavedTweet);
}