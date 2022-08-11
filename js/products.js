let quantity;

// Loading the product Array of local storage
// Coming from productController.js


const loadProductsFromLocalStorage = () => {
  const storageItems = localStorage.getItem("products")
  if (storageItems) {
      const items = JSON.parse(storageItems)
      return items;
      //TODO load the items into the local items structure (this.items)           
  }
}

let listProductDiv = document.getElementById('list-products');

// Function that add a new items to the list in HTML structure.
// used split to mitigate fake path in local storage

if(loadProductsFromLocalStorage() != null){
  loadProductsFromLocalStorage().forEach(element => {
    let newCardHTML = ` 
  <div class=" col-sm-12 col-md-6 col-lg-4 card" style="width: 18rem;" id="${element.id}">
  <img src="/assets/${element.img.split('\\')[2]}" class="card-img-top" alt="...">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${element.name}</li>
    <li class="list-group-item">$${element.price} per pound</li>
  </ul>
  <div class="input-group mb-3">
    <input type="number" max="10" min="0" class="form-control" placeholder="Quantity" aria-label="Quantity" aria-describedby="button-addon1">
    <button class=" btn btn-warning" type="button" id="button-addon1">Add</button>
</div>
  </div>
  `;
  // add cards without removing the old cards
    listProductDiv.innerHTML += newCardHTML;
})
}
;


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
let items = await loadProductsFromDatabaseRequest();

items.forEach(element => {

  let newCardHTML = ` 
  <div class=" col-sm-12 col-md-6 col-lg-4 card" style="width: 18rem;">
  <img src="/assets/${element.imageUrl.split('\\')[2]}" class="card-img-top" alt="...">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${element.name}</li>
    <li class="list-group-item">$${element.price} per pound</li>
  </ul>
  <div class="input-group mb-3">
    <input name="quantity" type="number" max="10" min="1" class="form-control" placeholder="Quantity" aria-label="Quantity" aria-describedby="button-addon1" >
    <button class="addToCartButtons" class="btn btn-warning" type="button" id="${element.id}">Add</button>

</div>
  </div>
  `;
  // add cards without removing the old cards
    listProductDiv.innerHTML += newCardHTML;

  });
  
}

// Add to cart functions
let addToCartRequest = async () => {
  let response = await fetch(url,

    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
      });
  if(!response.ok){
      throw new Error(`There is an error with status ${response.status}`)
  }
  // let itemsJson = response.json();
  // console.log(itemsJson);
  // return itemsJson;
}
const addToCart = async(itemId)=>{
let userId=JSON.parse(localStorage.getItem('user'));
  url= `http://localhost:8080/api/cart/add?item_id=${itemId}&user_id=${userId}&quantity=${quantity}`;
  let cartItems = await addToCartRequest();
}

//Event listener for the page loading products from database
window.addEventListener('load', loadProductsFromDatabase);


//Event listener for the addToCart
document.addEventListener('click', function(e)
{
   if(e.target.className == "addToCartButtons"){
    let itemId=e.target.id;
        addToCart(itemId);
        console.log(itemId);
   }
  });

  document.addEventListener('change' , function(e){
    if(e.target.className == "form-control"){
      quantity =e.target.value;
    }

  })
