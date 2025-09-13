import { useState } from "react";
import { AssessmentLanding } from "@/components/assessment/AssessmentLanding";
import { QuestionnaireView } from "@/components/assessment/QuestionnaireView";
import { ResultsDashboard } from "@/components/assessment/ResultsDashboard";

type AppState = 'landing' | 'questionnaire' | 'results';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, any>>({});

  const handleStartAssessment = () => {
    setCurrentView('questionnaire');
  };

  const handleCompleteAssessment = (responses: Record<string, any>) => {
    setAssessmentResponses(responses);
    setCurrentView('results');
  };

  const handleRetakeAssessment = () => {
    setAssessmentResponses({});
    setCurrentView('questionnaire');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'questionnaire') {
    return (
      <QuestionnaireView 
        onComplete={handleCompleteAssessment}
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentView === 'results') {
    return (
      <ResultsDashboard 
        responses={assessmentResponses}
        onRetake={handleRetakeAssessment}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <AssessmentLanding onStartAssessment={handleStartAssessment} />
  );
};

export default Index;
