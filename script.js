let taskList = [];

const handleOnSubmit = (event) => {
    const formData = new FormData(event);
    let task = formData.get("task");
    let hour = formData.get("hour");

    let taskObj = {
        task,
        hour,
    };
    taskList.push(taskObj);

    displayEntryList();

    event.reset();
};

const displayEntryList = () => {
    console.log(taskList);

    const entryListElement = document.getElementById("entryList");

    let elementContent = "";

    taskList.map((item, index) => {
        elementContent += `
            <tr>
                <th>${index + 1}</th>
                <td>${item.task}</td>
                <td>${item.hour} hour/s</td>
                <td class="text-end">
                    <button class="btn btn-danger"> <i class="fa-solid fa-trash"></i></button>
                    <button class="btn btn-success"> <i class="fa-solid fa-arrow-right"></i></button>
                </td>
            </tr>`;
    });

    console.log(elementContent);

    entryListElement.innerHTML = elementContent;
};
