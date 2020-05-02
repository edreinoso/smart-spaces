#bin/bash!

cd "/Users/ELCHOCO/React Native/smart-spaces"
git add .
read -p "Enter commit message: " message
git commit -m "$message"
read -p "Do you want to push? " gitpush
if [ $gitpush == "y" ]; then
  # git push origin dev
  git push
fi