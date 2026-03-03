import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultPhases = [
    "Nuevo",
    "Pendiente de documentación",
    "En estudio",
    "Pendiente de estrategia",
    "En negociación",
    "En vía extrajudicial (MASC)",
    "Demandado / presentado",
    "En tramitación",
    "Pendiente de señalamiento",
    "En prueba",
    "Pendiente de juicio",
    "Visto para sentencia",
    "Resuelto",
    "Recurrido",
    "En ejecución",
    "Cerrado",
    "Archivado"
];

async function main() {
    console.log('Buscando tenants existentes para inyectar fases por defecto...');
    const tenants = await prisma.tenant.findMany();

    for (const tenant of tenants) {
        console.log(`Inyectando fases en tenant: ${tenant.name} (${tenant.id})`);

        // We do it sequentially to preserve order index correctly
        for (let i = 0; i < defaultPhases.length; i++) {
            const phaseName = defaultPhases[i];

            await prisma.casePhase.upsert({
                where: {
                    name_tenantId: {
                        name: phaseName,
                        tenantId: tenant.id
                    }
                },
                update: {
                    order: i
                },
                create: {
                    name: phaseName,
                    order: i,
                    tenantId: tenant.id
                }
            });
        }
    }

    console.log('✅ Fases por defecto inyectadas correctamente en todos los tenants.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
