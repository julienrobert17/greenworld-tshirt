import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Sprout, Cog, Shirt, Truck, Store, Recycle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import jsonData from "../assets/data.json";

// Mapping des icônes pour les associer aux chaînes du JSON
const iconMap = {
  "Sprout": Sprout,
  "Cog": Cog,
  "Shirt": Shirt,
  "Truck": Truck,
  "Store": Store,
  "Recycle": Recycle
};

// Transformation des données JSON en format utilisable par le composant
const STEPS = jsonData.steps.map(step => ({
  ...step,
  icon: iconMap[step.icon as keyof typeof iconMap]
}));

const CTA = jsonData.cta;

// --- Data model loaded from JSON

// --- Helper animations
const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

export default function TrajetTShirt() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const prefersReduced = useReducedMotion();

  const step = STEPS[index];
  const Icon = step.icon;

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(STEPS.length - 1, i)));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  return (
    <div className="trajet-tshirt">
      {/* Background image - now full screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="trajet-tshirt__background"
          aria-hidden
          style={{
            backgroundImage: `url(${step.image})`,
          }}
        />
      </AnimatePresence>

      {/* Progress bar - fixed at top */}
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
    </div>
  );
}

// --- Keyboard shortcuts component
function KeyShortcuts({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext]);
  return null;
}