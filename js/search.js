let searchInput = document.querySelector(`.search`);


searchInput.addEventListener('input', async () => {
  listView.render(searchInput.value);
});