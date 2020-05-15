els = document.getElementsByClassName("bubbly-b");

// Loop through all the elements on the page with the class of 'bubbly-b'
// You can change the class-name above if you want to use a different class-name
for(i = 0; i < els.length; i++) {
    el = els[i];

    // Let's get some data to work with
    width = 1*el.getAttribute("width");
    height = 1*el.getAttribute("height");
    radius = 1*el.getAttribute("radius");
    angle = 1*el.getAttribute("angle");
    offset = 1*el.getAttribute("offset");

    // Clean up the element, gotta look good when inspecting
    el.removeAttribute("width");
    el.removeAttribute("height");
    el.removeAttribute("radius");
    el.removeAttribute("angle");
    el.removeAttribute("offset");

    // Didn't set any values? No problem. I got your back
    if (width === 'auto' || !width) {
        // If left alone, width will be automatic
        width = el.offsetWidth;
    }
    if (height === 'auto' || !height) {
        // If left alone, height will be automatic
        height = el.offsetHeight;
    }
    if (radius === 'auto' || !radius) {
        // This is a default value. I think it looks good
        radius = Math.min(width, height)/6;
    }
    if (angle === 'auto' || !angle) {
        // Settings this parameter to a third of the radius seems to look the best to me
        angle = radius/3;
    }
    if (offset === 'auto' || !offset) {
        // This value has to be higher than or equal to the angle to avoid hidden overflow
        offset = angle;
    }

    // Top left corner
    var TLX = offset+radius;
    var TLY = offset+radius;

    // Top right corner
    var TRX = width-offset-radius;
    var TRY = offset+radius

    // Bottom right corner
    var BRX = width-offset-radius;
    var BRY = height-offset-radius;

    // Bottom left corner
    var BLX = offset+radius;
    var BLY = height-offset-radius;

    // Setting up the cubic bezier thingies
    var C1 = 2*angle;
    var C2 = angle/2;

    // Let's make some puffy paths
    path = "M " + (TLX-radius) + " " + TLY + " ";
    // Top left corner and top side
    path += "C " + (TLX-radius+C2) + " " + (TLY-C1) + " " + (TLX-C1) + " " + (TLY-radius+C2) + " " + (TLX) + " " + (TLY-radius) + " ";
    path += "C " + (TLX+C1) + " " + (TLY-radius-C2) + " " + (TRX-C1) + " " + (TRY-radius-C2) + " " + (TRX) + " " + (TRY-radius) + " ";
    // Top right corner and right side
    path += "C " + (TRX+C1) + " " + (TRY-radius+C2) + " " + (TRX+radius-C2) + " " + (TRY-C1) + " " + (TRX+radius) + " " + (TLY) + " ";
    path += "C " + (TRX+radius+C2) + " " + (TRY+C1) + " " + (BRX+radius+C2) + " " + (BRY-C1) + " " + (TRX+radius) + " " + (BRY) + " ";
    // 3. Bottom right corner and bottom side
    path += "C " + (BRX+radius-C2) + " " + (BRY+C1) + " " + (BRX+C1) + " " + (BRY+radius-C2) + " " + (BRX) + " " + (BRY+radius) + " ";
    path += "C " + (BRX-C1) + " " + (BRY+radius+C2) + " " + (BLX+C1) + " " + (BLY+radius+C2) + " " + (BLX) + " " + (BLY+radius) + " ";
    // 4. Bottom left corner and left side
    path += "C " + (BLX-C1) + " " + (BLY+radius-C2) + " " + (BLX-radius+C2) + " " + (BLY+C1) + " " + (BLX-radius) + " " + (BLY) + " ";
    path += "C " + (BLX-radius-C2) + " " + (BLY-C1) + " " + (TLX-radius-C2) + " " + (TLY+C1) + " " + (TLX-radius) + " " + (TLY) + " ";

    // Now, tell the DOM to do it's thing
    el.innerHTML += '<svg width="' + width + '" height="' + height + '"><path d="' + path + '" /></svg>';
    el.style.setProperty('width', width + "px");
    el.style.setProperty('height', height + "px");
}
