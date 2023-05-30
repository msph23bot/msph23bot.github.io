
function FunnyFarm(guessText, guessButton, guessResult, phraseText, stats, svg, puzzleid) {
    this.guessText = guessText;
    this.guessButton = guessButton;
    this.guessResult = guessResult;
    this.phraseText = phraseText;
    this.stats = stats;
    this.svg = svg;
    this.words = {};
    this.lines = [];
    this.highlights = [];
    var xBasis = this.svg.getAttribute("data-xbasis");
    xBasis = xBasis ? parseFloat(xBasis) : 100;
    var yBasis = this.svg.getAttribute("data-ybasis");
    yBasis = yBasis ? parseFloat(yBasis) : 100;
    this.xScale = this.svg.viewBox.baseVal.width / xBasis;
    this.yScale = this.svg.viewBox.baseVal.height / yBasis;
    this.puzzleid = puzzleid;
    this.storageKey = "funnyfarm-" + puzzleid;
    this.updateblack = function() {
        for (let [id, word] of Object.entries(this.words)) {
            if (word.solved) {
                if (!word.invisible) {
                    word.text.classList.add("black");
                    word.rect.classList.add("black");
                }

                for (var i = 0; i < word.links.length; i++) {
                    var link = word.links[i];
                    if (!link.invisible) {
                        link.text.classList.add("black");
                        link.rect.classList.add("black");
                    }
                }
            }
        }

        for (var i = 0; i < this.lines.length; i++) {
            var l = this.lines[i];
            if (l.invisible) continue;

            if (this.words[l.from].solved || this.words[l.to].solved) {
                l.line.classList.add("black");
            }
        }
    }

    this.updatehighlights = function() {
        if (!this.highlights) return;

        for (var i = 0; i < this.highlights.length; i++) {
            var h = this.highlights[i];
            var letter = this.words[h.word].text.children[h.index];
            letter.classList.add("highlight");

            var bbox = letter.getBBox();
            var rect = document.createElementNS("http://www.w3.org/2000/svg",'rect');
            rect.setAttribute("x", bbox.x - 2);
            rect.setAttribute("y", bbox.y - 2);
            rect.setAttribute("width", bbox.width + 4);
            rect.setAttribute("height", bbox.height + 4);
            rect.setAttribute("rx", 4);
            rect.setAttribute("ry", 4);
            rect.classList.add("highlight");
            this.rectsGroup.appendChild(rect);
        }
    }

    this.checkguess = function() {
        var guess = this.guessText.value.toUpperCase();
        this.guessText.value = "";
        this.submit(guess);
    }

    this.submit = function(guess)
    {
        guess = guess.toUpperCase().replace(/[^A-Z0-9]+/g, '');
        for (let [id, word] of Object.entries(this.words)) {
            if (!word.solved) {
                continue;
            }

            for (var i = 0; i < word.links.length; i++) {
                var link = word.links[i];
                if (link.invisible) continue;

                var isMatch = false;
                if (link.word.replace(/[^A-Z0-9]+/g, '') == guess) {
                    isMatch = true;
                }

                if (!isMatch && link.alternates) {
                    for (var j = 0; j < link.alternates.length; j++) {
                        if (link.alternates[j].replace(/[^A-Z0-9]+/g, '') == guess) {
                            isMatch = true;
                            break;
                        }
                    }
                }

                if (isMatch) {
                    let guessedIDs = localStorage.getItem(this.storageKey);
                    if (guessedIDs) { guessedIDs = guessedIDs.split("|"); } else { guessedIDs = []; }
                    if (!guessedIDs.includes(link.id)) {
                        guessedIDs.push(link.id);

                        if (this.puzzleid == 1000000) {
                            for (var j= 0; j < link.links.length; j++) {
                                if (link.links[j].fill=="skyblue" && !guessedIDs.includes(link.links[j].id)) { guessedIDs.push(link.links[j].id); }
                            }
                        }

                        localStorage.setItem(this.storageKey, guessedIDs.join("|"));
                    
                        this.getanswers();
                    }
                    return;
                }
            }
        }
    }

    this.getanswers = function()
    {
        let answerGroups = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        let guessedIDs = localStorage.getItem(this.storageKey);
        if (guessedIDs) { guessedIDs = guessedIDs.split("|"); } else { guessedIDs = []; }

        var response = {};
        response.solvedNodeCount = 0;
        response.totalNodeCount = 0;
        response.nodes = {};
        response.lines = [];
        response.highlights = [];
        for (let [id, w] of Object.entries(words)) {
            let wClone = Object.assign({}, w);
            let guessed = guessedIDs.includes(id.toString());
            if (guessed) response.solvedNodeCount++;
            if (!w.invisible) response.totalNodeCount++;
            if (guessed && w.answerGroup) answerGroups[w.answerGroup - 1]++;
            wClone.id = id;
            wClone.links = [];
            wClone.solved |= guessed;
            if (w.special && !guessed) {
                wClone.displayWord = "";
                for (var i = 0; i < w.special.length; i++) {
                    wClone.displayWord += (isSolved(w.special[i]) ? w.word[i] : "?");
                }
            }
            response.nodes[id] = wClone;
        };
        
        lines.forEach(l => {
            let lClone = Object.assign({}, l);
            response.lines.push(lClone);
    
            response.nodes[l.from].links.push(response.nodes[l.to]);
            response.nodes[l.to].links.push(response.nodes[l.from]);
        });

        if (this.puzzleid == 10013 && guessedIDs.includes("48")) {
            highlights.forEach(h => {
                let hClone = Object.assign({}, h);
                response.highlights.push(hClone);
            });
        }

        if (this.puzzleid == 1000000) {
            for (let [id, w] of Object.entries(response.nodes)) {
                if (w.pid && isSolved(w.pid)) {
                    let normWord = w.word.replace(/[^A-Z0-9]+/g, '')
                    let corrects = localStorage.getItem("correct-" + w.pid).split("|");
                    corrects.forEach(c => {
                        let r = c.substring(c.indexOf(",") + 1);
                        r = r.substring(r.indexOf("\u2794") + 1);
                        if (r.replace(/[^A-Z0-9]+/g, '') == normWord) {
                            w.fill = "#f75d59";
                        }
                    });
                }
                if (w.solved) {
                    w.links.forEach(link => {
                        link.marked = true;
                    });
                }
            }

            for (let [id, w] of Object.entries(response.nodes)) {
                if (!w.solved && !w.marked) {
                    w.invisible = true;
                }
            }

            response.lines.forEach(l => {
                if (response.nodes[l.from].invisible || response.nodes[l.to].invisible) { l.invisible = true; }
            });

            let phrase = "BACKALORRYATHIMTHENEARNAMONSTERSDEBRIS";
            response.phrase = "";
            for (let i = 0; i < answerGroups.length; i++) {
                response.phrase += ((answerGroups[i] < 2 || (i >= 5 && answerGroups[i] < 3)) ? "?" : phrase[i * 2]);
                response.phrase += ((answerGroups[i] < 5) ? "?" : phrase[i * 2 + 1]);
            }
        }

        this.rebuild(response);
    }

    this.rebuild = function(response) {
        this.linesGroup.innerHTML = "";
        this.rectsGroup.innerHTML = "";
        this.wordsGroup.innerHTML = "";

        this.words = response.nodes;

        this.lines = response.lines;
        if (response.highlights) { this.highlights = response.highlights; }
        if (response.phrase && this.phraseText) { this.phraseText.innerText = response.phrase; }

        for (let [id, word] of Object.entries(this.words)) {
            if (word.invisible) continue;

            var text = document.createElementNS(svgNS,'text');
    
            for (var i = 0; i < word.word.length; i++) {
                var tspan = document.createElementNS(svgNS, 'tspan');
                var ch = word.displayWord ? word.displayWord[i] : ((word.solved || word.word[i] == " " || word.word[i] == "-" || word.word[i] == "'") ? word.word[i] : "?");
                tspan.appendChild(document.createTextNode(ch));
                text.appendChild(tspan);
            }
    
            text.setAttribute("x", this.xScale * word.x);
            text.setAttribute("y", this.yScale * word.y);
            if (word.size != undefined) {
                text.style.fontSize = word.size;
            }
    
            this.wordsGroup.appendChild(text);
            word.bbox = text.getBBox();
            word.text = text;
    
            var rect = document.createElementNS(svgNS,'rect');
            rect.setAttribute("x", word.bbox.x - 4);
            rect.setAttribute("y", word.bbox.y - 4);
            rect.setAttribute("width", word.bbox.width + 8);
            rect.setAttribute("height", word.bbox.height + 8);
            rect.setAttribute("rx", 4);
            rect.setAttribute("ry", 4);
            rect.classList.add("back");
            if (word.fill != undefined) {
                rect.style.fill = word.fill;
            }
            this.rectsGroup.appendChild(rect);
            word.rect = rect;
        }
    
        for (var i = 0; i < this.lines.length; i++) {
            var l = this.lines[i];
            if (!l.invisible) {
                var frombbox = this.words[l.from].bbox;
                var tobbox = this.words[l.to].bbox;
                var path = document.createElementNS(svgNS,'path');
                var d = "M" + (frombbox.x + frombbox.width / 2) + " " + (frombbox.y + frombbox.height / 2) + " ";
                if (l.waypoints) {
                    l.waypoints.forEach((w) => { d += "L" + (this.xScale * w.x) + " " + (this.yScale * w.y) + " "; });
                }
                d += "L" + (tobbox.x + tobbox.width / 2) + " " + (tobbox.y + tobbox.height / 2);
                path.setAttribute("d", d);
                this.linesGroup.appendChild(path);
                l.line = path;
            }
        }
    
        this.updateblack();
        this.updatehighlights();

        if (this.stats) {
            this.stats.innerText = "" + response.solvedNodeCount + "/" + response.totalNodeCount;
        }
    }

    this.svg.classList.add("funny-svg");

    const svgNS = "http://www.w3.org/2000/svg";
    this.linesGroup = document.createElementNS(svgNS, 'g');
    this.svg.appendChild(this.linesGroup);
    this.rectsGroup = document.createElementNS(svgNS, 'g');
    this.svg.appendChild(this.rectsGroup);
    this.wordsGroup = document.createElementNS(svgNS, 'g');
    this.svg.appendChild(this.wordsGroup);

    this.guessText.focus();
    this.guessButton.addEventListener("click", (e) => { this.checkguess(); e.preventDefault(); });
    this.getanswers();
}
