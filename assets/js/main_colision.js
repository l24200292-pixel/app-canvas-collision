const canvas2 = document.getElementById("canvas2");
// Obtenemos la referencia dinámica
let circles2Data = crearCirculos(canvas2);

function detectarColisionesSimple() {
    let lista = circles2Data.list; // Siempre lee la lista actualizada
    
    lista.forEach(c => c.color = "#00acc1"); // Color base (cian para el diseño claro)

    for (let i = 0; i < lista.length; i++) {
        for (let j = i + 1; j < lista.length; j++) {
            let c1 = lista[i];
            let c2 = lista[j];

            let dx = c1.x - c2.x;
            let dy = c1.y - c2.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < c1.radius + c2.radius) {
                c1.color = "#ff5252"; // Rojo vibrante
                c2.color = "#ff5252";
            }
        }
    }
}

function animate2() {
    detectarColisionesSimple();
    requestAnimationFrame(animate2);
}

animate2();