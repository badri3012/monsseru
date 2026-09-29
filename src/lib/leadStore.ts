import { ClientBriefData } from './types';

export const INITIAL_LEADS: ClientBriefData[] = [
  {
    id: 'MNSR-2026-891',
    createdAt: '2026-09-29T14:30:00Z',
    clientName: 'Alex Morgan',
    clientEmail: 'alex@example.com',
    clientPhone: '+971 50 000 0000',
    preferredTiming: '10:00 AM GST',
    projectType: 'Villa Renovation',
    location: 'Emirates Hills',
    propertySize: '8,000–12,000 sq ft',
    scope: 'Turnkey Transformation',
    budget: 'AED 2M–3M',
    timeline: '1–3 months',
    requirements: ['Bespoke Joinery', 'Smart Home', 'Landscaping'],
    notes: 'Sample client enquiry generated via Concierge prototype.',
    intelligence: {
      intent: 'HIGH',
      intentExplanation: 'Prime location & capital allocation indicates strong project intent.',
      projectValue: 'EXCEPTIONAL',
      valueExplanation: 'Strong capital allocation suitable for complete turnkey luxury execution.',
      timelineScore: 'NEAR TERM',
      timelineExplanation: 'Near-term commencement expected within 1–3 months.',
      projectComplexity: 'EXCEPTIONAL',
      complexityExplanation: 'Multi-disciplinary requirements (Joinery, MEP, Smart Home) require structured specialist oversight.',
      recommendation: 'This enquiry should be routed to a senior project consultant. The client has provided sufficient information for an initial consultation and appears to have a near-term, high-value requirement.',
      whyHighIntent: [
        'Property located in prime enclave (Emirates Hills).',
        'Defined target budget allocation (AED 2M–3M).',
        'Near-term commencement expectation.',
        'Specified multi-disciplinary scope (Bespoke Joinery, Smart Home, Landscaping).'
      ],
      totalScore: 92,
      scoreBreakdown: [
        { label: 'Project clarity', points: 20 },
        { label: 'Budget qualification', points: 20 },
        { label: 'Timeline readiness', points: 20 },
        { label: 'Scope completeness', points: 17 },
        { label: 'Service fit', points: 15 }
      ],
      assignedDirector: 'Villa Renovation Specialist',
      specialistRole: 'Villa Renovation Specialist',
      estimatedValue: 'AED 2,800,000',
      whatsappDraft: 'Hello Alex Morgan, thank you for sharing the details of your villa renovation project in Emirates Hills with Mansour Interiors.\n\nOur senior project consultant has reviewed your initial project brief and would be pleased to arrange a private consultation.\n\nPlease let us know a convenient time for a call or site visit.'
    },
    status: 'QUALIFIED'
  },
  {
    id: 'MNSR-2026-887',
    createdAt: '2026-09-29T11:15:00Z',
    clientName: 'Daniel Carter',
    clientEmail: 'daniel@example.com',
    clientPhone: '+971 50 000 0000',
    preferredTiming: '11:30 AM GST',
    projectType: 'Apartment / Penthouse',
    location: 'Palm Jumeirah',
    propertySize: '3,000–5,000 sq ft',
    scope: 'Full Interior',
    budget: 'AED 1M–2M',
    timeline: '3–6 months',
    requirements: ['Bespoke Joinery', 'Smart Home', 'Kitchen'],
    notes: 'Sample penthouse interior refurbishment.',
    intelligence: {
      intent: 'MEDIUM',
      intentExplanation: 'Beachfront penthouse location with flexible mid-term timing.',
      projectValue: 'HIGH',
      valueExplanation: 'Solid capital allocation suitable for luxury interior fit-out.',
      timelineScore: 'MID TERM',
      timelineExplanation: 'Client expects to begin within 3–6 months.',
      projectComplexity: 'HIGH',
      complexityExplanation: 'Specialized millwork & interior joinery scope.',
      recommendation: 'This enquiry should be routed to a senior project consultant.',
      whyHighIntent: [
        'Property located in prime enclave (Palm Jumeirah).',
        'Defined target budget allocation (AED 1M–2M).',
        'Specified millwork and smart home scope.'
      ],
      totalScore: 84,
      scoreBreakdown: [
        { label: 'Project clarity', points: 20 },
        { label: 'Budget qualification', points: 20 },
        { label: 'Timeline readiness', points: 15 },
        { label: 'Scope completeness', points: 14 },
        { label: 'Service fit', points: 15 }
      ],
      assignedDirector: 'Turnkey Project Director',
      specialistRole: 'Turnkey Project Director',
      estimatedValue: 'AED 1,650,000',
      whatsappDraft: 'Hello Daniel Carter, thank you for sharing the details of your apartment / penthouse project in Palm Jumeirah with Mansour Interiors.'
    },
    status: 'NEW'
  },
  {
    id: 'MNSR-2026-882',
    createdAt: '2026-09-28T16:45:00Z',
    clientName: 'Sophie Bennett',
    clientEmail: 'sophie@example.com',
    clientPhone: '+971 50 000 0000',
    preferredTiming: '02:30 PM GST',
    projectType: 'Turnkey Fit-Out',
    location: 'Dubai Hills',
    propertySize: '8,000–12,000 sq ft',
    scope: 'Turnkey Transformation',
    budget: 'AED 3M+',
    timeline: 'Immediately',
    requirements: ['Complete Turnkey', 'Smart Home', 'Wardrobes', 'MEP'],
    notes: 'Immediate commencement required for Golf Place villa fit-out.',
    intelligence: {
      intent: 'HIGH',
      intentExplanation: 'Immediate commencement requested with AED 3M+ capital allocation.',
      projectValue: 'LUXURY',
      valueExplanation: 'Palatial scale and AED 3M+ budget reflect grand architectural scope.',
      timelineScore: 'NEAR TERM',
      timelineExplanation: 'Immediate site commencement requested by client.',
      projectComplexity: 'EXCEPTIONAL',
      complexityExplanation: 'Multi-disciplinary requirements (Joinery, MEP, Smart Home) require structured specialist oversight.',
      recommendation: 'Recommended for direct specialist review.',
      whyHighIntent: [
        'Property located in prime enclave (Dubai Hills).',
        'Defined target budget allocation (AED 3M+).',
        'Immediate commencement expectation.'
      ],
      totalScore: 96,
      scoreBreakdown: [
        { label: 'Project clarity', points: 20 },
        { label: 'Budget qualification', points: 20 },
        { label: 'Timeline readiness', points: 20 },
        { label: 'Scope completeness', points: 17 },
        { label: 'Service fit', points: 19 }
      ],
      assignedDirector: 'Senior Project Consultant',
      specialistRole: 'Senior Project Consultant',
      estimatedValue: 'AED 4,800,000+',
      whatsappDraft: 'Hello Sophie Bennett, thank you for sharing the details of your turnkey fit-out project in Dubai Hills with Mansour Interiors.'
    },
    status: 'ASSIGNED'
  }
];

const STORAGE_KEY = 'mansour_client_leads_v1';

export function getStoredLeads(): ClientBriefData[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read stored leads', err);
    return INITIAL_LEADS;
  }
}

export function saveNewLead(lead: ClientBriefData): void {
  if (typeof window === 'undefined') return;
  try {
    const leads = getStoredLeads();
    const updated = [lead, ...leads.filter(l => l.id !== lead.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save new lead', err);
  }
}

export function resetDemoData(): ClientBriefData[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  } catch (err) {
    console.error('Failed to reset demo data', err);
    return INITIAL_LEADS;
  }
}

export function updateLeadStatus(id: string, status: ClientBriefData['status']): ClientBriefData[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const leads = getStoredLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update lead status', err);
    return INITIAL_LEADS;
  }
}
