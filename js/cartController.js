let cartRows= document.getElementById('cartRows');
let subtotal= document.getElementById('subtotal');
let itemsInYourCart= document.getElementById("itemsInYourCart")
let total=0 ;
let url;
let cartId;

const loadCartRequest = async()=>{
let response = await fetch(url);
if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
    let itemsJson = response.json();
    return itemsJson;
}

const loadCart  = async ()=>{
url = "http://localhost:8080/api/cart"
let cartItems = await loadCartRequest();
itemsInYourCart.innerHTML=cartItems.length;
console.log(cartItems)
cartItems.forEach(element =>{ 
    newInnerHTML=
                    ` 
       <td data-th="Product">
            <div class="row" >
                <div class="col-md-3 text-left">
                    <img
                        src="/assets/${element.item.imageUrl.split('\\')[2]}"
                        alt=""
                        class="img-fluid d-none d-md-block rounded mb-2 shadow"/>
                </div>
                <div class="col-md-9 text-left mt-sm-2">
                    <h4>${element.item.name}</h4>
                    <!-- <p class="font-weight-light">Brand &amp; Name</p> -->
                </div>
            </div>
        </td>
        <td data-th="Price">${element.item.price}</td>
        <td data-th="Quantity">
            <input
            type="number"
            class="form-control form-control-lg text-center"
            value="${element.quantity}"/>
        </td>
        <td class="actions" data-th="">
            <div class="text-right">
                <button class="deleteCartItem" class="btn btn-white border-secondary bg-white btn-md mb-2" id="${element.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </td>

`
cartRows.innerHTML += newInnerHTML;
total += (element.item.price)+(element.quantity) ;
subtotal.innerHTML = total.toFixed(2);
})
}

let deleteCartItemRequest = async () => {
    let response = await fetch(url,
      {method: 'DELETE'});
      location.reload();
      if(!response.ok){
        throw new Error(`There is an error with status ${response.status}`)
    }
  };


const deleteCartItem = async () => {
    url=`http://localhost:8080/api/cart/${cartId}`;
    let deleteCart = await deleteCartItemRequest();
    
}


window.addEventListener('load', loadCart);
document.addEventListener('click', function(e){
    if (e.target.className == "deleteCartItem"){
        cartId=e.target.id;
        deleteCartItem(cartId);
    }
})