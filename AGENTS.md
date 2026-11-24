# Consignes du dépôt du site FDTI

Ce dépôt est public. N’y inscrire que du contenu publiable et des consignes techniques partageables : jamais de sources commerciales, de correspondance entre un client et une réalisation, de valeur interne, de preuve, de lien privé ni d’instruction propre à un opérateur. Cette règle couvre aussi les messages de commit, les noms de branche et les descriptions de PR.

Le site se construit et se publie à partir de ce seul dépôt. La méthode éditoriale FDTI est maintenue hors de ce dépôt ; ne pas la recopier ici et ne pas faire dépendre le build d’une source externe.

Avant de livrer, respecter le [contrat de données des réalisations](README.md#contrat-de-données-des-réalisations), lancer `npm run check` puis `npm run build`, et vérifier le rendu dans le site construit. Un push sur `master` publie le site.
