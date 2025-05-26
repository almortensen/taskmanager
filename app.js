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
        console.log(task);
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
        selectTask.addEventListener("click",selectTask(task.POS));

        taskBlock.appendChild(selectTask);
       
       
        
        document.getElementById("taskList").appendChild(taskBlock);
    }


}
// this will load the button select for all catigorys
async function loadcatselect(catPOS){

}

async function selectTask(POS){

}

startProgram();