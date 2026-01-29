const inputEl = document.querySelector('input');

if (inputEl) {
  inputEl.addEventListener('change', createNewEl);
};


function createNewEl(ev) {
  const fileList = Array.from(ev.target.files);

  fileList.forEach(function (e) {
    try {
      const prototypeEl = document.querySelector('.images-list__item--prototype');
      const cloneEl = prototypeEl.cloneNode(true);
      const imageListEl = prototypeEl.parentElement;
      const prototypeNameEl = cloneEl.firstElementChild;
      const prototypeSizeEl = cloneEl.lastElementChild;
      const prototypeSrcEl = prototypeNameEl.nextElementSibling;
      readFile(e, function (srcValue) {
        prototypeSrcEl.setAttribute('src', srcValue);
      });

      cloneEl.classList.remove('images-list__item--prototype');

      prototypeNameEl.textContent = e.name;
      prototypeSizeEl.textContent = (e.size / (1024 * 1024)).toFixed(2) + ' MB';

      imageListEl.appendChild(cloneEl);

    } catch (error) {
      alert(error.message);
    };
  });
};

function readFile(e, callback) {
  if (e && e.type.includes('image')) {
    const reader = new FileReader();

    reader.onload = function (readerEvent) {
      callback(readerEvent.target.result);
    };

    reader.readAsDataURL(e);

  } else {
    throw new Error('Failed to read the files!')
  };
};