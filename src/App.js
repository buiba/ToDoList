import React, { Component } from 'react';
import './App.css';
import Control from './components/Control';
import TastList from './components/TaskList';
import TaskForm from './components/TaskForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing : null,
        filter : {
          name: '',
          status: -1
        },
        keyword: ''
      }
  }
  UNSAFE_componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        this.setState({
          tasks: tasks
        });
    }
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !==null){
    this.setState({
      isDisplayForm : true,
      taskEditing: null
    })
  } else{
    this.setState({
      isDisplayForm : !this.state.isDisplayForm,
      taskEditing: null
    })
  }
  }

  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }

  generrateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
     + this.s4() + this.s4() + this.s4();
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if(data.id === '')
    {
    // Add task
      data.id = this.generrateID();
      tasks.push(data);
    } else {
     // Edit task
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id); 
    if(index !== -1 && index !== undefined){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id); 
    if(index !== -1){
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm()
  }

  onUpdateData = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id); 
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state
    var result = -1;
    tasks.forEach((task, index)=>{
      if(task.id === id){
        result = index
      }
    });
    return result;
  }
  onFilter = (filterName, filterStatus) => {
       var filterStatusNum = +filterStatus;
       this.setState({
        filter: {
          name : filterName.toLowerCase(),
          status : filterStatusNum
        }
       });
     
  }
  render(){
    var {tasks, isDisplayForm, taskEditing, filter} = this.state; // var tasks = this.state.tasks
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !==-1;
        });
      }
        tasks = tasks.filter((task) => {
          if(filter.status === -1){
            return task;
          }
          else{
            return task.status === (filter.status === 1 ? true: false);
          }
        });
    }

    var elmentTaskForm = isDisplayForm 
    ? <TaskForm 
        onCloseForm = { this.onCloseForm }
        onSubmit = {this.onSubmit}
        task = {taskEditing}
     />
     : '';
    return (
      <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
      <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
      : ''}>
      {elmentTaskForm}
      </div>
        <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
        : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
          <button
           type="button"
           className="btn btn-primary"
           onClick = {this.onToggleForm}>
           <span className="fa fa-plus mr-5" />Thêm Công Việc
          </button>
          <Control/>
          <TastList
           tasks = {tasks}
           onUpdateStatus = {this.onUpdateStatus}
           onDelete = {this.onDelete}
           onUpdateData = {this.onUpdateData}
           onFilter = {this.onFilter}
            />
        </div>
      </div>
      </div>
  );
}
}

export default App;
