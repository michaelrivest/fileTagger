Add file tagger to PATH: 
echo "export PATH=$PATH:/path/to/fileTagger" >> ~/.bashrc & source ~/.bashrc

Summary: 

The Module provides two command line utilites: ftag for managing tags for your files, and fsearch for searching those files based on tags and other criteria. fsearch also includes a mode for quickly opening files using programs specified in config.json.



Using ftag: 

The first argument is a list of files or folders - if not specified, ftag will read this arguement from stdin. If a folder is specified, tags will be applied recursively.  The "-t" option will add the list of tags following it to the file. 

Ex.:
ftag ./Videos/js ./courses/video/javascript -t js javascript video-course    

the "-d" command will delete tags: 

Ex.:
ftag ./Videos/js -d jvaascript  


Using fsearch: 

The first arguement is a list of tags to search for - fsearch will display results that match every tag specified. This is the same as specifying "-a" followed by your list of tags. 

Ex.:
fsearch javascript node

To display results matching any of the tags listed, use the "-o" option: 

Ex.: 
fsearch -o javascript node

Exec Mode: 

Specify exec mode using -x. Exec mode will display your results along with a corresponding number - Enter this number to open the file using commands specified in config.json, or type exit to quit.  

Other options: 
-i: Display additional info for results, such as file tags and category ( fsearch js -i )

-f: Displays the full path for results instead of relative paths ( fsearch js -f )

-l: Limits results to the number specified ( fsearch -l 5 )

-n: Search by file name (fsearch -n "Elegant Javascript" )

-c: Search by category. Categories are determined by file extension, based on the fileTypes property in config.json. ( fsearch -c document )

