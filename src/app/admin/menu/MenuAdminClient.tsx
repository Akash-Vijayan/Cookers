'use client';

import React, { useState } from 'react';
import { Plus, Edit3, Trash, X, Save, ToggleLeft, ToggleRight, CheckCircle2, AlertCircle, Search, Utensils } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: boolean;
  dietaryTag: string;
  imageUrl: string;
}

interface MenuAdminClientProps {
  initialItems: MenuItem[];
}

export default function MenuAdminClient({ initialItems }: MenuAdminClientProps) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form states (Add/Edit)
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Starters');
  const [dietaryTag, setDietaryTag] = useState('VEG');
  const [imageUrl, setImageUrl] = useState('');
  const [availability, setAvailability] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Snacks', 'Beverages', 'Live Counters'];
  const formCategories = ['Starters', 'Main Course', 'Desserts', 'Snacks', 'Beverages', 'Live Counters'];
  const dietaryOptions = ['VEG', 'NON_VEG', 'VEGAN'];

  // Apply filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      categoryFilter === 'All' || item.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starters');
    setDietaryTag('VEG');
    setImageUrl('');
    setAvailability(true);
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategory(item.category);
    setDietaryTag(item.dietaryTag);
    setImageUrl(item.imageUrl);
    setAvailability(item.availability);
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  // Availability toggle action
  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability: !currentStatus }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, availability: !currentStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to toggle availability status:', err);
    }
  };

  // Submit Add/Edit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const payload = {
      name,
      description,
      price: parseFloat(price),
      category,
      dietaryTag,
      imageUrl: imageUrl || undefined,
      availability,
    };

    try {
      if (editingItem) {
        // Edit mode
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setItems((prev) => prev.map((item) => (item.id === editingItem.id ? data.menuItem : item)));
          setSuccess('Dish updated successfully.');
          setTimeout(() => setShowModal(false), 1200);
        } else {
          setError(data.error || 'Failed to update menu item.');
        }
      } else {
        // Add mode
        const res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setItems((prev) => [data.menuItem, ...prev]);
          setSuccess('New dish added to catalog.');
          setTimeout(() => setShowModal(false), 1200);
        } else {
          setError(data.error || 'Failed to add menu item.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please verify inputs.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Action
  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dish? This will remove it from customer menus.')) {
      return;
    }

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete item.');
      }
    } catch (err) {
      console.error('Delete item error:', err);
    }
  };

  return (
    <div className="space-y-8 text-charcoal dark:text-cream">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Menu Catalog</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Create, update, toggle availability, or delete appetizers, entrees, and dessert bars.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter panel */}
      <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Search Catalog</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by dish title, ingredients..."
              className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-foreground/50 mb-1.5">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-card text-foreground">{cat}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-foreground/50 text-sm font-semibold">
            No dishes found matching search filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-foreground/50 font-bold uppercase bg-foreground/2 dark:bg-foreground/1">
                  <th className="p-4">Dish</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Dietary</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Available</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-foreground/2">
                    <td className="p-4 flex items-center space-x-3.5">
                      <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-border bg-stone-100">
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-foreground">{item.name}</p>
                        <p className="text-[10px] text-foreground/50 mt-0.5 line-clamp-1 max-w-sm">{item.description}</p>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-foreground/75">{item.category}</td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.dietaryTag === 'VEG' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        item.dietaryTag === 'VEGAN' ? 'bg-teal-500/10 text-teal-500 border border-teal-500/20' :
                        'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}>
                        {item.dietaryTag}
                      </span>
                    </td>
                    <td className="p-4 font-black text-primary text-sm">${item.price.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleAvailability(item.id, item.availability)}
                        className="text-foreground hover:text-primary transition shrink-0 cursor-pointer"
                        title="Click to toggle availability"
                      >
                        {item.availability ? (
                          <ToggleRight className="h-7 w-7 text-primary" />
                        ) : (
                          <ToggleLeft className="h-7 w-7 text-foreground/30" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 hover:bg-foreground/5 text-foreground/70 rounded-lg transition"
                        title="Edit Dish"
                      >
                        <Edit3 className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition"
                        title="Delete Dish"
                      >
                        <Trash className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Catalog Manager
                </span>
                <h3 className="font-extrabold text-xl mt-2">
                  {editingItem ? `Edit: ${editingItem.name}` : 'Add New Catalog Dish'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-foreground/10 rounded-full text-foreground/75 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h4 className="font-extrabold text-lg">{success}</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                {error && (
                  <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-foreground/50 uppercase mb-1.5">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Garlic Naan, Alfredo Pasta"
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground/50 uppercase mb-1.5">Plate Price ($)</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 15.99"
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground/50 uppercase mb-1.5">Dietary Tag</label>
                    <select
                      value={dietaryTag}
                      onChange={(e) => setDietaryTag(e.target.value)}
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    >
                      {dietaryOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-card text-foreground">{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-foreground/50 uppercase mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    >
                      {formCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-card text-foreground">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-foreground/50 uppercase mb-1.5">Dishes Image URL</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="e.g. https://unsplash.com/..."
                      className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground/50 uppercase mb-1.5">Description / Ingredients</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a delicious description of ingredients or spice blends..."
                    className="w-full px-4 py-2.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="availability-check"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="availability-check" className="text-sm font-semibold">Available immediately in menus</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving Changes...' : 'Save Dish'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
