;(function(){

  const toastHeight = 

  customElements.define( 'x-toast-n', class extends HTMLElement {   
    constructor() { 
      super();

      this.attachShadow({ mode : 'open' });
      this.shadowRoot.innerHTML = /*html*/`
        <style>
          :host {
            box-sizing: border-box;
            transition: all 0.2s linear;
            position:fixed;
            width:30vw;
            
            // border: 1px solid red;

            color: white;
            margin:0;
            overflow: hidden;
            display:block;

            padding: 0px;
            height: 5rem;

            bottom: -4rem;  /* same as height */
            right: 1rem;
          }

          .toast {
            transition: all 0.2s linear;
            display: flex;
            margin: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            background-color: darkgrey;
            height: 2rem;
            overflow: hidden;
          }

          .toast button {
            cursor: pointer;
          }

          .toast > div:nth-child(1) {
            flex:1;
            
          }
          .toast > div:nth-child(2) {
            
          }

        </style>
        <div id="show"></div>
      `;

      this.elHost = this.shadowRoot.host;
      this.elShow = this.shadowRoot.querySelector(`#show`);
      this.toastId = 0;

    }

    // async _showNext() {
    //   let host = this.shadowRoot.host;
    //   let div = this.shadowRoot.querySelector(`#show`);
    //   if (!this._queue.length) { 
    //     // hide
    //     host.classList.remove('visible');
    //     div.innerHTML = '';
    //     return 
    //   };
            
    //   // show
    //   div.innerHTML = this._queue[0];
    //   host.classList.add('visible');
    //   await new Promise(res=>setTimeout(res, 
    //     parseInt(this.getAttribute("timeout") || "1000")
    //   ));
    //   host.classList.remove('visible');
    //   await new Promise(res=>setTimeout(res, 300)); 
    //   this._queue.shift();
    //   this._showNext();
    // }

    show(content) {
      let currId = this.toastId++;

      let toast = document.createElement("div");
      toast.className = 'toast'
      toast.id = `toast${currId}`;
      toast.innerHTML = `
        <div>${content}</div>
        <div><button>X</button></div>
      `;

      this.elShow.appendChild(toast);
      this.resizeHost();
      
      toast.querySelector('button').addEventListener('click',()=>{
        this.removeToast(toast);
      });

    }

    removeToast(toast) {
      toast.style.height = '0px';
      toast.style.padding = 0;
      this.resizeHost(-1);  

      setTimeout(()=>{
        this.elShow.removeChild(toast);
      }, 200);  // same as toast transition;
    }

    resizeHost(inc=0) {
      this.elHost.style.height = `${(this.elShow.children.length +1 + inc) * 5}rem`;
    }

  });

})();
