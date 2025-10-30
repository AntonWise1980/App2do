const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


// Function display items after dom content loaded show list.
function displayItems(){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(item=>addItemToDom(item));
    checkUI();
}

// Function for addItem.
function onAddItemSubmit (e){
    e.preventDefault(); // because not using yet local storage.
    // get the new item from item input value.
    const newItem = itemInput.value;
    //simple validate input value
    if(newItem === ''){
        alert('please add something.');
        return;
    }
    if(newItem.length>10){
        alert(`input less than ${newItem.length} character item.`);
        return;
    }

    // If check for edit mode.
    if (isEditMode){
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    
    isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)){
            alert("That item alredy exits!");
            return;
        }
    }
    // call function add item to DOM.
    addItemToDom(newItem);

    // call function add item to DOM.
    addItemToStorage(newItem);
    //checkui because hiding buttons depends on status ui.
    checkUI();
    // input clear
    itemInput.value=''; 

}

// Function for add to DOM.
function addItemToDom(item){
    // now create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    // reach the button class with function.
    const button = createButton('remove-item btn-link text-red');
    // reach the icon
    const icon = createIcon('fa-solid fa-xmark')
    // add icon to the button
    button.appendChild(icon)
    // new I can add button to the li element.
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value=''; 

}

// Function return button with class name.
function createButton(classes){
    const button = document.createElement('button');
    button.className=classes;
    return button;
}

// Function return icons with class name.
function createIcon (classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Function item add to localStorage
function addItemToStorage(item){
    let itemsFromStorage;

    // check storage have items?
    if(localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    itemsFromStorage.push(item);
    //variable is array list still so convert it to json string to save localstore
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function get item from storage
function getItemFromStorage(){
    let itemsFromStorage;

    // check storage have items?
    if(localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }

}

function checkIfItemExists(item){
    itemsFromStorage = getItemFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item){
    isEditMode = true;

    itemList
    .querySelectorAll('li')
    .forEach((i)=> i.classList.remove('edit-mode'));// first item list class remove edit mode in case.

    item.classList.add('edit-mode'); // to change color gray
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item'; // to change button icon and name
    formBtn.style.backgroundColor = 'green'; 
    itemInput.value = item.textContent; //take item to input.value.
    
}

// Function remove item from DOM.
function removeItem(item){
    
    if(confirm('Are you sure delete?')){
        // from DOM I am removing.    
        item.remove();

        // from storage removing.
        removeItemFromStorage(item.textContent);
            checkUI();
        }  
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemFromStorage();
    
    itemsFromStorage = itemsFromStorage.filter((i)=>i !== item);

    // re-setting local storage.
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function remove all items from the list.
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
}

// Function filter item list.
function filterItems(e){
    // itemList not in the global scope that is the reason again created.
    const items = itemList.querySelectorAll('li');
    // I am doing target value lowerACase and assing text variable.
    const text = e.target.value.toLowerCase();

    items.forEach((item)=>{
        // each item value taking itemname variable with lowercase.
        const itemName = item.firstChild.textContent.toLowerCase();
        // checking itemname has the text or not.
        if(itemName.indexOf(text)!= -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });
}

// Function for checkUI because of hiding clear button and filter input.
function checkUI (){
    itemInput.value = '';
     
    const items = itemList.querySelectorAll('li');
    if(items.length===0){
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display='block';
        itemFilter.style.display='block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

}

// initialize program
function init(){
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input',filterItems )
document.addEventListener('DOMContentLoaded', displayItems)
checkUI();
}

init();









