import { ChatMessage, Project } from '../types';
import { api } from './api';

export async function processAssistantQuery(
  userQuery: string,
  projectsContext: Project[] = []
): Promise<ChatMessage> {
  const query = userQuery.toLowerCase().trim();
  const timestamp = new Date().toISOString();

  // Helper to construct basic responses
  const createMsg = (text: string, structuredData?: any): ChatMessage => ({
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    timestamp,
    text,
    structuredData
  });

  try {
    // 1. Single Project Query
    if (query.includes('p-') || query.includes('project')) {
      const match = query.match(/p-\d{3,4}/i);
      const projectId = match ? match[0].toUpperCase() : null;

      if (projectId) {
        const res = await api.getProjects({ search: projectId });
        const p = res.data?.[0];
        if (!p) {
          return createMsg(`I could not find project ${projectId} in the current PAIMANA registry.`);
        }
        
        return createMsg(`### Project Analysis: ${p.projectCode}
**${p.projectName}** is currently classified as **${p.status || 'UNKNOWN'}** with a risk level of **${p.riskLevel}**.`,
          {
            type: 'project-detail',
            title: `Deep-Dive: ${p.projectCode}`,
            project: p
          }
        );
      }
    }

    // 2. High Risk / Highest Risk / Priority
    if (query.includes('highest risk') || query.includes('priority') || query.includes('top risk')) {
      const res = await api.getHighRiskProjects();
      const topRisk = res.data || [];
      
      if (topRisk.length === 0) {
         return createMsg("There are no high risk projects currently flagged in the database.");
      }

      return createMsg(`### Top Critical Risk Assets
Based on current deterministic evaluation, the following projects have the highest risk exposure across the portfolio:`,
        {
          type: 'ranking',
          title: 'Priority Escalation Matrix',
          metrics: topRisk.slice(0, 5).map((p: any) => ({
            label: `${p.projectCode} (${p.state})`,
            value: `Risk: ${p.riskScore}/100`,
            change: `Cost Overrun: ₹${p.costOverrun} Cr`
          })),
          recommendedActions: [
            'Direct State Coordination Cell to convene emergency review.',
            'Place high-variance projects under continuous telemetry reporting.'
          ]
        }
      );
    }

    // 3. State comparison / Cost exposure
    if (query.includes('cost exposure') || query.includes('states') || query.includes('compare') || query.includes('state')) {
      const res = await api.getStates();
      const statesData = res.data || [];
      
      if (statesData.length === 0) {
        return createMsg("Insufficient state data available for this analysis.");
      }

      const sortedStates = [...statesData].sort((a: any, b: any) => (b.costOverrun || 0) - (a.costOverrun || 0));
      const topState = sortedStates[0];

      return createMsg(`### State-wise Estimated Cost Exposure Analysis
The highest projected cost overrun exposure is concentrated in **${topState.state} (₹${topState.costOverrun || 0} Cr)**.`,
        {
          type: 'ranking',
          title: 'Top States by Fiscal Risk Exposure',
          metrics: sortedStates.slice(0, 5).map((s: any) => ({
            label: s.state,
            value: `₹${s.costOverrun || 0} Cr Overrun`,
            change: `${s.highRiskCount} High Risk Projects`
          }))
        }
      );
    }

    // 4. Sector / Highway query
    if (query.includes('highway') || query.includes('transport') || query.includes('road')) {
      const res = await api.getSectors();
      const sectorsData = res.data || [];
      const transport = sectorsData.find((s: any) => s.sector.includes('Transport') || s.sector.includes('Road'));
      
      if (!transport) {
         return createMsg("Insufficient transport sector data is available for this analysis.");
      }
      
      return createMsg(`### Transport & Road Sector Analysis
Found **${transport.projectCount}** monitored transport projects.
Currently **${transport.delayedCount}** projects are experiencing delays, and **${transport.highRiskCount}** are classified as high risk.`,
        {
          type: 'ranking',
          title: 'Transport Sector Summary',
          metrics: [
             { label: 'Total Projects', value: transport.projectCount, change: '' },
             { label: 'Delayed', value: transport.delayedCount, change: '' },
             { label: 'High Risk', value: transport.highRiskCount, change: '' }
          ]
        }
      );
    }

    // 5. Generic Summary Fallback
    const sumRes = await api.getSummaryAnalytics();
    const summary = sumRes.data || {};

    if (!summary.totalProjects) {
       return createMsg("Insufficient project data is available in the PAIMANA database.");
    }

    return createMsg(`### ProjectShield Intelligence Analysis

Based on current tracking across **${summary.totalProjects} infrastructure projects** in the MoSPI registry:

- **Average Physical Progress:** ${Math.round(summary.averagePhysicalProgress || 0)}%
- **Total Critical Projects:** ${summary.highRiskProjects}
- **Total Estimated Escalation Exposure:** ₹${summary.totalCostOverrun?.toLocaleString()} Cr

**You can ask more specifically:**
- *"Which projects are at highest risk?"*
- *"Which states have the largest cost exposure?"*
- *"Show delayed transport projects"*`,
      {
        type: 'ranking',
        title: 'Suggested Drilldown Queries',
        metrics: [
          { label: 'National High Risk Projects', value: `${summary.highRiskProjects} Assets`, change: '' },
          { label: 'Delayed Projects', value: `${summary.delayedProjects}`, change: '' }
        ]
      }
    );

  } catch (error) {
    console.error('AI Service Error:', error);
    return createMsg("Analytics temporarily unavailable because the data service is unavailable.");
  }
}
