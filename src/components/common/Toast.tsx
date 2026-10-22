/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-slate-900/95 text-emerald-200',
    error: 'border-rose-500/30 bg-slate-900/95 text-rose-200',
    info: 'border-sky-500/30 bg-slate-900/95 text-sky-200',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <span className="text-sm font-medium text-slate-100">{toast.message}</span>
      </div>
    </div>
  );
};
