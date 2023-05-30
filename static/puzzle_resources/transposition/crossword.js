const crosswordElement = document.getElementsByClassName('flex-container')[0];

let isDown = false;
let game;

function scrollClue(clue) {
  const [li] = clue;
  const [ol] = clue.parent();
  if (li.offsetTop < ol.scrollTop ||
      li.offsetTop + li.offsetHeight > ol.scrollTop + ol.clientHeight) {
    ol.scrollTop = li.offsetTop + (li.offsetHeight - ol.clientHeight) / 2;
  }
}

function selectClue(id) {
  const {status, dir, cells} = game.clues[id];
  if (!status) return false;
  if (isDown != (dir == 'down')) {
    scrollClue($(`#clue_${id}`).attr('data-sel', 'cross'));
    return false;
  }
  scrollClue($(`#clue_${id}`).attr('data-sel', 'clue'));
  for (const [y, x] of cells) {
    $(`#cell_${y}_${x}`).attr('data-sel', 'light');
  }
  return true;
}

function selectCell(y, x) {
  if (!checkCell(y, x)) return;
  const {clues} = game.cells[y][x];
  $('[data-sel]').attr('data-sel', null);
  $('[data-dir]').attr('data-dir', null);
  if (!clues.map(selectClue).some(n => n)) {
    isDown = !isDown;
    clues.forEach(selectClue);
  }
  const dirs = [];
  if (isDown) {
    if (checkCell(y - 1, x)) dirs.push('u');
    if (checkCell(y + 1, x)) dirs.push('d');
  } else {
    if (checkCell(y, x - 1)) dirs.push('l');
    if (checkCell(y, x + 1)) dirs.push('r');
  }
  $(`#cell_${y}_${x}`).attr({'data-sel': 'cell', 'data-dir': dirs.join(' ')});
  $('#keyboard').focus();
}

function checkCell(y, x) {
  if (!game.cells[y] || !game.cells[y][x]) return false;
  const {status} = game.cells[y][x];
  return status && status != 'wall';
}

function goToPrevCell(y, x) {
  let yy = y;
  let xx = x;
  if (isDown) {
    do {
      if (yy == 0) {
        if (xx > 0) {
          xx--;
          yy = game.cells.length - 1;
        }
      } else {
        yy--;
      }
    } while (game.cells[yy][xx].status == 'wall')
  } else {
    do {
      if (xx == 0) {
        if (yy > 0) {
          yy--;
          xx = game.cells[yy].length - 1;
        }
      } else {
        xx--;
      }
    } while (game.cells[yy][xx].status == 'wall')
  }
  selectCell(yy, xx);
  return;
}

function goToNextCell(y, x) {
  let yy = y;
  let xx = x;
  if (isDown) {
    do {
      if (yy == game.cells.length-1) {
        if (xx == game.cells[yy].length-1) {
          xx = 0;
        } else {
          xx++;
        }
        yy = 0;
      } else {
        yy++;
      }
    } while (game.cells[yy][xx].status == 'wall')
    return selectCell(yy, xx);
  } else {
    do {
      if (xx == game.cells[y].length-1) {
        if (yy == game.cells.length-1) {
          yy = 0;
        } else {
          yy++;
        }
        xx = 0;
      } else {
        xx++;
      }
    } while (game.cells[yy][xx].status == 'wall')
    return selectCell(yy, xx);
  }
}

let wasLastShiftWithTab = false;
function handleKey(evt) {
  wasLastShiftWithTab = false;
  const [td] = $('[data-sel=cell]');
  if (!td || evt.altKey || evt.ctrlKey || evt.metaKey) return;
  let [_, y, x] = td.id.split('_').map(Number);
  const key = evt.key || evt.originalEvent.data;
  const [_2, id] = $('[data-sel=clue]').attr('id').split('_');
  if (/^[a-z]$/i.test(key)) {
    const {status, guess} = game.cells[y][x];
    if (status != 'wall') {
      const td = $(`#cell_${y}_${x}`).attr('class', status || '');
      td.find('div').text(key.toUpperCase() || '');
      const cell = game.cells[y][x];
      cell.guess = key.toUpperCase();
      cell.status = 'open';
    }
    if (evt.shiftKey) {
      // If shift is used, stay on the same cell.
      return selectCell(y, x);
    } else {
      return goToNextCell(y, x);
    }
  }
  switch (evt.key) {
    case 'ArrowUp':
      evt.preventDefault(); // No scrolling!
      isDown = true;
      return goToPrevCell(y, x);
    case 'ArrowDown':
      evt.preventDefault(); // No scrolling!
      isDown = true;
      return goToNextCell(y, x);
    case 'ArrowLeft':
      evt.preventDefault(); // No scrolling!
      isDown = false;
      return goToPrevCell(y, x);
    case 'ArrowRight':
      evt.preventDefault(); // No scrolling!
      isDown = false;
      return goToNextCell(y, x);
  }
  if (evt.key === 'Tab') {
    evt.preventDefault();
    const thisClue = game.clues[id];
    if (evt.shiftKey) {
      wasLastShiftWithTab = true;
      let hasFoundSelf = false;
      for (let i = game.clues.length - 1; i >= 0; i--) {
        if (game.clues[i].dir == thisClue.dir) {
          if (hasFoundSelf) {
            const [nextY, nextX] = game.clues[i].cells[0];
            return selectCell(nextY, nextX);
          } else if (game.clues[i].index === thisClue.index) {
            hasFoundSelf = true;
          }
        }
      }
      // Otherwise, just do the last clue.
      for (let i = game.clues.length - 1; i >= 0; i--) {
        if (game.clues[i].dir === thisClue.dir) {
          const [nextY, nextX] = game.clues[i].cells[0];
          return selectCell(nextY, nextX);
        }
      }
    } else {
      let hasFoundSelf = false;
      for (let i = 0; i < game.clues.length; i++) {
        if (game.clues[i].dir == thisClue.dir) {
          if (hasFoundSelf) {
            const [nextY, nextX] = game.clues[i].cells[0];
            return selectCell(nextY, nextX);
          } else if (game.clues[i].index === thisClue.index) {
            hasFoundSelf = true;
          }
        }
      }
      for (let i = 0; i < game.clues.length; i++) {
        if (game.clues[i].dir == thisClue.dir) {
          const [nextY, nextX] = game.clues[i].cells[0];
          return selectCell(nextY, nextX);
        }
      }
    }
    return;
  }
  if (evt.key === ' ') {
    isDown = !isDown;
  }
  if (evt.key === 'Backspace' || evt.key === 'Delete') {
    const td = $(`#cell_${y}_${x}`).attr('class', '');
    td.find('div').text('');
    const cell = game.cells[y][x];
    cell.guess = '';
    cell.status = 'blank';
    return goToPrevCell(y, x);
  }
  selectCell(y, x);
  evt.preventDefault();
}

$(document).on('mousedown', 'td', evt => {
  const [_, y, x] = evt.currentTarget.id.split('_').map(Number);
  if ($(`#cell_${y}_${x}[data-sel=cell]`).length) isDown = !isDown;
  selectCell(y, x);
  evt.preventDefault();
}).on('mousedown', 'li', evt => {
  const [_, id] = evt.currentTarget.id.split('_');
  const {dir, cells} = game.clues[id];
  if (!cells || !cells.length) return;
  evt.preventDefault();
  isDown = dir == 'down';
  for (const [y, x] of cells) {
    if ($(`#cell_${y}_${x}[data-sel=cell]`).length) return selectCell(y, x);
  }
  for (const [y, x] of cells) {
    if (game.cells[y][x].status == 'blank') return selectCell(y, x);
  }
  selectCell(...cells[0]);
}).on('keydown', evt => {
  evt.keyCode == 229 ? $(document).one('textInput', handleKey) : handleKey(evt);
}).on('keyup', evt => {
  handleKeyUp(evt);
});

function handleKeyUp(evt) {
  if (evt.key === 'Shift') {
    if (wasLastShiftWithTab) return;
    try {
      const [td] = $('[data-sel=cell]');
      let [_, y, x] = td.id.split('_').map(Number);
      goToNextCell(y, x);
    } catch {}
  }
}

function makeCell(y, x) {
  const {status, index, guess,} = game.cells[y][x];
  const td = $(`#cell_${y}_${x}`).attr('class', status || '');
  td.find('sup').text(index || '');
  td.find('div').text(guess || '');
}

function makeClue(id) {
  const {status, text} = game.clues[id];
  $(`#clue_${id}`).attr('class', status || '').html(text || '');
}

function expandGameDefinition(data) {
  const grid = data.grid.split('|');
  const cells = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const thisRow = [];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell === '.') {
        thisRow.push({'status': 'wall'})
      } else {
        thisRow.push({
          'status': 'blank',
          'guess': '',
          'clues': [],
        })
      }
    }
    cells.push(thisRow);
  }

  // console.log(cells);

  const res = {
    'cells': cells,
    'clues': [],
    'total': 0
  };

  let index = 1;
  function newClue(d) {
    return {
      'status': 'open', 
      'dir': d,
      'index': index,
      'cells': [],
      'walls': []
    }
  }
  for (let y = 0; y < cells.length; y++) {
    const row = cells[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell['status'] === 'wall')  {
        // console.log('x, y = ', x, y, ' is a wall; continue');
        continue;
      }
      res['total'] += 1;

      // console.log('x, y = ', x, y);
      const across = (x === 0) || (cells[y][x-1]['status'] === 'wall');
      const down = (y === 0) || (cells[y-1][x]['status'] === 'wall');
      // console.log('across, down = ', across, down);

      if (across) {
        const clue = newClue('across');
        // console.log(clue);
        if (x > 0) {
          clue['walls'].push([y, x-1]);
        }
        for (let xx = x; xx < row.length; xx++) {
          if (cells[y][xx]['status'] === 'wall') {
            clue['walls'].push([y, xx]);
            break;
          }
          cells[y][xx]['clues'].push(res['clues'].length);
          clue['cells'].push([y, xx]);
        }
        res['clues'].push(clue);
      }
      if (down) {
        const clue = newClue('down');
        // console.log(clue);
        if (y > 0) {
          clue['walls'].push([y-1, x]);
        }
        for (let yy = y; yy < grid.length; yy++) {
          // console.log('yy, x = ', yy, x);
          // console.log(cells[yy]);
          // console.log(cells[yy][x]);
          if (cells[yy][x]['status'] === 'wall') {
            clue['walls'].push([yy, x]);
            break;
          }
          cells[yy][x]['clues'].push(res['clues'].length);
          clue['cells'].push([yy, x]);
        }
        res['clues'].push(clue);
      }
      if (across || down) {
        cell['index'] = index;
        index += 1;
      }
    }
  }
  for (clue of res['clues']) {
    clue['text'] = data['clues'][clue['dir']][`${clue['index']}`];
  }
  return res;
}

function loadGame(data) {
  game = data;
  const table = $('#puztable').empty();
  game.cells.forEach((row, y) => {
    const tr = $('<tr>').appendTo(table);
    row.forEach((cell, x) => {
      $('<td>').attr('id', `cell_${y}_${x}`).append($('<sup>'), $('<div>'))
          .appendTo(tr);
      makeCell(y, x);
    });
  });
  $('ol').empty();
  game.clues.forEach((clue, id) => {
    $('<li>').attr('id', `clue_${id}`).attr('value', clue.index)
        .appendTo(`#${clue.dir}`);
    makeClue(id);
  });
}