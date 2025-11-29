// Catégories de produits disponibles
        const productCategories = [
            { id: 'electronique', name: 'Électronique', icon: '📱' },
            { id: 'automobile', name: 'Automobile', icon: '🚗' },
            { id: 'habits', name: 'Habits', icon: '👕' },
            { id: 'meuble', name: 'Meuble', icon: '🛋️' },
            { id: 'quincaillerie', name: 'Quincaillerie', icon: '🔧' },
            { id: 'cosmetique', name: 'Cosmétique & Beauté', icon: '💄' },
            { id: 'divertissement', name: 'Divertissement', icon: '🎮' }
        ];

        // Méthodes de paiement disponibles
        const paymentMethods = [
            { id: 'mtn_money', name: 'MTN Money', icon: '📱' },
            { id: 'airtel_money', name: 'Airtel Money', icon: '💳' },
            { id: 'carte_bancaire', name: 'Carte Bancaire', icon: '💳' },
            { id: 'especes', name: 'Payer en Espèces', icon: '💰' }
        ];

        // Données simulées des utilisateurs
        const users = {
            'acheteur@example.com': {
                password: 'password123',
                name: 'Jean Acheteur',
                userType: 'buyer'
            },
            'vendeur@example.com': {
                password: 'password123',
                name: 'Marie Vendeuse',
                userType: 'seller',
                storeName: 'Boutique Marie',
                phone: '+33 1 23 45 67 89',
                address: '123 Rue du Commerce, Paris',
                category: 'electronique',
                paymentMethods: ['mtn_money', 'carte_bancaire']
            }
        };

        // Variables pour stocker les sélections
        let selectedCategory = null;
        let selectedPaymentMethods = [];

        // Initialisation des catégories
        function initializeCategories() {
            const categoriesGrid = document.getElementById('categoriesGrid');
            categoriesGrid.innerHTML = '';

            productCategories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category-option';
                categoryElement.setAttribute('data-category', category.id);
                categoryElement.innerHTML = `
                    <span class="category-icon">${category.icon}</span>
                    <span class="category-label">${category.name}</span>
                `;
                
                categoryElement.addEventListener('click', () => {
                    selectCategory(category.id);
                });
                
                categoriesGrid.appendChild(categoryElement);
            });
        }

        // Initialisation des méthodes de paiement
        function initializePaymentMethods() {
            const paymentGrid = document.getElementById('paymentGrid');
            paymentGrid.innerHTML = '';

            paymentMethods.forEach(payment => {
                const paymentElement = document.createElement('div');
                paymentElement.className = 'payment-option';
                paymentElement.setAttribute('data-payment', payment.id);
                paymentElement.innerHTML = `
                    <span class="payment-icon">${payment.icon}</span>
                    <span class="payment-label">${payment.name}</span>
                `;
                
                paymentElement.addEventListener('click', () => {
                    togglePaymentMethod(payment.id);
                });
                
                paymentGrid.appendChild(paymentElement);
            });
        }

        // Sélectionner une catégorie (une seule possible)
        function selectCategory(categoryId) {
            // Désélectionner toutes les catégories
            document.querySelectorAll('.category-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Sélectionner la nouvelle catégorie
            const categoryElement = document.querySelector(`[data-category="${categoryId}"]`);
            categoryElement.classList.add('selected');
            
            selectedCategory = categoryId;
            updateSelectedCategoryDisplay();
        }

        // Mettre à jour l'affichage de la catégorie sélectionnée
        function updateSelectedCategoryDisplay() {
            const selectedCategoryContainer = document.getElementById('selectedCategory');
            
            if (selectedCategory) {
                const category = productCategories.find(cat => cat.id === selectedCategory);
                selectedCategoryContainer.innerHTML = `
                    <div class="selected-category-tag">
                        ${category.icon} ${category.name}
                    </div>
                `;
            } else {
                selectedCategoryContainer.innerHTML = '<em>Aucune catégorie sélectionnée</em>';
            }
        }

        // Basculer une méthode de paiement
        function togglePaymentMethod(paymentId) {
            const paymentElement = document.querySelector(`[data-payment="${paymentId}"]`);
            const payment = paymentMethods.find(p => p.id === paymentId);
            
            if (selectedPaymentMethods.includes(paymentId)) {
                // Retirer la méthode
                selectedPaymentMethods = selectedPaymentMethods.filter(id => id !== paymentId);
                paymentElement.classList.remove('selected');
            } else {
                // Ajouter la méthode
                selectedPaymentMethods.push(paymentId);
                paymentElement.classList.add('selected');
            }
            
            updateSelectedPaymentsDisplay();
        }

        // Mettre à jour l'affichage des méthodes de paiement sélectionnées
        function updateSelectedPaymentsDisplay() {
            const selectedPaymentsContainer = document.getElementById('selectedPayments');
            selectedPaymentsContainer.innerHTML = '';

            selectedPaymentMethods.forEach(paymentId => {
                const payment = paymentMethods.find(p => p.id === paymentId);
                const tag = document.createElement('div');
                tag.className = 'payment-tag';
                tag.innerHTML = `
                    ${payment.icon} ${payment.name}
                    <button class="remove-payment" onclick="removePaymentMethod('${paymentId}')">×</button>
                `;
                selectedPaymentsContainer.appendChild(tag);
            });
        }

        // Retirer une méthode de paiement
        function removePaymentMethod(paymentId) {
            selectedPaymentMethods = selectedPaymentMethods.filter(id => id !== paymentId);
            const paymentElement = document.querySelector(`[data-payment="${paymentId}"]`);
            if (paymentElement) {
                paymentElement.classList.remove('selected');
            }
            updateSelectedPaymentsDisplay();
        }

        // Gestion du basculement entre les formulaires
        document.getElementById('showRegister').addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterForm();
        });

        document.getElementById('showLogin').addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });

        // Gestion de la sélection du type d'utilisateur pour l'inscription
        const userTypeOptions = document.querySelectorAll('#registerFormContainer .user-type-option');
        const userTypeInput = document.getElementById('userType');
        const sellerContainer = document.getElementById('sellerContainer');
        const categoriesContainer = document.getElementById('categoriesContainer');
        const paymentContainer = document.getElementById('paymentContainer');
        const buyerLimitation = document.getElementById('buyerLimitation');

        userTypeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Retirer la sélection précédente
                userTypeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Ajouter la sélection actuelle
                this.classList.add('selected');
                
                // Mettre à jour la valeur cachée
                const selectedType = this.getAttribute('data-type');
                userTypeInput.value = selectedType;
                
                // Afficher/masquer les champs vendeur
                if (selectedType === 'seller') {
                    sellerContainer.classList.add('visible');
                    categoriesContainer.classList.add('visible');
                    paymentContainer.classList.add('visible');
                    buyerLimitation.style.display = 'none';
                    
                    // Rendre les champs vendeur obligatoires
                    document.getElementById('storeName').required = true;
                    document.getElementById('phone').required = true;
                    document.getElementById('address').required = true;
                } else {
                    sellerContainer.classList.remove('visible');
                    categoriesContainer.classList.remove('visible');
                    paymentContainer.classList.remove('visible');
                    buyerLimitation.style.display = 'block';
                    
                    // Rendre les champs vendeur optionnels
                    document.getElementById('storeName').required = false;
                    document.getElementById('phone').required = false;
                    document.getElementById('address').required = false;
                    
                    // Réinitialiser les sélections
                    selectedCategory = null;
                    selectedPaymentMethods = [];
                    updateSelectedCategoryDisplay();
                    updateSelectedPaymentsDisplay();
                }
            });
        });

        // Gestion de la sélection du type de connexion
        const loginTypeOptions = document.querySelectorAll('#loginFormContainer .user-type-option');
        const loginUserTypeInput = document.getElementById('loginUserType');

        loginTypeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Retirer la sélection précédente
                loginTypeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Ajouter la sélection actuelle
                this.classList.add('selected');
                
                // Mettre à jour la valeur cachée
                const selectedType = this.getAttribute('data-type');
                loginUserTypeInput.value = selectedType;
            });
        });

        // Sélectionner "Acheteur" par défaut pour les deux formulaires
        document.querySelector('#registerFormContainer .user-type-option[data-type="buyer"]').classList.add('selected');
        document.querySelector('#loginFormContainer .user-type-option[data-type="buyer"]').classList.add('selected');

        function showRegisterForm() {
            document.getElementById('loginFormContainer').classList.add('hidden');
            document.getElementById('registerFormContainer').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            // Réinitialiser les erreurs
            clearErrors();
            // Réinitialiser les sélections
            selectedCategory = null;
            selectedPaymentMethods = [];
            updateSelectedCategoryDisplay();
            updateSelectedPaymentsDisplay();
        }

        function showLoginForm() {
            document.getElementById('registerFormContainer').classList.add('hidden');
            document.getElementById('loginFormContainer').classList.remove('hidden');
            document.getElementById('dashboard').classList.add('hidden');
            // Réinitialiser les erreurs
            clearErrors();
        }

        function showDashboard(userData) {
            document.getElementById('loginFormContainer').classList.add('hidden');
            document.getElementById('registerFormContainer').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            
            // Mettre à jour les informations du dashboard
            document.getElementById('userEmail').textContent = userData.email;
            document.getElementById('userName').textContent = userData.name;
            document.getElementById('userAccountType').textContent = userData.userType === 'seller' ? 'Vendeur' : 'Acheteur';
            
            // Mettre à jour le titre du dashboard
            const dashboardTitle = document.getElementById('dashboardTitle');
            if (userData.userType === 'seller') {
                dashboardTitle.textContent = 'Tableau de Bord Vendeur';
                document.getElementById('userStoreName').textContent = userData.storeName;
                document.getElementById('userPhone').textContent = userData.phone;
                
                // Afficher la catégorie
                if (userData.category) {
                    const category = productCategories.find(c => c.id === userData.category);
                    document.getElementById('userCategory').textContent = category ? category.name : userData.category;
                } else {
                    document.getElementById('userCategory').textContent = 'Aucune catégorie sélectionnée';
                }
                
                // Afficher les méthodes de paiement
                if (userData.paymentMethods && userData.paymentMethods.length > 0) {
                    const paymentNames = userData.paymentMethods.map(paymentId => {
                        const payment = paymentMethods.find(p => p.id === paymentId);
                        return payment ? payment.name : paymentId;
                    }).join(', ');
                    document.getElementById('userPayments').textContent = paymentNames;
                } else {
                    document.getElementById('userPayments').textContent = 'Aucune méthode sélectionnée';
                }
                
                document.getElementById('sellerInfo').classList.remove('hidden');
                document.getElementById('buyerInfo').classList.add('hidden');
            } else {
                dashboardTitle.textContent = 'Tableau de Bord Acheteur';
                document.getElementById('sellerInfo').classList.add('hidden');
                document.getElementById('buyerInfo').classList.remove('hidden');
            }
        }

        // Validation du formulaire de connexion
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                const userType = loginUserTypeInput.value;
                
                // Simulation de vérification des identifiants
                if (users[email] && users[email].password === password) {
                    const userData = users[email];
                    
                    // Vérifier si le type de compte correspond
                    if (userData.userType !== userType) {
                        alert(`Erreur: Cet email est enregistré comme ${userData.userType === 'seller' ? 'vendeur' : 'acheteur'}, mais vous essayez de vous connecter comme ${userType === 'seller' ? 'vendeur' : 'acheteur'}`);
                        return;
                    }
                    
                    // Connexion réussie
                    showDashboard({
                        email: email,
                        name: userData.name,
                        userType: userData.userType,
                        storeName: userData.storeName,
                        phone: userData.phone,
                        category: userData.category,
                        paymentMethods: userData.paymentMethods
                    });
                } else {
                    alert('Email ou mot de passe incorrect');
                }
            }
        });

        // Validation du formulaire d'inscription
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                // Récupération des données
                const userData = getFormData();
                
                // Vérifier si l'email existe déjà (simulation)
                if (users[userData.email]) {
                    alert('Cet email est déjà utilisé');
                    return;
                }
                
                // Enregistrer l'utilisateur (en simulation)
                users[userData.email] = {
                    password: userData.password,
                    name: userData.name,
                    userType: userData.userType,
                    storeName: userData.storeName,
                    phone: userData.phone,
                    address: userData.address,
                    category: userData.category,
                    paymentMethods: userData.paymentMethods
                };
                
                // Simulation d'inscription réussie
                const message = `Inscription réussie! Bienvenue ${userData.name}!\n\n` +
                               `Type: ${userData.userType === 'seller' ? 'Vendeur' : 'Acheteur'}\n` +
                               `Email: ${userData.email}`;
                
                if (userData.userType === 'seller') {
                    const category = productCategories.find(c => c.id === userData.category);
                    const paymentNames = userData.paymentMethods.map(paymentId => {
                        const payment = paymentMethods.find(p => p.id === paymentId);
                        return payment ? payment.name : paymentId;
                    }).join(', ');
                    
                    message += `\nBoutique: ${userData.storeName}\n` +
                              `Catégorie: ${category ? category.name : userData.category}\n` +
                              `Paiements: ${paymentNames}`;
                }
                
                alert(message);
                this.reset();
                showLoginForm();
            }
        });

        // Vérification de la force du mot de passe en temps réel
        document.getElementById('registerPassword').addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });

        // Vérification de la correspondance des mots de passe en temps réel
        document.getElementById('registerConfirmPassword').addEventListener('input', function() {
            checkPasswordMatch();
        });

        function validateLoginForm() {
            let isValid = true;
            clearErrors();
            
            // Validation du type de connexion
            const userType = loginUserTypeInput.value;
            const userTypeError = document.getElementById('loginUserTypeError');
            if (!userType) {
                userTypeError.textContent = 'Veuillez sélectionner un type de connexion';
                isValid = false;
            }
            
            // Validation de l'email
            const email = document.getElementById('loginEmail').value.trim();
            const emailError = document.getElementById('loginEmailError');
            if (!email) {
                emailError.textContent = 'L\'email est requis';
                isValid = false;
            } else if (!validateEmail(email)) {
                emailError.textContent = 'Veuillez entrer une adresse email valide';
                isValid = false;
            }
            
            // Validation du mot de passe
            const password = document.getElementById('loginPassword').value;
            const passwordError = document.getElementById('loginPasswordError');
            if (!password) {
                passwordError.textContent = 'Le mot de passe est requis';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
                isValid = false;
            }
            
            return isValid;
        }

        function validateRegisterForm() {
            let isValid = true;
            clearErrors();
            
            // Validation du type d'utilisateur
            const userType = userTypeInput.value;
            const userTypeError = document.getElementById('userTypeError');
            if (!userType) {
                userTypeError.textContent = 'Veuillez sélectionner un type d\'utilisateur';
                isValid = false;
            }
            
            // Validation du nom
            const name = document.getElementById('registerName').value.trim();
            const nameError = document.getElementById('registerNameError');
            if (!name) {
                nameError.textContent = 'Le nom complet est requis';
                isValid = false;
            } else if (name.length < 2) {
                nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
                isValid = false;
            }
            
            // Validation de l'email
            const email = document.getElementById('registerEmail').value.trim();
            const emailError = document.getElementById('registerEmailError');
            if (!email) {
                emailError.textContent = 'L\'email est requis';
                isValid = false;
            } else if (!validateEmail(email)) {
                emailError.textContent = 'Veuillez entrer une adresse email valide';
                isValid = false;
            }
            
            // Validation des champs spécifiques vendeur
            if (userType === 'seller') {
                const storeName = document.getElementById('storeName').value.trim();
                const storeNameError = document.getElementById('storeNameError');
                if (!storeName) {
                    storeNameError.textContent = 'Le nom de la boutique est requis pour les vendeurs';
                    isValid = false;
                }
                
                const phone = document.getElementById('phone').value.trim();
                const phoneError = document.getElementById('phoneError');
                if (!phone) {
                    phoneError.textContent = 'Le téléphone est requis pour les vendeurs';
                    isValid = false;
                } else if (!validatePhone(phone)) {
                    phoneError.textContent = 'Veuillez entrer un numéro de téléphone valide';
                    isValid = false;
                }
                
                const address = document.getElementById('address').value.trim();
                const addressError = document.getElementById('addressError');
                if (!address) {
                    addressError.textContent = 'L\'adresse est requise pour les vendeurs';
                    isValid = false;
                }
                
                // Validation de la catégorie
                const categoryError = document.getElementById('categoryError');
                if (!selectedCategory) {
                    categoryError.textContent = 'Veuillez sélectionner une catégorie de produits';
                    isValid = false;
                } else {
                    categoryError.textContent = '';
                }
                
                // Validation des méthodes de paiement
                const paymentsError = document.getElementById('paymentsError');
                if (selectedPaymentMethods.length === 0) {
                    paymentsError.textContent = 'Veuillez sélectionner au moins une méthode de paiement';
                    isValid = false;
                } else {
                    paymentsError.textContent = '';
                }
            }
            
            // Validation du mot de passe
            const password = document.getElementById('registerPassword').value;
            const passwordError = document.getElementById('registerPasswordError');
            if (!password) {
                passwordError.textContent = 'Le mot de passe est requis';
                isValid = false;
            } else if (password.length < 6) {
                passwordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
                isValid = false;
            }
            
            // Validation de la confirmation du mot de passe
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const confirmPasswordError = document.getElementById('registerConfirmPasswordError');
            if (!confirmPassword) {
                confirmPasswordError.textContent = 'Veuillez confirmer votre mot de passe';
                isValid = false;
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = 'Les mots de passe ne correspondent pas';
                isValid = false;
            }
            
            // Validation des conditions
            const terms = document.getElementById('acceptTerms').checked;
            const termsError = document.getElementById('termsError');
            if (!terms) {
                termsError.textContent = 'Vous devez accepter les conditions d\'utilisation';
                isValid = false;
            }
            
            return isValid;
        }

        function getFormData() {
            return {
                userType: userTypeInput.value,
                name: document.getElementById('registerName').value.trim(),
                email: document.getElementById('registerEmail').value.trim(),
                storeName: document.getElementById('storeName').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                category: selectedCategory,
                paymentMethods: [...selectedPaymentMethods],
                password: document.getElementById('registerPassword').value
            };
        }

        function checkPasswordStrength(password) {
            const strengthElement = document.getElementById('passwordStrength');
            let strength = '';
            let className = '';
            
            if (password.length === 0) {
                strengthElement.textContent = '';
                return;
            }
            
            if (password.length < 6) {
                strength = 'Faible';
                className = 'strength-weak';
            } else if (password.length < 8) {
                strength = 'Moyen';
                className = 'strength-medium';
            } else {
                // Vérifier la complexité
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumbers = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                
                const complexity = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
                
                if (complexity >= 3) {
                    strength = 'Fort';
                    className = 'strength-strong';
                } else {
                    strength = 'Moyen';
                    className = 'strength-medium';
                }
            }
            
            strengthElement.textContent = `Force du mot de passe: ${strength}`;
            strengthElement.className = `password-strength ${className}`;
        }

        function checkPasswordMatch() {
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const confirmPasswordError = document.getElementById('registerConfirmPasswordError');
            
            if (confirmPassword && password !== confirmPassword) {
                confirmPasswordError.textContent = 'Les mots de passe ne correspondent pas';
            } else {
                confirmPasswordError.textContent = '';
            }
        }

        function clearErrors() {
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
            return re.test(phone.replace(/\s/g, ''));
        }

        function showDashboardActions() {
            const userType = document.getElementById('userAccountType').textContent.toLowerCase();
            if (userType === 'vendeur') {
                const userEmail = document.getElementById('userEmail').textContent;
                const userData = users[userEmail];
                
                let categoryMessage = '';
                if (userData.category) {
                    const category = productCategories.find(c => c.id === userData.category);
                    categoryMessage = `\nCatégorie: ${category ? category.name : userData.category}`;
                }
                
                let paymentsMessage = '';
                if (userData.paymentMethods && userData.paymentMethods.length > 0) {
                    const paymentNames = userData.paymentMethods.map(paymentId => {
                        const payment = paymentMethods.find(p => p.id === paymentId);
                        return payment ? payment.name : paymentId;
                    }).join(', ');
                    paymentsMessage = `\nPaiements acceptés: ${paymentNames}`;
                }
                
                alert('Actions vendeur disponibles:\n- Gérer les produits\n- Voir les commandes\n- Analyser les statistiques\n- Gérer la boutique' + categoryMessage + paymentsMessage);
            } else {
                alert('Actions acheteur disponibles:\n- Parcourir les produits\n- Voir le panier\n- Consulter les commandes\n- Contacter les vendeurs\n\nLimitation: Vous ne pouvez que consulter');
            }
        }

        function logout() {
            // Réinitialiser les formulaires
            document.getElementById('loginForm').reset();
            document.getElementById('registerForm').reset();
            
            // Revenir à la connexion
            showLoginForm();
            
            alert('Déconnexion réussie');
        }

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            initializeCategories();
            initializePaymentMethods();
            document.getElementById('registerFormContainer').classList.add('hidden');
            document.getElementById('dashboard').classList.add('hidden');
        });
