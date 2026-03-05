// 1. Бургер-меню
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// 2. Появление шапки при скролле
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 3. Плавный скролл к секциям с отступом под шапку
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            // Учитываем высоту шапки + небольшой отступ
            const headerHeight = header?.offsetHeight || 0;
            const topOffset = headerHeight + 20;

            const topPos = target.getBoundingClientRect().top + window.pageYOffset - topOffset;

            window.scrollTo({
                top: topPos,
                behavior: 'smooth'
            });

            // Закрываем бургер-меню после клика на мобильных
            if (burger && nav && nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
});

// 4. EmailJS — отправка формы
emailjs.init("r0VmzggkXuhBsXCeb");  // твой Public Key

const form = document.getElementById('connectForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMessage');
const errorMsg = document.getElementById('errorMessage');

if (form) {
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

        console.log('Отправляемые данные:', data);  // ← для отладки

        // Отправка
        emailjs.send(
            'shum.pasha.03@gmail.com',     // твой Service ID
            'template_kqa0m2l',           // твой Template ID
            data
        )
        .then((response) => {
            console.log('Успех EmailJS:', response.status, response.text);
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
}

// Сброс формы
function resetForm() {
    if (form) {
        form.reset();
        form.style.display = 'flex';
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
    }
}