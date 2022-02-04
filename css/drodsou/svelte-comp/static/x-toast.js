;(function(){

  customElements.define( 'x-toast', class extends HTMLElement {   
    constructor() { 
      super();

      this._queue = [];

      this.attachShadow({ mode : 'open' });
      this.shadowRoot.innerHTML = /*html*/`
        <style>
          :host {
            transition: all 0.2s linear;
            position:fixed;
            width:80vw;
            left:7.5vw;
            background-color: black;
            color: white;
            margin:0;
            overflow: hidden;
            display:flex;
            justify-content: center;
            align-items: center;
            padding: 0px;
            height: 3rem;

            /* initially hidden */
            bottom: -3rem;  /* same as height */
            opacity: 0;
          }

          :host(.visible) {
            opacity: 1;
            bottom: 0px;
          }

        </style>
        <div id="show"></div>
      `;

    }

    async _showNext() {
      let host = this.shadowRoot.host;
      let div = this.shadowRoot.querySelector(`#show`);
      if (!this._queue.length) { 
        // hide
        host.classList.remove('visible');
        div.innerHTML = '';
        return 
      };
            
      // show
      div.innerHTML = this._queue[0];
      host.classList.add('visible');
      await new Promise(res=>setTimeout(res, 
        parseInt(this.getAttribute("timeout") || "1000")
      ));
      host.classList.remove('visible');
      await new Promise(res=>setTimeout(res, 300)); 
      this._queue.shift();
      this._showNext();
    }

    show(content) {
      console.log('show', content);
      this._queue.push(content);
      if (this._queue.length === 1) { this._showNext(); }
    }

  });

})();
