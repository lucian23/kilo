# 800m Athletics Blog

Blog dedicat probei de 800 metri în atletism - tehnici, antrenamente, strategii și performanțe.

## Despre

Acest blog Jekyll este specializat pentru proba de 800 metri din atletism, oferind:

- 🏃‍♂️ Tehnici de alergare pentru 800m
- 📊 Strategii de cursă și tactici
- 💪 Planuri de antrenament pentru diferite niveluri
- 🏆 Analize ale recordurilor mondiale și curse memorabile
- 📚 Resurse educaționale pentru atleți și antrenori

## Instalare și Rulare

### Prerequisite

- Ruby (versiunea 2.7 sau mai nouă)
- RubyGems
- Jekyll

### Pași de instalare

1. **Clonează repository-ul** (sau descarcă fișierele)

2. **Instalează dependențele**:
```bash
bundle install
```

3. **Rulează serverul local**:
```bash
bundle exec jekyll serve
```

4. **Vizualizează blogul**:
Deschide browserul la `http://localhost:4000`

### Comenzi utile

- **Build site-ul**: `bundle exec jekyll build`
- **Serve cu drafts**: `bundle exec jekyll serve --drafts`
- **Serve cu live reload**: `bundle exec jekyll serve --livereload`

## Structura Proiectului

```
.
├── _config.yml           # Configurare Jekyll
├── _layouts/             # Template-uri pentru pagini
│   ├── default.html      # Layout principal
│   ├── post.html         # Layout pentru articole
│   └── page.html         # Layout pentru pagini statice
├── _posts/               # Articole blog
│   ├── 2026-02-01-tehnica-perfecta-pentru-800m.md
│   ├── 2026-01-28-strategii-de-cursa-pentru-800m.md
│   ├── 2026-01-25-david-rudisha-recordul-mondial.md
│   └── 2026-01-20-plan-antrenament-incepatori.md
├── assets/
│   └── css/
│       └── style.css     # Stiluri CSS
├── index.html            # Pagina principală
├── despre.md             # Pagina "Despre"
├── arhiva.html           # Arhiva articolelor
├── Gemfile               # Dependențe Ruby
└── README.md             # Acest fișier
```

## Adăugarea de Articole Noi

1. Creează un fișier nou în directorul `_posts/` cu formatul:
   ```
   YYYY-MM-DD-titlu-articol.md
   ```

2. Adaugă front matter-ul la începutul fișierului:
   ```yaml
   ---
   layout: post
   title: "Titlul Articolului"
   date: 2026-02-04 10:00:00 +0000
   categories: [categorie1, categorie2]
   tags: [tag1, tag2, tag3]
   author: "Numele Autorului"
   ---
   ```

3. Scrie conținutul articolului în format Markdown

4. Salvează și Jekyll va genera automat pagina

## Personalizare

### Modificarea culorilor

Editează variabilele CSS în [`assets/css/style.css`](assets/css/style.css:1):

```css
:root {
    --primary-color: #e74c3c;
    --secondary-color: #3498db;
    --accent-color: #f39c12;
    /* ... */
}
```

### Modificarea informațiilor site-ului

Editează [`_config.yml`](_config.yml:1):

```yaml
title: "Titlul Blogului"
description: "Descrierea blogului"
author:
  name: "Numele tău"
  email: "email@example.com"
```

## Conținut Inclus

### Articole

1. **Tehnica Perfectă pentru 800 Metri** - Ghid complet despre tehnica de alergare
2. **Strategii de Cursă pentru 800m** - Diferite tactici și când să le folosești
3. **David Rudisha și Recordul Mondial** - Analiza cursei legendare de 1:40.91
4. **Plan de Antrenament pentru Începători** - Program de 8 săptămâni

### Pagini

- **Acasă** - Pagina principală cu articole recente și statistici
- **Despre** - Informații despre blog și misiunea sa
- **Arhivă** - Lista completă a tuturor articolelor

## Tehnologii Folosite

- **Jekyll 4.3** - Generator de site-uri statice
- **Markdown** - Pentru scrierea conținutului
- **Liquid** - Template engine
- **CSS3** - Pentru stilizare
- **HTML5** - Markup semantic

## Caracteristici

✅ Design responsive (mobile-friendly)
✅ SEO optimizat
✅ Feed RSS
✅ Navigare intuitivă
✅ Stilizare tematică pentru atletism
✅ Structură clară și organizată
✅ Performanță optimizată

## Deployment

### GitHub Pages

1. Creează un repository pe GitHub
2. Push codul
3. Activează GitHub Pages în Settings
4. Site-ul va fi disponibil la `username.github.io/repository-name`

### Netlify

1. Conectează repository-ul la Netlify
2. Build command: `jekyll build`
3. Publish directory: `_site`
4. Deploy automat la fiecare commit

### Hosting propriu

1. Rulează `bundle exec jekyll build`
2. Încarcă conținutul directorului `_site` pe server

## Contribuții

Contribuțiile sunt binevenite! Pentru a contribui:

1. Fork repository-ul
2. Creează un branch pentru feature-ul tău
3. Commit modificările
4. Push la branch
5. Deschide un Pull Request

## Licență

Acest proiect este open source și disponibil pentru uz personal și educațional.

## Contact

Pentru întrebări sau sugestii, contactează-ne la: contact@800mathletics.com

---

**Creat cu ❤️ pentru comunitatea de alergători de 800 metri**
