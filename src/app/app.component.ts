import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular 14 Directives To-Do List';
  taskInput: string = '';
  tasks: { name: string, completed: boolean }[] = [];

  // Method to add a new task
  addTask(): void {
    if (this.taskInput.trim() !== '') {
      this.tasks.push({ name: this.taskInput, completed: false });
      this.taskInput = '';  // Clear the input field after adding
    }
  }

  // Method to toggle task completion
  toggleTaskCompletion(task: { name: string, completed: boolean }): void {
    task.completed = !task.completed;
  }

  // Method to delete a task
  deleteTask(taskIndex: number): void {
    this.tasks.splice(taskIndex, 1);
  }
}
