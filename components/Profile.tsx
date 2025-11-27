import React from 'react';
import { Mail, MapPin, Award, Instagram, Globe } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100 flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-shrink-0 relative group">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <img 
              src="https://picsum.photos/seed/profile_yejin/500/500" 
              alt="Designer Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-100 rounded-full -z-10 blur-xl opacity-70"></div>
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-orange-50 rounded-full -z-10 blur-xl opacity-70"></div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-orange-600 mb-2">Ye Jin Nam — 공간 디자이너</h2>
            <p className="text-gray-600 font-medium text-lg tracking-wide">Spatial Designer</p>
          </div>

          <div className="prose prose-slate text-slate-600 leading-relaxed">
            <p>
              자연에서 영감을 얻은 미니멀한 공간 설계, 빛과 재료의 조화를 통한 감성적 경험을 추구합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>경력: 8년</li>
              <li>주요 프로젝트: 전시 공간, 상업공간, 개인 스튜디오</li>
              <li>철학: "Honest Materiality" — 재료 본연의 물성을 존중하는 디자인</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Award className="text-orange-500" size={20} />
              <span className="text-sm">2023 디자인 어워드 수상</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="text-orange-500" size={20} />
              <span className="text-sm">Seoul, South Korea</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex gap-4">
             <a href="#" className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <Mail size={20} />
             </a>
             <a href="#" className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <Instagram size={20} />
             </a>
             <a href="#" className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <Globe size={20} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};