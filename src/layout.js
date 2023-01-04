export function content() {
    const content = createHtmlElement('div', 'content', '');

    content.appendChild(header());
    content.appendChild(main());

    return content;
}

export function header(){
    const header = createHtmlElement('header', 'header', '');
    header.appendChild(createHtmlElement('p', '', 'My to-do lists'));

    return header;
}

export function main(){
    const main = createHtmlElement('main', 'main', '');

    return main;
}

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

export function createHtmlElement(tag, cName, textC) {
    const el = document.createElement(tag);
    if (cName != '') {
        el.classList.add(cName);
    }
    if (textC != '') {
        el.textContent = textC;
    }

    return el;
}

export function projectAdder(projectName) {
    const project = createHtmlElement('div', 'project', '');
    project.appendChild(createHtmlElement('p', '', projectName));
    project.appendChild(createHtmlElement('button', 'del-project', 'x'));

    return project;
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