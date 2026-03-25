const canvas3 = document.getElementById("canvas3");
let circles3Data = crearCirculos(canvas3);

function detectarColisionesRebote() {
    let lista = circles3Data.list;

    lista.forEach(c => c.color = "#00acc1");

    for (let i = 0; i < lista.length; i++) {
        for (let j = i + 1; j < lista.length; j++) {
            let c1 = lista[i];
            let c2 = lista[j];

            let dx = c2.x - c1.x;
            let dy = c2.y - c1.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let suma = c1.radius + c2.radius;

            if (dist < suma) {
                c1.color = "#ff5252";
                c2.color = "#ff5252";

                // Cálculo de rebote (Normalización)
                let nx = dx / dist;
                let ny = dy / dist;

                // Intercambio de velocidades basado en vectores
                let p = 2 * (c1.dx * nx + c1.dy * ny - c2.dx * nx - c2.dy * ny) / 2;

                c1.dx -= p * nx;
                c1.dy -= p * ny;
                c2.dx += p * nx;
                c2.dy += p * ny;

                // Prevenir que se queden pegados (Separación técnica)
                let overlap = suma - dist;
                c1.x -= (overlap / 2) * nx;
                c1.y -= (overlap / 2) * ny;
                c2.x += (overlap / 2) * nx;
                c2.y += (overlap / 2) * ny;
            }
        }
    }
}

function animate3() {
    detectarColisionesRebote();
    requestAnimationFrame(animate3);
}

animate3();