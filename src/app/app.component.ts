import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { TagsComponent } from './components/tags/tags.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Tasks } from './classes/tasks';
import {FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NewService } from './services/taskActions/new.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragHandle} from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TagsComponent,
    FormsModule,
    NgClass, 
    CdkDropList, 
    CdkDrag, 
    CdkDragHandle,
    ReactiveFormsModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  tasksSignal = signal<Tasks[]>([])
  newTask(){
    this.taskModuleOpen()
  }
  
  public title:string = 'Мои задачи'
  public tags = [
    {
      tagName: 'Продуктивность',
      color: '#7367F0',
      class: false
    },
    {
      tagName: 'Образование',
      color: '#28C76F',
      class: false
    },
    {
      tagName: 'Здоровье',
      color: '#FF9F43',
      class: false
    },
    {
      tagName: 'Срочно',
      color: '#EA5455',
      class: false
    },
  ]
  public units = [
    {
      nameUnit:'Мои задачи',
      class: true,
      svg: 'data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16.6667%202.5H3.33337C1.91671%202.5%200.833374%203.58333%200.833374%205V15C0.833374%2016.4167%201.91671%2017.5%203.33337%2017.5H16.6667C18.0834%2017.5%2019.1667%2016.4167%2019.1667%2015V5C19.1667%203.58333%2018.0834%202.5%2016.6667%202.5ZM3.33337%204.16667H16.6667C17%204.16667%2017.25%204.33333%2017.4167%204.66667L10%209.83333L2.58337%204.66667C2.75004%204.33333%203.00004%204.16667%203.33337%204.16667ZM3.33337%2015.8333H16.6667C17.1667%2015.8333%2017.5%2015.5%2017.5%2015V6.58333L10.5%2011.5C10.3334%2011.5833%2010.1667%2011.6667%2010%2011.6667C9.83337%2011.6667%209.66671%2011.5833%209.50004%2011.5L2.50004%206.58333V15C2.50004%2015.5%202.83337%2015.8333%203.33337%2015.8333Z%22%20fill%3D%22black%22%2F%3E%3Cmask%20id%3D%22mask0_10_1638%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%222%22%20width%3D%2220%22%20height%3D%2216%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16.6667%202.5H3.33337C1.91671%202.5%200.833374%203.58333%200.833374%205V15C0.833374%2016.4167%201.91671%2017.5%203.33337%2017.5H16.6667C18.0834%2017.5%2019.1667%2016.4167%2019.1667%2015V5C19.1667%203.58333%2018.0834%202.5%2016.6667%202.5ZM3.33337%204.16667H16.6667C17%204.16667%2017.25%204.33333%2017.4167%204.66667L10%209.83333L2.58337%204.66667C2.75004%204.33333%203.00004%204.16667%203.33337%204.16667ZM3.33337%2015.8333H16.6667C17.1667%2015.8333%2017.5%2015.5%2017.5%2015V6.58333L10.5%2011.5C10.3334%2011.5833%2010.1667%2011.6667%2010%2011.6667C9.83337%2011.6667%209.66671%2011.5833%209.50004%2011.5L2.50004%206.58333V15C2.50004%2015.5%202.83337%2015.8333%203.33337%2015.8333Z%22%20fill%3D%22white%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23mask0_10_1638)%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23D0D2D6%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      nameUnit: 'Важные',
      class: false,
      svg:'data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.4712%206.84447C18.8034%206.92767%2019.0525%207.09407%2019.1356%207.42686C19.2186%207.67646%2019.1356%208.00925%2018.8864%208.17565L15.0661%2011.9196L15.9797%2017.2443C16.0627%2017.5771%2015.8966%2017.9099%2015.6475%2018.0763C15.4814%2018.1595%2015.3153%2018.2427%2015.1492%2018.2427H14.7339L10%2015.7467L5.26618%2018.2427C4.93398%2018.4091%204.60178%2018.3259%204.35263%2018.1595C4.10348%2017.9931%203.93738%2017.6603%204.02043%2017.3275L4.93398%2012.0028L1.11367%208.25885C0.864518%208.09245%200.781468%207.75965%200.864518%207.42686C1.03062%207.09407%201.27977%206.84447%201.61197%206.84447L6.84413%206.01248L9.25259%201.27017C9.50174%200.687777%2010.4983%200.687777%2010.7475%201.27017L13.1559%206.09568L18.4712%206.84447ZM13.322%2011.8364C13.322%2011.5868%2013.4051%2011.3372%2013.5712%2011.0876L16.561%208.17565L12.4915%207.59326C12.1593%207.59326%2011.9102%207.42686%2011.8271%207.17726L10%203.51653L8.17294%207.26046C8.00684%207.42686%207.75769%207.67646%207.50853%207.67646L3.43907%208.25885L6.42888%2011.0876C6.59498%2011.3372%206.67803%2011.5868%206.67803%2011.8364L5.93058%2015.9131L9.58479%2013.9995C9.83394%2013.8331%2010.0831%2013.8331%2010.3322%2013.9995L13.9865%2015.9131L13.322%2011.8364Z%22%20fill%3D%22black%22%2F%3E%3Cmask%20id%3D%22mask0_26_2661%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2220%22%20height%3D%2219%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.4712%206.84447C18.8034%206.92767%2019.0525%207.09407%2019.1356%207.42686C19.2186%207.67646%2019.1356%208.00925%2018.8864%208.17565L15.0661%2011.9196L15.9797%2017.2443C16.0627%2017.5771%2015.8966%2017.9099%2015.6475%2018.0763C15.4814%2018.1595%2015.3153%2018.2427%2015.1492%2018.2427H14.7339L10%2015.7467L5.26618%2018.2427C4.93398%2018.4091%204.60178%2018.3259%204.35263%2018.1595C4.10348%2017.9931%203.93738%2017.6603%204.02043%2017.3275L4.93398%2012.0028L1.11367%208.25885C0.864518%208.09245%200.781468%207.75965%200.864518%207.42686C1.03062%207.09407%201.27977%206.84447%201.61197%206.84447L6.84413%206.01248L9.25259%201.27017C9.50174%200.687777%2010.4983%200.687777%2010.7475%201.27017L13.1559%206.09568L18.4712%206.84447ZM13.322%2011.8364C13.322%2011.5868%2013.4051%2011.3372%2013.5712%2011.0876L16.561%208.17565L12.4915%207.59326C12.1593%207.59326%2011.9102%207.42686%2011.8271%207.17726L10%203.51653L8.17294%207.26046C8.00684%207.42686%207.75769%207.67646%207.50853%207.67646L3.43907%208.25885L6.42888%2011.0876C6.59498%2011.3372%206.67803%2011.5868%206.67803%2011.8364L5.93058%2015.9131L9.58479%2013.9995C9.83394%2013.8331%2010.0831%2013.8331%2010.3322%2013.9995L13.9865%2015.9131L13.322%2011.8364Z%22%20fill%3D%22white%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23mask0_26_2661)%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23BDBDBD%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      nameUnit: 'Выполненные',
      class: false,
      svg:'data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M17.25%206.41667L8.08333%2015.5833C7.91667%2015.75%207.75%2015.8333%207.5%2015.8333C7.25%2015.8333%207.08333%2015.75%206.91667%2015.5833L2.75%2011.4167C2.41667%2011.0833%202.41667%2010.5833%202.75%2010.25C3.08333%209.91667%203.58333%209.91667%203.91667%2010.25L7.5%2013.8333L16.0833%205.25C16.4167%204.91667%2016.9167%204.91667%2017.25%205.25C17.5833%205.58333%2017.5833%206.08333%2017.25%206.41667Z%22%20fill%3D%22black%22%2F%3E%3Cmask%20id%3D%22mask0_26_2658%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%225%22%20width%3D%2216%22%20height%3D%2211%22%3E%3Cpath%20d%3D%22M17.25%206.41667L8.08333%2015.5833C7.91667%2015.75%207.75%2015.8333%207.5%2015.8333C7.25%2015.8333%207.08333%2015.75%206.91667%2015.5833L2.75%2011.4167C2.41667%2011.0833%202.41667%2010.5833%202.75%2010.25C3.08333%209.91667%203.58333%209.91667%203.91667%2010.25L7.5%2013.8333L16.0833%205.25C16.4167%204.91667%2016.9167%204.91667%2017.25%205.25C17.5833%205.58333%2017.5833%206.08333%2017.25%206.41667Z%22%20fill%3D%22white%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23mask0_26_2658)%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23BDBDBD%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      nameUnit: 'Удаленные',
      class: false,
      svg:'data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M17.5%204.16671H14.1666V3.33337C14.1666%201.91671%2013.0833%200.833374%2011.6666%200.833374H8.33329C6.91663%200.833374%205.83329%201.91671%205.83329%203.33337V4.16671H2.49996C1.99996%204.16671%201.66663%204.50004%201.66663%205.00004C1.66663%205.50004%201.99996%205.83337%202.49996%205.83337H3.33329V16.6667C3.33329%2018.0834%204.41663%2019.1667%205.83329%2019.1667H14.1666C15.5833%2019.1667%2016.6666%2018.0834%2016.6666%2016.6667V5.83337H17.5C18%205.83337%2018.3333%205.50004%2018.3333%205.00004C18.3333%204.50004%2018%204.16671%2017.5%204.16671ZM7.49996%203.33337C7.49996%202.83337%207.83329%202.50004%208.33329%202.50004H11.6666C12.1666%202.50004%2012.5%202.83337%2012.5%203.33337V4.16671H7.49996V3.33337ZM14.1666%2017.5C14.6666%2017.5%2015%2017.1667%2015%2016.6667V5.83337H4.99996V16.6667C4.99996%2017.1667%205.33329%2017.5%205.83329%2017.5H14.1666Z%22%20fill%3D%22black%22%2F%3E%3Cmask%20id%3D%22mask0_26_2655%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%221%22%20y%3D%220%22%20width%3D%2218%22%20height%3D%2220%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M17.5%204.16671H14.1666V3.33337C14.1666%201.91671%2013.0833%200.833374%2011.6666%200.833374H8.33329C6.91663%200.833374%205.83329%201.91671%205.83329%203.33337V4.16671H2.49996C1.99996%204.16671%201.66663%204.50004%201.66663%205.00004C1.66663%205.50004%201.99996%205.83337%202.49996%205.83337H3.33329V16.6667C3.33329%2018.0834%204.41663%2019.1667%205.83329%2019.1667H14.1666C15.5833%2019.1667%2016.6666%2018.0834%2016.6666%2016.6667V5.83337H17.5C18%205.83337%2018.3333%205.50004%2018.3333%205.00004C18.3333%204.50004%2018%204.16671%2017.5%204.16671ZM7.49996%203.33337C7.49996%202.83337%207.83329%202.50004%208.33329%202.50004H11.6666C12.1666%202.50004%2012.5%202.83337%2012.5%203.33337V4.16671H7.49996V3.33337ZM14.1666%2017.5C14.6666%2017.5%2015%2017.1667%2015%2016.6667V5.83337H4.99996V16.6667C4.99996%2017.1667%205.33329%2017.5%205.83329%2017.5H14.1666Z%22%20fill%3D%22white%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23mask0_26_2655)%22%3E%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23BDBDBD%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },

  ]
  public flex:string = 'flex'
  public none:string = 'none'
  toggleActive(clickedItem:any){
      this.units.forEach(item=>{
        item.class = false
      })
      clickedItem.class = true
  }
  chooseTitle(clicked:any){
    this.title = clicked.nameUnit
  }
  
  // taskAdd
  isOpen:boolean = false
  taskModuleOpen(){
    this.isOpen = !this.isOpen
  }
  public tsksObj:Tasks
  public taskList:Tasks[]=[]
  tasks = []
  constructor(
    private formBuilder: FormBuilder,
    private newService: NewService
  ){
    this.tsksObj = new Tasks; 
    const localData = localStorage.getItem('todo')
    if(localData != null){
        this.taskList = JSON.parse(localData)
    }
    this.dates = this.newService.dataSignal()
    // Initialize the signal with the current local storage data
    this.localStorageData.set(this.newService.dataSignal());

    // Set up a MutationObserver to watch for changes to local storage
    const observer = new MutationObserver(() => {
    this.localStorageData.set(this.newService.dataSignal());
   });
  
  observer.observe(document, { attributes: true, childList: true, characterData: true, subtree: true });
  }

  ngOnInit(){
    this.tasks = JSON.parse(localStorage.getItem('todo'))
    this.tasksSignal.set(this.tasks)

  }
  setItem():void{
    const task = JSON.stringify(this.tsksObj)
    const parseTask = JSON.parse(task)
    this.taskList.push(parseTask);
    localStorage.setItem('todo', JSON.stringify(this.taskList));
    this.tasks = this.taskList;
    this.tasksSignal.set(this.tasks);
    this.tsksObj.description = undefined
    this.tsksObj.dueDate = undefined
    this.tsksObj.id = undefined
    this.tsksObj.isCompleted = null
    this.tsksObj.isDeleted = null
    this.tsksObj.isImportant = null
    this.tsksObj.name = undefined
    this.tsksObj.tags[0].isTrue = null
    this.tsksObj.tags[1].isTrue = null
    this.tsksObj.tags[2].isTrue = null
    this.tsksObj.tags[3].isTrue = null
  }

  //tasks
public filtered:any[] = []
localStorageData = signal<any[] | null>(null);
deletedTasks: Tasks[] = []
important
moveToDeleted(task: Tasks): void {
  task.isDeleted = true
  this.deletedTasks.push(task)
  this.important = this.tasks.filter(task => task.isImportant)
  const index = this.tasks.indexOf(task)
  if (index !== -1) {
    this.tasks.splice(index, 1)
  }
  
  if(this.units[1].class===true){
    if (index !== -1) {
      this.important.splice(index, 1)
    }
    this.tasksSignal.set(this.important)
  }else if(this.units[0].class===true){
    this.tasksSignal.set(this.tasks)
  }
}
filterTags(item, bool){
  bool = !bool
  console.log(bool)
  if(bool === false){
    this.tasksSignal.set(this.tasks)
  }else if(bool === true){
    this.tagsFilter =  this.tasks.filter(i=>(i.tags.some(tag=>(tag.content===item&&tag.isTrue===bool))))
    this.tasksSignal.set(this.tagsFilter)
      console.log(this.tagsFilter)
  }
}
filterTasks(filterType: string): void {
  switch (filterType) {
    case 'all':
      this.isDel = false
    this.tasksSignal.set(this.tasks)
      break;
    case 'important':
      this.isDel = false
      this.tasksSignal.set(this.tasks.filter(task => task.isImportant))
      break;
    case 'done':
      this.isDel = false
      this.tasksSignal.set(this.tasks.filter(task => task.isCompleted))
      break;
    case 'deleted':
      this.isDel = true
      this.tasksSignal.set(this.deletedTasks)
      break;
    default:
      this.tasksSignal.set(this.tasks.slice())
      break;
  }
}
reviveTask(task: Tasks): void {
  task.isDeleted = false;
  const index = this.deletedTasks.indexOf(task);
  if (index !== -1) {
    this.deletedTasks.splice(index, 1);
    this.tasks.push(task);
     // Move task back to all tasks array
  }this.tasksSignal.set(this.deletedTasks)
}
deleteItem(){
  localStorage.removeItem('todo')
}
lcData = this.newService.taskList
dates:any
droppedArr:any[]
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  this.droppedArr = this.tasks;
  this.tasksSignal.set(this.droppedArr)
  localStorage.setItem('todo', JSON.stringify(this.droppedArr))
  console.log(this.droppedArr)
}
tasker = this.tasks
  tsk = signal(this.tasker)
  val(){
    if(this.tasks === null){
      return 0
    }else{ return this.tasks.length - 6}
  }
  removeItem(item){
    localStorage.removeItem(item)
  }
  isShow = false;
  isMore(){
    if(this.tasks.length > 6){
      this.isShow = true
    }else if(this.tasks.length <= 6 || this.tasks.length === null){
      this.isShow = false
    }
  }
  isBigger(){
    if(this.tasks ===null){
      null
    }else{
      this.isMore()
    }
  }
  Showfunc(){
    if(this.tasks === null){
      return null
    }else{
      this.isMore()
    }
  }
  isFull:boolean = false;
  openCont(){
    this.isFull = !this.isFull
  }
  removeFromLocalStorage(name) {
    // Retrieve the current data from local storage
    const todoListJson = localStorage.getItem('todo');
    if (todoListJson) {
      let todoList = JSON.parse(todoListJson);
  
      // Find and remove the John Doe object
      todoList = todoList.filter(item => !(item.name === name));
  
      // Save the updated data back to local storage
      localStorage.setItem('todo', JSON.stringify(todoList));
      this.tasksSignal = signal<any>(this.tasks);
      this.tasks = this.tasks.filter(item => !(item.name === name));
      this.tasksSignal.set(this.tasks);
    }
  }
  completedItem
  completedTasks = []
  isCompleted(t, id){
      t.isCompleted = !t.isCompleted
      this.completedItem = this.tasks.filter(item=>!(item.isCompleted === false))
      const todoListJson = localStorage.getItem('todo')
      let todoList = JSON.parse(todoListJson)
      let todoListOne = todoList.filter(item=>(item.name === id))
      let todoListFilter = todoList.filter(item=>!(item.name===id))
      
      console.log(t.isCompleted)
      // todoListFilter.splice(id,0,todoListOne)
      // localStorage.setItem('todo', JSON.stringify(todoListFilter))
      
  }
  btnCompleted(){
    this.isDel = false
    this.tasksSignal.set(this.completedItem)
  }
  importantItem
  isImportant(t, id){
    t.isImportant = !t.isImportant
    this.importantItem = this.tasks.filter(item=>!(item.isImportant === false))
    const todoListJson = localStorage.getItem('todo')
    let todoList = JSON.parse(todoListJson)
    let todoListOne = todoList.filter(item=>(item.name === id))
    let todoListFilter = todoList.filter(item=>!(item.name===id))
  }
  btnImportant(){
    this.isDel = false
    this.importantItem = this.tasks.filter(item=>!(item.isImportant === false))
    if(this.tasks.some(item=>{
      item.isDeleted === true
    })){this.tasksSignal.set(this.newIArr)}else{
      this.tasksSignal.set(this.importantItem)
    }
    
  }
  toggleTags(tagger:any){
    tagger.class = !tagger.class
}
  filterS(w){
    // this.child.filterTasksByTag(w.tagName)
  }
  filteredTasks: Tasks[] = [];
  tasksForTags: Tasks[]
  tagsFilter

  toggleTagFilter(tag, bool): void {
    bool = !bool
    this.tasksForTags = this.tasks
    console.log(this.tagsFilter)
  }
  clickedUnits=[
    {
      all: true,
      important: false,
      done: false,
      dlt: false
    }

  ]
  aDel
  iDel
  cDel
  deleted
  deletedArr:any[] = []
  newArr
  newIArr
  newCArr
  toTheBin(item){
    item.isDeleted = true;
    //delete 
    this.aDel = this.tasks.filter(item=>!(item.isDeleted===true))
    this.iDel = this.importantItem.filter(item=>!(item.isDeleted===true))
    this.cDel = this.completedItem.filter(item=>!(item.isDeleted===true))
    this.units[0].class === true?this.tasksSignal.set(this.aDel):this.units[1].class === true?this.tasksSignal.set(this.iDel):this.units[3].class === true?this.tasksSignal.set(this.cDel):
      console.log(this.units[2].class === true)
  }
  isDel:boolean = false;
  btnBin(){
    this.tasksSignal.set(this.aDel)
    this.isDel = true
  }
  returnArr
  newRArr
  returnDel(item){
    item.isDeleted = false
    this.returnArr = this.aDel.filter(item=>{item.isDeleted = true})
    this.newArr.push(this.returnArr)
    this.newRArr = this.aDel.filter(item=>{item.isDeleted=false})
    this.tasksSignal.set(this.newRArr)
  }
  tagsOnly:any[]
  getTagsArray(id) {
    Object.keys(id).map(key => ({ type: key, ...this.tags[key] }));
}
  allTasks(){
    this.isDel = false
    // this.tasks = JSON.parse(localStorage.getItem('todo'))
    if(this.tasks.some(item=>{item.isDeleted===true})){
      this.tasksSignal.set(this.newArr)
    }else(this.tasksSignal.set(this.tasks))
    console.log('works')
  }
  removeTask:Tasks[]
  removeData(){
    this.tsksObj.description = undefined
    this.tsksObj.dueDate = undefined
    this.tsksObj.id = undefined
    this.tsksObj.isCompleted = null
    this.tsksObj.isDeleted = null
    this.tsksObj.isImportant = null
    this.tsksObj.name = undefined
    this.tsksObj.tags[0].isTrue = null
    this.tsksObj.tags[1].isTrue = null
    this.tsksObj.tags[2].isTrue = null
    this.tsksObj.tags[3].isTrue = null
  }
}
