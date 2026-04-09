"use client";

import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const AnimatedNavLink = ({ href, children }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center h-12 overflow-hidden text-[13px] font-extrabold tracking-[0.2em] font-manrope px-8"
    >
      <div className="relative">
        <motion.span
          animate={{
            y: isHovered ? -24 : 0,
            opacity: isHovered ? 0 : 0.4,
            filter: isHovered ? 'blur(8px)' : 'blur(0px)'
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="block text-white leading-none whitespace-nowrap uppercase"
        >
          {children}
        </motion.span>

        <motion.span
          initial={{ y: 24, opacity: 0, filter: 'blur(8px)' }}
          animate={{
            y: isHovered ? 0 : 24,
            opacity: isHovered ? 1 : 0,
            filter: isHovered ? 'blur(0px)' : 'blur(8px)'
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="absolute inset-0 flex items-center text-white leading-none whitespace-nowrap uppercase"
        >
          {children}
        </motion.span>
      </div>
    </a>
  );
};

const Logo = () => (
  <a href="/" className="flex items-center group flex-shrink-0">
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <svg
        width="150"
        height="40"
        viewBox="0 0 127 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-opacity duration-300 group-hover:opacity-100 opacity-90"
      >
        <path d="M27 0C30.866 3.22128e-07 34 3.13401 34 7V12.5654C33.7268 12.6667 33.5043 12.7921 33.333 12.9443C32.8424 13.9043 32.3411 15.0347 31.8291 16.3359C31.3385 17.6158 30.858 18.9811 30.3887 20.4316C29.9407 21.861 29.5137 23.3122 29.1084 24.7842C28.7244 26.2561 28.3836 27.6748 28.085 29.04C27.8076 30.384 27.5937 31.6005 27.4443 32.6885C26.527 29.9579 25.7811 27.2375 25.2051 24.5283C24.6291 21.819 24.3408 19.0027 24.3408 16.0801C24.3408 15.5469 24.3517 15.0137 24.373 14.4805C24.3944 13.9258 24.4261 13.381 24.4688 12.8477L23.6367 12.3359L20.8525 13.6484C20.8739 14.0536 20.9056 14.4591 20.9482 14.8643C20.9909 15.2695 21.0444 15.6857 21.1084 16.1123C20.5964 17.3709 20.0951 18.7361 19.6045 20.208C19.1352 21.6586 18.6983 23.1307 18.293 24.624C17.8876 26.1174 17.535 27.5577 17.2363 28.9443C16.9377 30.3095 16.7029 31.5579 16.5322 32.6885C15.6149 29.9579 14.869 27.2375 14.293 24.5283C13.717 21.819 13.4287 19.0027 13.4287 16.0801C13.4287 15.5469 13.4396 15.0136 13.4609 14.4805C13.4823 13.9258 13.514 13.381 13.5566 12.8477L12.7246 12.3359L9.94043 13.6484C10.0898 15.4403 10.3463 17.3069 10.709 19.248C11.093 21.168 11.5407 23.0561 12.0527 24.9121C12.5861 26.7681 13.1408 28.5066 13.7168 30.1279C14.266 31.5991 14.8067 32.8896 15.3379 34H7C3.13401 34 4.83208e-08 30.866 0 27V8.3125C0.696257 8.36969 1.3892 8.40038 2.0791 8.40039H3.0791C3.42568 8.40039 3.77256 8.387 4.11914 8.36035C4.22579 9.56027 4.30605 10.8938 4.35938 12.3604C4.43936 13.8001 4.49286 15.1864 4.51953 16.5195C4.57286 17.8527 4.5996 18.9198 4.59961 19.7197C4.59961 21.4797 4.53275 23.3202 4.39941 25.2402C4.29274 27.1602 4.06638 29.1469 3.71973 31.2002C3.71988 31.28 3.81274 31.3203 3.99902 31.3203C4.21227 31.3203 4.5058 31.2667 4.87891 31.1602C5.25224 31.0802 5.53306 30.9464 5.71973 30.7598C6.06636 29.3998 6.373 27.7463 6.63965 25.7998C6.9063 23.8532 7.13268 21.7996 7.31934 19.6396C7.53264 17.4532 7.69314 15.3334 7.7998 13.2803C7.93314 11.2003 8.03914 9.35977 8.11914 7.75977C9.13243 7.51978 10.1459 7.22653 11.1592 6.87988C12.1725 6.53322 13.1993 6.14639 14.2393 5.71973C14.4259 5.55973 14.573 5.31996 14.6797 5C14.7863 4.6535 14.8398 4.38684 14.8398 4.2002C14.8398 3.96043 14.7861 3.84008 14.6797 3.83984C13.7197 4.07984 12.4522 4.31957 10.8789 4.55957C9.30569 4.79953 7.66551 4.91992 5.95898 4.91992C4.51913 4.9199 3.18554 4.8263 1.95898 4.63965C1.46299 4.55337 0.989501 4.44088 0.537109 4.30664C1.59229 1.77759 4.08848 3.63897e-08 7 0H27ZM21.8125 20.0801C22.1965 21.8934 22.6343 23.6854 23.125 25.4561C23.6369 27.2052 24.17 28.837 24.7246 30.3516C25.2517 31.7377 25.7635 32.9533 26.2549 34H18.3604L19.4131 33.3604C19.7118 30.5444 20.0743 28.0372 20.501 25.8398C20.949 23.6213 21.3859 21.7013 21.8125 20.0801ZM34 27C34 29.6533 32.5235 31.9612 30.3477 33.1484C30.7058 29.8661 31.1355 26.9928 31.6367 24.5283C32.17 22.0111 32.6931 19.899 33.2051 18.1924C33.4991 17.2398 33.7643 16.407 34 15.6943V27Z" fill="white" />
        <path d="M54.1006 13.4619H48.373V11.7041C48.373 10.8838 48.2998 10.3613 48.1533 10.1367C48.0068 9.91211 47.7627 9.7998 47.4209 9.7998C47.0498 9.7998 46.7666 9.95117 46.5713 10.2539C46.3857 10.5566 46.293 11.0156 46.293 11.6309C46.293 12.4219 46.4004 13.0176 46.6152 13.418C46.8203 13.8184 47.4014 14.3018 48.3584 14.8682C51.1025 16.499 52.8311 17.8369 53.5439 18.8818C54.2568 19.9268 54.6133 21.6113 54.6133 23.9355C54.6133 25.625 54.4131 26.8701 54.0127 27.6709C53.6221 28.4717 52.8604 29.1455 51.7275 29.6924C50.5947 30.2295 49.2764 30.498 47.7725 30.498C46.1221 30.498 44.7109 30.1855 43.5391 29.5605C42.377 28.9355 41.6152 28.1396 41.2539 27.1729C40.8926 26.2061 40.7119 24.834 40.7119 23.0566V21.5039H46.4395V24.3896C46.4395 25.2783 46.5176 25.8496 46.6738 26.1035C46.8398 26.3574 47.1279 26.4844 47.5381 26.4844C47.9482 26.4844 48.251 26.3232 48.4463 26.001C48.6514 25.6787 48.7539 25.2002 48.7539 24.5654C48.7539 23.1689 48.5635 22.2559 48.1826 21.8262C47.792 21.3965 46.8301 20.6787 45.2969 19.6729C43.7637 18.6572 42.748 17.9199 42.25 17.4609C41.752 17.002 41.3369 16.3672 41.0049 15.5566C40.6826 14.7461 40.5215 13.7109 40.5215 12.4512C40.5215 10.6348 40.751 9.30664 41.21 8.4668C41.6787 7.62695 42.4307 6.97266 43.4658 6.50391C44.501 6.02539 45.751 5.78613 47.2158 5.78613C48.8174 5.78613 50.1797 6.04492 51.3027 6.5625C52.4355 7.08008 53.1826 7.73438 53.5439 8.52539C53.915 9.30664 54.1006 10.6396 54.1006 12.5244V13.4619ZM68.9834 6.28418V11.0303H65.3213V30H59.1543V11.0303H55.5068V6.28418H68.9834ZM84.4082 6.28418V22.1338C84.4082 23.9307 84.3496 25.1953 84.2324 25.9277C84.1152 26.6504 83.7686 27.3975 83.1924 28.1689C82.6162 28.9307 81.8545 29.5117 80.9072 29.9121C79.9697 30.3027 78.8613 30.498 77.582 30.498C76.166 30.498 74.916 30.2637 73.832 29.7949C72.748 29.3262 71.9375 28.7158 71.4004 27.9639C70.8633 27.2119 70.5459 26.4209 70.4482 25.5908C70.3506 24.751 70.3018 22.9932 70.3018 20.3174V6.28418H76.4688V24.0674C76.4688 25.1025 76.5225 25.7666 76.6299 26.0596C76.7471 26.3428 76.9766 26.4844 77.3184 26.4844C77.709 26.4844 77.958 26.3281 78.0654 26.0156C78.1826 25.6934 78.2412 24.9414 78.2412 23.7598V6.28418H84.4082ZM86.7959 6.28418H91.4102C94.3887 6.28418 96.4004 6.4209 97.4453 6.69434C98.5 6.96777 99.3008 7.41699 99.8477 8.04199C100.395 8.66699 100.736 9.36523 100.873 10.1367C101.01 10.8984 101.078 12.4023 101.078 14.6484V22.9541C101.078 25.083 100.976 26.5088 100.771 27.2314C100.575 27.9443 100.229 28.5059 99.7305 28.916C99.2324 29.3164 98.6172 29.5996 97.8848 29.7656C97.1523 29.9219 96.0488 30 94.5742 30H86.7959V6.28418ZM92.9629 10.3418V25.9424C93.8516 25.9424 94.3984 25.7666 94.6035 25.415C94.8086 25.0537 94.9111 24.082 94.9111 22.5V13.2861C94.9111 12.2119 94.877 11.5234 94.8086 11.2207C94.7402 10.918 94.584 10.6982 94.3398 10.5615C94.0957 10.415 93.6367 10.3418 92.9629 10.3418ZM109.545 6.28418V30H103.378V6.28418H109.545ZM126.112 20.1709C126.112 22.5537 126.054 24.2432 125.937 25.2393C125.829 26.2256 125.478 27.1289 124.882 27.9492C124.296 28.7695 123.5 29.3994 122.494 29.8389C121.488 30.2783 120.316 30.498 118.979 30.498C117.709 30.498 116.566 30.293 115.551 29.8828C114.545 29.4629 113.734 28.8379 113.119 28.0078C112.504 27.1777 112.138 26.2744 112.021 25.2979C111.903 24.3213 111.845 22.6123 111.845 20.1709V16.1133C111.845 13.7305 111.898 12.0459 112.006 11.0596C112.123 10.0635 112.475 9.15527 113.061 8.33496C113.656 7.51465 114.457 6.88477 115.463 6.44531C116.469 6.00586 117.641 5.78613 118.979 5.78613C120.248 5.78613 121.386 5.99609 122.392 6.41602C123.407 6.82617 124.223 7.44629 124.838 8.27637C125.453 9.10645 125.819 10.0098 125.937 10.9863C126.054 11.9629 126.112 13.6719 126.112 16.1133V20.1709ZM119.945 12.3779C119.945 11.2744 119.882 10.5713 119.755 10.2686C119.638 9.95605 119.389 9.7998 119.008 9.7998C118.686 9.7998 118.437 9.92676 118.261 10.1807C118.095 10.4248 118.012 11.1572 118.012 12.3779V23.4521C118.012 24.8291 118.065 25.6787 118.173 26.001C118.29 26.3232 118.554 26.4844 118.964 26.4844C119.384 26.4844 119.652 26.2988 119.77 25.9277C119.887 25.5566 119.945 24.6729 119.945 23.2764V12.3779Z" fill="white" />
      </svg>
    </motion.div>
  </a>
);

interface PremiumNavbarProps {
  navLinks?: Array<{ label: string; href: string }>;
}

export const Navbar = ({
  navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ]
}: PremiumNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Precise ScrollTrigger transition for the Technical Monolith
    ScrollTrigger.create({
      start: 50,
      onEnter: () => {
        gsap.to(navRef.current, {
          paddingTop: "16px",
          paddingBottom: "16px",
          backgroundColor: "rgba(0,0,0,0.9)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
          duration: 0.7,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          paddingTop: "32px",
          paddingBottom: "32px",
          backgroundColor: "rgba(0,0,0,0.4)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.7,
          ease: "power2.out"
        });
      }
    });
  }, { scope: navRef });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        ref={navRef}
        className={cn(
          "w-full backdrop-blur-[60px] pointer-events-auto relative border-b border-white/5 py-8 bg-black/40 transition-all duration-700"
        )}
      >

        <div className="max-w-[1440px] mx-auto grid grid-cols-3 items-center px-16 h-12 relative">
          {/* Logo Section (Left) */}
          <div className="flex justify-start">
            <Logo />
          </div>

          {/* Navigation Links (Center) */}
          <div className="flex justify-center items-center gap-16">
            {navLinks.map((link) => (
              <AnimatedNavLink key={link.label} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            ))}
          </div>

          {/* CTA Section (Right) */}
          <div className="flex justify-end items-center gap-8">
            <div className="flex items-center gap-4">
              <button className="text-[10px] font-bold text-white hover:text-white/60 transition-colors duration-200 uppercase tracking-[0.2em] font-manrope">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-8 right-8 p-3 text-white/70 hover:text-white transition-colors z-50"
        >
          {isOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed inset-0 top-24 bg-black/95 backdrop-blur-[100px] z-40 px-16 overflow-hidden"
            >
              <div className="flex flex-col justify-center h-full space-y-12 mb-24">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/40 hover:text-white text-6xl font-extrabold transition-all duration-300 font-manrope tracking-[-0.04em] uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-12 border-t border-white/10">
                  <button className="w-full py-8 text-[14px] font-extrabold text-black bg-white uppercase tracking-[0.2em] font-manrope">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
