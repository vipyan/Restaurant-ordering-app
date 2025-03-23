import menuArray from "./data.js";
let totalPrice = 0;
let isFirstOrder = true;
let itemInList = 0;
const modal = document.getElementById("modal")
const overlay = document.getElementById("overlay");
const orderCard = document.getElementById("order-card");
const totalPriceContainer = document.getElementById("total-price");


menuArray.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                    <img src="./images/${item.image}" class="logo" alt="pizza logo">
                    <div class="content">
                        <h3>${item.name}</h3>
                        <p class="fade-color">${item.ingredients}</p>
                        <p>$${item.price}</p>

                    </div>  
                    <button class="plus"
                     id="plus"
                     >
                        <i class="fa-solid fa-plus" data-id="${item.id}" ></i>    
                    </button>
    `
    document.getElementById("main").appendChild(card);
}
);



document.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        
        addOrder(e.target.dataset.id);
    }
    if(e.target.dataset.removeId){
        removeOrder(e);
    }
    if (e.target.id == "order-button") {
        modal.classList.add('visible');
        overlay.classList.add('visible');
    }
    if (e.target.id == "pay") {
        const name = document.getElementById("name").value;
        const cardNumber = document.getElementById("card-number").value;
        const cvv = document.getElementById("cvv").value;
        if (name && cardNumber && cvv) { 
            e.preventDefault();
            modal.classList.remove('visible');
            overlay.classList.remove('visible');
            orderCard.innerHTML = "";
            totalPriceContainer.innerHTML = "";
            totalPrice = 0;
            itemInList = 0;
            isFirstOrder = true;
            document.getElementById("purchased-message").innerHTML = `
            <p class="All-the-best">Thanks ${name}! Your order is on its way!</p>
            `
        }
        else {
            alert("Please fill in all fields");
        }
        console.log("Order placed,pay clicked",name, cardNumber, cvv);
    }

   
});


function addOrder(id) {
    
    
    const order = menuArray.find(item => item.id == id);

    itemInList ++;
   

    totalPrice += order.price;
    
    isFirstOrder = false;
    orderCard.innerHTML += `
    
        ${isFirstOrder ? `<h2 class="order-title">Your Order:</h2>` : ""}
    
        <div class="order-item">
                                <h3>${order.name}</h3>
                                <button data-remove-id="${order.id}" class="remove-btn" >remove</button>
                                <p class="push">$${order.price}</p>  
        </div>
                            
    
   
    
    `
    
    renderTotalPrice(totalPrice);
}

function renderTotalPrice(price) {
    
    if (itemInList > 0) {
        totalPriceContainer.innerHTML = `
            
            <div class='final-total-container'>
                <p class='final-total'>Total</p>
                <p class='final-total-price push'>$${price}</p>
            </div>
            <button id="order-button" class='final-total-btn'>Place order</button>
        `;
    } else {
        // Clear the container or show zero total
        totalPriceContainer.innerHTML = "";
    }
}

function removeOrder(e) { 
    
    itemInList --;
    // Find the order item that was clicked
    const orderItem = e.target.closest('.order-item');
    const order = menuArray.find(item => item.id == e.target.dataset.removeId);
    if (orderItem) {
        // Remove the order item from the DOM
        totalPrice -= order.price;
        orderItem.remove();
       
        renderTotalPrice(totalPrice);
        
       
    }
    
   
    
}