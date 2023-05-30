
document.addEventListener('DOMContentLoaded', function() {
    list = document.getElementById("teamlist")
    teamsorted = []
    for (team in transcripts)
    {
        teamsorted.push(team)
    }
    teamsorted.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    for (i=0;i<teamsorted.length;i++)
    {
        team = teamsorted[i]
        option = document.createElement("option")
        option.setAttribute("value",team)
        option.innerText = team
        list.appendChild(option)
    }
    document.getElementById("import").addEventListener('click', function()
    {
        list = document.getElementById('teamlist')
        toImport=transcripts[list.value]
        importState(JSON.stringify(toImport))
        toastr.success("Successfully imported transcripts for team " + list.value)
        setTimeout(()=>window.location.replace("departments.html"),3000)
    })
})