import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [FormsModule],  // Import FormsModule to support ngModel
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the AppComponent', () => {
            expect(component).toBeTruthy();
        });

        it('should add a new task', () => {
            component.taskInput = 'New Task';
            component.addTask();

            expect(component.tasks.length).toBe(1);
            expect(component.tasks[0].name).toBe('New Task');
            expect(component.tasks[0].completed).toBe(false);
            expect(component.taskInput).toBe('');  // Input should be cleared after adding a task
        });

        it('should not add a task if input is empty', () => {
            component.taskInput = '';
            component.addTask();

            expect(component.tasks.length).toBe(0);  // No task should be added
        });

        it('should toggle task completion', () => {
            component.taskInput = 'Complete me!';
            component.addTask();

            const task = component.tasks[0];
            expect(task.completed).toBe(false);

            // Toggle task completion
            component.toggleTaskCompletion(task);
            expect(task.completed).toBe(true);

            // Toggle it back
            component.toggleTaskCompletion(task);
            expect(task.completed).toBe(false);
        });

        it('should delete a task', () => {
            component.taskInput = 'Task to delete';
            component.addTask();
            expect(component.tasks.length).toBe(1);

            component.deleteTask(0);  // Delete the task at index 0
            expect(component.tasks.length).toBe(0);  // No tasks should be left
        });

        it('should display "No tasks to show!" when there are no tasks', () => {
            const noTasksMessage = fixture.nativeElement.querySelector('p');
            expect(noTasksMessage).toBeTruthy();
            expect(noTasksMessage.textContent).toContain('No tasks to show!');
        });

        it('should display the task name in the list', () => {
            component.taskInput = 'Test Task';
            component.addTask();
            fixture.detectChanges();

            const taskElement = fixture.nativeElement.querySelector('ul li');
            expect(taskElement.textContent).toContain('Test Task');
        });

        it('should apply the "completed" class when task is marked as completed', () => {
            component.taskInput = 'Completed Task';
            component.addTask();
            fixture.detectChanges();

            const taskElement = fixture.nativeElement.querySelector('ul li');

            // Initially the task is not completed, so the class should not be applied
            expect(taskElement.classList.contains('completed')).toBe(false);

            component.toggleTaskCompletion(component.tasks[0]);
            fixture.detectChanges();

            // After toggling, the task should have the "completed" class
            expect(taskElement.classList.contains('completed')).toBe(true);
        });
    });
});
