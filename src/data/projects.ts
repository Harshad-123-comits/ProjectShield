import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'P-1042',
    name: 'National Highway Expansion Phase II (Mumbai-Pune Corridor)',
    state: 'Maharashtra',
    sector: 'Transport',
    agency: 'NHAI',
    sanctionedCost: 350,
    revisedCost: 428,
    projectedFinalCost: 449,
    originalStartDate: '2023-03-15',
    originalEndDate: '2026-06-30',
    expectedEndDate: '2026-12-15',
    physicalProgress: 51,
    plannedProgress: 72,
    financialProgress: 47,
    plannedFinancialProgress: 65,
    scheduleRisk: 81,
    costRisk: 68,
    overallRisk: 82,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 5.8,
    previousExtensions: 2,
    status: 'AT_RISK',
    lastUpdated: '2026-09-02 01:30 PM',
    description: 'Widening of 8-lane expressway including 3 tunnels, 4 major viaducts, and toll plaza automation along NH-48.',
    keyLocation: 'Navi Mumbai to Lonavala, Maharashtra',
    contractorName: 'L&T - HCC Infrastructure JV',
    riskDrivers: [
      { factor: 'Physical Progress Gap', impactPercent: 31, category: 'Physical', description: '21 percentage-point gap behind scheduled milestone due to monsoon rockfall.' },
      { factor: 'Previous Schedule Extensions', impactPercent: 24, category: 'Administrative', description: 'Two formal timeline revisions granted without milestone recovery velocity.' },
      { factor: 'Land Acquisition & RoW Disputes', impactPercent: 19, category: 'Regulatory', description: 'Unresolved compensation disputes on a 4.2 km ghat section parcel.' },
      { factor: 'Contractor Equipment Liquidity', impactPercent: 13, category: 'Contractor', description: 'Subcontractor cash-flow constraints reducing heavy tunnel borer shifts.' },
      { factor: 'Financial Progress Gap', impactPercent: 8, category: 'Financial', description: 'Disbursement lag of 18% pending MoRTH stage certification.' },
      { factor: 'Weather & External Terrain Factors', impactPercent: 5, category: 'Environmental', description: 'Monsoon landslide stabilization required extra anchoring works.' }
    ],
    recommendations: [
      { id: 'rec-1', priority: 'High', action: 'Escalate unresolved land-acquisition parcel to Maharashtra Revenue Principal Secretary for fast-track settlement.', reason: '4.2 km section stalling critical tunnel access.', suggestedOwner: 'MoSPI State Coordination Cell', deadlineDays: 7, status: 'Pending' },
      { id: 'rec-2', priority: 'High', action: 'Direct NHAI Project Director to review contractor recovery plan with 3-shift tunnel boring commitment.', reason: 'Current excavation rate is 40% below recovery threshold.', suggestedOwner: 'Regional Officer NHAI Mumbai', deadlineDays: 10, status: 'In Progress' },
      { id: 'rec-3', priority: 'Medium', action: 'Increase project progress reporting frequency from monthly to weekly telemetry monitoring.', reason: 'High variance in week-over-week earthwork reporting.', suggestedOwner: 'MoSPI Monitoring Division', deadlineDays: 3, status: 'Pending' },
      { id: 'rec-4', priority: 'Medium', action: 'Reassess revised completion schedule baseline with third-party technical audit.', reason: 'Target date December 2026 requires critical path re-sequencing.', suggestedOwner: 'Independent Engineer (Engineers India Ltd)', deadlineDays: 14, status: 'Pending' },
      { id: 'rec-5', priority: 'Low', action: 'Review remaining contingency budget against projected final cost escalation of ₹99 Cr.', reason: 'Avoid liquidity freeze in Q4 FY26.', suggestedOwner: 'MoRTH Finance Division', deadlineDays: 21, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Oct 25', plannedPhysical: 48, actualPhysical: 42, plannedFinancial: 44, actualFinancial: 39, riskScore: 55 },
      { month: 'Nov 25', plannedPhysical: 52, actualPhysical: 45, plannedFinancial: 48, actualFinancial: 41, riskScore: 61 },
      { month: 'Dec 25', plannedPhysical: 56, actualPhysical: 47, plannedFinancial: 51, actualFinancial: 42, riskScore: 63 },
      { month: 'Jan 26', plannedPhysical: 60, actualPhysical: 48, plannedFinancial: 54, actualFinancial: 43, riskScore: 70 },
      { month: 'Feb 26', plannedPhysical: 64, actualPhysical: 49, plannedFinancial: 58, actualFinancial: 44, riskScore: 74 },
      { month: 'Mar 26', plannedPhysical: 67, actualPhysical: 50, plannedFinancial: 61, actualFinancial: 45, riskScore: 78 },
      { month: 'Apr 26', plannedPhysical: 72, actualPhysical: 51, plannedFinancial: 65, actualFinancial: 47, riskScore: 82 }
    ],
    milestones: [
      { label: 'Original Project Start', date: 'Mar 2023', type: 'start', status: 'completed' },
      { label: 'Original Scheduled Completion', date: 'Jun 2026', type: 'original_end', status: 'delayed' },
      { label: 'Extension 1 (Ghat Design Revisions)', date: 'Aug 2026', type: 'extension_1', status: 'delayed' },
      { label: 'Extension 2 (Land Handover Delay)', date: 'Oct 2026', type: 'extension_2', status: 'delayed' },
      { label: 'Model Predicted Completion', date: 'Dec 2026', type: 'predicted_end', status: 'projected' }
    ]
  },
  {
    id: 'P-0821',
    name: 'Bengaluru Suburban Rail Corridor-2 (Baiyappanahalli to Chikkabanavara)',
    state: 'Karnataka',
    sector: 'Railways',
    agency: 'KRIDE / RVNL',
    sanctionedCost: 850,
    revisedCost: 1020,
    projectedFinalCost: 1115,
    originalStartDate: '2023-01-10',
    originalEndDate: '2026-04-30',
    expectedEndDate: '2026-11-20',
    physicalProgress: 44,
    plannedProgress: 68,
    financialProgress: 41,
    plannedFinancialProgress: 62,
    scheduleRisk: 76,
    costRisk: 79,
    overallRisk: 78,
    riskLevel: 'HIGH',
    expectedDelayMonths: 6.7,
    previousExtensions: 1,
    status: 'AT_RISK',
    lastUpdated: '2026-09-02 11:15 AM',
    description: '25.2 km suburban commuter rail corridor featuring 14 elevated and at-grade stations and high-tension line utilities shift.',
    keyLocation: 'Bengaluru Urban, Karnataka',
    contractorName: 'Afcons Infrastructure',
    riskDrivers: [
      { factor: 'Projected Cost Overrun', impactPercent: 34, category: 'Financial', description: 'Cost escalation exceeds 15% threshold due to revised viaduct pier designs.' },
      { factor: 'Physical Progress Gap', impactPercent: 26, category: 'Physical', description: '24% physical deficit against master project baseline.' },
      { factor: 'Utility Shifting Clearances', impactPercent: 20, category: 'Regulatory', description: 'KPTCL 66kV transmission line rerouting pending safety shutdown approvals.' },
      { factor: 'Land Acquisition', impactPercent: 12, category: 'Regulatory', description: 'Defense land strip parcel transfer pending MoD clearance.' },
      { factor: 'Contractor Material Procurement', impactPercent: 8, category: 'Contractor', description: 'Steel girder supply lead time expanded by 8 weeks.' }
    ],
    recommendations: [
      { id: 'rec-201', priority: 'High', action: 'Joint meeting with Ministry of Defence for Baiyappanahalli defense pocket transfer.', reason: 'Stops launching of 6 viaduct spans.', suggestedOwner: 'Secretary MoSPI / Chief Secretary Karnataka', deadlineDays: 5, status: 'In Progress' },
      { id: 'rec-202', priority: 'High', action: 'Issue expedited utility shifting sanction with KPTCL.', reason: 'Electrical safety clearance pending for 90 days.', suggestedOwner: 'Managing Director KRIDE', deadlineDays: 7, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 46, actualPhysical: 38, plannedFinancial: 42, actualFinancial: 35, riskScore: 62 },
      { month: 'Dec 25', plannedPhysical: 51, actualPhysical: 40, plannedFinancial: 47, actualFinancial: 37, riskScore: 68 },
      { month: 'Jan 26', plannedPhysical: 57, actualPhysical: 41, plannedFinancial: 52, actualFinancial: 38, riskScore: 72 },
      { month: 'Feb 26', plannedPhysical: 62, actualPhysical: 43, plannedFinancial: 57, actualFinancial: 40, riskScore: 75 },
      { month: 'Mar 26', plannedPhysical: 68, actualPhysical: 44, plannedFinancial: 62, actualFinancial: 41, riskScore: 78 }
    ]
  },
  {
    id: 'P-0198',
    name: 'Ganga Flood Relief & Water Pipeline Network Phase III',
    state: 'Uttar Pradesh',
    sector: 'Water',
    agency: 'Jal Jeevan Mission / UP Jal Nigam',
    sanctionedCost: 520,
    revisedCost: 585,
    projectedFinalCost: 610,
    originalStartDate: '2023-08-01',
    originalEndDate: '2026-03-31',
    expectedEndDate: '2026-08-15',
    physicalProgress: 49,
    plannedProgress: 67,
    financialProgress: 46,
    plannedFinancialProgress: 60,
    scheduleRisk: 69,
    costRisk: 58,
    overallRisk: 65,
    riskLevel: 'MEDIUM',
    expectedDelayMonths: 4.5,
    previousExtensions: 1,
    status: 'AT_RISK',
    lastUpdated: '2026-09-01 04:45 PM',
    description: 'Bulk water supply pipeline across 180 villages and riverbank retaining barrier reinforcement.',
    keyLocation: 'Varanasi & Ghazipur, Uttar Pradesh',
    contractorName: 'NCC Urban Infrastructures',
    riskDrivers: [
      { factor: 'Physical Progress Lag', impactPercent: 38, category: 'Physical', description: 'Physical progress is 18% behind planned progress due to monsoon high flood line.' },
      { factor: 'Pipe Procurement Delay', impactPercent: 27, category: 'Contractor', description: 'DI pipe supplier delivery bottleneck across north central belt.' },
      { factor: 'Right of Way Clearances', impactPercent: 21, category: 'Regulatory', description: 'Panchayat land passage permissions pending in 14 village clusters.' },
      { factor: 'Cost Escalation', impactPercent: 14, category: 'Financial', description: 'Raw cast iron index escalation claims submitted by contractor.' }
    ],
    recommendations: [
      { id: 'rec-301', priority: 'High', action: 'Instruct UP Jal Nigam to approve secondary vendor for ductile iron pipes.', reason: 'Primary vendor backlog has reached 14 weeks.', suggestedOwner: 'Chief Engineer UP Jal Nigam', deadlineDays: 6, status: 'Pending' },
      { id: 'rec-302', priority: 'Medium', action: 'Convene District Magistrate review for pending Gram Panchayat ROW clearances.', reason: 'Unblocks 42 km of trenching works.', suggestedOwner: 'DM Varanasi & Ghazipur', deadlineDays: 10, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 48, actualPhysical: 41, plannedFinancial: 43, actualFinancial: 38, riskScore: 54 },
      { month: 'Jan 26', plannedPhysical: 54, actualPhysical: 44, plannedFinancial: 49, actualFinancial: 41, riskScore: 58 },
      { month: 'Feb 26', plannedPhysical: 61, actualPhysical: 47, plannedFinancial: 55, actualFinancial: 44, riskScore: 61 },
      { month: 'Mar 26', plannedPhysical: 67, actualPhysical: 49, plannedFinancial: 60, actualFinancial: 46, riskScore: 65 }
    ]
  },
  {
    id: 'P-1120',
    name: 'Dedicated Freight Corridor Western Arm Tunnel-7',
    state: 'Gujarat',
    sector: 'Railways',
    agency: 'DFCCIL',
    sanctionedCost: 1420,
    revisedCost: 1780,
    projectedFinalCost: 1890,
    originalStartDate: '2022-11-10',
    originalEndDate: '2025-12-31',
    expectedEndDate: '2026-10-30',
    physicalProgress: 62,
    plannedProgress: 88,
    financialProgress: 59,
    plannedFinancialProgress: 84,
    scheduleRisk: 84,
    costRisk: 82,
    overallRisk: 86,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 10.0,
    previousExtensions: 3,
    status: 'DELAYED',
    lastUpdated: '2026-09-02 10:00 AM',
    description: 'Electrified double-stack container heavy haul railway tunnel across Aravalli fault line with advanced ventilation.',
    keyLocation: 'Palanpur to Vadodara, Gujarat',
    contractorName: 'Tata Projects - Aldesa JV',
    riskDrivers: [
      { factor: 'Geological Rock Faults', impactPercent: 35, category: 'Environmental', description: 'Unmapped soft strata water seepage inside northern portal requiring NATM re-profiling.' },
      { factor: 'Previous Time Extensions', impactPercent: 28, category: 'Administrative', description: 'Three extensions totaling 10 months consumed without catching up.' },
      { factor: 'Heavy Cost Escalation', impactPercent: 22, category: 'Financial', description: 'Projected cost overrun is ₹470 Cr (+33.1% over sanctioned cost).' },
      { factor: 'Contractor Resource Mobilization', impactPercent: 15, category: 'Contractor', description: 'Delayed arrival of specialized shotcrete robotic sprayers.' }
    ],
    recommendations: [
      { id: 'rec-401', priority: 'High', action: 'Empanel International Geotechnical Board for emergency rock bolting protocol.', reason: 'Safety stoppage ordered on 350m cavity section.', suggestedOwner: 'Managing Director DFCCIL', deadlineDays: 4, status: 'In Progress' },
      { id: 'rec-402', priority: 'High', action: 'Initiate formal sanction revision review with Railway Board and Ministry of Finance.', reason: 'Expenditure approaching revised ceiling.', suggestedOwner: 'Advisor Infrastructure MoSPI', deadlineDays: 12, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Oct 25', plannedPhysical: 68, actualPhysical: 55, plannedFinancial: 65, actualFinancial: 52, riskScore: 72 },
      { month: 'Nov 25', plannedPhysical: 73, actualPhysical: 57, plannedFinancial: 70, actualFinancial: 54, riskScore: 76 },
      { month: 'Dec 25', plannedPhysical: 78, actualPhysical: 59, plannedFinancial: 75, actualFinancial: 56, riskScore: 80 },
      { month: 'Jan 26', plannedPhysical: 83, actualPhysical: 60, plannedFinancial: 80, actualFinancial: 57, riskScore: 83 },
      { month: 'Feb 26', plannedPhysical: 88, actualPhysical: 62, plannedFinancial: 84, actualFinancial: 59, riskScore: 86 }
    ]
  },
  {
    id: 'P-0334',
    name: 'Rewa Ultra Mega Solar Power Park Transmission Grid Extension',
    state: 'Madhya Pradesh',
    sector: 'Energy',
    agency: 'PowerGrid / NTPC',
    sanctionedCost: 680,
    revisedCost: 695,
    projectedFinalCost: 705,
    originalStartDate: '2024-01-15',
    originalEndDate: '2026-07-31',
    expectedEndDate: '2026-08-30',
    physicalProgress: 78,
    plannedProgress: 82,
    financialProgress: 75,
    plannedFinancialProgress: 79,
    scheduleRisk: 28,
    costRisk: 22,
    overallRisk: 26,
    riskLevel: 'LOW',
    expectedDelayMonths: 1.0,
    previousExtensions: 0,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-01 02:20 PM',
    description: '765kV double-circuit evacuation corridor and 1200 MVA substation bay augmentation for green corridor.',
    keyLocation: 'Rewa & Satna, Madhya Pradesh',
    contractorName: 'KEC International',
    riskDrivers: [
      { factor: 'Minor Forest Clearance Delay', impactPercent: 55, category: 'Regulatory', description: 'Tower spot #42-45 in buffer forest corridor awaiting wildlife warden sign-off.' },
      { factor: 'Substation Transformer Delivery', impactPercent: 30, category: 'Contractor', description: 'Factory acceptance testing scheduled next fortnight at BHEL Bhopal.' },
      { factor: 'Weather Factors', impactPercent: 15, category: 'Environmental', description: 'Minor seasonal lightning arrestor modifications.' }
    ],
    recommendations: [
      { id: 'rec-501', priority: 'Low', action: 'Coordinate factory inspection at BHEL Bhopal to prevent transformer shipping delay.', reason: 'Keeps testing on critical path track.', suggestedOwner: 'PowerGrid Executive Director (Western Region)', deadlineDays: 14, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 65, actualPhysical: 63, plannedFinancial: 62, actualFinancial: 60, riskScore: 24 },
      { month: 'Jan 26', plannedPhysical: 71, actualPhysical: 69, plannedFinancial: 68, actualFinancial: 66, riskScore: 25 },
      { month: 'Feb 26', plannedPhysical: 77, actualPhysical: 74, plannedFinancial: 74, actualFinancial: 71, riskScore: 26 },
      { month: 'Mar 26', plannedPhysical: 82, actualPhysical: 78, plannedFinancial: 79, actualFinancial: 75, riskScore: 26 }
    ]
  },
  {
    id: 'P-0745',
    name: 'AIIMS Madurai New Super-Specialty Campus & Trauma Center',
    state: 'Tamil Nadu',
    sector: 'Healthcare',
    agency: 'MoHFW / CPWD',
    sanctionedCost: 1977,
    revisedCost: 2240,
    projectedFinalCost: 2390,
    originalStartDate: '2022-09-01',
    originalEndDate: '2026-02-28',
    expectedEndDate: '2027-01-31',
    physicalProgress: 38,
    plannedProgress: 75,
    financialProgress: 34,
    plannedFinancialProgress: 70,
    scheduleRisk: 89,
    costRisk: 74,
    overallRisk: 88,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 11.2,
    previousExtensions: 2,
    status: 'DELAYED',
    lastUpdated: '2026-09-02 09:30 AM',
    description: '750-bed apex tertiary medical institute, 100-seat medical college, 60-seat nursing college, and residential complex.',
    keyLocation: 'Thoppur, Madurai, Tamil Nadu',
    contractorName: 'Larsen & Toubro Construction',
    riskDrivers: [
      { factor: 'Physical Progress Gap', impactPercent: 36, category: 'Physical', description: 'Massive 37% deficit behind baseline schedule caused by early foundation design changes.' },
      { factor: 'JICA Loan Tranche Disbursement Lags', impactPercent: 26, category: 'Financial', description: 'Multilateral funding milestone releases delayed by tripartite agreement documentation.' },
      { factor: 'Environmental & Fire Clearances', impactPercent: 18, category: 'Regulatory', description: 'High-rise hospital block clearance revision pending SEIAA review.' },
      { factor: 'Contractor Skilled Labor Shortage', impactPercent: 12, category: 'Contractor', description: 'Shortfall of specialized MEP and medical gas piping technicians.' },
      { factor: 'Cost Escalation Overrun', impactPercent: 8, category: 'Financial', description: 'Projected cost overrun of ₹413 Cr (+20.9% escalation).' }
    ],
    recommendations: [
      { id: 'rec-601', priority: 'High', action: 'High-level bilateral review between DEA, MoHFW, and JICA delegation to unblock Tranche-2 release.', reason: 'Liquidity constraint affecting critical MEP equipment procurement.', suggestedOwner: 'Joint Secretary (Health & DEA)', deadlineDays: 5, status: 'Pending' },
      { id: 'rec-602', priority: 'High', action: 'Direct CPWD Director General to establish site project unit in Madurai with weekly oversight.', reason: 'Accelerate decision-making on 42 architectural variation orders.', suggestedOwner: 'DG CPWD', deadlineDays: 7, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 55, actualPhysical: 30, plannedFinancial: 50, actualFinancial: 27, riskScore: 75 },
      { month: 'Dec 25', plannedPhysical: 62, actualPhysical: 32, plannedFinancial: 57, actualFinancial: 29, riskScore: 81 },
      { month: 'Jan 26', plannedPhysical: 69, actualPhysical: 35, plannedFinancial: 63, actualFinancial: 31, riskScore: 85 },
      { month: 'Feb 26', plannedPhysical: 75, actualPhysical: 38, plannedFinancial: 70, actualFinancial: 34, riskScore: 88 }
    ]
  },
  {
    id: 'P-0492',
    name: 'Hyderabad Metro Phase 2 Airport Express Line',
    state: 'Telangana',
    sector: 'Urban Infrastructure',
    agency: 'HMRL / Hyderabad Metro Rail',
    sanctionedCost: 6250,
    revisedCost: 6580,
    projectedFinalCost: 6720,
    originalStartDate: '2023-06-01',
    originalEndDate: '2026-12-31',
    expectedEndDate: '2027-04-30',
    physicalProgress: 56,
    plannedProgress: 68,
    financialProgress: 52,
    plannedFinancialProgress: 64,
    scheduleRisk: 58,
    costRisk: 49,
    overallRisk: 55,
    riskLevel: 'MEDIUM',
    expectedDelayMonths: 4.0,
    previousExtensions: 1,
    status: 'AT_RISK',
    lastUpdated: '2026-09-01 05:10 PM',
    description: '31 km semi-high-speed express metro link connecting Mindspace Raidurg to RGIA Shamshabad.',
    keyLocation: 'Hyderabad, Telangana',
    contractorName: 'L&T Metro Rail / Systra',
    riskDrivers: [
      { factor: 'ORR Utility & Flyover Crossings', impactPercent: 32, category: 'Physical', description: 'Complex segmental launcher operations over PVNR Expressway junction.' },
      { factor: 'Land Parcels at Shamshabad Airport Entry', impactPercent: 27, category: 'Regulatory', description: 'GMR concessionaire boundary interface protocols under final sign-off.' },
      { factor: 'Physical Progress Deficit', impactPercent: 23, category: 'Physical', description: '12% progress gap due to nighttime traffic block constraints.' },
      { factor: 'Rolling Stock Contract Finalization', impactPercent: 18, category: 'Contractor', description: 'Cab signaling specification amendments with Alstom.' }
    ],
    recommendations: [
      { id: 'rec-701', priority: 'Medium', action: 'Authorize special daytime traffic diversions with Cyberabad Traffic Police.', reason: 'Doubles launcher cycle time at Gachibowli junction.', suggestedOwner: 'MD HMRL & Police Commissioner', deadlineDays: 8, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 52, actualPhysical: 46, plannedFinancial: 48, actualFinancial: 43, riskScore: 49 },
      { month: 'Jan 26', plannedPhysical: 58, actualPhysical: 50, plannedFinancial: 54, actualFinancial: 47, riskScore: 52 },
      { month: 'Feb 26', plannedPhysical: 63, actualPhysical: 53, plannedFinancial: 59, actualFinancial: 50, riskScore: 54 },
      { month: 'Mar 26', plannedPhysical: 68, actualPhysical: 56, plannedFinancial: 64, actualFinancial: 52, riskScore: 55 }
    ]
  },
  {
    id: 'P-0618',
    name: 'Delhi-Meerut Regional Rapid Transit System (RRTS) Modinagar-Meerut South Segment',
    state: 'Delhi',
    sector: 'Transport',
    agency: 'NCRTC',
    sanctionedCost: 30274,
    revisedCost: 30274,
    projectedFinalCost: 30450,
    originalStartDate: '2020-06-15',
    originalEndDate: '2025-06-30',
    expectedEndDate: '2025-09-30',
    physicalProgress: 91,
    plannedProgress: 94,
    financialProgress: 88,
    plannedFinancialProgress: 91,
    scheduleRisk: 22,
    costRisk: 14,
    overallRisk: 18,
    riskLevel: 'LOW',
    expectedDelayMonths: 0.8,
    previousExtensions: 0,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-02 08:00 AM',
    description: 'High-speed semi-aerodynamic 180 km/h rapid transit corridor with ETCS Level-2 signaling across NCR.',
    keyLocation: 'Delhi - Ghaziabad - Meerut Corridor',
    contractorName: 'KEC - Larsen & Toubro JV',
    riskDrivers: [
      { factor: 'Minor Station Finishing Snags', impactPercent: 60, category: 'Physical', description: 'Platform screen doors integration testing at Meerut South.' },
      { factor: 'Commissioner of Metro Rail Safety (CMRS) Inspection', impactPercent: 40, category: 'Regulatory', description: 'Statutory safety documentation submitted.' }
    ],
    recommendations: [
      { id: 'rec-801', priority: 'Low', action: 'Schedule CMRS trial run slot for early next month.', reason: 'Enables passenger commercial operation on time.', suggestedOwner: 'NCRTC Operations Director', deadlineDays: 15, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 82, actualPhysical: 80, plannedFinancial: 79, actualFinancial: 77, riskScore: 19 },
      { month: 'Jan 26', plannedPhysical: 86, actualPhysical: 84, plannedFinancial: 83, actualFinancial: 81, riskScore: 18 },
      { month: 'Feb 26', plannedPhysical: 90, actualPhysical: 88, plannedFinancial: 87, actualFinancial: 85, riskScore: 18 },
      { month: 'Mar 26', plannedPhysical: 94, actualPhysical: 91, plannedFinancial: 91, actualFinancial: 88, riskScore: 18 }
    ]
  },
  {
    id: 'P-0552',
    name: 'Paradip Port Deep Water Western Dock Berth Development',
    state: 'Odisha',
    sector: 'Transport',
    agency: 'Paradip Port Authority / MoPSW',
    sanctionedCost: 3004,
    revisedCost: 3420,
    projectedFinalCost: 3610,
    originalStartDate: '2022-04-10',
    originalEndDate: '2025-10-31',
    expectedEndDate: '2026-08-31',
    physicalProgress: 58,
    plannedProgress: 81,
    financialProgress: 54,
    plannedFinancialProgress: 77,
    scheduleRisk: 78,
    costRisk: 72,
    overallRisk: 76,
    riskLevel: 'HIGH',
    expectedDelayMonths: 8.5,
    previousExtensions: 2,
    status: 'AT_RISK',
    lastUpdated: '2026-09-01 06:30 PM',
    description: 'Capesize vessel handling multipurpose clean cargo berth with automated stacker reclaimers and deep dredging.',
    keyLocation: 'Paradip, Jagatsinghpur, Odisha',
    contractorName: 'JSW Infrastructure Consortium',
    riskDrivers: [
      { factor: 'Deep Capital Dredging Seabed Strata', impactPercent: 36, category: 'Physical', description: 'Hard granite intrusion required heavy cutter suction dredger mobilization from Singapore.' },
      { factor: 'Cost Escalation', impactPercent: 26, category: 'Financial', description: 'Cost escalation of ₹416 Cr (+13.8%) due to international bunker fuel and dredger day rates.' },
      { factor: 'Cyclone Fani & Monsoon Stoppages', impactPercent: 22, category: 'Environmental', description: '38 lost working days during extreme maritime weather.' },
      { factor: 'Breakwater Armor Rock Supply', impactPercent: 16, category: 'Contractor', description: 'Quarry transportation permit delays in Mayurbhanj district.' }
    ],
    recommendations: [
      { id: 'rec-901', priority: 'High', action: 'Expedite quarry blasting permits with Odisha Mining Department for 500,000 MT armor rock.', reason: 'Prevents breakwater construction halt before next cyclone season.', suggestedOwner: 'Chairman Paradip Port Authority', deadlineDays: 8, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 66, actualPhysical: 49, plannedFinancial: 62, actualFinancial: 46, riskScore: 68 },
      { month: 'Dec 25', plannedPhysical: 71, actualPhysical: 52, plannedFinancial: 67, actualFinancial: 49, riskScore: 71 },
      { month: 'Jan 26', plannedPhysical: 76, actualPhysical: 55, plannedFinancial: 72, actualFinancial: 51, riskScore: 74 },
      { month: 'Feb 26', plannedPhysical: 81, actualPhysical: 58, plannedFinancial: 77, actualFinancial: 54, riskScore: 76 }
    ]
  },
  {
    id: 'P-0914',
    name: 'Kashi Vishwanath Corridor Smart Urban Infrastructure Redevelopment',
    state: 'Uttar Pradesh',
    sector: 'Urban Infrastructure',
    agency: 'UP PWD / Smart Cities Mission',
    sanctionedCost: 800,
    revisedCost: 800,
    projectedFinalCost: 810,
    originalStartDate: '2023-05-01',
    originalEndDate: '2025-11-30',
    expectedEndDate: '2025-12-15',
    physicalProgress: 88,
    plannedProgress: 92,
    financialProgress: 85,
    plannedFinancialProgress: 89,
    scheduleRisk: 19,
    costRisk: 12,
    overallRisk: 16,
    riskLevel: 'LOW',
    expectedDelayMonths: 0.5,
    previousExtensions: 0,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-02 07:45 AM',
    description: 'Underground cabling, tourist transit plazas, heritage pedestrianization, and real-time crowd sensor network.',
    keyLocation: 'Varanasi, Uttar Pradesh',
    contractorName: 'PSP Projects Ltd',
    riskDrivers: [
      { factor: 'Crowd Traffic Management Windows', impactPercent: 70, category: 'Physical', description: 'Paving works restricted to 11 PM - 5 AM window during festival weeks.' },
      { factor: 'Heritage Façade Alignment', impactPercent: 30, category: 'Regulatory', description: 'ASI architectural supervision on conservation structures.' }
    ],
    recommendations: [
      { id: 'rec-1001', priority: 'Low', action: 'Finalize ASI compliance certificate for heritage light bollards.', reason: 'Routine sign-off before completion certificate.', suggestedOwner: 'Nodal Officer Smart City Varanasi', deadlineDays: 20, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 78, actualPhysical: 75, plannedFinancial: 75, actualFinancial: 72, riskScore: 18 },
      { month: 'Jan 26', plannedPhysical: 83, actualPhysical: 80, plannedFinancial: 80, actualFinancial: 77, riskScore: 17 },
      { month: 'Feb 26', plannedPhysical: 88, actualPhysical: 85, plannedFinancial: 85, actualFinancial: 82, riskScore: 16 },
      { month: 'Mar 26', plannedPhysical: 92, actualPhysical: 88, plannedFinancial: 89, actualFinancial: 85, riskScore: 16 }
    ]
  },
  {
    id: 'P-1289',
    name: 'Bikaner-Neemrana 765kV Green Energy Corridor Phase II',
    state: 'Rajasthan',
    sector: 'Energy',
    agency: 'PowerGrid',
    sanctionedCost: 2150,
    revisedCost: 2480,
    projectedFinalCost: 2610,
    originalStartDate: '2023-02-15',
    originalEndDate: '2025-08-31',
    expectedEndDate: '2026-06-30',
    physicalProgress: 64,
    plannedProgress: 85,
    financialProgress: 60,
    plannedFinancialProgress: 80,
    scheduleRisk: 74,
    costRisk: 66,
    overallRisk: 72,
    riskLevel: 'HIGH',
    expectedDelayMonths: 7.2,
    previousExtensions: 2,
    status: 'AT_RISK',
    lastUpdated: '2026-09-01 03:30 PM',
    description: 'Evacuation infrastructure for 8 GW hybrid solar-wind parks with specialized bird-diverter optical lines in GIB habitat.',
    keyLocation: 'Bikaner & Jodhpur, Rajasthan',
    contractorName: 'Sterlite Power Transmission',
    riskDrivers: [
      { factor: 'Supreme Court GIB Undergrounding Mandate', impactPercent: 42, category: 'Regulatory', description: 'Re-routing of 62 km high voltage line to comply with Great Indian Bustard conservation orders.' },
      { factor: 'Physical Progress Deficit', impactPercent: 28, category: 'Physical', description: '21% gap due to stay orders on tower erection in designated priority conservation zones.' },
      { factor: 'Cost Escalation Overrun', impactPercent: 18, category: 'Financial', description: 'Underground high-voltage XLPE cable costs 4x overhead line per km.' },
      { factor: 'Desert Sand Dune Stabilization', impactPercent: 12, category: 'Environmental', description: 'Geotextile foundation anchoring required in Thar shifting dune segments.' }
    ],
    recommendations: [
      { id: 'rec-1101', priority: 'High', action: 'Submit compliance affidavit with SC-appointed High-Level Committee on bird diverter specifications.', reason: 'Clearance required to resume stringing on 85 towers.', suggestedOwner: 'Director Projects PowerGrid & MoEFCC Nodal Officer', deadlineDays: 6, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 70, actualPhysical: 53, plannedFinancial: 66, actualFinancial: 50, riskScore: 65 },
      { month: 'Dec 25', plannedPhysical: 75, actualPhysical: 57, plannedFinancial: 71, actualFinancial: 53, riskScore: 68 },
      { month: 'Jan 26', plannedPhysical: 80, actualPhysical: 60, plannedFinancial: 75, actualFinancial: 56, riskScore: 70 },
      { month: 'Feb 26', plannedPhysical: 85, actualPhysical: 64, plannedFinancial: 80, actualFinancial: 60, riskScore: 72 }
    ]
  },
  {
    id: 'P-0220',
    name: 'Kolkata East-West Metro Extension (Howrah Maidan to Esplanade Sub-aqueous)',
    state: 'West Bengal',
    sector: 'Railways',
    agency: 'KMRC / RVNL',
    sanctionedCost: 8575,
    revisedCost: 9100,
    projectedFinalCost: 9280,
    originalStartDate: '2018-04-01',
    originalEndDate: '2024-03-31',
    expectedEndDate: '2025-10-31',
    physicalProgress: 96,
    plannedProgress: 98,
    financialProgress: 94,
    plannedFinancialProgress: 96,
    scheduleRisk: 31,
    costRisk: 24,
    overallRisk: 29,
    riskLevel: 'LOW',
    expectedDelayMonths: 1.5,
    previousExtensions: 4,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-02 02:00 PM',
    description: 'Indias first underwater metro line spanning 520 meters below the Hooghly Riverbed.',
    keyLocation: 'Kolkata & Howrah, West Bengal',
    contractorName: 'Afcons - Transtonnelstroy JV',
    riskDrivers: [
      { factor: 'Bowbazar Settlement Monitoring', impactPercent: 65, category: 'Environmental', description: 'High precision laser settlement sensors deployed across heritage building cluster.' },
      { factor: 'Ventilation Shaft Commissioning', impactPercent: 35, category: 'Physical', description: 'Sub-surface emergency egress shaft final integration.' }
    ],
    recommendations: [
      { id: 'rec-1201', priority: 'Low', action: 'Finalize structural telemetry log for Bowbazar heritage properties.', reason: 'Final step prior to full revenue clearance.', suggestedOwner: 'Managing Director KMRC', deadlineDays: 14, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 92, actualPhysical: 90, plannedFinancial: 90, actualFinancial: 88, riskScore: 32 },
      { month: 'Jan 26', plannedPhysical: 95, actualPhysical: 93, plannedFinancial: 93, actualFinancial: 91, riskScore: 30 },
      { month: 'Feb 26', plannedPhysical: 98, actualPhysical: 96, plannedFinancial: 96, actualFinancial: 94, riskScore: 29 }
    ]
  },
  {
    id: 'P-1335',
    name: 'Vizhinjam International Transhipment Deepwater Seaport Phase I',
    state: 'Kerala',
    sector: 'Transport',
    agency: 'VISL / Kerala Ports',
    sanctionedCost: 7700,
    revisedCost: 8400,
    projectedFinalCost: 8650,
    originalStartDate: '2019-12-05',
    originalEndDate: '2024-12-31',
    expectedEndDate: '2025-07-31',
    physicalProgress: 93,
    plannedProgress: 97,
    financialProgress: 90,
    plannedFinancialProgress: 95,
    scheduleRisk: 24,
    costRisk: 18,
    overallRisk: 21,
    riskLevel: 'LOW',
    expectedDelayMonths: 0.9,
    previousExtensions: 2,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-01 11:20 AM',
    description: 'Natural 24-meter deep draft mega container transhipment hub with 3.1 km breakwater and automated ship-to-shore cranes.',
    keyLocation: 'Thiruvananthapuram, Kerala',
    contractorName: 'Adani Ports and SEZ Ltd',
    riskDrivers: [
      { factor: 'Breakwater Core Armor Placement', impactPercent: 60, category: 'Physical', description: 'Final 120m segment tetrapod packing and capping beam concrete works.' },
      { factor: 'Rail Connectivity Spur Line', impactPercent: 40, category: 'Regulatory', description: '1.2 km tunnel link to Southern Railway mainline pending signaling interlock testing.' }
    ],
    recommendations: [
      { id: 'rec-1301', priority: 'Low', action: 'Complete integrated customs automation testing on automated gate system.', reason: 'Ensures commercial berthing without processing bottlenecks.', suggestedOwner: 'CEO VISL & Commissioner of Customs', deadlineDays: 18, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 89, actualPhysical: 86, plannedFinancial: 87, actualFinancial: 83, riskScore: 25 },
      { month: 'Jan 26', plannedPhysical: 93, actualPhysical: 90, plannedFinancial: 91, actualFinancial: 87, riskScore: 23 },
      { month: 'Feb 26', plannedPhysical: 97, actualPhysical: 93, plannedFinancial: 95, actualFinancial: 90, riskScore: 21 }
    ]
  },
  {
    id: 'P-0678',
    name: 'Polavaram Multi-Purpose Irrigation National Project Spillway & ECRF Dam',
    state: 'Andhra Pradesh',
    sector: 'Water',
    agency: 'Polavaram Project Authority / Jal Shakti',
    sanctionedCost: 55548,
    revisedCost: 62000,
    projectedFinalCost: 65400,
    originalStartDate: '2016-04-01',
    originalEndDate: '2024-06-30',
    expectedEndDate: '2027-03-31',
    physicalProgress: 52,
    plannedProgress: 88,
    financialProgress: 48,
    plannedFinancialProgress: 82,
    scheduleRisk: 92,
    costRisk: 88,
    overallRisk: 91,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 18.0,
    previousExtensions: 4,
    status: 'DELAYED',
    lastUpdated: '2026-09-02 12:45 PM',
    description: 'National project creating 7.2 lakh acres irrigation, 960 MW hydro power, and inter-basin water transfer from Godavari to Krishna.',
    keyLocation: 'Eluru & Alluri Sitharama Raju, Andhra Pradesh',
    contractorName: 'Megha Engineering & Infrastructures Ltd (MEIL)',
    riskDrivers: [
      { factor: 'Diaphragm Wall Damage & Remediation', impactPercent: 40, category: 'Environmental', description: 'Massive flood scour damaged 1.4 km concrete cutoff wall requiring entire ground Vibro-compaction reconstruction.' },
      { factor: 'R&R Relief & Rehabilitation Budget', impactPercent: 28, category: 'Financial', description: 'Pending central disbursement of ₹12,900 Cr for 48,000 project displaced tribal families.' },
      { factor: 'Physical Progress Deficit', impactPercent: 18, category: 'Physical', description: '36 percentage-point deficit on main Earth-Cum-Rock-Fill (ECRF) dam gap-1 & gap-2.' },
      { factor: 'Hydrological Spillway Gate Redesign', impactPercent: 14, category: 'Regulatory', description: 'CWC mandated spillway discharge capacity uprated from 36 to 50 lakh cusecs.' }
    ],
    recommendations: [
      { id: 'rec-1401', priority: 'High', action: 'Union Cabinet approval for revised Polavaram Phase-1 cost estimate of ₹30,850 Cr.', reason: 'Immediate liquidity needed to avoid monsoon work suspension.', suggestedOwner: 'Ministry of Jal Shakti & Dept of Expenditure', deadlineDays: 5, status: 'In Progress' },
      { id: 'rec-1402', priority: 'High', action: 'Authorize CWC international expert panel design for new D-wall parallel construction.', reason: 'Critical path item before ECRF dam filling.', suggestedOwner: 'Polavaram Project Authority CEO', deadlineDays: 8, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Oct 25', plannedPhysical: 76, actualPhysical: 46, plannedFinancial: 70, actualFinancial: 42, riskScore: 84 },
      { month: 'Nov 25', plannedPhysical: 80, actualPhysical: 48, plannedFinancial: 74, actualFinancial: 44, riskScore: 87 },
      { month: 'Dec 25', plannedPhysical: 84, actualPhysical: 50, plannedFinancial: 78, actualFinancial: 46, riskScore: 89 },
      { month: 'Jan 26', plannedPhysical: 88, actualPhysical: 52, plannedFinancial: 82, actualFinancial: 48, riskScore: 91 }
    ]
  },
  {
    id: 'P-0440',
    name: 'Patna Metro Rail Project Priority Corridor (Danapur to Khemnichak)',
    state: 'Bihar',
    sector: 'Urban Infrastructure',
    agency: 'PMRC / DMRC',
    sanctionedCost: 13365,
    revisedCost: 14200,
    projectedFinalCost: 14850,
    originalStartDate: '2021-08-01',
    originalEndDate: '2025-12-31',
    expectedEndDate: '2026-09-30',
    physicalProgress: 43,
    plannedProgress: 72,
    financialProgress: 39,
    plannedFinancialProgress: 68,
    scheduleRisk: 82,
    costRisk: 64,
    overallRisk: 79,
    riskLevel: 'HIGH',
    expectedDelayMonths: 8.8,
    previousExtensions: 2,
    status: 'AT_RISK',
    lastUpdated: '2026-09-01 02:00 PM',
    description: '17.9 km priority line with 6 underground stations, tunneling below dense old historic Patna grain markets.',
    keyLocation: 'Patna, Bihar',
    contractorName: 'NCC Ltd - J. Kumar Infra JV',
    riskDrivers: [
      { factor: 'Dense Urban Encroachment & RoW', impactPercent: 38, category: 'Regulatory', description: 'Ashok Rajpath underground corridor utility relocation delayed by unauthorized dense building pile clusters.' },
      { factor: 'Physical Progress Deficit', impactPercent: 30, category: 'Physical', description: '29% progress gap behind schedule.' },
      { factor: 'JICA Bilateral Funding Release Lags', impactPercent: 18, category: 'Financial', description: 'Stage-wise clearance of civil contract milestone certificates.' },
      { factor: 'Contractor Manpower Deployment', impactPercent: 14, category: 'Contractor', description: 'Dual-shift TBM operation hampered by skilled cutterhead maintenance crew shortage.' }
    ],
    recommendations: [
      { id: 'rec-1501', priority: 'High', action: 'Set up District Task Force headed by DM Patna for Ashok Rajpath utility shifting.', reason: 'Clearance allows lowering of second TBM at Gandhi Maidan.', suggestedOwner: 'Chief Secretary Bihar & MD PMRC', deadlineDays: 7, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 58, actualPhysical: 35, plannedFinancial: 54, actualFinancial: 31, riskScore: 71 },
      { month: 'Dec 25', plannedPhysical: 63, actualPhysical: 38, plannedFinancial: 59, actualFinancial: 34, riskScore: 74 },
      { month: 'Jan 26', plannedPhysical: 67, actualPhysical: 40, plannedFinancial: 63, actualFinancial: 36, riskScore: 77 },
      { month: 'Feb 26', plannedPhysical: 72, actualPhysical: 43, plannedFinancial: 68, actualFinancial: 39, riskScore: 79 }
    ]
  },
  {
    id: 'P-1456',
    name: 'Ludhiana-Amritsar Semi-High Speed Rail Track Quadrupling',
    state: 'Punjab',
    sector: 'Railways',
    agency: 'Northern Railway',
    sanctionedCost: 3400,
    revisedCost: 3520,
    projectedFinalCost: 3580,
    originalStartDate: '2023-04-10',
    originalEndDate: '2026-03-31',
    expectedEndDate: '2026-07-31',
    physicalProgress: 69,
    plannedProgress: 79,
    financialProgress: 66,
    plannedFinancialProgress: 76,
    scheduleRisk: 42,
    costRisk: 34,
    overallRisk: 40,
    riskLevel: 'MEDIUM',
    expectedDelayMonths: 2.8,
    previousExtensions: 1,
    status: 'AT_RISK',
    lastUpdated: '2026-09-02 01:15 PM',
    description: '136 km 3rd and 4th railway lines doubling freight capacity and enabling 160 km/h Vande Bharat services.',
    keyLocation: 'Ludhiana & Amritsar, Punjab',
    contractorName: 'Rail Vikas Nigam Ltd (RVNL)',
    riskDrivers: [
      { factor: 'Level Crossing Elimination ROB Sanctions', impactPercent: 48, category: 'Regulatory', description: 'State PWD cost-sharing approvals pending for 4 road overbridges.' },
      { factor: 'Signaling Cable Trenching', impactPercent: 32, category: 'Physical', description: 'Optical fiber route intersection with state irrigation canals.' },
      { factor: 'Weather Factors', impactPercent: 20, category: 'Environmental', description: 'Winter fog speed restrictions on ballast train movements.' }
    ],
    recommendations: [
      { id: 'rec-1601', priority: 'Medium', action: 'Expedite PWD Punjab cost-sharing agreement for Phagwara ROB.', reason: 'Allows uninterrupted track laying without level crossing disruption.', suggestedOwner: 'DRM Firozpur Division', deadlineDays: 12, status: 'Pending' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 65, actualPhysical: 58, plannedFinancial: 62, actualFinancial: 55, riskScore: 38 },
      { month: 'Jan 26', plannedPhysical: 72, actualPhysical: 63, plannedFinancial: 69, actualFinancial: 60, riskScore: 40 },
      { month: 'Feb 26', plannedPhysical: 79, actualPhysical: 69, plannedFinancial: 76, actualFinancial: 66, riskScore: 40 }
    ]
  },
  {
    id: 'P-1510',
    name: 'Eastern Peripheral Expressway Smart Highway Toll Automation & CCTV Grid',
    state: 'Haryana',
    sector: 'Roads',
    agency: 'NHAI',
    sanctionedCost: 450,
    revisedCost: 450,
    projectedFinalCost: 455,
    originalStartDate: '2024-02-01',
    originalEndDate: '2025-11-30',
    expectedEndDate: '2025-11-30',
    physicalProgress: 89,
    plannedProgress: 90,
    financialProgress: 86,
    plannedFinancialProgress: 88,
    scheduleRisk: 12,
    costRisk: 8,
    overallRisk: 11,
    riskLevel: 'LOW',
    expectedDelayMonths: 0.0,
    previousExtensions: 0,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-02 11:30 AM',
    description: '135 km solar-powered expressway AI traffic incident management system, automatic number plate recognition and weight-in-motion sensors.',
    keyLocation: 'Sonipat & Palwal, Haryana',
    contractorName: 'Efftronics Systems',
    riskDrivers: [
      { factor: 'Software Integration Testing', impactPercent: 65, category: 'Physical', description: 'Central Command Center API handshake with FASTag clearing house.' },
      { factor: 'Optical Sensor Calibration', impactPercent: 35, category: 'Contractor', description: 'Thermal camera night vision lux calibration.' }
    ],
    recommendations: [
      { id: 'rec-1701', priority: 'Low', action: 'Conduct 72-hour continuous live failover stress test.', reason: 'Final acceptance test before commercial handover.', suggestedOwner: 'Project Director NHAI Palwal', deadlineDays: 14, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 75, actualPhysical: 74, plannedFinancial: 72, actualFinancial: 71, riskScore: 12 },
      { month: 'Jan 26', plannedPhysical: 82, actualPhysical: 81, plannedFinancial: 80, actualFinancial: 79, riskScore: 11 },
      { month: 'Feb 26', plannedPhysical: 90, actualPhysical: 89, plannedFinancial: 88, actualFinancial: 86, riskScore: 11 }
    ]
  },
  {
    id: 'P-1682',
    name: 'Brahmaputra 6-Lane Extradosed Bridge (Guwahati to North Guwahati)',
    state: 'Assam',
    sector: 'Roads',
    agency: 'Assam PWD / MoRTH',
    sanctionedCost: 2608,
    revisedCost: 2980,
    projectedFinalCost: 3120,
    originalStartDate: '2020-03-01',
    originalEndDate: '2024-12-31',
    expectedEndDate: '2026-04-30',
    physicalProgress: 72,
    plannedProgress: 95,
    financialProgress: 68,
    plannedFinancialProgress: 90,
    scheduleRisk: 86,
    costRisk: 77,
    overallRisk: 84,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 15.2,
    previousExtensions: 3,
    status: 'DELAYED',
    lastUpdated: '2026-09-02 08:30 AM',
    description: '8.4 km total project length including 1.24 km extradosed cable-stayed main river spans over strong Brahmaputra hydrodynamic currents.',
    keyLocation: 'Guwahati, Assam',
    contractorName: 'SP Singla Constructions Pvt Ltd',
    riskDrivers: [
      { factor: 'High Velocity River Hydrology & Scour', impactPercent: 38, category: 'Environmental', description: 'Monsoon discharge of 75,000 m3/s restricts deep well caisson sinking to just 4 winter months per year.' },
      { factor: 'Physical Progress Deficit', impactPercent: 28, category: 'Physical', description: '23 percentage-point gap behind baseline schedule.' },
      { factor: 'Cost Escalation Overrun', impactPercent: 20, category: 'Financial', description: 'Cost escalation of ₹372 Cr (+14.3%) from specialized marine caisson anchoring.' },
      { factor: 'Imported Stay-Cable Certification', impactPercent: 14, category: 'Regulatory', description: 'Fatigue testing at European lab delayed shipment by 12 weeks.' }
    ],
    recommendations: [
      { id: 'rec-1801', priority: 'High', action: 'Deploy round-the-clock winter shift on Main Pier P-3 and P-4 deck segment launching before May pre-monsoon rise.', reason: 'Missing dry window will add another 12-month delay.', suggestedOwner: 'Chief Engineer Assam PWD & SP Singla MD', deadlineDays: 4, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 82, actualPhysical: 63, plannedFinancial: 78, actualFinancial: 59, riskScore: 78 },
      { month: 'Dec 25', plannedPhysical: 87, actualPhysical: 66, plannedFinancial: 82, actualFinancial: 62, riskScore: 81 },
      { month: 'Jan 26', plannedPhysical: 91, actualPhysical: 69, plannedFinancial: 86, actualFinancial: 65, riskScore: 83 },
      { month: 'Feb 26', plannedPhysical: 95, actualPhysical: 72, plannedFinancial: 90, actualFinancial: 68, riskScore: 84 }
    ]
  },
  {
    id: 'P-1790',
    name: 'Zojila Pass All-Weather Tunnel (Srinagar-Sonamarg-Gumri Road)',
    state: 'Jammu & Kashmir',
    sector: 'Transport',
    agency: 'NHIDCL / MoRTH',
    sanctionedCost: 6800,
    revisedCost: 7450,
    projectedFinalCost: 7820,
    originalStartDate: '2020-10-15',
    originalEndDate: '2026-11-30',
    expectedEndDate: '2027-10-31',
    physicalProgress: 48,
    plannedProgress: 74,
    financialProgress: 45,
    plannedFinancialProgress: 70,
    scheduleRisk: 88,
    costRisk: 81,
    overallRisk: 87,
    riskLevel: 'CRITICAL',
    expectedDelayMonths: 11.0,
    previousExtensions: 2,
    status: 'AT_RISK',
    lastUpdated: '2026-09-02 01:20 PM',
    description: '13.14 km single-tube bi-directional strategic tunnel at 11,578 ft altitude providing year-round strategic military & civilian connectivity to Ladakh.',
    keyLocation: 'Baltal to Minamarg, J&K',
    contractorName: 'Megha Engineering & Infrastructures Ltd (MEIL)',
    riskDrivers: [
      { factor: 'Sub-Zero Temperature & Avalanche Hazards', impactPercent: 40, category: 'Environmental', description: 'Winter temperatures below -25°C and severe avalanches at western portal halted aggregate crushing and concrete batching.' },
      { factor: 'Progress Deficit', impactPercent: 27, category: 'Physical', description: '26% gap behind scheduled heading breakthrough targets.' },
      { factor: 'Rock Burst & High In-Situ Stresses', impactPercent: 19, category: 'Physical', description: 'Frequent violent rock spalling in high overburden zone requiring heavy yieldable steel ribs.' },
      { factor: 'Cost Escalation', impactPercent: 14, category: 'Financial', description: '₹650 Cr escalation for heated air ventilation shafts and avalanche deflection galleries.' }
    ],
    recommendations: [
      { id: 'rec-1901', priority: 'High', action: 'Install heavy-duty insulated electric air heaters and frost-resistant additives at Baltal portal.', reason: 'Extends winter tunneling cycle by 75 active working days.', suggestedOwner: 'Managing Director NHIDCL & MEIL Project Director', deadlineDays: 5, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Nov 25', plannedPhysical: 61, actualPhysical: 41, plannedFinancial: 57, actualFinancial: 38, riskScore: 80 },
      { month: 'Dec 25', plannedPhysical: 65, actualPhysical: 43, plannedFinancial: 61, actualFinancial: 40, riskScore: 83 },
      { month: 'Jan 26', plannedPhysical: 69, actualPhysical: 45, plannedFinancial: 65, actualFinancial: 42, riskScore: 85 },
      { month: 'Feb 26', plannedPhysical: 74, actualPhysical: 48, plannedFinancial: 70, actualFinancial: 45, riskScore: 87 }
    ]
  },
  {
    id: 'P-1845',
    name: 'IIT Dharwad Permanent Campus Phase II Construction',
    state: 'Karnataka',
    sector: 'Education',
    agency: 'MoE / CPWD',
    sanctionedCost: 650,
    revisedCost: 675,
    projectedFinalCost: 690,
    originalStartDate: '2023-01-20',
    originalEndDate: '2025-10-31',
    expectedEndDate: '2025-12-31',
    physicalProgress: 82,
    plannedProgress: 89,
    financialProgress: 79,
    plannedFinancialProgress: 85,
    scheduleRisk: 28,
    costRisk: 20,
    overallRisk: 25,
    riskLevel: 'LOW',
    expectedDelayMonths: 2.0,
    previousExtensions: 0,
    status: 'ON_TRACK',
    lastUpdated: '2026-09-01 04:00 PM',
    description: 'Academic complex, central research facility, 1500-capacity hostel blocks, and net-zero energy water management campus.',
    keyLocation: 'Dharwad, Karnataka',
    contractorName: 'Shapoorji Pallonji & Co',
    riskDrivers: [
      { factor: 'HVAC & Lab Fixture Commissioning', impactPercent: 65, category: 'Physical', description: 'Cleanroom HVAC balancing in nanotechnology research lab.' },
      { factor: 'Campus Solar Rooftop Interconnection', impactPercent: 35, category: 'Regulatory', description: 'HESCOM net-metering synchronization inspection.' }
    ],
    recommendations: [
      { id: 'rec-2001', priority: 'Low', action: 'Schedule HESCOM joint grid inspection for 1.2 MW rooftop array.', reason: 'Ensures net-metering power credit before term opening.', suggestedOwner: 'IIT Dharwad Estate Officer', deadlineDays: 16, status: 'In Progress' }
    ],
    monthlyProgress: [
      { month: 'Dec 25', plannedPhysical: 74, actualPhysical: 70, plannedFinancial: 70, actualFinancial: 66, riskScore: 26 },
      { month: 'Jan 26', plannedPhysical: 81, actualPhysical: 76, plannedFinancial: 78, actualFinancial: 73, riskScore: 25 },
      { month: 'Feb 26', plannedPhysical: 89, actualPhysical: 82, plannedFinancial: 85, actualFinancial: 79, riskScore: 25 }
    ]
  },
  // Adding realistic batch of additional projects to cross 50+ total projects
  ...generateSyntheticInfrastructureProjects()
];

function generateSyntheticInfrastructureProjects(): Project[] {
  const extraProjects: Project[] = [];
  
  const states = [
    'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'West Bengal', 'Odisha',
    'Kerala', 'Andhra Pradesh', 'Bihar', 'Punjab', 'Haryana', 'Delhi'
  ];

  const sectors: Array<Project['sector']> = [
    'Transport', 'Roads', 'Railways', 'Energy', 'Water', 'Urban Infrastructure', 'Healthcare', 'Education'
  ];

  const agencies = ['NHAI', 'RVNL', 'NTPC', 'PWD', 'DMRC', 'Jal Jeevan Mission', 'AIIMS', 'PowerGrid', 'BMRCL', 'MMRDA', 'CPWD', 'CIDCO'];
  const contractors = ['Larsen & Toubro', 'Tata Projects', 'Dilip Buildcon', 'KNR Constructions', 'Afcons', 'J. Kumar Infraprojects', 'NCC Limited', 'Shapoorji Pallonji', 'Ahluwalia Contracts', 'PNC Infratech'];

  const projectTemplates = [
    { title: 'Ring Road Expressway Expansion', sector: 'Roads' as const, costBase: 750 },
    { title: 'Super Thermal Power Plant Flue Gas Desulfurization', sector: 'Energy' as const, costBase: 1200 },
    { title: 'Multi-Modal Logistics Park & Inland Container Depot', sector: 'Transport' as const, costBase: 620 },
    { title: 'Elevated Metro Corridor Extension Stage 1', sector: 'Urban Infrastructure' as const, costBase: 3400 },
    { title: 'Rural Piped Drinking Water Supply Scheme', sector: 'Water' as const, costBase: 480 },
    { title: 'Government Medical College & 500-Bed Hospital', sector: 'Healthcare' as const, costBase: 850 },
    { title: 'Central University Academic Block & Research Labs', sector: 'Education' as const, costBase: 380 },
    { title: 'Dedicated Freight Feeder Line Doubling', sector: 'Railways' as const, costBase: 1850 },
    { title: 'City Stormwater Drainage & Canal Beautification', sector: 'Urban Infrastructure' as const, costBase: 510 },
    { title: 'High-Voltage Ultra Substation 400kV Augmentation', sector: 'Energy' as const, costBase: 420 },
    { title: 'State Highway 4-Laning & Bypass Construction', sector: 'Roads' as const, costBase: 690 },
    { title: 'River Interlinking Canal & Lift Irrigation Scheme', sector: 'Water' as const, costBase: 2400 }
  ];

  for (let i = 1; i <= 38; i++) {
    const pId = `P-${(2000 + i).toString()}`;
    const tpl = projectTemplates[i % projectTemplates.length];
    const state = states[i % states.length];
    const agency = agencies[i % agencies.length];
    const contractor = contractors[i % contractors.length];
    
    // Distribute risk levels naturally
    const riskSeed = (i * 17) % 100;
    let riskLevel: Project['riskLevel'] = 'LOW';
    let overallRisk = 22 + (riskSeed % 20);
    let scheduleRisk = 20 + (riskSeed % 25);
    let costRisk = 18 + (riskSeed % 25);
    let status: Project['status'] = 'ON_TRACK';
    let delayMonths = 0.5 + (riskSeed % 3) * 0.5;
    let extensions = 0;
    let planPhys = 75 + (i % 20);
    let actPhys = planPhys - 3;
    let planFin = planPhys - 4;
    let actFin = actPhys - 3;
    let costEscalation = 1.02;

    if (riskSeed > 75) {
      riskLevel = 'CRITICAL';
      overallRisk = 80 + (riskSeed % 18);
      scheduleRisk = 78 + (riskSeed % 19);
      costRisk = 72 + (riskSeed % 22);
      status = (i % 2 === 0) ? 'DELAYED' : 'AT_RISK';
      delayMonths = 6.0 + (riskSeed % 8);
      extensions = 2 + (i % 2);
      planPhys = 70 + (i % 15);
      actPhys = planPhys - (18 + (riskSeed % 14));
      planFin = planPhys - 5;
      actFin = actPhys - 6;
      costEscalation = 1.25 + (riskSeed % 15) / 100;
    } else if (riskSeed > 48) {
      riskLevel = 'HIGH';
      overallRisk = 68 + (riskSeed % 11);
      scheduleRisk = 65 + (riskSeed % 15);
      costRisk = 60 + (riskSeed % 16);
      status = 'AT_RISK';
      delayMonths = 4.0 + (riskSeed % 4);
      extensions = 1;
      planPhys = 65 + (i % 20);
      actPhys = planPhys - (12 + (riskSeed % 8));
      planFin = planPhys - 4;
      actFin = actPhys - 4;
      costEscalation = 1.14 + (riskSeed % 10) / 100;
    } else if (riskSeed > 25) {
      riskLevel = 'MEDIUM';
      overallRisk = 45 + (riskSeed % 20);
      scheduleRisk = 42 + (riskSeed % 20);
      costRisk = 38 + (riskSeed % 18);
      status = (i % 3 === 0) ? 'AT_RISK' : 'ON_TRACK';
      delayMonths = 2.0 + (riskSeed % 3);
      extensions = 1;
      planPhys = 60 + (i % 25);
      actPhys = planPhys - (6 + (riskSeed % 6));
      planFin = planPhys - 3;
      actFin = actPhys - 3;
      costEscalation = 1.06 + (riskSeed % 6) / 100;
    }

    const sancCost = Math.round(tpl.costBase * (0.7 + (i % 5) * 0.2));
    const revCost = Math.round(sancCost * costEscalation);
    const projCost = Math.round(revCost * (1 + (overallRisk > 70 ? 0.05 : 0.01)));

    actPhys = Math.max(12, Math.min(96, actPhys));
    actFin = Math.max(10, Math.min(95, actFin));

    extraProjects.push({
      id: pId,
      name: `${state} ${tpl.title} (Sector-${((i % 4) + 1)})`,
      state,
      sector: tpl.sector,
      agency,
      sanctionedCost: sancCost,
      revisedCost: revCost,
      projectedFinalCost: projCost,
      originalStartDate: `2023-0${(i % 8) + 1}-10`,
      originalEndDate: `2026-0${(i % 9) + 1}-30`,
      expectedEndDate: `2026-1${(i % 3)}-15`,
      physicalProgress: actPhys,
      plannedProgress: planPhys,
      financialProgress: actFin,
      plannedFinancialProgress: planFin,
      scheduleRisk,
      costRisk,
      overallRisk,
      riskLevel,
      expectedDelayMonths: parseFloat(delayMonths.toFixed(1)),
      previousExtensions: extensions,
      status,
      lastUpdated: '2026-09-02 01:00 PM',
      description: `Major infrastructure execution of ${tpl.title.toLowerCase()} across critical corridors in ${state}.`,
      keyLocation: `${state} District Cluster ${((i % 6) + 1)}`,
      contractorName: contractor,
      riskDrivers: [
        { factor: 'Physical Progress Gap', impactPercent: Math.round(overallRisk * 0.38), category: 'Physical', description: `${planPhys - actPhys}% variance from planned milestone schedule.` },
        { factor: 'Contractor Resource Liquidity', impactPercent: Math.round(overallRisk * 0.25), category: 'Contractor', description: 'Equipment mobilization and sub-vendor payout cycles.' },
        { factor: 'Statutory RoW Clearances', impactPercent: Math.round(overallRisk * 0.20), category: 'Regulatory', description: 'Local municipal and utility alignment approvals.' },
        { factor: 'Raw Material Escalation', impactPercent: Math.max(8, Math.round(overallRisk * 0.17)), category: 'Financial', description: 'Steel, cement and fuel cost variations.' }
      ],
      recommendations: [
        { id: `rec-${pId}-1`, priority: overallRisk > 70 ? 'High' : 'Medium', action: `Conduct joint review with ${agency} and ${contractor} leadership.`, reason: 'Establish catch-up milestones for lagging segments.', suggestedOwner: `Project Director ${agency}`, deadlineDays: 10, status: 'Pending' },
        { id: `rec-${pId}-2`, priority: 'Low', action: 'Verify intermediate financial progress certificates against physical site inspection.', reason: 'Streamline billing and maintain vendor velocity.', suggestedOwner: 'Finance Controller', deadlineDays: 20, status: 'In Progress' }
      ],
      monthlyProgress: [
        { month: 'Dec 25', plannedPhysical: Math.max(10, planPhys - 15), actualPhysical: Math.max(8, actPhys - 12), plannedFinancial: Math.max(10, planFin - 15), actualFinancial: Math.max(8, actFin - 12), riskScore: Math.max(15, overallRisk - 8) },
        { month: 'Jan 26', plannedPhysical: Math.max(15, planPhys - 8), actualPhysical: Math.max(12, actPhys - 6), plannedFinancial: Math.max(15, planFin - 8), actualFinancial: Math.max(12, actFin - 6), riskScore: Math.max(18, overallRisk - 4) },
        { month: 'Feb 26', plannedPhysical: planPhys, actualPhysical: actPhys, plannedFinancial: planFin, actualFinancial: actFin, riskScore: overallRisk }
      ]
    });
  }

  return extraProjects;
}
