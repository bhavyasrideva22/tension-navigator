import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Brain, Users, Target, TrendingUp } from "lucide-react";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

export function AssessmentLanding({ onStartAssessment }: AssessmentLandingProps) {
  const features = [
    {
      icon: Brain,
      title: "Self-Awareness",
      description: "Understand your emotional triggers and conflict patterns"
    },
    {
      icon: Users,
      title: "Empathy & Social Skills",
      description: "Learn how you connect with others during disagreements"
    },
    {
      icon: Target,
      title: "Conflict Style Profile",
      description: "Discover your unique approach to handling tension"
    },
    {
      icon: TrendingUp,
      title: "Growth Roadmap",
      description: "Get a personalized 4-week development plan"
    }
  ];

  const benefits = [
    "Discover your unique conflict handling style",
    "Understand your emotional intelligence strengths",
    "Learn effective strategies for difficult conversations",
    "Get personalized growth recommendations",
    "Improve relationships and communication skills"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-primary px-4 py-2 rounded-full text-white text-sm font-medium mb-8 shadow-glow">
            🔥 Conflict Handling Style Assessment
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight mb-6">
            Understand Your Reactions.<br />
            Navigate Tension.<br />
            Lead with Clarity.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover how you handle conflict through the lens of emotional intelligence. 
            This comprehensive assessment reveals your natural patterns, strengths, and growth opportunities 
            in managing difficult conversations and tense situations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={onStartAssessment}
              className="text-lg px-8 py-4 animate-pulse-glow"
            >
              Start Your Assessment
            </Button>
            <div className="text-sm text-muted-foreground">
              ⏱️ Takes 20-30 minutes • Get instant results
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-soft">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* What You'll Discover Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-card border-0 shadow-medium">
            <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
              What You'll Discover
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Assessment Components</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eq-excellent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Emotional Intelligence Core (10-12 items)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eq-excellent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Personality & Emotional Style Analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eq-excellent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Situational Conflict Scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eq-excellent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">PEARL Framework Evaluation</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">Your Results Include</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                variant="assessment" 
                size="lg" 
                onClick={onStartAssessment}
                className="px-8 py-4"
              >
                Begin Assessment Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-eq-excellent" />
              <span>Scientifically Validated</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-eq-excellent" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-eq-excellent" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}