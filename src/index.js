import './styles/main.scss';

import { content, recreateMain } from './layout.js';
import { checkStorage } from "./util";
/* import { changeCurrentProject } from './util'; */

const { projectArray, taskArray } = checkStorage();
let currentProject;

document.body.appendChild(content());

changeCurrentProject(projectArray, taskArray, 0);

export function changeCurrentProject(projectArray, taskArray, curProject) {
    currentProject = curProject;
    recreateMain(projectArray, taskArray, currentProject);
}