#!/bin/bash

#this is needed to rename files in git
#git doesn't track case changes, so you need to rename the file to something else, then rename it back to the new name
cd ./routes/
for file in *; do
	# Convert the first character to lowercase
	new_filename="$(tr '[:upper:]' '[:lower:]' <<<"${file:0:1}")${file:1}"
	# git mv "$file" TEMP_NAME
	# git mv TEMP_NAME "$new_filename"
	echo "Renamed: $file -> $new_filename"
done
