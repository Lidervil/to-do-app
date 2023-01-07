export function createHtmlElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = textContent;
    return element;
}

export function checkStorage() {
    const localDataArray = JSON.parse(localStorage.getItem('projectArray'));
    let projectArray;
    let taskArray;

    if (localDataArray === null) {
        projectArray = ['Home'];
        taskArray = [
            []
        ];
    } else {
        projectArray = localDataArray;
        taskArray = JSON.parse(localStorage.getItem('taskArray'));
    }

    return { projectArray, taskArray };
}