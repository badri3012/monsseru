import {
  ProjectType,
  LocationOption,
  PropertySizeOption,
  ScopeOption,
  BudgetOption,
  TimelineOption,
  RequirementOption,
  ConciergeAnswers,
  LeadIntelligence,
  ScoreItem
} from './types';

export const PROJECT_TYPES: { type: ProjectType; description: string }[] = [
  {
    type: 'Villa Renovation',
    description: 'Comprehensive architectural layout overhaul & exterior revitalization'
  },
  {
    type: 'Interior Design',
    description: 'Bespoke interior concepts, material curation & fine furnishings'
  },
  {
    type: 'Turnkey Fit-Out',
    description: 'Single-point accountability from bare shell to move-in key handover'
  },
  {
    type: 'Bespoke Joinery',
    description: 'Handcrafted Italian millwork, architectural timber & custom cabinetry'
  },
  {
    type: 'Apartment / Penthouse',
    description: 'Luxury high-rise residence architectural transformation'
  },
  {
    type: 'Commercial Project',
    description: 'Luxury private offices, boutique headquarters & hospitality spaces'
  }
];

export const LOCATIONS: LocationOption[] = [
  'Emirates Hills',
  'Palm Jumeirah',
  'Dubai Hills',
  'Arabian Ranches',
  'Jumeirah',
  'Other'
];

export const PROPERTY_SIZES: PropertySizeOption[] = [
  'Under 2,000 sq ft',
  '2,000–5,000 sq ft',
  '5,000–8,000 sq ft',
  '8,000–12,000 sq ft',
  '12,000+ sq ft'
];

export const SCOPE_OPTIONS: ScopeOption[] = [
  'Selected Areas',
  'Full Interior',
  'Full Renovation',
  'Turnkey Transformation'
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  'AED 500K–1M',
  'AED 1M–2M',
  'AED 2M–3M',
  'AED 3M+',
  'Prefer to discuss'
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  'Immediately',
  '1–3 months',
  '3–6 months',
  '6+ months'
];

export const REQUIREMENT_OPTIONS: RequirementOption[] = [
  'Bespoke Joinery',
  'Smart Home',
  'Kitchen',
  'Wardrobes',
  'Marble / Stone',
  'Landscaping',
  'MEP',
  'Complete Turnkey'
];

// Generic roles only - NO invented employee names
export const SPECIALIST_ROLES = [
  {
    role: 'Senior Project Consultant',
    description: 'Specializes in comprehensive project architecture, lead evaluation, and strategic consultation.'
  },
  {
    role: 'Villa Renovation Specialist',
    description: 'Specializes in palatial villa structural overhauls, elevation re-engineering, and layout optimization.'
  },
  {
    role: 'Turnkey Project Director',
    description: 'Specializes in single-point site execution, authority approvals, and white-glove handover.'
  },
  {
    role: 'Joinery Specialist',
    description: 'Specializes in custom walk-in dressing suites, architectural wood paneling, and Italian millwork.'
  },
  {
    role: 'Commercial Project Specialist',
    description: 'Specializes in luxury private offices, boutique corporate headquarters, and hospitality spaces.'
  }
];

export const ARCHITECTURAL_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  villa: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  interior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  joinery: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
  penthouse: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
  marble: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
};

export function getAIResponseForStep(stepKey: string, answers: ConciergeAnswers): string {
  switch (stepKey) {
    case 'welcome':
      return "Welcome. I’d be happy to understand your project.\n\nWhat are you looking to create?";

    case 'location': {
      return `Of course. Which area of Dubai is the property located in?`;
    }

    case 'propertySize': {
      return `Thank you. Approximately how large is the property?`;
    }

    case 'scope': {
      return `What level of work are you considering?`;
    }

    case 'budget': {
      return `What investment range are you currently considering?`;
    }

    case 'timeline': {
      return `When would you ideally like the project to begin?`;
    }

    case 'requirements': {
      return `What would you like the project to include? You may select all that apply.`;
    }

    case 'notes': {
      return `Is there anything else you would like our team to know about the project?`;
    }

    case 'contact': {
      return `Thank you. I have a clear picture of the project parameters now.\n\nI’ll prepare a concise private project brief for the Mansour team so the appropriate specialist can review the enquiry before the consultation.`;
    }

    case 'analysis': {
      return `Preparing your private project brief…`;
    }

    default:
      return `Thank you for sharing these details.`;
  }
}

export function calculateLeadIntelligence(answers: ConciergeAnswers): LeadIntelligence {
  const budget = answers.budget || 'AED 2M–3M';
  const timeline = answers.timeline || '1–3 months';
  const location = answers.location || 'Emirates Hills';
  const size = answers.propertySize || '8,000–12,000 sq ft';
  const reqs = answers.requirements || [];
  const clientName = answers.clientName || 'Alex Morgan';
  const projectType = answers.projectType || 'Villa Renovation';

  // Intent score & explanation (HIGH | MEDIUM | LOW only!)
  let intent: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  let intentExplanation = 'Client has provided specific project requirements and a defined timeline.';
  if (budget === 'AED 500K–1M' && timeline === '6+ months') {
    intent = 'MEDIUM';
    intentExplanation = 'Moderate capital allocation with flexible long-term timing.';
  } else if (budget === 'Prefer to discuss' && timeline === '6+ months') {
    intent = 'LOW';
    intentExplanation = 'Early stage inquiry with flexible parameters.';
  }

  // Project Value & explanation
  let projectValue: 'HIGH' | 'EXCEPTIONAL' | 'LUXURY' = 'HIGH';
  let valueExplanation = 'Project profile indicates a substantial turnkey requirement.';
  if (budget === 'AED 3M+') {
    projectValue = 'LUXURY';
    valueExplanation = 'Palatial scale and AED 3M+ budget reflect grand architectural scope.';
  } else if (budget === 'AED 2M–3M') {
    projectValue = 'EXCEPTIONAL';
    valueExplanation = 'Strong capital allocation suitable for complete turnkey execution.';
  }

  // Timeline score & explanation
  let timelineScore: 'NEAR TERM' | 'MID TERM' | 'LONG TERM' = 'NEAR TERM';
  let timelineExplanation = 'Client expects to begin within the next 1–3 months.';
  if (timeline === 'Immediately') {
    timelineScore = 'NEAR TERM';
    timelineExplanation = 'Immediate site commencement requested by client.';
  } else if (timeline === '3–6 months') {
    timelineScore = 'MID TERM';
    timelineExplanation = 'Site inception planned for the 3–6 month quarter.';
  } else if (timeline === '6+ months') {
    timelineScore = 'LONG TERM';
    timelineExplanation = 'Early-stage planning with flexible commencement target.';
  }

  // Project Complexity & explanation
  let projectComplexity: 'HIGH' | 'EXCEPTIONAL' | 'STANDARD' = 'HIGH';
  let complexityExplanation = 'Multiple service requirements make this suitable for a structured consultation.';
  if (projectType === 'Villa Renovation' || projectType === 'Turnkey Fit-Out' || reqs.length >= 4) {
    projectComplexity = 'EXCEPTIONAL';
    complexityExplanation = 'Multi-disciplinary requirements (Joinery, MEP, Smart Home) require structured specialist oversight.';
  } else if (projectType === 'Bespoke Joinery') {
    projectComplexity = 'STANDARD';
    complexityExplanation = 'Specialized millwork & joinery engineering scope.';
  }

  // Recommendation
  const recommendation = `This enquiry should be routed to a senior project consultant. The client has provided sufficient information for an initial consultation and appears to have a near-term, high-value requirement.`;

  // Why High Intent Bullets
  const whyHighIntent = [
    `Property located in prime enclave (${location}).`,
    `Defined target budget allocation (${budget}).`,
    `Near-term commencement expectation (${timeline}).`,
    `Specified multi-disciplinary scope (${reqs.length > 0 ? reqs.slice(0, 3).join(', ') : 'Turnkey Transformation'}).`
  ];

  // Lead Intent Score calculation (Max 100)
  const scoreBreakdown: ScoreItem[] = [];
  let totalScore = 0;

  // 1. Project clarity (+20)
  scoreBreakdown.push({ label: 'Project clarity', points: 20 });
  totalScore += 20;

  // 2. Budget qualification (+20)
  if (budget !== 'Prefer to discuss') {
    scoreBreakdown.push({ label: 'Budget qualification', points: 20 });
    totalScore += 20;
  } else {
    scoreBreakdown.push({ label: 'Budget qualification', points: 10 });
    totalScore += 10;
  }

  // 3. Timeline readiness (+20)
  if (timeline === 'Immediately' || timeline === '1–3 months') {
    scoreBreakdown.push({ label: 'Timeline readiness', points: 20 });
    totalScore += 20;
  } else if (timeline === '3–6 months') {
    scoreBreakdown.push({ label: 'Timeline readiness', points: 15 });
    totalScore += 15;
  } else {
    scoreBreakdown.push({ label: 'Timeline readiness', points: 10 });
    totalScore += 10;
  }

  // 4. Scope completeness (+17)
  const scopePoints = Math.min(17, Math.max(12, reqs.length * 3 + 5));
  scoreBreakdown.push({ label: 'Scope completeness', points: scopePoints });
  totalScore += scopePoints;

  // 5. Service fit (+15)
  scoreBreakdown.push({ label: 'Service fit', points: 15 });
  totalScore += 15;

  if (totalScore > 98) totalScore = 98;

  // Generic roles only - NO invented employee names
  let assignedDirector = 'Senior Project Consultant';
  let specialistRole = 'Senior Project Consultant';

  if (projectType === 'Interior Design') {
    assignedDirector = 'Senior Interior Consultant';
    specialistRole = 'Senior Interior Consultant';
  } else if (location === 'Palm Jumeirah' || projectType === 'Apartment / Penthouse') {
    assignedDirector = 'Turnkey Project Director';
    specialistRole = 'Turnkey Project Director';
  } else if (projectType === 'Bespoke Joinery') {
    assignedDirector = 'Joinery Specialist';
    specialistRole = 'Joinery Specialist';
  } else if (projectType === 'Commercial Project') {
    assignedDirector = 'Commercial Project Specialist';
    specialistRole = 'Commercial Project Specialist';
  } else if (projectType === 'Villa Renovation') {
    assignedDirector = 'Villa Renovation Specialist';
    specialistRole = 'Villa Renovation Specialist';
  }

  let estimatedValue = 'AED 2,800,000';
  if (budget === 'AED 3M+') estimatedValue = 'AED 4,800,000+';
  if (budget === 'AED 1M–2M') estimatedValue = 'AED 1,650,000';
  if (budget === 'AED 500K–1M') estimatedValue = 'AED 850,000';

  const whatsappDraft = `Hello ${clientName}, thank you for sharing the details of your ${projectType.toLowerCase()} project in ${location} with Mansour Interiors.\n\nOur senior project consultant has reviewed your initial project brief and would be pleased to arrange a private consultation.\n\nPlease let us know a convenient time for a call or site visit.`;

  return {
    intent,
    intentExplanation,
    projectValue,
    valueExplanation,
    timelineScore,
    timelineExplanation,
    projectComplexity,
    complexityExplanation,
    recommendation,
    whyHighIntent,
    totalScore,
    scoreBreakdown,
    assignedDirector,
    specialistRole,
    estimatedValue,
    whatsappDraft
  };
}
