import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Zap, Server, Leaf, Shield, TrendingUp, Users, MapPin, Check } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamPage from './TeamPage';
import InvestorsPage from './InvestorsPage';

// Number Counter Hook
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    let startTime = null;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, start, hasAnimated]);

  return count;
};

// Neural Network Background Component
const NeuralNetworkBackground = React.memo(() => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Scale existing nodes instead of reinitializing
      if (nodes.length > 0 && oldWidth > 0 && oldHeight > 0) {
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;
        nodes.forEach(node => {
          node.x *= scaleX;
          node.y *= scaleY;
        });
      } else {
        initNodes();
      }
    };
    
    // Initialize nodes
    const initNodes = () => {
      const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000));
      nodes = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
         radius: Math.random() * 3 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Update pulse
        node.pulsePhase += node.pulseSpeed;
        const pulseScale = 0.5 + Math.sin(node.pulsePhase) * 0.5;
        
        // Draw node with gradient
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        gradient.addColorStop(0, `rgba(0, 255, 157, ${0.8 * pulseScale})`);
        gradient.addColorStop(0.5, `rgba(0, 184, 255, ${0.4 * pulseScale})`);
        gradient.addColorStop(1, 'rgba(0, 255, 157, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${0.9 * pulseScale})`;
        ctx.fill();
      });
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            
            // Gradient line
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(0, 255, 157, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 184, 255, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(0, 255, 157, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Animated pulse along the line
            const pulseProgress = (Date.now() / 2000 + i + j) % 1;
            const pulseX = nodes[i].x + (nodes[j].x - nodes[i].x) * pulseProgress;
            const pulseY = nodes[i].y + (nodes[j].y - nodes[i].y) * pulseProgress;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 157, ${opacity * 2})`;
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4,
        pointerEvents: 'none'
      }}
    />
  );
});

export default function ISSMiningWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [capabilitiesVisible, setCapabilitiesVisible] = useState(false);
  const capabilitiesRef = useRef(null);
  const [infrastructureVisible, setInfrastructureVisible] = useState(false);
  const infrastructureRef = useRef(null);
  const [servicesVisible, setServicesVisible] = useState(false);
const servicesRef = useRef(null);

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

   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !capabilitiesVisible) {
            setCapabilitiesVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (capabilitiesRef.current) {
      observer.observe(capabilitiesRef.current);
    }

    return () => {
      if (capabilitiesRef.current) {
        observer.unobserve(capabilitiesRef.current);
      }
    };
  }, [capabilitiesVisible]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !infrastructureVisible) {
          setInfrastructureVisible(true);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (infrastructureRef.current) {
    observer.observe(infrastructureRef.current);
  }

  return () => {
    if (infrastructureRef.current) {
      observer.unobserve(infrastructureRef.current);
    }
  };
}, [infrastructureVisible]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !servicesVisible) {
          setServicesVisible(true);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (servicesRef.current) {
    observer.observe(servicesRef.current);
  }

  return () => {
    if (servicesRef.current) {
      observer.unobserve(servicesRef.current);
    }
  };
}, [servicesVisible]);

  const stats = [
    { value: '200 MW', label: 'Now Pre-Leasing' },
    { value: '92,400', label: 'NVIDIA GPUs' },
    { value: '646 MW', label: 'Total Power Generation' },
    { value: '14', label: 'Modular Pods' }
  ];

  const capabilities = [
    {
      icon: <Zap style={{width: 32, height: 32}} />,
      title: 'Hybrid Power System',
      description: '362 MW CHP + 284 MW solar with integrated thermal cooling',
      metrics: ['99.99% uptime', 'Grid-independent', 'Cost optimized']
    },
    {
      icon: <Server style={{width: 32, height: 32}} />,
      title: 'GPU Infrastructure',
      description: 'NVIDIA H100 optimized pods with liquid cooling',
      metrics: ['20-140 kW/rack', '100 Gbps connectivity', 'White glove service']
    },
    {
      icon: <Leaf style={{width: 32, height: 32}} />,
      title: 'Sustainability First',
      description: 'Flare gas capture reducing Eagle Ford emissions by 6.8%',
      metrics: ['12.44 Bcf/year offset', '$20M 45Q credits', '75-80% efficiency']
    }
  ];

 const services = [
    {
      title: 'AI Hosting',
      price: 'Custom Pricing',
      features: [
        'Dedicated GPU infrastructure',
        'NVIDIA H100 clusters',
        'Hybrid liquid + air cooling',
        '99.999% uptime guarantee',
        'Flexible scaling'
      ]
    },
    {
      title: 'Power & Connectivity',
      price: 'Bundled Solution',
      features: [
        'Competitive power rates',
        '100 Gbps per pod',
        'Tier 1 redundant fiber',
        'Low-latency routing',
        'ERCOT grid backup'
      ]
    },
    {
      title: 'White Glove Support',
      price: 'Premium Tier',
      features: [
        '24/7/365 monitoring',
        'Dedicated engineers',
        'Rapid deployment',
        'Custom configurations',
        'Performance optimization'
      ]
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{backgroundColor: '#0a0e1a', color: '#e8eaf0', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
            <style>
  {`
     @keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
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
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
    
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 10px rgba(0, 255, 157, 0.3), 0 0 20px rgba(0, 255, 157, 0.2);
      }
      50% {
        box-shadow: 0 0 20px rgba(0, 255, 157, 0.5), 0 0 30px rgba(0, 255, 157, 0.3), 0 0 40px rgba(0, 184, 255, 0.2);
      }
    }
    
    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    .fade-in-up-1 {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }
    
    .fade-in-up-2 {
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .fade-in-up-3 {
      animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    .fade-in-up-4 {
      animation: fadeInUp 0.8s ease-out 0.8s both;
    }
    
    .gradient-text {
      background: linear-gradient(135deg, #00ff9d, #00b8ff, #00ff9d, #00b8ff);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 3s ease infinite;
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
                    {['capabilities', 'infrastructure', 'services', 'about'].map((item) => (
                      <a 
                        key={item}
                        href={`#${item}`} 
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
                    <a 
                      href="/TeamPage" 
                      style={{
                        color: hoveredLink === 'team' ? '#00ff9d' : '#e8eaf0', 
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        position: 'relative',
                        textTransform: 'capitalize',
                        fontWeight: 500
                      }}
                      onMouseEnter={() => setHoveredLink('team')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Team
                      <div style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: hoveredLink === 'team' ? '100%' : '0%',
                        height: 2,
                        background: 'linear-gradient(90deg, #00ff9d, #00b8ff)',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </a>
                    <a 
                      href="/investors" 
                      style={{
                        color: hoveredLink === 'investors' ? '#00ff9d' : '#e8eaf0', 
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        position: 'relative',
                        textTransform: 'capitalize',
                        fontWeight: 500
                      }}
                      onMouseEnter={() => setHoveredLink('investors')}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      Investors
                      <div style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: hoveredLink === 'investors' ? '100%' : '0%',
                        height: 2,
                        background: 'linear-gradient(90deg, #00ff9d, #00b8ff)',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </a>
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
                    animation: 'slideDown 0.3s ease',
                    backgroundColor: 'rgba(10, 14, 26, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '0 0 12px 12px',
                    marginLeft: -24,
                    marginRight: -24,
                    paddingLeft: 24,
                    paddingRight: 24
                  }}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                      {['capabilities', 'infrastructure', 'services', 'about'].map((item) => (
                        <a 
                          key={item}
                          href={`#${item}`}
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
                      <a 
                        href="/TeamPage"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          color: '#e8eaf0',
                          textDecoration: 'none',
                          textTransform: 'capitalize',
                          padding: '12px 16px',
                          borderRadius: 8,
                          background: hoveredLink === 'team' ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
                          transition: 'all 0.3s',
                          fontWeight: 500
                        }}
                        onMouseEnter={() => setHoveredLink('team')}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        Team
                      </a>
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
<section style={{position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 80}}>
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/world.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.52,
    filter: 'grayscale(100%) brightness(0.6)',
    zIndex: 1,
    pointerEvents: 'none'
  }}></div>
  
  {/* Gradient Overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, rgba(0, 255, 157, 0.03) 0%, rgba(10, 14, 26, 0.7) 50%, rgba(10, 14, 26, 0.95) 100%)',
    zIndex: 2,
    pointerEvents: 'none'
  }}></div>

  {/* Neural Network Background */}
  <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3, pointerEvents: 'none'}}>
    <NeuralNetworkBackground />
  </div>

  <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px', position: 'relative', zIndex: 10}}>
    <div style={{textAlign: 'center', maxWidth: 896, margin: '0 auto'}}>
      <div className="fade-in-up-1" style={{
        display: 'inline-block', 
        padding: '8px 16px', 
        background: '#1a2332', 
        border: '1px solid rgba(0, 255, 157, 0.2)', 
        borderRadius: 24, 
        fontSize: isMobile ? 12 : 14, 
        marginBottom: 24,
        animation: 'pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite'
      }}>
        <span style={{color: '#00ff9d'}}>●</span> Vertically Integrated Developer & Operator
      </div>
      
      <h1 className="fade-in-up-2" style={{fontSize: isMobile ? 32 : 56, fontWeight: 700, marginBottom: 24, lineHeight: 1.2}}>
        Powering the Future of
        <span className="gradient-text" style={{display: 'block'}}>
          Artificial Intelligence
        </span>
      </h1>
      
      <p className="fade-in-up-3" style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', marginBottom: 32, lineHeight: 1.6}}>
        Launching with 200 MW of sustainable AI infrastructure in Texas — the first of multiple world-class colocation campuses built for hyperscalers, enterprises, and AI innovators who demand reliability, performance, and sustainability at scale.
      </p>

      <div className="fade-in-up-4" style={{display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        <button style={{padding: isMobile ? '12px 24px' : '16px 32px', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', color: '#0a0e1a', fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 14 : 16}}>
          Learn More
          <ChevronRight style={{width: 20, height: 20}} />
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(150px, 1fr))', gap: isMobile ? 16 : 24, marginTop: isMobile ? 48 : 80}}>
        {stats.map((stat, index) => (
          <div key={index} className={`fade-in-up-${index + 1}`} style={{background: 'rgba(26, 35, 50, 0.5)', backdropFilter: 'blur(4px)', border: '1px solid rgba(0, 255, 157, 0.1)', borderRadius: 12, padding: isMobile ? 16 : 24}}>
            <div style={{fontSize: isMobile ? 24 : 36, fontWeight: 700, color: '#00ff9d', fontFamily: 'monospace'}}>{stat.value}</div>
            <div style={{fontSize: isMobile ? 12 : 14, color: '#9ca3af', marginTop: 8}}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

           {/* Capabilities Section */}
            <section ref={capabilitiesRef} id="capabilities" style={{padding: isMobile ? '64px 0' : '96px 0', background: 'linear-gradient(to bottom, transparent, rgba(26, 35, 50, 0.2))'}}>
              <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px'}}>
                <div className={capabilitiesVisible ? 'fade-in-up-1' : ''} style={{textAlign: 'center', marginBottom: isMobile ? 48 : 64, opacity: capabilitiesVisible ? 1 : 0, transform: capabilitiesVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease-out'}}>
                  <h2 style={{fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16}}>
                    Vertically Integrated <span style={{color: '#00b8ff'}}>Excellence</span>
                  </h2>
                  <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', maxWidth: 768, margin: '0 auto'}}>
                    From development to operations, we control every aspect of your AI infrastructure
                  </p>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? 24 : 32}}>
                  {capabilities.map((capability, index) => (
                    <div 
                      key={index}
                      style={{
                        background: 'rgba(26, 35, 50, 0.5)', 
                        border: '1px solid rgba(0, 255, 157, 0.1)', 
                        borderRadius: 16, 
                        padding: isMobile ? 24 : 32, 
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: capabilitiesVisible ? 1 : 0,
                        transform: capabilitiesVisible ? 'translateY(0)' : 'translateY(50px)',
                        transitionDelay: capabilitiesVisible ? `${0.2 + (index * 0.15)}s` : '0s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.4)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 157, 0.15), 0 0 30px rgba(0, 184, 255, 0.1)';
                        e.currentTarget.style.background = 'rgba(26, 35, 50, 0.8)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = 'rgba(26, 35, 50, 0.5)';
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: -2,
                        left: -2,
                        right: -2,
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, #00ff9d, #00b8ff, transparent)',
                        opacity: 0,
                        transition: 'opacity 0.4s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      ></div>
                      <div style={{
                        color: '#00ff9d', 
                        marginBottom: 16,
                        transition: 'all 0.3s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0, 255, 157, 0.6))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.filter = 'none';
                      }}
                      >
                        {capability.icon}
                      </div>
                      <h3 style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 12}}>{capability.title}</h3>
                      <p style={{color: '#9ca3af', marginBottom: 24, fontSize: isMobile ? 14 : 16}}>{capability.description}</p>
                      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        {capability.metrics.map((metric, idx) => (
                          <div key={idx} style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 8, 
                            fontSize: 14,
                            opacity: capabilitiesVisible ? 1 : 0,
                            transform: capabilitiesVisible ? 'translateX(0)' : 'translateX(-20px)',
                            transition: `all 0.5s ease-out ${0.4 + (index * 0.15) + (idx * 0.1)}s`
                          }}>
                            <Check style={{width: 16, height: 16, color: '#00b8ff', transition: 'transform 0.3s'}} />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Infrastructure Section */}
<section ref={infrastructureRef} id="infrastructure" style={{padding: isMobile ? '64px 0' : '96px 0'}}>
  <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px'}}>
    <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: 48, alignItems: 'center'}}>
      <div style={{
        opacity: infrastructureVisible ? 1 : 0,
        transform: infrastructureVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        <h2 style={{fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 24}}>
          Purpose-Built for
          <span style={{display: 'block', color: '#00ff9d'}}>AI Workloads</span>
        </h2>
        <p style={{fontSize: isMobile ? 16 : 18, color: '#9ca3af', marginBottom: 32}}>
          Our Catarina facility in Dimmit County, Texas combines world-class infrastructure 
          with sustainable energy sources to deliver unmatched performance and reliability.
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          {[
            { Icon: Server, title: '14 Modular Pods', desc: '6,600 NVIDIA H100 GPUs per pod, scalable architecture', color: '#00ff9d' },
            { Icon: Zap, title: 'Hybrid Power System', desc: '362 MW CHP with thermal recovery + 284 MW solar capacity', color: '#00b8ff' },
            { Icon: Leaf, title: 'Flare Gas Capture', desc: '12.44 Bcf/year offset, reducing Permian emissions by 6.8%', color: '#00ff9d' },
            { Icon: MapPin, title: 'Strategic Location', desc: 'Eagle Ford Shale access, dual fiber from San Antonio & Laredo', color: '#00b8ff' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex', 
              gap: 16,
              opacity: infrastructureVisible ? 1 : 0,
              transform: infrastructureVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: `all 0.6s ease-out ${0.3 + (index * 0.15)}s`
            }}>
              <div style={{flexShrink: 0, width: 48, height: 48, background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 184, 255, 0.2))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <item.Icon style={{width: 24, height: 24, color: item.color}} />
              </div>
              <div>
                <h4 style={{fontWeight: 600, marginBottom: 4, fontSize: isMobile ? 14 : 16}}>{item.title}</h4>
                <p style={{color: '#9ca3af', fontSize: isMobile ? 12 : 14}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        opacity: infrastructureVisible ? 1 : 0,
        transform: infrastructureVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease-out 0.4s'
      }}>
        <div style={{background: 'linear-gradient(135deg, #1a2332, #0a0e1a)', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: 16, padding: isMobile ? 24 : 32}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{
              background: 'rgba(10, 14, 26, 0.5)', 
              borderRadius: 8, 
              padding: isMobile ? 16 : 24,
              opacity: infrastructureVisible ? 1 : 0,
              transform: infrastructureVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.6s ease-out 0.6s'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16, flexWrap: 'wrap', gap: 16}}>
                <div>
                  <div style={{fontSize: isMobile ? 12 : 14, color: '#9ca3af', marginBottom: 4}}>IT LOAD CAPACITY</div>
                  <div style={{fontSize: isMobile ? 24 : 32, fontWeight: 700, fontFamily: 'monospace', color: '#00ff9d'}}>200 MW</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: isMobile ? 12 : 14, color: '#9ca3af', marginBottom: 4}}>EFFICIENCY</div>
                  <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#00b8ff'}}>75-80%</div>
                </div>
              </div>
              <div style={{height: 8, background: '#1a2332', borderRadius: 4, overflow: 'hidden'}}>
                <div style={{
                  height: '100%', 
                  width: infrastructureVisible ? '85%' : '0%', 
                  background: 'linear-gradient(90deg, #00ff9d, #00b8ff)',
                  transition: 'width 1.5s ease-out 0.8s'
                }}></div>
              </div>
              <div style={{fontSize: 12, color: '#9ca3af', marginTop: 8}}>85% target utilization</div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              <div style={{
                background: 'rgba(10, 14, 26, 0.5)', 
                borderRadius: 8, 
                padding: 16,
                opacity: infrastructureVisible ? 1 : 0,
                transform: infrastructureVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.8s'
              }}>
                <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 8}}>CHP OUTPUT</div>
                <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, fontFamily: 'monospace', color: '#00ff9d'}}>362 MW</div>
              </div>
              <div style={{
                background: 'rgba(10, 14, 26, 0.5)', 
                borderRadius: 8, 
                padding: 16,
                opacity: infrastructureVisible ? 1 : 0,
                transform: infrastructureVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.9s'
              }}>
                <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 8}}>SOLAR ARRAY</div>
                <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, fontFamily: 'monospace', color: '#00b8ff'}}>284 MW</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(10, 14, 26, 0.5)', 
              borderRadius: 8, 
              padding: 16,
              opacity: infrastructureVisible ? 1 : 0,
              transform: infrastructureVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 1s'
            }}>
              <div style={{fontSize: 12, color: '#9ca3af', marginBottom: 12}}>COOLING SYSTEM</div>
              <div style={{display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap'}}>
                <div style={{flex: 1, minWidth: 120, background: 'rgba(0, 255, 157, 0.2)', borderRadius: 4, padding: '8px 12px', fontSize: 14}}>
                  <div style={{fontWeight: 600}}>75% Liquid</div>
                  <div style={{fontSize: 12, color: '#9ca3af'}}>Direct-to-chip</div>
                </div>
                <div style={{flex: 1, minWidth: 120, background: 'rgba(0, 184, 255, 0.2)', borderRadius: 4, padding: '8px 12px', fontSize: 14}}>
                  <div style={{fontWeight: 600}}>25% Air</div>
                  <div style={{fontSize: 12, color: '#9ca3af'}}>Traditional</div>
                </div>
              </div>
              <div style={{fontSize: 12, color: '#9ca3af'}}>Hybrid approach: 0.3-0.4 kW/ton efficiency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

         {/* Services Section */}
<section ref={servicesRef} id="services" style={{padding: isMobile ? '64px 0' : '96px 0', background: 'linear-gradient(to bottom, transparent, rgba(26, 35, 50, 0.2))'}}>
  <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px'}}>
    <div style={{
      textAlign: 'center', 
      marginBottom: isMobile ? 48 : 64,
      opacity: servicesVisible ? 1 : 0,
      transform: servicesVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out'
    }}>
      <h2 style={{fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 16}}>
        Flexible <span style={{color: '#00ff9d'}}>Service Tiers</span>
      </h2>
      <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', maxWidth: 768, margin: '0 auto'}}>
        From hosting to white-glove management, we provide everything you need to scale your AI operations
      </p>
    </div>

    <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? 24 : 32}}>
      {services.map((service, index) => (
        <div 
          key={index}
          style={{
            background: 'rgba(26, 35, 50, 0.5)', 
            border: '1px solid rgba(0, 184, 255, 0.1)', 
            borderRadius: 16, 
            padding: isMobile ? 24 : 32,
            opacity: servicesVisible ? 1 : 0,
            transform: servicesVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: `opacity 0.8s ease-out ${0.2 + (index * 0.15)}s, transform 0.8s ease-out ${0.2 + (index * 0.15)}s`,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
  e.currentTarget.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
  e.currentTarget.style.borderColor = 'rgba(0, 184, 255, 0.8)';
  e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 184, 255, 0.3), 0 0 40px rgba(0, 255, 157, 0.2)';
  e.currentTarget.style.background = 'rgba(26, 35, 50, 0.95)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  e.currentTarget.style.transform = servicesVisible ? 'translateY(0) scale(1)' : 'translateY(50px)';
  e.currentTarget.style.borderColor = 'rgba(0, 184, 255, 0.1)';
  e.currentTarget.style.boxShadow = 'none';
  e.currentTarget.style.background = 'rgba(26, 35, 50, 0.5)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #00b8ff, #00ff9d, transparent)',
            opacity: 0,
            transition: 'opacity 0.4s'
          }}></div>
          
          <h3 style={{
            fontSize: isMobile ? 20 : 24, 
            fontWeight: 700, 
            marginBottom: 8,
            transition: 'color 0.3s'
          }}>{service.title}</h3>
          
          <div style={{
            fontSize: isMobile ? 24 : 32, 
            fontWeight: 700, 
            color: '#00ff9d', 
            marginBottom: 24, 
            fontFamily: 'monospace',
            opacity: servicesVisible ? 1 : 0,
            transform: servicesVisible ? 'scale(1)' : 'scale(0.9)',
            transition: `all 0.6s ease-out ${0.3 + (index * 0.15)}s`
          }}>{service.price}</div>
          
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12}}>
            {service.features.map((feature, idx) => (
              <li key={idx} style={{
                display: 'flex', 
                alignItems: 'start', 
                gap: 12,
                opacity: servicesVisible ? 1 : 0,
                transform: servicesVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.6s ease-out ${0.4 + (index * 0.15) + (idx * 0.1)}s`
              }}>
                <Check style={{
                  width: 20, 
                  height: 20, 
                  color: '#00b8ff', 
                  flexShrink: 0, 
                  marginTop: 2,
                  transition: 'transform 0.3s'
                }} />
                <span style={{color: '#9ca3af', fontSize: isMobile ? 14 : 16}}>{feature}</span>
              </li>
            ))}
          </ul>
          
          <button style={{
            width: '100%', 
            marginTop: 32, 
            padding: '12px 24px', 
            border: '1px solid #00ff9d', 
            background: 'transparent', 
            color: '#00ff9d', 
            fontWeight: 600, 
            borderRadius: 8, 
            cursor: 'pointer', 
            fontSize: isMobile ? 14 : 16,
            transition: 'all 0.3s',
            opacity: servicesVisible ? 1 : 0,
            transform: servicesVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${0.6 + (index * 0.15)}s`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #00ff9d, #00b8ff)';
            e.currentTarget.style.color = '#0a0e1a';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 255, 157, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00ff9d';
            e.currentTarget.style.borderColor = '#00ff9d';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Learn More
          </button>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: 48, 
      background: 'linear-gradient(90deg, rgba(0, 255, 157, 0.1), rgba(0, 184, 255, 0.1))', 
      border: '1px solid rgba(0, 255, 157, 0.2)', 
      borderRadius: 16, 
      padding: isMobile ? 24 : 32, 
      textAlign: 'center',
      opacity: servicesVisible ? 1 : 0,
      transform: servicesVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.8s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        animation: servicesVisible ? 'shimmer 2s ease-in-out 1s' : 'none'
      }}></div>
      
      <h3 style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, marginBottom: 12}}>Sustainability Premium Available</h3>
      <p style={{color: '#9ca3af', marginBottom: 24, fontSize: isMobile ? 14 : 16}}>
        Add our 20-30% sustainability premium for carbon-neutral AI compute with REC sales and 45Q tax credits
      </p>
      <button style={{
        padding: isMobile ? '10px 24px' : '12px 32px', 
        background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', 
        color: '#0a0e1a', 
        fontWeight: 600, 
        borderRadius: 8, 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: isMobile ? 14 : 16,
        transition: 'all 0.3s',
        position: 'relative',
        zIndex: 1
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 157, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        Request Custom Quote
      </button>
    </div>
  </div>
</section>
           {/* About/Our Story Section */}
            <section id="about" style={{padding: isMobile ? '64px 0' : '96px 0'}}>
              <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px'}}>
                <div style={{background: 'linear-gradient(135deg, #1a2332, #0a0e1a)', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: 24, padding: isMobile ? 24 : 48}}>
                  <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: 48, alignItems: 'center'}}>
                    <div>
                      <div style={{display: 'inline-block', padding: '6px 16px', background: 'rgba(0, 255, 157, 0.1)', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: 24, fontSize: 12, marginBottom: 16, color: '#00ff9d', fontWeight: 600}}>
                        OUR STORY
                      </div>
                      <h2 style={{fontSize: isMobile ? 28 : 36, fontWeight: 700, marginBottom: 16}}>
                        Bridging Today's Energy
                        <span style={{display: 'block', color: '#00b8ff'}}>with Tomorrow's AI</span>
                      </h2>
                      <p style={{color: '#9ca3af', marginBottom: 20, lineHeight: 1.6, fontSize: isMobile ? 14 : 16}}>
                        In early 2025, a team with deep roots in data centers, telecommunications, renewable energy, and blockchain came together to solve AI's most pressing challenge: sustainable, reliable power at scale.
                      </p>
                      <p style={{color: '#9ca3af', marginBottom: 24, lineHeight: 1.6, fontSize: isMobile ? 14 : 16}}>
                        From our headquarters in <span style={{color: '#00ff9d', fontWeight: 600}}>Athens, Georgia</span>, we're building ISS Mining 1—a 646 MW hybrid facility in Dimmit County, Texas that operates <span style={{color: '#00b8ff', fontWeight: 600}}>20-30% below competitor costs</span> while offsetting ~240,000 tons of CO₂ annually.
                      </p>

                      <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr', gap: isMobile ? 12 : 16, marginBottom: 24}}>
                        <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, padding: isMobile ? 12 : 16, border: '1px solid rgba(0, 255, 157, 0.1)'}}>
                          <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#00ff9d', marginBottom: 4}}>2026</div>
                          <div style={{fontSize: isMobile ? 11 : 12, color: '#9ca3af'}}>Phase 1 Launch</div>
                        </div>
                        <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, padding: isMobile ? 12 : 16, border: '1px solid rgba(0, 184, 255, 0.1)'}}>
                          <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#00b8ff', marginBottom: 4}}>Q1 2028</div>
                          <div style={{fontSize: isMobile ? 11 : 12, color: '#9ca3af'}}>Full Scale</div>
                        </div>
                        <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, padding: isMobile ? 12 : 16, border: '1px solid rgba(0, 255, 157, 0.1)'}}>
                          <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#00ff9d', marginBottom: 4}}>$1.3B+</div>
                          <div style={{fontSize: isMobile ? 11 : 12, color: '#9ca3af'}}>Total Investment</div>
                        </div>
                        <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 8, padding: isMobile ? 12 : 16, border: '1px solid rgba(0, 184, 255, 0.1)'}}>
                          <div style={{fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#00b8ff', marginBottom: 4, fontFamily: 'monospace'}}>99.999%</div>
                          <div style={{fontSize: isMobile ? 11 : 12, color: '#9ca3af'}}>Uptime</div>
                        </div>
                      </div>

                      <div style={{background: 'linear-gradient(90deg, rgba(0, 255, 157, 0.1), rgba(0, 184, 255, 0.1))', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: 12, padding: isMobile ? 16 : 20}}>
                        <p style={{color: '#e8eaf0', fontSize: isMobile ? 15 : 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.4}}>
                          "Sustainable Today, AI Ready Tomorrow"
                        </p>
                        <p style={{color: '#9ca3af', fontSize: isMobile ? 13 : 14, lineHeight: 1.5}}>
                          While the world debates how to power the AI future, we're building it—proving infrastructure can be both cutting-edge and environmentally responsible.
                        </p>
                      </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                      <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, padding: isMobile ? 20 : 24, border: '1px solid rgba(0, 255, 157, 0.1)'}}>
                        <h4 style={{fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 16 : 18}}>
                          <MapPin style={{width: 20, height: 20, color: '#00ff9d'}} />
                          Where We Are
                        </h4>
                        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: isMobile ? 13 : 14, color: '#9ca3af'}}>
                          <li>•  First site: Dimmit County, TX</li>
                          <li>• Phase 1: 200 MW online Q1 2028</li>
                          <li>• Currently in pre-development</li>
                        </ul>
                      </div>

                      <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, padding: isMobile ? 20 : 24, border: '1px solid rgba(0, 184, 255, 0.1)'}}>
                        <h4 style={{fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 16 : 18}}>
                          <TrendingUp style={{width: 20, height: 20, color: '#00b8ff'}} />
                          Where We're Headed
                        </h4>
                        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: isMobile ? 13 : 14, color: '#9ca3af'}}>
                          <li>• 2026: 103 MW solar + 241 MW CHP</li>
                          <li>• 2028: Full capacity</li>
                          <li>• Beyond: Multi-site expansion</li>
                          <li>• Creating jobs & local impact</li>
                        </ul>
                      </div>

                      <div style={{background: 'rgba(10, 14, 26, 0.5)', borderRadius: 12, padding: isMobile ? 20 : 24, border: '1px solid rgba(0, 255, 157, 0.1)'}}>
                        <h4 style={{fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: isMobile ? 16 : 18}}>
                          <Shield style={{width: 20, height: 20, color: '#00ff9d'}} />
                          Our Commitment
                        </h4>
                        <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: isMobile ? 13 : 14, color: '#9ca3af'}}>
                          <li>• Vertically integrated developer</li>
                          <li>• Tier IV redundancy standards</li>
                          <li>• Environmental stewardship</li>
                          <li>• Island-to-ERCOT model</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* CTA Section */}
            <section style={{position: 'relative', padding: isMobile ? '64px 0' : '96px 0', background: 'linear-gradient(to bottom, rgba(26, 35, 50, 0.2), transparent)', overflow: 'hidden'}}>
              <div style={{
                position: 'absolute',
                top: '-200px',
                left: 0,
                width: '100%',
                height: 'calc(100% + 400px)',
                opacity: 0.89,
                pointerEvents: 'none'
              }}>
                <NeuralNetworkBackground />
              </div>

              
              <div style={{maxWidth: 896, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px', textAlign: 'center', position: 'relative', zIndex: 10}}>
                <h2 style={{fontSize: isMobile ? 32 : 48, fontWeight: 700, marginBottom: 24}}>
                  Ready to Power Your
                  <span style={{display: 'block', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                    AI Revolution?
                  </span>
                </h2>
                <p style={{fontSize: isMobile ? 16 : 20, color: '#9ca3af', marginBottom: 40}}>
                  Join hyperscalers, enterprises, and AI startups leveraging our sustainable infrastructure
                </p>
                <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
                  <button style={{padding: isMobile ? '12px 28px' : '16px 40px', background: 'linear-gradient(135deg, #00ff9d, #00b8ff)', color: '#0a0e1a', fontWeight: 600, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: isMobile ? 16 : 18}}>
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer style={{borderTop: '1px solid #1a2332', padding: isMobile ? '32px 0' : '48px 0'}}>
              <div style={{maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px'}}>
                <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32}}>
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
                    <h4 style={{fontWeight: 600, marginBottom: 16, fontSize: isMobile ? 14 : 16}}>Company</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#9ca3af'}}>
                      <li><span style={{cursor: 'pointer'}}>About Us</span></li>
                      <li><span style={{cursor: 'pointer'}}>Careers</span></li>
                      <li><span style={{cursor: 'pointer'}}>News</span></li>
                      <li><span style={{cursor: 'pointer'}}>Contact</span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{fontWeight: 600, marginBottom: 16, fontSize: isMobile ? 14 : 16}}>Services</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#9ca3af'}}>
                      <li><span style={{cursor: 'pointer'}}>AI Hosting</span></li>
                      <li><span style={{cursor: 'pointer'}}>GPU Infrastructure</span></li>
                      <li><span style={{cursor: 'pointer'}}>White Glove Support</span></li>
                      <li><span style={{cursor: 'pointer'}}>Custom Solutions</span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{fontWeight: 600, marginBottom: 16, fontSize: isMobile ? 14 : 16}}>Location</h4>
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
                  <div style={{display: 'flex', gap: isMobile ? 16 : 24, fontSize: 14, color: '#9ca3af', flexWrap: 'wrap'}}>
                    <span style={{cursor: 'pointer'}}>Privacy Policy</span>
                    <span style={{cursor: 'pointer'}}>Terms of Service</span>
                    <span style={{cursor: 'pointer'}}>Security</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        } />
        <Route path="/TeamPage" element={<TeamPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
      </Routes>
    </Router>
  );
}