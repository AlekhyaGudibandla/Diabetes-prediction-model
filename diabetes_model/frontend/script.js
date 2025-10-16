(() => {
  const form = document.getElementById('predict-form');
  const result = document.getElementById('result');
  const themeToggle = document.getElementById('theme-toggle');
  const themeEmoji = document.getElementById('theme-emoji');
  const themeIcon = document.getElementById('theme-icon');

  function showMessage(text, type = 'info') {
    result.textContent = text;
    result.className = `result ${type}`;
  }

  // Theme persistence
  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      if (themeEmoji) themeEmoji.textContent = '🌞';
    } else {
      root.classList.remove('light');
      if (themeEmoji) themeEmoji.textContent = '🌙';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  async function predict(payload) {
    const base = window.API_BASE || '';
    // Guard: if base is empty and page is served from http server, warn user
    if (!base) {
      throw new Error('API_BASE is not set. Set window.API_BASE to your FastAPI URL.');
    }
    const url = `${base}/diabetes_prediction`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed with status ${response.status}`);
    }
    return response.json();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      pregnancies: Number(document.getElementById('pregnancies').value),
      Glucose: Number(document.getElementById('Glucose').value),
      BloodPressure: Number(document.getElementById('BloodPressure').value),
      SkinThickness: Number(document.getElementById('SkinThickness').value),
      Insulin: Number(document.getElementById('Insulin').value),
      BMI: Number(document.getElementById('BMI').value),
      DiabetesPedigreeFunction: Number(document.getElementById('DiabetesPedigreeFunction').value),
      Age: Number(document.getElementById('Age').value)
    };

    // Basic client-side validation
    if (Object.values(payload).some((v) => Number.isNaN(v))) {
      showMessage('Please enter valid numeric values.', 'error');
      return;
    }

    try {
      showMessage('Predicting...', 'info');
      const data = await predict(payload);
      if (typeof data === 'object' && data !== null && 'message' in data) {
        showMessage(String(data.message), data.prediction === 1 ? 'negative' : 'positive');
      } else if (typeof data === 'string') {
        // Backward-compat if API still returns a string
        const isDiabetic = /diabetic/i.test(data) && !/not diabetic/i.test(data);
        showMessage(data, isDiabetic ? 'negative' : 'positive');
      } else {
        showMessage('Unexpected response from server.', 'error');
      }
    } catch (err) {
      showMessage(err.message || 'Request failed.', 'error');
    }
  });
})();


