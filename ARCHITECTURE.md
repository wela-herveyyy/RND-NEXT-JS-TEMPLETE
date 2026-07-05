# Project architecture

This document describes how **rnd-nextjs-template** is structured: runtime stack, dependencies, the Next.js App Router and `components` layout (frontend), and the domain-oriented layout under `lib` plus persistence (`database/`) used by server code.

**Complete file listings** for each source folder appear in [Full code samples by folder](#full-code-samples-by-folder).

---

## Stack

| Layer | Technology | Notes |
|--------|------------|--------|
| Framework | **Next.js 16** (`16.2.4`) | App Router; RSC by default; Server Actions in `app/actions.ts` |
| UI | **React 19** (`19.2.4`) | Client components opt in with `"use client"` |
| Language | **TypeScript 5** | Strict typing; path alias `@/` (see `tsconfig.json`) |
| Styling | **Tailwind CSS 4** | PostCSS via `@tailwindcss/postcss` |
| Database access | **Drizzle ORM** (`0.45.2`) | Schema in `database/schema.ts`; MySQL dialect |
| DB driver | **mysql2** (`3.22.2`) | Used by Drizzle’s MySQL adapter |
| Env | **dotenv** (`^17.4.2`) | Loaded in `database/index.ts` for local credentials |
| Linting | **ESLint 9** + **eslint-config-next** (`16.2.4`) | Aligned with Next.js major version |

---

## Dependencies

### Runtime (`dependencies`)

| Package | Version (range) | Role in this project |
|---------|-----------------|----------------------|
| `next` | `16.2.4` | Application framework, routing, RSC, Server Actions |
| `react` | `19.2.4` | UI runtime |
| `react-dom` | `19.2.4` | DOM rendering |
| `drizzle-orm` | `^0.45.2` | Type-safe SQL / schema; used in use cases |
| `mysql2` | `^3.22.2` | MySQL connection for Drizzle |
| `dotenv` | `^17.4.2` | Loads `DATABASE_URL` (and similar) for DB bootstrap |

### Development (`devDependencies`)

| Package | Version (range) | Role |
|---------|-----------------|------|
| `typescript` | `^5` | Type checking |
| `@types/node` | `^20` | Node.js types |
| `@types/react` | `^19` | React types |
| `@types/react-dom` | `^19` | React DOM types |
| `tailwindcss` | `^4` | Utility-first CSS |
| `@tailwindcss/postcss` | `^4` | Tailwind PostCSS integration |
| `eslint` | `^9` | Lint runner |
| `eslint-config-next` | `16.2.4` | Next.js ESLint preset |
| `drizzle-kit` | `^0.31.10` | Migrations / Drizzle CLI (`drizzle.config.ts`) |

---

## Repository layout (high level)

```
rnd-nextjs-template/
├── app/                    # Next.js App Router: pages, layout, server actions
├── components/             # UI: atomic design (atoms → molecules → organisms)
├── lib/                    # Domain: controllers, services, use cases, entity types
├── database/               # Drizzle client + schema (not under lib/)
├── public/                 # Static assets
├── drizzle.config.ts       # Drizzle Kit (MySQL, schema path, output dir)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Next.js 16 frontend structure (`app/` + `components/`)

### `app/` — App Router

| Path | Responsibility |
|------|----------------|
| `app/layout.tsx` | Root layout: fonts (Geist), `globals.css`, HTML shell |
| `app/page.tsx` | Home route |
| `app/users/page.tsx` | Users listing: composes `UsersTable`, loads data via controller factory |
| `app/actions.ts` | **`"use server"`** — wires `UsersController` + `UsersService` + `GetUsersUseCase` (composition root for server-side domain access) |
| `app/globals.css` | Global styles (Tailwind entry) |

**Pattern:** Server Components fetch or call server actions / controllers; interactive UI is pushed into client components under `components/`.

### `components/` — Atomic design

The UI is grouped by **atoms → molecules → organisms** (Brad Frost–style). Co-located hooks use a **`<name>.<layer>.hooks.ts`** naming pattern next to the component.

| Layer | Path | Example |
|-------|------|---------|
| **Atoms** | `components/atoms/` | `Button.tsx` — small, reusable controls |
| **Molecules** | `components/molecules/<Name>/` | `UserCard/UserCard.tsx` + `userCard.molecules.hooks.ts` |
| **Organisms** | `components/organisms/<Name>/` | `UsersTable/UsersTable.tsx` + `usersTable.organism.hooks.ts` |

**Conventions observed:**

- **Client boundaries:** Organisms that need hooks/events use `"use client"` (e.g. `UsersTable`).
- **Data from server:** Pages pass serializable props (e.g. `UserSelect[]`) into client organisms.
- **Imports:** UI imports entity types from `@/lib/entities/...` for props typing shared with the domain layer.

---

## Next.js 16 “backend” structure (`lib/` + `database/`)

Server-side logic is **not** only under `lib/`: persistence lives in **`database/`** at the repo root, and **`app/actions.ts`** is the composition root that connects Next.js to the domain layer.

### `lib/` — Domain-oriented layers

| Path | Responsibility |
|------|----------------|
| `lib/entities/` | Domain types inferred from Drizzle schema (e.g. `users.type.ts` → `UserSelect`, `UserInsert`) |
| `lib/domain/controllers/` | HTTP-agnostic “controllers”: orchestrate services, implement interfaces (e.g. `users/users.controller.ts`, `users.interface.ts`) |
| `lib/domain/services/` | Application services delegating to use cases (e.g. `users.service.ts`) |
| `lib/domain/usecases/` | Single-purpose operations (e.g. `users/get_users.usecase.ts` executes DB read via Drizzle) |

**Request/data flow (users example):**

1. **Route / action:** `createUsersController()` in `app/actions.ts` instantiates `UsersController` → `UsersService` → `GetUsersUseCase`.
2. **Use case:** `GetUsersUseCase` uses `database` from `@/database` and the `users` table from `@/database/schema`.
3. **Types:** `UserSelect` is exported from `lib/entities/users.type.ts` and used by controllers and React props.

### `database/` — Infrastructure

| File | Responsibility |
|------|----------------|
| `database/index.ts` | Drizzle client (`mysql2` connection via `DATABASE_URL`) |
| `database/schema.ts` | Drizzle table definitions (e.g. `users` MySQL table) |

**Configuration:** `drizzle.config.ts` points `schema` to `./database/schema.ts`, dialect **mysql**, migrations/output under `./drizzle`.

---

## Full code samples by folder

Each block below is the **complete** current source of the listed file (faithful copy). **Not inlined:** `public/*.svg` (static assets; open files in `public/`), and lockfiles / `.next` build output.

### `app/`

#### `app/actions.ts`

```ts
"use server";

import { UsersController } from "@/lib/domain/controllers/users/users.controller";
import { GetUsersUseCase } from "@/lib/domain/usecases/users/get_users.usecase";
import { UsersService } from "@/lib/domain/services/users.service";

export async function createUsersController(): Promise<UsersController> {

  return new UsersController(new UsersService(
    new GetUsersUseCase())

  );
}
```

#### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

#### `app/page.tsx`

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
          RND NextJS Template
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Welcome to the Livro Systems Inc. Next.js template. Built with Atomic Design and Drizzle ORM.
        </p>
        <div className="flex gap-4">
          <Link
            href="/users"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition-opacity"
          >
            View Users
          </Link>
        </div>
      </main>
    </div>
  );
}
```

#### `app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

#### `app/users/page.tsx`

```tsx
import { createUsersController } from "../actions";
import { UsersTable } from "@/components/organisms/UsersTable/UsersTable";

export default async function UsersPage() {
  const usersController = await createUsersController();
  const users = await usersController.getUsers();
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      <UsersTable users={users} />
    </main>
  );
}
```

---

### `components/`

#### `components/atoms/Button.tsx`

```tsx
import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  onClick,
  disabled,
}) => {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyle = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
  };
  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

#### `components/molecules/UserCard/UserCard.tsx`

```tsx
"use client";

import { Button } from "../../atoms/Button";
import { useUserCard } from "./userCard.molecules.hooks";
import { UserSelect } from "@/lib/entities/users.type";

interface UserCardProps {
  user: UserSelect;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { handleDelete } = useUserCard();
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <Button onClick={() => handleDelete(user.id)} variant="danger">
        Delete
      </Button>
    </div>
  );
};
```

#### `components/molecules/UserCard/userCard.molecules.hooks.ts`

```ts
export const useUserCard = () => {
  const handleDelete = (id: string) => {
    console.log(`User ${id} deleted`);
  };

  return {
    handleDelete,
  };
};
  
```

#### `components/organisms/UsersTable/UsersTable.tsx`

```tsx
"use client";
import { UserSelect } from "@/lib/entities/users.type";
import { UserCard } from "@/components/molecules/UserCard/UserCard";
import { useUsersTable } from "./usersTable.organism.hooks";
import { Button } from "@/components/atoms/Button";

interface UsersTableProps {
  users: UserSelect[];
  fallbackText?: string;
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const { usersData, handleRefresh } = useUsersTable({ users });

  return (
    <div>
      <div className="mb-4">
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
      <div className="grid gap-4">
        {usersData.map((userData: UserSelect) => (
          <UserCard key={userData.id} user={userData} />
        ))}
      </div>{" "}
    </div>
  );
};
```

#### `components/organisms/UsersTable/usersTable.organism.hooks.ts`

```ts
import { UserSelect } from "@/lib/entities/users.type";
import { useEffect, useState } from "react";

interface UsersTableProps {
  users: UserSelect[];
}

export const useUsersTable = ({ users }: UsersTableProps) => {
  const [usersData, setUsersData] = useState<UserSelect[]>(users);

  useEffect(() => {
    setUsersData(users);
    handleNoUsersFound(users);
  }, []);

  const handleNoUsersFound = (users: UserSelect[]) => {
    if (users.length === 0) {
      setUsersData([
        {
          name: "Hervey",
          email: "[EMAIL_ADDRESS]",
          id: "1",
        },
        {
          name: "Marquez",
          email: "[EMAIL_ADDRESS]",
          id: "2",
        },
        {
          name: "Test",
          email: "[EMAIL_ADDRESS]",
          id: "3",
        },
        {
          name: "T1",
          email: "[EMAIL_ADDRESS]",
          id: "4",
        },
        {
          name: "T2",
          email: "[EMAIL_ADDRESS]",
          id: "5",
        },
        {
          name: "T3",
          email: "[EMAIL_ADDRESS]",
          id: "6",
        },
        {
          name: "T4",
          email: "[EMAIL_ADDRESS]",
          id: "7",
        },
        {
          name: "T5",
          email: "[EMAIL_ADDRESS]",
          id: "8",
        },
        {
          name: "T6",
          email: "[EMAIL_ADDRESS]",
          id: "9",
        },
        {
          name: "T7",
          email: "[EMAIL_ADDRESS]",
          id: "10",
        },
      ]);
    }
  };
  const handleRefresh = () => {
    console.log("refresh");
  };
  return { usersData, handleRefresh, handleNoUsersFound };
};
```

---

### `lib/`

#### `lib/entities/users.type.ts`

```ts
import { users } from "@/database/schema";

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
```

#### `lib/domain/controllers/users/users.interface.ts`

```ts
import { UserSelect } from "@/lib/entities/users.type";

export interface IUsersController {
  getUsers(): Promise<UserSelect[]>;
}
```

#### `lib/domain/controllers/users/users.controller.ts`

```ts

import { UserSelect } from "@/lib/entities/users.type";
import { IUsersController } from "./users.interface";
import { UsersService } from "@/lib/domain/services/users.service";

export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) { }

  async getUsers(): Promise<UserSelect[]> {
    try {
      const result = await this.usersService.getUsers();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
```

#### `lib/domain/services/users.service.ts`

```ts
import { GetUsersUseCase } from "../usecases/users/get_users.usecase";

export class UsersService {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  async getUsers() {
    return await this.getUsersUseCase.execute();
  }
}
```

#### `lib/domain/usecases/users/get_users.usecase.ts`

```ts
import { database } from "@/database";
import { UserSelect } from "@/lib/entities/users.type";
import { users } from "@/database/schema";

export class GetUsersUseCase {
  private db = database;
  async execute(): Promise<UserSelect[]> {
    try {
      const result = await this.db.select().from(users);
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
```

---

### `database/`

#### `database/index.ts`

```ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const database = drizzle({
  connection: { uri: process.env.DATABASE_URL },
});


```

#### `database/schema.ts`

```ts
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});
```

---

### Project configuration (repository root)

#### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

#### `drizzle.config.ts`

```ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

#### `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

#### `package.json`

```json
{
  "name": "rnd-nextjs-template",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "dotenv": "^17.4.2",
    "drizzle-orm": "^0.45.2",
    "mysql2": "^3.22.2",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "drizzle-kit": "^0.31.10",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "ignoreScripts": [
    "sharp",
    "unrs-resolver"
  ],
  "trustedDependencies": [
    "sharp",
    "unrs-resolver"
  ]
}
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### `public/`

Static assets (not duplicated here): `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`. See the `public/` directory in the repository.

---

## Cross-cutting concerns

- **Environment:** `DATABASE_URL` is required for DB connectivity (see `database/index.ts`, `drizzle.config.ts`).
- **Path alias:** `@/` maps to the project root for imports across `app`, `components`, `lib`, and `database`.
- **Separation:** UI (`components/`) depends on **types** from `lib/entities`; **data access** stays in use cases + `database/`; **Next.js entry** for DI-style wiring is `app/actions.ts`.

---

## Version reference

Versions stated here match **`package.json`** at the time this document was written. After upgrades, reconcile this file with `package.json` if you rely on it for audits or onboarding.
