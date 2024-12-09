function modtager(topic, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked); // Parse JSON-besked
    let afsenderen = modtagerBuffer.from; // Hent afsender-ID

if (afsenderen == "Stovsuger") {
      
      let positionX = modtagerBuffer.katX;
      let positionY = modtagerBuffer.katY;
      
      katX = map(modtagerBuffer.katX, 0, 1000, 0, width);
      katY = map(modtagerBuffer.katY, 0, 1000, 0, height);
      console.log("Hvid ellipse opdateret til:", katX, katY);
      
       //background(55, 150, 20);
      fill(255);
      ellipse(positionX, positionY, 20, 20);
      
} else if (afsenderen === "Mus") {
        if (modtagerBuffer.action === "move") {
            // Opdater musens position
            MusX = map(modtagerBuffer.MusX, 0, 1000, 0, width);
            MusY = map(modtagerBuffer.MusY, 0, 1000, 0, height);
            console.log("Musens position opdateret til:", MusX, MusY);
        } else if (modtagerBuffer.action === "shake") {
            // Generer støv ved musens position
            MusX = map(modtagerBuffer.MusX, 0, 1000, 0, width);
            MusY = map(modtagerBuffer.MusY, 0, 1000, 0, height);

             for (let i = 0; i < 30; i++) {
                shakeDustParticles.push({
                    x: MusX + random(-30, 30),
                    y: MusY + random(-30, 30),
                });
            }

            console.log("Støv genereret ved:", MusX, MusY);
        }
    } 

    

}
