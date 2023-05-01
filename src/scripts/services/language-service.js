class LanguageService {
    lang = this.setLanguage();

    isSupportedLanguage(lang) {
        return lang === 'en' || lang === 'ru';
    }

    getLanguageLocalStorage() {
        return localStorage.getItem('lang');
    }

    setLanguageLocalStorage(lang) {
        localStorage.setItem('lang', lang);
    }

    toggleLanguage() {
        this.lang = this.lang === 'en' ? 'ru' : 'en';
        this.setLanguageLocalStorage(this.lang);
    }

    setLanguage() {
        const lang = this.getLanguageLocalStorage();

        if (!lang || !this.isSupportedLanguage(lang)) {
            this.setLanguageLocalStorage('en');
            return 'en';
        }
        return lang;
    }
}

const languageService = new LanguageService();

export default languageService;
