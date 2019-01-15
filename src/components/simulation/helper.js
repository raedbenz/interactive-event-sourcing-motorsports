
export const generateSpeeds = () => {
    var speed1 = Math.floor((Math.random() * 201) + 300);    //300-500
    var speed2 = Math.floor((Math.random() * 151) + 150);    //150-300
    var speed3 = Math.floor((Math.random() * 201) + 300);    //300-500

    return [speed1, speed2, speed3];
}