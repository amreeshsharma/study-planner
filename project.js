const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {

    const completed = tasks.filter(task => task.completed).length;

    const percent =
        tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    progress.style.width = percent + "%";
    progressText.innerText = percent + "% Completed";
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className =
            task.completed
            ? "task completed"
            : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="complete"
                onclick="toggleTask(${index})">
                ✓
                </button>

                <button class="delete"
                onclick="deleteTask(${index})">
                ✕
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateProgress();
    saveTasks();
}

function addTask() {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value = "";

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed =
    !tasks[index].completed;

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    renderTasks();
}

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

renderTasks(); 