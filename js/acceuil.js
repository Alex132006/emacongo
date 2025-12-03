// Données initiales
const hotelsData = [
  {
    id: 1,
    name: "EMA Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["restaurant", "pool", "parking", "wifi"],
    price: "45.000 FCFA",
  },
  {
    id: 2,
    name: "Christella Hotel",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
    amenities: ["restaurant", "wifi"],
    price: "35.000 FCFA",
  },
  {
    id: 3,
    name: "Radison Hotel",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ["restaurant", "pool", "parking", "wifi", "tv"],
    price: "55.000 FCFA",
  },
  {
    id: 4,
    name: "Atlantic Hotel",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["restaurant", "pool", "wifi"],
    price: "40.000 FCFA",
  },
  {
    id: 5,
    name: "Palace Hotel",
    image:
      "https://i.pinimg.com/736x/32/d2/ad/32d2ad1b5b1beeb7c161ee07289dee3b.jpg",
    amenities: ["restaurant", "wifi", "desktop"],
    price: "50.000 FCFA",
  },
  {
    id: 6,
    name: "Hôtel Paradis",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
    amenities: ["restaurant", "wifi", "spa"],
    price: "60.000 FCFA",
  },
];

const categoriesData = [
  {
    id: "electronique",
    name: "Électronique",
    icon: "📱",
    image: "../images/electronique.jpeg",
    link: "electronique.html",
  },
  {
    id: "automobile",
    name: "Automobile",
    icon: "🚗",
    image: "../images/voiture.jpeg",
    link: "automobile.html",
  },
  {
    id: "habits",
    name: "Habits",
    icon: "👕",
    image: "../images/habitfrond.jpg",
    link: "habits.html",
  },
  {
    id: "meuble",
    name: "Meuble",
    icon: "🛋️",
    image: "../images/meublefrond.jpg",
    link: "meuble.html",
  },
  {
    id: "quincaillerie",
    name: "Quincaillerie",
    icon: "🔧",
    image: "../images/quincailleriefront.jpg",
    link: "quincaillerie.html",
  },
  {
    id: "cosmetique",
    name: "Cosmétique & Beauté",
    icon: "💄",
    image: "../images/Cosmétique & Beauté.jpg",
    link: "Cosmétique.html",
  },
];

const rideOptions = [
  {
    type: "Economie",
    icon: "fa-taxi",
    price: 500,
    description: "Voiture standard",
  },
  {
    type: "Confort",
    icon: "fa-car",
    price: 750,
    description: "Voiture confort",
  },
  {
    type: "Ultime",
    icon: "fa-car-side",
    price: 1000,
    description: "Voiture premium",
  },
  { type: "Moto", icon: "fa-motorcycle", price: 300, description: "Moto taxi" },
];

// Fonctions utilitaires
function showLoading() {
  document.getElementById("loading").classList.add("active");
}

function hideLoading() {
  document.getElementById("loading").classList.remove("active");
}

function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("notification-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("notification-modal").style.display = "none";
}

function notifyComingSoon() {
  showModal(
    "Merci pour votre intérêt ! Nous vous notifierons dès que ce service sera disponible."
  );
}

// Initialisation des hôtels
function initializeHotels() {
  const container = document.getElementById("hotels-container");
  container.innerHTML = "";

  hotelsData.forEach((hotel) => {
    const hotelElement = document.createElement("div");
    hotelElement.className = "mini-container";
    hotelElement.innerHTML = `
                    <img src="${hotel.image}" class="img" alt="${hotel.name}">
                    <p>${hotel.name}</p>
                    <div class="icone-h">
                        ${
                          hotel.amenities.includes("restaurant")
                            ? '<i class="fa-solid fa-utensils"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("pool")
                            ? '<i class="fa-solid fa-person-swimming"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("parking")
                            ? '<i class="fa-solid fa-square-parking"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("wifi")
                            ? '<i class="fa-solid fa-wifi"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("tv")
                            ? '<i class="fa-solid fa-tv"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("spa")
                            ? '<i class="fa-solid fa-spa"></i>'
                            : ""
                        }
                        ${
                          hotel.amenities.includes("desktop")
                            ? '<i class="fa-solid fa-desktop"></i>'
                            : ""
                        }
                    </div>
                    <p style="color: #43a638; font-weight: bold; font-size: 18px;">${
                      hotel.price
                    }</p>
                    <button class="button" onclick="bookHotel(${
                      hotel.id
                    })">Réserver</button>
                `;
    container.appendChild(hotelElement);
  });
}

// Initialisation des boutiques
function initializeBoutiques() {
  const container = document.getElementById("boutique-container");
  container.innerHTML = "";

  categoriesData.forEach((category) => {
    const categoryElement = document.createElement("a");
    categoryElement.href = category.link;
    categoryElement.innerHTML = `
                    <div class="mini-container">
                        <img src="${category.image}" class="img" alt="${category.name}">
                        <p>${category.icon} ${category.name}</p>
                    </div>
                `;
    container.appendChild(categoryElement);
  });
}

// Gestion des réservations d'hôtel
function bookHotel(hotelId) {
  const hotel = hotelsData.find((h) => h.id === hotelId);
  showModal(`Réservation de ${hotel.name} pour ${hotel.price}`);
}

// Gestion du transport
function initializeTransport() {
  const calculateBtn = document.getElementById("calculate-price");
  const rideOptionsContainer = document.getElementById("ride-options");

  calculateBtn.addEventListener("click", function () {
    const depart = document.getElementById("user-depart").value;
    const arrivee = document.getElementById("user-arrivee").value;

    if (!depart || !arrivee) {
      showModal("Veuillez saisir les adresses de départ et d'arrivée.");
      return;
    }

    // Afficher les options
    rideOptionsContainer.innerHTML = "";
    rideOptions.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.className = "choix";
      optionElement.innerHTML = `
                        <div class="type">
                            <h4>${option.type}</h4>
                            <p>${option.price} FCFA</p>
                            <small style="color: #666;">${option.description}</small>
                        </div>
                        <div class="icone">
                            <i class="fa-solid ${option.icon}"></i>
                        </div>
                    `;
      optionElement.addEventListener("click", () => selectRide(option));
      rideOptionsContainer.appendChild(optionElement);
    });

    document.getElementById("price-result").style.display = "block";
  });
}

function selectRide(option) {
  document.getElementById("amount").value = `${option.price} FCFA`;
  document.getElementById("payment-section").style.display = "block";

  // Supprimer la sélection précédente
  document.querySelectorAll(".choix").forEach((el) => {
    el.style.borderColor = "#e0e0e0";
    el.style.background = "white";
  });

  // Mettre en surbrillance la sélection actuelle
  const selected = event.currentTarget;
  selected.style.borderColor = "#43a638";
  selected.style.background = "rgba(67, 166, 56, 0.05)";
}

// Gestion de la navigation
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section");

      // Mettre à jour la navigation
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // Mettre à jour les sections
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === `section-${sectionId}`) {
          section.classList.add("active");
        }
      });

      // Charger le contenu si nécessaire
      if (sectionId === "hotel") {
        initializeHotels();
      } else if (sectionId === "boutique") {
        initializeBoutiques();
      } else if (sectionId === "transport") {
        initializeTransport();
      } else if (sectionId === "profil") {
        loadProfileContent();
      }
    });
  });
}

// Charger le contenu du profil
// function loadProfileContent() {
//     const authContainer = document.querySelector('#section-profil .auth-container');
//     authContainer.innerHTML = `
//         <!-- Formulaire de Connexion -->
//         <div class="form-container login-form" id="loginFormContainer">
//             <h2>Connexion</h2>
//             <form id="loginForm">
//                 <!-- Sélection du type de connexion -->
//                 <div class="user-type-container">
//                     <div class="user-type-title">Type de compte</div>
//                     <div class="user-type-selection">
//                         <div class="user-type-option selected" data-type="buyer">
//                             <div class="user-type-icon">👤</div>
//                             <div class="user-type-label">Acheteur</div>
//                         </div>
//                         <div class="user-type-option" data-type="seller">
//                             <div class="user-type-icon">🏪</div>
//                             <div class="user-type-label">Vendeur</div>
//                         </div>
//                     </div>
//                 </div>
//                 <input type="hidden" id="loginUserType" name="loginUserType" value="buyer" required>
//                 <span class="error-message" id="loginUserTypeError"></span>

//                 <div class="input-group">
//                     <label for="loginEmail">Email</label>
//                     <input type="email" id="loginEmail" placeholder="Votre email" required>
//                     <span class="error-message" id="loginEmailError"></span>
//                 </div>
//                 <div class="input-group">
//                     <label for="loginPassword">Mot de passe</label>
//                     <input type="password" id="loginPassword" placeholder="Votre mot de passe" required>
//                     <span class="error-message" id="loginPasswordError"></span>
//                 </div>
//                 <div class="options">
//                     <label class="remember">
//                         <input type="checkbox" id="rememberMe">
//                         Se souvenir de moi
//                     </label>
//                     <a href="#" class="forgot-password">Mot de passe oublié ?</a>
//                 </div>
//                 <button type="submit" class="btn-primary">Se connecter</button>
//             </form>
//             <p class="switch-form">
//                 Pas de compte ? <a href="#" id="showRegister">S'inscrire</a>
//             </p>
//         </div>

//         <!-- Formulaire d'Inscription -->
//         <div class="form-container register-form hidden" id="registerFormContainer">
//             <h2>Inscription</h2>
//             <form id="registerForm">
//                 <!-- Sélection du type d'utilisateur -->
//                 <div class="user-type-container">
//                     <div class="user-type-title">Type de compte</div>
//                     <div class="user-type-selection">
//                         <div class="user-type-option selected" data-type="buyer">
//                             <div class="user-type-icon">👤</div>
//                             <div class="user-type-label">Acheteur</div>
//                         </div>
//                         <div class="user-type-option" data-type="seller">
//                             <div class="user-type-icon">🏪</div>
//                             <div class="user-type-label">Vendeur</div>
//                         </div>
//                     </div>
//                 </div>
//                 <input type="hidden" id="userType" name="userType" value="buyer" required>
//                 <span class="error-message" id="userTypeError"></span>

//                 <!-- Informations de base -->
//                 <div class="basic-info-container">
//                     <div class="basic-info-title">Informations personnelles</div>
//                     <div class="input-group">
//                         <label for="registerName">Nom complet</label>
//                         <input type="text" id="registerName" placeholder="Votre nom complet" required>
//                         <span class="error-message" id="registerNameError"></span>
//                     </div>
//                     <div class="input-group">
//                         <label for="registerEmail">Email</label>
//                         <input type="email" id="registerEmail" placeholder="Votre email" required>
//                         <span class="error-message" id="registerEmailError"></span>
//                     </div>
//                 </div>

//                 <!-- Mot de passe -->
//                 <div class="password-container">
//                     <div class="password-title">Sécurité du compte</div>
//                     <div class="input-group">
//                         <label for="registerPassword">Mot de passe</label>
//                         <input type="password" id="registerPassword" placeholder="Créez un mot de passe" required>
//                         <span class="error-message" id="registerPasswordError"></span>
//                         <div class="password-strength" id="passwordStrength"></div>
//                     </div>
//                     <div class="input-group">
//                         <label for="registerConfirmPassword">Confirmer le mot de passe</label>
//                         <input type="password" id="registerConfirmPassword" placeholder="Confirmez votre mot de passe" required>
//                         <span class="error-message" id="registerConfirmPasswordError"></span>
//                     </div>
//                 </div>

//                 <!-- Conditions -->
//                 <div class="terms-container">
//                     <div class="terms-title">Conditions d'utilisation</div>
//                     <div class="terms">
//                         <label>
//                             <input type="checkbox" id="acceptTerms" required>
//                             J'accepte les conditions d'utilisation et la politique de confidentialité
//                         </label>
//                         <span class="error-message" id="termsError"></span>
//                     </div>
//                 </div>

//                 <button type="submit" class="btn-primary">Créer mon compte</button>
//             </form>
//             <p class="switch-form">
//                 Déjà un compte ? <a href="#" id="showLogin">Se connecter</a>
//             </p>
//         </div>
//     `;
// }

// Initialisation de l'application
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser les composants
  initializeHotels();
  initializeBoutiques();
  initializeTransport();
  initializeNavigation();

  // Confirmation de commande
  document
    .getElementById("confirm-order")
    ?.addEventListener("click", function () {
      const amount = document.getElementById("amount").value;
      if (amount) {
        showModal(
          `Commande confirmée pour ${amount}. Votre chauffeur arrive dans 5 minutes !`
        );
      }
    });

  // Gestion du changement de paiement
  document
    .getElementById("change-payment")
    ?.addEventListener("click", function () {
      showModal("Sélectionnez votre mode de paiement préféré");
    });

  // Cacher le chargement
  hideLoading();
});

// Gestion du scroll pour améliorer l'UX
window.addEventListener("scroll", function () {
  const header = document.querySelector(".container-categorie");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});
