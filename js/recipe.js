

//class for viewing the recipe info
class RecipeView {
  constructor(data = []) {
    this.container = document.querySelector(`.recipe-view`);
    this.name = this.container.querySelector(`.view-name`);
    this.ingredients = this.container.querySelector(`.view-ingr-ul`);
    this.method = this.container.querySelector(`.view-method`);
    this.deleteButton = this.container.querySelector(`.view-delete`);
    this.listEdit = document.querySelector('.list-edit');
    this.data = data;
  }

  render(
    data = { //default data
      name: "name",
      ingredients: "ingredients",
      method: "method",
      id: 1,
    }
  ) {
    //rendering the recipe info
    this.data = data;
    this.name.innerHTML = `${this.data.name}`;
    this.ingredients.innerHTML = ``;
    for (let i = 0; i < this.data.ingredients.length; i++) {
      this.ingredients.innerHTML += `<li class="ingr-li">${this.data.ingredients[i]}</li>`
    }
    this.method.innerHTML = `${this.data.method}`;
    this.listEdit.innerHTML = ``;
  }
}

//create a card
let recipeView = new RecipeView();
