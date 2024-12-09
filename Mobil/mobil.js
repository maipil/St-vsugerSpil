let katX, katY;
let mic; // Mikrofon
let soundThreshold = 0.01; // Tærskel for lydniveau
let microphoneActivated = false; // Om mikrofonen er aktiveret
let baggrund;

function preload(){
 baggrund = loadImage("foto/catBackground.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    

    // Opret en knap til at aktivere mikrofonen
    let activateMicButton = createButton("Aktiver mikrofon");
    activateMicButton.position(width / 2 - 50, height / 2);
    activateMicButton.mousePressed(() => {
        getAudioContext().resume().then(() => {
            mic = new p5.AudioIn();
            mic.start();
            microphoneActivated = true;
            console.log("Mikrofon aktiveret");
            activateMicButton.hide(); // Skjul knappen efter aktivering
        }).catch((error) => {
            console.error("Fejl ved aktivering af mikrofon:", error);
        });
    });
}

function draw() {
    background(baggrund);

    if (microphoneActivated) {
        // Læs lydniveauet
        let soundLevel = mic.getLevel();

        // Feedback til brugeren
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(`Lydniveau: ${soundLevel.toFixed(2)}`, width / 2, height - 50);

        if (soundLevel > soundThreshold) {
            text("Katten er aktiv!", width / 2, height / 2);
        } else {
            text("Lav lyd for at aktivere katten!", width / 2, height / 2);
        }
    } else {
        // Vis besked, hvis mikrofonen ikke er aktiveret
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Klik på knappen for at aktivere mikrofonen!", width / 2, height / 2);
    }
}

function mouseDragged() {
    katX = map(mouseX, 0, width, 0, 1000);
    katY = map(mouseY, 0, height, 0, 1000);

    if (microphoneActivated) {
        let soundLevel = mic.getLevel();

        // Kun send data, hvis lydniveauet er over tærsklen
        if (soundLevel > soundThreshold) {
            console.log("Sender data:", katX, katY);
            sender(katX, katY);
        } else {
            console.log("Ingen data sendt, lydniveau for lavt.");
        }
    } else {
        console.log("Mikrofon ikke aktiveret. Ingen data sendt.");
    }

    return false; // Forhindrer standard browseradfærd
}
