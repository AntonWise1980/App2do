# Todo App
This application is a "to do app" program. Some people may also refer to this program as a Shopping List. While developing the program, I benefited from Bradley Traversy's tutorial. However, 
I implemented a few missing functions that I noticed during development myself. Simple. Fast. Offline. Built with pure JavaScript.
Anton Wise,
2025

# 🚀 To-Do App (Live Demo)

[![Live App](https://img.shields.io/badge/📱_Live_Demo-Open_App-success?style=for-the-badge&logo=github)](https://antonwise1980.github.io/App2do/)
[![User Guide](https://img.shields.io/badge/📚_User_Guide-Read_Docs-blue?style=for-the-badge&logo=github)](https://antonwise1980.github.io/App2do/docs/)

# Documentation
[![To-Do App Documentation](https://img.shields.io/badge/Docs-ToDo_App_User_Guide-blue?style=for-the-badge&logo=github)](https://antonwise.github.io/App2do/docs/index.html)

## Features

| Feature | Description |
|--------|-------------|
| **Add / Edit / Delete** | Full CRUD functionality |
| **Cancel Button (in Edit Mode)** | Back out of edits safely |
| **15-Character Limit** | Prevents overly long entries |
| **Live Character Counter** | Real-time feedback: `0 / 15` |
| **Escape to Cancel** | Fast keyboard cancellation |
| **Enter to Submit** | Quick item addition |
| **Live Filtering** | Search list instantly |
| **LocalStorage Persistence** | List survives page refresh |
| **Case-Insensitive** | "Milk" = "milk" |
| **Duplicate Prevention** | Can't add the same item twice |
| **Visual Edit Mode** | Edited item turns gray, button turns green |
| **Clear All** | Remove all items with one click |

### 📂 Klasör Yapısı
/App2do
├── index.html       ← Ana uygulama
├── docs/
│   └── index.html   ← Kullanıcı kılavuzu
└── README.md

## Technologies

- **HTML5**
- **CSS3** (Flexbox, modern styling)
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** (icons)
- **LocalStorage** (persistent storage)

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/AntonWise1980/App2do

2. Open index.html in your browser.

No internet required — works 100% offline.

## Usage

| Action             | How to Do It                                                                 |
|--------------------|------------------------------------------------------------------------------|
| **Add Item**       | Type in the input field → Press `Enter` or click **Add Item**                |
| **Edit Item**      | Click on any item in the list                                                |
| **Update Item**    | Modify the text → Press `Enter` or click **Update Item**                     |
| **Cancel Edit**    | Click **Cancel** button or press `Escape`                                    |
| **Delete Item**    | Click the **×** icon next to the item                                        |
| **Filter List**    | Type in the **Filter Items** box to search instantly                         |
| **Clear All**      | Click **Clear All** button (visible only when list has items)                |
| **Keyboard Tips**  | `Enter` = Submit • `Escape` = Cancel Edit • `Click` = Edit Item             |

## License

This project is licensed under the **[MIT License](LICENSE)** - see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)



## Lessons Learned
I got some hands-on experience working with plain JavaScript. I learned how to revert any element back to its original state after changing it with Vanilla Script.

I revisited functions and got to experiment with reusing them through callbacks.

I worked with event handlers and observed which functions run when they get triggered and in what order.

I got the hang of accessing DOM elements’ properties and targeting elements using Parent and Child relationships.

Lastly, I understood the importance of HTML structure and CSS classes for JavaScript.