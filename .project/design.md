# Design System — EasyTrade

## Direction visuelle

- **Ambiance** : Sombre, professionnel, epure
- **Inspirations** : FTMO (fintech serieuse, dark UI, pricing tables) + Apple (proprete, espacement genereux, hierarchie visuelle)
- **Ton** : Pro/serieux — plateforme de trading credible et fiable

## Palette de couleurs

### Fond et surfaces

| Token            | Utilisation                         | Hex     | Tailwind    |
| ---------------- | ----------------------------------- | ------- | ----------- |
| background       | Fond principal                      | #09090B | zinc-950    |
| surface          | Cartes, modales, sections sureleves | #18181B | zinc-900    |
| surface-hover    | Hover sur cartes                    | #1F1F23 | zinc-900/80 |
| border           | Bordures subtiles                   | #27272A | zinc-800    |
| border-highlight | Bordures accentuees                 | #3F3F46 | zinc-700    |

### Texte

| Token          | Utilisation             | Hex     | Tailwind |
| -------------- | ----------------------- | ------- | -------- |
| text-primary   | Titres, texte principal | #FAFAFA | zinc-50  |
| text-secondary | Descriptions, labels    | #A1A1AA | zinc-400 |
| text-muted     | Texte tres discret      | #71717A | zinc-500 |

### Accents

| Token         | Utilisation                    | Hex       | Tailwind    |
| ------------- | ------------------------------ | --------- | ----------- |
| primary       | Boutons CTA, liens, accents    | #3B82F6   | blue-500    |
| primary-hover | Hover boutons principaux       | #2563EB   | blue-600    |
| primary-light | Fond subtil bleu               | #3B82F610 | blue-500/10 |
| success       | Signal achat, confirmations    | #22C55E   | green-500   |
| danger        | Signal vente, erreurs, alertes | #EF4444   | red-500     |
| warning       | Promos, badges attention       | #F59E0B   | amber-500   |

## Typographie

- **Police** : Inter (Google Fonts)
- **Titres h1** : 48-64px, font-extrabold, tracking-tight, text-primary
- **Titres h2** : 36-48px, font-bold, tracking-tight, text-primary
- **Titres h3** : 24-30px, font-semibold, text-primary
- **Corps** : 16px, font-normal, text-secondary, leading-relaxed
- **Small** : 14px, font-normal, text-muted
- **Boutons** : 16px, font-medium

## Composants

### Boutons

- **Primary** : bg-blue-500, hover:bg-blue-600, text-white, rounded-lg, px-6 py-3
- **Secondary** : bg-transparent, border border-zinc-700, hover:bg-zinc-800, text-white, rounded-lg
- **Ghost** : bg-transparent, hover:bg-zinc-800, text-zinc-400
- Coins : rounded-lg (8px)
- Taille : minimum 44px de hauteur (touch target)

### Cartes

- bg-zinc-900, border border-zinc-800, rounded-xl
- Padding : p-6 ou p-8
- Hover : border-zinc-700 (bordure legerement plus claire)
- Ombre : shadow-lg shadow-black/20

### Navigation

- bg-zinc-950/80 backdrop-blur-md (navbar transparente avec flou)
- Position fixe en haut
- Logo a gauche, liens au centre, CTA a droite
- Hauteur : 64px

### Badges / Tags

- bg-blue-500/10, text-blue-400, rounded-full, px-3 py-1, text-sm
- Variante success : bg-green-500/10, text-green-400
- Variante danger : bg-red-500/10, text-red-400
- Variante warning : bg-amber-500/10, text-amber-400

### Sections de page

- Padding vertical : py-20 (80px) minimum entre chaque section
- Container : max-w-7xl mx-auto px-4
- Separateurs : border-t border-zinc-800 (ligne subtile)

### Inputs / Formulaires

- bg-zinc-900, border border-zinc-800, focus:border-blue-500
- rounded-lg, px-4 py-3
- Placeholder : text-zinc-500
- Label : text-sm text-zinc-400 mb-2

## Pricing

### Carte pricing standard

- bg-zinc-900, border border-zinc-800, rounded-2xl, p-8
- Prix en text-4xl font-extrabold text-primary
- Features en liste avec check icons text-green-500

### Carte pricing mise en avant (annuel)

- border-blue-500 (bordure bleue)
- Badge "Best Value" en bg-blue-500 text-white
- Subtil glow : shadow-blue-500/20

## Images et medias

- Coins arrondis : rounded-xl
- Screenshots de trades : border border-zinc-800, shadow-2xl
- Videos YouTube : aspect-video, rounded-xl, border border-zinc-800

## Responsive

- Mobile-first : design pour 375px minimum
- Breakpoints : sm(640px), md(768px), lg(1024px), xl(1280px)
- Navigation mobile : hamburger menu avec slide panel
- Grilles : 1 col mobile, 2 col tablette, 3-4 col desktop

## Animations (subtiles)

- Transitions : duration-200 ease-in-out
- Hover cartes : scale legerement (hover:scale-[1.02])
- Apparition sections : fade-in au scroll (optionnel)
- Pas d'animations excessives — style serieux
