;(function(){
  
  const cls = 'toast' + Math.random().toString().slice(2,6);

  customElements.define( 'x-toast', class extends HTMLElement {   
    constructor() { 
      super();

      this._queue = [];

      this.attachShadow({ mode : 'open' });
      this.shadowRoot.innerHTML = /*html*/`
        <style>
          :host {
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
            overflow: hidden;
            display:block;
          }

          .hidden {
            opacity: 0;
            bottom: -40px;
            background-color: yellow;
          }
        </style>
        <div id="show" style="background-color:yellow;"></div>
        <div id="allChildren" style="overflow:hidden;height:0;padding:0;margin:0;background-color:pink;"><slot></slot></div>
      `;

      this.shadowRoot.addEventListener('slotchange', event => {
        // console.log(event)
        // console.log(this.shadowRoot.querySelector('slot').assignedNodes()[0].innerHTML);
        this.show(this.shadowRoot.querySelector('slot').assignedNodes()[0].innerHTML);
      });
      // console.log("...", this.shadowRoot.querySelector("#allChildren slot").innerHTML );

      this.shadowRoot.classList.add('hidden');

    }

    async _showNext() {
      let host = this.shadowRoot;
      let div = this.shadowRoot.querySelector(`#show`);
      if (!this._queue.length) { 
        // hide
        host.classList.add('hidden');
        div.innerHTML = '';
        return 
      };
            
      // show
      div.innerHTML = this._queue[0];
      host.classList.remove('hidden');
      await new Promise(res=>setTimeout(res, 
        parseInt(this.getAttribute("timeout") || "1000")
      ));
      host.classList.add('hidden');
      await new Promise(res=>setTimeout(res, 300)); 
      this._queue.shift();
      this._showNext();
    }
        

    show(content) {
      this._queue.push(content);
      if (this._queue.length === 1) { this._showNext(); }
    }

  });

})();
