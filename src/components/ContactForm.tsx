'use client';

import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border p-8 rounded-3xl shadow-xl space-y-6">
      <h3 className="text-xl font-bold text-foreground">Send Us a Direct Message</h3>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center space-x-3 text-xs font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Thank you! Your message has been sent successfully. We will contact you soon.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl flex items-center space-x-3 text-xs font-semibold">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-brass font-bold block">
            Your Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh"
            className="w-full bg-input-bg/90 border border-border/80 focus:border-carmine focus:ring-1 focus:ring-carmine text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-brass font-bold block">
            Email / Contact No.
          </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. ramesh@example.com / +91 94431"
            className="w-full bg-input-bg/90 border border-border/80 focus:border-carmine focus:ring-1 focus:ring-carmine text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-brass font-bold block">
            Event Requirement & Message
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your event date, location, guest count, and menu preferences..."
            className="w-full bg-input-bg/90 border border-border/80 focus:border-carmine focus:ring-1 focus:ring-carmine text-xs text-foreground placeholder:text-muted-foreground/40 px-4 py-3 rounded-xl outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#B32E33] to-[#6E151A] hover:brightness-110 text-bone font-bold uppercase tracking-widest text-xs shadow-lg transition duration-300 cursor-pointer flex items-center justify-center space-x-2"
        >
          <Send className="h-4 w-4 text-brass" />
          <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
        </button>
      </form>
    </div>
  );
}
