// import the data file

import { menuArray } from './data.js'

window.scrollTo(0, 0)  // When page is reloaded through functions this refocuses view to the top

// Global Variables

    // Menu
const menuContentEl = document.getElementById("menu-content")

    // Cart
const cartHeaderEl = document.getElementById("cart_header")
const cartContentEl = document.getElementById("cart-content")
const cartTotalEl = document.getElementById("cart-totals")
const cartCompleteBtnEl = document.getElementById("cart-complete-btn")

    // Order Confirmation
const orderConfirmationEl = document.getElementById("order_confirmation")

// Create the Cart Array
const cartArray = []

// Initialize the Cart Total to zero
let cartTotalPrice = 0

// Initialize the Menu  then display it
rest()
renderMenu()

// Event Listeners

// When the add item button is clicked, add an item from the menu to the cart then render the cart
menuContentEl.addEventListener("click", function (e) {
    const menuItemId = (e.target.id)

    if (menuItemId == '') {

    } else if (menuItemId >= 0 && menuItemId < menuArray.length) {
        updateCartArray(menuItemId)
        renderCart(menuArray, menuItemId)
    }
})


// When the remove item button is clicked, subtract the selected item from the cart  then render the cart
cartContentEl.addEventListener("click", function (e) {
    const cartItemId = (e.target.id)
    if (cartItemId >= 0) {
        updateCartItemQty(cartItemId)
        renderCart(menuArray, cartItemId)
    }
})

// When the purchase button is clicked, display the Payment Modal
cartCompleteBtnEl.addEventListener("click", function (e) {
    displayPaymentModal()
})

function displayPaymentModal() {
    document.getElementById("payment_modal").style.display = "inline"
}

// Initialize the Menu
function rest() {
    menuContentEl.innerHTML = ""
}
// Render and display the Menu
function renderMenu() {
    for (let i = 0; i < menuArray.length; i++) {

        menuContentEl.innerHTML += `
        <div id="menu-item">
            <div  class="item-graphic">
                ${menuArray[i].emoji}
            </div>
            <div> <p class="item-title">
                ${menuArray[i].name}</p>
                <p class="item-description">
                ${menuArray[i].ingredients.join(", ")}</p>
                <p class="item-price">
                $${menuArray[i].price}</p>
            </div > 
                <div class="menu-add-item-to-cart" id="menu-add-item-to-cart">
                    <button  class="add-item-btn" id=${menuArray[i].id}>+</button>
                </div>
        </div>
            `
    }
}

// Update the Cart Array
function updateCartArray(itemId) {

    const cartLineItem = menuArray.filter(function (item) {
        return item.id == itemId
    })[0]


    cartLineItem.qty++

    cartLineItem.totalPrice = cartLineItem.qty * (cartLineItem.price * 0.9)

    cartArray.name = cartLineItem.name
    cartArray.price = cartLineItem.price
    cartArray.qty = cartLineItem.qty
    cartArray.totalPrice = cartLineItem.totalPrice
    cartArray.id = cartLineItem.id

    if (cartArray.includes(cartLineItem)) {
    } else {
        cartArray.push(cartLineItem)
    }

    cartTotalPrice += (cartLineItem.price * 0.9)
}

// Update the quantity of the selected Item
function updateCartItemQty(itemId) {
    const cartLineItem = cartArray.filter(function (item) {
        return item.id == itemId
    })[0]


    let index = cartArray.findIndex(item => { return item.id == itemId })

    cartLineItem.qty--
    if (cartLineItem.qty <= 0) {
        cartArray.splice(index, 1)
    } else {
        cartLineItem.totalPrice = cartLineItem.qty * (cartLineItem.price * 0.9)
    }

    cartArray.qty = cartLineItem.qty
    cartArray.totalPrice = cartLineItem.totalPrice

    cartTotalPrice -= (cartLineItem.price * 0.9)

    return cartTotalPrice

}

// Render and display the updated cart
function renderCart() {
    if (cartTotalPrice <= 0) {
        cartHeaderEl.innerHTML = ""
        cartContentEl.innerHTML = ""
        cartTotalEl.innerHTML = ""
        cartCompleteBtnEl.innerHTML = ""

    } else {

        let cartContentHtml = ""



        cartArray.forEach(function (item) {

            cartContentHtml += `
            <div class="cart-items">
                <div class="cart-item">
                    <p class="cart-item-name">${item.name}</p >
                    <button class="cart-remove-item-btn" id=${item.id}>remove</button>
                    <p class="cart-item-qty" id="cart-item-qty">Qty: ${item.qty}</p>
                    <p class="cart-item-price">$${item.totalPrice.toFixed(2)}</p>
                </div>

            </div>
            `
        })

        cartContentEl.innerHTML = cartContentHtml
        cartHeaderEl.innerHTML = `
        <h1 class="cart-title">Your Order</h1>
    `
        cartTotalEl.innerHTML = `
        <p class = "cart-total-price-text">Total Price</p>
         <p>with 10% discount</p>
        <p class = "cart-total-price">$${cartTotalPrice.toFixed(2) }</p>
    `
        cartCompleteBtnEl.innerHTML = `
        <button class = "purchase-btn" id = "purchase-btn">Complete Order</button>
        `
    }
}

// *********** The Payment Modal ********************

// Get the <span> element (the x button in the top right corner of the modal) that closes the modal
var span = document.getElementsByClassName("payment_close_btn")[0];

// Get the <span> element that submits the payment and closes the modal
var span = document.getElementsByClassName("payment_close_btn")[0];

// Get the <button> element that submits the payment and closes the modal
var submitBtn = document.getElementsByClassName("payment_submit_btn")[0];

// When the user clicks on <span> (x), close the modal without submitting the payment
span.onclick = function () {
    payment_modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it without submitting the payment
window.onclick = function (event) {
    if (event.target == payment_modal) {
        payment_modal.style.display = "none"
    }
}

// When the user clicks on <button> (Pay), close the modal and displays the Order Confirmation and Thank You message for a few seconds, then display the Ratings Section

submitBtn.onclick = function (submit, event) {

    if (payment_card_name.value === "") {
        alert("Enter your Name")
    } else if (payment_card_number.value === "") {
        alert("Enter your card number")
    } else if (payment_card_cvv.value === "") {
        alert("Enter your card's CVV")
    } else {
        payment_modal.style.display = "none"
        cart.style.display = "none"
        // location.reload()
        displayOrderConfirmation()
        setTimeout(displayRating, 3000)

    }
}

function displayOrderConfirmation() {
    orderConfirmationEl.classList.remove('hidden')
    orderConfirmationEl.innerHTML = `
    <div>
        Thanks for your order. It is being prepared now. We'll text you as soon as it's ready.<br><br><br>
    </div>`
}

function displayRating() {
    orderConfirmationEl.style.display = 'none'
    document.getElementById("rating_modal").style.display = "inline"
}

// Get the <span> element (the x button in the top right corner of the modal) that closes the modal
var cancelRatingBtn = document.getElementsByClassName("cancel_rating_modal")[0];

cancelRatingBtn.onclick = function () {
    rating_modal.style.display = "none"
    location.reload(true)
}

// When the user clicks anywhere outside of the modal, close it without submitting the rating
window.onclick = function (event) {
    if (event.target == rating_modal) {
        rating_modal.style.display = "none"
        location.reload(true)
    }
}

// Get the <button> element that submits the rating and closes the modal
var submitBtn = document.getElementsByClassName("rating_submit_btn")[0];

// When the user clicks on <span> (x), close the modal without submitting the rating
submitBtn.onclick = function () {
    rating_modal.style.display = "none"
    location.reload(true)
}