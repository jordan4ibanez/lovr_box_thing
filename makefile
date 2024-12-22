# I use Linux by default so that's the default. :D
default:
	@npx tstl
	@cp -a ./textures/. ./out/textures/
	@cp -a ./sounds/. ./out/sounds/
	@cp -a ./models/. ./out/models/
	@./bin/linux/lovr-0.17.1 ./out/

# install:
# 	@npm install

# clean:
# 	@rm -rf ./out
# 	@echo "Clean completed."

# deep_clean:
# 	@rm -rf ./node_modules
# 	@rm -rf ./out
# 	@echo "Deep clean completed."

# update:
# 	@npm update