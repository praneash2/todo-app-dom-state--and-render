const addTodoBtn=document.querySelector('.add-todo-btn');
const todoInput=document.querySelector('.todo-input');
const todosWrapper=document.querySelector('.todos-wrapper');

let updatebtns;
let deletebtns;

let updateFlag=-1;
let updateTodoNumber=-1;

let todos=[
    {
        task:"get up"
    },
    {
        task:"go to gym"
    }
];

const addTodo=()=>{
    todos.push({
        task:todoInput.value
    })
    render();
    
}

const loadUpdateValueInInput=()=>{
    todoInput.value=todos[updateTodoNumber]?.task;
    updateFlag=1;
}

const updateTodo=()=>{
    for(let i=0;i<todos.length;i++){
        if(updateTodoNumber!=-1 && i==updateTodoNumber){
            todos[i].task=todoInput.value;
        }
    }
    
    render();
    updateTodoNumber=-1;
    updateFlag=-1;
}

const addClickListenerUpdate=(elements)=>{   
    for(let element of elements){
        element.addEventListener('click',()=>{
            updateTodoNumber=element.getAttribute('name');
            updateFlag==1;
            loadUpdateValueInInput();
        });
    }
}

const addClickListenerDelete=(elements)=>{
    for(let element of elements){
        element.addEventListener('click',()=>{
            let todonumber=element.getAttribute('name');
            let newTodos=[];
            for(let todoind=0;todoind<todos.length;todoind++){
                if(todoind!=todonumber){
                    newTodos.push(todos[todoind]);
                }
            }
            todos=newTodos;
            render();
        });
    }
    
}

const render=()=>{
    todosWrapper.innerHTML="";
    const todoFragment = document.createDocumentFragment();
    let todoEle;
    let updateBtn;
    let deleteBtn;
    for(let todo=0;todo<todos.length;todo++){
        todoEle=document.createElement('div');
        todoEle.setAttribute('class','todo');
        todoEle.setAttribute('name',todo);
        todoEle.innerText=todos[todo]?.task;
        

        updateBtn=document.createElement('button');
        updateBtn.setAttribute('class','update');
        updateBtn.setAttribute('name',todo);
        updateBtn.innerText="edit";

        deleteBtn=document.createElement('button');
        deleteBtn.setAttribute('class','delete');
        deleteBtn.setAttribute('name',todo);
        deleteBtn.innerText="delete";

        const wrapper=document.createElement('div');
        wrapper.setAttribute('class','wrapper');

        wrapper.appendChild(updateBtn);
        wrapper.appendChild(deleteBtn);
        
        todoEle.appendChild(wrapper);
 
        todoFragment.appendChild(todoEle);
    }
    todosWrapper.append(todoFragment);
    updatebtns=document.querySelectorAll('.update');
    addClickListenerUpdate(updatebtns);

    deletebtns=document.querySelectorAll('.delete');
    addClickListenerDelete(deletebtns);
}

render();

addTodoBtn.addEventListener('click',()=>{
    if(todoInput.value==""){
        alert("enter something");
    }
    else{
        if(updateFlag==-1){
        
            addTodo();
            todoInput.value="";
        }
        else{
            updateTodo();
            todoInput.value="";
        }
    }
    
});