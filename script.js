const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const proposalScreen = document.getElementById("proposal-screen");
const detailScreen = document.getElementById("detail-screen");
const calendarScreen = document.getElementById("calendar-screen");
const confirmBtn = document.getElementById("confirm-btn");

let selectedFood = "";
let selectedDate = "";
let selectedTime = "";

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    const safeX = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const safeY = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.left = safeX + "px";
    noButton.style.top = safeY + "px";
});

yesButton.addEventListener("click", function() {
    proposalScreen.style.display = "none";
    detailScreen.style.display = "block"; 
});

const foodCards = document.querySelectorAll(".food-card");
foodCards.forEach(box => {
    box.addEventListener("click", () => {
        selectedFood = box.querySelector("p").innerText;
        
        detailScreen.style.display = "none";
        calendarScreen.style.display = "block";
        
        generateCalendar();
    });
});

function checkAndShow() {
    if (selectedDate !== "" && selectedTime !== "") {
        confirmBtn.style.display = "block";
    }
}

function clearButtonSelection(buttonList) {
    buttonList.forEach(b => b.classList.remove("selected-time"));
}

function generateCalendar() {
    const dateArea = document.getElementById("date-options");
    dateArea.innerHTML = ""; 
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    for(let i = 0; i < 7; i++) {
        let today = new Date();
        today.setDate(today.getDate() + i); 
        
        let dayNo = today.getDate();
        let monthName = months[today.getMonth()];
        
        let button = document.createElement("button");
        button.className = "time-card date-btn";
        button.innerText = dayNo + " " + monthName;
        
        button.addEventListener("click", () => {
            selectedDate = button.innerText;
            const allDateButtons = document.querySelectorAll(".date-btn");
            clearButtonSelection(allDateButtons);
            button.classList.add("selected-time");
            
            checkAndShow();
        });
        
        dateArea.appendChild(button); 
    }
}

const timeButtons = document.querySelectorAll(".time-btn");
timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedTime = button.innerText;
        clearButtonSelection(timeButtons);
        button.classList.add("selected-time");
        
        checkAndShow();
    });
});

confirmBtn.addEventListener("click", () => {
    const phoneNumber = "905372548545"; 
    const subject = "Proposal Response! 💌";
    const message = `I saw your surprise! 💖 Our menu is ${selectedFood}, we are meeting on ${selectedDate} at ${selectedTime}, I'm looking forward to it with excitement!`;
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappLink = `https://wa.me/${905372548545}?text=${encodedSubject}&body=${encodedMessage}`;
    window.location.href = whatsappLink;
});
