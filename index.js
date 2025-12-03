// Redirection automatique après 4 secondes
setTimeout(function () {
  // Simuler la fin du chargement
  document.querySelector(".loading-text").innerHTML = "bienvenue !";
  document.querySelector(".subtext").innerHTML =
    "Redirection vers l'application...";

  // Arrêter l'animation
  document.querySelector(".titre").style.animation = "none";

  // Redirection après 1 seconde supplémentaire
  setTimeout(function () {
    // Dans ton cas réel, tu mettras ta vraie page ici
    window.location.href = "../html/acceuil.html";

    // Pour la démo, on affiche juste un message
    // alert('Redirection vers la page principale...');

    // Code réel à utiliser :
    window.location.href = "../html/acceuil.html";
  }, 1000);
}, 4000);

// Effet de clic pour accélérer
document.querySelector(".container").addEventListener("click", function () {
  document.querySelector(".loading-text").innerHTML = "ACCÉLÉRATION...";
  document.querySelector(".subtext").innerHTML = "Chargement rapide activé";

  // Accélérer l'animation
  document.querySelector(".titre").style.animationDuration = "0.5s";

  // Rediriger immédiatement
  setTimeout(function () {
    window.location.href = "../thml/acceuil.html";
    alert("Chargement accéléré ! Redirection...");
  }, 500);
});
