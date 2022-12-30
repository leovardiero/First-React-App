import React, { Component } from 'react';

import Form from './Form';
import Tasks from './Tasks';

import './Main.css';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1,
  };

  componentDidMount() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (!storedTasks) return;

    this.setState({ tasks: storedTasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { tasks, index } = this.state;
    let { newTask } = this.state;

    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1) return;
    if (newTask === '') return;

    const oldTasks = [...tasks];

    if (index === -1) {
      this.setState({
        tasks: [...oldTasks, newTask],
        newTask: '',
      });
    } else {
      oldTasks[index] = newTask;

      this.setState({
        tasks: [...oldTasks],
        index: -1,
        newTask: '',
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleDelete = (e, index) => {
    const { tasks } = this.state;

    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    this.setState({
      tasks: [...newTasks],
      index: -1,
      newTask: '',
    });
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    this.setState({
      index,
      newTask: tasks[index],
    });
  };

  render() {
    const { newTask, tasks, index } = this.state;

    return (
      <div className="main">
        <h1> Lista de Tarefas </h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />

        <Tasks
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          tasks={tasks}
          index={index}
        />
      </div>
    );
  }
}
