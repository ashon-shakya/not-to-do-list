const HOURS_IN_WEEK = 7 * 24;
let taskList = [];

const handleOnSubmit = (event) => {
    const formData = new FormData(event);
    let task = formData.get("task");
    let hour = parseInt(formData.get("hour"));
    let id = generateRandomId(6);

    let taskObj = {
        id,
        task,
        hour,
        type: "good",
    };

    const totalHours = getTotalHours();

    if (totalHours + hour <= HOURS_IN_WEEK) {
        taskList.push(taskObj);
    } else {
        const toastLiveExample = document.getElementById("liveToast");
        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
    }

    displayTaskList();
    event.reset();
};

const displayTaskList = () => {
    const goodListElement = document.getElementById("goodList");
    const badListElement = document.getElementById("badList");

    let goodTaskList = "";
    let badTaskList = "";

    let goodIndex = 0;
    let badIndex = 0;

    taskList.map((item) => {
        if (item.type == "good") {
            goodTaskList += `
                <tr>
                    <th>${goodIndex + 1}</th>
                    <td>${item.task}</td>
                    <td>${item.hour} hour/s</td>
                    <td class="text-end">
                        <button class="btn btn-danger" onClick="handleOnDelete('${
                            item.id
                        }')"> <i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-success" onClick="handleSwitchTask('${
                            item.id
                        }')"> <i class="fa-solid fa-arrow-right"></i></button>
                    </td>
                </tr>`;
            goodIndex += 1;
        }

        if (item.type == "bad") {
            badTaskList += `
            <tr>
                <th>${badIndex + 1}</th>
                <td>${item.task}</td>
                <td>${item.hour} hour/s</td>
                <td class="text-end">
                <button class="btn btn-warning" onClick="handleSwitchTask('${
                    item.id
                }')"> <i class="fa-solid fa-arrow-left"></i></button>
                    <button class="btn btn-danger" onClick="handleOnDelete('${
                        item.id
                    }')"> <i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;

            badIndex += 1;
        }
    });

    goodListElement.innerHTML = goodTaskList;
    badListElement.innerHTML = badTaskList;

    const badHoursEelement = document.getElementById("badHours");
    const totalHoursElement = document.getElementById("totalHours");

    const badHours = getBadHours();
    const totalHours = getTotalHours();

    badHoursEelement.innerText = badHours;
    totalHoursElement.innerText = totalHours;
};

const handleOnDelete = (id) => {
    taskList = taskList.filter((task) => task.id != id);

    displayTaskList();
};

const handleSwitchTask = (id) => {
    task = taskList.find((task) => task.id == id);

    console.log(id);
    if (task) {
        task.type = task.type == "good" ? "bad" : "good";
    }

    displayTaskList();
};

const getTotalHours = () => {
    const totalHours = taskList.reduce((acc, task) => {
        return acc + task.hour;
    }, 0);

    return totalHours;
};

const getBadHours = () => {
    const badHours = taskList.reduce((acc, task) => {
        if (task.type == "bad") {
            return acc + task.hour;
        } else {
            return acc + 0;
        }
    }, 0);

    return badHours;
};

const generateRandomId = (idLength) => {
    const str =
        "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

    let id = "";

    for (i = 0; i < idLength; i++) {
        const randomPosition = Math.floor(Math.random() * str.length);
        id += str[randomPosition];
    }

    return id;
};
