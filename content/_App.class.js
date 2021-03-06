/**
 * Базовые функции расширения
 * @author slpakkie
 */
class _App {
  /** Хранит объекты каждой кнопки */
  _buttons = {};

  /** Хранит пользовательский конфиг кнопок */
  _userTemplates = [];





  /**
   * Загружает в this._userTemplates конфигурацию кнопок
   */
  constructor() {

    chrome.storage.local.get( null, ( response ) => {

      /** Если расширение запущено впервые */
      if ( response.firstStart === undefined ) {
        alert( `Спасибо за то, что установили мое расширение.\nС подробной информацие можете ознакомиться в меню расширения` );
        chrome.storage.local.set( { firstStart: false } );
      }



      /** Проверка сохраненного конфига */
      if ( response.savedConf !== undefined ) {
        /** Проверка версии */
        if ( response.version === undefined || response.version < appData.currentVersion ) {
          alert( `Текущая версия хранилища не совместима с новой версией расширения. Пожалуйста выполните сброс хранилища через меню расширения` );

          chrome.storage.local.set( { "version": appData.currentVersion } );
        }

        this._userTemplates = JSON.parse( response.samples );
      } else {
        chrome.storage.local.set( { "samples": appData.defaultSamples, "version": "2" } );
        this._userTemplates = JSON.parse( appData.defaultSamples );
      }

      chrome.storage.local.set( { "savedConf": "true" } );



      appData.intervalId = setInterval( this.monitoring.bind( this ), appData.intervalTime );

    } );

  }





  saveConf() {
    try {
      chrome.storage.local.set( { "samples": JSON.stringify( this._userTemplates ) } );
    } catch { this.errorNotification( 'Произошла какая-то ошибка, которую мы не смогли обработать\nПожалуйста перезагрузите страницу' ); }
  }





  /**
   * Проверяет адрес страницы и при открытой страницы сообщений загружает на страницу список кнопок
   */
  monitoring() {

    try {

      // Проверка открытой страницы
      if ( window.location.pathname.search( `/im` ) === -1 ) {
        appData.buttonsCreated = false;
        if ( this.container !== undefined ) {
          this.container.remove();
          this.container = undefined;
          this.wrapper = undefined;
        }
        return;
      }



      /** Проверка на созданные кнопки */
      if ( appData.buttonsCreated ) {
        this.toggleVisibility();
        return;
      }



      /** Создание кнопок из пользовательского конфига */
      this.createUserButtons();
      appData.buttonsCreated = true;
      this.toggleVisibility();

    } catch ( e ) {
      this.errorNotification( e );
    }

  }





  /**
   * Возвращает объект необходимых элементов для работы с кнопками
   */
  getDeps() {

    let chatInput = document.querySelector( `.im-chat-input--text` ),
      chatSend = document.querySelector( `.im-chat-input--send` ),
      photoAttaches = document.querySelector( `#thumbs_edit1` );

    return { chatInput, chatSend, attaches: { photo: photoAttaches } };

  }





  /**
   * Останавливает интервал-мониторинг и сообщает об ошибке
   */
  errorNotification( e ) {

    alert( `Во время работы расширения произошла ошибка\nРабота расширения приостановлена\nПерезагрузите страницу, что бы запустить его заново` );
    console.error( e );

    clearInterval( appData.intervalId );

  }





  /**
   * Создает на странице список кнопок согласно this._userTemplates
   */
  createUserButtons() {

    /** Полчуние родителя */
    let relative = document.querySelector( `.im-right-menu` ) || document.querySelector( `.side_bar_inner` ) || null;

    /** Если не удалось получить родителя */
    if ( relative === null ) {
      this.errorNotification( 'Мы не смогли получить блок, куда хотели загрузить кнопки' );
      return;
    }



    /** Создание контейнера для элементов расширения */
    this.container = document.createElement( `div` );
    this.container.id = `vkfpContainer`;

    /** Создание обертки для кнопок отправки сообщения */
    this.wrapper = document.createElement( `div` );
    this.wrapper.id = `vkfpWrapper`;



    /** Создание кнопок из конфига */
    this._userTemplates.forEach( ( sample ) => { this.createButton( { ...sample } ) } );



    /** Создание кнопки добавления новой кнопки */
    let buttonNew = document.createElement( `div` );
    buttonNew.id = `vkfpNew`;
    buttonNew.classList.add( `vkfpButton` );

    buttonNew.addEventListener( 'drop', function ( event ) {
      let i = parseInt( event.dataTransfer.getData( `takenId` ).slice( 10 ) );
      app._buttons[ i ].drop( event, true );
    } );

    buttonNew.addEventListener( `click`, this.addButton.bind( this ) );



    /** Добавление полученных элементов на страницу */
    this.container.append( this.wrapper, buttonNew );

    relative.appendChild( this.container );

  }





  /**
   * Создает кнопку на странице
   */
  createButton( sample ) {

    this._buttons[ sample.pos ] = new _Button( sample );
    this.wrapper.append( this._buttons[ sample.pos ].dom );

  }





  /**
   * Обновляет в конфигурации позиции кнопок
   * @param {number} oldPos
   * @param {number} newPos
   */
  shiftButtons( oldPos, newPos ) {
    let transfer = [ this._buttons[ oldPos ], this._userTemplates[ oldPos ] ];

    if ( oldPos > newPos ) {
      for ( let i = oldPos; i > newPos; i-- ) {
        this._userTemplates[ i ] = this._userTemplates[ i - 1 ];
        this._buttons[ i ] = this._buttons[ i - 1 ];
      }
    } else if ( oldPos < --newPos ) {
      for ( let i = oldPos; i < newPos; i++ ) {
        this._userTemplates[ i ] = this._userTemplates[ i + 1 ];
        this._buttons[ i ] = this._buttons[ i + 1 ];
      }
    }



    this._buttons[ newPos ] = transfer[ 0 ];
    this._userTemplates[ newPos ] = transfer[ 1 ];



    for ( let i = Math.min( oldPos, newPos ); i <= Math.max( oldPos, newPos ); i++ ) {
      this._userTemplates[ i ].pos = i;
      this._buttons[ i ].pos = i;
      this._buttons[ i ].dom.id = `vkfpButton${i}`;
    }

    this.saveConf();
  }





  /**
   * Обновляет видимость кнопок, если закрыта страница с диалогом
   */
  toggleVisibility() {

    document.querySelector( `.im-page_history-show` ) === null
      ? ( document.querySelector( `#vkfpContainer` ).classList.add( `vkfpHidden` ) )
      : ( document.querySelector( `#vkfpContainer` ).classList.remove( `vkfpHidden` ) );

  }





  /**
   * Запрашивает краткое имя для кнопки
   */
  getAlias( forced = false ) {
    let alias;



    if ( forced )
      alias = prompt( 'Для этого сообщения необходим алиас:' );

    else
      alias = prompt( 'Введите свой алиас:' );


    if ( alias === undefined || alias === null || alias === `` ) alias = `Кнопка ${this._userTemplates.length + 1}`;


    return alias;
  }





  /**
   * Возвращает список прикрепленных элементов
   */
  getAttaches() {
    let deps = this.getDeps(),
      photoAttaches = [],
      attaches = {};



    if ( deps.attaches.photo === null ) return null;



    if ( deps.attaches.photo.childElementCount !== 0 ) {

      let photoes = Array.from( deps.attaches.photo.children );

      photoes.forEach( ( attach ) => {
        photoAttaches.push( attach.getAttribute( `attachment` ).split( `photo` )[ 1 ] );
      } )

      attaches[ `photo` ] = photoAttaches;

    } else {
      return null;
    }


    return attaches;
  }





  /**
   * Добавляет кнопку в конфигурацию
   */
  addButton() {
    let deps = this.getDeps(),
      emoji = deps.chatInput.querySelectorAll( `img.emoji` ),
      attaches = this.getAttaches(),
      askAlias = false,
      alias = null;



    if ( attaches !== null ) {
      Array.from( deps.attaches.photo.children ).forEach( ( photo ) => {
        photo.querySelector( '._close_btn' ).click();
      } );
    }



    if ( emoji.length !== 0 ) emoji.forEach( ( emoji ) => { emoji.replaceWith( emoji.getAttribute( `alt` ) ) } );

    let message = deps.chatInput.innerText.trim();



    if ( message[ 0 ] === `=` ) {
      askAlias = true;
      message = message.slice( 1 );
    }




    /** Если в поле пусто */
    if ( message.length === 0 && attaches === null ) return;



    if ( askAlias ) alias = this.getAlias();
    else if ( message.length === 0 ) alias = this.getAlias( true );



    let button = {
      "pos": this._userTemplates.length,
      "style": "default",
      "alias": alias,
      "message": message,
      "attaches": attaches
    };



    deps.chatInput.innerHTML = ``;
    let inputEvent = document.createEvent( `HTMLEvents` );
    inputEvent.initEvent( 'input', true, true );
    deps.chatInput.dispatchEvent( inputEvent );



    this.createButton( button );


    this._userTemplates.push( button );
    this.saveConf();
  }
}
