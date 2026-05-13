"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BIN_ID = "6a050660250b1311c348162d";
const API_KEY = "$2a$10$oHU2FwqpVRMsaa22tSabt.3rDdfQjyTwnpbSF25DCpfeVG9.AuX8W";

interface Tool {
  id: number;
  name: string;
  category: string;
  desc: string;
}

export default function Admin() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Форма редактирования
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('stealer');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const data = await res.json();
      setTools(data.record.tools || []);
    } catch (e) {
      console.error(e);
      setMessage('❌ Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const saveTools = async (newTools: Tool[]) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ tools: newTools })
      });
      if (res.ok) {
        setTools(newTools);
        setMessage('✅ Данные сохранены!');
      } else {
        setMessage('❌ Ошибка при сохранении');
      }
    } catch (e) {
      setMessage('❌ Ошибка сети');
    } finally {
      setSaving(false);
    }
  };

  // Добавить новую тулку
  const addTool = () => {
    if (!editName.trim()) {
      setMessage('⚠️ Введите название');
      return;
    }
    const newTool: Tool = {
      id: Date.now(),
      name: editName,
      category: editCategory,
      desc: editDesc
    };
    saveTools([...tools, newTool]);
    clearForm();
  };

  // Начать редактирование
  const startEdit = (tool: Tool) => {
    setEditId(tool.id);
    setEditName(tool.name);
    setEditCategory(tool.category);
    setEditDesc(tool.desc);
  };

  // Сохранить изменения
  const updateTool = () => {
    if (!editName.trim()) {
      setMessage('⚠️ Введите название');
      return;
    }
    const updated = tools.map(t => 
      t.id === editId 
        ? { ...t, name: editName, category: editCategory, desc: editDesc }
        : t
    );
    saveTools(updated);
    clearForm();
  };

  // Удалить тулку
  const deleteTool = (id: number) => {
    if (confirm('Удалить этот инструмент?')) {
      saveTools(tools.filter(t => t.id !== id));
      if (editId === id) clearForm();
    }
  };

  const clearForm = () => {
    setEditId(null);
    setEditName('');
    setEditCategory('stealer');
    setEditDesc('');
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'stealer': return 'СТИЛЕР';
      case 'rat': return 'РАТ';
      case 'binder': return 'БИНДЕР';
      default: return cat.toUpperCase();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-2xl animate-pulse">ЗАГРУЗКА АДМИН-ПАНЕЛИ...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-blue-500">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3B82FF11,transparent_50%)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-4 text-2xl font-bold tracking-[0.3em] text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-blue-400/30 bg-black flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.45)]">
            <span className="text-blue-400 font-black">E_S</span>
          </div>
          ENTROPY SQUAD
        </Link>
        <div className="flex gap-4">
          <Link href="/catalog" className="px-5 py-2 rounded-2xl border border-zinc-500/40 bg-white/5 hover:bg-white/10 transition-all">
            ← К КАТАЛОГУ
          </Link>
        </div>
      </nav>

      <section className="relative z-10 px-8 py-16 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h3 className="text-5xl md:text-7xl font-black tracking-[0.15em] text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
            ADMIN PANEL
          </h3>
          <p className="text-zinc-500 mt-4 tracking-wider">Управление инструментами в каталоге</p>
        </div>

        {/* Сообщение */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center text-lg">
            {message}
          </div>
        )}

        {/* Форма добавления/редактирования */}
        <div className="mb-12 p-8 rounded-3xl border border-green-500/20 bg-gradient-to-b from-green-500/10 to-black">
          <h4 className="text-2xl font-bold text-green-400 mb-6 tracking-wider">
            {editId ? '✏️ РЕДАКТИРОВАТЬ ИНСТРУМЕНТ' : '➕ ДОБАВИТЬ НОВЫЙ ИНСТРУМЕНТ'}
          </h4>
          <div className="space-y-4">
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Название инструмента"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-white"
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-white"
            >
              <option value="stealer" className="bg-zinc-900">СТИЛЕР</option>
              <option value="rat" className="bg-zinc-900">РАТ</option>
              <option value="binder" className="bg-zinc-900">БИНДЕР</option>
            </select>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Описание инструмента"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500 text-white h-24 resize-none"
            />
            <div className="flex gap-4">
              <button
                onClick={editId ? updateTool : addTool}
                disabled={saving}
                className={`flex-1 py-4 rounded-xl font-black tracking-widest transition-all uppercase ${
                  saving
                    ? 'bg-zinc-700 cursor-wait'
                    : 'bg-green-600 hover:bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                }`}
              >
                {saving ? 'СОХРАНЕНИЕ...' : editId ? 'ОБНОВИТЬ' : 'ДОБАВИТЬ'}
              </button>
              {editId && (
                <button
                  onClick={clearForm}
                  className="px-8 py-4 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-all font-bold uppercase"
                >
                  ОТМЕНА
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Список инструментов */}
        <h4 className="text-2xl font-bold text-blue-400 mb-6 tracking-wider">
          📦 ВСЕ ИНСТРУМЕНТЫ ({tools.length})
        </h4>
        <div className="space-y-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500/30 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl font-bold text-white">{tool.name}</span>
                  <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                    tool.category === 'stealer' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    tool.category === 'rat' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {getCategoryLabel(tool.category)}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">{tool.desc}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(tool)}
                  className="px-5 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 transition-all text-sm font-semibold"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTool(tool.id)}
                  className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 transition-all text-sm font-semibold"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {tools.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <p className="text-2xl">Пока нет инструментов</p>
              <p className="text-zinc-600">Добавь первый через форму выше</p>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-zinc-500 tracking-[0.3em] text-sm">
        ENTROPY SQUAD © 2026 • ADMIN PANEL
      </footer>
    </div>
  );
}