import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Zap, Leaf, Monitor } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.3, 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
              <button 
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Fermer la modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: (rememberChoice?: boolean) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🌱 Green World - Projet en Développement">
      <div className="welcome-modal-content">
        {/* Status Badge */}
        <div className="status-badge">
          <Zap size={16} />
          <span>Work in Progress</span>
        </div>
        
        {/* Introduction */}
        <div className="intro-section">
          <p className="intro-text">
            Bienvenue dans <strong>Green World</strong> ! Cette application interactive 
            retrace le parcours environnemental d'un t-shirt, de la production à la fin de vie.
          </p>
        </div>

        {/* Concept Technique */}
        <div className="concept-section">
          <h3 className="section-title">
            <Code size={20} />
            Concept Technique
          </h3>
          <div className="tech-list">
            <div className="tech-item">
              <Monitor size={16} />
              <div>
                <strong>React + TypeScript</strong>
                <span>Interface moderne et type-safe</span>
              </div>
            </div>
            <div className="tech-item">
              <Zap size={16} />
              <div>
                <strong>Animations Framer Motion</strong>
                <span>Transitions fluides et immersives</span>
              </div>
            </div>
            <div className="tech-item">
              <Leaf size={16} />
              <div>
                <strong>Green Code</strong>
                <span>Optimisations énergétiques (mode sombre, lazy loading, PWA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision du Projet */}
        <div className="vision-section">
          <h3 className="section-title">
            <Leaf size={20} />
            Vision du Projet
          </h3>
          <p className="vision-text">
            Sensibiliser à l'impact environnemental de l'industrie textile à travers 
            une expérience web éco-responsable. Chaque étape révèle les données 
            réelles sur la consommation d'eau, les émissions CO₂ et les alternatives durables.
          </p>
        </div>

        {/* Note de développement */}
        <div className="dev-note">
          <p>
            <strong>Note :</strong> Cette version de démonstration très basique me sert aussi de terrain d'expérimentation. 
            Le contenu, les interactions et les fonctionnalités continuent d'être enrichis.
          </p>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <button className="cta-button" onClick={() => onClose()}>
            Découvrir le Parcours
          </button>
          <p className="cta-note">
            Utilisez les flèches ou cliquez sur la timeline pour naviguer entre les étapes
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;