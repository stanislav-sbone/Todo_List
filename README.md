# ToDo List App 📝

Современный полнофункциональный ToDo лист для управления задачами с возможностью фильтрации, сортировки и смены темы.

## ✨ Функционал

### Основные возможности

- ➕ Добавление новых задач
- ✅ Отметка задач как выполненных/невыполненных
- ✏️ Редактирование задач (с возможностью отмены изменений)
- 🗑️ Удаление задач
- 🔍 Фильтрация задач по тексту
- 📊 Сортировка задач (Все / Выполненные / Невыполненные)
- 🎨 Перетаскивание задач для изменения порядка (drag & drop)
- 🌙 Смена темы (Светлая/Темная) с сохранением в localStorage
- 👤 Изоляция данных пользователя (через userId)

## 🛠️ Технологии

### Frontend (Client)

- **React 19** — UI библиотека
- **TypeScript** — типизация
- **Vite** — сборщик
- **TanStack Query** — управление серверным состоянием и кеширование
- **Tailwind CSS 4** — стилизация
- **Ant Design 5** — UI компоненты
- **Framer Motion** — анимации
- **Lucide React** — иконки
- **Axios** — HTTP клиент

### Backend (API)

- **Node.js** — серверная среда
- **Express** — веб-фреймворк
- **TypeScript** — типизация
- **CORS** — кросс-доменные запросы

### Development Tools

- **Pre-commit hooks** (Husky + lint-staged)
- **Prettier** — форматирование кода
- **ESLint** — линтинг
- **TypeScript** — статическая типизация

## 📁 Структура проекта

```
Todo List/
├── client/          # Frontend приложение
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   │   ├── Checkbox/   # Чекбокс для задач
│   │   │   ├── Dropdown/   # Dropdown меню
│   │   │   ├── EditTask/   # Компонент редактирования
│   │   │   ├── FilterForm/ # Форма фильтрации
│   │   │   ├── Header/     # Шапка приложения
│   │   │   ├── Modal/      # Модальное окно
│   │   │   ├── Task/       # Компонент задачи
│   │   │   ├── TaskForm/   # Форма создания задачи
│   │   │   └── TasksList/  # Список задач
│   │   ├── services/       # API сервисы
│   │   ├── types/          # TypeScript типы
│   │   ├── utils/          # Утилиты
│   │   └── ThemeContext.tsx # Контекст темы
│   └── public/      # Статические файлы
│
├── api/             # Backend API
│   ├── src/
│   │   ├── controllers/    # Контроллеры
│   │   ├── routes/         # Маршруты
│   │   └── data/           # Данные (in-memory хранилище)
│   └── dist/               # Скомпилированный код
│
└── package.json     # Root package с pre-commit hooks
```

## 🚀 Установка и запуск

### Требования

- Node.js (версия 18+)
- npm или pnpm

### Установка зависимостей

```bash
# Установка зависимостей для всех частей проекта
npm install

# Или для каждой части отдельно
cd api && npm install
cd ../client && npm install
```

### Запуск в режиме разработки

#### Запуск Backend сервера

```bash
cd api
npm run dev
```

Сервер запустится на `http://localhost:5000`

#### Запуск Frontend приложения

```bash
cd client
npm run dev
```

Приложение откроется на `http://localhost:5173`

## 📡 API Endpoints

Все запросы выполняются к базовому URL: `http://localhost:5000/tasks`

| Метод    | Endpoint                 | Описание                         |
| -------- | ------------------------ | -------------------------------- |
| `GET`    | `/tasks?userId={userId}` | Получить все задачи пользователя |
| `POST`   | `/tasks`                 | Создать новую задачу             |
| `PATCH`  | `/tasks/:id`             | Обновить задачу                  |
| `DELETE` | `/tasks/:id`             | Удалить задачу                   |
| `POST`   | `/tasks/reorder`         | Обновить порядок задач           |

### Примеры запросов

#### Создание задачи

```bash
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "newTask": {
    "id": "unique-id",
    "text": "Новая задача",
    "isCompleted": false,
    "isEditing": false
  },
  "userId": "user-123"
}
```

#### Обновление задачи

```bash
PATCH http://localhost:5000/tasks/:id
Content-Type: application/json

{
  "updatedFields": {
    "text": "Обновленный текст",
    "isCompleted": true
  },
  "userId": "user-123"
}
```

## 🎯 Особенности реализации

- **Изоляция данных**: Каждый пользователь видит только свои задачи через `userId`
- **In-memory хранилище**: Данные хранятся в памяти (при перезапуске сервера данные теряются)
- **Оптимистичное обновление**: TanStack Query обеспечивает быстрое обновление UI
- **Темизация**: Светлая/темная тема с автоматическим сохранением в localStorage
- **Drag & Drop**: Перетаскивание задач для изменения порядка
- **Валидация**: Форматирование кода через Pre-commit hooks
