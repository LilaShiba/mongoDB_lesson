

document.getElementById("todo-list").addEventListener("click", function(e){
  clickItem(e.target)
  })


// click item
let clickItem = (li) => {
  if (li.style.backgroundColor == 'green'){
    li.style.backgroundColor = 'white'
    li.style.color = "black"
    fetch('/del')
    } else {
      li.style.backgroundColor = 'green'
      li.style.color = "white"

    }
  }
