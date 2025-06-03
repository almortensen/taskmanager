// this is going to be where globel varables are declared

let isTrackingTime = false;
const timeTrackInterval = setInterval(TimeTrack, 1000);
let timeTracked = 0;

// end of globel varables declration

// this runs when the app start
async function startProgram(){
    const data = await fetch('taskData.json');
    let dataJSON = await data.json()
    for(cat in dataJSON.cat){
        loadcatselect(cat);
        if(dataJSON.cat[cat].default){
            makeTaskofSelectedCAT(cat);
        }
    }
}
// this function will make all task in the slected catigory 
async function makeTaskofSelectedCAT(catPOS){
    const data = await fetch('taskData.json');
    let dataJSON = await data.json();
    for(task of dataJSON.cat[catPOS].task_List){
        let taskBlock = document.createElement("div");
        taskBlock.style.backgroundColor = "rgb(22,22,22)";
        taskBlock.style.display = "grid"
        taskBlock.style.gridTemplateRows = "50% 50%";
        taskBlock.style.gridTemplateColumns = "50% 50%";
        taskBlock.style.borderRadius = "25%";
        taskBlock.style.borderTopColor = `rgb(${dataJSON.cat[catPOS].colorRGB})`;
        taskBlock.style.borderRightColor = `rgb(${dataJSON.cat[catPOS].colorRGB})`;
        taskBlock.style.height = "15vh";
        taskBlock.style.width = "25vw";

        let taskName = document.createElement("p");
        taskName.innerText = `${task.taskName}`;
        taskName.style.gridRow = "1";
        taskName.style.gridColumn = "1";
        taskBlock.appendChild(taskName);

        let timeSpent = document.createElement("p");

        let time = task.timeSpentSEC;

        let timeDisplay = [0,0,0];

        while(time > 0){
            if(time > 3600){
                time -= 3600;
                timeDisplay[0]++;
            }else if(time > 60){
                time -= 60;
                timeDisplay[1]++;
            }else if(time > 1){
                time -= 1
                timeDisplay[2]++;
            }
        }

        timeSpent.innerText = `time:${timeDisplay[0]}:${timeDisplay[1]}:${timeDisplay[2]}`
        timeSpent.style.gridRow = "2";
        timeSpent.style.gridColumn = "1";
        taskBlock.appendChild(timeSpent);

        let pointsWorth = document.createElement("p");
        pointsWorth.innerText = `${task.pointsWorth}`;
        pointsWorth.style.gridRow = "1";
        pointsWorth.style.gridColumn = "2";
        taskBlock.appendChild(pointsWorth);

        let selectTask = document.createElement("button");
        selectTask.style.gridRow = "2";
        selectTask.style.gridColumn = "2";
        selectTask.style.width = '100%';
        const CatPOS = task.POS[0];
        const taskPOS = task.POS[1];
        selectTask.dataset.catPos = CatPOS;
        selectTask.dataset.taskPos = taskPOS;
        selectTask.addEventListener("click",loadSelectedTask);
        taskBlock.appendChild(selectTask);
       
        
        document.getElementById("taskList").appendChild(taskBlock);
    }


}
// this will load the button select for all catigorys
async function loadcatselect(catPOS){

}

async function loadSelectedTask(){
    const data = await fetch('taskData.json');
    const dataJSON = await data.json();

    const catPOS = this.getAttribute("data-cat-pos");
    const taskPOS = this.getAttribute("data-task-pos");
    
    let container = document.createElement("div");
    container.style.gridTemplateColumns = "25% 25% 25% 25%";
    container.style.gridTemplateRows = "auto auto auto auto";
    container.style.width = "100%"
    container.style.borderLeftColor = "rgb(255,255,255)";
    container.style.borderTopColor = "rgb(255,255,255)";
    container.style.display = "grid";
    container.setAttribute("id","selectedTaskcontainer")

    let taskName = document.createElement("h1");
    taskName.style.gridColumnStart = "2";
    taskName.style.gridColumnEnd = "3";
    taskName.style.gridRow = "1";
    taskName.innerText = `${dataJSON.cat[catPOS].task_List[taskPOS].taskName}`;

    let TaskTrackedTimer = document.createElement("p");
    TaskTrackedTimer.style.gridColumn = "4";
    TaskTrackedTimer.style.gridRow = "1";
    TaskTrackedTimer.setAttribute("id", "trackedTime");
    
    let taskTime = document.createElement("h3");
    taskTime.style.gridColumn = "1";
    taskTime.style.gridRow = "2";
    let time = dataJSON.cat[catPOS].task_List[taskPOS].timeSpentSEC;

    let timeDisplay = [0,0,0];

        while(time > 0){
            if(time > 3600){
                time -= 3600;
                timeDisplay[0]++;
            }else if(time > 60){
                time -= 60;
                timeDisplay[1]++;
            }else if(time > 1){
                time -= 1
                timeDisplay[2]++;
            }
        }
    taskTime.innerText = `time:${timeDisplay[0]}:${timeDisplay[1]}:${timeDisplay[2]}`;

    let pointsWorth = document.createElement("h3");
    pointsWorth.style.gridColumn = "3";
    pointsWorth.style.gridRow = "2";
    pointsWorth.innerText = dataJSON.cat[catPOS].task_List[taskPOS].pointsWorth;

    let discription = document.createElement("p");
    discription.style.gridColumnStart = "1"
    discription.style.gridRow = "4";
    discription.innerText = dataJSON.cat[catPOS].task_List[taskPOS].discription;

    let startTimerButton = document.createElement("button");
    startTimerButton.style.gridColumn = "4";
    startTimerButton.style.gridRow = "3"
    startTimerButton.addEventListener("click", () => {
        isTrackingTime = !isTrackingTime;
    });

    container.appendChild(taskName);
    container.appendChild(taskTime);
    container.appendChild(pointsWorth);
    container.appendChild(discription);
    container.appendChild(startTimerButton);
    container.appendChild(TaskTrackedTimer);

    document.getElementById("selectedTask").appendChild(container);

}  

function TimeTrack(){
    if(isTrackingTime){
        timeTracked++
        document.getElementById("trackedTime").innerText = `time tracked ${timeTracked}`;
    }else{
        timeTracked = 0;
    }
}

startProgram();