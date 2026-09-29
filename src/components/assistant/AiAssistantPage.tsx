import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { ChatMessage, Project } from '../../types';
import { processAssistantQuery } from '../../services/aiService';
import { RiskBadge } from '../common/RiskBadge';

interface AiAssistantPageProps {
  projects: Project[];
  onSelectProjectById: (id: string) => void;
  initialQuery?: string;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  projects,
  onSelectProjectById,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: '01:30 PM',
      text: `### Welcome to ProjectShield AI Project Intelligence Assistant

I am your specialized MoSPI predictive intelligence advisor trained on **1,248 infrastructure monitoring records**. I can perform root-cause diagnostics, state/sector fiscal comparisons, and recommend mitigation directives.

**Try asking:**
- *"Why is Project P-1042 high risk?"*
- *"Which projects are at highest risk?"*
- *"Which states have largest cost exposure?"*
- *"Compare Maharashtra and Karnataka"*
- *"Show delayed highway projects"*`,
      structuredData: {
        type: 'ranking',
        title: 'Quick MoSPI Intelligence Queries',
        metrics: [
          { label: 'Monitored Assets', value: '1,248 Projects' },
          { label: 'Critical Assets', value: '43 Priority' },
          { label: 'Total Cost Exposure', value: '₹842 Cr' }
        ]
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Why is Project P-1042 high risk?',
    'Which projects are at highest risk?',
    'Which states have largest cost exposure?',
    'Compare Maharashtra and Karnataka',
    'Show delayed highway projects',
    'Which risk driver appears most frequently?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: userTimestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Process query using smart domain AI engine
      const botResponse = await processAssistantQuery(query, projects);
      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 400);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'reset-msg',
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Chat history cleared. How can I assist you with MoSPI project analytics today?'
      }
    ]);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>ProjectShield AI Project Intelligence Assistant</span>
              <span className="text-[10px] font-mono-num font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                MoSPI Domain AI
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive explainable AI query interface for project managers & MoSPI oversight
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Clear chat history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompt Chips Bar */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0 pl-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Suggested:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium transition-colors shrink-0 shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40 dark:bg-slate-950/30">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${isBot ? '' : 'ml-auto justify-end'}`}
            >
              {isBot && (
                <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-2xs'
                    : 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                }`}
              >
                {/* Message Header */}
                <div className={`flex items-center justify-between gap-4 mb-2 text-[10px] font-mono-num ${isBot ? 'text-slate-400 dark:text-slate-500' : 'text-blue-100'}`}>
                  <span className="font-semibold">{isBot ? 'ProjectShield AI' : 'MoSPI Officer'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Text with formatting */}
                <div className="space-y-2 whitespace-pre-line text-slate-800 dark:text-slate-200">
                  {msg.text}
                </div>

                {/* Structured Data Cards if present */}
                {msg.structuredData && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    {/* Project Card view */}
                    {msg.structuredData.type === 'project_card' && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs">{msg.structuredData.title}</h4>
                          {msg.structuredData.riskLevel && (
                            <RiskBadge level={msg.structuredData.riskLevel} size="sm" />
                          )}
                        </div>

                        {/* Metric Tiles */}
                        {msg.structuredData.metrics && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {msg.structuredData.metrics.map((m, idx) => (
                              <div key={idx} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{m.label}</span>
                                <span className="font-mono-num font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Drivers */}
                        {msg.structuredData.drivers && (
                          <div className="space-y-1 text-xs">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Top SHAP Variance Drivers:</span>
                            {msg.structuredData.drivers.map((d, idx) => (
                              <div key={idx} className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="text-slate-700 dark:text-slate-300">{d.factor}</span>
                                <span className="font-mono-num font-bold text-red-600 dark:text-red-400">{d.impact}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action link */}
                        {msg.referencedProjectId && (
                          <button
                            onClick={() => onSelectProjectById(msg.referencedProjectId!)}
                            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors mt-2 shadow-2xs"
                          >
                            <span>Open Detailed Dossier for {msg.referencedProjectId}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Ranking view */}
                    {msg.structuredData.type === 'ranking' && msg.structuredData.metrics && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{msg.structuredData.title}</h4>
                        <div className="space-y-1.5">
                          {msg.structuredData.metrics.map((item, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                                {item.change && (
                                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{item.change}</span>
                                )}
                              </div>
                              <span className="font-mono-num font-bold text-red-600 dark:text-red-400 text-xs">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comparison view */}
                    {msg.structuredData.type === 'comparison' && msg.structuredData.comparisonRows && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{msg.structuredData.title}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[11px] text-left">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                <th className="py-1">Metric</th>
                                <th className="py-1 text-blue-600 dark:text-blue-400 font-bold">Maharashtra</th>
                                <th className="py-1 text-amber-700 dark:text-amber-400 font-bold">Karnataka</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-750">
                              {msg.structuredData.comparisonRows.map((row, idx) => (
                                <tr key={idx}>
                                  <td className="py-1 text-slate-700 dark:text-slate-300 font-medium">{row.label}</td>
                                  <td className="py-1 font-mono-num text-slate-900 dark:text-white">{row.itemA}</td>
                                  <td className="py-1 font-mono-num text-slate-900 dark:text-white">{row.itemB}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Recommended actions list */}
                    {msg.structuredData.recommendedActions && (
                      <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                        <span className="font-bold text-blue-900 dark:text-blue-300 block">AI Recommended Next Steps:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                          {msg.structuredData.recommendedActions.map((act, idx) => (
                            <li key={idx}>{act}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 shadow-2xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
              <span>Analyzing MoSPI dataset & generating explainable attribution...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about project risks, root causes, state comparisons, delayed highway corridors..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
