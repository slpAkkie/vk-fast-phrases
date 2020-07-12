/**
 * Основные функции popup окна расширения
 * @author slpakkie
 */
class _Popup {
  /** Установка обработчиков событий */
  constructor() {
    document.querySelector( '#js-cleanStorage' ).addEventListener( 'click', this.cleanStorage );
    document.querySelector( '#js-wipeStorage' ).addEventListener( 'click', this.wipeStorage );
    document.querySelector( '#js-restoreStorage' ).addEventListener( 'click', this.restoreStorage );
    document.querySelector( '#js-dumpStorage' ).addEventListener( 'click', this.dumpStorage );
    document.querySelectorAll( '.js-gotoGithub' ).forEach( element => {
      element.addEventListener( 'click', ( event ) => {
        event.preventDefault(); chrome.tabs.create( { url: 'https:\/\/github.com/slpAkkie/vkFastPhrases' } )
      } );
    } );



    chrome.management.getSelf( ( response ) => {
      document.querySelector( '#js-version' ).textContent = response.version;
    } )
  }





  /** Очистка конфига кнопок */
  cleanStorage() {
    chrome.storage.local.set( { "samples": "[]" }, () => {
      document.querySelector( '#js-storageInfo' ).textContent = 'Хранилище было очищенно';
      chrome.tabs.reload();
    } );
  }





  /** Полное удаление хранилища */
  wipeStorage() {
    chrome.storage.local.clear( () => {
      document.querySelector( '#js-storageInfo' ).textContent = 'Хранилище было  сброшено';
      chrome.tabs.reload();
    } );
  }





  /** Очистка хранилища */
  restoreStorage() {
    chrome.storage.local.remove( 'savedConf', () => {
      document.querySelector( '#js-storageInfo' ).textContent = 'Хранилище было восстановлено';
      chrome.tabs.reload();
    } );
  }





  /** Выводит дамп хранилища */
  dumpStorage() {
    let log = document.querySelector( '#logContent' );
    chrome.storage.local.get( 'samples', ( value ) => {
      document.querySelector( '#yourConf' ).style.display = 'block';
      document.querySelector( '#logContent' ).style.display = 'block';
      log.textContent = JSON.stringify( value );
    } );
  }

}
