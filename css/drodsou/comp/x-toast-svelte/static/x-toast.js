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
            transition: all 0.2s linear;
            position:fixed;
            width:80vw;
            left:7.5vw;
            background-color: black;
            color: white;
            margin:0;
            overflow: hidden;
            display:block;
            height: 40px;

            /* opacity: 0; */
            /* bottom: -40px; */
          }

          :host(.visible) {
            opacity: 1;
            bottom: 0px;
          }

          #all-children-hidden {
            overflow:hidden;
            height:80px;  /* 0 */
            padding:0;
            margin:0;
            background: blue;
          }
        </style>
        <div id="show"></div>
        <div id="all-children-hidden"><slot></slot></div>
      `;

      // this.shadowRoot.addEventListener('slotchange', event => {
      //   // this.shadowRoot.querySelector('slot').assignedNodes().forEach(e=>{
      //   //   this.show(e.innerHTML || e.textContent);
      //   // });

      //   let e = this.shadowRoot.querySelector('slot').assignedNodes()[0];
      //   this.show(e.innerHTML || e.textContent);
      // });

      this.mutationObserver = new MutationObserver(()=>{
        console.log('mutación, mutación, derrama!');
        let e = this.shadowRoot.querySelector('#all-children-hidden');
        this.show(e.innerHTML || e.textContent);
      });
      this.mutationObserver.observe( this.shadowRoot.querySelector('#all-children-hidden') , { subtree:true, attributes:true, childList: true });

      
      // document.addEventListener('DOMContentLoaded', ()=>{
      //   this.shadowRoot.host.classList.add('hidden');
      // });
      

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
