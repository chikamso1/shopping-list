const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
// const itemForm = document.querySelector('#item-form');
// const itemForm = document.querySelector('#item-form');
// const itemForm = document.querySelector('#item-form');

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //Validate the inpuut
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    //call button function
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);


    itemList.appendChild(li);

    itemInput.value = '';
}
//create buttons
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    //call the icon function
    const icon = createIcon('fa-solid fa-xmark');

    button.appendChild(icon);
    return button;
}

//create delete icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
//Event Listener
itemForm.addEventListener('submit', addItem);