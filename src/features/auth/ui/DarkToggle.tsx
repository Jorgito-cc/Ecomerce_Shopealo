import { FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../../../context/DarkModeContext';

export const DarkToggle: React.FC = () => {
  const { theme, toggle } = useDarkMode();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors
                  ${isDark ? 'bg-indigo-500' : 'bg-slate-300'}`}
      title="Toggle dark mode"
    >
      <span
        className={`absolute left-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white
                    transform transition-transform
                    ${isDark ? 'translate-x-5' : 'translate-x-0'}`}
      >
        {isDark ? <FaSun className="text-amber-500 text-xs" /> : <FaMoon className="text-slate-600 text-xs" />}
      </span>
    </button>
  );
};
