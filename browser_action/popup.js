/** Выводим конфигурацию пользователя */
function dumpStorage() {
  let log = document.querySelector( '#js-log' );
  chrome.storage.local.get( null, ( value ) => {
    log.textContent = value.buttons;
  } );
}

/** Очищаем хранилище */
function cleanStorage() {
  chrome.storage.local.remove( [ 'buttons' ], () => {
    document.querySelector( '#js-storageInfo' ).textContent = 'Хранилище было очищенно, обновите страницу, чтобы загрузить чистую конфигурацию';
  } );
}

/** Очищаем хранилище */
function restoreStorage() {
  chrome.storage.local.remove( [ 'buttons', 'isSaved' ], () => {
    document.querySelector( '#js-storageInfo' ).textContent = 'Хранилище было восстановлено, обновите страницу, чтобы загрузить чистую конфигурацию';
  } );
}

/** Обрабатываем события клик на контроллеры */
document.querySelector( '#js-cleanStorage' ).addEventListener( 'click', cleanStorage );
document.querySelector( '#js-dumpStorage' ).addEventListener( 'click', dumpStorage );
document.querySelector( '#js-restoreStorage' ).addEventListener( 'click', restoreStorage );
