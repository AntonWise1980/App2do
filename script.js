const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem (e){
    e.preventDefault();
    //simple validate input
    if(itemInput.value===''){
        alert('please add something.');
        return;
    }
    console.log('success!');

}
itemForm.addEventListener('submit', addItem);