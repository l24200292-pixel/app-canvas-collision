const slider = document.getElementById("slider");
const valor = document.getElementById("valor");

// Sincronizar el texto del slider
slider.oninput = () => {
    valor.textContent = slider.value;
};

function crearCirculos(canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 200;

    // Usamos un objeto para que la referencia sea persistente
    let data = { list: [] };

    class Circle {
        constructor(id) {
            this.id = id;
            this.radius = Math.random() * 12 + 12; // Radio entre 12 y 24
            this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
            this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
            
            // Velocidad aleatoria
            this.dx = (Math.random() * 2 - 1) * 2;
            this.dy = (Math.random() * 2 - 1) * 2;
            
            this.color = "#00acc1"; // Azul cian (estilo cristal)
        }

        draw() {
            // Dibujar el círculo
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 5;
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.closePath();

            // Dibujar el número en el centro
            ctx.shadowBlur = 0; // Quitar sombra para el texto
            ctx.fillStyle = "white";
            ctx.font = "bold 13px Poppins, Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.id, this.x, this.y);
        }

        update() {
            // Rebote en bordes del canvas
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx *= -1;
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy *= -1;

            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function init() {
        data.list = [];
        for (let i = 0; i < slider.value; i++) {
            data.list.push(new Circle(i + 1));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data.list.forEach(c => c.update());
    }

    // Escuchar cambios en el slider para reiniciar
    slider.addEventListener("input", init);

    init();
    animate();

    return data;
}

// Iniciar Simulación 1
const circles1Data = crearCirculos(document.getElementById("canvas1"));