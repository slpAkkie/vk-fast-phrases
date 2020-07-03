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

    style.innerText = `
      .funHide {
        visibility: hidden;
      }
      #funWrapper {
        width: 100%;
        margin: 10px 0;
      }
      button.funButton {
        display: block;
        width: 100%;
        padding: 10px 5px;
        border: none;
        border-radius: 2rem;
        background: linear-gradient(45deg, #3337bd, #5f14a5);
        color: white;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0px 2px 25px -5px rgba(0, 0, 0, 0.5);
        margin: 10px 0;
        cursor: pointer;
      }`;
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

    this.createButton();
    this.isExist = true;
    this.updateVisibility();
  }

  updateVisibility() {
    document.querySelector( '.im-page--history_empty' ) !== null
      ? ( document.querySelector( '#funWrapper' ).classList.add( 'funHide' ) )
      : ( document.querySelector( '#funWrapper' ).classList.remove( 'funHide' ) );
  }

  createButton() {
    let landlord = document.querySelector( '.im-right-menu' );
    let messageInput = document.querySelector( '.im-chat-input--text' );
    let messageSend = document.querySelector( '.im-chat-input--send' );

    let funWrapper = document.createElement( 'div' );
    funWrapper.id = 'funWrapper';

    this.buttonSamples.forEach( ( buttonSample ) => {
      let button = document.createElement( 'button' );
      let buttonText = buttonSample.message;
      button.classList.add( 'funButton' );
      button.textContent = buttonText;

      button.addEventListener( 'click', () => {
        messageInput.innerHTML = buttonText;
        messageSend.click();
      } );

      funWrapper.appendChild( button );
    } );

    landlord.appendChild( funWrapper );
  }
}

let funButtonsObj = new funButtons();
