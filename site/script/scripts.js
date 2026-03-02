const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

burger.addEventListener('click', () => {

    burger.classList.toggle('active');
    nav.classList.toggle('active');

});


const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

 // Инициализация EmailJS (твой ключ уже вставлен)
  emailjs.init("r0VmzggkXuhBsXCeb");

  const form = document.getElementById('connectForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Отправляем...';

    // Собираем данные
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') || '—',
      phone: formData.get('phone') || '—',
      service: formData.get('service') || '—',
      comment: formData.get('comment') || '—',
      send_date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Отправка
    emailjs.send(
      'shum.pasha03@gmail.com', 
      'template_vykbz39',  
      data
    )
    .then(() => {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      form.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'ЗАПИСАТЬСЯ БЕСПЛАТНО';
    })
    .catch((err) => {
      console.error('Ошибка EmailJS:', err);
      errorMsg.style.display = 'block';
      successMsg.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'ЗАПИСАТЬСЯ БЕСПЛАТНО';
    });
  });

  function resetForm() {
    form.reset();
    form.style.display = 'flex';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
  }

//   скролл
  document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      const headerHeight = document.querySelector('header')?.offsetHeight || 0; // высота шапки
      const topOffset = headerHeight + 20;

      const topPos = target.getBoundingClientRect().top + window.pageYOffset - topOffset;

      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    });
  });
});