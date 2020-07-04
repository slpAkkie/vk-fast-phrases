class _vkfpSettings {
  isExist = false;
  updateTime = 10;
  IDs = {
    container: 'VKFP-container'
  }
  tags = {
    container: 'div'
  }
  classes = {
    pageHistory: 'im-page_history-show',
    landlord: 'im-right-menu',
    secondaryLandlord: 'side_bar_inner',
    chatInput: 'im-chat-input--text',
    chatSend: 'im-chat-input--send',
    button: 'VKFP-button',
    bText: 'VKFP-text',
    bDel: 'VKFP-delete'
  }
  queries = {
    pageHistory: `.${this.classes.pageHistory}`,
    landlord: `.${this.classes.landlord}`,
    secondaryLandlord: `.${this.classes.secondaryLandlord}`,
    container: `#${this.IDs.container}`,
    chatInput: `.${this.classes.chatInput}`,
    chatSend: `.${this.classes.chatSend}`
  };
  pageListener;

  defaultButtons = [
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

  styles = `
    #VKFP-container {
      width: 100%;
      margin: 10px 0;
    }
    .VKFP-hide {
      visibility: hidden;
    }
    .VKFP-button {
      display: block;
      width: 100%;
      background: white;
      color: black;
      box-shadow: 0 0 15px -5px rgba(0, 0, 0, .25);
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      border-radius: 20px;
      padding: 8px 0;
      margin: 8px 0;
      cursor: pointer;
      position: relative;
    }
    .VKFP-delete {
      opacity: 0;
      display: inline-block;
      font-size: 16px;
      width: 12px;
      height: 12px;
      background: url(/images/icons/im_actions.png) -4px -81px;
      position: absolute;
      top: calc(50% - 6px);
      right: 10px;
    }
    .VKFP-button:hover .VKFP-delete {
      opacity: 1;
    }
    .VKFP-delete:hover {
      background: url(/images/icons/im_actions.png) -4px -67px;
    }
  `;


}
