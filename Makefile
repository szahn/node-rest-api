init:
	 #could use yarn too
	@npm install

compile:
	@npm run compile

run: compile
	@npm run serve
