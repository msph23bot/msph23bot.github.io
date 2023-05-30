const NUM_IMGS = 19;
const NUM_VIDS = 12;

const pageContainer = document.getElementById('instaclam-page-container');
const videos = document.getElementsByClassName('instaclam-vid');
const audioIcons = document.getElementsByClassName('toggle-mute');

let nowPlaying = undefined;

function toPosts(id) {
  pageContainer.style.transform = 'translateX(-50%)';
  const post = document.getElementById(id);
  post.scrollIntoView();
}

function toMain() {
  pageContainer.style.transform = 'translateX(0)';
  if (nowPlaying !== undefined) videos[nowPlaying].pause();
}


function togglePlay(idx) {
  if (idx === nowPlaying) {
    videos[idx].pause();
    nowPlaying = undefined;
  } else {
    if (nowPlaying !== undefined) videos[nowPlaying].pause();
    if (videos[idx].muted) toggleAudio(idx);
    videos[idx].play();
    nowPlaying = idx;
  }
}

function toggleAudio(idx) {
    videos[idx].muted = !videos[idx].muted;
    audioIcons[idx].innerText = videos[idx].muted ? 'volume_off' : 'volume_up';
}