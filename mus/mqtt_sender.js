function sender(action, MusX, MusY) {
    besked = {
     from: "Mus",        // Identifikation af afsender
        action: action,     // Handlingstype: "move" eller "shake"
        MusX: MusX || 0,    // X-koordinat
        MusY: MusY|| 0, 
    
  };
   client.publish(topic, JSON.stringify(besked));
}
