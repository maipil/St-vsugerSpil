let katX = null;
let katY = null;
let MusX = null;
let MusY = null;

//billeder
let kat;
let mus;
let baggrund;

let dustParticles = []; // Liste over støvkorn
let maxDustParticles = 400; // Maksimum antal støvkorn
let shakeDustParticles = []; // Liste over støvkorn genereret ved rystning
let maxShakeDustParticles = 400; // Maksimum antal rystede støvkorn

function preload() {
  kat = loadImage("foto/kat.png");
 mus = loadImage("foto/musse.png");
 baggrund = loadImage("foto/Baggrund.jpg");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(baggrund);
}


function draw() {
   background(baggrund);
   
   
    // Tegn støvkornene
    fill(200); // Grå farve til støvkorn
    noStroke(); // Fjern kant
    for (let i = 0; i < dustParticles.length; i++) {
        let dust = dustParticles[i];
        ellipse(dust.x, dust.y, 10, 10); // Tegn støvkorn som små cirkler
    }

    // Tilføj nye støvkorn gradvist
    if (dustParticles.length < maxDustParticles && frameCount % 10 === 0) {
        dustParticles.push({
            x: random(width),
            y: random(height),
        });
    }
    
    // Tegn rystede støvkorn
    fill(255, 0, 0); // Rød farve til rystede støvkorn
    for (let i = 0; i < shakeDustParticles.length; i++) {
        let dust = shakeDustParticles[i];
        ellipse(dust.x, dust.y, 10, 10);
    }
    
    
   
   
   
   
  
if (katX !== null && katY !== null) {
        image(kat, katX, katY, 100, 100); // Tegn katten (50x50 størrelse)

        // Fjern støvkorn tæt på katten
        dustParticles = dustParticles.filter((dust) => {
            let d = dist(katX + 25, katY + 25, dust.x, dust.y); // Midten af kattens billede
            return d > 30; // Fjern støvkorn inden for 30 pixels
        }); 
        
          shakeDustParticles = shakeDustParticles.filter((dust) => {
            return dist(katX, katY, dust.x, dust.y) > 15;
        });
        
    }

    // Tegn den sorte ellipse, hvis positionen er sat
    if (MusX !== null && MusY !== null) {
       image(mus, MusX, MusY, 100, 100);
    }
    
    if(katX !== null && katY !== null && MusX !== null && MusY !== null) {
      //tjek kollision, når alle positioner er defineret 
      if(Math.abs(katX - MusX) < 100 && Math.abs(katY - MusY) < 100)  {
        console.log("katten og mussen rører hinanden");
        background(255,0,0); 
      }
 
    }
}
