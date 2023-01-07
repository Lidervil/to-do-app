import { createHtmlElement } from "./util";
import { projectContainer, eventListenersProject, eventListProjectAdd } from "./project";
import { taskContainer, taskContainerOpen, eventListenersTask, eventListTaskAdd } from "./task";

export function content() {
    const content = createHtmlElement('div', 'content', '');

    content.appendChild(header());
    content.appendChild(main());

    return content;
}

function header(){
    const header = createHtmlElement('header', 'header', '');
    header.appendChild(createHtmlElement('p', '', 'My to-do lists'));

    return header;
}

function main(){
    const main = createHtmlElement('main', 'main', '');

    return main
}

export function recreateMain(projectArray, taskArray, currentProject) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainer(taskArray[currentProject]));

    eventListenersProject(projectArray, taskArray);
    eventListenersTask(projectArray, taskArray, currentProject);
    eventListTaskAdd(projectArray, taskArray, currentProject);
    eventListProjectAdd(projectArray, taskArray, currentProject);

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');

    
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

export function recreateMainOpenTask(projectArray, taskArray, currentProject, i) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainer(projectArray));
    main.appendChild(taskContainerOpen(taskArray[currentProject], i));

    eventListenersProject(projectArray, taskArray);
    eventListenersTask(projectArray, taskArray, currentProject);
    eventListTaskAdd(projectArray, taskArray, currentProject);
    eventListProjectAdd(projectArray, taskArray, currentProject);

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');
    
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('taskArray', JSON.stringify(taskArray));
}