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





  /**
   * Проверяет адрес страницы и при открытой страницы сообщений загружает на страницу список кнопок
   */
  monitoring() {

    try {

      // Проверка открытой страницы
      if ( window.location.pathname.search( `/im` ) === -1 ) {
        appData.buttonsCreated = false;
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
      chatSend = document.querySelector( `.im-chat-input--send` );

    return { result: true, chatInput, chatSend };

  }





  /**
   * Останавливает интервал-мониторинг и сообщает об ошибке
   */
  errorNotification( e ) {

    alert( `Во время работы расширения произошла ошибка\nРабота расширения приостановлена` );
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
    this._userTemplates.forEach( ( sample ) => { this.createButton( { type: `message`, ...sample } ) } );



    /** Создание кнопки добавления новой кнопки */
    let buttonNew = document.createElement( `div` );
    buttonNew.id = `vkfpNew`;
    buttonNew.classList.add( `vkfpButton` );
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
  getAlias() {
    return null;
  }





  /**
   * Возвращает список прикрепленных элементов
   */
  getAttaches() {
    return null;
  }





  /**
   * Добавляет кнопку в конфигурацию
   */
  addButton() {
    let deps = this.getDeps(),
      emoji = deps.chatInput.querySelectorAll( `img.emoji` );



    if ( deps.result === false ) return;



    /** Если в поле пусто */
    if ( deps.chatInput.innerHTML.length === 0 ) return;

    emoji.forEach( ( emoji ) => { emoji.replaceWith( emoji.getAttribute( `alt` ) ) } );



    let button = {
      "pos": this._userTemplates.length,
      "style": "default",
      "alias": this.getAlias(),
      "message": deps.chatInput.innerHTML,
      "attaches": this.getAttaches()
    };

    this.createButton( button );
  }
}
