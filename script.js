/* 
This application is a "to do app" program. Some people may also refer to this program as a Shopping List. 
While developing the program, I benefited from Bradley Traversy's tutorial. However, 
I implemented a few missing functions and features that I noticed during development myself. 
Anton Wise,
2025
*/

const ITEM_FORM = document.getElementById('item-form');
const ITEM_INPUT = document.getElementById('item-input');
const ITEM_LIST = document.getElementById('item-list');
const CLEAR_BTN_ALL = document.getElementById('clear');
const ITEM_FILTER_INPUT = document.getElementById('filter');
const FORM_BUTTON_ADD_ITEM = ITEM_FORM.querySelector('button');
const CANCEL_BUTTON_FOR_EDIT = document.getElementById('btn2');
const CHARACTER_COUNT_SHOW_LIMIT = document.getElementById('char-count');
let isEditMode = false;
let clearInputWrapper = null;
let clearInputBtn = null;

// Function display items after dom content loaded show list.
function displayItems(){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(item=>addItemToDom(item));
    updateUI();
    ITEM_FILTER_INPUT.value = ''; // show all list.
}

// Function for addItem.
function onSubmitFormAddItem (e){
    e.preventDefault(); // because not using yet local storage.
    // get the new item from item input value.
    const newItem = ITEM_INPUT.value.trim(); // "   " for prevend many spaces..
    //simple validate input value
if (newItem === '') {
    alert('Please input and item!');
    ITEM_INPUT.focus();
    return;
}
    if(newItem.length>15){
        alert(`"${newItem}" too long (${newItem.length} character)\nMaximum should be 15 char.`);
        return;
    }

    // If check for edit mode.
    if (isEditMode){
    const itemToEdit = ITEM_LIST.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    
    isEditMode = false;
    // reset filter to show all elements.
    ITEM_FILTER_INPUT.value = '';
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
    //updateUI because hiding buttons depends on status ui.
    updateUI();
    // input clear
    ITEM_INPUT.value='';
    updateCharCount();
    updateClearButton();

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
    ITEM_LIST.appendChild(li);
    ITEM_INPUT.focus();
    
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
    //when user choose item input of filter item should clear.
    ITEM_FILTER_INPUT.value = "";
    

    if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    

    } else if (e.target.closest('li')) {
    
    setItemToEdit(e.target);
    
    
  }
  
  updateFilterClearButton();
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
    ITEM_LIST.querySelectorAll('li').forEach(li => {
        if (li.style.display !== 'none') {
            li.classList.remove('edit-mode');
        }
    });

    item.classList.add('edit-mode'); // to change color gray
    FORM_BUTTON_ADD_ITEM.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'; // to change button icon and name
    FORM_BUTTON_ADD_ITEM.style.backgroundColor = 'green';
    ITEM_INPUT.value = item.textContent; //take item to input.value.
    
    CANCEL_BUTTON_FOR_EDIT.style.display = 'inline';
    
    updateClearButton();
}

// Function for Esc key to exit edit mode or give up write input.
function cancelFunc(){
    isEditMode = false;
    ITEM_INPUT.value = "";
    ITEM_LIST.querySelectorAll('li').forEach(i => {
        i.classList.remove('edit-mode');
        i.style.display = 'flex'; // show all.
    });
    FORM_BUTTON_ADD_ITEM.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    FORM_BUTTON_ADD_ITEM.style.backgroundColor = '#333';
    CANCEL_BUTTON_FOR_EDIT.style.display = 'none';
    ITEM_FILTER_INPUT.value = ''; // clear filter.
    updateClearButton();
}

// Function remove item from DOM.
function removeItem(item){
    
    if(confirm(`Are you sure delete "${item.textContent}" item?`)){

        
        // from DOM I am removing.    
        item.remove();
        ITEM_INPUT.value = "";

        // from storage removing.
        removeItemFromStorage(item.textContent);
            updateUI();
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
function clearItemsAll(){

    if(confirm ("Are you sure to delete all?")){
        while(ITEM_LIST.firstChild){
        ITEM_LIST.removeChild(ITEM_LIST.firstChild);
        }
    }
    localStorage.removeItem('items');
    updateUI();
    ITEM_INPUT.value='';
    updateClearButton();
    updateCharCount();
    ITEM_INPUT.focus();
}

// Function filter item list.
function filterItems(e){
    // ITEM_LIST not in the global scope that is the reason again created.
    const items = ITEM_LIST.querySelectorAll('li');
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
    updateFilterClearButton();
}

// Function for If the user gives up while entering the item filter function and presses the Esc key, it clears the field and restores the list.
function handleFilterEscape(e) {
    if (e.key === 'Escape') {
        ITEM_FILTER_INPUT.value = '';           // Input clear.
        filterItems({ target: { value: '' } }); // Show back all list.
        ITEM_FILTER_INPUT.blur();               // item filter blur 
        updateFilterClearButton();
    }
}

// Function for updateUI because of hiding clear button and filter input.
function updateUI (){
   
    CANCEL_BUTTON_FOR_EDIT.style.display = 'none';
    const items = ITEM_LIST.querySelectorAll('li');
    if(items.length===0){
        CLEAR_BTN_ALL.style.display = "none";
        ITEM_FILTER_INPUT.style.display = "none";
    } else {
        CLEAR_BTN_ALL.style.display='block';
        ITEM_FILTER_INPUT.style.display='block';
    }
    FORM_BUTTON_ADD_ITEM.innerHTML = '<i class="fa-solid fa-plus"></i>  Add Item';
    FORM_BUTTON_ADD_ITEM.style.backgroundColor = '#333';
    isEditMode = false;
    updateClearButton();
}

// Function to be used if the user wants to add an element by only pressing the "Enter" key or if they choose not to enter with the Escape key.
function handIeInputEscKeydown(e){

    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        
        ITEM_FORM.dispatchEvent(new Event('submit'));
    } else if (e.key === 'Escape') {
        cancelFunc();
        
    }
}

// Function that allows the user to specify the maximum number of characters to enter when entering an item.
function updateCharCount(){
    
    const length = ITEM_INPUT.value.length;
    CHARACTER_COUNT_SHOW_LIMIT.textContent = `${length} / 15`;
    CHARACTER_COUNT_SHOW_LIMIT.style.color = length > 15 ? 'red' : '#666';
}

// Function allows to cancel with Esc key while edit-mode is on.
function globalEscapeKey(e){

        if (e.key === 'Escape' && isEditMode) {
            cancelFunc();
        }
}

// Function adding Button for cleaning input-item area.
function addInputClearButtonWithClass() {
    clearInputWrapper = document.createElement('div');
    clearInputWrapper.className = 'clear-input-wrapper';

    clearInputBtn = document.createElement('button');
    clearInputBtn.type = 'button';
    clearInputBtn.className = 'clear-input-btn';
    clearInputBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Font Awesome 6.1.2
    clearInputBtn.setAttribute('aria-label', 'Clear input');

    const parent = ITEM_INPUT.parentNode;
    parent.insertBefore(clearInputWrapper, ITEM_INPUT);
    clearInputWrapper.appendChild(ITEM_INPUT);
    clearInputWrapper.appendChild(clearInputBtn);

    clearInputBtn.addEventListener('click', clearInputField);
    ITEM_INPUT.addEventListener('input', updateClearButton);
}

// Function cleaning input-item area if user give up type anything for mobile.
function clearInputField() {
    ITEM_INPUT.value = '';
    ITEM_INPUT.focus();
    updateCharCount();
    if (isEditMode) cancelFunc();
    updateClearButton();
}

// Function for update visibility of clear button.
function updateClearButton() {
    if (!clearInputWrapper) return;
    const hasValue = ITEM_INPUT.value.trim() !== '';
    clearInputWrapper.classList.toggle('has-value', hasValue);
    clearInputWrapper.classList.toggle('edit-mode', isEditMode);
}

// Filter input adding (x) button function
function addFilterClearButtonWithClass() {
    const filterWrapper = document.createElement('div');
    filterWrapper.className = 'clear-filter-wrapper';

    const clearFilterBtn = document.createElement('button');
    clearFilterBtn.type = 'button';
    clearFilterBtn.className = 'clear-filter-btn';
    clearFilterBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    clearFilterBtn.setAttribute('aria-label', 'Clear filter');

    const parent = ITEM_FILTER_INPUT.parentNode;
    parent.insertBefore(filterWrapper, ITEM_FILTER_INPUT);
    filterWrapper.appendChild(ITEM_FILTER_INPUT);
    filterWrapper.appendChild(clearFilterBtn);

    clearFilterBtn.addEventListener('click', function () {
        ITEM_FILTER_INPUT.value = '';
        filterItems({ target: { value: '' } });
        ITEM_FILTER_INPUT.focus();
        updateFilterClearButton();
    });

    ITEM_FILTER_INPUT.addEventListener('input', updateFilterClearButton);

    // İlk yüklemede buton görünürlüğünü ayarla
    updateFilterClearButton();
}

// Functin is update visibilty of button clear
function updateFilterClearButton() {
    const wrapper = ITEM_FILTER_INPUT.parentElement;
    if (!wrapper || !wrapper.classList.contains('clear-filter-wrapper')) return;
    const hasValue = ITEM_FILTER_INPUT.value.trim() !== '';
    wrapper.classList.toggle('has-value', hasValue);
}

// Function to initialize program.
function init(){
addInputClearButtonWithClass(); // When user start to write show x button icon.
ITEM_INPUT.addEventListener('input', updateCharCount) // when user start to write item show character number.
ITEM_INPUT.addEventListener('keydown', handIeInputEscKeydown) // when user after writing if push the Escape key.
ITEM_FORM.addEventListener('submit', onSubmitFormAddItem) // when user submit form by clicking Add Item button.
CANCEL_BUTTON_FOR_EDIT.addEventListener('click', cancelFunc) // when user choose any item to edit show button cancel to give up.
ITEM_LIST.addEventListener('click', onClickItem) // when user choose any item from the list to edit it or delete it.
CLEAR_BTN_ALL.addEventListener('click', clearItemsAll) // when user click Clear All Items button.
ITEM_FILTER_INPUT.addEventListener('input',filterItems) // when user search item in filter area bring them.
ITEM_FILTER_INPUT.addEventListener('keydown', handleFilterEscape) // when user start to search then give up and push Esc key. reset list.
document.addEventListener('keydown', globalEscapeKey) // when the edit-mode on, user give up change anything push Esc key.
document.addEventListener('DOMContentLoaded', displayItems) // When the all page loaded display items.
updateUI();
ITEM_INPUT.focus();
updateClearButton();
addFilterClearButtonWithClass();
}

init();

