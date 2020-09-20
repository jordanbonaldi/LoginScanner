mkdir .indepProject && cd .indepProject &&
git clone git@github.com:jordanbonaldi/WebViewsInjector.git &&
cd WebViewsInjector &&
cp ../../$1Service.java ./webviewsinjector/src/main/java/net/neferett/webviewsinjector/services/. &&
git checkout -b impl_$1 &&
git add . &&
git commit -m "File created automated" &&
git push origin impl_$1 &&
cd ../.. && rm -rf .indepProject;