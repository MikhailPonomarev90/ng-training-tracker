export type SupportedLang = 'ru' | 'en';

export interface TranslationKeys {
  welcome: string;
  tasks: {
    title: string;
    placeholder: string;
  };
  dayPage: {
    dayTitle: string;
    statusDone: string;
    statusProgress: string;
    dayNotSelected: string;
    uploadInstructions: string;
    jsonLabel: string;
    jsonPlaceholder: string;
    btnLoad: string;
    btnCreateTask: string;
    btnReport: string;
    tabs: {
      general: string;
      theory: string;
      practice: string;
      questions: string;
    };
    general: {
      briefing: string;
      notes: string;
    };
    theory: {
      info: string;
      time: string;
      timePlaceholder: string;
      learned: string;
      unclear: string;
      terms: string;
    };
    practice: {
      time: string;
      progress: string;
      emptyTasks: string;
    };
    questions: {
      title: string;
      empty: string;
      answerLabel: string;
      yes: string;
      no: string;
      architectureTitle: string;
      architectureQuestion: string;
      architectureAnswer: string;
      ratingLabel: string;
    };
  };
}
