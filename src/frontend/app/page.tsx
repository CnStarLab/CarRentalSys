'use client';

import { Button, Fade, Zoom, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import MainSection from '@/components/homepage/MainSection';
import FAQSection from '@/components/homepage/FAQSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [mainInView, setMainInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

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

  return (
    <>
      <div className="w-full h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(homepage1.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <Fade in={loaded} timeout={1000}>
            <div className="w-[655px] h-[655px] rounded-full flex flex-col justify-center items-center bg-black bg-opacity-50 p-5 shadow-lg transition-transform duration-500 ease-in-out">
              <p className="text-white text-center text-4xl mb-5 font-bold leading-snug">
                Provide People With <span className="text-orange-400 font-bold text-shadow-md">SAFE</span>,<br />
                <span className="text-orange-400 font-bold text-shadow-md">CONVENIENT</span>,<br />
                And <span className="text-orange-400 font-bold text-shadow-md">COMFORTABLE</span><br />
                Car Rental Travel Solutions
              </p>
              <p className="text-white text-center text-2xl mb-[-2.5rem]">RentRide.mn</p>
              <div className="flex gap-5 mt-10">
                <Button
                  variant="contained"
                  className="bg-orange-400 text-white text-lg py-2 px-5 rounded transition-transform duration-200"
                  endIcon={<SendIcon />}
                  onClick={handleClick}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  className="bg-opacity-10 text-white text-lg py-2 px-5 rounded border border-white transition-transform duration-200"
                  startIcon={<DownloadIcon />}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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

    </>
  );
}
