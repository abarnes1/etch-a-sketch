This is the Etch-A-Sketch project create as part of The Odin Project.

More time was spent on figuring out box shadows than writing javascript, but the end result was worth it.  After realizing a shadow rotates with its element I had to do some work with transparent elements to make the knob shadows look right as the knobs rotate.  That was a chore but the end result is worth the effort.

I worked with adding events through javascript even though this page is mainly concerned with the "click" event.  I even got to experience (and resolve) a page that looks very different in Chrome vs. Firefox due to default browser values in css.

One area that I think could use some improvement are the click events on the brush buttons.  There is probably a way to do what each event now does separately in a common function.  Right now adding more brushes would not be very fun since similar logic must be propogated several times in different button click events.

Another issue that I've been able to resolve so far is clicking and holding while on a grid line wants to drag the grid rather than act like a "normal" click that starts drawing.  It's minor but noticeable when there are more gridlines from a higher grid size.


