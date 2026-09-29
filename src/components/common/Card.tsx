import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  headerBorder = true
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm dark:shadow-xl p-6 transition-all text-slate-900 dark:text-slate-100 ${className}`}>
      {(title || action) && (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5 pb-3.5 ${headerBorder ? 'border-b border-slate-100 dark:border-slate-800/80' : ''}`}>
          <div>
            {title && (
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 tracking-wider uppercase flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
