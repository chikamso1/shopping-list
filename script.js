const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('.btn-clear');
const filterForm = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

//loading items from local storage
function displayItems(){
    const itemsFromSrorage = getItemsFromStorage();
    itemsFromSrorage.forEach((item) => addItemToDom(item));
    checkUI();
}

//submiting items
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //Validate the inpuut
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    
    //check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    //create item dom element
    addItemToDom(newItem);

    //add item to local storage
    addItemToStorage(newItem);
    //check the UI 
    checkUI();
    //clear input form
    itemInput.value = '';    
}

function addItemToDom(item) {
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    //call button function
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //Add li to the doM
    itemList.appendChild(li);
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
function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // if(localStorage.getItem('items') === null) {
    //     itemsFromSrorage = [];
    // } else {
    //     itemsFromSrorage = JSON.parse(localStorage.getItem('items'));
    // }

    //Add new item into array of existing storage or empty storage
    itemsFromStorage.push(item);

    //convert to json string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function getItemsFromStorage(item) {
    let itemsFromSrorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }else {
        setItemToEdit(e.target)
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}
//remove single item
function removeItem(item) {
    if(confirm('Do you want to delete this item?')) {
        //remove item from DOM
        item.remove();

        //remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI;
    }

    // if(e.target.parentElement.classList.contains('remove-item')) {
    //     if(confirm('Do you want to delete this item?')) {
    //     e.target.parentElement.parentElement.remove();
    //     checkUI();
    //     }
    // }
    
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //re-set the storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
//clear items
function clearItems () {
    if(confirm('Do you want to clear your cart?')) {
    // itemList.remove();
    
    //alternatively
    while(itemList.firstChild){
        itemList.firstChild.remove();
    
    }
    //clear from local storage
    localStorage.removeItem('items');
    checkUI();
}
}
//filtering search

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.includes(text)){
            item.style.display = 'flex';
        } else{
            item.style.display = 'none';
        }


        //alternatively
        // if (itemName.indexOf(text) != -1){
        //     item.style.display = 'flex';
        // } else{
        //     item.style.display = 'none';
        // }

        //alternatively
        //const itemText = item.textContent.toLowerCase();
        // if (itemText.includes(text)) {
        //     item.style.display = 'block'; // show matching items
        // } else {
        //     item.style.display = 'none'; // hide non-matching items
        // }
    })
    console.log(text);
}
// Make clear button and filter form dynamic
function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filterForm.style.display = 'none'
    } else{
        clearBtn.style.display = 'block';
        filterForm.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

//Initialize app

function init() {
    //Event Listener
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filterForm.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}

init();