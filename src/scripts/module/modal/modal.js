'use strict';

import extend from 'lodash/extend';










// Build HTML element from string content
const modalWindow = (content) => {
    // NOT IE :(
    // return `<div class="modal"> ${content} </div>`


    let tempParentEl, HTMLelem;
    if (typeof content === 'string') {

        tempParentEl = document.createElement('div');
        tempParentEl.innerHTML = content.trim();

        HTMLelem = tempParentEl.childNodes[0];
        // IE8 doesn't support classlist
        if (HTMLelem.classList){
          HTMLelem.classList.add('modal');
        } else{
          HTMLelem.className += ' modal';
        }

    }

    return  HTMLelem;
};





export class Modal {

    constructor(opt) {

        this.defaultOptions = {
            containerEl : document.querySelector(".modals-wrapper"),
            content: "String (HTML String) to inserted in the modal",
            onHide: null,
            onShow: null,
            onClickOutside: null,
            activeClass: 'modal--is-active',
            containerActiveClass: 'modals-wrapper--is-active'
        };
        // Extend default options with user options
        let extOptions = extend( this.defaultOptions, opt);

        // Create the HTML DOM from String content
        this.el = modalWindow( extOptions.content );

        // Bind the click outside function to the passed in function
        // Or use default hide
        extOptions.onClickOutside = extOptions.onClickOutside || this.hide.bind(this);

        // Attach options extended to the instance of Modal
        this.options = extOptions;



        // Append the content to the modalWrapper if not already
        if (!this.options.containerEl.contains(this.el)) {
            this.options.containerEl.appendChild(this.el);
        }
    }





    /**
     * Hides the modal.
     *
     */
    hide () {

        // Add to modal container the active class
        this.options.containerEl.classList.remove( this.options.containerActiveClass );

        // Add to modal window the active class
        this.el.classList.remove( this.options.activeClass );

        // Remove listener from the document now that the modal is closed
        document.removeEventListener('click', this._onDocClick.bind(this), true);

        // If onShow function in options
        if (this.options.onHide) {
            console.log("this in onHide => ", this);
            this.options.onHide();
        }

    }





    /**
     * Shows the modal.
     *
     */
    show () {

        // Add listener on the document to close modal
        document.addEventListener('click', this._onDocClick.bind(this), true);

        // Add to modal container the active class
        this.options.containerEl.classList.add( this.options.containerActiveClass );

        // Add to modal window the active class
        this.el.classList.add( this.options.activeClass );

        // If onShow function in options
        if (this.options.onShow) {
            this.options.onShow();
        }
    }




    /**
     * When the document window is clicked.
     * @param {Event} e - The event
     * @private
     */
    _onDocClick (e) {

        let clickedItem = e.target,
            // has-clicked-in the active modal (not the wrapper, the modal)
            // think CTA in the active modal !!!
            isClickOutside = !this.el.contains(clickedItem);


        // If not clicked in the active modal
        if (isClickOutside) {

            if (this.options.onClickOutside) {
                this.options.onClickOutside();
            }

        }
    }

}