/*(() => {
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
*/

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-order-popup-open]'),
    closeModalBtn: document.querySelector('[data-order-popup-close]'),
    modal: document.querySelector('[data-order-popup]'),
  };

  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
  }

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.modal.classList.contains('is-hidden')
      ? bodyScrollLock.enableBodyScroll(refs.openModalBtn)
      : bodyScrollLock.disableBodyScroll(refs.openModalBtn);
  }
})();
