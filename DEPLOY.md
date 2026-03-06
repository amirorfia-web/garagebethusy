# Déploiement VPS — Garage Béthusy-Beaumont

## Prérequis VPS

- **OS** : Ubuntu 22.04+ ou Debian 12+
- **RAM** : 1 GB minimum (2 GB recommandé)
- **CPU** : 1 vCPU minimum
- **Hébergeurs recommandés** : Infomaniak Cloud, Hetzner, DigitalOcean (~5-10 CHF/mois)
- **Nom de domaine** : ex. `garagebethusy.ch` pointant vers l'IP du VPS

---

## 1. Préparer le VPS

```bash
# Se connecter au VPS
ssh root@VOTRE_IP

# Mettre à jour le système
apt update && apt upgrade -y

# Installer Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Installer PM2 (process manager)
npm install -g pm2

# Installer Nginx (reverse proxy)
apt install -y nginx

# Installer Certbot (SSL gratuit)
apt install -y certbot python3-certbot-nginx
```

## 2. Déployer le site

```bash
# Créer un utilisateur dédié
adduser garage
su - garage

# Cloner le projet (ou le transférer via SCP/SFTP)
# Option A : Git
git clone VOTRE_REPO_URL ~/garage-bethusy-web

# Option B : SCP depuis votre Mac
# scp -r ./garage-bethusy-web/ garage@VOTRE_IP:~/

# Installer les dépendances
cd ~/garage-bethusy-web
npm install --production

# Builder le site
npm run build

# Configurer le mot de passe admin
export ADMIN_PASSWORD="votre_mot_de_passe_securise"

# Lancer avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Suivre les instructions affichées
```

## 3. Configurer Nginx (reverse proxy)

```bash
# En tant que root
sudo nano /etc/nginx/sites-available/garagebethusy
```

Contenu du fichier :
```nginx
server {
    listen 80;
    server_name garagebethusy.ch www.garagebethusy.ch;

    # Taille max upload (pour les photos)
    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/garagebethusy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Ajouter le certificat SSL (HTTPS gratuit)
sudo certbot --nginx -d garagebethusy.ch -d www.garagebethusy.ch
```

## 4. DNS

Chez votre registrar (ex: Infomaniak), ajoutez :
```
Type A    @    → VOTRE_IP_VPS
Type A    www  → VOTRE_IP_VPS
```

## 5. Mettre à jour le site

```bash
ssh garage@VOTRE_IP
cd ~/garage-bethusy-web
git pull  # ou scp les fichiers modifiés
npm install
npm run build
pm2 restart garage-bethusy
```

---

## Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `PORT` | Port du serveur | `3000` |
| `ADMIN_PASSWORD` | Mot de passe admin `/admin` | `garage2024` |

## Fichiers importants

| Fichier | Description |
|---------|-------------|
| `src/data/contacts.ts` | Tous les numéros de téléphone et contacts |
| `src/data/vehicles.json` | Base de données des véhicules |
| `public/images/vehicles/` | Photos uploadées des véhicules |
| `ecosystem.config.js` | Configuration PM2 |

## Sauvegardes

Pensez à sauvegarder régulièrement :
```bash
# Backup des données véhicules + photos
tar -czf backup-$(date +%Y%m%d).tar.gz src/data/vehicles.json public/images/vehicles/
```
