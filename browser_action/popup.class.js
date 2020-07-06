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
    let log = document.querySelector( '#js-log' );
    chrome.storage.local.get( null, ( value ) => {
      log.textContent = JSON.stringify( value );
    } );
  }

}
