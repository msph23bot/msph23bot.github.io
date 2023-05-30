const NUMBER_OF_IMAGES = 10;

const NONE = 'none';
const FLEX = 'flex';

const photoScroller = document.getElementById('photo-scroll-content');
const leftButton = document.getElementsByClassName('prev')[0];
const rightButton = document.getElementsByClassName('next')[0];

// The integer of the photo ID (0-indexing) that we are looking at.
let scrollPosition = 0;

function updateBasedOnShiftAmount() {
  rightButton.style.display = FLEX;
  leftButton.style.display = FLEX;
  photoScroller.style.transform = `translateX(${-scrollPosition * 100}%)`;
  if (scrollPosition >= NUMBER_OF_IMAGES - 1) {
    rightButton.style.display = NONE;
  } else if (scrollPosition <= 0) {
    leftButton.style.display = NONE;
  }
}

/** Initialization. */

leftButton.style.display = NONE;
leftButton.onclick = () => {
  scrollPosition -= 1;
  updateBasedOnShiftAmount();
}

rightButton.onclick = () => {
  scrollPosition += 1;
  updateBasedOnShiftAmount();
}

/** Dropdown controls. */
function closeDropdowns() {
  const dropdowns = document.getElementsByClassName('dropdown-content');
  for (const dropdown of dropdowns) {
    dropdown.style.display = NONE;
  }
}

function openDropdown(className, event) {
  const button = 
    document.getElementsByClassName(`${className}-button`)[0];
  const menu = document.getElementsByClassName(`${className}-dropdown`)[0];

  closeDropdowns();
  menu.style.display = 'block';
  event.stopPropagation();
}

window.addEventListener('click', () => {
  closeDropdowns();
});

window.onkeydown = (e) => {
  if (e.key === 'Escape') closeDropdowns();
}