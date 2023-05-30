
/* export:
{'lernaeanhydrastate':{
	'last_head_unlocked':"1"
	'proxy':['', '', '', '', '', '']},
 'puzzles':{
 'writing-complementary-characters':
 {	'correct':'2023-05-19T18:33:48.173Z,FRAYED➔AFRAID|2023-05-19T18:33:25.701Z,GNU➔ANEW|2023-05-19T18:32:32.455Z,CYST➔ASSIST',
	'incorrect':'2023-05-19T18:33:19.611Z,FRAYED➔ANEW'
 }},
 'cs_outputs':'HUNT,FLUE,HELM,OUTRO,ASSIST,HAFT,ANEW,AFRAID,BLOAT,PAWN,GUSH,QUAYD,LOCK,ROLE,PEST'}
*/



function exportFromStatic()
{
    superstate = {}
    superstate.puzzles={}
    hydra = JSON.parse(localStorage.getItem('lernaeanhydrastate'))
    if (hydra)
    {
        superstate['lernaeanhydrastate'] = hydra
        for (i = 0; i < hydra.last_head_unlocked + 1; i++)
        {
            headCorrect = localStorage.getItem('correct-hydra-' + i)
            headIncorrect = localStorage.getItem('incorrect-hydra-' + i)
            if (headCorrect || headIncorrect)
            {
                superstate.puzzles['hydra'+i] = {}
                superstate.puzzles['hydra'+i].correct = headCorrect
                superstate.puzzles['hydra'+i].incorrect = headIncorrect
            }
        }
    }
    cs_outputs = localStorage.getItem('cs_outputs')
    if (cs_outputs)
    {
        superstate.cs_outputs = cs_outputs
    }
    for (i in puzzleDbPuzzles)
    {
        correct = localStorage.getItem('correct-'+i)
        incorrect = localStorage.getItem('incorrect-'+i)
        if (correct || incorrect)
        {
            superstate.puzzles[puzzleDbPuzzles[i].slug] = {}
            superstate.puzzles[puzzleDbPuzzles[i].slug].correct = correct
            superstate.puzzles[puzzleDbPuzzles[i].slug].incorrect = incorrect
        }
    }

    funnyfarms = {'ph13':10013,'major-monster-mash':1000000}
    superstate.funnyfarms = {}
    for (slug in funnyfarms)
    {
        i = funnyfarms[slug]
        cor = localStorage.getItem('funnyfarm-'+i)
        if (cor)
        {
            superstate.funnyfarms[slug] = cor
        }
    }
    return superstate
}

function downloadExport()
{
    var blob = new Blob([JSON.stringify(exportFromStatic())],{type: 'text/csv;charset=utf-8;'})
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", 'puzzle_university_transcripts.sav');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


function readFile(evt) {

    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      importState(event.target.result);
      toastr.success("Successfully loaded transcript!")
      setTimeout(()=>window.location.replace("continuingeducation.html"),3000)
    }
    reader.readAsText(file)
  }
  
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('upload_transcript').addEventListener('change', readFile, false);
    if (localStorage.getItem('unlock-all') && localStorage.getItem('unlock-all') == 'true')
    {
        tru=document.getElementById("toggle_round_unlock")
        tru.innerText = "Re-lock rounds based on progress"
    }
    document.getElementById('toggle_round_unlock').addEventListener('click',() =>
     {
        cur = localStorage.getItem('unlock-all')
        if (!cur || cur == 'false')
        {
            localStorage.setItem('unlock-all',true)
            toastr.success("All puzzles unlocked!")
            setTimeout(()=>window.location.replace("continuingeducation.html"),3000)
        }
        else
        {
            localStorage.removeItem('unlock-all')
            toastr.success("Un-unlocked puzzles relocked!")
            setTimeout(()=>window.location.replace("continuingeducation.html"),3000)
        }

     }, false)

     if (localStorage.getItem('show-solution-button') && localStorage.getItem('show-solution-button') == 'true')
     {
         tru=document.getElementById("show-solution-button")
         tru.innerText = "Hide solution buttons"
     }
     document.getElementById('show-solution-button').addEventListener('click',() =>
     {
        cur = localStorage.getItem('show-solution-button')
        if (!cur || cur == 'false')
        {
            localStorage.setItem('show-solution-button',true)
            toastr.success("Solutions available on puzzle and round pages.")
            tru=document.getElementById("show-solution-button")
            tru.innerText = "Hide solution buttons"
        }
        else
        {
            localStorage.removeItem('show-solution-button')
            toastr.success("Solutions hidden on puzzle and round pages.")
            tru=document.getElementById("show-solution-button")
            tru.innerText = "Show solution buttons"
        }
       // window.location.replace("index.html")
     }, false)
     document.getElementById('export_button').addEventListener('click', downloadExport, false)
     document.getElementById('reset_progress').addEventListener('click',()=>
     {
        clearLocalState()
        toastr.success("Local progress reset.")
     }, false)
     document.getElementById('new_student').addEventListener('click', () =>
     {
        clearLocalState()
        window.location.replace('story.html')
     })
    })
