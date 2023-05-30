function normalizeGuess(guess) { return guess.toUpperCase().replace(/[^A-Z0-9]+/g, ''); }
function guessFromDateGuess(dg) { return dg.substring(dg.indexOf(",") + 1); }

function showPriorGuesses(keyid, isHydra = false) {
    let puz = null;
    let id = keyid
    if (isHydra)
    {
        if (keyid < 0)
        {
            return;
        }

        if (typeof id == 'string' && id.indexOf('hydra-')>=0)
        {
            id = id.replace('hydra-','')
        }
        map = {0:2035, 1:2027, 2:2029, 3:2032, 4:2033, 5:2034}
        puz = puzzleDbPuzzles[map[id % 6]];
        id = 'hydra-' + id
    }
    else
    {
        puz = puzzleDbPuzzles[id];
    }

    let incorrect = localStorage.getItem("incorrect-" + id);
    let correct = localStorage.getItem("correct-" + id);
    let correctInputs = [];
    if (incorrect) {
        let incorrectList = incorrect.split("|");

        let priorWrongGuesses = document.querySelector(".prior-wrong-guesses");
        if (!priorWrongGuesses) {
            let f = document.createDocumentFragment();
            let h4 = document.createElement('h4');
            h4.innerText = "Past Submissions";
            f.append(h4);
            priorWrongGuesses = document.createElement("ul");
            priorWrongGuesses.classList.add("prior-wrong-guesses");
            f.append(priorWrongGuesses);
            let main = document.querySelector("main");
            main.appendChild(f);
        }

        priorWrongGuesses.innerText = "";

        incorrectList.forEach(i => {
            let li = document.createElement("li");
            let guess = guessFromDateGuess(i);
            let response = '';
            if (puz.partials)
                response = puz.partials[normalizeGuess(guess)];
            li.innerText = guess + (response ? (": " + response) : "");
            priorWrongGuesses.appendChild(li);
        });
    }

    if (correct) {
        let titleMarker = document.querySelector(".solved-title-marker");
        let correctList = correct.split("|").sort();
        if (!titleMarker) {
            titleMarker = document.createElement("div");
            titleMarker.classList.add("solved-title-marker");
            document.querySelector("h1").appendChild(titleMarker);
        }

        for (let i = 0; i < correctList.length; i++) { correctList[i] = guessFromDateGuess(correctList[i]); }
        if (puz.io) { correctList.forEach(c => correctInputs.push(c.split("\u2794")[0])); }
        let numAnswers = puz.io ? Object.keys(puz.io).length : puz.answers.length;
        titleMarker.innerText = "";
        let text = document.createTextNode(correctList.length >= numAnswers ? "Solved!\u00a0\u00a0\u00a0" : "Partially solved:\u00a0\u00a0\u00a0");
        if (correctList.length < numAnswers) correctList.push("(*)");
        titleMarker.appendChild(text);
        let correctSpan = document.createElement("span");
        correctSpan.classList.add("solved-title-answer");
        correctSpan.innerText = correctList.join(", ");
        titleMarker.appendChild(correctSpan);
        
    }

    if (puz.io) {
        let select = document.getElementById("id_input");
        while (select.options.length) { select.options.remove(select.options.length - 1); }
        cs_outputs_string=localStorage.getItem("cs_outputs")
        cs_outputs=[]
        if (cs_outputs_string) cs_outputs = cs_outputs_string.split(',');
        cs_possible_inputs = puz.initial_inputs
        for (i = 0; i < cs_outputs.length; i++)
        {
            cs_possible_inputs.push(cs_outputs[i])
        }
        
        for (let input in puz.io) {
            if (correctInputs.includes(input)) continue;
            if (!cs_possible_inputs.includes(input)) continue;
            let option = document.createElement("option");
            option.value = input;
            option.innerText = input;
            select.options.add(option);
        }
    }
}

function addGuess(guess, key) {
    let guesses = localStorage.getItem(key);
    if (guesses) { guesses = guesses.split("|"); } else { guesses = []; }
    let norm = normalizeGuess(guess);
    if (guesses.some(g => norm == normalizeGuess(guessFromDateGuess(g)))) return;
    guesses.unshift(new Date().toISOString() + "," + guess);
    localStorage.setItem(key, guesses.join("|"));
}

function evaluateGuess(keyid, normalizer=function(g){return normalizeGuess(g);}, isHydra=false) {

    let puz = null;
    let id = keyid
    if (isHydra)
    {
        if (typeof id == 'string' && id.indexOf('hydra-')>=0)
        {
            id = id.replace('hydra-','')
        }
        map = {0:2035, 1:2027, 2:2029, 3:2032, 4:2033, 5:2034}
        proxypuz = map[id%6]

        puz = puzzleDbPuzzles[map[id % 6]]

        id = 'hydra-' + id
    }
    else
    {
        puz = puzzleDbPuzzles[id];
    }

    let guess = document.getElementById("id_answer").value.toUpperCase();
    let norm = normalizer(guess);
    document.getElementById("id_answer").value = "";
    if (!norm) return;

    let correct = false;

    if (puz.io) {
        let input = document.getElementById("id_input").value;
        guess = input + "\u2794" + guess;
        correct = puz.io[input] === norm;
    }
    else {
        correct = puz.answers.includes(norm);
    }

    if (correct) {
        toastr.success(guess+' is correct!','Correct!')
        if (puz.io)
        {
            let input = document.getElementById("id_input").value;
            cs_outputs_string=localStorage.getItem("cs_outputs")
            if (!cs_outputs_string)
            {
                cs_outputs_string =puz.io[input]
            }
            else
            {
                cs_outputs_string += ',' + puz.io[input]
            }
            localStorage.setItem('cs_outputs', cs_outputs_string)
        }

        let previousUnlocks = computeAllUnlocks();
        puzzleSolveCache = null;
        addGuess(guess, "correct-" + id);
        let currentUnlocks = computeAllUnlocks();
        beat = document.getElementById("solved-"+id)
        if (beat)
        {
            beat.setAttribute("style","display:block;")
        }
        if (id === 10013) { martianize(); }

        if (isHydra)
        {
            if (typeof id == 'string' && id.indexOf('hydra-')>=0)
            {
                id = id.replace('hydra-','')
            }

            class2unlocks = {0:5, 1:1, 2:10, 3:3, 4:3, 5:9}
            unlocks = class2unlocks[id%6]
            hydrateamstate = getTeamHydraState()
            for (i = 0; i < unlocks; i++)
            {
                newnum = parseInt(hydrateamstate['last_head_unlocked']) + 1 + i
                let payload = JSON.stringify({'title':"You've unlocked a new puzzle!", 'text':'Hydra Head', 'link':"../puzzle/hydra.html?head="+newnum});
                showNotify(payload);
            }
            hydrateamstate['last_head_unlocked']  = parseInt(hydrateamstate['last_head_unlocked']) + unlocks

            if (hydrateamstate.proxy[id%6] == '')
            {
                hydrateamstate.proxy[id%6] = puz.answers[0]
            }
            setTeamHydraState(hydrateamstate)
        }
        else
        {
            for (const [id, u] of Object.entries(currentUnlocks)) {
                if (!previousUnlocks[id]) {
                    let payload = JSON.stringify({'title':"You've unlocked a new puzzle!", 'text':puzzleDbPuzzles[id].display_name, 'link':"../puzzle/"+puzzleDbPuzzles[id].slug+".html"});
                    if (id == 61) // CS meta
                    {
                        meta_new_inputs = ['PAWN','GUSH','QUAYD','LOCK']
                        meta_new_inputs_string = meta_new_inputs.join(',')
                        cs_outputs_string=localStorage.getItem("cs_outputs")
                        if (!cs_outputs_string)
                        {
                            cs_outputs_string =meta_new_inputs_string
                        }
                        else
                        {
                            cs_outputs_string += ',' + meta_new_inputs_string
                        }
                        localStorage.setItem('cs_outputs', cs_outputs_string)
                    }
                    showNotify(payload);
                    beat = document.getElementById("unlocked-"+id)
                    if (beat)
                    {
                        beat.setAttribute("style","display:block;")
                    }
                }
            }
        }
    } else {
        addGuess(guess, "incorrect-" + id);
        toastr.error('Sorry, '+guess+' is incorrect','Incorrect!');
    }
    showPriorGuesses(id, isHydra);
}

function addAnswerSupport(id, normalizer=function(x){return normalizeGuess(x);}) {
    showPriorGuesses(id);
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        evaluateGuess(id, normalizer);
    });    
    document.querySelector(".delete-row").addEventListener("click", (e) => {
        e.preventDefault();
        this.closest('form').requestSubmit();
    });
}

var puzzleSolveCache = null;

function checkPuzzleCache() {
    if (!puzzleSolveCache)
    {
        puzzleSolveCache = { solved: {}, roundSolved: {}, globalSolved: 0, roundFullSolved:{}, globalAtLeastOneSolved: 0};
    
        for (const [id, puz] of Object.entries(puzzleDbPuzzles)) {
            let corrects = localStorage.getItem("correct-" + id);
            if (corrects) {
                puzzleSolveCache.solved[id] = true;
                if (typeof id == 'string' && id.indexOf('hydra-') >= 0) continue;
                let round = puzzleDbPuzzles[id].round;

                let r = puzzleSolveCache.roundSolved[round];
                numCorrectForPuzzle = corrects.split("|").length
                if (!r) { r = 0; }
                puzzleSolveCache.roundSolved[round] = r + numCorrectForPuzzle;
                if (round >= 1 && round <= 8 && id != puzzleDbRounds[round].meta) { puzzleSolveCache.globalSolved+=numCorrectForPuzzle; }
                let numAnswers = puz.io ? Object.keys(puz.io).length : puz.answers.length;
                let rf = puzzleSolveCache.roundFullSolved[round];
                if (!rf) { rf = 0; }
                if (numCorrectForPuzzle >= numAnswers)
                {
                    puzzleSolveCache.roundFullSolved[round]  = rf + 1
                }
                if (numCorrectForPuzzle >= 1)
                {
                    if (round >= 1 && round <= 8 && id != puzzleDbRounds[round].meta) { puzzleSolveCache.globalAtLeastOneSolved++; }
                }
            }
        }
    }
}

function isUnlocked(id) {
    if (localStorage.getItem("unlock-all")) return true;

    checkPuzzleCache();

    puz = puzzleDbPuzzles[parseInt(id)];

    let unlock = (id == 1000000);
    if (puz.unlock_global >= 0 && puzzleSolveCache.globalAtLeastOneSolved >= puz.unlock_global) { unlock = true; }
    if (puz.unlock_local >= 0 && puzzleSolveCache.roundSolved[puz.round] >= puz.unlock_local) { unlock = true; }
    if (puz.prerequisites && puz.prerequisites.some(p => !puzzleSolveCache.solved[p])) { unlock = false; }
    return unlock;
}

function isSolved(id) {
    checkPuzzleCache();
    return puzzleSolveCache.solved[id];
}

function computeAllUnlocks() {
    unlocked = {};
    for (const [id, puz] of Object.entries(puzzleDbPuzzles)) {
        if (isUnlocked(id)) {
            unlocked[id] = true;
        }
    }

    return unlocked;
}

function hideStaticItems() {
    let unlockChecks = document.querySelectorAll(".hide-if-locked, .hide-if-unlocked");
    let solveChecks = document.querySelectorAll(".hide-if-solved, .hide-if-unsolved");

    if (unlockChecks.length == 0 && solveChecks.length == 0) return;

    unlockChecks.forEach(check => { check.classList.remove("hide-from-static"); });
    solveChecks.forEach(check => { check.classList.remove("hide-from-static"); });

    unlockChecks.forEach(check => {
        let id = check.getAttribute("data-puzzle-id");
        let unlocked = isUnlocked(id);
        if ((unlocked && check.classList.contains("hide-if-unlocked")) || (!unlocked && check.classList.contains("hide-if-locked"))) {
            check.classList.add("hide-from-static");
        }
    });

    solveChecks.forEach(check => {
        let id = parseInt(check.getAttribute("data-puzzle-id"));
        let solved = isSolved(id);
        if ((!solved && check.classList.contains("hide-if-unsolved")) || (solved && check.classList.contains("hide-if-solved"))) {
            check.classList.add("hide-from-static");
        }
    });

}

function hideSolutions()
{
    if (!localStorage.getItem('show-solution-button'))
    {
        elements = document.getElementsByClassName("solution-button")
        for (i=0;i<elements.length; i++)
        {
            solution_button = elements[i]
            if (solution_button && !(localStorage.getItem("correct-1000000")))
            {
                solution_button.setAttribute("style","display:none;")
            }
        }
    }

}
function displayAnswers() {
    document.querySelectorAll(".display-answer").forEach(ans => {
        let id = ans.getAttribute("data-puzzle-id");
        let correct = localStorage.getItem("correct-" + id);
        let puz = puzzleDbPuzzles[id];

        if (!correct) return;
        let correctList = correct.split("|").sort();

        for (let i = 0; i < correctList.length; i++) { correctList[i] = guessFromDateGuess(correctList[i]); }
        let numAnswers = puz.io ? Object.keys(puz.io).length : puz.answers.length;
        if (correctList.length < numAnswers) correctList.push("(*)");
        ans.innerHTML = correctList.join(", ");
    });
}

function roundsPath()
{
    url = document.URL
    if (url.indexOf('round') >= 0)
    {
        return "../round/"
    }
    if (url.indexOf('/puzzle/') >= 0)
    {
        return "../round/"
    }
    if (url.indexOf('solve/') >= 0)
    {
        return "../round/"
    }
    if (url.indexOf("/stats/") >= 0)
    {
        return "../round/"
    }
    if (url.indexOf("/solution/") >= 0)
    {
        return "../round/"
    }
    if (url.indexOf("/sociology/") >= 0)
    {
        return "../round/"
    }
    if (url.indexOf("/team/") >= 0)
    {
        return "../round/"
    }
    return "round/"
}

function renderDepartmentDropdown() {

    checkPuzzleCache()
    roundPath = roundsPath()
    dddiv = document.getElementById('deptdropdownmenu')

    button = document.createElement('button')
    button.setAttribute("class","selected-tab")
    button.setAttribute("id","puzzle-dropdown-button")
    button.setAttribute("aria-haspopup","true")
    button.setAttribute("aria-controls","Department-dropdown")
    button.innerText = " Departments "
    span = document.createElement('span')
    span.setAttribute("class","material-symbols-outlined back-icon no-copy")
    span.innerText = "arrow_drop_down"
    button.appendChild(span)
    dddiv.appendChild(button)

    pdd = document.createElement("div")
    pdd.setAttribute("id","puzzle-dropdown")
    pdd.setAttribute("role","menu")
    pdd.setAttribute("aria-labelledby","puzzle-dropdown-button")
    pdda = document.createElement("a")
    pdda.setAttribute("role","menuitem")
    pdda.setAttribute("href",roundPath + "../departments.html")
    pdda.innerText = ("All departments")
    pdd.appendChild(pdda)
    dddiv.appendChild(pdd)
    hr1 = document.createElement("hr")
    pdd.appendChild(hr1)

    displayorder = [10,2,6,4,3,8,1,5,7,11,1000]
    metasSolved = 0
    displayedNext = false
    for (i=0; i < displayorder.length; i++)
    {
        deptId = displayorder[i]
        round = puzzleDbRounds[deptId]

        if ((localStorage.getItem("unlock-all") && deptId!=1000) || deptId == 10 || (deptId == 11 && isUnlocked(153)) || puzzleDbRounds[deptId].interlude && localStorage.getItem("correct-" + puzzleDbRounds[deptId].interlude))
        {
            suffix = ""
            if (puzzleDbRounds[deptId].meta)
            {
                if (localStorage.getItem("correct-"+puzzleDbRounds[deptId].meta))
                {
                    metasSolved++;
                    suffix = "✅"
                }
            }

            teamRoundSolves = puzzleSolveCache.roundFullSolved[deptId]
            if (!teamRoundSolves)
            {
                teamRoundSolves = 0
            }
            total = puzzleDbRounds[deptId].total
            if (total == teamRoundSolves)
            {
                suffix = "💯"
            }
            alink=document.createElement("a")
            alink.setAttribute("role","menuitem")
            alink.setAttribute("href",roundPath + round.slug + ".html")
            divrdv = document.createElement("div")
            divrdv.setAttribute("class","round-dropdown-value")
            spanroundname = document.createElement("span")
            spanroundname.setAttribute("class","round-name")
            spanroundname.innerText = round.title + " " + suffix
            alink.appendChild(divrdv)
            divrdv.appendChild(spanroundname)
            pdd.appendChild(alink)
        }
        else if (puzzleDbRounds[deptId].interlude && isUnlocked(puzzleDbRounds[deptId].interlude))
        {
            alink=document.createElement("a")
            alink.setAttribute("role","menuitem")
            alink.setAttribute("href",roundPath + "interludes.html")
            divrdv = document.createElement("div")
            divrdv.setAttribute("class","round-dropdown-value")
            spanroundname = document.createElement("span")
            spanroundname.setAttribute("class","round-name")
            spanroundname.innerHTML = "<i>Interlude available</i>"
            alink.appendChild(divrdv)
            divrdv.appendChild(spanroundname)
            pdd.appendChild(alink)
        }
        else if (deptId <=11 && deptId >=1)
        {
            if (!displayedNext)
            {
                displayedNext = true
                howManyMore = puzzlesLeftToUnlockRound(deptId)
                alink=document.createElement("a")
                alink.setAttribute("role","menuitem")
                divrdv = document.createElement("div")
                divrdv.setAttribute("class","round-dropdown-value")
                spanroundname = document.createElement("span")
                spanroundname.setAttribute("class","round-name")
                if (deptId == 11 || howManyMore <= 0)
                {
                    spanroundname.innerHTML =  "???"
                }
                else
                {
                    spanroundname.innerHTML =  "<i>Solve " + howManyMore + " more</i>"
                }
                alink.appendChild(divrdv)
                divrdv.appendChild(spanroundname)
                pdd.appendChild(alink)
            }
            else
            {
                alink=document.createElement("a")
                alink.setAttribute("role","menuitem")
                divrdv = document.createElement("div")
                divrdv.setAttribute("class","round-dropdown-value")
                spanroundname = document.createElement("span")
                spanroundname.setAttribute("class","round-name")
                spanroundname.innerText =  "???"
                alink.appendChild(divrdv)
                divrdv.appendChild(spanroundname)
                pdd.appendChild(alink) 
            }
        }
        else
        {
            // metameta
        }
    }

    if (!isUnlocked(1000000))
    {
        if (!displayedNext)
        {
            alink=document.createElement("a")
            alink.setAttribute("role","menuitem")
            divrdv = document.createElement("div")
            divrdv.setAttribute("class","round-dropdown-value")
            spanroundname = document.createElement("span")
            spanroundname.setAttribute("class","round-name")
            metasLeft = 8-metasSolved
            spanroundname.innerHTML =  "<i>Solve " + metasLeft + " metas</i>"
            alink.appendChild(divrdv)
            divrdv.appendChild(spanroundname)
            pdd.appendChild(alink) 
        }
        else
        {
            alink=document.createElement("a")
            alink.setAttribute("role","menuitem")
            divrdv = document.createElement("div")
            divrdv.setAttribute("class","round-dropdown-value")
            spanroundname = document.createElement("span")
            spanroundname.setAttribute("class","round-name")
            metasLeft = 8-metasSolved
            spanroundname.innerText =  "???"
            alink.appendChild(divrdv)
            divrdv.appendChild(spanroundname)
            pdd.appendChild(alink) 
        }
    }                    
    else
    {
        round = puzzleDbRounds[1000]
        alink=document.createElement("a")
        alink.setAttribute("role","menuitem")
        alink.setAttribute("href",roundPath + round.slug + ".html")
        divrdv = document.createElement("div")
        divrdv.setAttribute("class","round-dropdown-value")
        spanroundname = document.createElement("span")
        spanroundname.setAttribute("class","round-name")
        suffix = ""
        if (localStorage.getItem("correct-1000000"))
        {
            suffix = "💯"
        }
        spanroundname.innerText =  round.title + " " + suffix
        alink.appendChild(divrdv)
        divrdv.appendChild(spanroundname)
        pdd.appendChild(alink) 
    }                  
                
    dddiv.setAttribute("class", "menu-button-links")
    setMenuButtons()
 
}
function puzzlesLeftToUnlockRound(roundId)
{
    round = puzzleDbRounds[roundId]
    if (round.interlude)
    {
        interlude = puzzleDbPuzzles[round.interlude]
        unlock_global = parseInt(interlude.unlock_global)
        checkPuzzleCache()
        return unlock_global - puzzleSolveCache.globalAtLeastOneSolved
    }

    return 0
}

function renderDepartmentInfo()
{
    checkPuzzleCache()
    metasSolved = 0;
    displayorder = [10,2,6,4,3,8,1,5,7,11,1000]
    shownhowmanymore =  false
    for (d in displayorder)
    {
        deptId = displayorder[d]
        img = document.getElementById("round-" + deptId + "-image")
        card = document.getElementById("round-" + deptId + "-card")
        nom = document.getElementById("round-" + deptId + "-name")
        if (puzzleDbRounds[deptId].meta)
        {
            if (localStorage.getItem("correct-"+puzzleDbRounds[deptId].meta))
            {
                metasSolved++;
            }
        }
        if ((localStorage.getItem("unlock-all") && deptId!=1000) || deptId == 10 || ((deptId == 11 && isUnlocked(153))) || puzzleDbRounds[deptId].interlude && localStorage.getItem("correct-" + puzzleDbRounds[deptId].interlude))
        {
            teamRoundSolves = puzzleSolveCache.roundFullSolved[deptId]
            if (!teamRoundSolves)
            {
                teamRoundSolves = 0
            }
            total = puzzleDbRounds[deptId].total
            card.innerHTML = teamRoundSolves + "/" + total
            if (puzzleDbRounds[deptId].meta && localStorage.getItem("correct-" +puzzleDbRounds[deptId].meta ))
            {
                ans = puzzleDbPuzzles[puzzleDbRounds[deptId].meta].answers[0]
                metaanswer = document.createElement("div")
                metaanswer.setAttribute("class", "meta-answer")
                metaanswer.innerText = ans
                card.parentNode.insertBefore(metaanswer, card.nextSibling)
            }
        }
        else if ((puzzleDbRounds[deptId].interlude && isUnlocked(puzzleDbRounds[deptId].interlude)))
        {
            card.innerHTML = '???'
            img.setAttribute("src","static/images/thumbs/unknown.png")
            links = document.getElementsByClassName("round-" + deptId + "-link")
            for (i = 0; i < links.length; i++)
            {
                links[i].setAttribute("href","")
            }
            nom.innerHTML = '<a style="color:blue;" href="round/interludes.html">Interlude unlocked</a>'
        }
        else if (deptId == 11 && !isUnlocked(153))
        {
            card.innerHTML = ""
            img.setAttribute("src","static/images/thumbs/unknown.png")
            links = document.getElementsByClassName("round-" + deptId + "-link")
            for (i = 0; i < links.length; i++)
            {
                links[i].setAttribute("href","")
            }
            nom.innerText = "???"  
        }
        else if (deptId <=9 && deptId >=1)
        {
            if (!shownhowmanymore)
            {
                shownhowmanymore = true
            
                howManyMore = puzzlesLeftToUnlockRound(deptId)
                if (howManyMore > 0)
                {
                    card.innerHTML = "Solve " + howManyMore + " to unlock"
                }
                else
                {
                    card.innerHTML = ""
                }
                img.setAttribute("src","static/images/thumbs/unknown.png")
                links = document.getElementsByClassName("round-" + deptId + "-link")
                for (i = 0; i < links.length; i++)
                {
                    links[i].setAttribute("href","")
                }
                nom.innerText = "???"
            }
            else
            {
                card.innerHTML = ""
                img.setAttribute("src","static/images/thumbs/unknown.png")
                links = document.getElementsByClassName("round-" + deptId + "-link")
                for (i = 0; i < links.length; i++)
                {
                    links[i].setAttribute("href","")
                }
                nom.innerText = "???"  
            }
        }
        else
        {
            // metameta
        }
    }

    if (!isUnlocked(1000000))
    {
        img = document.getElementById("round-1000-image")
        card = document.getElementById("round-1000-card")
        if (!shownhowmanymore)
        { 
            card.innerHTML = 'Solve all metas'
        }
        else
        {
            card.innerHTML = ""
        }
        
        img.setAttribute("src","static/images/thumbs/unknown.png")
        links = document.getElementsByClassName("round-1000-link")
        for (i = 0; i < links.length; i++)
        {
            links[i].setAttribute("href","")
        }
        nom.innerText="???"
    }
}

var hydraCache = null;
function getTeamHydraState()
{
    checkHydraCache()
    return hydraCache
}

function setTeamHydraState(state)
{
    localStorage.setItem('lernaeanhydrastate', JSON.stringify(state))
}

function checkHydraCache()
{
    if (!hydraCache)
    {
        hydraJson = localStorage.getItem('lernaeanhydrastate')
        if (!hydraJson)
        {
            hydraCache = {'last_head_unlocked':'1','proxy':['','','','','','']}
            localStorage.setItem('lernaeanhydrastate', JSON.stringify(hydraCache))
        }
        else
        {
            hydraCache = JSON.parse(hydraJson)
        }
    }
}

var myHead = null;

function currentHead()
{
    if (myHead)
    {
        return myHead;
    }

    // get head index
    headIndex = -1;
    qsps = document.URL.split('?').pop().split('&')
    map = {}
    for (i = 0; i < qsps.length; i++)
    {
        pair = qsps[i].split('=')
        map[pair[0]] = pair[1]
    }

    if ('head' in map)
    {
        headIndex = parseInt(map['head'])
        if (isNaN(headIndex))
        {
            headIndex = -1
        }
    }

    myHead = headIndex
    return myHead
}

function renderHead()
{
    // get head index
    headIndex = currentHead()
    state = getTeamHydraState()
    if (!localStorage.getItem("unlock-all") && (headIndex > state.last_head_unlocked || headIndex < 0))
    {
        
        showNotify('{"title":"Cannot access puzzle","text":"You have not unlocked a puzzle with that name","link":"../rounds/classics.html"}')
        setTimeout(()=>{window.location.replace("../round/classics.html")},2000)
        return
    }

    // render
    let div = document.getElementById("hydraheadcontents")
    
    actualhead = headIndex % 6
    proxyName = "proxy_hydra_" + actualhead + ".html"
    $(function(){

        $("#hydraheadcontents").load(proxyName)
        $("#posthuntsolve").attr("href", '../post-hunt-solve/hydra.html?head='+ headIndex)

    });
}

function renderSolvePage()
{
    headIndex = currentHead()
    state = getTeamHydraState()
    if (!localStorage.getItem("unlock-all") &&  (headIndex > state.last_head_unlocked || headIndex < 0))
    {
        
        showNotify('{"title":"Cannot access puzzle","text":"You have not unlocked a puzzle with that name","link":"../rounds/classics.html"}')
        setTimeout(()=>{window.location.replace("../round/classics.html")},2000)
        return
    }

    actualhead = headIndex % 6
    proxyName = "proxy_hydra_" + actualhead + ".html"
    $(function(){
        
        $("#backtopuzzle").attr("href", '../puzzle/hydra.html?head=' + headIndex)
        $("#deleterowprox").attr("href", 'hydra.html?head=' + headIndex + '#')
        $("#stats").attr("href", '../stats/'+proxyName)

    });
}


function addHydraAnswerSupport(normalizer=function(x){return normalizeGuess(x);}) {
    id = currentHead()
    showPriorGuesses(id, true);
    var form=document.getElementById('ansform');
    var input = document.createElement('input');//prepare a new input DOM element
    input.setAttribute('name', 'head');//set the param name
    input.setAttribute('value', id);//set the value
    input.setAttribute('type', 'hidden');//set the value

    form.appendChild(input);//append the input to the form
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        evaluateGuess(id, normalizer, true);
    });    
    document.querySelector(".delete-row").addEventListener("click", (e) => {
        e.preventDefault();
        this.closest('form').requestSubmit();
    });
}

function martianize() {
    if (!isSolved(10013)) return;

    // 1
    document.querySelectorAll("video.background-image").forEach(v => {
        v.src = v.src.replace("hero_banner.mp4", "hero_banner_m.mp4");
    });

    // 2+7
    document.querySelectorAll(".page-header-bar img").forEach(i => {
        i.src = i.src.replace("puzzu_logo.png", "puzzu_logo_m.png");
    });

    // 3
    var r = document.querySelector(':root');
    r.style.setProperty("--accent-rgb", "120, 10, 10");
    r.style.setProperty("--secondary-accent-rgb", "81, 39, 28");
    r.style.setProperty("--accent-hover-color", "#fa2");

    // 4
    var link = document.querySelector("link[rel~='icon']");
    if (link) {
        link.href = link.href.replace("favicon-ph23.ico", "favicon-mars.ico");
    }

    // 5
    document.querySelectorAll("div.background-image").forEach(d => {
        var cs = window.getComputedStyle(d);
        d.style.backgroundImage = cs.backgroundImage.replace("ms_campus.webp", "ms_campus_m.webp");
    });

    // 6
    document.querySelectorAll(".home-hunt-icon img").forEach(i => {
        i.src = i.src.replace("puzzu_logo.svg", "puzzu_logo_m.svg");
    });
}
var slug2id = {"writing-complementary-characters":"1","mercantile-exchanges":"3","macroeconomics":"4","point-of-view":"5","supply-and-demand":"6","historic-preservation":"39","greens-theorem":"40","regular-numbers":"41","cs-clues":"42","cs-list":"43","cs-logic":"44","cs-empty":"45","counterpoint":"46","caesar-studies":"47","mathematics-meta":"48","english-meta":"49","the-crommyonian-sow":"50","the-aloadae":"51","classics-meta":"52","dis-legomena":"53","sociology-meta":"54","classical-influences-on-modern-architecture":"55","its-all-greek-to-me":"57","royal-society":"58","history-meta":"60","cs-meta":"61","economics-meta":"63","human-capital":"65","category-theory":"66","pyramid-schemes":"67","fibonacci-sequence":"68","key-changes":"69","alternative-orthographonology":"70","the-twelve-knights-of-the-round-table":"71","xnynzn":"72","the-british-invasion":"73","tour-management":"74","set-theory":"77","music-meta":"80","lie-groups":"81","the-history-of-crossword-puzzles":"83","the-music-of-rascal-flatts":"85","the-middle-class":"87","guns-and-butter":"89","the-telescope":"91","cryptocurrency":"92","how-the-other-half-lives":"93","the-music-of-taylor-swift":"94","choreography":"95","the-social-ladder-through-the-ages":"128","sociology-of-education":"129","social-pathology":"130","recognition-on-a-first-name-basis":"131","transformative-social-change":"133","the-eurozone":"135","socio-logical-inquiry-into-commerce":"136","c-is-for-closing-bell":"137","ozymandias":"138","learningfromouroldmistakes":"139","the-olympics":"140","lesser-labors":"141","articles-of-incorporation":"142","transposition":"143","cryptosociology":"145","differences-in-emotional-expression":"146","themesandcounterthemes":"147","the-hundred-years-war":"148","interlude-history":"149","interlude-english":"150","interlude-computer-science":"151","interlude-econ":"153","interlude-music":"154","interlude-math":"155","interlude-classics":"156","interlude-sociology":"157","lernaeanhydra":"2019","proxy_hydra_1":"2027","proxy_hydra_2":"2029","proxy_hydra_3":"2032","proxy_hydra_4":"2033","proxy_hydra_5":"2034","proxy_hydra_0":"2035","hydra0":"2036","hydra1":"2037","hydra2":"2038","hydra3":"2039","hydra4":"2040","hydra5":"2041","hydra6":"2042","hydra7":"2043","hydra8":"2044","hydra9":"2045","hydra10":"2046","hydra11":"2047","hydra12":"2048","hydra13":"2049","hydra14":"2050","hydra15":"2051","hydra16":"2052","hydra17":"2053","hydra18":"2054","hydra19":"2055","hydra20":"2056","hydra21":"2057","hydra22":"2058","hydra23":"2059","hydra24":"2060","hydra25":"2061","hydra26":"2062","hydra27":"2063","hydra28":"2064","hydra29":"2065","hydra30":"2066","hydra31":"2067","hydra32":"2068","hydra33":"2069","hydra34":"2070","hydra35":"2071","hydra36":"2072","hydra37":"2073","hydra38":"2074","hydra39":"2075","hydra40":"2076","hydra41":"2077","hydra42":"2078","hydra43":"2079","hydra44":"2080","hydra45":"2081","hydra46":"2082","hydra47":"2083","hydra48":"2084","hydra49":"2085","hydra50":"2086","hydra51":"2087","hydra52":"2088","hydra53":"2089","hydra54":"2090","hydra55":"2091","hydra56":"2092","hydra57":"2093","hydra58":"2094","hydra59":"2095","hydra60":"2096","hydra61":"2097","hydra62":"2098","hydra63":"2099","hydra64":"2100","hydra65":"2101","hydra66":"2102","hydra67":"2103","hydra68":"2104","hydra69":"2105","hydra70":"2106","hydra71":"2107","hydra72":"2108","hydra73":"2109","hydra74":"2110","hydra75":"2111","hydra76":"2112","hydra77":"2113","hydra78":"2114","hydra79":"2115","hydra80":"2116","hydra81":"2117","hydra82":"2118","hydra83":"2119","hydra84":"2120","hydra85":"2121","hydra86":"2122","hydra87":"2123","hydra88":"2124","hydra89":"2125","hydra90":"2126","hydra91":"2127","hydra92":"2128","hydra93":"2129","hydra94":"2130","hydra95":"2131","hydra96":"2132","hydra97":"2133","hydra98":"2134","hydra99":"2135","hydra100":"2136","hydra101":"2137","ph1":"10001","ph2":"10002","ph3":"10003","ph4":"10004","ph5":"10005","ph6":"10006","ph7":"10007","ph8":"10008","ph9":"10009","ph10":"10010","ph11":"10011","ph12":"10012","ph13":"10013","ph14":"10014","ph15":"10015","ph16":"10016","ph17":"10017","ph18":"10018","ph19":"10019","ph20":"10020","ph21":"10021","ph22":"10022","major-monster-mash":"1000000"}
function clearLocalState()
{
    localStorage.removeItem('unlock-all')

    localStorage.removeItem('cs_outputs')
    hydrastate = localStorage.getItem('lernaeanhydrastate')
    if (hydrastate)
    {
        for (i = 0; i < hydrastate.last_head_unlocked+1; i++)
        {
            localStorage.removeItem('correct-hydra-'+i)
            localStorage.removeItem('incorrect-hydra-'+i)
        }
    }
    for (i in puzzleDbPuzzles)
    {
        localStorage.removeItem('correct-'+i)
        localStorage.removeItem('incorrect-'+i)
    }
    localStorage.removeItem('lernaeanhydrastate')
    localStorage.removeItem('funnyfarm-10013')
    localStorage.removeItem('funnyfarm-1000000')
}

function importState(superstateString)
{
    clearLocalState()
    superstate = JSON.parse(superstateString)
    if (superstate.lernaeanhydrastate)
    {
        localStorage.setItem('lernaeanhydrastate',JSON.stringify(superstate.lernaeanhydrastate))
    }

    if (superstate.cs_outputs)
    {
        localStorage.setItem('cs_outputs', JSON.stringify(superstate.cs_outputs))
    }
    
    for (slug in superstate.puzzles)
    {
        puz = superstate.puzzles[slug]
        if (slug.indexOf('hydra') ==0 )
        {
            whichHead = parseInt(slug.replace('hydra',''))
            if (puz.correct) localStorage.setItem('correct-hydra-'+whichHead, puz.correct)
            if (puz.incorrect) localStorage.setItem('incorrect-hydra-'+whichHead, puz.incorrect)
        }
        else
        {
            id = slug2id[slug]
            if (puz.correct) localStorage.setItem('correct-'+id, puz.correct)
            if (puz.incorrect) localStorage.setItem('incorrect-' + id, puz.incorrect)
        }
    }

    for (slug in superstate.funnyfarms)
    {
        id = slug2id[slug]
        localStorage.setItem('funnyfarm-'+id, superstate.funnyfarms[slug])
    }
}

document.documentElement.style.display="none";
document.addEventListener('DOMContentLoaded', function() {
    renderDepartmentDropdown();
    martianize();
    hideStaticItems();
    displayAnswers();
    hideSolutions();
    document.documentElement.style.display=null;
});
