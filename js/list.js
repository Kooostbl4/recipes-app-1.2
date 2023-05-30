let deleteButton = document.querySelector(`.view-delete`);
let editButton = document.querySelector(`.view-edit`);
let viewCard = document.querySelector(`.recipe-view`);

//class of the list of recipes
class ListView {

  constructor() {
    this.container = document.querySelector(`.right-column`);
    this.list = this.container.querySelector(`#recipe-list`);
  }

  //render one recipe, considering the search
  async render(search = ``) {
    //nothing in search
    if (search == ``) {
      this.list.innerHTML = ``;
      let data = await recipesApi.get();
      for (let i = 0; i < data.length; i++) {
        this.add(data[i]);
      }
    } else { //something in search
      let data = await recipesApi.get();
      this.list.innerHTML = ``;
      for (let i = 0; i < data.length; i++) {
        //search check
        if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
          this.add(data[i]);
        }
      }
    }
  }

  //add a new recipe to API
  add(data) {
    //recipe body
    let item = document.createElement("div");
    item.classList.add(`card`);
    item.classList.add(`mb-2`);
    item.innerHTML = `<div class="card-body">
                        ${data.name}
                      </div>`;
    this.list.append(item);
    item.classList.add(`${data.name}`);
    //

    //click on recipe
    item.addEventListener("click", function () {
      editButton.classList.remove(`invisible`);
      recipeView.render(data);
      viewCard.classList.remove(`invisible`);

      //click on delete button
      deleteButton.addEventListener(`click`, async () => {
        await recipesApi.delete(data.id);
        item.remove();
        viewCard.classList.add(`invisible`);
      });

      //click on edit button
      editButton.addEventListener(`click`, async () => {

        //rendering edit area
        editButton.classList.add(`invisible`);
        let editList = document.querySelector(`.list-edit`);
        editList.innerHTML = ``;
        let name = document.querySelector(`.view-name`).textContent;
        let ingredients = document.querySelector(`.view-ingr`).textContent;
        let ingredientsList = document.querySelectorAll(`.ingr-li`);
        let method = document.querySelector(`.view-method`).textContent;
        let nameEdit = document.createElement(`input`);
        let ingredientsEdit = document.createElement(`input`);
        let methodEdit = document.createElement(`input`);

        let valueForIngr = ``;
        for (let i = 0; i < ingredientsList.length; i++) {
          valueForIngr += ingredientsList[i].textContent;
          if (i != ingredientsList.length - 1) {
            valueForIngr += `, `;
          }
        }
        nameEdit.value = name;
        ingredientsEdit.value = valueForIngr;
        methodEdit.value = method;
        nameEdit.classList.add(`edit-input`);
        ingredientsEdit.classList.add(`edit-input`);
        methodEdit.classList.add(`edit-input`);
        editList.append(nameEdit);
        editList.append(ingredientsEdit);
        editList.append(methodEdit);
        nameEdit.focus();
        
        //edit accept button
        let editAccept = document.createElement(`button`);
        editAccept.classList.add(`edit-accept-button`);
        editAccept.textContent = `accept`;
        editList.append(editAccept);
        
        //click on accept button
        editAccept.addEventListener(`click`, async () => {
          let newData = {
            name: nameEdit.value,
            ingredients: ingredientsEdit.value.split(", "), //.split(", ")
            method: methodEdit.value,
          };
          //changing info in API
          await recipesApi.edit(data.id, newData);
          listView.render();
          editList.innerHTML = ``;
          viewCard.classList.add(`invisible`);
        });
      });
    });
  }
}

//create a list and render it
let listView = new ListView();
listView.render();