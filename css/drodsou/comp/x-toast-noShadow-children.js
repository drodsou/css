;(function(){

  
  const cls = 'toast' + Math.random().toString().slice(2,6);

  customElements.define('x-toast', class extends HTMLElement {
    contentLoad() {
      // this.innerHTML = /*html*/`
      this.outerHTML = /*html*/`
      <style>
        .${cls} {
          padding: 20px;
          opacity: 1;
          transition: all 0.2s linear;
          position:fixed;
          bottom:0px;
          width:80vw;
          left:7.5vw;
          background: black;
          color: white;
          margin:0;
        }
        .${cls}.hidden {
          opacity: 0;
          bottom: -20px;
        }
      </style>
      <div class="${cls}">
        ${this.innerHTML}
      </div>
    `;
    }

    connectedCallback() {
      // const observer = new MutationObserver(muts=>{});
      // observer.observe(this, {childList: true});
      document.addEventListener('DOMContentLoaded', ()=>this.contentLoad() );

    }
        // <div class="${cls} hidden">

    // static get observedAttributes() { return  };
    
    // attributeChangedCallback (attrName, oldValue, newValue) {
    //   // first time, it triggers before element is initialized...    
    //   if (this.update) this.update();
    // }

    

  }); // define

})();
