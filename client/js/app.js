function addTodo(content) {
  if(content !== '') {
    $('ul').append('<li>' + content + '</li>');
  }
}

function onButtonClick(event) {
  event.preventDefault();

  var button = $(event.target);
  var input = button.siblings('input');

  addTodo(input.val());
  input.val('');
}

function onEnterPress(event) {
  if(event.key !== 'Enter') {
    return;
  }

  var input = $(event.target);

  addTodo(input.val());

  input.val('');
}

function onFormSubmit(event) {
  var input = $(event.target.elements.content);

  addTodo(input.val());

  input.val('');
}

function onDoneTodo(event) {
  $(this).toggleClass('done');
}

function onDOMReady(event) {
  $('button').on('click', onButtonClick);
  $('input').on('keypress', onEnterPress);
  $('form').on('submit', onFormSubmit);
  $('ul').on('click', 'li', onDoneTodo);
}

$(onDOMReady);
