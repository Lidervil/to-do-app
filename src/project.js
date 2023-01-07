import { createHtmlElement } from './util';
import { changeCurrentProject } from './index.js';
import { eventListTaskAdd, eventListenersTask, taskContainer} from './task.js';

export function projectContainer(projectArray){
    const projectContainer = createHtmlElement('div', 'project-container', '');
    
    const homeProject = createHtmlElement('div', 'project', '');
    homeProject.appendChild(createHtmlElement('p', '', 'Home'));
    projectContainer.appendChild(homeProject);
    
    if (projectArray.length > 0) {
            for (let i = 1; i < projectArray.length; i++) {
            projectContainer.appendChild(projectAdder(projectArray[i]));
        }
    } 

    const projectAddButton = createHtmlElement('div', 'project-add', '');
    projectAddButton.appendChild(createHtmlElement('p', '', 'Add a project.'));
    projectAddButton.appendChild(createHtmlElement('button', 'add-project-btn', '+'));
    projectContainer.appendChild(projectAddButton);

    return projectContainer;
}

export function projectContainerAdd(projectArray){
    const projectContainer = createHtmlElement('div', 'project-container', '');
    
    const homeProject = createHtmlElement('div', 'project', '');
    homeProject.appendChild(createHtmlElement('p', '', 'Home'));
    projectContainer.appendChild(homeProject);
    
    if (projectArray.length > 0) {
            for (let i = 1; i < projectArray.length; i++) {
            projectContainer.appendChild(projectAdder(projectArray[i]));
        }
    } 

    const projectEditButton = createHtmlElement('div', 'project-edit', '');
    const input = createHtmlElement('input', 'project-edit-input', '');
    input.setAttribute('placeholder', 'Project Title');
    input.setAttribute('maxlength', '20');
    projectEditButton.appendChild(input);
    projectEditButton.appendChild(createHtmlElement('button', 'project-edit-btn', '✓'));
    projectContainer.appendChild(projectEditButton);

    return projectContainer;
}

export function projectAdder(projectName) {
    const project = createHtmlElement('div', 'project', '');
    project.appendChild(createHtmlElement('p', '', projectName));
    project.appendChild(createHtmlElement('button', 'del-project', 'x'));

    return project;
}

export function eventListenersProject(projectArray, taskArray) {
    const projectBtn = document.getElementsByClassName('del-project');
    for (let i = 0; i < projectBtn.length; i++) {
        projectBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            projectArray.splice(i + 1, 1);
            taskArray.splice(i + 1, 1);
            changeCurrentProject(projectArray, taskArray, 0);
        });
    }

    const project = document.getElementsByClassName('project');

    for (let i = 0; i < project.length; i++) {
        project[i].addEventListener('click', () => changeCurrentProject(projectArray, taskArray, i));
        }
}

export function eventListProjectAdd(projectArray, taskArray, currentProject) {
    const projectAdd = document.getElementsByClassName('project-add')[0];
    projectAdd.addEventListener('click', () => addProject(projectArray, taskArray, currentProject));
};

function addProject(projectArray, taskArray, currentProject) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';
    main.appendChild(projectContainerAdd(projectArray));
    main.appendChild(taskContainer(taskArray[currentProject]));

    eventListenersProject(projectArray, taskArray);
    eventListenersTask(projectArray, taskArray, currentProject);
    eventListTaskAdd(projectArray, taskArray, currentProject);

    const project = document.getElementsByClassName('project')[currentProject];
    project.classList.add('active');
    const projectAdd = document.getElementsByClassName('project-edit-btn')[0];
    projectAdd.addEventListener('click', () => newProject(projectArray, taskArray));
}

function newProject(projectArray, taskArray){
    let projectName = document.getElementsByClassName('project-edit-input')[0].value;
    (projectName === '') ? projectName = `Project ${projectArray.length}`: projectName = projectName ; 

    const newIndex = projectArray.length;

    projectArray.splice(newIndex, 0, projectName);
    taskArray.splice(newIndex, 0, []);

    changeCurrentProject(projectArray, taskArray, newIndex);
}