document.addEventListener('DOMContentLoaded', init);


function init() {
  const formEl = document.querySelector('form');
  const ulEl = document.querySelector('.messages');

  if (formEl) {
    formEl.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    const errors = [];

    const fields = [
      { name: 'firstName', label: 'Imię', required: true },
      { name: 'lastName', label: 'Nazwisko', required: true },
      { name: 'street', label: 'Ulica', required: true },
      { name: 'houseNumber', label: 'Numer budynku', type: 'number', required: true, },
      { name: 'flatNumber', label: 'Numer mieszkania', type: 'number' },
      { name: 'zip', label: 'Kod pocztowy', pattern: '^[0-9]{2}-[0-9]{3}$', required: true, },
      { name: 'city', label: 'Miasto', required: true },
      { name: 'voivodeship', label: 'Województwo', required: true }
    ];

    fields.forEach(function (field) {
      const value = formEl.elements[field.name].value;

      if (field.required) {
        if (value.length === 0) {
          errors.push(`Dane w polu ${field.label} są wymagane!`)
        }
      };

      if (field.type === 'number') {
        if (Number.isNaN(Number(value))) {
          errors.push(`Dane w polu ${field.label} muszą być liczbą!`)
        }
      };

      if (field.pattern) {
        const regEx = new RegExp(field.pattern);
        if (!regEx.test(value)) {
          errors.push(`Dane w polu ${field.label} zawierają niedozwolone znaki lub nie są zgodne z wymaganym formatem!`)
        }
      };
    });

    ulEl.innerHTML = '';

    if (errors.length === 0) {
      alert('Dane zostały wypełnione prawidłowo!');
      fields.forEach(function (e) {
        formEl.elements[e.name].value = '';
      });
    } else {
      errors.forEach(function (text) {
        const liEl = document.createElement('li');
        liEl.innerText = text;
        ulEl.appendChild(liEl);
      });
    };
  };
};