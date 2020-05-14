# Bubbly Buttons
Bored of normal border-radius? 
Here's a simple way to generate a more joyful box.

<img src="images/buttons.png?raw=true" width="300px">

## Inspiration
I was one day scrolling through the feed of dribbble and found these button. They weren't normal buttons. They had a border radius, that much was obvious, but they had something more. This left me wondering. Can I make these myself using CSS?

After doing some research I found that I couldn't make them with CSS. Atleast not according to my understanding. 

Next up was SVG Paths, and they seemed to be a promising workaround. Please let me know if there is another way.

## Prototype
I would like to give a huge thanks to [Anthony Dugois](https://codepen.io/anthonydugois/) for making the [SVG Path Builder](https://codepen.io/anthonydugois/pen/mewdyZ). 

I reached the result I wanted with the path tool.

<img src="images/SVG Path Builder.png?raw=true" width="300px">

Just copying the code from the tool and pasting it in an SVG is easy. 
But what if we want it to have a different size?

> That's easy, just move the 24 points in the tool and copy/paste. 

This becomes a bit annoying after a while. Not sustainable. I started thinking about making a tool to generate these for me, that would ease the process a bit. 
But then I thought:
> Nah, there has to be a better way.

And there was.

## The script
It resultet in me writing a script you easily can import to your projects.
You don't even need to write the SVG-tag. Just import the script and add like six lines of CSS.

Simply add an element with the class `bubbly-b`. This can be on a button, a box or whatever you want. You'll see me call it `button` in the script, but that doesn't matter. It's just a variable.

```html
<a href="#" class="bubbly-b">I'm Bubbly!</a>
```
...and the script generates something like:
```html
<a href="#" class="bubbly-b" style="width: 143px; height: 72px;">
  I'm bubbly!
  <svg width="143" height="72">
     <path d="M 4 16 C 6 8 8 6 16 4 C 24 2 119 2 127 4 C 135 6 137 8 139 16 C 141 24 141 48 139 56 C 137 64 135 66 127 68 C 119 70 24 70 16 68 C 8 66 6 64 4 56 C 2 48 2 24 4 16 ">
     </path>
  </svg>
</a>
```

In this example I've used an anchor tag with some text. Since I didn't tell the link which size it should have the script makes sure it keeps its dimensions. If you want to override the automatic behaviour, have a look at the parameters below.

It wasn't my intention, buy you can make some funky looking shapes with this.

<img src="images/funky.png" width="100%">

To get these results, I've modified a few parameters.
These are:
```html
<a href="#" class="bubbly-b"
   width=""
   height=""
   radius=""
   offset=""
   angle=""
   ></a>
```

1. Width, automatic if left out or empty. Can be overridden.

2. Height, automatic if left out or empty. Can be overridden.

3. Radius is pretty straight forward. There's a default of 1/6th of the minimum between width and height. Can be overridden.

2. Offset is there to accomodate for SVG and the overflow cutting off. This is handled automatically, but I've added a way to override it.

3. This one modifies the cubic-bezier part of the SVG Paths. When the other parameters are "normal" this one behaves. I cannot be held accountable for what happens when parameters are abused. 

That's pretty much it. 

## Here's the code

### Javascript

```javascript
buttons = document.getElementsByClassName("bubbly-b");

// Loop through all the buttons on the page
for(i = 0; i < buttons.length; i++) {
    button = buttons[i];

    // Let's get some data to work with
    width = 1*button.getAttribute("width");
    height = 1*button.getAttribute("height");
    radius = 1*button.getAttribute("radius");
    angle = 1*button.getAttribute("angle");
    offset = 1*button.getAttribute("offset");

    // Clean up the anchor-tag, gotta look good when inspecting
    button.removeAttribute("width");
    button.removeAttribute("height");
    button.removeAttribute("radius");
    button.removeAttribute("angle");
    button.removeAttribute("offset");

    // Didn't set any values? No problem. I got your back
    if (width === 'auto' || !width) {
        // If left alone, width will be automatic
        width = button.offsetWidth;
    }
    if (height === 'auto' || !height) {
        // If left alone, height will be automatic
        height = button.offsetHeight;
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

    // Let's make some bubbly paths
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
    button.innerHTML += '<svg width="' + width + '" height="' + height + '"><path d="' + path + '" /></svg>';
    button.style.setProperty('width', width + "px");
    button.style.setProperty('height', height + "px");
}
```

### CSS

These are the essential styles needed to make this work. 

```css
.bubbly-b {
	display: inline-block;
	position: relative;
}
.bubbly-b svg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
```

## Conclusions
It's been a fun day.
If you have any thoughts or suggestions, please let me know.

Feel free to use this in your projects.
If you decide to use it, please send me a link.

Take care!
