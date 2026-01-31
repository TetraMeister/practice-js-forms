const form = document.forms[0];
const formElsArr = Array.from(form.elements);
form.setAttribute('novalidate', '');
const [nameInput, lastNameInput, streetInput, houseInput, flatInput, zipInput, cityInput, voivodeshipInput, submit] = formElsArr;
let errors = [];
const messagesEl = document.querySelector('.messages');


form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  resetErrors(messagesEl);
  validateForm(messagesEl);
});

function nameValidator(element) {
  const regEx = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/

  if (!element.value) {
    errors.push(`Wypełnij pole ${getInputName(formElsArr.indexOf(element))}!`);
    return false;
  } else {
    if (element.value[0] !== element.value[0].toUpperCase()) {
      errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} powinno rozpoczynać się od wielkiej litery!`);
      return false;
    } else {
      if (element.value.length <= 1) {
        errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} powinno zawierać więcej niż 1 literę!`)
        return false;
      } else {
        if (regEx.test(element.value)) {
          return true;
        } else {
          errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} zawiera niedozwolone znaki!`)
          return false;
        }
      }
    }
  }
};

function validateStreetName(element) {
  const regEx = /^[a-zA-Z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż'.]+( [a-zA-Z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż']+)?$/

  if (element.value) {
    if (isNaN(element.value[0])) {
      if (element.value[0] !== element.value[0].toUpperCase()) {
        errors.push(`Wartość w polu ${getInputName(formElsArr.indexOf(element))} nie może rozpoczynać się od małej litery!`);
        return false;
      } else {
        if (regEx.test(element.value) && element.value[0] !== "'" && element.value[0] !== ".") {
          return true;
        } else {
          errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} zawiera niedozwolone znaki!`);
          return false;
        }
      }
    } else {
      errors.push(`Wartość w polu ${getInputName(formElsArr.indexOf(element))} nie może rozpoczynać się od cyfry!`)
      return false;
    }
  } else {
    errors.push(`Wypełnij pole ${getInputName(formElsArr.indexOf(element))}!`)
    return false;
  };
}

function validateFlatAndBuilding(element) {
  if (element.value) {
    if (!isNaN(element.value)) {
      if (element.value <= 0 || element.value >= 10000) {
        errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} nie może zawierać wartości mniejszej lub równej zeru oraz większej niż 10000!`)
        return false;
      } else {
        return true;
      }
    } else {
      errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} nie może zawierać wartości nie będącej liczbą!`)
      return false;
    }
  } else {
    errors.push(`Wypełnij pole ${getInputName(formElsArr.indexOf(element))}!`)
    return false;
  }
}

function validateZip(element) {
  const regEx = /^[0-9]{2}-[0-9]{3}$/

  element.removeAttribute('pattern');

  if (element.value) {
    if (regEx.test(element.value)) {
      return true;
    } else {
      errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} zawiera niepoprawny format!`)
      return false;
    }
  } else {
    errors.push(`Wypełnij pole ${getInputName(formElsArr.indexOf(element))}!`)
    return false;
  }
};

function validateCityName(element) {
  const regEx = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż ]+$/

  if (element.value) {
    if (element.value[0] === " " || element.value[0] !== element.value[0].toUpperCase()) {
      errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} musi rozpoczynać się wielką literą!`)
      return false;
    } else {
      if (regEx.test(element.value)) {
        return true;
      } else {
        errors.push(`Pole ${getInputName(formElsArr.indexOf(element))} zawiera niedozwolone znaki!`)
        return false;
      }
    }
  } else {
    errors.push(`Wypełnij pole ${getInputName(formElsArr.indexOf(element))}!`)
    return false;
  }
};

function validateVoivodeship(element) {
  if (!element.value || element.value === "") {
    errors.push(`Wybierz opcję w polu ${getInputName(formElsArr.indexOf(element)).slice(0, 11)}!`)
    return false;
  } else {
    return true;
  }
};

function validateForm(ulEl) {

  nameValidator(nameInput);
  nameValidator(lastNameInput);
  validateStreetName(streetInput);
  validateFlatAndBuilding(houseInput);
  validateFlatAndBuilding(flatInput);
  validateZip(zipInput);
  validateCityName(cityInput);
  validateVoivodeship(voivodeshipInput);

  if (errors.length !== 0) {
    errors.forEach(function (e) {
      const newLi = document.createElement('li');
      newLi.textContent = e;
      ulEl.appendChild(newLi);
    });
  } else {
    alert('Formularz wysłany!')
  }
};

function getInputName(index) {
  const string = String(formElsArr[index].parentElement.textContent).replaceAll('\n', '').replaceAll(' ', '');


  if (string.includes('Numer')) {
    const newString = string.slice(0, 5) + " " + string.slice(5);
    return newString
  } else if (string.includes('Kod')) {
    const newString = string.slice(0, 3) + " " + string.slice(3);
    return newString
  } else {
    return string;
  }
};

function resetErrors(ulEl) {
  ulEl.innerHTML = "";
  errors = [];
};