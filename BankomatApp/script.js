// Användardata
var users = [
    { name: "Användare 1", username: "user1", password: "pass1", balance: 1000 },
    { name: "Användare 2", username: "user2", password: "pass2", balance: 1000 }
];

var currentUser = null;

// Funktion för att logga in
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var user = users.find(function(u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        currentUser = user;
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("balance").textContent = "Saldo: " + user.balance + " kr";
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
    } else {
        showMessage("Felaktigt användarnamn eller lösenord", "error");
    }
}

// Funktion för att visa saldo
function showBalance() {
    if (currentUser) {
        showMessage("Saldo: " + currentUser.balance + " kr", "success");
    } else {
        showMessage("Du måste logga in först", "error");
    }
}

// Funktion för att göra en insättning
function deposit() {
    if (currentUser) {
        var amount = parseFloat(prompt("Ange belopp att sätta in:"));
        if (isNaN(amount) || amount <= 0) {
            showMessage("Felaktigt belopp", "error");
        } else {
            currentUser.balance += Math.floor(amount);
            showMessage("Insättning lyckades. Saldo: " + currentUser.balance + " kr", "success");
        }
    } else {
        showMessage("Du måste logga in först", "error");
    }
}

// Funktion för att göra ett uttag
function withdraw() {
    if (currentUser) {
        var amount = parseFloat(prompt("Ange belopp att ta ut:"));
        if (isNaN(amount) || amount <= 0) {
            showMessage("Felaktigt belopp", "error");
        } else if (amount > currentUser.balance) {
            showMessage("Otillräckligt saldo", "error");
        } else {
            currentUser.balance -= Math.floor(amount);
            showMessage("Uttag lyckades. Saldo: " + currentUser.balance + " kr", "success");
        }
    } else {
        showMessage("Du måste logga in först", "error");
    }
}

// Funktion för att logga ut
function logout() {
    currentUser = null;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("main-screen").style.display = "none";
}

// Hjälpfunktion för att visa meddelanden
function showMessage(message, type) {
    var element = document.createElement("p");
    element.textContent = message;

    if (type === "error") {
        element.style.color = "red";
    } else if (type === "success") {
        element.style.color = "green";
    }

    document.body.appendChild(element);
    setTimeout(function() {
        document.body.removeChild(element);
    }, 3000);
}
