// حفظ الدخول
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username === 'alzahrani' && password === '00') {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('loginError').textContent = 'بيانات الدخول غير صحيحة';
      }
    });
  }

  // حماية لوحة المدير
  if (window.location.pathname.includes('dashboard.html')) {
    if (localStorage.getItem('isAdmin') !== 'true') {
      window.location.href = 'admin.html';
    }
  }

  // تسجيل الخروج
  window.logout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
  };

  // إضافة وظيفة
  const addJobForm = document.getElementById('addJobForm');
  if (addJobForm) {
    addJobForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('jobTitle').value;
      const desc = document.getElementById('jobDesc').value;
      let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      jobs.push({ title, desc });
      localStorage.setItem('jobs', JSON.stringify(jobs));
      alert('تمت إضافة الوظيفة');
    });
  }

  // عرض الوظائف
  const jobsList = document.getElementById('jobsList');
  if (jobsList) {
    let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    jobsList.innerHTML = jobs.map(j => `<div><h3>${j.title}</h3><p>${j.desc}</p></div>`).join('');
  }

  // إرسال طلب
  const applyForm = document.getElementById('applyForm');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      let apps = JSON.parse(localStorage.getItem('applications') || '[]');
      apps.push({ fullName, phone });
      localStorage.setItem('applications', JSON.stringify(apps));
      alert('تم إرسال الطلب');
    });
  }

  // عرض الطلبات
  const appsList = document.getElementById('applicationsList');
  if (appsList) {
    let apps = JSON.parse(localStorage.getItem('applications') || '[]');
    appsList.innerHTML = apps.map(a => `<div><b>${a.fullName}</b> - ${a.phone}</div>`).join('');
  }
});