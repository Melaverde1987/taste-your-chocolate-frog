(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-popup-open]'),
    closeModalBtn: document.querySelector('[data-modal-popup-close]'),
    modal: document.querySelector('[data-modal-popup]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
