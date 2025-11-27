import React, { useState } from 'react';
import { Key, Unlock, Trash2, Plus, LayoutGrid, Upload } from 'lucide-react';
import { Category } from '../types';
import { Button } from './Button';

interface SidebarProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  isAdmin: boolean;
  onAdminLoginClick: () => void;
  onAddCategory: (name: string) => void;
  onRemoveCategory: (name: string) => void;
  onLogout: () => void;
  onUploadClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  isAdmin,
  onAdminLoginClick,
  onAddCategory,
  onRemoveCategory,
  onLogout,
  onUploadClick,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName('');
      setIsAdding(false);
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-white/90 backdrop-blur-md border-r border-orange-100 flex flex-col z-30 transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:relative shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="p-8 pb-4">
        <h1 className="text-2xl font-semibold mb-8 text-orange-600 tracking-tight">Designer Portfolio</h1>

        <div className="space-y-1">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const isSystem = category === 'All' || category === 'Designer Profile';
            
            return (
              <div key={category} className="group flex items-center gap-1">
                <button
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-orange-100 text-orange-800'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-900'
                  }`}
                >
                  {category}
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                </button>
                {isAdmin && !isSystem && (
                  <button
                    onClick={() => onRemoveCategory(category)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="카테고리 삭제"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}

          {isAdmin && (
            <div className="mt-4 pt-4 border-t border-slate-100">
               {!isAdding ? (
                 <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-dashed border-orange-200 hover:border-orange-300"
                 >
                    <Plus size={14} /> 카테고리 추가
                 </button>
               ) : (
                 <form onSubmit={handleAddSubmit} className="space-y-2 px-1">
                    <input 
                      type="text" 
                      autoFocus
                      placeholder="카테고리 이름"
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      className="w-full text-sm px-2 py-1.5 border border-slate-200 rounded focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="flex-1 py-1 text-xs">추가</Button>
                      <Button type="button" size="sm" variant="secondary" onClick={() => setIsAdding(false)} className="flex-1 py-1 text-xs">취소</Button>
                    </div>
                 </form>
               )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50 bg-slate-50/50">
        {isAdmin ? (
          <div className="space-y-3">
             <Button 
                onClick={onUploadClick}
                className="w-full justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                variant="primary"
             >
                <Upload size={16} /> 작품 업로드
             </Button>

             <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-xs font-medium text-orange-800">관리자 모드</span>
                </div>
                <button 
                   onClick={onLogout}
                   className="text-orange-400 hover:text-orange-600 transition-colors"
                   title="관리자 종료"
                >
                   <Unlock size={16} />
                </button>
             </div>
          </div>
        ) : (
          <button
            onClick={onAdminLoginClick}
            className="group flex items-center gap-3 text-slate-400 hover:text-orange-600 transition-colors px-2 py-1"
            title="관리자 모드"
          >
            <div className="p-2 rounded-full group-hover:bg-orange-100 transition-colors bg-orange-50">
              <Key size={18} className="text-orange-400" />
            </div>
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">
              관리자 로그인
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};