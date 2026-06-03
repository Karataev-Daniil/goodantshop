# GoodAntShop React Version

Это автономная React-версия текущего WP фронта на мок-данных (без админки).

## Что внутри
- Главная: hero, популярные муравьи, все виды.
- Каталог муравьев.
- Single страница муравья: картинка + контент + характеристики справа + рекомендованные формикарии.
- Каталог формикариев.

## Запуск
1. Перейти в папку:
   `cd good-ant-react`
2. Установить зависимости:
   `npm install`
3. Запустить фронтенд:
   `npm run dev`
4. Запустить локальный API-сервер:
   `npm run api`
5. Запустить сразу фронтенд + API:
   `npm run dev:full`

## Деплой на Vercel
- На Vercel бекенд используется из `api/order.js`
- Фронтенд делает запросы к `/api/order`
- В продакшене это будет `https://goodantshop.md/api/order`
- В Vercel задайте секреты:
  - `RESEND_API_KEY`
  - `ORDER_EMAIL`
  - `FROM_EMAIL`

## Локальная разработка
- `api-server.js` нужен только для локального запуска
- В проде `http://localhost:3001` не используется

## Данные
Каталог товаров лежит в:
- `src/data/antsData.js`
- `src/data/formicariumsData.js`
- `src/data/blogPostsData.js`
