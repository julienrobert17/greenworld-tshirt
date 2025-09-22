# 🌱 Green World - Trajet du T-shirt

Une application React interactive qui retrace le parcours environnemental et social d'un t-shirt, de la matière première à la fin de vie.

## ✨ Fonctionnalités

- **6 étapes détaillées** : Matières premières, teinture, confection, transport, usage et fin de vie
- **Images immersives** : Backgrounds full-screen avec overlays de contenu
- **Navigation intuitive** : Timeline interactive + navigation clavier (←/→)
- **Données externalisées** : Contenu géré via JSON pour une maintenance facile
- **Design responsive** : Interface adaptée mobile et desktop
- **Animations fluides** : Transitions avec Framer Motion

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** - Build tool moderne
- **SCSS/Sass** - Styles avec variables et mixins
- **Framer Motion** - Animations et transitions
- **Lucide React** - Icônes modernes
- **Architecture BEM** - CSS organisé et maintenable

## 🚀 Installation et lancement

```bash
# Cloner le projet
git clone https://github.com/julienrobert17/greenworld-tshirt.git
cd greenworld-tshirt

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Structure du projet

```
src/
├── assets/
│   ├── data.json          # Données des étapes
│   └── image/             # Images sources
├── components/
│   ├── TrajetTShirt.tsx   # Composant principal
│   └── ui/                # Composants UI réutilisables
└── styles/
    └── index.scss         # Styles globaux SCSS

public/
└── images/                # Images optimisées pour le web
    ├── matieres.jpg
    ├── teinture.jpg
    ├── travail.jpg
    ├── transport.jpg
    ├── usage.jpg
    └── fin_vie.jpg
```

## 🌍 Impact et objectif

Ce projet vise à sensibiliser aux enjeux environnementaux et sociaux de l'industrie textile en présentant de manière interactive et pédagogique le parcours d'un t-shirt.

---

Développé pour un avenir plus durable
