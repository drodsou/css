;(function(){
  
  const icons = {
    // paste the XXX in the `path d=XXX` of SVGs, eg from fontawesome/svgs/solid download or any other
    'arrow-right' : "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z",
    'forbidden' : "M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z",
  }

  
  const template = type => `
    <style>
      :host {
        display: inline-block;
        width: 1rem; /* mandatory for inline-block... */
        fill: var(--color-fg);
      }
    </style>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="${icons[type]}"/></svg>
  `;
  
  customElements.define("x-icon", class extends HTMLElement {

    constructor () {
      super();
      this.attachShadow({ mode : 'open' });
    }

    static get observedAttributes() { return ['type'] };
    
    attributeChangedCallback (attr, oldValue, newValue) {
      if (attr === 'type') {
        this.shadowRoot.innerHTML = template(newValue.toLowerCase());
      }
    }
  });


})();