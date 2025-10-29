import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Wrench } from 'lucide-react';

interface WorkInProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WorkInProgressModal: React.FC<WorkInProgressModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="wip-modal__backdrop"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 20 }}
            className="wip-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wip-modal-title"
            aria-describedby="wip-modal-description"
          >
            {/* Header */}
            <div className="wip-modal__header">
              <div className="wip-modal__icon">
                <Wrench size={24} />
              </div>
              <h2 id="wip-modal-title" className="wip-modal__title">
                Site en développement
              </h2>
              <button
                onClick={onClose}
                className="wip-modal__close"
                aria-label="Fermer la popup"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="wip-modal__content">
              <div className="wip-modal__warning">
                <AlertTriangle size={20} />
                <span>Work in Progress</span>
              </div>
              
              <p id="wip-modal-description" className="wip-modal__description">
                Cette application est actuellement en cours de développement. 
                Certaines fonctionnalités peuvent être incomplètes ou temporairement indisponibles.
              </p>

              <div className="wip-modal__features">
                <h3>Fonctionnalités en cours :</h3>
                <ul>
                  <li>✅ Navigation interactive entre les étapes</li>
                  <li>✅ Design responsive et éco-optimisé</li>
                  <li>🔄 Contenu détaillé pour chaque étape</li>
                  <li>🔄 Animations et transitions avancées</li>
                  <li>🔄 Mode PWA complet</li>
                </ul>
              </div>

              <div className="wip-modal__note">
                <p>
                  Merci de votre compréhension ! Cette expérience vise à sensibiliser 
                  à l'impact environnemental de l'industrie textile de manière interactive.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="wip-modal__actions">
              <button onClick={onClose} className="btn btn--default">
                J'ai compris, continuer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WorkInProgressModal;