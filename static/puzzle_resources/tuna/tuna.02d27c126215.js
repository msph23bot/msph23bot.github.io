// Reference constant.
const staticRoot = document.getElementsByClassName('playlist-img')[0].src.replace('codify.webp', '');

// Essential constants
MIN_TO_SEC = 60;
SEC_TO_MILLIS = 1000;
TO_PERCENT = 100;

// SVG constants
const PLAY_BUTTON_SVG_D = 'm7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z';
const PAUSE_BUTTON_SVG_D = 'M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z';

// Title, filename (sans .webm), duration in sec
const MUSIC = [
  ['Before You Walk Out of My Life', 'beforeyouwalkoutofmylife', 8],
  ['Break My Soul', 'breakmysoul', 9],
  ['Cuff It', 'cuffit', 10],
  ['Dragon Attack', 'dragonattack', 3],
  ['The Fairy Feller’s Master-Stroke', 'fairyfellersmasterstroke', 7],
  ['Galway Girl', 'galwaygirl', 6],
  ['Get Lucky', 'getlucky', 16],
  ['Girl Keeps Coming Apart', 'girlkeepscomingapart', 8],
  ['Gotta Stop (Messin’ Around)', 'gottastop', 6],
  ['A Head Full of Dreams', 'aheadfullofdreams', 11],
  ['Hymn for the Weekend', 'hymnfortheweekend', 11],
  ['I Wanna Love You Forever', 'iwannaloveyouforever', 8],
  ['In the Heat of the Night', 'intheheatofthenight', 8],
  ['The Invisible Man', 'invisibleman', 1],
  ['Let You Love Me', 'letyouloveme', 10],
  ['Motherboard', 'motherboard', 13],
  ['Mr. Tillman', 'mrtillman', 10],
  ['On and On', 'onandon', 6],
  ['Permanent Vacation', 'permanentvacation', 20],
  ['Play the Game', 'playthegame', 8],
  ['Put Out the Fire', 'putoutthefire', 5],
  ['Real Love', 'reallove', 7],
  ['Ride the Wild Wind', 'ridethewildwind', 2],
  ['Save Your Tears', 'saveyourtears', 8],
  ['Self Esteem', 'selfesteem', 9],
  ['Shape of You', 'shapeofyou', 6],
  ['Summer Sixteen', 'summersixteen', 4],
  ['Thinkin Bout You', 'thinkinboutyou', 6],
  ['Under Pressure', 'underpressure', 4],
  ['Was It All Worth It', 'wasitallworthit', 6],
  ['What’s Love Got To Do With It', 'whatslovegottodowithit', 8],
  ['You’ve Got Time', 'youvegottime', 12]
];

// HTML constants
const main = document.getElementsByClassName('main')[0];
const footer = document.getElementsByTagName('footer')[0];
const footerPusher = document.getElementById('footer-pusher');
const nowPlayingText = document.getElementsByClassName('now-playing-text')[0].firstElementChild;
const backButton = document.getElementsByClassName('control-button-skip-back')[0];
const centerButton = document.getElementsByClassName('center-button')[0];
const forwardButton = document.getElementsByClassName('control-button-skip-forward')[0];
const playbackPosition = document.getElementById('playback-position');
const playbackDuration = document.getElementById('playback-duration');
const progressBarStyleHolder = document.getElementById('progress-bar');
const progressHandle = document.getElementById('progress-handle');

// If undefined, no song is selected. Otherwise, this is a 0-based index into MUSIC.
let currentSong = undefined;
// If currentSong === undefined, expect this to be false. Otherwise, it reflects whether the selected song is actively playing.
let isPlaying = false;
// The time when playback is scheduled to end.
let endTimestamp = undefined;
// Current <audio> element. If currentSong === undefined, expect this to be undefined.
let audio = undefined;

// If undefined, none of the list items has focus.
// Otherwise, 0-based index into list for which play button has focus.
let focusedIndex = undefined;

// List of playlist buttons, for easy access.
const playButtons = [];

function makeHtml(s) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = s.trim();
  return tempDiv.firstElementChild;
}

function padTwoDigits(number) {
  return ('0' + Math.floor(number)).slice(-2);
}

function formatTime(s) {
  const minutes = Math.floor(s / MIN_TO_SEC);
  const leftoverSeconds = s % MIN_TO_SEC;
  return `${padTwoDigits(minutes)}:${padTwoDigits(leftoverSeconds)}`;
}

function selectSong(i) {
  const playButton = playButtons[i];
  const svg = playButton.getElementsByTagName('svg')[0];
  if (currentSong === i && isPlaying) {
    isPlaying = false;
    audio.pause();
    svg.innerHTML = `<path d="${PLAY_BUTTON_SVG_D}"></path>`;
    playButton.ariaLabel = `Play ${MUSIC[i][0]}`;
    centerButton.getElementsByTagName('svg')[0].innerHTML = `<path d="${PLAY_BUTTON_SVG_D}"></path>`
    centerButton.ariaLabel = 'Play';
  } else {
    audio?.pause();
    isPlaying = false;
    if (currentSong !== i || audio?.duration - audio?.currentTime <= 1) {
      progressBarStyleHolder.style = `--progress-bar-transform:0%;`;
    }
    currentSong = i;
    const percentageProgressString = getComputedStyle(progressBarStyleHolder).getPropertyValue('--progress-bar-transform');
    const percentageProgress = Number.parseFloat(percentageProgressString.substring(0, percentageProgressString.length-1));
    const numSecsProgress = percentageProgress * MUSIC[currentSong][2] / TO_PERCENT;
    audio = document.createElement('audio');
    audio.src = `${staticRoot}${MUSIC[i][1]}.webm`;
    audio.currentTime = numSecsProgress;
    audio.addEventListener('canplaythrough', () => { 
      endTimestamp = Date.now() + (audio.duration - numSecsProgress)*SEC_TO_MILLIS;
      nowPlayingText.innerText = `Now Playing: ${MUSIC[i][0]}`;
      isPlaying = true;
      footer.style.display = 'grid';
      footerPusher.style.display = 'block';
      svg.innerHTML = `<path d="${PAUSE_BUTTON_SVG_D}"></path>`;
      playButton.ariaLabel = `Pause ${MUSIC[i][0]}`;
      playbackPosition.innerText = formatTime(Math.floor(numSecsProgress));
      playbackDuration.innerText = formatTime(MUSIC[i][2]);
      audio.play();
      isPlaying = true;
      centerButton.getElementsByTagName('svg')[0].innerHTML = `<path d="${PAUSE_BUTTON_SVG_D}"></path>`
      centerButton.ariaLabel = 'Pause';
    });
  }
  if (currentSong === 0) {
    backButton.disabled = true;
  } else if (currentSong === MUSIC.length - 1) {
    forwardButton.disabled = true;
  } else {
    backButton.disabled = false;
    forwardButton.disabled = false;
  }
}

function handleKeyDownOnList(e) {
  if (focusedIndex === undefined) {
    focusedIndex = -1;
  }
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    focusedIndex++;
    try {
      const playButton = document.getElementById(`play-button-${focusedIndex+1}`);
      playButton.focus();
      e.preventDefault();
    } catch {}
  } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
    focusedIndex--;
    try {
      const playButton = document.getElementById(`play-button-${focusedIndex+1}`);
      playButton.focus();
      e.preventDefault();
    } catch {}
  }
}

main.addEventListener('keydown', handleKeyDownOnList);
main.addEventListener('focus', () => {
  focusedIndex = undefined;
})

for (let i = 0; i < MUSIC.length; i++) {
  const playlistRow = makeHtml(`<div class="playlist-row" role="row" aria-rowindex="2" aria-selected="false">
  <div role="presentation">
    <div role="gridcell" aria-colindex="1" tabindex="-1">
      <span class="id-number">${i+1}</span>
      <button id="play-button-${i+1}" class="play-button" aria-label="Play ${MUSIC[i]}" tabindex="-1">
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
        </svg>
      </button>
    </div>
  </div>
  <div role="gridcell" aria-colindex="2" tabindex="-1">
    ${MUSIC[i][0]}
  </div>
  <div role="gridcell" aria-colindex="3" tabindex="-1">
    ${formatTime(MUSIC[i][2])}
  </div>
</div>`);
  const playButton = playlistRow.getElementsByClassName('play-button')[0];
  playButton.onclick = (e) => {
    selectSong(i);
    e.stopPropagation();
  }
  playButtons.push(playButton);
  playlistRow.addEventListener('click', () => {
    selectSong(i);
  })
  main.appendChild(playlistRow);
}

backButton.onclick = () => {
  const nextSong = currentSong - 1 ?? 0;
  selectSong(nextSong);
}
centerButton.onclick = () => {
  selectSong(currentSong);
}
forwardButton.onclick = () => {
  const nextSong = currentSong + 1 ?? 0;
  selectSong(nextSong);
}

// True iff the progress handle is being dragged.
let isDraggingProgressHandle = false;

progressHandle.onmousedown = (e) => {
  isDraggingProgressHandle = true;
  isPlaying = false;
  audio.pause();
  progressHandle.classList.add('dragging');
}

document.body.addEventListener('mousemove', (e) => {
  if (isDraggingProgressHandle) {
    const rect = progressBarStyleHolder.getBoundingClientRect();
    const deltaX = e.clientX - rect.left;
    const fractionProgress = deltaX / rect.width;
    const percentageProgress = TO_PERCENT * fractionProgress;
    const numSecsProgress = Math.floor(fractionProgress * audio.duration);
    playbackPosition.innerText = formatTime(numSecsProgress);
    progressBarStyleHolder.style = `--progress-bar-transform:${percentageProgress}%;`;
  }
});

document.body.addEventListener('mouseup', (e) => {
  if (isDraggingProgressHandle) {
    const rect = progressBarStyleHolder.getBoundingClientRect();
    const deltaX = e.clientX - rect.left;
    const fractionProgress = deltaX / rect.width;
    const numSecsProgress = fractionProgress * audio.duration;
    endTimestamp = Date.now() + (audio.duration - numSecsProgress)*SEC_TO_MILLIS;
    audio.currentTime = numSecsProgress;
    selectSong(currentSong);
    isDraggingProgressHandle = false;
    progressHandle.classList.remove('dragging');
  }
});

function updateState() {
  if (isPlaying) {
    const numMillisUntilEnd = Math.max(0, endTimestamp - Date.now());
    const numSecUntilEnd = numMillisUntilEnd / SEC_TO_MILLIS;
    if (numSecUntilEnd === 0) {
      selectSong(currentSong);
    }
    const numSecsProgress = audio.duration - numSecUntilEnd;
    const percentageProgress = TO_PERCENT * numSecsProgress / audio.duration;
    playbackPosition.innerText = formatTime(Math.floor(numSecsProgress));
    progressBarStyleHolder.style = `--progress-bar-transform:${percentageProgress}%;`;
  }
}

// Update when user revisits the page.
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') updateState() });

setInterval(updateState, 100);

// Clipboard.
const copyTable = document.createElement('table');
for (let i = 0; i < MUSIC.length; i++) {
  copyTable.innerHTML += `<tr><td>${i}</td><td>${MUSIC[i][0]}</td><td>${formatTime(MUSIC[i][2])}</td></tr>`
}
copyTable.className = 'copy-only';
main.parentElement.insertBefore(copyTable, main);