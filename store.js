let items = [];

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItem = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i]
        button.addEventListener('click', RemoveCartItem)
    }
    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    addToCartFunc()
}

function addToCartFunc() {
    const addToCartButton = document.getElementsByClassName('addButton');
    for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener('click', function(e) {
            if (typeof(Storage) !== 'undefined') {
                let item = {
                    id: i + 1,
                    name: e.target.parentElement.parentElement.children[1].innerText,
                    price: e.target.parentElement.children[0].innerText,
                    no: 1,
                    imag: e.target.parentElement.parentElement.children[0].src
                };
                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                } else {
                    const localItems = JSON.parse(localStorage.getItem('items'));
                    localItems.map(data => {
                        if (item.id == data.id) {
                            item.no = data.no + 1;
                            console.log(item);
                        } else {
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items', JSON.stringify(items));
                    window.location.reload();
                }
            } else {
                alert('not working');
            }
        });
    }
}

function RemoveCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var orders = JSON.parse(window.localStorage.getItem('items'))
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}