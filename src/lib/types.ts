export type ProjectType =
  | 'Villa Renovation'
  | 'Interior Design'
  | 'Turnkey Fit-Out'
  | 'Bespoke Joinery'
  | 'Apartment / Penthouse'
  | 'Commercial Project';

export type LocationOption =
  | 'Emirates Hills'
  | 'Palm Jumeirah'
  | 'Dubai Hills'
  | 'Arabian Ranches'
  | 'Jumeirah'
  | 'Other';

export type PropertySizeOption =
  | 'Under 2,000 sq ft'
  | '2,000–5,000 sq ft'
  | '5,000–8,000 sq ft'
  | '8,000–12,000 sq ft'
  | '12,000+ sq ft';

export type ScopeOption =
  | 'Selected Areas'
  | 'Full Interior'
  | 'Full Renovation'
  | 'Turnkey Transformation';

export type BudgetOption =
  | 'AED 500K–1M'
  | 'AED 1M–2M'
  | 'AED 2M–3M'
  | 'AED 3M+'
  | 'Prefer to discuss';

export type TimelineOption =
  | 'Immediately'
  | '1–3 months'
  | '3–6 months'
  | '6+ months';

export type RequirementOption =
  | 'Bespoke Joinery'
  | 'Smart Home'
  | 'Kitchen'
  | 'Wardrobes'
  | 'Marble / Stone'
  | 'Landscaping'
  | 'MEP'
  | 'Complete Turnkey';

export interface ConciergeAnswers {
  projectType?: ProjectType;
  location?: LocationOption;
  customLocation?: string;
  propertySize?: PropertySizeOption | string;
  scope?: ScopeOption | string;
  budget?: BudgetOption;
  timeline?: TimelineOption;
  requirements: RequirementOption[];
  notes?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  preferredTiming?: string;
}

export type StepKey =
  | 'welcome'
  | 'projectType'
  | 'location'
  | 'propertyType'
  | 'propertySize'
  | 'scope'
  | 'budget'
  | 'timeline'
  | 'requirements'
  | 'notes'
  | 'contact'
  | 'analysis'
  | 'brief';

export interface ScoreItem {
  label: string;
  points: number;
}

export interface LeadIntelligence {
  intent: 'HIGH' | 'MEDIUM' | 'LOW';
  intentExplanation: string;
  projectValue: 'HIGH' | 'EXCEPTIONAL' | 'LUXURY';
  valueExplanation: string;
  timelineScore: 'NEAR TERM' | 'MID TERM' | 'LONG TERM';
  timelineExplanation: string;
  projectComplexity: 'HIGH' | 'EXCEPTIONAL' | 'STANDARD';
  complexityExplanation: string;
  recommendation: string;
  whyHighIntent: string[];
  totalScore: number; // 0-100
  scoreBreakdown: ScoreItem[];
  assignedDirector: string;
  specialistRole: string;
  estimatedValue: string;
  whatsappDraft: string;
}

export type LeadStatus = 'NEW' | 'QUALIFIED' | 'CONSULTATION' | 'ASSIGNED' | 'FOLLOW-UP';

export interface ClientBriefData {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  preferredTiming?: string;
  projectType: ProjectType;
  location: string;
  propertySize: string;
  scope: string;
  budget: BudgetOption;
  timeline: TimelineOption;
  requirements: RequirementOption[];
  notes?: string;
  intelligence: LeadIntelligence;
  status: LeadStatus;
}
