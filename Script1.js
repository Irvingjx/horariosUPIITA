const aulas01 = document.getElementById('aulas01');
const svgAulas1 = document.getElementById('Capa_aulas1')
const _102 = document.getElementById('_102');


document.getElementById('_120').style.opacity = '0.5';
document.getElementById('_110').style.opacity = '0.5';
document.getElementById('_100').style.opacity = '0.5';
document.getElementById('_101').style.opacity = '0.5';
document.getElementById('_111').style.opacity = '0.5';
document.getElementById('_112').style.opacity = '0.5';
document.getElementById('_113').style.opacity = '0.5';
document.getElementById('_114').style.opacity = '0.5';
document.getElementById('_115').style.opacity = '0.5';
document.getElementById('_116').style.opacity = '0.5';

// console.log(`Aulas`, _102);
let aulas = ['_102', '_103', '_104', '_105', '_106', '_121', '_122', '_123', '_124', '_125', '_126'];

// Cambiar el color de relleno (fill) a verde
// _102.style.fill = 'green';
let isDragging = false;
let startPositionX = 0;
let startPositionY = 0;

// Variables para aulas01
let scale = 1;
let translateX = 0;
let translateY = 0;

let dataM;
let dataP;

function redirect() {
    window.location.href = 'index.html'; // Reemplaza con la URL a la que quieres redirigir
}

document.getElementById('resetZoomButton').addEventListener('click', resetZoom);

function resetZoom() {
    // Restablecer escala y transformación a los valores iniciales
    scale = 1;
    translateX = 0;
    translateY = 0;
    aulas01.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}


aulas01.addEventListener('mousedown', (event) => {
    isDragging = true;
    startPositionX = event.clientX - translateX;
    startPositionY = event.clientY - translateY;
    aulas01.classList.add('dragging');
});

aulas01.addEventListener('mouseup', () => {
    isDragging = false;
    aulas01.classList.remove('dragging');
});

aulas01.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const currentX = event.clientX - startPositionX;
        const currentY = event.clientY - startPositionY;
        translateX = currentX;
        translateY = currentY;
        aulas01.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    }
});

// Evento de rueda para aulas01
aulas01.addEventListener('wheel', (event) => {
    // Escala y transformación aquí (sin event.preventDefault())
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.8, scale), 8);
    aulas01.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});







function agregarDes(pos,x,y,texto,textoM,textoP){
    const textoSVG = document.createElementNS("http://www.w3.org/2000/svg", "text");
    // const textoSVGM = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const fondoBlanco = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    fondoBlanco.setAttribute("x", x-22+4);
    fondoBlanco.setAttribute("y", y-46);
    fondoBlanco.setAttribute("width", "3%");
    fondoBlanco.setAttribute("height", "5%");
    fondoBlanco.setAttribute("rx", 4)
    fondoBlanco.setAttribute("fill", "#C4E6EF"); // Color de fondo blanco
    fondoBlanco.setAttribute("stroke", "black"); // Color del borde
    fondoBlanco.setAttribute("stroke-width", "1");
    svgAulas1.appendChild(fondoBlanco);

    textoSVG.setAttribute("x", x-11+21);
    textoSVG.setAttribute("y", y-32);
    //textoSVG.setAttribute("font-family", "Arial");
    textoSVG.setAttribute("text-anchor", "middle"); 
    textoSVG.setAttribute("font-size", "14");
    textoSVG.setAttribute("fill", "black");
    textoSVG.setAttribute("font-weight", "bold");
    textoSVG.textContent = texto; 
    svgAulas1.appendChild(textoSVG);


    
      // Dividir textoM en dos partes basadas en la longitud máxima permitida para la primera línea
    const maxLengthFirstLine = 20;
    let primeraParte = '';
    let segundaParte = '';

    if (textoM.length > maxLengthFirstLine) {
        let words = textoM.split(' ');
        let currentLineLength = 0;

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let wordLength = word.length;

            if (currentLineLength + wordLength <= maxLengthFirstLine) {
                primeraParte += word + ' ';
                currentLineLength += wordLength + 1;
            } else {
                segundaParte = words.slice(i).join(' ');
                break;
            }
        }

        // Eliminar el espacio en blanco adicional al final de la primera parte
        primeraParte = primeraParte.trim();
    } else {
        primeraParte = textoM;
    }


    // console.log(primeraParte);
    // console.log(segundaParte);

     // Crear y configurar el primer elemento <text> para la primera parte del texto
    const textoSVGM1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textoSVGM1.setAttribute("x", x +15);
    textoSVGM1.setAttribute("y", y + 37); // Ajusta la posición vertical según tus necesidades
    textoSVGM1.setAttribute("text-anchor", "middle");  
    textoSVGM1.setAttribute('class', 'resaltado'); 
    textoSVGM1.textContent = primeraParte;
    svgAulas1.appendChild(textoSVGM1);

    // Crear y configurar el segundo elemento <text> para la segunda parte del texto si existe
    if (segundaParte !== '') {
        const textoSVGM2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textoSVGM2.setAttribute("x", x + 15);
        textoSVGM2.setAttribute("y", y + 50); // Ajusta la posición vertical según tus necesidades
        textoSVGM2.setAttribute("text-anchor", "middle");    
        textoSVGM2.setAttribute('class', 'resaltado'); 
        textoSVGM2.textContent = segundaParte;
        svgAulas1.appendChild(textoSVGM2);
    }

    //Dividir nombre de profe.
    // Dividir textoM en dos partes basadas en la longitud máxima permitida para la primera línea
    const maxLengthFirstLine2 = 17;
    let primeraParte2 = '';
    let segundaParte2 = '';

    if (textoP.length > maxLengthFirstLine2) {
        let words = textoP.split(' ');
        let currentLineLength = 0;

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let wordLength = word.length;

            if (currentLineLength + wordLength <= maxLengthFirstLine2) {
                primeraParte2 += word + ' ';
                currentLineLength += wordLength + 1;
            } else {
                segundaParte2 = words.slice(i).join(' ');
                break;
            }
        }

        // Eliminar el espacio en blanco adicional al final de la primera parte
        primeraParte2 = primeraParte2.trim();
    } else {
        primeraParte2 = textoP;
    }


     // Crear y configurar el primer elemento <text> para la primera parte del texto
    const textoSVGM3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textoSVGM3.setAttribute("x", x +15);
    textoSVGM3.setAttribute("y", y + 35-47); // Ajusta la posición vertical según tus necesidades
    textoSVGM3.setAttribute("text-anchor", "middle");  
    textoSVGM3.setAttribute('class', 'resaltado'); 
    textoSVGM3.textContent = primeraParte2;
    svgAulas1.appendChild(textoSVGM3);

    // Crear y configurar el segundo elemento <text> para la segunda parte del texto si existe
    if (segundaParte2 !== '') {
        const textoSVGM4 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textoSVGM4.setAttribute("x", x + 15);
        textoSVGM4.setAttribute("y", y + 48-47); // Ajusta la posición vertical según tus necesidades
        textoSVGM4.setAttribute("text-anchor", "middle");      
        textoSVGM4.setAttribute('class', 'resaltado');    
        textoSVGM4.textContent = segundaParte2;
        svgAulas1.appendChild(textoSVGM4);
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    const fecha = new Date();
    let diaSemana = fecha.getDay();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaVi = 9;
    // diaSemana=2;
    // hora=22
    // minutos=30



    let horaC = hora + minutos / 60 + segundos / 3600;

    // Cargar todos los datos JSON
    Promise.all([
        fetch('aulasM.json').then(response => response.json()),
        fetch('aulasP.json').then(response => response.json()),
        fetch('aulasG.json').then(response => response.json())
    ])
    .then(([dataM, dataP, dataG]) => {
        if(horaC>=7 && horaC<8.5){
            horaVi=0;
        }else if((horaC>=8.5 && horaC<10)){
            horaVi=1;
        }else if((horaC>=10 && horaC<11.5)){
            horaVi=2;
        }else if((horaC>=11.5 && horaC<13)){
            horaVi=3;
        }else if((horaC>=13 && horaC<14.5)){
            horaVi=4;
        }else if((horaC>=14.5 && horaC<16)){
            horaVi=5;
        }else if((horaC>=16 && horaC<17.5)){
            horaVi=6;
        }else if((horaC>=17.5 && horaC<19)){
            horaVi=7;
        }else if((horaC>=19 && horaC<20.5)){
            horaVi=8;
        }
        // console.log(`Dia`, diaSemana); 
        if(diaSemana === 0 || diaSemana === 6 || horaC < 7 || horaC>22){
            for (let i = 0; i < 11; i++) {
                // let elemento = data[i][horaVi][3];
                let elementoHtml = document.getElementById(aulas[i]);
                elementoHtml.style.fill = 'gray';
            }
        }else{
            for (let i = 0; i < 11; i++) {
                let elemento = dataG[i][horaVi][diaSemana-1];
                let elementoM = dataM[i][horaVi][diaSemana-1];
                let elementoP = dataP[i][horaVi][diaSemana-1];
                // console.log(`La posición [${i}]${horaVi}${diaSemana-1} tiene el valor:`, elementoM);
                // let elementoP = dataP[i][horaVi][diaSemana-1];

                let elementoHtml = document.getElementById(aulas[i]);
                const bbox = elementoHtml.getBBox();
                const x = bbox.x + bbox.width / 2-15;
                const y = bbox.y - 5; 
                

                // console.log(`Aulas`, elementoHtml);
                if (elementoHtml) {
                    if (elemento === 'None' || typeof elemento === 'undefined') {
                        elementoHtml.style.fill = 'green';
                        console.log(`La posición [${i}]${horaVi}${diaSemana-1} es null o undefined. Cambiando color.`);
                    } else {
                        elementoHtml.style.fill = 'red';
                        console.log(`La posición [${i}]${horaVi}${diaSemana-1} tiene el valor:`, elemento);
                        agregarDes(bbox,x,y,elemento,elementoM,elementoP); //Agregar datos de aula
                    }
                } else {
                    console.log(`No se encontró el elemento con la ID ${aulas[i]}.`);
                }
            }
        }
        
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        
    });


});
