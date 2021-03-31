upgrade-minor:
	yarn upgrade && syncyarnlock -s -k && yarn install
	lerna run upgrade-minor

upgrade-latest:
	yarn upgrade --latest && syncyarnlock -s -k && yarn install
	lerna run upgrade-latest
