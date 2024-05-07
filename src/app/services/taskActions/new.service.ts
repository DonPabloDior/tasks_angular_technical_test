import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Tasks } from '../../classes/tasks';
@Injectable({
  providedIn: 'root'
})
export class NewService {
  taskList: Tasks[] = JSON.parse(localStorage.getItem('todo'))
  tasks: Tasks[] = []
  constructor() { }
  dataSignal = signal<any[]>(this.taskList);
  setItem(i) {
    const task = JSON.stringify(i);
    const parseTask = JSON.parse(task);
      localStorage.setItem('todo', task);
      this.taskList.push(parseTask);
      localStorage.setItem('todo', JSON.stringify(this.taskList));
      this.dataSignal.set(this.taskList);

  }
  
  createNewTask(i):void{
    const task = JSON.stringify(i);
    const parseTask = JSON.parse(task);
    console.log(this.taskList === null);
    // if(this.taskList === null){
    //   localStorage.setItem('todo', task)
    // }else{
    //   this.taskList.push(parseTask);
    //   localStorage.setItem('todo', JSON.stringify(this.taskList));
    //   this.dataSignal.set(this.taskList);
    // }

  }
}
