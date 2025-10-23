const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
    // input clear
    itemInput.value='';
   
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

// add event listener item form.
itemForm.addEventListener('submit', addItem);


