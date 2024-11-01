:root {
  --primary-bg: #282828;
  --display-bg: #3c3c3c;
  --btn-default: #444444;
  --btn-operator: #007bff;
  --btn-equals: #28a745;
  --btn-clear: #dc3545;
  --btn-memory: #6c757d;
  --btn-function: #17a2b8;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.calculator {
  background-color: var(--primary-bg);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 100%;
}

.display {
  background-color: var(--display-bg);
  color: #fff;
  padding: 15px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 15px;
  border-radius: 5px;
  min-height: 30px;
  word-wrap: break-word;
  position: relative;
}

.previous-operation {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 14px;
  color: #888;
}

.current-value {
  margin-top: 15px;
}

.mode-indicators {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 12px;
  margin-bottom: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
}

button {
  background-color: var(--btn-default);
  color: #fff;
  border: none;
  padding: 12px 8px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 45px;
}

.secondary-function {
  font-size: 12px;
  color: #888;
  margin-bottom: 2px;
}

button:active { transform: scale(0.95); }
button:hover { filter: brightness(1.1); }
button.operator { background-color: var(--btn-operator); }
button.equals { background-color: var(--btn-equals); }
button.clear, button.second { background-color: var(--btn-clear); }
button.memory { background-color: var(--btn-memory); }
button.function { background-color: var(--btn-function); }
button.active { border: 2px solid #fff; }

@media (max-width: 400px) {
  .calculator { width: 95%; margin: 10px; }
  button { padding: 8px 4px; font-size: 14px; }
}
