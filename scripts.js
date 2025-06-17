document.addEventListener("DOMContentLoaded",()=>{
  const storedtasks = JSON.parse(localStorage.getItem('tasks'))
  if(storedtasks){
      storedtasks.forEach((task)=>tasks.push(task))
      {
          updatetaskslist();
          updatenumber();
      }
  }
}) 
let tasks= []
const savetask = ()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = () => {
const taskinput = document.getElementById('input')
const text = taskinput.value.trim() ;
console.log(tasks)
if(text)
{
tasks.push({text:text , completed:false});
updatetaskslist();
updatenumber()
savetask()
}

};
const toggletaskcomplete = (index)=>{
tasks[index].completed = !tasks[index].completed ;
updatetaskslist() ;
updatenumber()
savetask()

}
const deleteTask = (index)=>{
tasks.splice(index,1);
updatetaskslist();
updatenumber()
savetask()

}
const editTask = (index)=>{
const input = document.getElementById('input')
input.value = tasks[index].text ;
tasks.splice(index,1)
updatetaskslist()
updatenumber()
savetask()
}
const updatenumber = ()=>{
const completedtasks = tasks.filter(task => task.completed).length
const totaltasks = tasks.length
const progresss = ((completedtasks/totaltasks)+0.019) * 100
const progressbar = document.getElementById("progress")
progressbar.style.width = `${progresss}%` ;
document.getElementById("num").innerText = `${completedtasks}/${totaltasks}`
if(totaltasks===completedtasks)
{
    happy();
}

}
const updatetaskslist = ()=>{
const tasklist = document.getElementById('tasks-list');
tasklist.innerHTML = ""
tasks.forEach((task,index) => {
const listitem = document.createElement("li");
listitem.innerHTML = `
<div class= "task-item">
<div class="task ${task.completed ? "completed" : ""}">
<input type = "checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
<p> ${task.text} </p>
</div>
<div class="icons">
<img class="icons-img" src="edit.png" onClick="editTask(${index})"/>
<img class= "icons-img" src ="delete.png" onClick = "deleteTask(${index})"/>
</div>
</div>
` ;
listitem.addEventListener('change',()=> toggletaskcomplete(index));
tasklist.append(listitem)
});
} ;

let button = document.getElementById('button').addEventListener('click',
function(e)
{
e.preventDefault()
addTask();
}
)
const happy = ()=>{
    const duration = 8 * 100,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}