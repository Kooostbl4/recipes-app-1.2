class API {
  constructor() {
    this.endpoint = `https://643ec1616c30feced8325a9e.mockapi.io`;
  }

  //get all inforamtion from API
  async get() {
    let response = await fetch(this.endpoint + "/recipes");
    let data = await response.json();
    return data;
  }

  //add data to API
  async create(data) {
    if (data != ``) {
      let response = await fetch(this.endpoint + "/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return response.json();
    }
  }

  //delete data from API by id
  async delete(id) {
    let response = await fetch(this.endpoint + `/recipes/${id}`, {
      method: "DELETE",
    });

    await response.json();
  }

  //edit data in API by id and new data
  async edit(id, data) {
    let response = await fetch(this.endpoint + `/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        ingredients: data.ingredients,
        method: data.method
      }),
    });

    await response.json();
  }
}

//create API
let recipesApi = new API();