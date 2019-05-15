```javascript
npm install npm@latest -g 
npm install npm
```

Notes (https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows)
 - install at C:\Program Files\nodejs
 - set execution policy via powershell
 - ```unix cd "<insert path wrapped in quotes"```
 - ```powershell Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force```

- What is a 'non-root public URL'? 
- added react development tools from google store
- What is a pure component and how does this relate to shouldComponentUpdate() and how does this optimize performance
- why do we wrap return in () instead of return {}
- how best to debug or see call-stack in react?

-  code passed to render method using js variables, render returns description to react, react renders html based on jsx/code
- state is private to a component but using props lets components
inherit values(aka props) from parent component (passing down props from parent to child)
- immutability of data structures allows for data history tracking
    - concept here is that copying data, rather than changing in place is preferable

    "Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object to be compared to previous copies of itself and the entire object tree to be traversed."

- Lifting state into different components is critical, who manages state, which functional components just render

- key is a special and reserved property in React (along with ref, a more advanced feature). 