let listProductTable = document.querySelector('tbody');
let allProductButton= document.getElementById("allProducts");
let addProductButton = document.getElementById("addProductButton");
let addForm = document.getElementById("addProductForm");
let closeAdd= document.getElementById("closeAdd");

let editProductButton = document.getElementById("editProductButton");
let editForm = document.getElementById("editProductForm");
let closeEdit= document.getElementById("closeEdit");


let deleteProductButton=document.getElementById("deleteProductButton");
let deleteForm = document.getElementById("deleteProductForm");
let closeDelete= document.getElementById("closeDelete");

let url;

// Loading the product list from the database

// Get All items
const loadProductsFromDatabaseRequest = async () => {
    let response = await fetch(url);
    // if the response is bad
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let itemsJson = response.json();
    return itemsJson;
}


const loadProductsFromDatabase = async () => {
    url = "http://localhost:8080/api/item";
    listProductTable.innerHTML = "";
let items = await loadProductsFromDatabaseRequest();

items.forEach(item => {

        let newrowHTML = ` 
              <tr>
              <th scope="row" id="${item.id}">${item.id}</th>
                      <td>${item.name}</td>
                      <td>
                      <div class="col-md-3">
                      <img
                      src="/assets/${item.imageUrl.split('\\')[2]}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow" /></td>
                      </div>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      </tr>
            `;
            // add cards without removing the old cards
            listProductTable.innerHTML += newrowHTML;

    });
    
}

    //add a product
  
const addProcuctToDatabaseRequest = async (name, quantity, imageUrl, price) => {
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                "name": name,
                "quantity": quantity,
                "imageUrl": imageUrl,
                "price": price
            }),
                });
        // if the response is bad
        if(!response.ok){
            throw new Error(`There is an error with status ${response.status}`)
        }
        let itemsJson = response.json();
        return itemsJson;
    }
    
const addProcuctToDatabase = async (event) =>{
    event.preventDefault();
    url="http://localhost:8080/api/item/add";
    let item = await addProcuctToDatabaseRequest(addForm.productName.value, addForm.quantity.value, addForm.productImage.value, addForm.price.value);
        let newrowHTML = ` 
              <tr>
              <th scope="row">${item.id}</th>
                      <td>${item.name}</td>
                      <td>
                      <div class="col-md-3">
                      <img
                      src="/assets/${item.imageUrl.split('\\')[2]}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow" /></td>
                      </div>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      </tr>
            `;
            listProductTable.innerHTML += newrowHTML;
//                       <td><input class="btn btn-danger" type="button" value="Delete Product"></td>

}
// edit product
const editProductFromDataBaseRequest = async (id, name, quantity, imageUrl, price) => {
    let response = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "id": id,
            "name": name,
            "quantity": quantity,
            "imageUrl": imageUrl,
            "price": price
        }),
            });
    // if the response is bad
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let itemsJson = response.json();
    return itemsJson;
}

const editProductFromDataBase = async(event)=>{
    event.preventDefault();
    url=`http://localhost:8080/api/item/update/${editForm.id.value}`;
    let item  = await editProductFromDataBaseRequest(editForm.id.value,editForm.productName.value, editForm.quantity.value, editForm.productImage.value, editForm.price.value);
    let itemRow=document.getElementById(`${item.id}`);
    itemRow.innerHTML="";
    itemRow.innerHTML = ` 
              <tr>
              <th scope="row">${item.id}</th>
                      <td>${item.name}</td>
                      <td>
                      <div class="col-md-3">
                      <img
                      src="/assets/${item.imageUrl.split('\\')[2]}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow" /></td>
                      </div>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      </tr>
            `;
}


// delete product
const deleteProductFromDataBaseRequest = async () => {
    let response = await fetch(url,
        {
            method: 'DELETE',
        });
    if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let itemsJson = response.json();
    return itemsJson;
}

const deleteProduct = async(event)=>{
    event.preventDefault();
    url=`http://localhost:8080/api/item/${deleteForm.id.value}`;
    let item  = await deleteProductFromDataBaseRequest();
    location.reload();
    
}



allProductButton.addEventListener('click', loadProductsFromDatabase);
addProductButton.addEventListener('click', addProcuctToDatabase);
editProductButton.addEventListener('click', editProductFromDataBase);
deleteProductButton.addEventListener('click', deleteProduct);

closeAdd.addEventListener('click', loadProductsFromDatabase);
closeEdit.addEventListener('click', loadProductsFromDatabase);
closeDelete.addEventListener('click', loadProductsFromDatabase);
