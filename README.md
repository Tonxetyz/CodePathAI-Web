# CodePathAI Web

Маркетинговый сайт CodePathAI — About, авторизация, тарифы и страница загрузки мобильного приложения.

## Стек

Next.js 16 (App Router), React 19, Tailwind CSS 4, Radix UI, Framer Motion.

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Структура

```text
src/
├── app/                  # роуты и layout Next.js
├── components/
│   ├── screens/          # About, Auth, Download, Pricing
│   └── ui/               # переиспользуемые UI-примитивы
└── lib/                  # экраны-конфиг, утилиты
```

## Линт

```bash
npm run lint
```
