(() => {
  window.addEventListener('load', () => {

    let getCookie = (name) => {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    document.querySelector('.casa-info-content__btn').addEventListener('click', () => {
      document.querySelector('.casa-info-content__btn').innerText = 'Обработка платежа...';

      setTimeout(() => {
        document.querySelector('.casa-preview').classList.add('hide');
        document.querySelector('.casa-pay').classList.remove('hide');
      }, 1500);

      let timeView = document.querySelector('.casa-pay-content__time > span');
      let timer = 600;

      setTimeout(function timeCount() {
        if (timer > 0) {
          timer--;

          let minutes = Math.floor(timer / 60);
          let sec = Math.floor((timer - minutes * 60));

          if (sec < 10) {
            sec = `0${sec}`;
          }

          timeView.innerHTML = `00:0${minutes}:${sec}`;
        }

        setTimeout(timeCount, 1000);
      }, 2000);


      setTimeout(() => {
        let waitText = document.querySelector('.casa-pay-content__wait-text');
        waitText.innerHTML = '';
        waitText.classList.add('col');

        let span = document.createElement('span');
        span.innerText = 'Ошибка зачисления. Обратитесь в поддержку';
        span.classList.add('text-error');

        let a = document.createElement('a');
        a.innerText = 'Техподдержка';
        a.classList.add('link-support');
        a.href = 'https://t.me/litvinfreebox';
        a.target = '_blank';

        waitText.append(span, a);
      }, 120000);
    })


    document.querySelectorAll('.casa-pay-content__copy').forEach(element => element.addEventListener('click', () => {
      element.previousElementSibling.select();
      document.execCommand("copy");
      alert('Скопировано в буфер обмена!')
    }))
  });
})();