import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { Button } from './Button';
import { ADMIN_PASSWORD } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
      setPassword('');
      setError('');
    } else {
      alert("비밀번호가 틀렸습니다.");
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-orange-700">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Lock size={20} />
              </div>
              <h3 className="text-lg font-semibold">관리자 로그인</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="비밀번호 입력 (1234)"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                취소
              </Button>
              <Button type="submit" variant="primary" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                확인
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};