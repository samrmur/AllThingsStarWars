#!/bin/bash

GREEN='\033[0;32m'
NONE='\033[0m'

echo -e "${GREEN}Pre-installing @shopify/react-native-i18n-plugin${NONE}"
cd @shopify/react-native-i18n-plugin
yarn install
yarn build
cd ../..
echo -e "${GREEN}Finished installing @shopify/react-native-i18n-plugin${NONE}"
