const formEl = document.querySelector('form');

if (formEl) {
  formEl.addEventListener('submit', function (ev) {
    ev.preventDefault();
    let errors;
    handleValidation(errors);
  });
};

function handleValidation(errors) {
  errors = [];

  labelsColorReset();
  const loginInputEl = formEl.elements['login']
  const passwordFirstEl = formEl.elements['formPass1'];
  const passwordSecondEl = formEl.elements['formPass2'];
  const termsEl = formEl.elements['accept'];

  const isEmailVal = isEmail(loginInputEl.value);
  const isPassVal = validatePass(passwordFirstEl.value, passwordSecondEl.value, 6);
  const isAcceptVal = isBool(termsEl.checked);

  if (!isEmailVal) {
    errors.push(loginInputEl);
  };

  if (!isPassVal) {
    errors.push(passwordFirstEl);
    errors.push(passwordSecondEl);
  };

  if (!isAcceptVal) {
    errors.push(termsEl);
  };

  if (errors.length === 0) {
    console.log('done')
  } else {
    errors.forEach(function (e) {
      if (e.previousElementSibling) {
        e.previousElementSibling.style.color = 'red';
      }
    });
  };
};

function labelsColorReset() {
  Array.from(formEl.elements).forEach(function (e) {
    if (e.previousElementSibling) {
      e.previousElementSibling.style.color = 'black';
    }
  });
};

function isEmail(text) {
  const regEx = /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

  if (regEx.test(text)) {
    return true;
  } else {
    return false;
  };
};

function validatePass(pass1, pass2, length) {
  if (pass1 === pass2 && pass1.length >= length && pass1.length > 0) {
    return true;
  } else {
    return false;
  };
};

function isBool(checked) {
  if (checked) {
    return true;
  } else {
    return false;
  };
};