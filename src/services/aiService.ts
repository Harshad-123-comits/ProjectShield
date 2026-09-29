import { ChatMessage, Project, StateSummary } from '../types';
import { INITIAL_PROJECTS } from '../data/projects';
import { STATE_SUMMARIES, TOP_RISK_DRIVERS } from '../data/analytics';

export async function processAssistantQuery(
  userQuery: string,
  allProjects: Project[] = INITIAL_PROJECTS,
  statesData: StateSummary[] = STATE_SUMMARIES
): Promise<ChatMessage> {
  const query = userQuery.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Specific Project Deep-Dive Check (e.g., "P-1042", "P-0821", "National Highway", etc.)
  const matchedProject = allProjects.find(
    (p) =>
      query.includes(p.id.toLowerCase()) ||
      query.includes(p.name.toLowerCase().slice(0, 15)) ||
      (query.includes('p1042') && p.id === 'P-1042') ||
      (query.includes('mumbai') && p.id === 'P-1042')
  );

  if (matchedProject && (query.includes('why') || query.includes('risk') || query.includes('status') || query.includes('explain') || query.includes('details') || query.includes('p-') || query.includes('p1042'))) {
    const driversList = matchedProject.riskDrivers.map((d) => ({
      factor: d.factor,
      impact: `+${d.impactPercent}% (${d.description.slice(0, 60)}...)`
    }));

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### Predictive Risk Assessment: ${matchedProject.name} (${matchedProject.id})

The model calculates an **overall risk score of ${matchedProject.overallRisk}/100** categorized as **${matchedProject.riskLevel} RISK**. 

**Primary Diagnostics:**
- **Schedule Overrun Probability:** ${matchedProject.scheduleRisk}% with an expected completion delay of **${matchedProject.expectedDelayMonths} months**.
- **Cost Escalation Risk:** ${matchedProject.costRisk}% with projected final cost reaching **₹${matchedProject.projectedFinalCost} Cr** (+₹${matchedProject.projectedFinalCost - matchedProject.sanctionedCost} Cr above sanctioned).
- **Physical Execution Gap:** ${matchedProject.plannedProgress - matchedProject.physicalProgress} percentage-points behind target baseline.`,
      referencedProjectId: matchedProject.id,
      structuredData: {
        type: 'project_card',
        title: `${matchedProject.id} — ${matchedProject.name}`,
        riskScore: matchedProject.overallRisk,
        riskLevel: matchedProject.riskLevel,
        metrics: [
          { label: 'Schedule Risk', value: `${matchedProject.scheduleRisk}%` },
          { label: 'Cost Overrun Risk', value: `${matchedProject.costRisk}%` },
          { label: 'Physical Progress', value: `${matchedProject.physicalProgress}% / ${matchedProject.plannedProgress}%` },
          { label: 'Expected Delay', value: `${matchedProject.expectedDelayMonths} mo` }
        ],
        drivers: driversList,
        recommendedActions: matchedProject.recommendations.map((r) => r.action)
      }
    };
  }

  // 2. Highest Risk Projects / Immediate Attention Query
  if (query.includes('highest risk') || query.includes('immediate attention') || query.includes('dangerous') || query.includes('critical') || query.includes('top risk')) {
    const topRisk = [...allProjects].sort((a, b) => b.overallRisk - a.overallRisk).slice(0, 5);
    
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### Top Priority Projects Requiring Immediate MoSPI Intervention

Analysis across **${allProjects.length} monitored infrastructure assets** reveals **${allProjects.filter(p => p.riskLevel === 'CRITICAL').length} projects in CRITICAL status** requiring urgent inter-ministerial coordination:`,
      structuredData: {
        type: 'ranking',
        title: 'Priority Escalation Matrix',
        metrics: topRisk.map((p) => ({
          label: `${p.id} (${p.state})`,
          value: `${p.overallRisk}/100`,
          change: `${p.expectedDelayMonths} mo delay | ₹${p.projectedFinalCost - p.sanctionedCost} Cr extra`
        })),
        recommendedActions: [
          'Direct MoSPI State Coordination Cell to convene emergency review for Top 5 critical projects.',
          'Issue binding directives on contractor mobilization and land parcel clearances.',
          'Place high-variance projects under weekly telemetry sensor reporting.'
        ]
      }
    };
  }

  // 3. States with largest cost exposure / comparison (e.g. "largest cost exposure", "compare maharashtra and karnataka")
  if (query.includes('cost exposure') || query.includes('states') || query.includes('compare maharashtra') || query.includes('state comparison')) {
    const sortedStates = [...statesData].sort((a, b) => b.costExposureCr - a.costExposureCr);
    const topState = sortedStates[0];
    const mh = statesData.find(s => s.state === 'Maharashtra') || statesData[0];
    const ka = statesData.find(s => s.state === 'Karnataka') || statesData[1];

    if (query.includes('maharashtra') && query.includes('karnataka')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        timestamp,
        text: `### Comparative Analysis: Maharashtra vs Karnataka Infrastructure Portfolio

A comparative risk breakdown between the two state portfolios shows differing risk drivers and financial exposures:`,
        structuredData: {
          type: 'comparison',
          title: 'State Infrastructure Risk Comparison',
          comparisonRows: [
            { label: 'Total Projects Monitored', itemA: `${mh.totalProjects} Projects`, itemB: `${ka.totalProjects} Projects` },
            { label: 'High & Critical Risk Projects', itemA: `${mh.highRiskProjects} (${Math.round((mh.highRiskProjects/mh.totalProjects)*100)}%)`, itemB: `${ka.highRiskProjects} (${Math.round((ka.highRiskProjects/ka.totalProjects)*100)}%)` },
            { label: 'Delayed Projects', itemA: `${mh.delayedProjects}`, itemB: `${ka.delayedProjects}` },
            { label: 'Total Sanctioned Investment', itemA: `₹${mh.totalSanctionedCr.toLocaleString()} Cr`, itemB: `₹${ka.totalSanctionedCr.toLocaleString()} Cr` },
            { label: 'Estimated Cost Exposure', itemA: `₹${mh.costExposureCr} Cr`, itemB: `₹${ka.costExposureCr} Cr` },
            { label: 'Average Risk Index', itemA: `${mh.avgRiskScore}/100`, itemB: `${ka.avgRiskScore}/100` }
          ],
          recommendedActions: [
            'Maharashtra requires prioritized Right-of-Way dispute fast-tracking on NH corridors.',
            'Karnataka requires expedited utility clearances for Suburban Rail and Metro Phase 2.'
          ]
        }
      };
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### State-wise Estimated Cost Exposure Analysis

The highest projected cost overrun exposure is concentrated in **${topState.state} (₹${topState.costExposureCr} Cr)**, followed by Andhra Pradesh (₹410 Cr) and Uttar Pradesh (₹390 Cr). Total nationwide potential escalation across high-risk assets stands at **₹842 Cr**.`,
      structuredData: {
        type: 'ranking',
        title: 'Top States by Fiscal Risk Exposure',
        metrics: sortedStates.slice(0, 5).map(s => ({
          label: s.state,
          value: `₹${s.costExposureCr} Cr`,
          change: `${s.highRiskProjects} High Risk Projects (${s.avgRiskScore} Avg Risk)`
        }))
      }
    };
  }

  // 4. Highway / Transport / Sector specific query
  if (query.includes('highway') || query.includes('transport') || query.includes('delayed highway') || query.includes('road')) {
    const transportProjects = allProjects.filter(p => p.sector === 'Transport' || p.sector === 'Roads');
    const delayed = transportProjects.filter(p => p.status === 'DELAYED' || p.expectedDelayMonths > 4);

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### Delayed Highway & Transport Sector Portfolio

Found **${delayed.length} delayed or high-risk highway assets** out of ${transportProjects.length} monitored transport projects.

Key contributors:
1. **P-1042 (Mumbai-Pune Corridor Expansion):** 5.8 mo delay, 21% physical progress gap.
2. **P-1682 (Brahmaputra 6-Lane Extradosed Bridge):** 15.2 mo delay, monsoon hydrological limitations.
3. **P-1790 (Zojila Strategic Tunnel):** 11.0 mo delay, sub-zero rock spalling conditions.`,
      structuredData: {
        type: 'ranking',
        title: 'Delayed Highway Projects',
        metrics: delayed.slice(0, 4).map(p => ({
          label: `${p.id}: ${p.name.slice(0, 35)}...`,
          value: `+${p.expectedDelayMonths} mo`,
          change: `${p.riskLevel} Risk (${p.overallRisk}/100)`
        })),
        recommendedActions: [
          'Convene joint MoRTH-NHAI taskforce on monsoon-affected road works.',
          'Review equipment deployment logs on Zojila and Brahmaputra bridge sites.'
        ]
      }
    };
  }

  // 5. Risk Driver Frequency Query (e.g. "Which risk driver appears most frequently?")
  if (query.includes('risk driver') || query.includes('frequently') || query.includes('driver') || query.includes('reasons')) {
    const topDriver = TOP_RISK_DRIVERS[0];

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      timestamp,
      text: `### Systemic Infrastructure Risk Driver Diagnostics

The most frequent risk trigger is **"${topDriver.name}"**, appearing in **${topDriver.frequencyPercent}% of all delayed or at-risk projects**, accounting for an average **${topDriver.avgContributionPercent}% contribution** to predicted schedule overruns.

**Secondary Predominant Drivers:**
1. **Land Acquisition & RoW Disputes (68% frequency):** Primary bottleneck in linear projects (Highways, Rail).
2. **Contractor Liquidity & Resource Mobilization (54% frequency):** Cash-flow and sub-vendor payout constraints.
3. **Statutory & Environmental Approvals (46% frequency):** Forest/wildlife clearances and high-voltage line rerouting.`,
      structuredData: {
        type: 'ranking',
        title: 'Top Systemic Risk Drivers',
        metrics: TOP_RISK_DRIVERS.slice(0, 5).map(d => ({
          label: d.name,
          value: `${d.frequencyPercent}% Frequency`,
          change: `~${d.avgContributionPercent}% SHAP impact`
        })),
        recommendedActions: [
          'Standardize pre-construction statutory clearances before awarding EPC contracts.',
          'Implement escrow accounts with milestone-verified contractor vendor payouts.'
        ]
      }
    };
  }

  // 6. Generic Fallback with Smart Context
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    timestamp,
    text: `### ProjectShield AI Intelligence Analysis

Based on current predictive modeling across **${allProjects.length} infrastructure projects** in the MoSPI registry:

- **Current National Risk Index:** 54.2 / 100
- **Total Critical Projects:** ${allProjects.filter(p => p.riskLevel === 'CRITICAL').length} projects
- **Total Estimated Escalation Exposure:** ₹842 Cr

**You can ask more specifically:**
- *"Why is Project P-1042 high risk?"*
- *"Which projects are at highest risk?"*
- *"Which states have the largest cost exposure?"*
- *"Compare Maharashtra and Karnataka"*
- *"Show delayed highway projects"*`,
    structuredData: {
      type: 'ranking',
      title: 'Suggested Drilldown Queries',
      metrics: [
        { label: 'National Critical Projects', value: `${allProjects.filter(p => p.riskLevel === 'CRITICAL').length} Assets` },
        { label: 'Top Risk Sector', value: 'Railways & Transport' },
        { label: 'Highest Risk State', value: 'Andhra Pradesh & Maharashtra' }
      ]
    }
  };
}
