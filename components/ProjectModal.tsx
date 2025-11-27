import React, { useState, useEffect } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { Button } from './Button';
import { PortfolioItem } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialData?: PortfolioItem | null;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; info: string; file?: File }) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  mode, 
  initialData, 
  onClose, 
  onSubmit 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setInfo(initialData.info || '');
        setFile(null);
      } else {
        setTitle('');
        setDescription('');
        setInfo('');
        setFile(null);
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create' && !file) {
      alert("파일을 선택해주세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    onSubmit({ title, description, info, file: file || undefined });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-orange-600">
              {mode === 'create' ? '작품 업로드' : '작품 수정'}
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="작품 제목"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none h-24"
                placeholder="작품에 대한 간단한 설명..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                정보 (연도 · 타입)
              </label>
              <input
                type="text"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="예: 2023 · Residential"
              />
            </div>

            {mode === 'create' && (
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                  파일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className={`flex items-center gap-3 px-3 py-2 border border-dashed rounded-lg transition-colors ${file ? 'border-orange-500 bg-orange-50' : 'border-slate-300 hover:bg-slate-50'}`}>
                    <UploadCloud size={20} className={file ? 'text-orange-500' : 'text-slate-400'} />
                    <span className={`text-sm ${file ? 'text-orange-700 font-medium' : 'text-slate-500'}`}>
                      {file ? file.name : '이미지 또는 동영상 선택...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6 pt-2">
              <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                취소
              </Button>
              <Button type="submit" variant="primary" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                {mode === 'create' ? '업로드' : '저장'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};