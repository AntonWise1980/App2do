/* 

This application is a "to do app" program. Some people may also refer to this program as a Shopping List. 
While developing the program, I benefited from Bradley Traversy's tutorial. However, 
I implemented a few missing functions that I noticed during development myself. 

The features I added are as follows:  

1- In the original training, there was no cancel button for when you wanted to change an item on the to-do list.
I added a cancel button, allowing you to return to the beginning by clicking the cancel button if you decide to back out.

2- I wanted to limit the number of characters that can be entered in a field. This way, 
in case a very long item is entered, I was able to alert the user using the alert function. 

3- I added a new class named btn2 for the Cancel button in my CSS class. 

4- In the HTML part, I added my button with the btn2 ID next to the same button so that it is inline. 
This way, I can reach it from CSS and adjust its design. More importantly, by setting the Display property to "none" or "inline," 
I can target this feature from the JS code and toggle it between active/inactive. 
In VanillaJS, I reverted whatever I changed back to its original state.

Anton Wise,
2025

*/

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const cancelBtn = document.getElementById('btn2');
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
    if(newItem.length>20){
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

// Function item add to localStorage.
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

// Function get item from storage.
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

// Function for click items event handler.
function onClickItem(e) {
    //when we choose item input of filter item should clear.
    itemFilter.value = "";

    if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    

    } else if (e.target.closest('li')) {
    
    setItemToEdit(e.target);
    
    
  }
}

// Function for check double item comparison.
function checkIfItemExists(item){
    itemsFromStorage = getItemFromStorage();
    if(itemsFromStorage){
        cancelBtn.style.display = 'inline';
    }
    cancelBtn.style.display = 'none';
    return itemsFromStorage.includes(item);
    
}

// Function for edit item.
function setItemToEdit(item){
    isEditMode = true;
    
    itemList
    .querySelectorAll('li')
    .forEach((i)=> i.classList.remove('edit-mode'));// first item list class remove edit mode in case.

    item.classList.add('edit-mode'); // to change color gray
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'; // to change button icon and name
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent; //take item to input.value.
    
    cancelBtn.style.display = 'inline';

    
}

function cancelFunc(){
    itemInput.value = "";
    itemList.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'))
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'; // to change button icon and name
    formBtn.style.backgroundColor = 'black';
    cancelBtn.style.display = 'none';
    
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

// Function to remove item from storage.
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
    cancelBtn.style.display = 'none';
    const items = itemList.querySelectorAll('li');
    if(items.length===0){
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display='block';
        itemFilter.style.display='block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>  Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

}

// Function to initialize program.
function init(){
itemForm.addEventListener('submit', onAddItemSubmit)
cancelBtn.addEventListener('click', cancelFunc)
itemList.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input',filterItems )
document.addEventListener('DOMContentLoaded', displayItems)
checkUI();
}

init();









