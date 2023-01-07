import { createHtmlElement } from './util.js';
import { projectContainer, eventListenersProject, eventListProjectAdd  } from './project.js';
import { recreateMain, recreateMainOpenTask } from './layout.js';

export function taskContainer(taskArray){
    const taskContainer = createHtmlElement('div', 'task-container', '');

    for (let i = 0; i < taskArray.length; i++) {
            taskContainer.appendChild(taskAdder(taskArray[i].tName));
        }

    const taskAddButton = createHtmlElement('div', 'task-add', '');
    taskAddButton.appendChild(createHtmlElement('p', '', 'Add a task.'));
    taskAddButton.appendChild(createHtmlElement('button', 'add-task-btn', '+'));
    taskContainer.appendChild(taskAddButton);
    
    return taskContainer;
}

export function taskContainerOpen(taskArray, index){
    const taskContainer = createHtmlElement('div', 'task-container', '');

    for (let i = 0; i < taskArray.length; i++) {
            if (i == index) {
                taskContainer.appendChild(taskAdderOpen(taskArray[i]));
            } else {
                taskContainer.appendChild(taskAdder(taskArray[i].tName));
            }
        }

    const taskAddButton = createHtmlElement('div', 'task-add', '');
    taskAddButton.appendChild(createHtmlElement('p', '', 'Add a task.'));
    taskAddButton.appendChild(createHtmlElement('button', 'add-task-btn', '+'));
    taskContainer.appendChild(taskAddButton);
    
    return taskContainer;
}

export function taskContainerAdd(taskArray){
    const taskContainer = createHtmlElement('div', 'task-container', '');

    for (let i = 0; i < taskArray.length; i++) {
            taskContainer.appendChild(taskAdder(taskArray[i].tName));
        }

    const taskForm = createHtmlElement('div', 'task', '');
    taskForm.classList.add('form');

    const taskDetails = createHtmlElement('div', 'task-details', '');

    const inputTaskTitle = createHtmlElement('input', 'task-new-title', '');
    inputTaskTitle.setAttribute('type', 'text');
    inputTaskTitle.setAttribute('placeholder', 'Task Title');
    inputTaskTitle.setAttribute('maxlength', '30');
    const inputTaskTArea = createHtmlElement('textarea', 'task-new-t-area', '');
    inputTaskTArea.setAttribute('placeholder', 'Task Description');
    inputTaskTArea.setAttribute('maxlength', '350');
    inputTaskTArea.setAttribute('cols', '60');
    inputTaskTArea.setAttribute('rows', '3');

    taskDetails.appendChild(inputTaskTitle);
    taskDetails.appendChild(inputTaskTArea);

    const taskButtons = createHtmlElement('div', 'task-buttons', '');

    const formButton = createHtmlElement('button', 'form-button', '✓');
    taskButtons.appendChild(formButton);

    const select = createHtmlElement('select', 'task-new-select', '');

    const optionLow = createHtmlElement('option', '', 'Low priority');
    optionLow.setAttribute('value', 'low');
    const optionMid = createHtmlElement('option', '', 'Mid priority');
    optionMid.setAttribute('value', 'mid');
    const optionHigh = createHtmlElement('option', '', 'High priority');
    optionHigh.setAttribute('value', 'high');
    select.appendChild(optionLow);
    select.appendChild(optionMid);
    select.appendChild(optionHigh);

    taskButtons.appendChild(select);

    const date = createHtmlElement('input', 'task-new-date', '');
    date.setAttribute('type', 'date');

    taskButtons.appendChild(date);

    taskForm.appendChild(taskDetails);
    taskForm.appendChild(taskButtons);

    taskContainer.appendChild(taskForm);
    
    return taskContainer;
}

export function taskAdder(taskName) {
    const task = createHtmlElement('div', 'task', '');
    task.appendChild(createHtmlElement('p', '', taskName));
    task.appendChild(createHtmlElement('button', 'del-task', 'x'));

    return task;
}

export function taskAdderOpen(taskName) {
    const task = createHtmlElement('div', 'task', '');
    task.classList.add('open');

    const taskDetails = createHtmlElement('div', 'task-details', '');
    taskDetails.appendChild(createHtmlElement('p', '', taskName.tName));
    taskDetails.appendChild(createHtmlElement('p', '', taskName.tDescription));

    task.appendChild(taskDetails);

    const taskButtons = createHtmlElement('div', 'task-buttons', '');
    taskButtons.appendChild(createHtmlElement('button', 'del-task', 'x'));
    const prio = createHtmlElement('div', 'prio', 'o');
    prio.classList.add(taskName.tPrio);
    taskButtons.appendChild(prio);
    taskButtons.appendChild(createHtmlElement('p', '', taskName.tDate));

    task.appendChild(taskButtons);

    return task;
}

export function eventListenersTask(projectArray, taskArray, currentProject) {
    const taskBtn = document.getElementsByClassName('del-task');
    for (let i = 0; i < taskBtn.length; i++) {
        taskBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            taskArray[currentProject].splice(i, 1);
            recreateMain(projectArray, taskArray, currentProject);
        });
    }

    const task = document.getElementsByClassName('task');

    for (let i = 0; i < task.length; i++) {
        task[i].addEventListener('click', () => {
            recreateMainOpenTask(projectArray, taskArray, currentProject, i);
        });
    }
}

export function eventListTaskAdd(projectArray, taskArray, currentProject) {
    const taskAdd = document.getElementsByClassName('task-add')[0];
    taskAdd.addEventListener('click', () => addTask(projectArray, taskArray, currentProject));
}

function eventListenersTaskOpen(projectArray, taskArray, currentProject) {
    const taskBtn = document.getElementsByClassName('del-task');
    for (let i = 0; i < taskBtn.length; i++) {
        taskBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            taskArray[currentProject].splice(i, 1);
            recreateMain(projectArray, taskArray, currentProject);
        });
    }

    const task = document.getElementsByClassName('task');

    for (let i = 0; i < task.length-1; i++) {
        task[i].addEventListener('click', () => {
            recreateMainOpenTask(projectArray, taskArray, currentProject, i);
        });
    }
}

function addTask(projectArray, taskArray, currentProject) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainerAdd(taskArray[currentProject]));

    eventListenersProject(projectArray, taskArray);
    eventListProjectAdd(projectArray, taskArray, currentProject);
    eventListenersTaskOpen(projectArray, taskArray, currentProject);

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');

    const taskAdd = document.getElementsByClassName('form-button')[0];
    taskAdd.addEventListener('click', () => newTask(projectArray, taskArray, currentProject));
}

function newTask(projectArray, taskArray, currentProject){
    let title = document.getElementsByClassName('task-new-title')[0].value;
    let tArea = document.getElementsByClassName('task-new-t-area')[0].value;
    let select = document.getElementsByClassName('task-new-select')[0].value;
    let date = document.getElementsByClassName('task-new-date')[0].value;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const newIndex = taskArray[currentProject].length;

    (title === '') ? title = `Task ${newIndex + 1}` : title = title;
    (date === '') ? date = today : date = date;

    taskArray[currentProject].splice(newIndex, 0, {tName: title, tDescription: tArea, tPrio: select, tDate: date})

    recreateMain(projectArray, taskArray, currentProject);
}