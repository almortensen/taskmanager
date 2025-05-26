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
    const data = fetch('taskData.json');
    let dataJSON = await data.json();
    for(task of dataJSON.cat[catPOS].task_List){
    let task = document.createElement("div");
    task.style.backgroundColor = "rgb(22,22,22)";
    task.style.display = "grid"
    task.style.gridTemplateRows = "50% 50%";
    task.style.gridTemplateColumns = "50% 50%";
    task.style.borderRadius = "25%";
    task.style.borderTopColor = `rgb(${dataJSON.cat[catPOS].colorRGB})`;
    task.style.borderRightColor = `rgb(${dataJSON.cat[catPOS].colorRGB})`;

    let taskName = document.createElement("p");
    let timeSpent = document.createElement("p");
    let pointsWorth = document.createElement("p")
    let selectTask = document.createElement("button");

    taskName.innerText = `${task.taskName}`;
    pointsWorth.innerText = `${task.pointsWorth}`;
    

    }


}
// this will load the button select for all catigorys
async function loadcatselect(catPOS){

}