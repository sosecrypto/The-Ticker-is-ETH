import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
    const { i18n } = useTranslation();
    const isKo = i18n.language === 'ko';

    const toggle = () => {
        i18n.changeLanguage(isKo ? 'en' : 'ko');
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle language"
        >
            <span className={isKo ? 'text-white font-bold' : ''}>KO</span>
            <span className="text-gray-600">/</span>
            <span className={!isKo ? 'text-white font-bold' : ''}>EN</span>
        </button>
    );
};

export default LanguageToggle;
