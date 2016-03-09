UGLIFY = node_modules/.bin/uglifyjs

test:
	node tests/neighbor-tests.js
	node tests/space-tests.js

run:
	wzrd app.js:index.js -- \
		-d

build:
	browserify app.js | $(UGLIFY) -c -m -o index.js

pushall:
	git push origin gh-pages

D3SRC = node_modules/d3/src

D3_FORCE_FILES = \
	$(D3SRC)/start.js \
	$(D3SRC)/layout/force.js \
	$(D3SRC)/end.js

# Careful! If you rebuild this, you have to edit d3.force to take a random function after
# it is built.
d3-force: $(D3_FORCE_FILES)
	node_modules/.bin/smash $(D3_FORCE_FILES) > lib/d3-force.js

graph-workspace:
	wzrd workspaces/graph-workspace.js:index.js -- -d
