# Legalbos ERP
Multi-tenant ERP Legaltech impulsado con Next.js 15 (App Router), Prisma y ShadcnUI.

## Prerrequisitos
- Node.js 20+
- Docker (opcional, para base de datos local y Redis)
- Git

## Pasos para ejecutar en local

1. **Clonar e instalar dependencias:**
   ```bash
   cd legalbos
   npm install
   ```

2. **Levantar base de datos:**
   ```bash
   docker-compose up -d
   ```
   *(Si no utilizas Docker, asegúrate de tener una instancia de Postgres ejecutándose localmente).*

3. **Configurar el entorno:**
   Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   Ajusta los secretos si es necesario. Por defecto viene con la cadena de conexión compatible con `docker-compose`.

4. **Aplicar modelo de datos y generar DB:**
   ```bash
   npx prisma db push
   # Opcional si prefieres migraciones estrictas:
   # npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Lanzar en entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador. Deberás ver la pantalla de Login y podrás registrar un usuario provisional.

## Checklist de Seguridad y Compliance
- [x] Multi-tenant asegurado: Cada consulta valida el `tenantId`.
- [x] Middlewares robustos: Las vistas protegidas bloquean tráfico anónimo.
- [x] Contraseñas hasheadas: Integración con Bcrypt en credenciales o SSO (NextAuth).
- [x] Tabla de `AuditLog` creada para cumplimiento de RGPD y trazabilidad en expedientes y auth.

## Roadmap 🚀 (Siguientes Fases)
1. Conectar CRM de forma interactiva (Endpoints Server Actions / TRPC).
2. Sincronizar Inbox Unificado (IMAP/WhatsApp).
3. Migrar vectorizaciones de RAG legal hacia la base de psql (usando extensión `pgvector`).
