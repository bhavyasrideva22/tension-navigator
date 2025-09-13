import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  section: string;
  type: 'likert' | 'scenario' | 'choice';
  question: string;
  options?: string[];
  scenario?: {
    context: string;
    situation: string;
  };
}

interface QuestionnaireViewProps {
  onComplete: (responses: Record<string, any>) => void;
  onBack: () => void;
}

export function QuestionnaireView({ onComplete, onBack }: QuestionnaireViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Sample questions - in a real app, these would come from your assessment design
  const questions: Question[] = [
    {
      id: "eq_selfaware_1",
      section: "Emotional Intelligence Core",
      type: "likert",
      question: "I can tell when my body is getting tense during an argument."
    },
    {
      id: "eq_regulation_1", 
      section: "Emotional Intelligence Core",
      type: "likert",
      question: "I try to resolve disagreements without attacking the other person."
    },
    {
      id: "scenario_meeting",
      section: "Situational Assessment",
      type: "scenario",
      question: "What do you do?",
      scenario: {
        context: "Workplace Conflict",
        situation: "You're interrupted during a meeting by someone dismissing your idea without consideration."
      },
      options: [
        "Defend your idea assertively but respectfully",
        "Avoid saying anything further to prevent escalation", 
        "Get defensive and call them out publicly",
        "Acknowledge the tension and invite constructive feedback"
      ]
    },
    {
      id: "personality_approach",
      section: "Conflict Style",
      type: "choice", 
      question: "Which feels more true for you?",
      options: [
        "I try to avoid conflict when possible",
        "I face conflict head-on, even when it's uncomfortable"
      ]
    },
    {
      id: "eq_empathy_1",
      section: "Emotional Intelligence Core", 
      type: "likert",
      question: "I can usually sense when someone is upset during a conversation."
    },
    {
      id: "pearl_presence",
      section: "PEARL Framework",
      type: "scenario",
      question: "What do you do first?",
      scenario: {
        context: "Emotional Overwhelm",
        situation: "You're feeling overwhelmed during a heated disagreement with someone important to you."
      },
      options: [
        "Leave the conversation without saying anything",
        "Take a breath and acknowledge what you're feeling",
        "Keep debating even while feeling upset",
        "Change the topic to avoid escalation"
      ]
    }
  ];

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleResponse = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isAnswered = responses[currentQuestion.id] !== undefined;

  const renderLikertScale = () => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      <div className="flex gap-4 justify-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleResponse(value)}
            className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
              responses[currentQuestion.id] === value
                ? 'bg-primary border-primary text-primary-foreground shadow-glow'
                : 'border-border hover:border-primary hover:bg-primary/10'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );

  const renderScenario = () => (
    <div className="space-y-6">
      <div className="bg-secondary/30 p-4 rounded-lg border-l-4 border-accent">
        <div className="text-sm font-medium text-accent-foreground mb-2">
          {currentQuestion.scenario?.context}
        </div>
        <p className="text-muted-foreground italic">
          "{currentQuestion.scenario?.situation}"
        </p>
      </div>
      
      <div className="space-y-3">
        {currentQuestion.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleResponse(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              responses[currentQuestion.id] === index
                ? 'bg-primary/10 border-primary text-primary shadow-soft'
                : 'bg-card border-border hover:border-accent hover:bg-accent/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                responses[currentQuestion.id] === index
                  ? 'bg-primary border-primary'
                  : 'border-border'
              }`}>
                {responses[currentQuestion.id] === index && (
                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                )}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderChoice = () => (
    <div className="space-y-4">
      {currentQuestion.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => handleResponse(index)}
          className={`w-full text-left p-6 rounded-lg border transition-all duration-200 ${
            responses[currentQuestion.id] === index
              ? 'bg-gradient-secondary text-white border-transparent shadow-medium'
              : 'bg-gradient-card border-border hover:border-accent hover:shadow-soft'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 ${
              responses[currentQuestion.id] === index
                ? 'bg-white border-white'
                : 'border-border'
            }`}>
              {responses[currentQuestion.id] === index && (
                <div className="w-full h-full rounded-full bg-accent scale-50" />
              )}
            </div>
            <span>{option}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="text-center">
            <div className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
              {currentQuestion.section}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-card border-0 shadow-medium animate-fade-in">
            <h2 className="text-2xl font-semibold text-center mb-8 text-card-foreground">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'likert' && renderLikertScale()}
            {currentQuestion.type === 'scenario' && renderScenario()}
            {currentQuestion.type === 'choice' && renderChoice()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button 
                variant={isAnswered ? "gradient" : "outline"}
                onClick={handleNext}
                disabled={!isAnswered}
                className="gap-2"
              >
                {currentIndex === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}