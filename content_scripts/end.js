class funButtons {
  isExist = false;
  updateTime = 10;

  buttonSamples = [
    { message: 'Пошел нахуй!🖕🏻' },
    { message: 'Ясно' },
    { message: 'Понятно' },
    { message: 'Ага, ага' },
    { message: 'Ммм...' },
    { message: 'Понимаю' },
    { message: 'Осуждаю' },
    { message: 'Ахапхахпхах' },
    { message: 'Получается так' }
  ];

  constructor() {
    this.pageListener = setInterval( this.locationChecker.bind( this ), this.updateTime );

    let head = document.getElementsByTagName( 'head' )[ 0 ],
      style = document.createElement( 'style' );

    style.innerText = vkfpSettings.styles;
    head.appendChild( style );
  }

  locationChecker() {

    if ( window.location.pathname.search( '/im' ) === -1 ) {
      this.isExist = false;
      return;
    }

    if ( this.isExist ) {
      this.updateVisibility();
      return;
    }

    this.createButtons();
    this.isExist = true;
    this.updateVisibility();
  }

  updateVisibility() {
    document.querySelector( '.im-page--history_empty' ) !== null
      ? ( document.querySelector( '#VKFP-container' ).classList.add( 'VKFP-hide' ) )
      : ( document.querySelector( '#VKFP-container' ).classList.remove( 'VKFP-hide' ) );
  }

  createButtons() {
    let landlord = document.querySelector( '.im-right-menu' );
    let messageInput = document.querySelector( '.im-chat-input--text' );
    let messageSend = document.querySelector( '.im-chat-input--send' );

    let funWrapper = document.createElement( 'div' );
    funWrapper.id = 'VKFP-container';

    this.buttonSamples.forEach( ( buttonSample ) => {

      let bObj = new Button( buttonSample.message );
      let button = bObj.createButton();

      button.addEventListener( 'click', ( e ) => {
        if ( e.toElement.classList.value == 'VKFP-delete' ) return;
        messageInput.innerHTML = buttonSample.message;
        messageSend.click();
      } );

      funWrapper.append( button );
    } );

    landlord.append( funWrapper );
  }
}

let funButtonsObj = new funButtons();
