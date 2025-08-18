import { cpus } from "os";

const cpuCount = cpus().length;
console.log(`Número de CPUs disponibles: ${cpuCount}`);

for (let i = 0; i < cpuCount; i++) {
    console.log(`Iniciando proceso N° ${i + 1} CPU ${i + 1}`);
}