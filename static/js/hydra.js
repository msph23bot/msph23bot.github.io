
function renderHeads()
{
    hydraState = getTeamHydraState()
    lastUnlockedHead = parseInt(hydraState['last_head_unlocked'])
    let div = document.getElementById("hydrae")
    for (i = 0; i < lastUnlockedHead+1; i++)
    {
        newHead = document.createElement('a')
        newHead.setAttribute("href","../puzzle/hydra.html?head=" + i)
        tilediv = document.createElement('div')
        tilediv.setAttribute("class","headtile")
        answerdiv = document.createElement('div')
        answerdiv.setAttribute("class","hydraanswer")
        solved = localStorage.getItem("correct-hydra-" + i)
        if (solved)
        {
            answerdiv.innerHTML = guessFromDateGuess(solved)
        }
        else
        {
            answerdiv.innerHTML = '&nbsp;'
        }
        newHead.appendChild(tilediv)
        newHead.appendChild(answerdiv)
        div.appendChild(newHead)

        listdiv =  document.getElementById("lernaeanhydra-row")
        tr = document.createElement("tr")
        tr.setAttribute("class","hydradiv")
        td1 = document.createElement("td")
        td1.innerHTML = "&nbsp;"
        td2 = document.createElement("td")
        td3 = document.createElement("td")
        td3.setAttribute("class","puzzle-answer")
        if (solved)
        {
            td3.innerHTML =  guessFromDateGuess(solved)
        }
        else
        {
            td3.innerHTML = "&nbsp;"
        }

        link = document.createElement("a")
        link.setAttribute("href", "../puzzle/hydra.html?head=" + i)
        link.innerHTML = "~~~~~~~~🐲Hydra Head🐲"
        tr.appendChild(td1)
        tr.appendChild(td2)
        td2.appendChild(link)
        tr.appendChild(td3)
        listdiv.append(tr)
    
    }

}