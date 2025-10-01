//  TODO : Add drag and drop functionality 


var groups = document.querySelectorAll(".group-container")
var teams = document.querySelectorAll(".team")
var codes = document.querySelectorAll(".code")
var flags = document.querySelectorAll(".flag")

groups.forEach(group => {
  group.addEventListener("dragover", e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(group, e.clientY)
    const selectedTeam = document.querySelector(".dragging")

    if (group.attributes[0].value == selectedTeam.attributes[0].value){
      if (afterElement == null ){
        group.appendChild(selectedTeam)
      } else if (afterElement.attributes[0].value == selectedTeam.attributes[0].value) {
        group.insertBefore(selectedTeam, afterElement)
      }
    }
    })
})


teams.forEach(team => {
  team.addEventListener("dragstart", () => {
    team.classList.add("dragging")
  })
  
  team.addEventListener("dragend", () => {
    team.classList.remove("dragging")
  })

})



codes.forEach(code => {
  code.textContent = code.getAttribute("value")
})


function getDragAfterElement(group, y){
  const otherTeams = [...group.querySelectorAll(".team:not(.dragging)")]

  return otherTeams.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2

    if (offset < 0 && offset > closest.offset) {
      return {offset: offset, element: child}
    } else {
      return closest
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element
}
