const formEl = document.querySelector('form');
if (formEl) {
  formEl.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const loginInputEl = formEl.elements['login']
    const passwordFirstEl = formEl.elements['formPass1'];
    const passwordSecondEl = formEl.elements['formPass2'];
    const termsEl = formEl.elements['accept'];
    let errors = [];

    const isEmailVal = isEmail(loginInputEl, errors);
    const isPassVal = validatePass(passwordFirstEl, passwordSecondEl, errors);
    const isAcceptVal = isChecked(termsEl, errors);

    if (isEmailVal && isPassVal && isAcceptVal) {
      console.log('done')
    } else {
      errors.forEach(function (e) {
        e.previousElementSibling.style.color = 'red';
      });
    }
    errors = [];
  });
};

function isEmail(inputEl, arr) {
  const regEx = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

  if (regEx.test(inputEl.value)) {
    return true;
  } else {
    arr.push(inputEl);
    return false;
  };
};

function validatePass(passwordFirstEl, passwordSecondEl, arr) {
  if (passwordFirstEl.value === passwordSecondEl.value && passwordFirstEl.value.length >= 6 && passwordFirstEl.value.length > 0) {
    return true;
  } else {
    arr.push(passwordFirstEl);
    arr.push(passwordSecondEl);
    return false;
  };
};

function isChecked(checkInputEl, arr) {

  console.log(checkInputEl.value)
  if (checkInputEl.checked) {
    return true;
  } else {
    arr.push(checkInputEl);
    return false;
  };
};