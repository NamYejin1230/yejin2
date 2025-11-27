import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Gallery } from './components/Gallery';
import { Profile } from './components/Profile';
import { AdminModal } from './components/AdminModal';
import { ProjectModal } from './components/ProjectModal';
import { 
  PortfolioItem, 
  Category, 
  AppState, 
  STORAGE_KEY, 
  INITIAL_CATEGORIES, 
  INITIAL_ITEMS 
} from './types';

export default function App() {
  // --- State ---
  const [data, setData] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
    return { categories: INITIAL_CATEGORIES, items: INITIAL_ITEMS };
  });

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // --- Handlers ---
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddCategory = (name: string) => {
    if (data.categories.includes(name)) {
      alert('이미 존재하는 카테고리입니다.');
      return;
    }
    const newCategories = [...data.categories];
    // Insert before "Designer Profile"
    const profileIdx = newCategories.indexOf("Designer Profile");
    if (profileIdx > -1) {
      newCategories.splice(profileIdx, 0, name);
    } else {
      newCategories.push(name);
    }
    setData(prev => ({ ...prev, categories: newCategories }));
  };

  const handleRemoveCategory = (name: string) => {
    if (name === 'All' || name === 'Designer Profile') {
        alert("이 카테고리는 삭제할 수 없습니다.");
        return;
    }
    if (!confirm(`${name} 카테고리를 삭제하시겠습니까?`)) return;

    setData(prev => {
      const newItems = prev.items.map(item => 
        item.category === name ? { ...item, category: 'Uncategorized' } : item
      );
      return {
        categories: prev.categories.filter(c => c !== name),
        items: newItems
      };
    });

    if (activeCategory === name) setActiveCategory('All');
  };

  const handleDeleteItem = (id: number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  // Open modal for Creating
  const handleStartUpload = () => {
    setProjectModalMode('create');
    setEditingItem(null);
    setIsProjectModalOpen(true);
  };

  // Open modal for Editing
  const handleStartEdit = (item: PortfolioItem) => {
    setProjectModalMode('edit');
    setEditingItem(item);
    setIsProjectModalOpen(true);
  };

  // Save Project (Create or Edit)
  const handleSaveProject = (formData: { title: string; description: string; info: string; file?: File }) => {
    if (projectModalMode === 'create') {
      // Create Logic
      if (!formData.file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const type = formData.file?.type.startsWith('video') ? 'video' : 'image';
        
        const newItem: PortfolioItem = {
          id: Date.now(),
          title: formData.title,
          description: formData.description,
          info: formData.info,
          category: activeCategory === 'All' || activeCategory === 'Designer Profile' ? 'Uncategorized' : activeCategory,
          src: result,
          type: type
        };
        
        setData(prev => ({ ...prev, items: [newItem, ...prev.items] }));
        setIsProjectModalOpen(false);
      };
      reader.readAsDataURL(formData.file);
    } else if (projectModalMode === 'edit' && editingItem) {
      // Edit Logic
      // Since edit modal in reference doesn't allow file change, we just update text fields
      // But if we extended it to allow file change, logic would be here.
      // Current ProjectModal only shows file input in 'create' mode to match reference.
      
      const updatedItem = {
        ...editingItem,
        title: formData.title,
        description: formData.description,
        info: formData.info
      };

      setData(prev => ({
        ...prev,
        items: prev.items.map(it => it.id === editingItem.id ? updatedItem : it)
      }));
      setIsProjectModalOpen(false);
    }
  };

  const filteredItems = data.items.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Designer Profile') return false;
    return item.category === activeCategory;
  });

  return (
    <div className="flex min-h-screen bg-orange-50 text-slate-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Sidebar 
        categories={data.categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isAdmin={isAdmin}
        onAdminLoginClick={() => setIsLoginModalOpen(true)}
        onAddCategory={handleAddCategory}
        onRemoveCategory={handleRemoveCategory}
        onLogout={handleLogout}
        onUploadClick={handleStartUpload}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
           {activeCategory === 'Designer Profile' ? (
             <Profile />
           ) : (
             <Gallery 
                items={filteredItems}
                category={activeCategory}
                isAdmin={isAdmin}
                onDeleteItem={handleDeleteItem}
                onEditItem={handleStartEdit}
             />
           )}
        </div>
      </main>

      <AdminModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <ProjectModal 
        isOpen={isProjectModalOpen}
        mode={projectModalMode}
        initialData={editingItem}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleSaveProject}
      />
    </div>
  );
}