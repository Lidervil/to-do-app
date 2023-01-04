import './styles/main.scss';
import {content, projectContainer, taskContainer, taskContainerOpen, projectAdder, taskAdder, createHtmlElement, projectContainerAdd, taskContainerAdd} from './layout.js';


var projectArray;
var taskArray;
var currentProject;
var currentTasks;

var localDataArr = JSON.parse(localStorage.getItem("projectArray"));

if (localDataArr === null) {
    projectArray = ['Home'];
    taskArray = [
        []
    ];
} else {
    projectArray = localDataArr;
    taskArray = JSON.parse(localStorage.getItem("taskArray"));
}

document.body.appendChild(content());

changeCurrentProject(0);

function eventListenersProject() {
    const projectBtn = document.getElementsByClassName('del-project');
    for (let i = 0; i < projectBtn.length; i++) {
        projectBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            projectArray.splice(i + 1, 1);
            taskArray.splice(i + 1, 1);
            changeCurrentProject(0);
        });
    }

    const project = document.getElementsByClassName('project');

    for (let i = 0; i < project.length; i++) {
        project[i].addEventListener('click', () => changeCurrentProject(i));
        }
};

function eventListProjectAdd() {
    const projectAdd = document.getElementsByClassName('project-add')[0];
    projectAdd.addEventListener('click', () => addProject());
};

function eventListenersTask() {
    const taskBtn = document.getElementsByClassName('del-task');
    for (let i = 0; i < taskBtn.length; i++) {
        taskBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            taskArray[currentProject].splice(i, 1);
            recreateMainOpenTask();
        });
    }

    const task = document.getElementsByClassName('task');

    for (let i = 0; i < task.length; i++) {
        task[i].addEventListener('click', () => {
            recreateMainOpenTask(i);
        });
    }
}

function eventListenersTaskTwo() {
    const taskBtn = document.getElementsByClassName('del-task');
    for (let i = 0; i < taskBtn.length; i++) {
        taskBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            taskArray[currentProject].splice(i, 1);
            recreateMainOpenTask();
        });
    }

    const task = document.getElementsByClassName('task');

    for (let i = 0; i < task.length-1; i++) {
        task[i].addEventListener('click', () => {
            recreateMainOpenTask(i);
        });
    }
}

function eventListTaskAdd() {
    const taskAdd = document.getElementsByClassName('task-add')[0];
    taskAdd.addEventListener('click', () => addTask());
}

function recreateMain() {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainer(currentTasks));

    eventListenersProject();
    eventListenersTask();
    eventListTaskAdd();
    eventListProjectAdd();

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');

    
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
};

function recreateMainOpenTask(i) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainerOpen(currentTasks, i));
    eventListenersProject();
    eventListenersTask();
    eventListTaskAdd();
    eventListProjectAdd();
    
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
};

function addProject() {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainerAdd(projectArray));
    main.appendChild(taskContainer(currentTasks));

    eventListenersProject();
    eventListenersTask();
    eventListTaskAdd();

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');
    const projectAdd = document.getElementsByClassName('project-edit-btn')[0];
    projectAdd.addEventListener('click', () => newProject());
}

function addTask() {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainerAdd(currentTasks));

    eventListenersProject();
    eventListProjectAdd();
    eventListenersTaskTwo();

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');

    const taskAdd = document.getElementsByClassName('form-button')[0];
    taskAdd.addEventListener('click', () => newTask());
}

function changeCurrentProject(curProject) {
    currentProject = curProject;
    currentTasks = taskArray[curProject];
    recreateMain();
}

function newProject(){
    let projectName = document.getElementsByClassName('project-edit-input')[0].value;
    (projectName === '') ? projectName = `Project ${projectArray.length}`: projectName = projectName ; 

    const newIndex = projectArray.length;

    projectArray.splice(newIndex, 0, projectName);
    taskArray.splice(newIndex, 0, []);

    changeCurrentProject(newIndex);
    console.log(projectArray);
    console.log(taskArray);
}

function newTask(){
    let title = document.getElementsByClassName('task-new-title')[0].value;
    let tArea = document.getElementsByClassName('task-new-t-area')[0].value;
    let select = document.getElementsByClassName('task-new-select')[0].value;
    let date = document.getElementsByClassName('task-new-date')[0].value;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    (title === '') ? title = `Task ${currentTasks.length + 1}` : title = title;
    (date === '') ? date = today : date = date;

    const newIndex = currentTasks.length;
    taskArray[currentProject].splice(newIndex, 0, {tName: title, tDescription: tArea, tPrio: select, tDate: date})

    recreateMain();
}