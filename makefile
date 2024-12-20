# I use Linux by default so that's the default. :D
default:
	@npx tstl
# @./bin/linux/lovr-0.17.1 ./out/

install:
	@npm install

clean:
	@rm -rf ./node_modules
	@rm -rf ./out
	@echo "Clean completed."

update:
	@npm update