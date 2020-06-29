// Класс веселых кнопок
class funButtons {
  isExist = false;          // Были ли кнопки созданы
  updateTime = 10;          // С каким интервалом (в мс.) вызывается функция проверки адреса

  // Список кнопок
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
  ]

  // Конструктор
  constructor() {
    this.pageListener = setInterval( this.locationChecker.bind( this ), this.updateTime ); // Устанавливаем интервал на функцию проверки адреса

    // Зададим стили для наших кнопок
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

  // Проверяет адрес
  locationChecker() {
    // Если мы находимся не на странице сообщений, ставим маркер, что кнопок нет и выходим
    if ( window.location.pathname.search( '/im' ) === -1 ) {
      this.isExist = false;
      return;
    }

    // Мы на странице сообщений
    // Если кнопки уже существуют, то обновляем их видимость, если это надо
    if ( this.isExist ) {
      this.updateVisibility();
      return;
    }

    // Мы на странице сообщений
    // Кнопок нет
    this.createButton();              // Создаем кнопки
    this.isExist = true;              // Ставим маркер, что кнопки были созданы
    this.updateVisibility();          // Обновляем их видимость
  }

  // Обновляет видимость кнопок
  updateVisibility() {
    // Если история сообщений пустая, значит не открыт ни один диалог
    document.querySelector( '.im-page--history_empty' ) !== null
      ? ( document.querySelector( '#funWrapper' ).classList.add( 'funHide' ) )              // Если да, то устанавливаем класс, что бы спрятать кнопки
      : ( document.querySelector( '#funWrapper' ).classList.remove( 'funHide' ) );          // Иначе Убираем этот класс
  }

  // Создаем кнопки
  createButton() {
    let landlord = document.querySelector( '.im-right-menu' );                    // Записываем то, куда потом будем вставлять кнопки
    let messageInput = document.querySelector( '.im-chat-input--text' );          // Записываем поле, куда будем писать текст сообщения
    let messageSend = document.querySelector( '.im-chat-input--send' );           // Записываем кнопку отправки сообщений

    let funWrapper = document.createElement( 'div' );                             // Создаем контейнер для хранения всех наших кнопок
    funWrapper.id = 'funWrapper';                                                 // Устанавливаем ему id

    // Переберем кнопки в массиве кнопок и создадим их
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
