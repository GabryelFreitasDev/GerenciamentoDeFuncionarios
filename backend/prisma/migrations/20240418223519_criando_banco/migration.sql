-- CreateTable
CREATE TABLE "empresa" (
    "idempresa" TEXT NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "endereco" VARCHAR(200),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("idempresa")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" TEXT NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200),
    "senha" VARCHAR(100) NOT NULL,
    "idempresa" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "departamento" (
    "iddepartamento" TEXT NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("iddepartamento")
);

-- CreateTable
CREATE TABLE "cargo" (
    "idcargo" TEXT NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "salariobase" DECIMAL(18,5) NOT NULL,
    "iddepartamento" TEXT NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("idcargo")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "idfuncionario" TEXT NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "idcargo" TEXT NOT NULL,
    "categoria" INTEGER NOT NULL,
    "dataadmissao" DATE NOT NULL,
    "idusuariocadastro" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("idfuncionario")
);

-- CreateTable
CREATE TABLE "beneficios" (
    "idbeneficio" TEXT NOT NULL,
    "valetransporte" DECIMAL(18,5),
    "valealimentacao" DECIMAL(18,5),
    "salariofamilia" DECIMAL(18,5),
    "auxiliocreche" DECIMAL(18,5),
    "diariasparaviagens" DECIMAL(18,5),
    "descansoremunerado" DECIMAL(18,5),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "beneficios_pkey" PRIMARY KEY ("idbeneficio")
);

-- CreateTable
CREATE TABLE "adicionais" (
    "idadicional" TEXT NOT NULL,
    "periculosidade" DECIMAL(18,5),
    "noturno" DECIMAL(18,5),
    "insalubridade" DECIMAL(18,5),
    "tempodeservico" DECIMAL(18,5),
    "valorhorasextras" DECIMAL(18,5),
    "adiantamento" DECIMAL(18,5),
    "percentualcomissao" DECIMAL(18,5),
    "comissao" DECIMAL(18,5),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adicionais_pkey" PRIMARY KEY ("idadicional")
);

-- CreateTable
CREATE TABLE "horas" (
    "idhorastrabalhadas" TEXT NOT NULL,
    "horastrabalhadas" TIME,
    "horasausentes" DECIMAL(18,5),
    "horasextras" DECIMAL(18,5),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horas_pkey" PRIMARY KEY ("idhorastrabalhadas")
);

-- CreateTable
CREATE TABLE "descontos" (
    "iddesconto" TEXT NOT NULL,
    "inss" DECIMAL(18,5),
    "fgts" DECIMAL(18,5),
    "irrf" DECIMAL(18,5),
    "valorhorasausentes" DECIMAL(18,5),
    "contribuicaosindical" DECIMAL(18,5),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "descontos_pkey" PRIMARY KEY ("iddesconto")
);

-- CreateTable
CREATE TABLE "folhapagamento" (
    "idfolhapagamento" TEXT NOT NULL,
    "idfuncionario" TEXT NOT NULL,
    "idbeneficios" TEXT NOT NULL,
    "idadicionais" TEXT NOT NULL,
    "iddescontos" TEXT NOT NULL,
    "idhorastrabalhadas" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folhapagamento_pkey" PRIMARY KEY ("idfolhapagamento")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_idempresa_fkey" FOREIGN KEY ("idempresa") REFERENCES "empresa"("idempresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_iddepartamento_fkey" FOREIGN KEY ("iddepartamento") REFERENCES "departamento"("iddepartamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_idusuariocadastro_fkey" FOREIGN KEY ("idusuariocadastro") REFERENCES "usuario"("idusuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_idcargo_fkey" FOREIGN KEY ("idcargo") REFERENCES "cargo"("idcargo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folhapagamento" ADD CONSTRAINT "folhapagamento_idfuncionario_fkey" FOREIGN KEY ("idfuncionario") REFERENCES "funcionario"("idfuncionario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folhapagamento" ADD CONSTRAINT "folhapagamento_idbeneficios_fkey" FOREIGN KEY ("idbeneficios") REFERENCES "beneficios"("idbeneficio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folhapagamento" ADD CONSTRAINT "folhapagamento_idadicionais_fkey" FOREIGN KEY ("idadicionais") REFERENCES "adicionais"("idadicional") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folhapagamento" ADD CONSTRAINT "folhapagamento_iddescontos_fkey" FOREIGN KEY ("iddescontos") REFERENCES "descontos"("iddesconto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folhapagamento" ADD CONSTRAINT "folhapagamento_idhorastrabalhadas_fkey" FOREIGN KEY ("idhorastrabalhadas") REFERENCES "horas"("idhorastrabalhadas") ON DELETE RESTRICT ON UPDATE CASCADE;
