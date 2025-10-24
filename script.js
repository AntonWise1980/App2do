const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


// Function for addItem.
function addItem (e){
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
    // now create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    // reach the button class with function.
    const button = createButton('remove-item btn-link text-red');
    // reach the icon
    const icon = createIcon('fa-solid fa-xmark')
    // add icon to the button
    button.appendChild(icon)
    // new I can add button to the li element.
    li.appendChild(button);
    itemList.appendChild(li);
    //checkui because hiding buttons depends on status ui.
    checkUI();
    // input clear
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
// Function remove item from the list.
function removeItem(e){
    //parent element has the class name "remove-item"?
    if(e.target.parentElement.classList.contains('remove-item')){
        // found remove-item class then 2 parent element up to reach list-items and remove.
        if(confirm('Are you sure delete?')){
            e.target.parentElement.parentElement.remove();
        } 
    }
    // dont forget the status ui.
    checkUI();
}
// Function remove all items from the list.
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}
// Function filter item list.
function filterItems(e){
    const text = e.target.value;
    console.log(text);
}
// Function for checkUI because of hiding clear button and filter input.
function checkUI (){
    const items = itemList.querySelectorAll('li');
    if(items.length===0){
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display='block';
        itemFilter.style.display='block';
    }
}

// Event listeners.
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input',filterItems )

checkUI();


