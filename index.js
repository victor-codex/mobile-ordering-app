import { menuArray } from "./data.js"

let cartArray = []
const cardForm = document.getElementById("card-form")

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItem(e.target.dataset.add)
  }
  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove)
  }
  if (e.target.id == "complete-btn") {
    displayModal()
  }
  if (e.target.id !== "modal") {
    closeModal()
  }
})

document.getElementById("modal").addEventListener("click", function (e) {
  e.stopImmediatePropagation()
})

// Submit Form event

cardForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const boxText = document.getElementById("box")
  cartArray = []
  let cartHidden = document.getElementById("cart-hidden")
  cartHidden.classList.add("hidden")
  const cardFormData = new FormData(cardForm)

  const cardName = cardFormData.get("name")

  boxText.classList.remove("hidden")

  boxText.innerHTML = `<div class="msg-box container">
  <span class="msg">Thanks, ${cardName}! Your order is on its way!</span>
</div>`

  closeModal()
})

function closeModal() {
  document.getElementById("modal").style.display = "none"
}

function displayModal() {
  setTimeout(() => {
    document.getElementById("modal").style.display = "block"
  }, 1000)
}

function addItem(itemId) {
  document.getElementById("box").classList.add("hidden")
  const cartObj = menuArray.filter(function (menu) {
    return menu.id == itemId
  })[0]
  if (!cartArray.includes(cartObj)) {
    cartArray.push(cartObj)
  }
  renderCartHtml()
}

function removeItem(itemId) {
  let cartHidden = document.getElementById("cart-hidden")
  const cartObj = cartArray.filter(function (menu) {
    return menu.id == itemId
  })[0]

  const index = cartArray.findIndex((element) => element == cartObj)

  cartArray.splice(index, 1)

  if (cartArray.length == 0) {
    cartHidden.classList.add("hidden")
  }
  renderCartHtml()
}

function getTotalPrice() {
  let total = 0
  cartArray.forEach(function (cart) {
    total += cart.price
  })
  return total
}

function renderCartHtml() {
  let carts = document.getElementById("carts")
  let totalPrice = document.getElementById("product-price")
  let cartHidden = document.getElementById("cart-hidden")
  let cartHtml = ""
  if (cartArray.length > 0) {
    cartArray.forEach(function (cart) {
      cartHidden.classList.remove("hidden")
      totalPrice.innerHTML = `$${getTotalPrice()}`
      cartHtml += ` <div class="cart">
      <div class="product-content">
        <div>
          <h3 class="product-name">${cart.name}</h3>
        </div>
        <div>
          <span class="remove" data-remove="${cart.id}">remove</span>
        </div>
      </div>
      <span class="product-price">$${cart.price}</span>
    </div>`
    })
    carts.innerHTML = cartHtml
  }
}

function getProductHtml() {
  let productHtml = ``
  menuArray.forEach((menu) => {
    productHtml += `<div class="underline">
    <div class="product">
      <div class="product-content">
        <div class="emoji-img">
          <span class="emoji-img">${menu.emoji}</span>
        </div>
        <div class="product-detail">
          <h3 class="product-name">${menu.name}</h3>
          <p class="small">${menu.ingredients}</p>
          <span class="product-price">$${menu.price}</span>
        </div>
      </div>
      <i class="fa-sharp fa-solid fa-circle-plus"data-add="${menu.id}"></i>
    </div>
    </div>
    `
  })
  return productHtml
}

function renderProductHtml() {
  const products = document.getElementById("products")
  products.innerHTML = getProductHtml()
}

renderProductHtml()
