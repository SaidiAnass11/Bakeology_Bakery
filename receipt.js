if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    myOrder()
}

function myOrder() {
    var orders = JSON.parse(window.localStorage.getItem('items'))
    var cartItems = document.getElementsByClassName('cart-items')[0]
    for (var i = 0; i < orders.length; i++) {
        var cartRow2 = document.createElement('div')
        cartRow2.classList.add('cart-row')
        var content = `
              <div class="cart-item cart-column" >
                  <img class="cart-item-image" src="${orders[i].imag}" width="100" height="100">
                  <span class="cart-item-title">${orders[i].name}</span>
              </div>
              <span class="cart-price cart-column">${orders[i].price}</span>
              <div class="cart-quantity cart-column">
                  <span>${orders[i].no}</span> <!--here-->
              </div> `
        cartRow2.innerHTML = content
        cartItems.append(cartRow2)
    }
}

