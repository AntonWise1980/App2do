# Grocery App
This application is a "to do app" program. Some people may also refer to this program as a Shopping List. While developing the program, I benefited from Bradley Traversy's tutorial. However, 
I implemented a few missing functions that I noticed during development myself.

The features I added are as follows: 

## Features
- Add / Edit / Delete
- Cancel button
- Character limit + timer
- Enter & Escape shortcuts
- Filtering (real-time)
- LocalStorage
- Responsive

1- In the original training, there was no cancel button for when you wanted to change an item on the to-do list.
I added a cancel button, allowing you to return to the beginning by clicking the cancel button if you decide to back out.

2- I wanted to limit the number of characters that can be entered in a field. This way, 
in case a very long item is entered, I was able to alert the user using the alert function. 

3- I added a new class named btn2 for the Cancel button in my CSS class. 

4- In the HTML part, I added my button with the btn2 ID next to the same button so that it is inline. 
This way, I can reach it from CSS and adjust its design. More importantly, by setting the Display property to "none" or "inline," 
I can target this feature from the JS code and toggle it between active/inactive. 
In VanillaJS, I reverted whatever I changed back to its original state.

Anton Wise,
2025

## Demo
https://not2do.netlify.app/

## Features
- Cancel button.
- Filter list.
- Control input value.
- Local Storage.
- Netlify online.

![Logo](https://not2do.netlify.app/images/ss.png)

## Lessons Learned
I got some hands-on experience working with plain JavaScript. I learned how to revert any element back to its original state after changing it with Vanilla Script.

I revisited functions and got to experiment with reusing them through callbacks.

I worked with event handlers and observed which functions run when they get triggered and in what order.

I got the hang of accessing DOM elements’ properties and targeting elements using Parent and Child relationships.

Lastly, I understood the importance of HTML structure and CSS classes for JavaScript.