import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Linkedin, Mail, Award, Briefcase, GraduationCap, Target } from 'lucide-react';


export default function ISSTeamPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const teamMembers = [
    {
      name: 'Thomas Flake',
      role: 'Co-Founder & CEO',
      bio: 'Thomas Flake is a seasoned entrepreneur and U.S. Navy veteran with deep expertise in engineering, operations, and innovation. He has raised over $75 million in funding across telecom and blockchain ventures, including designing and operating a cutting-edge cryptocurrency data center. His past roles include founding Picus (a CLEC), leading the Peninsula Technology Incubator, and serving as Lean Six Sigma Master Black Belt for Naval Special Warfare. With an MBA from William & Mary and multiple industry certifications, Thomas drives the vision and execution behind ISS\'s AI-powered infrastructure.',
      highlights: [
        'Raised over $75M in funding',
        'U.S. Navy Veteran',
        'Lean Six Sigma Master Black Belt',
        'MBA from William & Mary'
      ],
      color: '#00ff9d'
    },
    {
      name: 'Charles Clement',
      role: 'Co-Founder & COO',
      bio: 'Charles Clement is an operations leader with 10+ years of experience in general construction and commercial solar deployment. As COO of Southeast Energy Solutions, he manages implementation, logistics, and team coordination across all field operations. Known for his executional discipline and leadership in scaling field teams, Charles ensures projects are delivered on time and at quality across all phases of ISS\'s infrastructure development.',
      highlights: [
        '10+ years in construction',
        'Commercial solar expert',
        'COO of Southeast Energy Solutions',
        'Field operations specialist'
      ],
      color: '#00b8ff'
    },
    {
      name: 'Skip Smith',
      role: 'Chief Engineer',
      bio: 'Skip Smith is a Certified Energy Manager and nationally recognized expert in waste-to-energy systems, with over 500 MW of reclaimed heat and gas-to-power projects delivered. Since founding his consultancy in 1996, he has specialized in rapid ROI energy conversion systems, landfill gas, digester gas, and electrochemical purification of process gases. His deep technical knowledge and hands-on experience make him central to ISS\'s hybrid solar and gas-powered architecture.',
      highlights: [
        'Certified Energy Manager',
        '500+ MW projects delivered',
        'Waste-to-energy expert',
        'Founded consultancy in 1996'
      ],
      color: '#00ff9d'
    },
    {
      name: 'Brant Jones',
      role: 'Co-Founder & Treasurer',
      bio: 'Brant Jones is the Co-Founder and people-first leader behind the company\'s mission. With a Master\'s in Social Work and years of solar experience, Brant brings a unique ability to fuse technical excellence with genuine customer care. His focus on integrity, trust, and service-driven growth shapes the cultural and operational foundation of the organization as it scales into the commercial and infrastructure space.',
      highlights: [
        'Master\'s in Social Work',
        'People-first leadership',
        'Solar industry veteran',
        'Culture & integrity champion'
      ],
      color: '#00b8ff'
    },
    {
      name: 'Nip Lunga',
      role: 'Chief Strategy & Market Development Officer',
      bio: 'Nip Lunga brings over 20 years of experience in telecom and energy strategy. He founded Rural Wireless Internet to expand broadband access to underserved communities and later advised industrial clients on energy procurement at InSource Power. His long-standing partnership with Skip Smith has produced multiple successful generation projects. At ISS, Nip leads market positioning, utility engagement, and regulatory alignment across energy and data infrastructure.',
      highlights: [
        '20+ years in telecom & energy',
        'Founded Rural Wireless Internet',
        'Energy procurement advisor',
        'Market strategy leader'
      ],
      color: '#00ff9d'
    },
    {
      name: 'Roberto Saad',
      role: 'Founder, SolaraWise Solutions | Chief Business Development Officer',
      bio: 'Roberto Saad is a solar development strategist and founder of SolaraWise Solutions, specializing in high-performance client acquisition. With an Industrial Engineering degree from the Latin University of Panama, he brings systems-level thinking to sales, outreach, and investor alignment. Roberto leads the end-to-end development process—sourcing investment, qualifying opportunities, negotiating PPAs, and overseeing CRM and performance systems—ensuring scalable, bankable project delivery across residential and commercial sectors.',
      highlights: [
        'Founder of SolaraWise Solutions',
        'Industrial Engineering degree',
        'PPA negotiation expert',
        'End-to-end development leader'
      ],
      color: '#00b8ff'
    }
  ];

  return (
    <div style={{backgroundColor: '#0a0e1a', color: '#e8eaf0', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s',
        backgroundColor: scrolled ? 'rgba(10, 14, 26, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 255, 157, 0.1)' : 'none'
      }}>
        <div style={{maxWidth: 1280, margin: '0 auto', padding: '16px 24px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {/* Logo */}
            <div style={{display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer'}}>
              <div style={{position: 'relative'}}>
                <div style={{
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  border: '2px solid #00ff9d', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)'
                }}>
                  <div style={{width: 24, height: 24, borderRadius: '50%', border: '2px solid #00b8ff'}}>
                    <div style={{width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', margin: 4}}></div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{fontSize: 20, fontWeight: 'bold'}}>ISS MINING</div>
                <div style={{fontSize: 10, color: '#9ca3af', letterSpacing: 1.5}}>AI DATA CENTER</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div style={{display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 32}}>
              {['home', 'capabilities', 'team', 'contact'].map((item) => (
                <a 
                  key={item}
                  href={item === 'home' ? '/' : `#${item}`} 
                  style={{
                    color: hoveredLink === item ? '#00ff9d' : '#e8eaf0', 
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    position: 'relative',
                    textTransform: 'capitalize',
                    fontWeight: 500
                  }}
                  onMouseEnter={() => setHoveredLink(item)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item}
                  <div style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: hoveredLink === item ? '100%' : '0%',
                    height: 2,
                    background: 'linear-gradient(90deg, #00ff9d, #00b8ff)',
                    transition: 'width 0.3s ease'
                  }}></div>
                </a>
              ))}
              <button 
                style={{
                  padding: '8px 24px', 
                  background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', 
                  color: '#0a0e1a', 
                  fontWeight: 600, 
                  borderRadius: 8, 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  transform: hoveredLink === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hoveredLink === 'contact' ? '0 8px 20px rgba(0, 255, 157, 0.4)' : '0 0 0 rgba(0, 255, 157, 0)'
                }}
                onMouseEnter={() => setHoveredLink('contact')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              style={{
                display: isMobile ? 'block' : 'none',
                background: 'transparent',
                border: 'none',
                color: '#00ff9d',
                cursor: 'pointer',
                padding: 8,
                transition: 'all 0.3s',
                transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && isMobile && (
            <div style={{
              paddingTop: 16,
              paddingBottom: 24,
              borderTop: '1px solid #1a2332',
              marginTop: 16,
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                {['home', 'capabilities', 'team', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={item === 'home' ? '/' : `#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: '#e8eaf0',
                      textDecoration: 'none',
                      textTransform: 'capitalize',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: hoveredLink === item ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
                      transition: 'all 0.3s',
                      fontWeight: 500
                    }}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {item}
                  </a>
                ))}
                <button style={{
                  padding: '12px 24px', 
                  background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', 
                  color: '#0a0e1a', 
                  fontWeight: 600, 
                  borderRadius: 8, 
                  border: 'none', 
                  cursor: 'pointer',
                  marginTop: 8
                }}>
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 120, paddingBottom: 80}}>
        {/* Animated Background */}
        <div style={{position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none'}}>
          <div style={{position: 'absolute', top: 80, left: 40, width: 384, height: 384, background: 'rgba(0, 255, 157, 0.2)', borderRadius: '50%', filter: 'blur(80px)'}}></div>
          <div style={{position: 'absolute', bottom: 80, right: 40, width: 384, height: 384, background: 'rgba(0, 184, 255, 0.2)', borderRadius: '50%', filter: 'blur(80px)'}}></div>
        </div>

        <div style={{maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10}}>
          <div style={{textAlign: 'center', maxWidth: 896, margin: '0 auto'}}>
            <div style={{display: 'inline-block', padding: '8px 16px', background: '#1a2332', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: 24, fontSize: 14, marginBottom: 24}}>
              <span style={{color: '#00ff9d'}}>●</span> Leadership & Expertise
            </div>
            
            <h1 style={{fontSize: 56, fontWeight: 700, marginBottom: 24, lineHeight: 1.2}}>
              Meet the Team Behind
              <span style={{display: 'block', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                ISS Mining
              </span>
            </h1>
            
            <p style={{fontSize: 20, color: '#9ca3af', marginBottom: 32, lineHeight: 1.6}}>
              A diverse team of visionaries, engineers, and operators bringing decades of combined 
              experience in energy, infrastructure, and technology innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section style={{padding: '96px 0', background: 'linear-gradient(to bottom, transparent, rgba(26, 35, 50, 0.2))'}}>
        <div style={{maxWidth: 1280, margin: '0 auto', padding: '0 24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32}}>
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                style={{
                  background: hoveredMember === index ? 'rgba(26, 35, 50, 0.8)' : 'rgba(26, 35, 50, 0.5)',
                  border: `1px solid ${hoveredMember === index ? member.color : 'rgba(0, 255, 157, 0.1)'}`,
                  borderRadius: 16,
                  padding: 32,
                  transition: 'all 0.3s',
                  transform: hoveredMember === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredMember === index ? `0 12px 40px ${member.color}20` : 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Profile Image Placeholder */}
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.color}20, rgba(26, 35, 50, 0.8))`,
                  border: `3px solid ${member.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  fontSize: 48,
                  fontWeight: 700,
                  color: member.color
                }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 style={{fontSize: 24, fontWeight: 700, marginBottom: 8}}>{member.name}</h3>
                <div style={{
                  fontSize: 14,
                  color: member.color,
                  marginBottom: 16,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5
                }}>
                  {member.role}
                </div>

                <p style={{color: '#9ca3af', lineHeight: 1.6, marginBottom: 24, fontSize: 15}}>
                  {member.bio}
                </p>

                {/* Highlights */}
                <div style={{
                  background: 'rgba(10, 14, 26, 0.5)',
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 20
                }}>
                  <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1}}>
                    Key Highlights
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    {member.highlights.map((highlight, idx) => (
                      <div key={idx} style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14}}>
                        <div style={{width: 6, height: 6, borderRadius: '50%', background: member.color}}></div>
                        <span style={{color: '#e8eaf0'}}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Icons */}
                <div style={{display: 'flex', gap: 12}}>
                  <button style={{
                    padding: '8px 12px',
                    background: 'rgba(0, 255, 157, 0.1)',
                    border: '1px solid rgba(0, 255, 157, 0.2)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#00ff9d',
                    fontSize: 14
                  }}>
                    <Mail size={16} />
                    Email
                  </button>
                  <button style={{
                    padding: '8px 12px',
                    background: 'rgba(0, 184, 255, 0.1)',
                    border: '1px solid rgba(0, 184, 255, 0.2)',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#00b8ff',
                    fontSize: 14
                  }}>
                    <Linkedin size={16} />
                    LinkedIn
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{padding: '96px 0'}}>
        <div style={{maxWidth: 1280, margin: '0 auto', padding: '0 24px'}}>
          <div style={{textAlign: 'center', marginBottom: 64}}>
            <h2 style={{fontSize: 48, fontWeight: 700, marginBottom: 16}}>
              Our <span style={{color: '#00ff9d'}}>Core Values</span>
            </h2>
            <p style={{fontSize: 20, color: '#9ca3af', maxWidth: 768, margin: '0 auto'}}>
              The principles that guide our team and shape our approach to innovation
            </p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24}}>
            {[
              { icon: <Award size={32} />, title: 'Excellence', desc: 'Commitment to the highest standards in everything we build and operate' },
              { icon: <Target size={32} />, title: 'Innovation', desc: 'Pushing boundaries in sustainable AI infrastructure and energy solutions' },
              { icon: <Briefcase size={32} />, title: 'Integrity', desc: 'Transparent, honest partnerships built on trust and accountability' },
              { icon: <GraduationCap size={32} />, title: 'Expertise', desc: 'Deep technical knowledge across energy, operations, and infrastructure' }
            ].map((value, index) => (
              <div key={index} style={{
                background: 'rgba(26, 35, 50, 0.5)',
                border: '1px solid rgba(0, 255, 157, 0.1)',
                borderRadius: 12,
                padding: 24,
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <div style={{color: '#00ff9d', marginBottom: 16, display: 'flex', justifyContent: 'center'}}>
                  {value.icon}
                </div>
                <h4 style={{fontSize: 20, fontWeight: 700, marginBottom: 12}}>{value.title}</h4>
                <p style={{color: '#9ca3af', fontSize: 14}}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: '96px 0', background: 'linear-gradient(to bottom, rgba(26, 35, 50, 0.2), transparent)'}}>
        <div style={{maxWidth: 896, margin: '0 auto', padding: '0 24px', textAlign: 'center'}}>
          <h2 style={{fontSize: 48, fontWeight: 700, marginBottom: 24}}>
            Join Us in Building the
            <span style={{display: 'block', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Future of AI Infrastructure
            </span>
          </h2>
          <p style={{fontSize: 20, color: '#9ca3af', marginBottom: 40}}>
            Partner with a team that combines decades of expertise with a commitment to sustainability
          </p>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
            <button style={{padding: '16px 40px', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', color: '#0a0e1a', fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 18}}>
              Schedule a Meeting
            </button>
            <button style={{padding: '16px 40px', border: '1px solid #00ff9d', background: 'transparent', color: '#00ff9d', fontWeight: 600, borderRadius: 8, cursor: 'pointer', fontSize: 18}}>
              View Careers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop: '1px solid #1a2332', padding: '48px 0'}}>
        <div style={{maxWidth: 1280, margin: '0 auto', padding: '0 24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32}}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
                <div style={{width: 32, height: 32, borderRadius: '50%', border: '2px solid #00ff9d', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)'}}></div>
                </div>
                <span style={{fontWeight: 700}}>ISS MINING</span>
              </div>
              <p style={{fontSize: 14, color: '#9ca3af'}}>
                Sustainable AI infrastructure in the heart of Texas
              </p>
            </div>
            
            <div>
              <h4 style={{fontWeight: 600, marginBottom: 16}}>Company</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#9ca3af'}}>
                <li><span style={{cursor: 'pointer'}}>About Us</span></li>
                <li><span style={{cursor: 'pointer'}}>Careers</span></li>
                <li><span style={{cursor: 'pointer'}}>News</span></li>
                <li><span style={{cursor: 'pointer'}}>Contact</span></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{fontWeight: 600, marginBottom: 16}}>Services</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#9ca3af'}}>
                <li><span style={{cursor: 'pointer'}}>AI Hosting</span></li>
                <li><span style={{cursor: 'pointer'}}>GPU Infrastructure</span></li>
                <li><span style={{cursor: 'pointer'}}>White Glove Support</span></li>
                <li><span style={{cursor: 'pointer'}}>Custom Solutions</span></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{fontWeight: 600, marginBottom: 16}}>Location</h4>
              <p style={{fontSize: 14, color: '#9ca3af', marginBottom: 8}}>
                Catarina, Dimmit County<br />
                Texas, USA
              </p>
              <p style={{fontSize: 14, color: '#9ca3af'}}>
                <a href="mailto:info@issmining.com" style={{color: '#9ca3af', textDecoration: 'none'}}>
                  info@issmining.com
                </a>
              </p>
            </div>
          </div>
          
          <div style={{borderTop: '1px solid #1a2332', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16}}>
            <p style={{fontSize: 14, color: '#9ca3af'}}>
              © 2025 ISS Mining AI Data Center. All rights reserved.
            </p>
            <div style={{display: 'flex', gap: 24, fontSize: 14, color: '#9ca3af'}}>
              <span style={{cursor: 'pointer'}}>Privacy Policy</span>
              <span style={{cursor: 'pointer'}}>Terms of Service</span>
              <span style={{cursor: 'pointer'}}>Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}