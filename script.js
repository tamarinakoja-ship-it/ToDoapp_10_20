// HTML要素の取得
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

// リストが空かどうかでメッセージの表示を切り替える関数
function updateEmptyMessage() {
  if (todoList.children.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }
}

// タスクを追加する関数
function addTodo() {
  const text = todoInput.value.trim();

  // 未入力の場合はアラート
  if (text === '') {
    alert('タスクを入力してくださいね！');
    return;
  }

  // <li> 要素の作成
  const li = document.createElement('li');
  li.className = 'todo-item';

  // 内部HTMLの設定
  li.innerHTML = `
    <div class="todo-content">
      <input type="checkbox" class="todo-checkbox">
      <span class="todo-text">${escapeHtml(text)}</span>
    </div>
    <button class="delete-btn">削除</button>
  `;

  // チェックボックス（完了状態）の切り替えイベント
  const checkbox = li.querySelector('.todo-checkbox');
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  // 削除ボタンのクリックイベント
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateEmptyMessage();
  });

  // リストに追加して入力欄をリセット
  todoList.appendChild(li);
  todoInput.value = '';
  updateEmptyMessage();
}

// エスケープ処理（簡易セキュリティ対策）
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ボタンクリックイベント
addButton.addEventListener('click', addTodo);

// Enterキー入力でのタスク追加
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// 初期表示時のチェック
updateEmptyMessage();