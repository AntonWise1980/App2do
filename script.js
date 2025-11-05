/* 
This application is a "to do app" program. Some people may also refer to this program as a Shopping List. 
While developing the program, I benefited from Bradley Traversy's tutorial. However, 
I implemented a few missing functions and features that I noticed during development myself. 
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
const charCount = document.getElementById('char-count');
let isEditMode = false;

// Function display items after dom content loaded show list.
function displayItems(){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(item=>addItemToDom(item));
    checkUI();
    itemFilter.value = ''; // show all list.
}

// Function for addItem.
function onAddItemSubmit (e){
    e.preventDefault(); // because not using yet local storage.
    // get the new item from item input value.
    const newItem = itemInput.value.trim(); // "   " for prevend many spaces..
    //simple validate input value
if (newItem === '') {
    alert('Please input and item!');
    itemInput.focus();
    return;
}
    if(newItem.length>15){
        alert(`"${newItem}" too long (${newItem.length} character)\nMaximum should be 15 char.`);
        return;
    }

    // If check for edit mode.
    if (isEditMode){
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    
    isEditMode = false;
    // reset filter to show all elements.
    itemFilter.value = '';
    filterItems({ target: { value: '' } });

    } else {
        if (checkIfItemExists(newItem)){
            alert(`The item "${newItem}" already exists!`);
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
function checkIfItemExists(newItem) {
    return getItemFromStorage().some(stored => 
        stored.toLowerCase() === newItem.toLowerCase()// to check capital and lowercase.
    );
}

// Function for edit item.
function setItemToEdit(item){
    isEditMode = true;
    
    // get only visible li tags
    itemList.querySelectorAll('li').forEach(li => {
        if (li.style.display !== 'none') {
            li.classList.remove('edit-mode');
        }
    });

    item.classList.add('edit-mode'); // to change color gray
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'; // to change button icon and name
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent; //take item to input.value.
    
    cancelBtn.style.display = 'inline';
    
    
}

function cancelFunc(){
    isEditMode = false;
    itemInput.value = "";
    itemList.querySelectorAll('li').forEach(i => {
        i.classList.remove('edit-mode');
        i.style.display = 'flex'; // show all.
    });
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    cancelBtn.style.display = 'none';
    itemFilter.value = ''; // clear filter.
    charNumber();
}

// Function remove item from DOM.
function removeItem(item){
    
    if(confirm(`Are you sure delete "${item.textContent}" item?`)){

        
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
    const text = e.target.value.trim().toLowerCase();

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

// Function for If the user gives up while entering the item filter function and presses the Esc key, it clears the field and restores the list.
function handleFilterEscape(e) {
    if (e.key === 'Escape') {
        itemFilter.value = '';           // Input clear.
        filterItems({ target: { value: '' } }); // Show back all list.
        itemFilter.blur();               // item filter blur 
    }
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

// Function to be used if the user wants to add an element by only pressing the "Enter" key or if they choose not to enter with the Escape key.
function enterEscapeKey(e){

    if (e.key === 'Enter'&& !e.shiftKey) {
        e.preventDefault();
        itemForm.dispatchEvent(new Event('submit'));
    } else if (e.key === 'Escape' && isEditMode) {
        cancelFunc();
    }
}

// Function that allows the user to specify the maximum number of characters to enter when entering an item.
function charNumber(){
    
    const length = itemInput.value.length;
    charCount.textContent = `${length} / 15`;
    charCount.style.color = length > 15 ? 'red' : '#666';
}

// Function allows to cancel with Esc key while edit-mode is on.
function globalEscapeKey(e){

        if (e.key === 'Escape' && isEditMode) {
            cancelFunc();
        }
}

// Function to initialize program.
function init(){
itemInput.addEventListener('input', charNumber)
itemInput.addEventListener('keydown', enterEscapeKey)
itemForm.addEventListener('submit', onAddItemSubmit)
cancelBtn.addEventListener('click', cancelFunc)
itemList.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input',filterItems)
itemFilter.addEventListener('keydown', handleFilterEscape)
document.addEventListener('keydown', globalEscapeKey)
document.addEventListener('DOMContentLoaded', displayItems)
checkUI();
}

init();

