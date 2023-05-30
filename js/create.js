//class for creating recipes
class CreateView {
  constructor() {
    // container
    this.container = document.querySelector(`.left-column`);

    //inputs
    this.name = this.container.querySelector(`#recipe-name`);
    this.ingredients = this.container.querySelector(`#recipe-ingredients`);
    this.method = this.container.querySelector(`#recipe-method`);
    //submit button
    this.button = this.container.querySelector(`#submit`);

    //click on submit button
    this.button.addEventListener("click", async () => {
      if (this.name.value != ``) {
        //add recipe to API
        let json = {
          name: this.name.value,
          ingredients: this.ingredients.value.split(", "), //.split(", ")
          method: this.method.value,
        };
        json = await recipesApi.create(json);
        //add new recipe to the list
        listView.add(json);
      }
    });
  } 
}
//create an area for creting recipes
let createView = new CreateView();
