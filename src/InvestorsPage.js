import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Target, CheckCircle, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function InvestorsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeStage, setActiveStage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fundingStages = [
    {
      stage: 'Stage 1',
      title: 'Pre-Development/Seed',
      period: 'Sep - Nov 2025',
      amount: '$20-50M',
      dilution: '5-10%',
      color: '#00ff9d',
      status: 'Active',
      details: {
        goal: 'Fund planning, site acquisition, engineering, permits, and initial design',
        sources: [
          'Bootstrap/F&F/Angels: $5-10M',
          'Early Equity (Seed): $15-40M',
          'Non-Dilutive: TX Broadband ($5-10M), DOE grants ($1-5M)'
        ],
        structure: 'Convertible notes/SAFEs at $50-100M valuation cap',
        milestones: [
          'Land secured',
          'Designs complete',
          'Permitting applications complete',
          'ERCOT interconnect submitted',
          'Pipeline penetrations submitted'
        ]
      }
    },
    {
      stage: 'Stage 2',
      title: 'Early Construction (Series A)',
      period: 'Q4 2025 - Q4 2026',
      amount: '$700-900M',
      dilution: '20-30%',
      color: '#00d4ff',
      status: 'Upcoming',
      details: {
        goal: 'Fund Year 1 capex (~$873M), initial solar/CHP buildout to 103 MW solar/241 MW CHP',
        sources: [
          'Series A Equity: $500-600M from VCs/strategics',
          'Strategic Partners: $100-200M from hyperscalers',
          'ITC Solar Credits: ~$31M savings',
          'Bridge Debt: $100-200M (5-7% interest)'
        ],
        structure: 'Preferred equity at $400-600M valuation',
        milestones: [
          'Phase 5 complete',
          'Initial revenue: $111M Year 1',
          '85% utilization in early pods',
          'EBITDA: $65M'
        ]
      }
    },
    {
      stage: 'Stage 3',
      title: 'Scale-Up (Series B)',
      period: 'Q1 - Q4 2027',
      amount: '$200-400M',
      dilution: '10-15%',
      color: '#00b8ff',
      status: 'Planned',
      details: {
        goal: 'Fund Year 2 capex (~$339M), expand to 206 MW solar/362 MW CHP',
        sources: [
          'Series B Equity: $100-200M from growth VCs/PE',
          'Strategic/Corporate: $50-100M from energy partners',
          'ERCOT Incentives: $20-50M',
          'Project Finance Debt: $100-200M (4-6% interest)'
        ],
        structure: 'Equity at $1-1.5B valuation',
        milestones: [
          'Full CHP: 362 MW',
          'Revenue scaling to $678M',
          'Positive cash flow: $309M ops inflow',
          'All 14 pods operational'
        ]
      }
    },
    {
      stage: 'Stage 4',
      title: 'Full Operations',
      period: 'Q1 2028+',
      amount: '$100-200M',
      dilution: '0%',
      color: '#0095ff',
      status: 'Future',
      details: {
        goal: 'Final Year 3 capex (~$94M) for 284 MW solar, refinancing and optimization',
        sources: [
          'Long-term Debt: $100-200M (3-5% interest)',
          'REC Sales: $1.1M-$369M annually',
          'Minimal Equity for add-ons'
        ],
        structure: 'Debt-only refinancing',
        milestones: [
          'Full capacity: 284 MW solar',
          'Net income: $288M-$656M/year',
          'Prepare for $4B+ exit',
          'Steady-state operations'
        ]
      }
    }
  ];

  const keyMetrics = [
    { label: 'Total Investment', value: '$1.306B', icon: <DollarSign /> },
    { label: 'Target Revenue (Yr 3+)', value: '$732M+', icon: <TrendingUp /> },
    { label: 'Total Dilution', value: '30-50%', icon: <Users /> },
    { label: 'Exit Valuation Target', value: '$4B+', icon: <Target /> }
  ];

  const investmentHighlights = [
    {
      icon: <Zap style={{width: 24, height: 24}} />,
      title: 'Vertically Integrated',
      description: 'Full control from development through operations ensures efficiency and rapid response'
    },
    {
      icon: <TrendingUp style={{width: 24, height: 24}} />,
      title: 'Strong Economics',
      description: '57%+ EBITDA margins, 4.1 year payback, multiple revenue streams including REC sales'
    },
    {
      icon: <Shield style={{width: 24, height: 24}} />,
      title: 'De-Risked Model',
      description: 'Phased deployment, proven technology, strategic partnerships with hyperscalers'
    }
  ];

  return (
    <div style={{backgroundColor: '#0a0e1a', color: '#e8eaf0', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #1a2332, #0a0e1a)', borderBottom: '1px solid rgba(0, 255, 157, 0.1)', padding: isMobile ? '24px 16px' : '32px 24px'}}>
        <div style={{maxWidth: 1280, margin: '0 auto'}}>
          <a href="/" style={{display: 'inline-flex', alignItems: 'center', gap: 8, color: '#00ff9d', textDecoration: 'none', marginBottom: 24, fontSize: 14}}>
            <ArrowLeft size={20} />
            Back to Home
          </a>
          <h1 style={{fontSize: isMobile ? 36 : 56, fontWeight: 700, marginBottom: 16}}>
            Investment <span style={{color: '#00ff9d'}}>Opportunity</span>
          </h1>
          <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', maxWidth: 800}}>
            Join us in building the future of sustainable AI infrastructure. $1.3B project with clear path to $4B+ exit.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <section style={{padding: isMobile ? '48px 16px' : '64px 24px'}}>
        <div style={{maxWidth: 1280, margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 16 : 24}}>
            {keyMetrics.map((metric, index) => (
              <div key={index} style={{background: 'rgba(26, 35, 50, 0.5)', border: '1px solid rgba(0, 255, 157, 0.1)', borderRadius: 12, padding: isMobile ? 20 : 24, textAlign: 'center'}}>
                <div style={{color: '#00ff9d', marginBottom: 12, display: 'flex', justifyContent: 'center'}}>
                  {React.cloneElement(metric.icon, {size: isMobile ? 24 : 32})}
                </div>
                <div style={{fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#00ff9d', marginBottom: 8, fontFamily: 'monospace'}}>{metric.value}</div>
                <div style={{fontSize: isMobile ? 12 : 14, color: '#9ca3af'}}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Timeline */}
      <section style={{padding: isMobile ? '48px 16px' : '64px 24px', background: 'linear-gradient(to bottom, transparent, rgba(26, 35, 50, 0.2))'}}>
        <div style={{maxWidth: 1280, margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: isMobile ? 48 : 64}}>
            <h2 style={{fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16}}>
              Funding <span style={{color: '#00b8ff'}}>Roadmap</span>
            </h2>
            <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', maxWidth: 768, margin: '0 auto'}}>
              Phased deployment strategy aligned with construction milestones and revenue generation
            </p>
          </div>

          {/* Timeline - Desktop */}
          {!isMobile && (
            <div style={{position: 'relative', marginBottom: 64}}>
              {/* Timeline Line */}
              <div style={{position: 'absolute', top: 40, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #00ff9d, #00d4ff, #00b8ff, #0095ff)', borderRadius: 2}}></div>
              
              {/* Timeline Stages */}
              <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}>
                {fundingStages.map((stage, index) => (
                  <div key={index} style={{flex: 1, textAlign: 'center', position: 'relative'}}>
                    {/* Stage Marker */}
                    <div 
                      style={{
                        width: 80, 
                        height: 80, 
                        margin: '0 auto 16px',
                        background: `linear-gradient(135deg, ${stage.color}, rgba(10, 14, 26, 0.9))`,
                        border: `3px solid ${stage.color}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: activeStage === index ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: activeStage === index ? `0 0 30px ${stage.color}80` : 'none'
                      }}
                      onClick={() => setActiveStage(activeStage === index ? null : index)}
                    >
                      {index + 1}
                    </div>
                    
                    {/* Stage Info */}
                    <div style={{fontSize: 14, fontWeight: 600, marginBottom: 4, color: stage.color}}>{stage.stage}</div>
                    <div style={{fontSize: 16, fontWeight: 700, marginBottom: 8}}>{stage.title}</div>
                    <div style={{fontSize: 14, color: '#9ca3af', marginBottom: 4}}>{stage.period}</div>
                    <div style={{fontSize: 20, fontWeight: 700, color: stage.color, fontFamily: 'monospace'}}>{stage.amount}</div>
                    <div style={{
                      display: 'inline-block',
                      marginTop: 8,
                      padding: '4px 12px',
                      background: stage.status === 'Active' ? 'rgba(0, 255, 157, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                      border: `1px solid ${stage.status === 'Active' ? '#00ff9d' : '#6b7280'}`,
                      borderRadius: 12,
                      fontSize: 12,
                      color: stage.status === 'Active' ? '#00ff9d' : '#9ca3af'
                    }}>
                      {stage.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline - Mobile */}
          {isMobile && (
            <div style={{display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48}}>
              {fundingStages.map((stage, index) => (
                <div key={index} style={{position: 'relative'}}>
                  {/* Connecting Line */}
                  {index < fundingStages.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: 30,
                      top: 60,
                      width: 4,
                      height: 'calc(100% + 24px)',
                      background: `linear-gradient(180deg, ${stage.color}, ${fundingStages[index + 1].color})`,
                      borderRadius: 2
                    }}></div>
                  )}
                  
                  <div style={{display: 'flex', gap: 16, position: 'relative'}}>
                    {/* Stage Marker */}
                    <div 
                      style={{
                        width: 60,
                        height: 60,
                        flexShrink: 0,
                        background: `linear-gradient(135deg, ${stage.color}, rgba(10, 14, 26, 0.9))`,
                        border: `3px solid ${stage.color}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: `0 0 20px ${stage.color}60`
                      }}
                      onClick={() => setActiveStage(activeStage === index ? null : index)}
                    >
                      {index + 1}
                    </div>
                    
                    {/* Stage Info */}
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 12, fontWeight: 600, marginBottom: 4, color: stage.color}}>{stage.stage}</div>
                      <div style={{fontSize: 16, fontWeight: 700, marginBottom: 4}}>{stage.title}</div>
                      <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 4}}>{stage.period}</div>
                      <div style={{fontSize: 18, fontWeight: 700, color: stage.color, fontFamily: 'monospace', marginBottom: 8}}>{stage.amount}</div>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: stage.status === 'Active' ? 'rgba(0, 255, 157, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                        border: `1px solid ${stage.status === 'Active' ? '#00ff9d' : '#6b7280'}`,
                        borderRadius: 12,
                        fontSize: 11,
                        color: stage.status === 'Active' ? '#00ff9d' : '#9ca3af'
                      }}>
                        {stage.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stage Details */}
          {activeStage !== null && (
            <div style={{
              background: 'linear-gradient(135deg, #1a2332, #0a0e1a)',
              border: `2px solid ${fundingStages[activeStage].color}`,
              borderRadius: 16,
              padding: isMobile ? 24 : 32,
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32}}>
                <div>
                  <h3 style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 16, color: fundingStages[activeStage].color}}>
                    {fundingStages[activeStage].title}
                  </h3>
                  <p style={{color: '#9ca3af', marginBottom: 24, fontSize: isMobile ? 14 : 16}}>
                    {fundingStages[activeStage].details.goal}
                  </p>
                  
                  <div style={{marginBottom: 24}}>
                    <h4 style={{fontSize: isMobile ? 14 : 16, fontWeight: 600, marginBottom: 12}}>Funding Sources</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8}}>
                      {fundingStages[activeStage].details.sources.map((source, idx) => (
                        <li key={idx} style={{display: 'flex', alignItems: 'start', gap: 8, fontSize: isMobile ? 13 : 14, color: '#9ca3af'}}>
                          <CheckCircle style={{width: 16, height: 16, color: fundingStages[activeStage].color, flexShrink: 0, marginTop: 2}} />
                          <span>{source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{padding: 16, background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, border: `1px solid ${fundingStages[activeStage].color}40`}}>
                    <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 4}}>Structure</div>
                    <div style={{fontSize: 14, color: '#e8eaf0'}}>{fundingStages[activeStage].details.structure}</div>
                  </div>
                </div>

                <div>
                  <h4 style={{fontSize: isMobile ? 14 : 16, fontWeight: 600, marginBottom: 12}}>Key Milestones</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                    {fundingStages[activeStage].details.milestones.map((milestone, idx) => (
                      <div key={idx} style={{
                        padding: 16,
                        background: 'rgba(10, 14, 26, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                      }}>
                        <CheckCircle style={{width: 20, height: 20, color: fundingStages[activeStage].color, flexShrink: 0}} />
                        <span style={{fontSize: isMobile ? 13 : 14}}>{milestone}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                    <div style={{padding: 16, background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, textAlign: 'center'}}>
                      <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 4}}>Dilution</div>
                      <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: fundingStages[activeStage].color}}>{fundingStages[activeStage].dilution}</div>
                    </div>
                    <div style={{padding: 16, background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, textAlign: 'center'}}>
                      <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 4}}>Timeline</div>
                      <div style={{fontSize: isMobile ? 12 : 14, fontWeight: 600, color: '#e8eaf0'}}>{fundingStages[activeStage].period}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Investment Highlights */}
      <section style={{padding: isMobile ? '48px 16px' : '64px 24px'}}>
        <div style={{maxWidth: 1280, margin: '0 auto'}}>
          <h2 style={{fontSize: isMobile ? 28 : 36, fontWeight: 700, marginBottom: isMobile ? 32 : 48, textAlign: 'center'}}>
            Why Invest in <span style={{color: '#00ff9d'}}>ISS Mining</span>
          </h2>
          
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32, marginBottom: 48}}>
            {investmentHighlights.map((highlight, index) => (
              <div key={index} style={{
                background: 'rgba(26, 35, 50, 0.5)',
                border: '1px solid rgba(0, 255, 157, 0.1)',
                borderRadius: 16,
                padding: isMobile ? 24 : 32,
                transition: 'all 0.3s'
              }}>
                <div style={{color: '#00ff9d', marginBottom: 16}}>
                  {highlight.icon}
                </div>
                <h3 style={{fontSize: isMobile ? 18 : 20, fontWeight: 700, marginBottom: 12}}>{highlight.title}</h3>
                <p style={{color: '#9ca3af', fontSize: isMobile ? 14 : 16}}>{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Financial Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #1a2332, #0a0e1a)',
            border: '1px solid rgba(0, 255, 157, 0.2)',
            borderRadius: 16,
            padding: isMobile ? 24 : 32
          }}>
            <h3 style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 24}}>Financial Overview</h3>
            <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24}}>
              <div>
                <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 8}}>Total CapEx</div>
                <div style={{fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#00ff9d', fontFamily: 'monospace'}}>$1.306B</div>
                <div style={{fontSize: 13, color: '#9ca3af', marginTop: 8}}>
                  Year 1: $873M • Year 2: $339M • Year 3: $94M
                </div>
              </div>
              <div>
                <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 8}}>Revenue Trajectory</div>
                <div style={{fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#00b8ff', fontFamily: 'monospace'}}>$732M+</div>
                <div style={{fontSize: 13, color: '#9ca3af', marginTop: 8}}>
                  Year 1: $111M • Year 2: $678M • Year 3+: $732M
                </div>
              </div>
              <div>
                <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 8}}>Exit Target</div>
                <div style={{fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#00ff9d', fontFamily: 'monospace'}}>$4B+</div>
                <div style={{fontSize: 13, color: '#9ca3af', marginTop: 8}}>
                  Net Income: $288M-$656M/year by 2028
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '64px 16px' : '96px 24px',
        background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 184, 255, 0.1))',
        borderTop: '1px solid rgba(0, 255, 157, 0.2)',
        borderBottom: '1px solid rgba(0, 255, 157, 0.2)'
      }}>
        <div style={{maxWidth: 896, margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: isMobile ? 36 : 56, fontWeight: 700, marginBottom: 24}}>
            Partner With <span style={{color: '#00ff9d'}}>the Future</span>
          </h2>
          <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', marginBottom: 40, lineHeight: 1.6}}>
            We're currently raising Stage 1 funding ($20-50M) to complete pre-development activities. 
            Join leading VCs, strategics, and family offices in building sustainable AI infrastructure.
          </p>
          
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32}}>
            <button style={{
              padding: isMobile ? '14px 32px' : '16px 40px',
              background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
              color: '#0a0e1a',
              fontWeight: 600,
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: isMobile ? 16 : 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              Request Investor Deck
              <ArrowRight size={20} />
            </button>
            <button style={{
              padding: isMobile ? '14px 32px' : '16px 40px',
              border: '1px solid #00ff9d',
              background: 'transparent',
              color: '#00ff9d',
              fontWeight: 600,
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: isMobile ? 16 : 18
            }}>
              Schedule Meeting
            </button>
          </div>

          <div style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'rgba(10, 14, 26, 0.5)',
            border: '1px solid rgba(0, 255, 157, 0.2)',
            borderRadius: 12,
            fontSize: 14,
            color: '#9ca3af'
          }}>
            <span style={{color: '#00ff9d', marginRight: 8}}>●</span>
            Stage 1 Active: Sep - Nov 2025
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section style={{padding: isMobile ? '48px 16px' : '64px 24px', textAlign: 'center'}}>
        <div style={{maxWidth: 768, margin: '0 auto'}}>
          <h3 style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 16}}>Get in Touch</h3>
          <p style={{color: '#9ca3af', marginBottom: 24, fontSize: isMobile ? 14 : 16}}>
            For investment inquiries, partnership opportunities, or more information about ISS Mining
          </p>
          <a href="mailto:investors@issmining.com" style={{
            color: '#00ff9d',
            textDecoration: 'none',
            fontSize: isMobile ? 18 : 20,
            fontWeight: 600
          }}>
            investors@issmining.com
          </a>
        </div>
      </section>
    </div>
  );
}