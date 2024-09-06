let taskList = [];
const RANDOM_STRING_LENGTH = 6;
const WEEKLY_HOUR = 7 * 12;

const addTask = (myForm) => {
    const formData = new FormData(myForm);
    const task = formData.get("task");
    const hour = parseInt(formData.get("hour"));

    console.log(task, hour);
    const id = getRandomUniqueID();

    const taskObj = {
        id,
        task,
        hour,
        type: "good",
    };

    // check for weekly hour
    let totalHour = getTotalHours();
    if (totalHour + hour > WEEKLY_HOUR) {
        displayAlert("WEEKLY HOUR EXCEEDED");
    } else {
        displayAlert("TASK ADDED");
        taskList.push(taskObj);
        displayList();
        myForm.reset();
    }
};

const displayList = () => {
    console.log("INSIDE DISPLAY");
    // updating good list
    const goodListElement = document.getElementById("goodList");

    let goodListElementContent = "";

    let goodIndex = 0;

    taskList.map((item, index) => {
        if (item.type == "good") {
            goodIndex = goodIndex + 1;
            goodListElementContent += `
                <tr>
                <th scope="row">${goodIndex}</th>
                <td>${item.task}</td>
                <td>${item.hour}hrs</td>
                <td class="text-end">
                    <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')"><i
                            class="fa-solid fa-trash"></i></button>
    
                    <button type="button" class="btn btn-success" onclick="switchTask('${item.id}')"><i class="fa-solid fa-arrow-right"></i></button>
                </td>
            </tr>
            
            `;
        }
    });

    goodListElement.innerHTML = goodListElementContent;

    const totalHours = getTotalHours();
    const totalHourElement = document.getElementById("totalHour");
    totalHourElement.innerText = totalHours;

    // updating bad list
    const badListElement = document.getElementById("badList");
    let badListElementContent = "";

    let badIndex = 0;

    taskList.map((item, index) => {
        if (item.type == "bad") {
            badIndex += 1;
            badListElementContent =
                badListElementContent +
                `
                <tr>
                <th scope="row">${badIndex}</th>
                <td>${item.task}</td>
                <td>${item.hour}hrs</td>
                <td class="text-end">
                    <button type="button" class="btn btn-warning" onclick="switchTask('${item.id}')"><i
                            class="fa-solid fa-arrow-left" ></i></button>
                    <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')"><i
                            class="fa-solid fa-trash"></i></button>

                </td>
            </tr>
            `;
        }
    });

    badListElement.innerHTML = badListElementContent;

    const badHourElement = document.getElementById("badHour");
    badHourElement.innerText = getBadHours();

    // update local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

const getBadHours = () => {
    let badHours = taskList.reduce((acc, item) => {
        if (item.type == "bad") {
            return acc + item.hour;
        } else {
            return acc + 0;
        }
    }, 0);
    return badHours;
};

const getTotalHours = () => {
    let totalHours = taskList.reduce((acc, item) => {
        return acc + item.hour;
    }, 0);
    return totalHours;
};

const deleteTask = (id) => {
    taskList = taskList.filter((task) => {
        return task.id != id;
    });

    displayList();
    displayAlert("TASK DELETED");
};

const getRandomUniqueID = () => {
    let stringGenerator =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < RANDOM_STRING_LENGTH; i++) {
        let randomIndex = Math.floor(Math.random() * stringGenerator.length);
        randomString = randomString + stringGenerator[randomIndex];
    }

    return randomString;
};

const switchTask = (id) => {
    let task = taskList.find((task) => task.id == id);
    task.type = task.type == "good" ? "bad" : "good";

    displayList();
    displayAlert("TASK SWITCHED");
};

const displayDataFromLocalStorage = () => {
    let tempList = JSON.parse(localStorage.getItem("taskList"));
    taskList = tempList ? tempList : [];

    displayList();
};

const displayAlert = (message) => {
    const toastMessage = document.getElementById("toast-message");

    toastMessage.innerText = message;

    const toastLiveExample = document.getElementById("liveToast");

    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();

    const notifyElement = document.getElementById("notifyAudio");
    notifyElement.play();
};

displayDataFromLocalStorage();
