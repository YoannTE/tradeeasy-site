Finalise la boutique avant la mise en production. Checklist complete de peaufinage.

1. Lis .project/app.md et BRIEF.md pour le contexte du projet
2. Cree .project/polish.md avec la checklist suivante (si le fichier n'existe pas)

3. Passe chaque point de la checklist et traite-le :

=== LEGAL & RGPD ===
□ Page mentions legales (obligatoire en France)
□ Page politique de confidentialite
□ CGV (conditions generales de vente — obligatoire pour le e-commerce)
□ Politique de retour et remboursement
□ Bandeau cookie RGPD (consentement)

=== SEO ===
□ Favicon (dans public/ + manifest)
□ Meta title + description sur chaque page
□ Open Graph images (og:image pour partage reseaux sociaux)
□ Sitemap dynamique (/sitemap.xml)
□ robots.txt
□ Schema.org markup pour les produits (structured data)
□ Google Search Console (guider l'inscription)

=== PAGES SYSTEME ===
□ Page 404 personnalisee (not-found.tsx)
□ Page erreur 500 (error.tsx)

=== TUNNEL D'ACHAT (CRITIQUE) ===
□ Parcours complet : produit → panier → checkout → confirmation
□ Les prix s'affichent correctement (devise, format)
□ Les frais de port se calculent correctement
□ Le code promo fonctionne (si configure)
□ Le paiement Stripe fonctionne (mode test)
□ L'email de confirmation est envoye (si configure)
□ Le stock se decremente apres achat (si gere)

=== VERIFICATION ===
□ Responsive mobile (tester avec claude-in-chrome)
□ Tous les liens fonctionnent
□ Formulaires envoient les donnees
□ Images produits chargent
□ Recherche fonctionne (si configuree)
□ Compte client : inscription, connexion, historique
□ Analytics installe (Plausible ou Vercel Analytics)

4. Pour chaque point non fait : l'implementer directement
5. Utiliser claude-in-chrome pour verifier visuellement le resultat :
   - tabs_create_mcp pour ouvrir un onglet
   - navigate vers chaque page modifiee
   - computer (screenshot) pour capturer le resultat
   - get_page_text pour verifier le contenu
   - read_console_messages (pattern: "error") pour verifier les erreurs
6. Cocher au fur et a mesure dans .project/polish.md

7. A la fin, afficher :
   "La boutique est prete pour la production !

   [liste des points traites]

   La boutique est prete a etre deployee depuis l'interface."
