import { menuData } from "/data.js"

  
let cartItems = []
let menuElements = ``
  
 menuData.forEach(function(item){
            
            let ingredients = item.ingredients.join(", ")    
            
            menuElements += `<div class="menu-item" id=${item.id}>
                                <p class="menu-item-icon">${item.icon}</p>
                                <div class="menu-item-info">       
                                        <p class="menu-item-name">${item.name}</p>
                                        <p class="menu-item-ingredients">${ingredients}</p>
                                        <p class="menu-item-price">$${item.price}</p>
                                </div>
                                <button class="add-to-cart">+</button>
                            </div><hr>`
                            
    })
  
document.getElementById("menu").innerHTML = menuElements 
  
function render(){
      
    let cartElements = ``
    let sum = 0    
    
    cartItems.forEach(function(item, index){  
          
          sum += item.price 
          cartElements += `<div class="cart-item" id=${index}>
                                <p class="menu-item-name">${item.name}</p>
                                <button class="remove-from-cart">Remove</button>    
                                <p class="cart-item-price">${item.price}</p> 
                            </div>`
        })
        
    document.getElementById("cart").innerHTML = cartItems.length > 0 ?
                `<p class="menu-item-name" id="your-order">Your order</p> 
                <div class="container" id="cart-items">
                  ${cartElements}
                  <hr class="cart-hr">
                  <div class="container row">
                    <p class="menu-item-name">Sum</p>
                    <p class="cart-item-price" id="sum">${sum}</p>
                  </div>
                  <button class="complete-btn" id="complete-btn">Complete Your Order</button>
                 </div>
                 `
                :    
                `<p>Your cart is empty</p>`

}
 
// to add an event listener for buttons, there are two options
//   * selecting all buttons by classname and adding an event listener to each of them, which is //  costly
//   * or creating an eventlistener listening to the whole document, then finding targeted element based on parent element's id (this pattern is called "event delegation": https://javascript.info/event-delegation)
  
//   * if you try first option, it will select all buttons and return and HTMLcollection 
//   which is similar to an array but actually not an array, so you can't apply forEach() method
//   here is an article explaining behaviour:
//   - https://dev.to/jimajs/how-to-addeventlistener-to-a-list-of-html-elements-in-javascript-
//  
//   * therefore you need to convert HTMLcollection by Array.from(collection) or use destructuring like [...htmlCollection]
//         
    document.getElementById("main").addEventListener("click",function(e){
            if(e.target.className === "add-to-cart"){
                 cartItems.push(menuData[e.target.parentElement.id])
                 render()   
            } else if(e.target.className === "remove-from-cart"){
                 cartItems.pop(menuData[e.target.parentElement.id])
                 render()
            } else if(e.target.className === "complete-btn"){
                    document.getElementById("payment-modal").style.display = "block"
                    render()
            } else if(e.target.className === "pay-btn"){
                
                    let customer = document.getElementById("name").value
                       
                    document.getElementById("cart").innerHTML = `<p class="success-message">
                            Thanks ${customer}! Your order is on its way!</p>`
                    
                    document.getElementById("payment-modal").style.display = "none"
                    cartItems = []
            } 
          
    })

    
  render()

  
