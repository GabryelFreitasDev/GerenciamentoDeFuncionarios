Criar um arquivo .env na pasta backend e colar o seguinte codigo:

DATABASE_URL="postgresql://postgres:123@localhost:5432/gerenciamento?schema=public"

comandos (que anotei)
//backend
npm add express-async-errors
npm add cors
npm add @types/cors
npm add prisma
npm add @prisma/client
npx prisma init
npm add bcryptjs 
npm add @types/bcryptjs 

npm prisma migrate dev (gerar migrations)

//frontend
npm add sass
npm add react-icons

npm run dev pra rodar