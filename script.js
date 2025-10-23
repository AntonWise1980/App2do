const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem (e){
    e.preventDefault(); // because not using yet local storage.

    // get the new item from item input value.
    const newItem = itemInput.value;
    //simple validate input
    if(newItem === ''){
        alert('please add something.');
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
    checkUI();

    // input clear
    itemInput.value='';
    // again I have to check ui status with checkUI() function. Because list is loaded now.
    
   
}

// button class function for change button class name.
function createButton(classes){
    const button = document.createElement('button');
    button.className=classes;
    return button;
}
// for icons create function.
function createIcon (classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
// remove item function creating.
function removeItem(e){
    //parent element has the class name "remove-item"?
    if(e.target.parentElement.classList.contains('remove-item')){
        // found remove-item class then 2 parent element up to reach list-items and remove.
        e.target.parentElement.parentElement.remove();
    }
    checkUI();

}

function clearItems(){
    
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}
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


// add event listener item form.
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)

checkUI();


