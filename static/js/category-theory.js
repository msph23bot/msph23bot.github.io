"use strict";

(function() {

	function html(parent, tag, cssClass, content) {
		let child = parent.appendChild(document.createElement(tag));
		if(cssClass) {
			child.classList.add(...cssClass.split(" "));
		}
		if(content) {
			child.innerHTML = content;
		}
		return child;
	}

	function wall(ph23groups, wallname) {
		if (!wallname)
		{
			wallname = "wall";
		}
		
		const WIDTH = 4;
		let wallhashes = ph23groups.hashes;

		let bricks = [];
		ph23groups.clues.forEach((item, i) => {
			bricks.push({clue:item, group:WIDTH})
		});


		// build html
		let playarea = html(document.querySelector("#"+wallname), "div", "playarea");

		let wall = html(playarea, "div", "wall player");
		bricks.forEach(function(brick) {
			brick.cell = html(wall, "div");
			brick.html = html(brick.cell, "div", "brick");
			html(brick.html, "span", "", brick.clue);
			brick.html.addEventListener("click", function() {
				selectBrick(brick);
			});
		});
		playarea.classList.add('no-copy');

		const copyableWall = document.createElement('table');
		for (let r = 0; r < 4; r++) {
			const tr = document.createElement('tr');
			for (let c = 0; c < 4; c++) {
				const td = document.createElement('td');
				td.innerText = bricks[r*4+c].clue;
				tr.appendChild(td);
			}
			copyableWall.appendChild(tr);
		}
		copyableWall.className = 'copy-only';
		playarea.parentNode.insertBefore(copyableWall, playarea);

		let links;

		// sizing
		(new ResizeObserver(function() {
			wall.style.height = (wall.offsetWidth * 0.5625)+"px";
			if(links) {
				links.style.height = wall.offsetHeight+"px";
			}
			playarea.style.fontSize = (wall.offsetHeight/16)+"px";
		})).observe(wall);

		// interaction
		let locked = false;
		let group = 0;
		let selected = [];
		function selectBrick(brick) {
			if(!locked) {
				if(brick.group==WIDTH) {
					if(!selected.includes(brick)) {
						selected.push(brick);
						brick.html.classList.add("group" + group);

						if(selected.length==WIDTH) {
							locked = true;
							setTimeout(checkSelected, 350);
						}
					} else {
						selected = selected.filter(b => b!=brick);
						brick.html.classList.remove("group" + group);
					}
				}
			}
		}
		function normalizeSelected()
		{
			return selected.map(a=>a.clue).sort().join(";");
		}

		function checkSelected() {
			let link = selected[0].link;
			let hashed = encrypt(normalizeSelected());

			//if(selected.filter(brick => brick.link!=link).length==0) {
			if (wallhashes.filter(h => h == hashed).length>0)
			{
				// a correct group
				selected.forEach(function(brick) {
					brick.group = group;
				});
				// calculate new position in the grid
				let groupIndex = group * WIDTH;
				let unsolvedIndex = groupIndex + WIDTH;
				bricks.forEach(function(brick, index) {
					if(brick.group<group) {
						brick.newIndex = index;
					} else if(brick.group==group) {
						brick.newIndex = groupIndex++;
					} else {
						brick.newIndex = unsolvedIndex++;
					}
					brick.newTop = bricks[brick.newIndex].cell.offsetTop;
					brick.newLeft = bricks[brick.newIndex].cell.offsetLeft;
				});
				bricks.sort((a,b) => a.newIndex - b.newIndex);

				// next group
				group++;

				// is there only one group left?
				if(group == WIDTH-1) {
					bricks.forEach(function(brick) {
						if(brick.group>group) {
							brick.group = group;
							brick.html.classList.add("group" + group);
						}
					});
					group++;
				}

				// move
				bricks.forEach(function(brick) {
					brick.html.style.top = (brick.newTop - brick.cell.offsetTop)+"px";
					brick.html.style.left = (brick.newLeft - brick.cell.offsetLeft)+"px";
				});
				setTimeout(function() {
					bricks.forEach(function(brick) {
						wall.removeChild(brick.cell);
						brick.html.style.top = "0px";
						brick.html.style.left = "0px";
						wall.appendChild(brick.cell);
					});
					if(group < WIDTH) {
						locked = false;
					} else {
						win();
					}
				}, 1000);
			} else {
				// an incorrect group
				selected.forEach(function(brick) {
					brick.html.classList.remove("group" + group);
				});
				locked = false;
			}
			selected = [];
		}

		function win() {
		}
	}


	function editor2() {
	//	if(!groups) {
			let groups = [
				{link:"",clues:["","","",""]},
				{link:"",clues:["","","",""]},
				{link:"",clues:["","","",""]},
				{link:"",clues:["","","",""]}
			];
	//	}

		html(document.querySelector("body"), "h1", "", "Only Connect Wall Editor");
		let wall = html(document.querySelector("body"), "div", "wall editor");

		groups = groups.map(function(group, index) {
			let clues = group.clues.map(function(clue) {
				let input = html(html(wall, "div", "brick group"+index), "input");
				input.value = clue;
				return input;
			});
/*			let input = html(html(wall, "div", "link group"+index), "input");
			input.placeholder="link";
			input.value = group.link;*/

			return {
				clues: clues
			}
		});

		let button = html(html(document.querySelector("body"), "div"), "input");
		button.type="button";
		button.value="Generate Link";

		let linkBox = html(html(document.querySelector("body"), "div"), "textarea");

		button.addEventListener("click", function() {
			try {
				let clues = [];
				// fields to data string
				let hashes = [];
				groups.forEach((item) => {
					let theseclues = item.clues.map(x=>x.value.trim()).sort();
					let astring = theseclues.join(";");
					hashes.push(encrypt(astring));
					theseclues.forEach((clue) => {
						clues.push(clue);
					});

					});



				hashes.sort();
				let hashstring=hashes.join(";");
				clues.sort();

				let cluestring = clues.join(";");
				let fullstring = hashstring + "&&" + cluestring;
				// turn into url
				linkBox.value =
					location.origin +
					location.pathname.replace("edit.html", "play.html") +
					"?" + btoa(fullstring);

			} catch (e) {
				linkBox.value = "Error!\n"+ e;
			}
		});
	}

	function getData() {
		let data = atob(location.search.substr(1));
		let groups = data.split("|");
		if(groups[0]==="4" && groups.length==5) {
			return groups.slice(1).map(function(group) {
				let clues = group.split(";");
				return {
					link: clues[0],
					clues: clues.slice(1)
				};
			});
		}
	}

	function getData2(foo) {
		let data = []
		if (!foo)
		{
			data = atob(location.search.substr(1));
			if (!data)
			{
				return;
			}
		}
		else
		{
			data = atob(foo);
		}


		let sp = data.split("&&");
		let hashes = sp[0].split(";");
		let clues = sp[1].split(";");
		return {hashes: hashes, clues: clues};

	}

	// export
	window.wall = wall;
	window.editor2 = editor2;
	window.getData2 = getData2;
})();
