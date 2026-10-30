
const products = [
    {
        id: 1,
        name: "Демонстрационный товар 1",
        category: "Категория 1",
        description: "Пример карточки с изображением и описанием.",
        image: "https://placehold.co/600x400/19172f/d9b7ff?text=Demo+1"
    },
    {
        id: 2,
        name: "Демонстрационный товар 2",
        category: "Категория 1",
        description: "Пример элемента современного каталога.",
        image: "https://placehold.co/600x400/19172f/00eaff?text=Demo+2"
    },
    {
        id: 3,
        name: "Демонстрационный товар 3",
        category: "Категория 2",
        description: "Демонстрация оформления карточки.",
        image: "https://placehold.co/600x400/19172f/d9b7ff?text=Demo+3"
    },
    {
        id: 4,
        name: "Демонстрационный товар 4",
        category: "Категория 2",
        description: "Пример изображения и краткой информации.",
        image: "https://placehold.co/600x400/19172f/00eaff?text=Demo+4"
    },
    {
        id: 5,
        name: "Демонстрационный товар 5",
        category: "Категория 3",
        description: "Ещё один элемент демонстрационного каталога.",
        image: "https://placehold.co/600x400/19172f/d9b7ff?text=Demo+5"
    },
    {
        id: 6,
        name: "Демонстрационный товар 6",
        category: "Категория 3",
        description: "Пример адаптивной карточки.",
        image: "https://placehold.co/600x400/19172f/00eaff?text=Demo+6"
    }
];

const categoriesElement = document.getElementById("categories");
const productsElement = document.getElementById("products");
const searchInput = document.getElementById("search");
const emptyElement = document.getElementById("empty");

let selectedCategory = "Все";

const categories = [
    "Все",
    ...new Set(products.map(product => product.category))
];

function renderCategories() {
    categoriesElement.replaceChildren();

    categories.forEach(category => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = category;

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            selectedCategory = category;
            renderCategories();
            renderProducts();
        });

        categoriesElement.appendChild(button);
    });
}

function renderProducts() {
    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "Все" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    productsElement.replaceChildren();
    emptyElement.hidden = filteredProducts.length > 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        card.append(image, title, description);
        productsElement.appendChild(card);
    });
}

searchInput.addEventListener("input", renderProducts);

renderCategories();
renderProducts();

// Поддержка запуска внутри Telegram Mini App
if (window.Telegram && window.Telegram.WebApp) {
    const telegramApp = window.Telegram.WebApp;
    telegramApp.ready();
    telegramApp.expand();
}
