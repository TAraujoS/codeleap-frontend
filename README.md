# CodeLeap Network 🧠

Uma rede social simplificada construída com **React + TypeScript**, com funcionalidades de criação, edição, deleção e listagem de posts. Este projeto foi desenvolvido como parte de um teste técnico utilizando a API pública da [CodeLeap](https://dev.codeleap.co.uk/careers/).

---

## 📸 Preview

https://github.com/user-attachments/assets/ecf7926b-644d-4f39-8e27-f10e0c2e6316

---

## 🚀 Funcionalidades

- Login com username (armazenado localmente)
- Criação de post com título e conteúdo
- Edição e exclusão de post (somente pelo autor)
- Listagem com **infinite scroll**
- Filtro por texto (título ou conteúdo)
- Ordenação por mais recentes ou mais antigos
- Feedback visual com toasts
- Layout responsivo e estilizado com Tailwind CSS

---

## 🧪 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [React Hook Form + Zod](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [date-fns](https://date-fns.org/) (formatação de tempo)

---

## 🔗 API

Base da API:  
`https://dev.codeleap.co.uk/careers/`

- **GET /** → lista de posts (paginada)
- **POST /** → cria novo post
- **PATCH /:id/** → atualiza título e conteúdo do post
- **DELETE /:id/** → exclui post

> ℹ️ Todos os endpoints exigem a `/` no final para evitar CORS.

---

## 📂 Estrutura de Pastas

```bash
src/
│
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── App.tsx
└── main.tsx
```
