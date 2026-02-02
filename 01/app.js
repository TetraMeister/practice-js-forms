const formEl = document.querySelector('form');
if (formEl) {
  formEl.addEventListener('submit', function (ev) {
    ev.preventDefault();

    let userFirstNameInput = ev.target.elements.firstName.value
    let userLastNameInput = ev.target.elements.lastName.value;

    if (userFirstNameInput && userLastNameInput) {
      if (/[0-9]/.test(userFirstNameInput) || /[0-9]/.test(userFirstNameInput)) {
        alert('Wprowadzono niedozwolone znaki!')
      } else {
        userFirstNameInput = fromCapitalLetter(userFirstNameInput);
        userLastNameInput = fromCapitalLetter(userLastNameInput);
        appendUl(userFirstNameInput, userLastNameInput);
        ev.target.elements.firstName.value = "";
        ev.target.elements.lastName.value = "";
      }
    } else {
      alert('Najpierw prowadź dane do formularza. Wszystkie pola muszą być wypełnione!')
    };
  });
};

function appendUl(userFirstNameInput, userLastNameInput) {
  const liEl = document.createElement('li');
  const ulEl = document.querySelector('.users-list')

  liEl.textContent = userFirstNameInput + " " + userLastNameInput;
  liEl.classList.add('users-list__person');
  ulEl.appendChild(liEl);
};

function fromCapitalLetter(text) {
  const firstLetter = text[0].toUpperCase();
  const restLetters = text.substring(1);

  text = firstLetter + restLetters;

  return text;
};