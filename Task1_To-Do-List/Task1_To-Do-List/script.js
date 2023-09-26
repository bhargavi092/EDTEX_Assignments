
function inputFocus(){
    document.getElementById('inputFeild').style.borderStyle='None';

}

function countItems(listID) {
    var ul = document.getElementById(listID);
    var itemCount = ul.getElementsByTagName('li').length;
    document.getElementById('taskCount').textContent = itemCount;
}

countItems('listItems')

const input = document.getElementById('inputField');
const listItems = document.getElementById('listItems');
function addTask(){

    if(input.value){
        let li = document.createElement("li");
        li.innerHTML=input.value;
        listItems.appendChild(li);


        let i = document.createElement("i");
        i.className = 'fa fa-trash';
        i.id = 'trash';
        i.ariaHidden = 'true';
        li.appendChild(i);

        let i2 = document.createElement("i");
        i2.className = 'fa fa-check';
        i2.id = 'done';
        i2.ariaHidden = 'true';
        li.appendChild(i2);

        countItems('listItems');
    }
    else{
        alert("You must write a task to add!");

    }
    input.value = '';
}


listItems.addEventListener('click', function (e){
    // if(e.target.tagName === 'LI' ){
    //     e.target.classList.toggle('checked');
    // }
    if(e.target.id === 'trash' ){
        e.target.parentElement.remove();
        countItems('listItems');
    }
    if(e.target.className === 'fa fa-check' ){
        e.target.parentElement.classList.toggle('checked');
    }

})

