'use client';

import { Button, Fade, Zoom, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import MainSection from '@/components/MainSection';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [mainInView, setMainInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const mainRef = useRef(null);
  const featuresRef = useRef(null);
  const faqRef = useRef(null);
  //const footerRef = useRef(null);

  useEffect(() => {
    setLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target) {
              case mainRef.current:
                setMainInView(true);
                break;
              case featuresRef.current:
                setFeaturesInView(true);
                break;
              case faqRef.current:
                setFaqInView(true);
                break;
              // case footerRef.current:
              //   setFooterInView(true);
              //   break;
            }
          }
        });
      },
      { threshold: 0.25 } // 调整阈值来控制动画触发的时机
    );

    if (mainRef.current) observer.observe(mainRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (faqRef.current) observer.observe(faqRef.current);
    //if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (mainRef.current) observer.unobserve(mainRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
      //if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const handleClick = () => {
    router.push('/browser');
  };

  const ContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url(homepage1.jpg)', // 保持背景图
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明遮罩
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle: React.CSSProperties = {
    color: 'white',
    textAlign: 'center',
    fontSize: '48px',
    marginBottom: '20px',
    fontWeight: 'bold',
    lineHeight: '1.2',
  };

  const circleStyle: React.CSSProperties = {
    width: '655px',
    height: '655px',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.5s ease-in-out', // 添加旋转效果
  };

  const subTextStyle: React.CSSProperties = {
    color: 'white',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '-10px',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'orange',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    textTransform: 'none',
    transition: 'transform 0.2s, background-color 0.2s', // 添加过渡效果
  };

  const downloadButtonStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    textTransform: 'none',
    border: '1px solid white',
    transition: 'transform 0.2s, border-color 0.2s', // 添加过渡效果
  };

  const adjectiveStyle: React.CSSProperties = {
    color: 'orange',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)'; // 悬停时放大按钮
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <>
      <div style={ContainerStyle}>
        <div style={overlayStyle}>
          <Fade in={loaded} timeout={1000}>
            <div style={circleStyle}>
              <p style={textStyle}>
                Provide People With <span style={adjectiveStyle}>SAFE</span>,<br />
                <span style={adjectiveStyle}>CONVENIENT</span>,<br />
                And <span style={adjectiveStyle}>COMFORTABLE</span><br />
                Car Rental Travel Solutions
              </p>
              <p style={subTextStyle}>RentRide.mn</p>
              <div style={buttonContainerStyle}>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  endIcon={<SendIcon />}
                  onClick={handleClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  style={downloadButtonStyle}
                  startIcon={<DownloadIcon />}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Download Apps
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      
      <Box ref={mainRef} sx={{ overflow: 'hidden' }}>
        <Zoom in={mainInView} timeout={1000}>
          <div>
            <MainSection />
          </div>
        </Zoom>
      </Box>

      <Box ref={featuresRef} sx={{ overflow: 'hidden' }}>
        <Zoom in={featuresInView} timeout={1000}>
          <div>
            <FeaturesSection />
          </div>
        </Zoom>
      </Box>

      <Box ref={faqRef} sx={{ overflow: 'hidden' }}>
        <Zoom in={faqInView} timeout={1000}>
          <div>
            <FAQSection />
          </div>
        </Zoom>
      </Box>
{/* 
      <Box ref={footerRef} sx={{ overflow: 'hidden' }}>
        <Zoom in={footerInView} timeout={1000}>
          <div>
            <Footer />
          </div>
        </Zoom>
      </Box> */}
    </>
  );
}
