'use client';

import React, { useState } from 'react';
import { Mail, Check, Trash, AlertCircle, RefreshCw, Send } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string; // UNREAD, RESOLVED
  createdAt: Date | string;
}

interface MessagesAdminClientProps {
  initialMessages: ContactMessage[];
}

export default function MessagesAdminClient({ initialMessages }: MessagesAdminClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');

  const statusOptions = ['All', 'UNREAD', 'RESOLVED'];

  // Apply filters
  const filteredMessages = messages.filter((m) => {
    if (statusFilter === 'All') return true;
    return m.status.toUpperCase() === statusFilter.toUpperCase();
  });

  const getStatusStyle = (status: string) => {
    if (status.toUpperCase() === 'RESOLVED') {
      return 'bg-primary/10 text-primary border border-primary/20';
    }
    return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionError('');
    setLoadingId(id);

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus.toUpperCase() } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus.toUpperCase() } : null));
        }
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to update message status.');
      }
    } catch {
      setActionError('An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setActionError('');
    setLoadingId(id);

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setSelectedMessage(null);
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to delete message.');
      }
    } catch {
      setActionError('An error occurred.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 text-foreground">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Customer <span className="font-serif italic text-brass">Inquiries</span>
        </h1>
        <p className="text-sm text-foreground/60 mt-1">
          Read customer inquiries, mark queries as resolved, and reply directly.
        </p>
      </div>

      {actionError && (
        <div className="flex items-center space-x-2 bg-carmine/15 text-carmine p-4 rounded-xl text-xs border border-carmine/30">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filter panel */}
      <div className="bg-card border border-border p-5 rounded-3xl shadow-sm flex items-center space-x-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-foreground/50 mb-1.5">Status Filter</label>
          <div className="flex space-x-1">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setStatusFilter(opt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === opt
                    ? 'bg-carmine text-bone shadow-sm'
                    : 'hover:bg-foreground/5 text-foreground/75'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-card border border-border p-12 text-center rounded-3xl text-foreground/50 font-semibold">
              No message logs found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMessages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  className={`bg-card border p-4.5 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-300 ${
                    selectedMessage?.id === m.id ? 'border-primary ring-2 ring-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-extrabold text-sm text-foreground">{m.name}</p>
                      <p className="text-xs text-foreground/50">{m.email}</p>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${getStatusStyle(m.status)}`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/70 mt-3 line-clamp-2 leading-relaxed">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-6 sticky top-6">
              
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h3 className="font-extrabold text-base">Inquiry Detail</h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${getStatusStyle(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-1">Customer Info</span>
                  <p className="font-extrabold text-sm text-foreground">{selectedMessage.name}</p>
                  <p className="text-foreground/60">{selectedMessage.email}</p>
                </div>

                <div>
                  <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-1">Received Time</span>
                  <p className="font-medium text-foreground">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <span className="text-foreground/50 text-[10px] uppercase font-bold block mb-1.5">Message Content</span>
                  <p className="text-xs text-foreground/80 leading-relaxed bg-foreground/2 p-4 rounded-xl border border-border/80 whitespace-pre-line select-text">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center gap-2">
                  <div className="flex space-x-1.5">
                    {selectedMessage.status === 'UNREAD' ? (
                      <button
                        onClick={() => handleUpdateStatus(selectedMessage.id, 'RESOLVED')}
                        disabled={loadingId === selectedMessage.id}
                        className="flex items-center space-x-1 px-3 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Resolve</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(selectedMessage.id, 'UNREAD')}
                        disabled={loadingId === selectedMessage.id}
                        className="flex items-center space-x-1 px-3 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Mark Unread</span>
                      </button>
                    )}
                    
                    {/* Native mailto reply link */}
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: DD Cookers Inquiry`}
                      className="flex items-center space-x-1 px-3 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </a>
                  </div>

                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    disabled={loadingId === selectedMessage.id}
                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-xl transition"
                    title="Delete message log"
                  >
                    <Trash className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-card border border-border border-dashed p-8 rounded-3xl text-foreground/40 text-center flex flex-col items-center justify-center min-h-[300px]">
              <Mail className="h-10 w-10 text-foreground/20 mb-3" />
              <p className="text-xs font-bold max-w-[180px] leading-relaxed">Select an inquiry from the inbox feed to read message contents and reply.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
