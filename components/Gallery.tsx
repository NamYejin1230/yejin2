import React from 'react';
import { Trash2, Image as ImageIcon, Edit2 } from 'lucide-react';
import { PortfolioItem } from '../types';

interface GalleryProps {
  items: PortfolioItem[];
  isAdmin: boolean;
  onDeleteItem: (id: number) => void;
  onEditItem: (item: PortfolioItem) => void;
  category: string;
}

export const Gallery: React.FC<GalleryProps> = ({ items, isAdmin, onDeleteItem, onEditItem }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
           <ImageIcon size={48} className="mb-4 opacity-50" />
           <p className="text-lg">해당 카테고리에 작품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    controls 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-orange-700 mb-1 leading-tight">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-auto">{item.info}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onEditItem(item)}
                      className="flex-1 py-1.5 px-3 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit2 size={12} /> 수정
                    </button>
                    <button
                      onClick={() => {
                        if(confirm('정말 이 작품을 삭제하시겠습니까?')) {
                          onDeleteItem(item.id);
                        }
                      }}
                      className="flex-1 py-1.5 px-3 bg-red-50 text-red-500 hover:bg-red-100 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={12} /> 삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};