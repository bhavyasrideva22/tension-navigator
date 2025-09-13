import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  TrendingUp, 
  Download,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface ResultsDashboardProps {
  responses: Record<string, any>;
  onRetake: () => void;
  onBackToHome: () => void;
}

export function ResultsDashboard({ responses, onRetake, onBackToHome }: ResultsDashboardProps) {
  // Mock results calculation - in a real app, this would be computed from responses
  const eqScores = {
    selfAwareness: 78,
    selfRegulation: 65,
    empathy: 85,
    socialSkills: 72,
    motivation: 70
  };

  const overallEQ = Math.round(Object.values(eqScores).reduce((a, b) => a + b, 0) / 5);
  
  const profileLabel = "The Empathetic Mediator";
  const conflictStyle = "Diplomatic De-escalator";
  
  const pearlScores = {
    presence: 75,
    empathy: 88,
    affectRegulation: 62,
    relationalAgility: 70,
    leadership: 68
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "eq-excellent";
    if (score >= 65) return "eq-good"; 
    if (score >= 50) return "eq-developing";
    return "eq-needs";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 50) return "Developing";
    return "Needs Growth";
  };

  const strengths = [
    "Strong empathetic responses in conflict situations",
    "Natural ability to see multiple perspectives",
    "Calm presence during tense conversations"
  ];

  const growthAreas = [
    "Self-regulation during emotional overwhelm",
    "Assertive communication of personal boundaries", 
    "Confidence in addressing conflict directly"
  ];

  const recommendations = [
    {
      week: "Week 1",
      focus: "Emotional Awareness",
      action: "Practice identifying physical tension signals during disagreements"
    },
    {
      week: "Week 2", 
      focus: "Self-Regulation",
      action: "Implement 3-breath rule before responding in heated moments"
    },
    {
      week: "Week 3",
      focus: "Assertive Communication", 
      action: "Use 'I' statements to express needs during conflict"
    },
    {
      week: "Week 4",
      focus: "Rebuilding Trust",
      action: "Practice repair conversations after disagreements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary px-4 py-2 rounded-full text-white text-sm font-medium mb-6 shadow-glow">
            ✨ Assessment Complete
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Your Conflict EQ Profile
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding your emotional intelligence and conflict handling style
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8">
          {/* Overall Score Card */}
          <Card className="p-8 bg-gradient-card border-0 shadow-medium text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="text-6xl font-bold text-primary mb-2">{overallEQ}</div>
                <div className="text-muted-foreground mb-4">Overall EQ Score</div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {profileLabel}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="text-2xl font-semibold text-accent mb-2">Conflict Style</div>
                <div className="text-lg text-muted-foreground mb-4">{conflictStyle}</div>
                <Badge variant="outline" className="border-accent text-accent">
                  Diplomatic Approach
                </Badge>
              </div>
            </div>
          </Card>

          {/* EQ Dimensions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Emotional Intelligence Breakdown
              </h3>
              
              <div className="space-y-4">
                {Object.entries(eqScores).map(([dimension, score]) => (
                  <div key={dimension} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {dimension.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`text-sm font-medium text-${getScoreColor(score)}`}>
                        {score} - {getScoreLabel(score)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${getScoreColor(score)} transition-all duration-1000 ease-out`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                PEARL Framework Analysis
              </h3>
              
              <div className="space-y-4">
                {Object.entries(pearlScores).map(([trait, score]) => (
                  <div key={trait} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {trait.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`text-sm font-medium text-${getScoreColor(score)}`}>
                        {score}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-${getScoreColor(score)} transition-all duration-1000 ease-out`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-eq-excellent">
                <CheckCircle className="w-5 h-5" />
                Your Strengths
              </h3>
              
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-eq-excellent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-soft">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-eq-developing">
                <TrendingUp className="w-5 h-5" />
                Growth Opportunities
              </h3>
              
              <ul className="space-y-3">
                {growthAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-eq-developing mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 4-Week Development Plan */}
          <Card className="p-8 bg-gradient-card border-0 shadow-medium">
            <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Your 4-Week Conflict Intelligence Growth Plan
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="space-y-3">
                  <div className="w-full bg-accent/20 text-accent font-semibold text-center py-2 rounded-lg">
                    {rec.week}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-card-foreground mb-2">{rec.focus}</div>
                    <div className="text-sm text-muted-foreground">{rec.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gradient" size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download Full Report
            </Button>
            
            <Button variant="outline" onClick={onRetake} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retake Assessment
            </Button>
            
            <Button variant="ghost" onClick={onBackToHome}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}