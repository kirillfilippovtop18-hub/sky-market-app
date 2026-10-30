
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const products = [
    {
        id: 1,
        name: "Товар 1",
        description: "Демонстрационный товар первой категории.",
        category: "Категория 1",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+1"
    },
    {
        id: 2,
        name: "Товар 2",
        description: "Демонстрационный товар второй категории.",
        category: "Категория 2",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+2"
    },
    {
        id: 3,
        name: "Товар 3",
        description: "Демонстрационный товар первой категории.",
        category: "Категория 1",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+3"
    },
    {
        id: 4,
        name: "Товар 4",
        description: "Демонстрационный товар третьей категории.",
        category: "Категория 3",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+4"
    },
    {
        id: 5,
        name: "Товар 5",
        description: "Демонстрационный товар второй категории.",
        category: "Категория 2",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+5"
    },
    {
        id: 6,
        name: "Товар 6",
        description: "Демонстрационный товар третьей категории.",
        category: "Категория 3",
        image: "https://placehold.co/600x400/263d65/ffffff?text=Product+6"
    }
];

const productBox = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryBox = document.getElementById("categories");
const productCount = document.getElementById("product-count");

let selectedCategory = "Все";

const categories = [
    "Все",
    ...new Set(products.map(product => product.category))
];

function renderCategories() {
    categoryBox.replaceChildren();

    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "category-btn";
        button.textContent = category;

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            selectedCategory = category;
            renderCategories();
            renderProducts();
        });

        categoryBox.appendChild(button);
    });
}

function renderProducts() {
    productBox.replaceChildren();

    const query = searchInput.value.trim().toLowerCase();

    const filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "Все" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    productCount.textContent = `Найдено: ${filtered.length}`;

    if (filtered.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "Ничего не найдено.";
        productBox.appendChild(empty);
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const category = document.createElement("small");
        category.textContent = product.category;

        card.append(image, title, description, category);
        productBox.appendChild(card);
    });
}

searchInput.addEventListener("input", renderProducts);

renderCategories();
renderProducts();

console.log("SKY MARKET загружен!");
