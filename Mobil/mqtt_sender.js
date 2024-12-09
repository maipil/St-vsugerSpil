function sender(katX, katY) {
  besked = {
    from:"Stovsuger", 
    katX:katX,
    katY: katY,
    
  };
   client.publish(topic, JSON.stringify(besked));
}
