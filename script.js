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

/*
async function changeFlagImage(element){
  var placeholder_flag = "images/placeholder_flag.png";
  var file = element.previousElementSibling.getAttribute("value")
  file = "png/" + file + ".png"
  
  try {
    const response = await fetch(file)
    
    if (!response.ok){
      element.src = placeholder_flag
    } else {
      element.src = file
    }
  } 
  catch(err) {
  }
}

flags.forEach(flag => {
  changeFlagImage(flag)
})

*/
var group_A = groups[0]
console.log(group_A.children[0])
// grab the top 2 from every group for the knockout stage
// grab the 3rd from every group to add to table of 3rd place teams