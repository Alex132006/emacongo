 // Navigation entre les sections
        document.addEventListener('DOMContentLoaded', function() {
            // Sélectionner tous les éléments de navigation
            const navItems = document.querySelectorAll('.nav-item');
            const sections = document.querySelectorAll('.section');

            // Fonction pour changer de section
            function showSection(sectionId) {
                // Masquer toutes les sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Retirer la classe active de tous les éléments de navigation
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Afficher la section correspondante
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Activer l'élément de navigation correspondant
                const targetNav = document.querySelector(`[id="nav-${sectionId.replace('section-', '')}"]`);
                if (targetNav) {
                    targetNav.classList.add('active');
                }
            }

            // Ajouter les écouteurs d'événements
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const sectionId = 'section-' + this.id.replace('nav-', '');
                    showSection(sectionId);
                });
            });

            // Afficher la section hôtel par défaut
            showSection('section-boutique');

            // Gestion des réservations hôtel
            document.querySelectorAll('.button').forEach(button => {
                button.addEventListener('click', function() {
                    const chambreType = this.parentElement.querySelector('p').textContent;
                    alert(`Réservation de la ${chambreType} en cours...\nFonctionnalité bientôt disponible !`);
                }); 
            });

            // Gestion des courses transport
            document.querySelectorAll('.btn').forEach(btn => {
                if (btn.textContent.includes('Commander') || btn.textContent.includes('Voir le cout')) {
                    btn.addEventListener('click', function() {
                        const depart = document.getElementById('user-depart').value;
                        const arrivee = document.getElementById('user-arrivee').value;
                        
                        if (!depart || !arrivee) {
                            alert('Veuillez remplir les champs de destination');
                            return;
                        }
                        
                        alert(`Course de ${depart} à ${arrivee}\nFonctionnalité bientôt disponible !`);
                    });
                }
            });

            // Gestion du changement de mode de paiement
            document.querySelector('.changer').addEventListener('click', function() {
                alert('Fonctionnalité de changement de paiement bientôt disponible !');
            });

            // Gestion des choix de course
            document.querySelectorAll('.choix').forEach(choix => {
                choix.addEventListener('click', function() {
                    // Retirer la sélection précédente
                    document.querySelectorAll('.choix').forEach(c => {
                        c.style.background = 'rgba(255, 255, 255, 0.8)';
                        c.style.border = 'none';
                    });
                    
                    // Sélectionner le nouveau choix
                    this.style.background = 'rgba(0, 128, 0, 0.1)';
                    this.style.border = '2px solid rgb(0, 128, 0)';
                    
                    const typeCourse = this.querySelector('h4').textContent;
                    const prix = this.querySelector('p').textContent;
                    document.querySelector('.montant-precis').value = `${typeCourse} - ${prix}`;
                });
            });
        });