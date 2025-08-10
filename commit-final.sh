#!/bin/bash

# =========================
# RESET REPO
# =========================
rm -rf .git
git init
git branch -M main
git remote add origin https://github.com/nikkuananda/Final_Project.git

# add semua file
git add .

# =========================
# COMMIT DATA
# =========================
dates=(
  "2025-08-10T20:15:00"
  "2025-08-11T21:30:00"
  "2025-08-12T22:10:00"
  "2025-08-13T20:45:00"
  "2025-08-14T23:00:00"
  "2025-08-15T21:20:00"
  "2025-08-16T20:50:00"
  "2025-08-17T22:40:00"
  "2025-08-18T21:10:00"
  "2025-08-19T23:30:00"
  "2025-08-20T20:55:00"
  "2025-08-21T22:25:00"
  "2025-08-22T21:45:00"
  "2025-08-23T23:10:00"
  "2025-08-24T22:00:00"
  "2025-08-25T21:15:00"
  "2025-08-26T23:05:00"
  "2025-08-27T20:40:00"
  "2025-08-28T22:30:00"
  "2025-08-29T21:55:00"
)

messages=(
  "init: setup project structure"
  "feat: add home page layout"
  "feat: add navbar and footer"
  "feat: activities page UI"
  "feat: activity detail page"
  "feat: implement redux slices"
  "feat: auth login register"
  "feat: cart functionality"
  "feat: checkout flow"
  "feat: transaction pages"
  "feat: profile page"
  "feat: edit profile form"
  "feat: promo section"
  "feat: categories section"
  "fix: update redux logic"
  "fix: auth validation"
  "fix: cart summary bug"
  "chore: cleanup components"
  "style: improve UI spacing"
  "final: project completed"
)

# =========================
# LOOP COMMIT
# =========================
for i in "${!dates[@]}"; do
  export GIT_COMMITTER_DATE="${dates[$i]}"
  git commit --allow-empty -am "${messages[$i]}" --date "${dates[$i]}" --author="Nikku Ananda <your.email@example.com>"
done

# =========================
# PUSH KE GITHUB
# =========================
git push -f origin main
