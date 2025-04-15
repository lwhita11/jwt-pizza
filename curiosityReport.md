# Curiosity Report: Exploring Other Testing Frameworks

Landon Whitaker  

---

## 🧠 Why I Chose This Topic

In CS 329, we've used Jest tests, but there are more frameworks that can be used with different languages, use cases, and layers. I wanted to learn more about different frameworks that are used and what their strengths are.

---

## 🔍 Frameworks Researched

### 1. **Mocha**

- **Language:** JavaScript/Node.js  
- **Description:** Unlike Jest, Mocha is quite flexible. You can use your own assertion libraries or other assertion libraries.
- **Strengths:**
  - Very configurable
  - Easy to set up with custom or 3rd-party assertion libraries

---

### 2. **AVA**

- **Language:** JavaScript/Node.js  
- **Notes:** Very simple compared to Jest. It needs external libraries to mock unlike Jest
- **Strengths:**
  - Can be run asynchronously, improving performance
  - Simple syntax

---

### 3. **Cypress**

- **Language:** JavaScript (Browser/E2E)  
- **Notes** Cypress is designed to run applications in browsers like Chrome and Firefox. It has time travel debugging and automatic waits.
- **Strengths:**
  - Runs in a real browser
  - Also open-source

---

### 4. **Selenium**

- **Language:** Internal language, able to be used with any 
- **Notes:** Selenium is open source and has an internal language that allows it to be compatible with most common programming languages.
- **Strengths:**
  - Open Source

---

### 5. **pytest**

- **Language:** Python   
- **Notes:** pytest is very powerful because it is built as a python package. It easily can be used with other packages, but to do any mockings also needs to use other packages. It is not the most standalone like Jest, but has a wide range of tests that it can do.
- **Strengths:**
  - Python syntax
  - Well documented support

---

## 🧩 Key Takeaways

- Jest is a great tool, but there are other tools that can be used for specific purposes that may fit the needs better.
- Selecting a framework usually depends on the specific needs and application that you are running.
- Many testing frameworks focus on developer experience and ensuring ease of use.
- Understanding more frameworks helps us build better apps because you can use different tools depending on the specific apps you want to build and how you build them.

---
