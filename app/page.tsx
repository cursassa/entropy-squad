"use client";

import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    time: '',
    timezone: '',
    experience: '',
    rats: '',
    contactType: 'discord',
    contactValue: ''
  });

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1504221553460645928/Ux9XsVi7ExP7PGWRgRhvFG19CAmR-hsVm032txUHPJyY4OtPABREbLQqY7L8D09FTv30";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSend = async () => {
    if (isSending) return;
    setIsSending(true);

    const contactLabel = formData.contactType === 'discord' ? 'Discord' : 'Telegram';
    const contactField = `${contactLabel}: ${formData.contactValue || "Не указано"}`;

    const discordMessage = {
      embeds: [{
        title: "📑 НОВАЯ ЗАЯВКА В STAFF: ENTROPY SQUAD",
        color: 3447003,
        fields: [
          { name: "Возраст", value: formData.age || "Не указано", inline: true },
          { name: "Часовой пояс", value: formData.timezone || "Не указано", inline: true },
          { name: "Время на сервер", value: formData.time || "Не указано" },
          { name: "Опыт в КМ (рейтинг)", value: formData.experience || "Не указано" },
          { name: "Знание софтов (RAT)", value: formData.rats || "Не указано" },
          { name: "Контакт", value: contactField, inline: false }
        ],
        footer: { text: "Entropy Squad System • 2026" },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
      });

      if (response.ok) {
        alert("Заявка успешно отправлена!");
        setIsModalOpen(false);
        setFormData({ age: '', time: '', timezone: '', experience: '', rats: '', contactType: 'discord', contactValue: '' });
      } else {
        alert("Ошибка при отправке.");
      }
    } catch (error) {
      alert("Ошибка сети.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-blue-500">
      
      {/* Свечение */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3B82FF11,transparent_50%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#2563EB22,transparent_40%)]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4 text-2xl font-bold tracking-[0.3em] text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-blue-400/30 bg-black flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.45)]">
            <span className="text-blue-400 font-black">E_S</span>
          </div>
          ENTROPY SQUAD
        </div>

        <div className="flex gap-4">
          <a
            href="https://discord.gg/vC3Pvn9Vfw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-2xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)]"
          >
            JOIN DISCORD
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-xl text-sm tracking-widest uppercase text-blue-300">
          SOCIAL ENGINEERING COMMUNITY
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-[0.15em] text-white drop-shadow-[0_0_35px_rgba(59,130,246,0.8)]">
          ENTROPY
        </h1>

        <h2 className="text-5xl md:text-7xl font-black tracking-[0.2em] text-blue-400 mt-2 drop-shadow-[0_0_40px_rgba(59,130,246,1)]">
          SQUAD
        </h2>

        <p className="max-w-2xl mt-8 text-lg text-zinc-400 leading-relaxed">
          Modern social engineering research, digital awareness and futuristic cyberpunk infrastructure.
        </p>

        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <a
            href="https://discord.gg/vC3Pvn9Vfw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all text-lg font-semibold shadow-[0_0_40px_rgba(59,130,246,0.7)]"
          >
            JOIN DISCORD
          </a>

          <a
            href="/catalog"
            className="px-8 py-4 rounded-2xl border border-blue-500/40 bg-white/5 hover:bg-white/10 transition-all text-lg font-semibold backdrop-blur-xl"
          >
            DOWNLOAD TOOLS
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="catalog" className="relative z-10 px-8 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'FAST SUPPORT',
              desc: 'Quick response team with organized systems and active management.'
            },
            {
              title: 'ACTIVE COMMUNITY',
              desc: 'Elite members, fast support and organized systems.'
            },
            {
              title: 'REMOTE SYSTEMS',
              desc: 'Advanced remote management systems with futuristic cyberpunk interface.'
            }
          ].map((card, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl border border-blue-500/20 bg-white/5 backdrop-blur-2xl hover:border-blue-400/60 transition-all hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            >
              <div className="text-2xl font-bold text-blue-400 mb-4 tracking-wider">
                {card.title}
              </div>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-all">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment */}
      <section className="relative z-10 px-8 py-28 text-center">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-blue-500/20 bg-white/5 backdrop-blur-2xl p-16 shadow-[0_0_80px_rgba(59,130,246,0.18)]">
          <div className="text-blue-400 text-sm tracking-[0.5em] uppercase mb-4">
            Moderator Recruitment
          </div>
          <h3 className="text-5xl md:text-6xl font-black tracking-[0.15em] mb-6">
            JOIN THE STAFF
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            We are searching for active, trusted and responsible moderators ready to become part of the ENTROPY SQUAD.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-10 px-10 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all text-lg font-bold shadow-[0_0_40px_rgba(59,130,246,0.7)]"
          >
            STAFF APPLICATION
          </button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-zinc-500 tracking-[0.3em] text-sm">
        ENTROPY SQUAD © 2026
      </footer>

      {/* Модалка с заявкой */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
          <div className="relative w-full max-w-xl bg-[#0a0a0c] border border-blue-500/30 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(59,130,246,0.2)]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-8 text-zinc-500 hover:text-white text-2xl"
            >
              ✕
            </button>
            <h3 className="text-3xl font-black tracking-widest text-blue-400 mb-8 uppercase text-center italic">
              Staff Application
            </h3>

            <div className="space-y-5">
              <input
                id="age"
                value={formData.age}
                onChange={handleInputChange}
                type="text"
                placeholder="Ваш возраст"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
              />
              <input
                id="time"
                value={formData.time}
                onChange={handleInputChange}
                type="text"
                placeholder="Сколько времени готовы уделять?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  id="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Часовой пояс"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                />
                <input
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Время в КМ"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                />
              </div>
              <textarea
                id="rats"
                value={formData.rats}
                onChange={handleInputChange}
                placeholder="В каких ратках разбираетесь?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white h-24 resize-none"
              />

              {/* Контактные данные */}
              <div className="space-y-3">
                <label className="text-sm text-zinc-400 uppercase tracking-widest">Контактные данные</label>
                <select
                  id="contactType"
                  value={formData.contactType}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                >
                  <option value="discord" className="bg-zinc-900 text-white">Discord</option>
                  <option value="telegram" className="bg-zinc-900 text-white">Telegram</option>
                </select>
                <input
                  id="contactValue"
                  value={formData.contactValue}
                  onChange={handleInputChange}
                  type="text"
                  placeholder={formData.contactType === 'discord' ? "Ваш Discord (username)" : "Ваш Telegram (@username)"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={isSending}
                className={`w-full py-4 rounded-xl font-black tracking-widest transition-all uppercase ${
                  isSending
                    ? 'bg-zinc-700 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                }`}
              >
                {isSending ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ В DISCORD'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}