// index.js
let todos = {};
(function () {
    const container = document.getElementById('todos--app');
    let module = null;

    const addTodo = document.getElementById('todos--nav-item-add');
    addTodo.addEventListener('click', (event) => {
  	event.preventDefault();
    todos.navigate('add');
  });

    const listTodos = document.getElementById('todos--nav-item-list');
    listTodos.addEventListener('click', (event) => {
  	event.preventDefault();
    todos.navigate('list');
  });

    todos.navigate = function (page) {
  	if (typeof page !== 'string') {
    	page = 'add';
        }
        if (module) {
    	module.destroy();
        }
        module = todos[page];
        module.init(container);

        sessionStorage.setItem('currentPage', page);
    };

    todos.startup = function () {
  	const currentPage = sessionStorage.getItem('currentPage');
        todos.navigate(currentPage);
    };
}());

// service.js
(function () {
    let list;
    try {
        list = JSON.parse(sessionStorage.getItem('todos'));
    } catch (e) {
    // whoopsee... something went terribly wrong!
    }

    if (!list) {
  	list = [];
    }

    todos.service = {
  	list() {
    	return list;
    },
        save() {
      sessionStorage.setItem('todos', JSON.stringify(list));
    },
        add(name) {
    	let todo = {
      	// this is an unsafe way of generating IDs, but it will do for demo purposes
    		id: Math.floor(Math.random() * 10000),
        name: name,
        completed: false
      };
    	list.push(todo);
      this.save();
    },
        get(id) {
    	for (let i = 0; i < list.length; i++) {
      	let todo = list[i];
      	if (id === todo.id) {
        	return todo;
        }
      }
    },
        update(id, completed) {
    	let item = this.get(id);
      if (!item) {
      	return;
      }
      item.completed = completed;
      this.save();
    },
    };
}());

// list.js
(function () {
    let elements;

    const renderItem = function (item) {
  	return `<label>
    		<input id="${item.id}" class="todos--list-item" type="checkbox" ${item.completed ? 'checked' : ''}/> ${item.name}
      </label>`;
    };

    const render = function (container) {
  	const list = todos.service.list();
        container.innerHTML = `<ul>
    ${list.reduce((markup, todo) => `${markup  }<li>${  renderItem(todo)  }</li>`, '')}
    </ul>`;
    };

    const onTodoChange = function (event) {
        const id = +this.id;
        todos.service.update(id, this.checked);
    };

    const setupEvents = function (container) {
        for (let i = 0; i < elements.length; i++) {
    	const element = elements[i];
            element.addEventListener('change', onTodoChange);
        }
    };

    const removeEvents = function () {
        for (let i = 0; i < elements.length; i++) {
    	const element = elements[i];
            element.removeEventListener('change', onTodoChange);
        }
    };

    todos.list = {
        init(container) {
    	render(container);
      
  		elements = container.querySelectorAll('.todos--list-item');
      
      setupEvents();
    },
        destroy() {
    	removeEvents();
      
      elements = undefined;
    },
    };
}());

// add.js
(function () {
    let form, 
input;

    const render = function (container) {
        container.innerHTML = `<form id="todos--add">
    	<input name="name" class="todos--todo-name" placeholder="Remember to..." />
      <button type="submit">Save</button>
    </form>`;
    };

    const onTodoSubmit = function (event) {
  	event.preventDefault();
        todos.service.add(input.value);
        todos.navigate('list');
    };

    const setupEvents = function (container) {
        form.addEventListener('submit', onTodoSubmit);
    };

    const removeEvents = function () {
        form.removeEventListener('submit', onTodoSubmit);
    };

    todos.add = {
        init(container) {
    	render(container);
      
      form = container.querySelector('#todos--add');
      input = form.querySelector('.todos--todo-name');
      
      setupEvents();
    },
        destroy() {
    	removeEvents();
      
    	form = undefined;
      input = undefined;
    },
    };
}());

todos.startup();