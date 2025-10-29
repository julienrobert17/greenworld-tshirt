import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Sprout, Cog, Shirt, Truck, Store, Recycle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import jsonData from "../assets/data.json";
import OptimizedImage from "./OptimizedImage";
import { WelcomeModal } from "./Modal";

const iconMap = {
  "Sprout": Sprout,
  "Cog": Cog,
  "Shirt": Shirt,
  "Truck": Truck,
  "Store": Store,
  "Recycle": Recycle
};

const STEPS = jsonData.steps.map(step => ({
  ...step,
  icon: iconMap[step.icon as keyof typeof iconMap]
}));

const CTA = jsonData.cta;

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

export default React.memo(function TrajetTShirt() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const prefersReduced = useReducedMotion();

  const step = STEPS[index];
  const Icon = step.icon;

  useEffect(() => {
    // Afficher la modal à chaque refresh de page
    const timer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWelcomeModal = useCallback(() => {
    setShowWelcomeModal(false);
  }, []);

  const goTo = useCallback((i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(STEPS.length - 1, i)));
  }, [index]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  return (
    <div className="trajet-tshirt">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="trajet-tshirt__background-wrapper"
          aria-hidden
        >
          <OptimizedImage
            src={step.image}
            alt={`Background pour ${step.title}`}
            className="trajet-tshirt__background"
          />
        </motion.div>
      </AnimatePresence>

      <div className="trajet-tshirt__progress">
        <Progress value={((index + 1) / STEPS.length) * 100} />
      </div>

      {/* Header */}
      <header className="trajet-tshirt__header">
      </header>

      {/* Content */}
      <main className="trajet-tshirt__main">
        {/* Content overlay - animated text over background image */}
        <div className="trajet-tshirt__content-overlay">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step.id}
              custom={direction}
              variants={prefersReduced ? undefined : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 30, duration: prefersReduced ? 0 : 0.45 }}
              className="trajet-tshirt__content"
            >
              {/* Header with icon and title */}
              <div className="trajet-tshirt__content-header">
                <div className="trajet-tshirt__content-icon">
                  <Icon />
                </div>
                <div className="trajet-tshirt__content-titles">
                  <h2 className="trajet-tshirt__content-title">{step.title}</h2>
                  <p className="trajet-tshirt__content-subtitle">Étape {index + 1} sur {STEPS.length}</p>
                </div>
              </div>

              {/* Main description */}
              <div className="trajet-tshirt__content-body">
                <p className="trajet-tshirt__content-description">{step.description}</p>

                {/* Stats */}
                <div className="trajet-tshirt__content-stats">
                  <div className="trajet-tshirt__content-stats-item">
                    <p className="label">{step.statLabel}</p>
                    <p className="value">{step.statValue}</p>
                  </div>
                  <div className="trajet-tshirt__content-stats-item alternative">
                    <p className="label">Alternative</p>
                    <p className="value alternative">{step.alt}</p>
                  </div>
                </div>
              </div>
              {/* Navigation */}
                <div className="trajet-tshirt__content-navigation">
                  <div className="trajet-tshirt__content-navigation-buttons">
                    <Button variant="secondary" className="btn--secondary" onClick={prev} disabled={index===0}>
                      <ChevronLeft /> Étape précédente
                    </Button>
                    <Button className="btn--default" onClick={next} disabled={index===STEPS.length-1}>
                      Étape suivante <ChevronRight />
                    </Button>
                  </div>
                  <span className="trajet-tshirt__content-navigation-hint">Navigation au clavier : ← / →</span>
                </div>
            </motion.div>
          </AnimatePresence>

          {/* Keyboard navigation */}
          <KeyShortcuts onPrev={prev} onNext={next} />
        </div>
      </main>

      {/* Footer / Call-to-action */}
      <footer className="trajet-tshirt__footer">
        <div className="trajet-tshirt__footer-content">
          <div className="trajet-tshirt__footer-content-text">
            <h2 className="trajet-tshirt__footer-content-text-title">{CTA.title}</h2>
            <p className="trajet-tshirt__footer-content-text-description">
              Achète moins mais mieux, privilégie la seconde main et les labels crédibles, et fais durer tes vêtements.
            </p>
          </div>
          <div className="trajet-tshirt__footer-content-links">
            {CTA.links.map((link, i) => (
              <a key={i} href={link.href} className="link">
                <ExternalLink /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Subtle vignette */}
      <div className="trajet-tshirt__vignette" aria-hidden />

      {/* Modal de bienvenue */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
});


const KeyShortcuts = React.memo(function KeyShortcuts({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext]);
  return null;
});