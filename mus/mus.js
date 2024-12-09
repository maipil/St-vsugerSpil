let MusX, MusY;
let shakeThreshold = 15; // Tærskel for rystning
let lastShakeTime = 0; // Debounce-tid for rystning
let mouseSound; // Lyd til musens bevægelse
let sensorsActivated = false; // Status for sensorer

function preload() {
    // Indlæs lydfil
    mouseSound = loadSound("muslyd.wav", 
        () => console.log("Lydfil indlæst korrekt"), 
        (err) => console.error("Fejl ved indlæsning af lyd:", err)
    );
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Tilføj aktiveringsknap
    let activateButton = createButton("Klik for at aktivere lyd og sensorer");
    activateButton.position(width / 2 - 100, height / 2);
    activateButton.mousePressed(() => {
        activateSensors();
        userStartAudio(); // Aktiver lydkonteksten
        activateButton.hide(); // Skjul knappen
        sensorsActivated = true;
        console.log("Lyd og sensorer aktiveret");
    });
}

function draw() {
    background(55, 150, 20);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    if (!sensorsActivated) {
        text("Klik for at aktivere lyd og sensorer!", width / 2, height / 2 + 40);
    } else {
        text("Træk eller ryst mobilen!", width / 2, height / 2);
    }
}

// Når brugeren trækker fingeren
function mouseDragged() {
  
    if (!mouseSound.isPlaying()) {
      mouseSound.play();
      mouseSound.setVolume(0.5); // Sæt lydstyrken
      console.log("Musik spiller");
  }
MusX = map(mouseX, 0, width, 0, 1000);
  MusY = map(mouseY, 0, height, 0, 1000);
  sender("move", MusX, MusY); // Send musens bevægelse

 return false; // Forhindrer standard browseradfærd
}


// Anmod om tilladelse til bevægelsessensorer
function activateSensors() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                    console.log("Bevægelsessensor tilladt");
                    window.addEventListener("devicemotion", handleDeviceMotion);
                } else {
                    console.log("Bevægelsessensor nægtet");
                }
            })
            .catch(console.error);
    } else {
        console.log("Bevægelsessensorer understøttes ikke på denne enhed");
    }
}

// Håndter rystning
function handleDeviceMotion(event) {
    let acc = event.acceleration;
    if (acc) {
        let totalAcceleration = Math.sqrt(
            Math.pow(acc.x || 0, 2) +
            Math.pow(acc.y || 0, 2) +
            Math.pow(acc.z || 0, 2)
        );

        if (totalAcceleration > shakeThreshold) {
            let currentTime = millis();
            if (currentTime - lastShakeTime > 500) { // 500ms debounce
                lastShakeTime = currentTime;
                handleShake();
            }
        }
    }
}

function handleShake() {
    console.log("Rystning registreret!");
    sender("shake", MusX || random(width), MusY || random(height)); // Send rystebesked
}
