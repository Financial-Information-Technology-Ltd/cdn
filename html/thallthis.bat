for /f "tokens=*" %%a in ('dir /b *.html') do tidy --doctype html5 --output-html yes --char-encoding utf8 --newline lf --clean yes --indent auto --vertical-space yes --tidy-mark no --wrap 0 --write-back yes "%%a" | echo file: %%a
@echo .
@echo .
@dir *.html /o:d
