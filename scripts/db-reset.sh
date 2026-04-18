#!/bin/bash
read -p "Are you sure you want to reset the database? This will destroy all data. (y/N) " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
  supabase db reset
  echo "✅ Database reset complete"
else
  echo "Aborted"
fi
