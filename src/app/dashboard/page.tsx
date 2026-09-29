'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Eye,
  UserPlus,
  PhoneCall,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
  ArrowLeft,
  X,
  FileText
} from 'lucide-react';
import { ClientBriefData, LeadStatus } from '@/lib/types';
import { getStoredLeads, updateLeadStatus } from '@/lib/leadStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const [leads, setLeads] = useState<ClientBriefData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'VIP' | 'Villa' | 'CONSULTATION'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalBrief, setActiveModalBrief] = useState<ClientBriefData | null>(null);
  const [contactingClient, setContactingClient] = useState<ClientBriefData | null>(null);
  const [assignedDirectorNotice, setAssignedDirectorNotice] = useState<string | null>(null);

  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const handleStatusChange = (id: string, status: LeadStatus) => {
    const updated = updateLeadStatus(id, status);
    setLeads(updated);
  };

  const handleAssignDirector = (leadId: string, directorName: string) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          status: 'ASSIGNED' as const,
          intelligence: {
            ...l.intelligence,
            assignedDirector: directorName
          }
        };
      }
      return l;
    });
    setLeads(updated);
    setAssignedDirectorNotice(`Lead assigned to ${directorName}`);
    setTimeout(() => setAssignedDirectorNotice(null), 3500);
  };

  // Filtered Leads Calculation
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'VIP') return lead.intelligence.intent === 'VIP';
    if (selectedFilter === 'Villa') return lead.projectType.includes('Villa');
    if (selectedFilter === 'CONSULTATION') return lead.status === 'CONSULTATION';
    return true;
  });

  // Calculate Metrics
  const totalEnquiries = leads.length;
  const highIntentCount = leads.filter((l) => l.intelligence.intent === 'VIP' || l.intelligence.intent === 'HIGH').length;
  const scheduledCount = leads.filter((l) => l.status === 'CONSULTATION').length;
  const totalPipeline = 'AED 54.8M';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      
      {/* Header */}
      <Header />

      {/* Internal Portal Sub-Header */}
      <div className="bg-[#18181A] text-white py-8 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#C5A059] text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest">
                DEMO ENVIRONMENT
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                MANSOUR INTERIORS & FIT-OUT
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-semibold">
              CLIENT INTELLIGENCE
            </h1>
            <p className="text-xs text-[#8C8A84] mt-1">
              Internal project enquiry overview
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/concierge"
              className="px-4 py-2 bg-[#C5A059] text-[#18181A] text-xs tracking-wider uppercase font-bold hover:bg-white transition-colors flex items-center gap-1.5 border border-[#C5A059]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#18181A]" />
              <span>Launch Concierge Flow</span>
            </Link>

            <Link
              href="/"
              className="px-4 py-2 bg-white/10 text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Toast Alert Notice */}
        {assignedDirectorNotice && (
          <div className="p-4 bg-[#C5A059] text-[#18181A] text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{assignedDirectorNotice}</span>
            </div>
          </div>
        )}

        {/* DEMO ENVIRONMENT Banner */}
        <div className="p-4 bg-[#F4F0E8] border border-[#C5A059]/30 text-xs text-[#18181A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span><strong className="font-bold uppercase tracking-wider">DEMO ENVIRONMENT ACTIVE:</strong> Interactive lead qualification matrix displaying simulated client briefs captured via the Concierge engine.</span>
          </div>
          <span className="text-[10px] font-mono text-[#8C8A84] bg-white px-2 py-1 border border-[#C5A059]/20 font-bold">
            {leads.length} Records Active
          </span>
        </div>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 bg-white border border-[#C5A059]/20 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-[#8C8A84] mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">NEW QUALIFIED ENQUIRIES</span>
              <Users className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#18181A]">
              {totalEnquiries}
            </div>
            <span className="text-[10px] text-[#6E6D6A] mt-1 block">
              +28% from last week • Dubai Prime
            </span>
          </div>

          <div className="p-6 bg-white border border-[#C5A059]/20 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-[#8C8A84] mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">HIGH INTENT</span>
              <Award className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#18181A]">
              {highIntentCount} <span className="text-xs font-sans text-[#8C8A84] font-normal">({Math.round((highIntentCount / (totalEnquiries || 1)) * 100)}%)</span>
            </div>
            <span className="text-[10px] text-[#6E6D6A] mt-1 block">
              Fit Score &gt; 85/100 Qualified
            </span>
          </div>

          <div className="p-6 bg-white border border-[#C5A059]/20 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-[#8C8A84] mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">CONSULTATIONS</span>
              <Calendar className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#18181A]">
              {scheduledCount}
            </div>
            <span className="text-[10px] text-[#6E6D6A] mt-1 block">
              Senior Director Advisory Visits
            </span>
          </div>

          <div className="p-6 bg-[#18181A] text-white border border-[#C5A059]/40 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-[#D4AF37] mb-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">ACTIVE PROJECT OPPORTUNITIES</span>
              <TrendingUp className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-white">
              {totalPipeline}
            </div>
            <span className="text-[10px] text-[#8C8A84] mt-1 block">
              Estimated Pipeline Value (DEMO)
            </span>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="p-5 bg-white border border-[#C5A059]/20 shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          
          <div className="flex flex-wrap gap-2">
            {(['All', 'VIP', 'Villa', 'CONSULTATION'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-[#18181A] text-white border border-[#18181A]'
                    : 'bg-[#FAF8F5] text-[#6E6D6A] hover:text-[#18181A] border border-[#C5A059]/20'
                }`}
              >
                {tab === 'All' ? 'All Enquiries' : tab === 'VIP' ? 'VIP Intent Only' : tab === 'Villa' ? 'Villa Transformations' : 'Consultations'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C8A84] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by Client, Location or Ref ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#C5A059]/20 focus:border-[#C5A059] focus:outline-none text-xs text-[#18181A]"
            />
          </div>

        </div>

        {/* Lead Matrix Table */}
        <div className="bg-white border border-[#C5A059]/30 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#18181A] text-white text-[10px] uppercase tracking-[0.2em] border-b border-[#C5A059]/30">
                <th className="py-4 px-6 font-semibold">Client Name & Ref</th>
                <th className="py-4 px-6 font-semibold">Project & Location</th>
                <th className="py-4 px-6 font-semibold">Budget Range</th>
                <th className="py-4 px-6 font-semibold">Intent & Score</th>
                <th className="py-4 px-6 font-semibold">Timeline</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A059]/15 text-xs text-[#18181A]">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF8F5] transition-colors">
                    
                    {/* Client Name & Ref */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-[10px] text-[#8C8A84] block font-semibold">{lead.id}</span>
                      <span className="font-serif-luxury text-base font-semibold text-[#18181A] block mt-0.5">
                        {lead.clientName}
                      </span>
                      <span className="text-[11px] text-[#6E6D6A] block">{lead.clientEmail || 'Private Contact'}</span>
                    </td>

                    {/* Project & Location */}
                    <td className="py-4 px-6">
                      <span className="font-semibold text-[#18181A] block">{lead.projectType}</span>
                      <span className="text-[11px] text-[#C5A059] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {lead.location}
                      </span>
                    </td>

                    {/* Budget Range */}
                    <td className="py-4 px-6">
                      <span className="font-semibold text-[#C5A059] block">{lead.budget}</span>
                      <span className="text-[11px] text-[#6E6D6A] block">{lead.propertySize}</span>
                    </td>

                    {/* Intent & Score */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                        lead.intelligence.intent === 'VIP'
                          ? 'bg-[#18181A] text-[#D4AF37] border border-[#C5A059]'
                          : 'bg-[#C5A059]/20 text-[#A4813D]'
                      }`}>
                        {lead.intelligence.intent} ({lead.intelligence.totalScore || 92}/100)
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="py-4 px-6 font-medium text-[#18181A]">
                      {lead.timeline}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <select
                        value={lead.status || 'NEW'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="bg-white border border-[#C5A059]/30 text-[11px] p-1.5 font-semibold focus:outline-none text-[#18181A] cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CONSULTATION">CONSULTATION</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="FOLLOW-UP">FOLLOW-UP</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setActiveModalBrief(lead)}
                        className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#C5A059]/30 text-[#18181A] hover:bg-[#C5A059] hover:text-[#18181A] transition-colors cursor-pointer text-[10px] uppercase font-bold"
                        title="View Full Private Brief"
                      >
                        VIEW BRIEF
                      </button>

                      <button
                        onClick={() => setContactingClient(lead)}
                        className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#C5A059]/30 text-[#18181A] hover:bg-[#18181A] hover:text-white transition-colors cursor-pointer text-[10px] uppercase font-bold"
                        title="Contact Client Direct"
                      >
                        CONTACT
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8C8A84] text-xs">
                    No client records match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </main>

      {/* View Brief Detail Modal */}
      {activeModalBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] border-2 border-[#C5A059]/40 shadow-2xl p-6 sm:p-10">
            <button
              onClick={() => setActiveModalBrief(null)}
              className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="border-b border-[#C5A059]/20 pb-4 mb-6">
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                Private Client Intelligence Card
              </span>
              <h2 className="font-serif-luxury text-3xl text-[#18181A] font-semibold mt-1">
                {activeModalBrief.clientName}
              </h2>
              <p className="text-xs text-[#6E6D6A]">Ref: {activeModalBrief.id} • Submitted: {new Date(activeModalBrief.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-white p-5 border border-[#C5A059]/15">
              <div>
                <span className="text-[#8C8A84] block font-medium">Project Category:</span>
                <span className="font-semibold text-[#18181A]">{activeModalBrief.projectType}</span>
              </div>
              <div>
                <span className="text-[#8C8A84] block font-medium">Location Enclave:</span>
                <span className="font-semibold text-[#C5A059]">{activeModalBrief.location}</span>
              </div>
              <div>
                <span className="text-[#8C8A84] block font-medium">Investment Range:</span>
                <span className="font-semibold text-[#18181A]">{activeModalBrief.budget}</span>
              </div>
              <div>
                <span className="text-[#8C8A84] block font-medium">Property Size:</span>
                <span className="font-semibold text-[#18181A]">{activeModalBrief.propertySize}</span>
              </div>
              <div>
                <span className="text-[#8C8A84] block font-medium">Target Timeline:</span>
                <span className="font-semibold text-[#18181A]">{activeModalBrief.timeline}</span>
              </div>
              <div>
                <span className="text-[#8C8A84] block font-medium">Assigned Specialist:</span>
                <span className="font-semibold text-[#C5A059]">{activeModalBrief.intelligence.assignedDirector}</span>
              </div>
            </div>

            <div className="p-4 bg-[#18181A] text-white text-xs mb-6 space-y-2">
              <span className="text-[#C5A059] font-bold uppercase tracking-wider block">Requirements & Notes:</span>
              <p>{activeModalBrief.requirements.join(', ')}</p>
              {activeModalBrief.notes && <p className="italic text-white/80 pt-1">“{activeModalBrief.notes}”</p>}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModalBrief(null)}
                className="px-6 py-2.5 bg-[#18181A] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#C5A059] hover:text-[#18181A]"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Client Modal */}
      {contactingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181A]/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setContactingClient(null)}
              className="absolute top-6 right-6 p-2 text-[#8C8A84] hover:text-[#18181A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-luxury text-2xl text-[#18181A] font-semibold mb-2">
              Contact {contactingClient.clientName}
            </h3>
            <p className="text-xs text-[#6E6D6A] mb-6">
              Initiate direct advisory communication via secure channels.
            </p>

            <div className="space-y-3 bg-white p-4 border border-[#C5A059]/20 text-xs mb-6">
              <div className="flex justify-between border-b border-[#FAF8F5] pb-2">
                <span className="text-[#8C8A84]">Telephone / WhatsApp:</span>
                <a href={`tel:${contactingClient.clientPhone}`} className="font-semibold text-[#C5A059] underline">
                  {contactingClient.clientPhone || '+971 50 982 1100'}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8A84]">Email Address:</span>
                <a href={`mailto:${contactingClient.clientEmail}`} className="font-semibold text-[#18181A] underline">
                  {contactingClient.clientEmail || 'client@privateoffice.ae'}
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                handleStatusChange(contactingClient.id, 'CONSULTATION');
                setContactingClient(null);
              }}
              className="w-full py-3 bg-[#18181A] text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#C5A059] hover:text-[#18181A] transition-colors cursor-pointer"
            >
              Mark Consultation & Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
