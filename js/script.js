(() => {
  window.addEventListener('load', () => {

    let randomInteger = (min, max) => {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    function setCookie(name, value, options = {}) {

      options = {
        path: '/'
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }

    setCookie('steep', '1', {secure: true, 'max-age': 3600});
    setCookie('round', `${randomInteger(1, 3)}`, {secure: true, 'max-age': 3600});
    setCookie('current', '0', {secure: true, 'max-age': 3600});

    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    getCookie('steep');


    setTimeout(() => {
      document.querySelector('.loading').classList.remove('loading');
    }, 200);


    let popup = document.querySelector('.popup'),
      popupPreview = document.querySelector('.popup-preview');


    let viewPreviewPopup = () => {
      popup.classList.remove('hide');
      popupPreview.classList.remove('hide');
    }

    viewPreviewPopup();

    document.querySelector('.popup-preview__submit').addEventListener('click', () => {
      let userName = document.querySelector('#name').value;

      switch (userName) {
        case '':
        case undefined:
        case null:
          alert('Пожалуйста, введите Ваше имя')
          break;

        default:
          alert(`Желаем удачи, ${userName}!`);
          popup.classList.add('hide');
          popupPreview.classList.add('hide');
      }

      setCookie('user', `${userName}`, {secure: true, 'max-age': 3600});
    })

    document.querySelector('.chat-form__btn-message').addEventListener('click', () => {
      let userMessage = document.querySelector('#user-message').value;

      switch (userMessage) {
        case '':
        case undefined:
        case null:
          alert('Введите сообщение');
          break;

        default:
          document.querySelector('.chat-form__btn-message').disabled = true;
          let date = new Date(),
            audio = document.querySelector('#audio-chat');

          document.querySelector('.chat-list').insertAdjacentHTML('beforeend', `
          <li class="chat-list__item">
            <div class="chat-list__avatar">
              <img src="img/def-avatar.jpg">
            </div>
            <div class="chat-list__messages">
              <strong>${getCookie('user')}</strong>
              <p>${userMessage}</p>
              <time>${date.getHours()}:${date.getMinutes()}</time>
            </div>
          </li>`);

          document.querySelector('#user-message').value = '';
          audio.play();


          setTimeout(() => {
            document.querySelector('.chat-form__btn-message').disabled = false;
          }, 1000);

      }
    })

    let btnSettings = document.querySelectorAll('.chat-form__settings button');

    for (let btn of btnSettings) {
      btn.addEventListener('click', () => {
        alert('Функция не поддерживается Вашим браузером');
      })
    }

    document.querySelector('.list-box').addEventListener('click', (event) => {
      if (event.target.classList.contains('list-box__item') || event.target.closest('.list-box__item')) {
        
      }
    })

  })
})();