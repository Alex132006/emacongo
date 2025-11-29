        // База данных продуктов
        let products = JSON.parse(localStorage.getItem('restaurantProducts')) || [];

        // Инициализация
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            updateStats();
            
            // Обработчик формы добавления продукта
            document.getElementById('addProductForm').addEventListener('submit', function(e) {
                e.preventDefault();
                addProduct();
            });
        });

        // Показать секцию
        function showSection(sectionId) {
            // Скрыть все секции
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Показать выбранную секцию
            document.getElementById(sectionId).classList.add('active');
            
            // Обновить активную кнопку навигации
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Обновить данные если необходимо
            if (sectionId === 'products') {
                loadProducts();
            } else if (sectionId === 'stats') {
                updateStats();
            }
        }

        // Загрузить продукты
        function loadProducts() {
            const productsList = document.getElementById('productsList');
            productsList.innerHTML = '';

            if (products.length === 0) {
                productsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Нет продуктов</p>';
                return;
            }

            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ''}
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-price">${product.price}₽</div>
                        <div class="product-category">${getCategoryName(product.category)}</div>
                        ${product.description ? `<p>${product.description}</p>` : ''}
                        <div class="product-actions">
                            <button class="btn btn-primary btn-sm" onclick="editProduct(${index})">
                                <i class="fas fa-edit"></i> Изменить
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                                <i class="fas fa-trash"></i> Удалить
                            </button>
                        </div>
                    </div>
                `;
                productsList.appendChild(productCard);
            });
        }

        // Добавить продукт
        function addProduct() {
            const form = document.getElementById('addProductForm');
            const formData = new FormData(form);
            
            const newProduct = {
                id: Date.now(),
                name: formData.get('productName'),
                price: parseInt(formData.get('productPrice')),
                category: formData.get('productCategory'),
                image: formData.get('productImage') || '',
                description: formData.get('productDescription') || ''
            };

            products.push(newProduct);
            saveProducts();
            form.reset();
            
            alert('Продукт успешно добавлен!');
            showSection('products');
        }

        // Редактировать продукт
        function editProduct(index) {
            const product = products[index];
            
            // Заполнить форму данными продукта
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productImage').value = product.image;
            document.getElementById('productDescription').value = product.description;
            
            // Изменить форму для редактирования
            const form = document.getElementById('addProductForm');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Сохранить изменения';
            submitBtn.onclick = function(e) {
                e.preventDefault();
                updateProduct(index);
            };
            
            showSection('add-product');
        }

        // Обновить продукт
        function updateProduct(index) {
            const form = document.getElementById('addProductForm');
            const formData = new FormData(form);
            
            products[index] = {
                ...products[index],
                name: formData.get('productName'),
                price: parseInt(formData.get('productPrice')),
                category: formData.get('productCategory'),
                image: formData.get('productImage') || '',
                description: formData.get('productDescription') || ''
            };
            
            saveProducts();
            
            // Восстановить форму добавления
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Добавить продукт';
            submitBtn.onclick = function(e) {
                e.preventDefault();
                addProduct();
            };
            
            form.reset();
            alert('Продукт успешно обновлен!');
            showSection('products');
        }

        // Удалить продукт
        function deleteProduct(index) {
            if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
                products.splice(index, 1);
                saveProducts();
                loadProducts();
                updateStats();
            }
        }

        // Сохранить продукты в localStorage
        function saveProducts() {
            localStorage.setItem('restaurantProducts', JSON.stringify(products));
            loadProducts();
            updateStats();
        }

        // Обновить статистику
        function updateStats() {
            document.getElementById('totalProducts').textContent = products.length;
            
            const categories = [...new Set(products.map(p => p.category))];
            document.getElementById('totalCategories').textContent = categories.length;
            
            const averagePrice = products.length > 0 ? 
                Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0;
            document.getElementById('averagePrice').textContent = averagePrice + '₽';
        }

        // Получить название категории
        function getCategoryName(categoryId) {
            const categories = {
                'dejeuner': 'Завтраки',
                'bisness': 'Б-Ланч',
                'combo': 'Комбо',
                'salade': 'Салаты',
                'plats-europeens': 'Основные блюда',
                'plats-africains': 'Блюда Африки',
                'soupes': 'Супы',
                'side-dishes': 'Гарниры',
                'sauces': 'Соусы',
                'pizza': 'Пицца',
                'sandwiches': 'Сэндвичи',
                'bourger': 'Бургер',
                'traditionnel': 'Эфиопский кофе',
                'caffe': 'Кофе',
                'the': 'Чай',
                'dessert': 'Десерты',
                'boissons': 'Напитки'
            };
            
            return categories[categoryId] || categoryId;
        }

        // Выйти из админки
        function logout() {
            if (confirm('Вы уверены, что хотите выйти?')) {
                window.location.href = 'index.html';
            }
        }

