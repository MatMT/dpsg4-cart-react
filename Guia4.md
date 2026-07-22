# Guía 4 - E-commerce de Libros con React, Next.js, TypeScript, Redux Toolkit y Visualización de Datos

**Versión 2.0**  
**Autor: Karens Medrano**
---

# Instalación de dependencias

Antes de iniciar el desarrollo de la aplicación, es necesario instalar las dependencias que serán utilizadas durante la práctica.

## Redux Toolkit y React Redux

Redux Toolkit permite gestionar el estado global de la aplicación y React Redux facilita la integración con los componentes de React.

Ejecute el siguiente comando en la terminal:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Recharts

Recharts será utilizado para generar las gráficas estadísticas que se mostrarán en el Dashboard.

Ejecute el siguiente comando:

```bash
npm install recharts
```

---


# Índice
## tipos
1. [Product.ts](#productts)
## datos
2. [books.ts](#booksts)
## redux
3. [store.ts](#storets)
4. [hooks.ts](#hooksts)
5. [cartSlice.ts](#cartslicets)

## Estilos

6. [navbar.css](#navbarcss)
7. [product-grid.css](#product-gridcss)
8. [dashboard.css](#dashboardcss)
9. [search.css](#searchcss)
## Componentes

9. [Navbar.tsx](#navbartsx) 
10. [SearchBar.tsx](#searchbartsx)
11. [Productcardtsx](#productcardtsx)
12. [Productgridtsx](#productgridtsx)
13. [Statisticstsx](#statisticstsx)
14. [Salescharttsx](#salescharttsx)

## Páginas

15. [Layout.tsx](#layouttsx)
16. [Globals.css](#globalscss)
17. [Dashboard/Page.tsx](#dashboardpagetsx)
18. [Page.tsx](#pagetsx)

---

# Product.ts

Ruta:

```text
src/types/Product.ts
```

```ts
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
```
[⬆️ Volver al índice](#índice)

---

# books.ts

Ruta:

```text
src/data/books.ts
```

```ts
import { Product } from "../types/Product";

export const books: Product[] = [
  {
    id: 1,
    title: 'Cien años de soledad',
    price: 100,
    image: 'https://images.penguinrandomhouse.com/cover/9780525562443',
    quantity: 1
  },
  {
    id: 2,
    title: 'El señor de los anillos (Trilogía)',
    price: 190,
    image: 'https://proassetspdlcom.cdnstatics2.com/usuaris/libros/fotos/358/original/portada_pack-trilogia-el-senor-de-los-anillos_j-r-r-tolkien_202206071544.jpg',
    quantity: 1
  },
  {
    id: 3,
    title: 'Cuentos de Barro',
    price: 30,
    image: 'https://www.librosdelaballena.com/wp-content/uploads/2020/05/cuentos-barro-244x300.png',
    quantity: 1
  },
  {
    id: 4,
    title: 'Tierra de Infancia',
    price: 30,
    image: 'https://assets.isu.pub/document-structure/230605011415-591c5b47dde190303e7de29a0a888041/v1/fa8a209bb2ce609861c6572f117e69f8.jpeg?width=720&quality=85%2C50',
    quantity: 1
  },
  {
    id: 5,
    title: 'Harry Potter Pack',
    price: 390,
    image: 'https://contentv2.tap-commerce.com/cover/large/9789878000473_1.jpg?id_com=1113',
    quantity: 1
  }

];
```
[⬆️ Volver al índice](#índice)

---

# store.ts

Ruta:

```text
src/redux/store.ts
```

```ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;
```
[⬆️ Volver al índice](#índice)

---

# hooks.ts

Ruta:

```text
src/redux/hooks.ts
```

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```
[⬆️ Volver al índice](#índice)

---
# cartSlice.ts
```text
src/redux/cartSlice.ts
```
```ts
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Product } from "../types/Product";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
addToCart: (
  state,
  action: PayloadAction<Product>
) => {

  const existingProduct = state.find(
    item => item.id === action.payload.id
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    state.push({
      ...action.payload
    });
  }
},

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
```
[⬆️ Volver al índice](#índice)
---

# navbar.css
```text
src/styles/navbar.css
```
```css
/* =========================
   NAVBAR
========================= */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(
    135deg,
    #0f172a,
    #1e293b
  );

  padding: 18px 40px;

  box-shadow: 0 4px 15px
    rgba(0, 0, 0, 0.15);

  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar h1 {
  margin: 0;
  font-size: 1.8rem;
  color: white;
}

/* =========================
   MENÚ
========================= */

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;

  transition: 0.3s;
}

.nav-links a:hover {
  color: #38bdf8;
}

/* =========================
   CARRITO
========================= */

.cart-container {
  position: relative;
}

.cart-button {
  background: #0ea5e9;
  color: white;

  border: none;
  border-radius: 10px;

  padding: 12px 18px;

  cursor: pointer;

  font-weight: 600;

  transition: 0.3s;
}

.cart-button:hover {
  background: #0284c7;
}

.cart-dropdown {
  position: absolute;

  right: 0;
  top: 55px;

  width: 360px;

  background: white;

  border-radius: 15px;

  padding: 15px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.15);

  z-index: 999;
}

.empty-cart {
  text-align: center;
  color: #666;
  padding: 20px;
}

/* =========================
   PRODUCTOS CARRITO
========================= */

.cart-item {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 12px 0;

  border-bottom: 1px solid #eee;
}

.cart-image {
  width: 60px;
  height: 80px;

  object-fit: cover;

  border-radius: 8px;

  border: 1px solid #ddd;
}

.cart-info {
  flex: 1;
}

.cart-info p {
  margin: 4px 0;
  color: #333;
}

.cart-info strong {
  color: #0ea5e9;
}

/* =========================
   TOTAL
========================= */

.cart-total {
  text-align: right;

  padding: 12px 0;

  font-size: 1rem;

  color: #111827;
}

/* =========================
   BOTÓN VACIAR
========================= */

.clear-button {
  width: 100%;

  background: crimson;
  color: white;

  border: none;

  padding: 12px;

  border-radius: 10px;

  cursor: pointer;

  font-weight: bold;

  transition: 0.3s;
}

.clear-button:hover {
  background: #b00028;
}

/* =========================
   RESPONSIVE
========================= */


@media (max-width: 768px) {
  .navbar {
    flex-direction: column;

    gap: 15px;

    padding: 15px;
  }

  .nav-links {
    width: 100%;

    justify-content: center;
  }

  .cart-container {
    width: 100%;

    display: flex;

    justify-content: center;
  }
}
```
[⬆️ Volver al índice](#índice)
---

# product-grid.css
```text
src/styles/product-grid.css
```
```css
.page-container {
  max-width: 1400px;
  margin: auto;
}

.page-title {
  text-align: center;

  margin: 30px 0;

  font-size: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Tablet */
@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Celular */
@media (max-width: 576px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background: white;

  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 4px 20px rgba(0,0,0,0.08);

  transition: 0.3s;
}



.product-card:hover {
  transform: translateY(-8px);

  box-shadow:
    0 10px 25px rgba(0,0,0,0.15);
}

.product-card img {
  width: 100%;

  height: 320px;

  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-title {
  margin: 10px 0;
  min-height: 50px;
}

.product-price {
  color: #008cba;

  font-size: 1.2rem;

  font-weight: bold;
}

.add-button {
  width: 100%;

  background: #008cba;

  color: white;

  border: none;

  padding: 12px;

  font-size: 1rem;

  cursor: pointer;

  transition: 0.3s;
}

.add-button:hover {
  background: #006f94;
}
```
[⬆️ Volver al índice](#índice)
---
# search.css
```text
src/styles/search.css
```
```css
.search-container {
  display: flex;
  justify-content: center;

  margin-bottom: 30px;
}

.search-input {
  width: 500px;
  max-width: 90%;

  padding: 14px 18px;

  border: 1px solid #ddd;
  border-radius: 14px;

  font-size: 16px;

  box-shadow:
    0 2px 10px rgba(0,0,0,0.08);

  transition: 0.3s;
}

.search-input:focus {
  outline: none;

  border-color: #0ea5e9;

  box-shadow:
    0 0 0 4px rgba(
      14,
      165,
      233,
      0.15
    );
}
```
[⬆️ Volver al índice](#índice)
---
# dashboard.css
```text
src/styles/dashboard.css
```
```css
.dashboard {
  max-width: 1400px;
  margin: auto;
  padding: 30px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 2.2rem;
  color: #1e293b;
}

.dashboard-header p {
  color: #64748b;
  margin-top: 8px;
}

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));

  gap: 25px;

  margin-bottom: 40px;
}

.stat-card {
  background: white;

  border-radius: 16px;

  padding: 25px;

  box-shadow:
    0 4px 20px rgba(0,0,0,0.08);

  text-align: center;
}

.stat-card span {
  font-size: 2rem;
}

.stat-card h3 {
  margin-top: 10px;
  color: #64748b;
}

.stat-card p {
  font-size: 2rem;
  font-weight: bold;
  color: #0ea5e9;
}

.chart-section {
  background: white;

  border-radius: 20px;

  padding: 25px;

  box-shadow:
    0 4px 20px rgba(0,0,0,0.08);
}

.chart-section h2 {
  margin-bottom: 20px;
}
```
[⬆️ Volver al índice](#índice)
---
# Navbar.tsx
```text
src/components/Navbar.tsx
```
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import { clearCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import "../styles/navbar.css";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);

  const cart = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <nav className="navbar">

      <div className="nav-links">
        <Link href="/">Inicio</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      <div className="cart-container">
        <button
          className="cart-button"
          onClick={() =>
            setShowCart(!showCart)
          }
        >
          🛒 Carrito ({totalItems})
        </button>

        {showCart && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p className="empty-cart">
                El carrito está vacío
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item"
                  >
                    
 <img
      src={item.image}
      alt={item.title}
      className="cart-image"
    />

                    <div className="cart-info">
                      <p>{item.title}</p>

                      <p>
                        Cantidad:
                        {" "}
                        {item.quantity}
                      </p>

                      <strong>
                        $
                        {item.price *
                          item.quantity}
                      </strong>
                    </div>
                  </div>
                ))}

                <div className="cart-total">
                  <strong>
                    Total: ${total}
                  </strong>
                </div>

                <button
                  className="clear-button"
                  onClick={() =>
                    dispatch(clearCart())
                  }
                >
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
```
[⬆️ Volver al índice](#índice)

---
# SearchBar.tsx
```text
src/components/SearchBar.tsx
```
```tsx
"use client";
import "../styles/search.css";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Buscar libro..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}
```
[⬆️ Volver al índice](#índice)


---
# productCard.tsx
```text
src/components/productCard.tsx
```
```tsx
"use client";

import { Product } from "../types/Product";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-info">
        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-price">
          ${product.price}
        </p>

        <button
          className="add-button"
          onClick={() =>
            dispatch(addToCart(product))
          }
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
```
[⬆️ Volver al índice](#índice)


---
# Statistics.tsx
```text
src/components/Statistics.tsx
```
```tsx
"use client";

import { useAppSelector } from "../redux/hooks";

export default function Statistics() {
  const cart = useAppSelector(
    state => state.cart
  );

  const totalProductos = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalVentas = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <span>📚</span>
        <h3>Productos</h3>
        <p>{totalProductos}</p>
      </div>

      <div className="stat-card">
        <span>💰</span>
        <h3>Ventas</h3>
        <p>${totalVentas}</p>
      </div>

      <div className="stat-card">
        <span>🛒</span>
        <h3>Distintos</h3>
        <p>{cart.length}</p>
      </div>

    </div>
  );
}
```
[⬆️ Volver al índice](#índice)


---
# salesChart.tsx
```text
src/components/salesChart.tsx
```
```tsx
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useAppSelector } from "../redux/hooks";

export default function SalesChart() {

  const cart = useAppSelector(
    (state) => state.cart
  );

  const data = cart.map(
    (item) => ({
      nombre: item.title,
      cantidad: item.quantity,
    })
  );

  return (
    <div className="chart-card">

      <div
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="nombre"
              angle={-20}
              textAnchor="end"
              height={70}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="cantidad"
              fill="#008cba"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
```
[⬆️ Volver al índice](#índice)

---

# ProductGrid.tsx
```text
src/components/ProductGrid.tsx
```
```tsx
"use client";

import { books } from "../data/books";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

import "../styles/product-grid.css";

export default function ProductGrid() {
  const dispatch = useAppDispatch();

  return (
    <div className="product-grid">
      {books.map((book) => (
        <div
          key={book.id}
          className="product-card"
        >
          
        <img
          src={book.image}
          alt={book.title}
        />

          <div className="product-info">
            <h3 className="product-title">
              {book.title}
            </h3>

            <p className="product-price">
              ${book.price}
            </p>

            <button
              className="add-button"
              onClick={() =>
                dispatch(addToCart(book))
              }
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```
[⬆️ Volver al índice](#índice)
---

# layout.tsx
```text
src/app/layout.tsx
```
```tsx
"use client";

import { Provider } from "react-redux";
import store from "../redux/store";

import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
```
[⬆️ Volver al índice](#índice)
---

# globals.css
```text
src/app/globals.css
```
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f7fb;
}

.home-container {
  max-width: 1400px;
  margin: auto;
  padding: 30px;
}

.hero {
  background: linear-gradient(
    135deg,
    #0f172a,
    #1e3a8a
  );

  color: white;

  padding: 60px;

  border-radius: 20px;

  text-align: center;

  margin-bottom: 40px;
}

.hero h1 {
  font-size: 3rem;

  margin-bottom: 15px;
}

.hero p {
  font-size: 1.2rem;

  opacity: 0.9;
}

.section-title {
  text-align: center;

  margin-bottom: 25px;

  color: #1e293b;
}

main {
  padding: 20px;
}

button {
  font-family: inherit;
}

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));

  gap: 20px;

  margin-bottom: 30px;
}

.stat-card {
  background: white;

  border-radius: 15px;

  padding: 25px;

  text-align: center;

  box-shadow: 0 4px 12px
    rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  color: #555;
  margin-bottom: 15px;
}

.stat-card p {
  font-size: 2rem;

  font-weight: bold;

  color: #008cba;
}
```
[⬆️ Volver al índice](#índice)
---

# page.tsx
```text
src/app/page.tsx
```
```tsx

import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="home-container">
<br></br>
      <section>
           <ProductGrid />
      </section>

    </main>
  );
}

```
[⬆️ Volver al índice](#índice)

---

# dashboard/page.tsx

Ruta:

```text
src/dashboard/page.tsx
```

```ts
import React from "react";
import Statistics from "../../components/Statistics";
import SalesChart from "../../components/SalesChart";
import "../../styles/dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard de Ventas</h1>

        <p>
          Resumen general de la actividad
          del carrito de compras.
        </p>
      </div>

      <Statistics />

      <div className="chart-section">
        <h2>📈 Productos agregados</h2>

        <SalesChart />
      </div>
    </main>
  );
}

```
[⬆️ Volver al índice](#índice)

---